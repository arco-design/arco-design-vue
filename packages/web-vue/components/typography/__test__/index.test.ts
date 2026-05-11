import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import Typography from '../index';

const { Paragraph } = Typography;

const LINE_STR_COUNT = 20;
const LINE_HEIGHT = 16;
const _getComputedStyle = window.getComputedStyle;
const _getHtmlOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight',
)?.get;
const _getInnerText = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText')?.get;

const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));

describe('Typography', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        const html = this.innerHTML;
        const text = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(text.length / LINE_STR_COUNT);
        return lines * 16;
      },
    });

    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      configurable: true,
      get() {
        return this.textContent;
      },
    });

    Object.defineProperty(window, 'getComputedStyle', {
      configurable: true,
      value: (ele: HTMLElement) => {
        const style = _getComputedStyle(ele);
        style.lineHeight = `${LINE_HEIGHT}px`;
        return style;
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get: _getHtmlOffsetHeight,
    });
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      configurable: true,
      get: _getInnerText,
    });
    Object.defineProperty(window, 'getComputedStyle', {
      configurable: true,
      value: _getComputedStyle,
    });
  });

  test('Paragraph should support copyable', async () => {
    const wrapper = mount(Paragraph, {
      props: {
        copyable: true,
      },
      slots: {
        default: 'my text',
      },
    });
    const copyIconWrapper = wrapper.find('.sd-typography-operation-copy');
    expect(copyIconWrapper.exists()).toBe(true);
    await copyIconWrapper.trigger('click');
    expect(wrapper.find('.sd-typography-operation-copied').exists()).toBe(true);
  });

  test('Paragraph should support editable', async () => {
    const wrapper = mount(Paragraph, {
      props: {
        editable: true,
      },
      slots: {
        default: 'my text',
      },
    });
    const editIconWrapper = wrapper.find('.sd-typography-operation-edit');
    expect(editIconWrapper.exists()).toBe(true);
    await editIconWrapper.trigger('click');
    expect(wrapper.find('.sd-typography-edit-content').exists()).toBe(true);
  });

  test('Paragraph should support ellipsis', async () => {
    const text = 'A design is a plan or specification for the construction'.repeat(10);
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            Paragraph,
            {
              ellipsis: {
                rows: 2,
                expandable: true,
              },
            },
            {
              default: () => text,
            },
          );
        },
      }),
    );
    await sleep(200);
    const moreElement = wrapper.find('.sd-typography-operation-expand');
    expect(moreElement.exists()).toBe(true);
    expect(wrapper.text()).toContain('...');
    await moreElement.trigger('click');
    expect(wrapper.text()).not.toContain('...');
  });
});
