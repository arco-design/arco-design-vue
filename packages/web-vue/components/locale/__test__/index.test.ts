import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import zhCN from '../lang/zh-cn';

const modules = import.meta.glob<{ default: typeof zhCN }>('../lang/*.ts', {
  eager: true,
});

const langs = Object.entries(modules)
  .map(([fullPath, mod]) => ({
    fileName: fullPath.split('/').pop() as string,
    lang: mod.default,
  }))
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

const langCases = langs.map(({ fileName, lang }) => [fileName, lang] as const);

const toExpectedLocale = (fileName: string) => {
  const [language, region] = fileName.replace('.ts', '').split('-');
  return `${language}-${region.toUpperCase()}`;
};

const collectLeafKeys = (input: unknown, prefix = ''): string[] => {
  if (Array.isArray(input)) {
    return input.flatMap((item, index) =>
      collectLeafKeys(item, `${prefix}[${index}]`)
    );
  }

  if (input && typeof input === 'object') {
    return Object.entries(input as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([key, value]) =>
        collectLeafKeys(value, prefix ? `${prefix}.${key}` : key)
      );
  }

  return [prefix];
};

describe('locale contract', () => {
  it('should discover all language files', () => {
    expect(langs.length).toBeGreaterThan(1);
  });

  it('should keep exactly the same deep keys as zh-CN', () => {
    const baseKeys = collectLeafKeys(zhCN).sort();

    langs.forEach(({ fileName, lang }) => {
      expect(
        collectLeafKeys(lang).sort(),
        `${fileName} is missing or has extra i18n keys`
      ).toEqual(baseKeys);
    });
  });

  it('should keep locale id consistent with file name', () => {
    langs.forEach(({ fileName, lang }) => {
      expect(lang.locale).toBe(toExpectedLocale(fileName));
    });
  });

  it('should not have duplicated locale id', () => {
    const localeIds = langs.map(({ lang }) => lang.locale);
    expect(new Set(localeIds).size).toBe(localeIds.length);
  });
});

describe('locale runtime', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it.each(langCases)('%s', async (fileName, lang) => {
    vi.resetModules();
    const { addI18nMessages, useLocale, useI18n } = await import('../index');

    addI18nMessages({ [lang.locale]: lang }, { overwrite: true });
    useLocale(lang.locale);

    let t!: (key: string, ...args: any[]) => string;
    const wrapper = mount(
      defineComponent({
        setup: () => {
          t = useI18n().t;
          return () => null;
        },
      })
    );

    expect(t('drawer.okText'), `${fileName} drawer.okText`).toBe(
      lang.drawer.okText
    );
    expect(
      t('pagination.total', 123),
      `${fileName} pagination.total`
    ).toContain('123');
    expect(t('not.exists.key')).toBe('not.exists.key');
    expect(t('datePicker.placeholder')).toEqual(lang.datePicker.placeholder);

    wrapper.unmount();
  });

  it('should warn and keep locale unchanged for unknown locale', async () => {
    vi.resetModules();
    const { useLocale, getLocale } = await import('../index');

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const before = getLocale();

    useLocale('xx-YY');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(getLocale()).toBe(before);
  });
});
