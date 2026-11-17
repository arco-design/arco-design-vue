import { mount } from '@vue/test-utils';
import AutoComplete from '../index';

describe('AutoComplete', () => {
  test('auto-complete correctly', async () => {
    const wrapper = mount(AutoComplete, {
      props: {
        data: ['Beijing', 'Shanghai', 'Chengdu', 'WuHan'],
      },
    });
    const input = wrapper.find('input');
    await input.trigger('focusin');
    await input.setValue('e');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'Enter' });

    expect(input.element.value).toBe('Chengdu');
  });

  test('ignores an option click after the open autocomplete is disabled', async () => {
    const wrapper = mount(AutoComplete, {
      attachTo: document.body,
      props: { data: ['Apple', 'Orange'] },
    });
    try {
      const input = wrapper.get('input');
      await input.trigger('focusin');
      await input.setValue('Or');
      const option = Array.from(
        document.querySelectorAll<HTMLElement>('.arco-select-option')
      ).find((element) => element.textContent?.trim() === 'Orange');
      expect(option).toBeDefined();

      await wrapper.setProps({ disabled: true });
      option?.click();
      expect(wrapper.emitted('update:modelValue')).toEqual([['Or']]);
      expect(wrapper.emitted('select')).toBeUndefined();
    } finally {
      wrapper.unmount();
    }
  });

});
