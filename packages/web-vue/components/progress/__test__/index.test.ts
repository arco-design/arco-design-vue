import { mount } from '@vue/test-utils';
import Progress from '../progress.vue';

describe('Progress', () => {
  test('keeps the bar empty for negative values', async () => {
    const wrapper = mount(Progress, { props: { percent: -0.2 } });
    const bar = wrapper.get<HTMLElement>('.arco-progress-line-bar');

    expect(bar.element.style.width).toBe('0%');
    expect(wrapper.text()).toBe('0%');

    await wrapper.setProps({ percent: 0.5 });
    expect(bar.element.style.width).toBe('50%');

    await wrapper.setProps({ percent: -0.1 });
    expect(bar.element.style.width).toBe('0%');
  });
});
