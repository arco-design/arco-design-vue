import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

import { afterEach, describe, expect, it } from 'vitest';

import Trigger from '../../trigger';
import ThemeProvider from '../theme-provider.vue';

describe('theme-provider standalone', () => {
  afterEach(() => {
    document.body.removeAttribute('style');
    document.body.removeAttribute('sd-theme');
  });

  it('works as a standalone local provider', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ThemeProvider,
              {
                themeMode: 'dark',
                theme: {
                  tokens: {
                    primary6: '12,34,56',
                  },
                },
              },
              {
                default: () => h('div', 'standalone-content'),
              },
            );
        },
      }),
    );

    await nextTick();

    const themeRoot = wrapper.find('.sd-theme-provider');
    expect(themeRoot.exists()).toBe(true);
    expect(themeRoot.attributes('sd-theme')).toBe('dark');
    expect(themeRoot.element.style.getPropertyValue('--primary-6')).toBe('12,34,56');
    expect(document.body.style.getPropertyValue('--primary-6')).toBe('');

    wrapper.unmount();
  });

  it('keeps body-mounted popups synced with local theme provider', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          return () =>
            h(
              ThemeProvider,
              {
                themeMode: 'dark',
                theme: {
                  tokens: {
                    primary6: '98,76,54',
                  },
                },
              },
              {
                default: () =>
                  h(
                    Trigger,
                    {
                      trigger: 'click',
                      defaultPopupVisible: true,
                    },
                    {
                      default: () => h('button', 'open'),
                      content: () => h('div', { id: 'theme-popup-content' }, 'popup-content'),
                    },
                  ),
              },
            );
        },
      }),
    );

    await nextTick();
    await nextTick();

    const popupContent = document.body.querySelector('#theme-popup-content');
    expect(popupContent).not.toBeNull();

    const popupContainer = popupContent?.closest('.sd-theme-popup-container') as HTMLElement | null;
    expect(popupContainer).not.toBeNull();
    expect(popupContainer?.getAttribute('sd-theme')).toBe('dark');
    expect(popupContainer?.style.getPropertyValue('--primary-6')).toBe('98,76,54');

    wrapper.unmount();

    expect(document.body.querySelector('.sd-theme-popup-container')).toBeNull();
  });
});
