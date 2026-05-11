import zhCN from '../lang/zh-cn';

const languageModules = import.meta.glob<{ default: typeof zhCN }>('../lang/*.ts');

declare module 'vitest' {
  interface Assertion<T = any> {
    toMatchStructure(expected: typeof zhCN): T;
  }
}

function hasEqualStructure(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
  return Object.keys(obj1).every((key) => {
    const v = obj1[key];

    if (typeof v === 'object' && v !== null) {
      if (!obj2[key]) {
        return false;
      }

      return hasEqualStructure(v as Record<string, unknown>, obj2[key] as Record<string, unknown>);
    }

    return Object.prototype.hasOwnProperty.call(obj2, key);
  });
}

export default function toMatchStructure(actual: typeof zhCN, expected: typeof zhCN) {
  const pass = hasEqualStructure(
    actual as unknown as Record<string, unknown>,
    expected as unknown as Record<string, unknown>,
  );

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
    const languages = Object.entries(languageModules).filter(
      ([filename]) => !filename.endsWith('/zh-cn.ts'),
    );

    for (const [, loadLanguage] of languages) {
      // oxlint-disable-next-line no-await-in-loop
      const lang = await loadLanguage();
      expect(lang.default).toMatchStructure(zhCN);
    }
  });
});
