import path from 'path';
import fs from 'fs-extra';
import { ChangelogConfig } from './interface';
import { emitFiles } from './default/emit-files';
import vueConfig from './vue/vue.config';

export const typeDict = {
  feature: 'New feature',
  bugfix: 'Bug fix',
  docs: 'Documentation change',
  refactor: 'Refactoring',
  style: 'Component style change',
  enhancement: 'Enhancement',
  test: 'Test cases',
  ci: 'Continuous integration',
  typescript: 'Typescript definition change',
  attention: 'Breaking change',
};

export const keyDict = {
  type: 'Type',
  component: 'Component',
  changelogZh: 'Changelog(CN)',
  changelogEn: 'Changelog(EN)',
  issues: 'Related issues',
};

const defaultConfig: ChangelogConfig = {
  repo: '',
  merged: true,
  type: 'github',
  emitFiles,
  typeDict,
  keyDict,
};

export const getConfig = async (): Promise<Required<ChangelogConfig>> => {
  const config = { ...defaultConfig } as Required<ChangelogConfig>;
  const filename = path.resolve(process.cwd(), 'changelog.config.js');
  try {
    await fs.access(filename);
    const data = (await import(filename)).default;
    if (data.arcoComponent === 'vue') {
      Object.assign(config, vueConfig);
    }
    Object.assign(config, data);
  } catch (err) {
    console.log(err);
  }
  return config;
};
