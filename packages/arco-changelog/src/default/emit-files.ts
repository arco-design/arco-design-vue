import path from 'path';
import { Changelog, EmitFile } from '../interface';

export const getEmitFiles = (config?: any) => {
  return (changelog: Changelog): EmitFile[] => {
    const allCN: Record<string, any> = {};
    const addEN: Record<string, any> = {};

    for (const item of changelog.list) {
      const contentCN = `${item.changelogZh} ([#${item.pr.id}](${item.pr.url}))`;
      const contentEN = `${item.changelogEn} ([#${item.pr.id}](${item.pr.url}))`;
      addAll({ ...item, content: contentCN }, allCN);
      addAll({ ...item, content: contentEN }, addEN);
    }

    return [
      {
        file: config?.filename?.zh ?? 'CHANGELOG.zh-CN.md',
        template: path.resolve(__dirname, 'template.zh-CN.njk'),
        data: { version: changelog.version, date: changelog.date, ...allCN },
      },
      {
        file: config?.filename?.en ?? 'CHANGELOG.md',
        template: path.resolve(__dirname, 'template.en-US.njk'),
        data: { version: changelog.version, date: changelog.date, ...addEN },
      },
    ];
  };
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
