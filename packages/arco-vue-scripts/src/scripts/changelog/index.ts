import fs from 'fs-extra';
import inquirer from 'inquirer';
import axios from 'axios';
import moment from 'moment';
import { configure } from 'nunjucks';
import { compareVersion, isValidComponent } from './utils';
import { toKebabCase } from '../../utils/convert-case';

const nunjucksEnv = configure(__dirname, {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
});

interface Changelog {
  version: string;
  date: string;
  list: Record<string, any>[];
}

interface EmitInfo {
  filename: string;
  template: string;
  data: any;
}

const typeMap: Record<string, string> = {
  'New feature': 'feature',
  'Bug fix': 'bugfix',
  'Documentation change': 'docs',
  'Refactoring': 'refactor',
  'Component style change': 'style',
  'Enhancement': 'enhancement',
  'Test cases': 'test',
  'Continuous integration': 'ci',
  'Typescript definition change': 'typescript',
  'Breaking change': 'attention',
};

const getRecords = (mr: any) => {
  const content = mr.body.replace(/\r\n/g, '\n');

  const records: Array<Record<string, any>> = [];

  const typeRule = new RegExp(
    '##\\s+Types of changes.+?\\[[xX]]\\s+(.+?)\\n',
    's'
  );

  const typeString = content.match(typeRule)?.[1];

  const type = typeString && typeMap[typeString];

  const rule = new RegExp(
    // Table title
    '##\\s+Changelog\\n\\n' +
      // Table title
      '\\s*\\|(.+)\\|\\s*\\n' +
      // Alignment info
      '\\s*\\|(?:[-: ]+[-| :]*)\\|\\s*\\n' +
      // Table content
      '((?:\\s*\\|.*\\|\\s*(?:\\n|$))*)'
  );

  const matchResult = content.match(rule);
  if (matchResult) {
    const titles = matchResult[1]
      .split('|')
      .map((item: string) => item.toLowerCase().trim());
    const lines = matchResult[2]
      .split('\n')
      .filter((value: string) => Boolean(value.trim()));
    for (const line of lines) {
      const items = line
        .split('|')
        .map((value: string) => value.trim())
        .filter((value: string) => Boolean(value.trim()));

      if (items.length > 0) {
        const data = titles.reduce(
          (data: Record<string, any>, title: string, index: number) => {
            switch (title) {
              case 'type': {
                if (items[index] && typeMap[items[index]]) {
                  data[title] = typeMap[items[index]];
                }
                break;
              }
              case 'component':
                data[title] = toKebabCase(items[index] ?? '');
                break;
              case 'related issues': {
                const match = (items[index] ?? '').match(/#\d+/g);
                if (match) {
                  data.issue = match.map((item: string) => item.slice(1));
                }
                break;
              }
              default:
                data[title] = items[index];
            }
            return data;
          },
          {
            mrId: mr.number,
            mrURL: mr.html_url,
            type,
          } as Record<string, any>
        );
        records.push(data);
      }
    }
  }

  return records;
};

const addAll = (data: any, changelog: any) => {
  if (!changelog[data.type]) {
    changelog[data.type] = [];
  }
  if (!data.component || data.component === 'common') {
    changelog[data.type].push(data.content);
  } else {
    changelog[data.type].push(`**${data.component}:** ${data.content}`);
  }
};

const addComponent = (data: any, changelog: any) => {
  if (!data.component || data.component === 'common') {
    return;
  }
  if (!changelog[data.component]) {
    changelog[data.component] = {};
  }
  if (!changelog[data.component][data.type]) {
    changelog[data.component][data.type] = [];
  }
  changelog[data.component][data.type].push(data.content);
};

const getEmitsFromChangelog = async (
  changelog: Changelog
): Promise<EmitInfo[]> => {
  const allCN = {};
  const addEN = {};
  const componentCN: Record<string, any> = {};
  const componentEN: Record<string, any> = {};

  for (const item of changelog.list) {
    if (!isValidComponent(item.component)) {
      // eslint-disable-next-line no-await-in-loop
      const answer = await inquirer.prompt({
        type: 'input',
        name: 'component',
        message: `The component name '${item.component}' is invalid, please input the new name.[${item.mrId}]`,
        validate(input: any) {
          return isValidComponent(input);
        },
      });
      item.component = answer.component;
    }
    if (!item.type) {
      // eslint-disable-next-line no-await-in-loop
      const answer = await inquirer.prompt({
        type: 'list',
        name: 'type',
        choices: [
          'feature',
          'bugfix',
          'enhancement',
          'style',
          'typescript',
          'attention',
        ],
        message: `Please select the type for '${item.component}'.[${item.mrId}]`,
      });
      item.type = answer.type;
    }

    const contentCN = `${item['changelog(cn)']} ([#${item.mrId}](${item.mrURL}))`;
    const contentEN = `${item['changelog(en)']} ([#${item.mrId}](${item.mrURL}))`;
    addAll({ ...item, content: contentCN }, allCN);
    addAll({ ...item, content: contentEN }, addEN);
    addComponent({ ...item, content: contentCN }, componentCN);
    addComponent({ ...item, content: contentEN }, componentEN);
  }

  const emits: EmitInfo[] = [
    {
      filename: 'CHANGELOG.zh-CN.md',
      template: 'template/main.zh-CN.njk',
      data: { version: changelog.version, date: changelog.date, ...allCN },
    },
    {
      filename: 'CHANGELOG.md',
      template: 'template/main.en-US.njk',
      data: { version: changelog.version, date: changelog.date, ...addEN },
    },
  ];

  for (const component of Object.keys(componentCN)) {
    let filename = `components/${component}/CHANGELOG.zh-CN.md`;
    if (component === 'icon') {
      filename = `components/icon-component/CHANGELOG.zh-CN.md`;
    }

    emits.push({
      filename,
      template: 'template/main.zh-CN.njk',
      data: {
        version: changelog.version,
        date: changelog.date,
        ...componentCN[component],
      },
    });
  }
  for (const component of Object.keys(componentEN)) {
    let filename = `components/${component}/CHANGELOG.md`;
    if (component === 'icon') {
      filename = `components/icon-component/CHANGELOG.md`;
    }

    emits.push({
      filename,
      template: 'template/main.en-US.njk',
      data: {
        version: changelog.version,
        date: changelog.date,
        ...componentEN[component],
      },
    });
  }

  return emits;
};

const appendChangelog = async (emit: EmitInfo) => {
  const { filename, template, data } = emit;
  const content = nunjucksEnv.render(template, data);

  try {
    await fs.access(filename);
    const origin = await fs.readFile(filename, 'utf-8');
    const match = origin.match(/^(```yaml\n.*?\n```\n\n)?(.*)$/s);
    if (match) {
      await fs.writeFile(filename, `${match[1] ?? ''}${content}\n${match[2]}`);
    }
  } catch {
    // eslint-disable-next-line
    await fs.writeFile(filename, '```yaml\nchangelog: true\n```\n\n' + content);
  }
};

const getLastVersion = (content: string) => {
  const match = content.match(/## (\d+\.\d+\.\d+(-beta\.\d+)?)/);
  return match?.[1];
};

const getBetaVersions = (content: string) => {
  const matches = Array.from(
    content.matchAll(/## (\d+\.\d+\.\d+(-beta\.\d+)?)/g)
  );
  const versions = [];
  for (const item of matches) {
    if (/beta/.test(item[1])) {
      versions.push(item[1]);
    } else {
      break;
    }
  }
  return versions;
};

const run = async () => {
  let version = '2.0.0';
  if (fs.existsSync('package.json')) {
    try {
      const packageJson = await fs.readFile('package.json', 'utf8');
      const packageData = JSON.parse(packageJson);
      if (packageData.version) {
        version = packageData.version;
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('read version from package.json has error');
    }
  }

  const answer = await inquirer.prompt({
    type: 'input',
    name: 'version',
    message: 'Please input the version',
    default: version,
    validate(input: any) {
      return /\d+\.\d+\.\d+(-beta\.\d+)?/.test(input);
    },
  });

  version = answer.version;

  const currentContent = fs.readFileSync('CHANGELOG.zh-CN.md', 'utf8');
  const lastVersion = getLastVersion(currentContent);

  if (
    lastVersion &&
    (version === lastVersion || compareVersion(version, lastVersion) < 1)
  ) {
    const answer = await inquirer.prompt({
      type: 'input',
      name: 'version',
      message: `This version is already existed or lower than last version, please reenter`,
      validate(input: any) {
        return (
          /\d+\.\d+\.\d+(-beta\.\d+)?/.test(input) && input !== lastVersion
        );
      },
    });
    version = answer.version;
  }

  const res = await axios.get(
    `https://api.github.com/search/issues?accept=application/vnd.github.v3+json&q=repo:arco-design/arco-design-vue+is:pr+is:merged+milestone:${version}`
  );

  if (res.status === 200) {
    const { data } = res;
    const changelog: Changelog = {
      version,
      date: moment().format('YYYY-MM-DD'),
      list: [] as Record<string, any>[],
    };

    for (const item of data?.items ?? []) {
      const records = getRecords(item);
      changelog.list.push(...records);
    }

    if (changelog.list.length > 0) {
      const emits = await getEmitsFromChangelog(changelog);

      for (const item of emits) {
        // eslint-disable-next-line no-await-in-loop
        await appendChangelog(item);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('No update information found');
    }
  }
};

export default run;
