import fs from 'fs-extra';
import inquirer from 'inquirer';
import axios from 'axios';
import moment from 'moment';
import { configure } from 'nunjucks';

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
  'Documentation change': 'unused',
  'Coding style change': 'unused',
  'Refactoring': 'unused',
  'Component style change': 'style',
  'Performance improvement': 'optimization',
  'Test cases': 'unused',
  'Continuous integration': 'unused',
  'Typescript definition change': 'typescript',
  'Breaking change': 'attention',
};

const getRecords = (mr: any) => {
  const content = mr.body.replace(/\r\n/g, '\n');

  const records: Array<Record<string, any>> = [];

  const typeRule = new RegExp('## Types of changes.+?\\[x] (.+?)\\n', 's');

  const typeString = content.match(typeRule)?.[1];

  const type = typeMap[typeString];

  if (type && type !== 'unused') {
    const rule = new RegExp(
      // 表格题目
      '## Changelog\\n\\n' +
        // 表格题目
        '\\|(.+)\\|\\n' +
        // 对齐信息
        '\\|(?:[-: ]+[-| :]*)\\|\\n' +
        // 表格内容
        '((?:\\|.*\\|(?:\\n|$))*)'
    );

    const matchResult = content.match(rule);
    if (matchResult) {
      const titles = matchResult[1]
        .split('|')
        .map((item: string) => item.toLowerCase());
      const lines = matchResult[2]
        .split('\n')
        .filter((value: string) => Boolean(value.trim()));
      for (const line of lines) {
        const items = line
          .split('|')
          .filter((value: string) => Boolean(value.trim()));
        const data = titles.reduce(
          (data: Record<string, any>, title: string, index: number) => {
            switch (title) {
              case 'component':
                data[title] = items[index].toLowerCase();
                break;
              case 'related issues': {
                const match = (items[index] ?? '').match(/#\d+/g);
                if (match) {
                  data[title] = match.map((item: string) => item.slice(1));
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

const getEmitsFromChangelog = (changelog: Changelog): EmitInfo[] => {
  const allCN = {};
  const addEN = {};
  const componentCN: Record<string, any> = {};
  const componentEN: Record<string, any> = {};

  for (const item of changelog.list) {
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
      filename: 'CHANGELOG.en-US.md',
      template: 'template/main.en-US.njk',
      data: { version: changelog.version, date: changelog.date, ...addEN },
    },
  ];

  for (const component of Object.keys(componentCN)) {
    emits.push({
      filename: `components/${component}/CHANGELOG.zh-CN.md`,
      template: 'template/main.zh-CN.njk',
      data: {
        version: changelog.version,
        date: changelog.date,
        ...componentCN[component],
      },
    });
  }
  for (const component of Object.keys(componentEN)) {
    emits.push({
      filename: `components/${component}/CHANGELOG.en-US.md`,
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
  } catch {
    await fs.writeFile(filename, content);
  }
  const origin = await fs.readFile(filename, 'utf-8');
  const match = origin.match(/^(```yaml\n.*?\n```\n\n)?(.*)$/s);
  if (match) {
    await fs.writeFile(filename, `${match[1] ?? ''}${content}\n${match[2]}`);
  }
};

const run = async () => {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'version',
    message: 'Please input the version',
    validate(input: any) {
      return /\d+\.\d+\.\d+(-beta\.\d+)?/.test(input);
    },
  });

  const { version } = answer;

  const res = await axios.get('https://api.github.com/search/issues', {
    params: {
      accept: 'application/vnd.github.v3+json',
      q: `repo:arco-design/arco-design-vue+is:pr+is:closed+milestone:${version}`,
    },
  });

  if (res.status === 200) {
    const { data } = res;
    const changelog: Changelog = {
      version,
      date: moment().format('YYYY-MM-DD'),
      list: [] as Record<string, any>[],
    };

    for (const item of data) {
      const records = getRecords(item);
      changelog.list.push(...records);
    }

    const emits = getEmitsFromChangelog(changelog);

    for (const item of emits) {
      // eslint-disable-next-line no-await-in-loop
      await appendChangelog(item);
    }
  }
};

export default run;
