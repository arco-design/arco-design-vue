/**
 * 替换换行和竖线使其能在markdown中显示
 * @param str
 */
export const escapeCharacter = (str: string) => {
  return str.replace(/\r?\n/g, '<br>').replace(/\|/g, '\\|');
};

/**
 * 转为 kebab-case
 * @param str
 */
export const toKebabCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
  });
};

const opt = Object.prototype.toString;
export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === '[object Boolean]';
}

/**
 * 去掉包裹字符串的引号
 * @param {str} string
 * @returns {string}
 */
export function unquote(str: string) {
  return str && str.replace(/^['"]|['"]$/g, '');
}

/**
 * 清理字符串前后的空格，竖线和 \n
 * @param {str} string
 * @returns {string}
 */
export function trimStr(str: string) {
  return str && str.replace(/^(\s|\||\r?\n)*|(\s|\||\r?\n)*$/g, '');
}

/**
 * 清理字符串中不符合预期的字符，如 \n
 * @param {str} string
 * @returns {string}
 */
export function cleanStr(str: string) {
  return str && str.replace(/\r?\n/g, '');
}

export const getTemplate = (src: string, lang: 'zh' | 'en') => {
  const matches = Array.from(
    src.matchAll(/##\s+(zh-CN|en-US)\n+(.+?)\n+---(?:\n|$)/gs)
  );
  for (const item of matches) {
    if (new RegExp(lang).test(item[1])) {
      src = src.replace(item[0], `${item[2]}\n`);
    } else {
      src = src.replace(item[0], '');
    }
  }

  return src;
};
