import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AutoTooltip from '../auto-tooltip';

describe('AutoTooltip', () => {
  test('shows Tooltip on overflow and re-calculates on Trigger resize', async () => {
    // jsdom 没有布局，offsetWidth 恒为 0，这里按元素 class 伪造宽度
    let contentWidth = 200;
    const offsetWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockImplementation(function offsetWidthGetter(this: HTMLElement) {
        return this.classList?.contains('arco-auto-tooltip-content')
          ? contentWidth
          : 100;
      });

    const wrapper = mount(AutoTooltip, {
      slots: {
        default: 'A very long text that will overflow its container',
      },
    });
    await nextTick();

    // 内容宽度大于容器宽度 -> 渲染 Tooltip
    expect(wrapper.findComponent({ name: 'Tooltip' }).exists()).toBe(true);
    expect(wrapper.find('.arco-auto-tooltip-content').exists()).toBe(true);

    // Tooltip 的根组件是 Trigger，AutoTooltip 通过 attrs 把 onResize 挂到了 Trigger 上
    // （resize 是 Trigger 声明的事件，所以不会出现在 $attrs 里，这里看 vnode props）
    const trigger = wrapper.findComponent({ name: 'Trigger' });
    expect(trigger.exists()).toBe(true);
    const triggerProps = ((trigger.vm.$ as any).vnode.props || {}) as Record<
      string,
      any
    >;
    expect(typeof triggerProps.onResize).toBe('function');

    // 模拟 Trigger 抛出 resize：此时内容不再溢出，应重新计算并移除 Tooltip
    contentWidth = 50;
    trigger.vm.$emit('resize');
    await nextTick();

    expect(wrapper.findComponent({ name: 'Tooltip' }).exists()).toBe(false);
    expect(wrapper.find('.arco-auto-tooltip-content').exists()).toBe(true);

    offsetWidthSpy.mockRestore();
  });
});
