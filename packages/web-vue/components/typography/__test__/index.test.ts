import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
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
    // Paragraph 只声明了 blockquote/spacing，其余 props 通过 $attrs 透传给 Base，
    // 因此 ellipsis 不在它的公开 props 类型里（运行时仍是合法 attr），这里断言运行时行为
    await wrapper.setProps({
      ellipsis: {
        rows: 2,
        expandable: true,
      },
    } as any);
    await sleep(200);
    const moreElement = wrapper.find('.arco-typography-operation-expand');
    expect(moreElement.exists()).toBe(true);
    expect(wrapper.text()).toContain('...');
    await moreElement.trigger('click');
    expect(wrapper.text()).not.toContain('...');
  });

  test('css ellipsis mounts the popup from the start', async () => {
    // 弹框必须常驻挂载：一旦按溢出与否切换结构，就会在 ResizeObserver 回调里
    // 更换被观察元素的父节点，触发 "ResizeObserver loop" 报错
    const wrapper = mount(Paragraph as any, {
      props: { ellipsis: { css: true, rows: 2 } },
      slots: { default: 'A design is a plan or specification'.repeat(10) },
    });
    await nextTick();

    const tooltip = wrapper.findComponent({ name: 'Tooltip' });
    expect(tooltip.exists()).toBe(true);
    // 没有检测到溢出时弹框应为禁用状态
    expect(tooltip.props('disabled')).toBe(true);
  });

  test('css ellipsis mounts popover when showTooltip is popover', async () => {
    const wrapper = mount(Paragraph as any, {
      props: { ellipsis: { css: true, showTooltip: { type: 'popover' } } },
      slots: { default: 'A design is a plan or specification'.repeat(10) },
    });
    await nextTick();

    const popover = wrapper.findComponent({ name: 'Popover' });
    expect(popover.exists()).toBe(true);
    expect(popover.props('disabled')).toBe(true);
  });
});
