import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import DatePicker from '../index';

test('ignores a date click after the open picker is disabled', async () => {
  const onChange = vi.fn();
  const wrapper = mount(DatePicker, {
    attachTo: document.body,
    props: {
      modelValue: '2026-11-12',
      popupVisible: true,
      unmountOnClose: false,
      onChange,
    },
  });
  try {
    await nextTick();
    const date = Array.from(document.querySelectorAll<HTMLElement>('.arco-picker-date-value')).find(
      (cell) => cell.textContent?.trim() === '18'
    );
    expect(date).toBeDefined();
    await wrapper.setProps({ disabled: true });
    date?.click();
    expect(onChange).not.toHaveBeenCalled();
  } finally {
    wrapper.unmount();
  }
});
