import { mount } from '@vue/test-utils';
import Button from '../index';

describe('Button', () => {
  test('should emit click event', () => {
    const wrapper = mount(Button);
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  test('should not emit click event when disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
