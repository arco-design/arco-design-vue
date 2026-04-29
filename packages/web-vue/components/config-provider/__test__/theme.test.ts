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
              },
              {
                default: () => h('div', 'content'),
              },
            );
        },
      }),
    );

    expect(document.body.style.getPropertyValue('--primary-6')).toBe('0,100,200');
    expect(document.body.style.getPropertyValue('--component-button-border-radius')).toBe('10px');

    themeRef.value = {
      tokens: {
        primary6: '200,100,0',
      },
    };
    await nextTick();

    expect(document.body.style.getPropertyValue('--primary-6')).toBe('200,100,0');
    expect(document.body.style.getPropertyValue('--component-button-border-radius')).toBe('');

    wrapper.unmount();
    expect(document.body.style.getPropertyValue('--primary-6')).toBe('');
  });
});
