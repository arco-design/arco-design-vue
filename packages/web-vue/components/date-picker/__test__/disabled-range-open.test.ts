import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { RangePicker } from '../index';

test('ignores date clicks after disabling both ends of an open range', async () => {
  const onChange = vi.fn();
  const wrapper = mount(RangePicker, {
    attachTo: document.body,
    props: {
      modelValue: ['2026-11-12', '2026-11-14'],
      popupVisible: true,
      unmountOnClose: false,
      onChange,
    },
  });
  try {
    await nextTick();
    const dates = Array.from(
      document.querySelectorAll<HTMLElement>('.arco-picker-date-value')
    );
    const first = dates.find((date) => date.textContent?.trim() === '18');
    const second = dates.find((date) => date.textContent?.trim() === '20');
    expect(first).toBeDefined();
    expect(second).toBeDefined();

    await wrapper.setProps({ disabled: true });
    first?.click();
    second?.click();
    expect(onChange).not.toHaveBeenCalled();
  } finally {
    wrapper.unmount();
  }
});
