import path from 'path';
import { Changelog, EmitFile } from '../interface';

export const emitFiles = (changelog: Changelog): EmitFile[] => {
  const allCN: Record<string, any> = {};
  const addEN: Record<string, any> = {};
  const componentCN: Record<string, any> = {};
  const componentEN: Record<string, any> = {};

  for (const item of changelog.list) {
    const contentCN = `${item.changelogZh} ([#${item.pr.id}](${item.pr.url}))`;
    const contentEN = `${item.changelogEn} ([#${item.pr.id}](${item.pr.url}))`;
    addAll({ ...item, content: contentCN }, allCN);
    addAll({ ...item, content: contentEN }, addEN);
    addComponent({ ...item, content: contentCN }, componentCN);
    addComponent({ ...item, content: contentEN }, componentEN);
  }

  const emits: EmitFile[] = [
    {
      file: 'CHANGELOG.zh-CN.md',
      template: path.resolve(__dirname, 'template.zh-CN.njk'),
      data: { version: changelog.version, date: changelog.date, ...allCN },
    },
    {
      file: 'CHANGELOG.md',
      template: path.resolve(__dirname, 'template.en-US.njk'),
      data: { version: changelog.version, date: changelog.date, ...addEN },
    },
  ];

  emits.push(...getComponentEmits(componentCN, true));
  emits.push(...getComponentEmits(componentEN));

  return emits;
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

const getComponentEmits = (changelog: Record<string, any>, zh?: boolean) => {
  const emits: EmitFile[] = [];
  for (const component of Object.keys(changelog)) {
    const file =
      component === 'icon'
        ? `components/icon-component/CHANGELOG.${zh ? 'zh-CN.md' : 'md'}`
        : `components/${component}/CHANGELOG.${zh ? 'zh-CN.md' : 'md'}`;

    emits.push({
      file,
      template: path.resolve(
        __dirname,
        `template.${zh ? 'zh-CN' : 'en-US'}.njk`
      ),
      data: {
        version: changelog.version,
        date: changelog.date,
        ...changelog[component],
      },
    });
  }
  return emits;
};
