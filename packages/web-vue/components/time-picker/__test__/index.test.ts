import { mount } from '@vue/test-utils';
import TimePicker from '../time-picker.vue';

describe('TimePicker', () => {
  test.each(['time', 'time-range'] as const)(
    'emits clear when the %s value is cleared',
    async (type) => {
      const wrapper = mount(TimePicker, {
        props: {
          type,
          allowClear: true,
          defaultValue: type === 'time' ? '09:00:00' : ['09:00:00', '17:00:00'],
        },
      });

      await wrapper.get('.arco-picker-clear-icon').trigger('click');

      expect(wrapper.emitted('clear')).toEqual([[]]);
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
      wrapper.unmount();
    }
  );
});
