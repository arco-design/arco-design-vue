import { mount } from '@vue/test-utils';
import InputNumber from '../index';

describe('InputNumber', () => {
  test('number add correctly', async () => {
    const wrapper = mount(InputNumber);

    const stepButton = wrapper.find('button');
    await stepButton.trigger('mousedown');
    await stepButton.trigger('mousedown');

    expect(wrapper.find('input').element.value).toBe('1');
  });

  test('keeps the suffix when the input becomes read-only', async () => {
    const wrapper = mount(InputNumber, {
      slots: { suffix: 'kg' },
    });

    await wrapper.setProps({ readOnly: true });
    expect(wrapper.text()).toContain('kg');
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.setProps({ readOnly: false });
    expect(wrapper.text()).toContain('kg');
    expect(wrapper.findAll('button')).toHaveLength(2);
  });

  test('should valid input', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        min: 0,
        max: 10,
      },
    });

    const input = wrapper.find('input');
    await input.setValue('-2');
    expect(input.element.value).toBe('-2');
    await input.trigger('blur');
    expect(input.element.value).toBe('0');
    await input.setValue('20');
    expect(input.element.value).toBe('20');
    await input.trigger('blur');
    expect(input.element.value).toBe('10');
  });
});
