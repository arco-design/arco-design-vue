import { mount } from '@vue/test-utils';
import Input from '../index';

describe('Input', () => {
  test('should emit change event', () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');

    input.setValue('test');
    const emits = wrapper.emitted();
    expect(emits);
  });

  test('should clear content', async () => {
    const wrapper = mount(Input, {
      props: {
        defaultValue: 'test',
        allowClear: true,
      },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('test');
    await wrapper.find('.arco-input-clear-btn').trigger('click');
    expect(input.element.value).toBe('');
  });
});
