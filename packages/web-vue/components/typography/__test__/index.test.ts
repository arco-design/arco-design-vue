import { mount } from '@vue/test-utils';
import Typography from '../index';

const { Paragraph } = Typography;

const LINE_STR_COUNT = 20;
const LINE_HEIGHT = 16;
const _getComputedStyle = window.getComputedStyle;
const _getHtmlOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
)?.get;
const _getInnerText = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'innerText'
)?.get;

const sleep = (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

describe('Typography', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        const html = this.innerHTML;
        const text = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(text.length / LINE_STR_COUNT);
        return lines * 16;
      },
    });

    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      get() {
        return this.textContent;
      },
    });

    Object.defineProperty(window, 'getComputedStyle', {
      value: (ele: HTMLElement) => {
        const style = _getComputedStyle(ele);
        style.lineHeight = `${LINE_HEIGHT}px`;
        return style;
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: _getHtmlOffsetHeight,
    });
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      get: _getInnerText,
    });
    Object.defineProperty(window, 'getComputedStyle', {
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
    const copyIconWrapper = wrapper.find('.arco-typography-operation-copy');
    expect(copyIconWrapper.exists()).toBe(true);
    await copyIconWrapper.trigger('click');
    expect(wrapper.find('.arco-typography-operation-copied').exists()).toBe(
      true
    );
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
    const editIconWrapper = wrapper.find('.arco-typography-operation-edit');
    expect(editIconWrapper.exists()).toBe(true);
    await editIconWrapper.trigger('click');
    expect(wrapper.find('.arco-typography-edit-content').exists()).toBe(true);
  });

  test('Paragraph should support ellipsis', async () => {
    const text =
      'A design is a plan or specification for the construction'.repeat(10);
    const wrapper = mount(Paragraph, {
      slots: {
        default: text,
      },
    });
    await wrapper.setProps({
      ellipsis: {
        rows: 2,
        expandable: true,
      },
    });
    await sleep(200);
    const moreElement = wrapper.find('.arco-typography-operation-expand');
    expect(moreElement.exists()).toBe(true);
    expect(wrapper.text()).toContain('...');
    await moreElement.trigger('click');
    expect(wrapper.text()).not.toContain('...');
  });
});
