import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';

import { afterEach, describe, expect, it } from 'vitest';

import ConfigProvider from '../config-provider.vue';
import {
  applyThemeCSSVariables,
  normalizeTheme,
  resolveThemeToken,
  type SDThemeConfig,
} from '../theme';

describe('config-provider theme', () => {
  afterEach(() => {
    document.body.removeAttribute('style');
    document.body.removeAttribute('sd-theme');
  });

  it('normalizes theme object with compatibility fields', () => {
    const normalized = normalizeTheme({
      token: {
        primary6: '12,34,56',
      },
      components: {
        Button: {
          primary6: '100,100,100',
        },
      },
      meta: {
        cssVarPrefix: 'sd',
      },
    });

    expect(normalized.tokens['primary-6']).toBe('12,34,56');
    expect(normalized.components.button['primary-6']).toBe('100,100,100');
    expect(normalized.meta.cssVarPrefix).toBe('--sd-');
    expect(resolveThemeToken(normalized, 'button', 'primary-6')).toBe('100,100,100');
    expect(resolveThemeToken(normalized, 'input', 'primary-6')).toBe('12,34,56');
  });

  it('applies css variables and removes stale keys', () => {
    const previousKeys = applyThemeCSSVariables(
      document.body,
      normalizeTheme({
        tokens: {
          primary6: '12,34,56',
        },
      }),
    );

    expect(document.body.style.getPropertyValue('--primary-6')).toBe('12,34,56');

    applyThemeCSSVariables(
      document.body,
      normalizeTheme({
        tokens: {
          success6: '10,20,30',
        },
      }),
      previousKeys,
    );

    expect(document.body.style.getPropertyValue('--primary-6')).toBe('');
    expect(document.body.style.getPropertyValue('--success-6')).toBe('10,20,30');
  });

  it('updates css variables when theme changes', async () => {
    const themeRef = ref<SDThemeConfig>({
      tokens: {
        primary6: '0,100,200',
      },
      components: {
        Button: {
          borderRadius: '10px',
        },
      },
    });

    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ConfigProvider,
              {
                theme: themeRef.value,
                themeMode: 'dark',
              },
              {
                default: () => h('div', 'content'),
              },
            );
        },
      }),
    );

    await nextTick();

    const themeProvider = wrapper.find('.sd-theme-provider');
    expect(themeProvider.exists()).toBe(true);
    expect(themeProvider.attributes('sd-theme')).toBe('dark');
    expect(themeProvider.element.style.getPropertyValue('--primary-6')).toBe('0,100,200');
    expect(themeProvider.element.style.getPropertyValue('--component-button-border-radius')).toBe(
      '10px',
    );
    expect(document.body.style.getPropertyValue('--primary-6')).toBe('');

    themeRef.value = {
      tokens: {
        primary6: '200,100,0',
      },
    };
    await nextTick();

    expect(themeProvider.element.style.getPropertyValue('--primary-6')).toBe('200,100,0');
    expect(themeProvider.element.style.getPropertyValue('--component-button-border-radius')).toBe(
      '',
    );

    wrapper.unmount();
    expect(document.body.style.getPropertyValue('--primary-6')).toBe('');
  });

  it('applies theme to body when config provider is global', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ConfigProvider,
              {
                global: true,
                themeMode: 'dark',
                theme: {
                  tokens: {
                    success1: '1,2,3',
                  },
                },
              },
              {
                default: () => h('div', 'content'),
              },
            );
        },
      }),
    );

    await nextTick();

    expect(document.body.getAttribute('sd-theme')).toBe('dark');
    expect(document.body.style.getPropertyValue('--success-1')).toBe('1,2,3');

    wrapper.unmount();

    expect(document.body.getAttribute('sd-theme')).toBe(null);
    expect(document.body.style.getPropertyValue('--success-1')).toBe('');
  });

  it('does not force local theme mode when only tokens are provided', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ConfigProvider,
              {
                themeMode: 'dark',
                theme: {
                  tokens: {
                    primary6: '10,10,10',
                  },
                },
              },
              {
                default: () =>
                  h(
                    ConfigProvider,
                    {
                      theme: {
                        tokens: {
                          success6: '22,33,44',
                        },
                      },
                    },
                    {
                      default: () => h('div', 'nested-content'),
                    },
                  ),
              },
            );
        },
      }),
    );

    await nextTick();

    const providers = wrapper.findAll('.sd-theme-provider');
    expect(providers).toHaveLength(2);

    const parentProvider = providers[0];
    const childProvider = providers[1];

    expect(parentProvider.attributes('sd-theme')).toBe('dark');
    expect(childProvider.attributes('sd-theme')).toBeUndefined();
    expect(childProvider.element.style.getPropertyValue('--success-6')).toBe('22,33,44');

    wrapper.unmount();
  });

  it('removes local sd-theme attribute when mode is unset at runtime', async () => {
    const themeMode = ref<'light' | 'dark' | undefined>('dark');

    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ConfigProvider,
              {
                themeMode: themeMode.value,
                theme: {
                  tokens: {
                    primary6: '30,40,50',
                  },
                },
              },
              {
                default: () => h('div', 'content'),
              },
            );
        },
      }),
    );

    await nextTick();

    const themeProvider = wrapper.find('.sd-theme-provider');
    expect(themeProvider.attributes('sd-theme')).toBe('dark');

    themeMode.value = undefined;
    await nextTick();

    expect(themeProvider.attributes('sd-theme')).toBeUndefined();

    wrapper.unmount();
  });
});
