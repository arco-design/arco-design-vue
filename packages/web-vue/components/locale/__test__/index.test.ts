import path from 'path';
import glob from 'glob';
import zhCN from '../lang/zh-cn';

function hasEqualStructure(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  return Object.keys(obj1).every((key) => {
    const v = obj1[key];

    if (typeof v === 'object' && v !== null) {
      if (!obj2[key]) {
        return false;
      }

      return hasEqualStructure(v, obj2[key]);
    }

    return obj2.hasOwnProperty(key);
  });
}

export default function toMatchStructure(actual, expected) {
  const pass = hasEqualStructure(actual, expected);

  return {
    message: () => `expected ${expected} to match structure ${actual}`,
    pass,
  };
}

expect.extend({
  toMatchStructure,
});

describe('Locale', () => {
  test('should have same object', async () => {
    const languages = glob.sync('*.ts', {
      cwd: path.resolve(__dirname, '../lang'),
      ignore: 'zh-cn.ts',
    });

    for (const item of languages) {
      // eslint-disable-next-line no-await-in-loop
      const lang = await import(`../lang/${item}`);
      expect(lang.default).toMatchStructure(zhCN);
    }
  });
});
