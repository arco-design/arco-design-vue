import marked, { Tokens } from 'marked';
import { invertKeyValues } from './utils/invert';
import { ChangelogData } from './interface';

export const getChangelogList = (
  content: string,
  config: {
    pr: any;
    typeDict: Record<string, string>;
    keyDict: Record<string, string>;
  }
) => {
  const _content = content.replace(/\r\n/g, '\n');
  const _typeDict = invertKeyValues(config.typeDict);
  const _keyDict = invertKeyValues(config.keyDict);

  const typeRule = new RegExp(
    '##\\s*Types? of changes.+?\\[\\s*[xX]\\s*]\\s*(.+?)(?:\\n|$)',
    'si'
  );
  const typeMatch = _content.match(typeRule)?.[1].trim();
  const defaultType = typeMatch && _typeDict[typeMatch];

  const rule = new RegExp('##\\s*Changelog\\n(.+?)(?:##|$)', 'si');
  const match = _content.match(rule)?.[1];
  if (!match) return undefined;
  const tokens = marked.lexer(match);
  const table = tokens.filter(
    (token) => token.type === 'table'
  )[0] as Tokens.Table;
  if (!table) return undefined;

  const keys = table.header.map((header) => {
    return _keyDict[header];
  });

  return table.cells.reduce((list, cur) => {
    const data = cur.reduce(
      (data, value, index) => {
        const key = keys[index];
        if (key === 'type') {
          data[key] = _typeDict[value];
        } else if (key === 'issues') {
          data[key] = value
            .split(',')
            .map((item) => item.match(/#\d+/)?.[0])
            .filter((item) => Boolean(item)) as string[];
        } else {
          data[key] = value;
        }

        return data;
      },
      {
        type: defaultType,
        pr: config.pr,
      } as ChangelogData
    );

    list.push(data);
    return list;
  }, [] as ChangelogData[]);
};
