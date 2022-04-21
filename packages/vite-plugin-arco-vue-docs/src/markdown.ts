import path from 'path';
import fs from 'fs-extra';
import { isCode, isFileImport, isI18nDescription, toPascalCase } from './utils';
import marked from './marked';
import { getDemoVue, getMainVue } from './vue-template';
import { createDescriptor } from './descriptor';
import { I18nData } from './interface';
import { parseChangelog } from './parse-changelog';

export const transformMain = (
  tokens: any[],
  filename: string,
  frontMatter: any
) => {
  const imports: string[] = [];
  const components: string[] = [];

  for (const token of tokens) {
    if (isFileImport(token)) {
      const componentName = toPascalCase(`demo-${token.basename}`);

      imports.push(`import ${componentName} from '${token.filename}';`);
      components.push(componentName);
    }
  }
  const changelog = /en-US/.test(filename)
    ? './CHANGELOG.md'
    : './CHANGELOG.zh-CN.md';
  try {
    fs.accessSync(path.resolve(path.dirname(filename), changelog));
    imports.push(`import _changelog from '${changelog}';`);
  } catch {}

  // @ts-ignore
  const html = marked.parser(tokens);

  return getMainVue({ html, imports, components, data: frontMatter });
};

export const transformDemo = (
  tokens: any[],
  filename: string,
  frontMatter?: any
) => {
  const basename = path.basename(filename, '.md');
  const virtualPath = `/@virtual${filename}`;
  const data = {
    id: basename,
    title: frontMatter?.title ?? '',
    description: {} as I18nData,
    virtualPath,
    code: '',
  };

  for (const token of tokens) {
    if (isI18nDescription(token)) {
      data.description[token.locale] = token.content;
    } else if (isCode(token) && token.lang === 'vue') {
      createDescriptor(virtualPath, token.text);
      // @ts-ignore
      data.code = marked.parser([token]);
    }
  }

  return getDemoVue(data);
};

export const transformChangelog = (tokens: any[]) => {
  const changelog = parseChangelog(tokens);

  return `export default ${JSON.stringify(changelog, null, 2)};`;
};
