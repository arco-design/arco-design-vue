import { Token } from 'marked';
import marked from './marked';

const getType = (text: string) => {
  if (/attention|注意/i.test(text)) {
    return 'attention';
  }
  if (/feature|功能/i.test(text)) {
    return 'feature';
  }
  if (/bugfix/i.test(text)) {
    return 'bugfix';
  }
  if (/optimization/i.test(text)) {
    return 'optimization';
  }
  if (/typescript/i.test(text)) {
    return 'typescript';
  }
  if (/style/i.test(text)) {
    return 'style';
  }

  return 'feature';
};

export const parseChangelog = (tokens: Token[]) => {
  const changelog = [];

  let data = { version: '', date: '', list: [], extra: [] };

  for (let i = 0; i < tokens.length; i++) {
    const item = tokens[i];

    if (item.type === 'heading' && item.depth === 2) {
      if (data.version) {
        changelog.push({ ...data });
        data = { version: '', date: '', list: [], extra: [] };
      }
      data.version = item.text;
    } else if (item.type === 'paragraph') {
      data.date = item.text.slice(1, -1);
    } else if (item.type === 'list') {
      for (const extraItem of item.items) {
        // @ts-ignore
        data.extra.push(marked(extraItem.text));
      }
    } else if (item.type === 'heading' && item.depth === 3) {
      const content = {
        type: getType(item.text),
        typeText: item.text,
        list: [],
      };
      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].type === 'list') {
          const listToken = tokens[j];
          // @ts-ignore
          for (const item of listToken.items) {
            // @ts-ignore
            content.list.push(marked(item.text));
          }
          i = j;
          break;
        }
      }
      // @ts-ignore
      data.list.push(content);
    }
  }

  if (data.version) {
    changelog.push({ ...data });
  }

  return changelog;
};
