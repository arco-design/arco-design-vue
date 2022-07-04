import fs from 'fs-extra';
import inquirer from 'inquirer';
import axios from 'axios';
import moment from 'moment';
import { configure } from 'nunjucks';
import { getConfig } from './config';
import { getPackage } from './utils/config';
import { Changelog, EmitFile } from './interface';
import { getChangelogList } from './changelog';

const nunjucksEnv = configure(__dirname, {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
});

const appendChangelog = async (emit: EmitFile) => {
  const { file, template, data } = emit;
  const content = nunjucksEnv.render(template, data);

  try {
    await fs.access(file);
    const origin = await fs.readFile(file, 'utf-8');
    const match = origin.match(/^(```yaml\n.*?\n```\n\n)?(.*)$/s);
    if (match) {
      await fs.writeFile(file, `${match[1] ?? ''}${content}\n${match[2]}`);
    }
  } catch {
    // eslint-disable-next-line
    await fs.writeFile(file, '```yaml\nchangelog: true\n```\n\n' + content);
  }
};

const getRequestURL = (config: {
  repo: string;
  version: string;
  merged?: boolean;
}) => {
  let url = `https://api.github.com/search/issues?accept=application/vnd.github.v3+json&q=repo:${config.repo}+is:pr+milestone:${config.version}`;

  if (config.merged) {
    url += '+is:merged';
  }

  return url;
};

export const changelog = async () => {
  const config = await getConfig();
  const packageData = await getPackage();

  let version = (packageData.version ?? '') as string;

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

  const res = await axios.request(
    config.requestConfig?.({
      repo: config.repo,
      version,
      merged: config.merged,
    }) ?? {
      method: 'get',
      url: getRequestURL({
        repo: config.repo,
        version,
        merged: config.merged,
      }),
    }
  );

  if (res.status === 200) {
    const { data } = res;
    const changelog: Changelog = {
      version,
      date: moment().format('YYYY-MM-DD'),
      list: [],
    };

    if (config.type === 'gitlab') {
      for (const item of data ?? []) {
        if (item.description) {
          const list = getChangelogList(item.description, {
            pr: {
              id: item.iid,
              url: item.web_url,
            },
            typeDict: config.typeDict,
            keyDict: config.keyDict,
          });
          if (list) {
            changelog.list = changelog.list.concat(list);
          }
        }
      }
    } else {
      for (const item of data?.items ?? []) {
        const list = getChangelogList(item.body, {
          pr: item,
          typeDict: config.typeDict,
          keyDict: config.keyDict,
        });
        if (list) {
          changelog.list = changelog.list.concat(list);
        }
      }
    }

    if (changelog.list.length > 0) {
      const emits = config.emitFiles(changelog);

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
