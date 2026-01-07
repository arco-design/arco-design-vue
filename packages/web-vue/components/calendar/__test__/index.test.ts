import { mount } from '@vue/test-utils';
import Calendar from '../index';

describe('Calendar', () => {
  test('modelValue should work', async () => {
    const wrapper = mount(Calendar);
    const calendarHeader = wrapper.find('.arco-calendar-header-value');

    await wrapper.setProps({ modelValue: new Date('2025-07') });
    expect(calendarHeader.text()).toBe('2025 年 07 月');

    await wrapper.setProps({ modelValue: new Date('2025-06') });
    expect(calendarHeader.text()).toBe('2025 年 06 月');
  });
});
