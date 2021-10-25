import { mount } from '@vue/test-utils';
import Rate from '../index';

describe('Rate', () => {
  test('should show selected score', async () => {
    const wrapper = mount(Rate, {
      props: {
        allowClear: true,
      },
    });
    const buttons = wrapper.findAll('.arco-rate-character-left');

    await buttons[1].trigger('click');
    expect(wrapper.findAll('.arco-rate-character-full')).toHaveLength(2);
    await buttons[1].trigger('click');
    expect(wrapper.findAll('.arco-rate-character-full')).toHaveLength(0);
  });

  test('should show selected score (half)', async () => {
    const wrapper = mount(Rate, {
      props: {
        allowHalf: true,
      },
    });
    const buttons = wrapper.findAll('.arco-rate-character-left');

    await buttons[2].trigger('click');
    expect(wrapper.findAll('.arco-rate-character-full')).toHaveLength(2);
    expect(wrapper.findAll('.arco-rate-character-half')).toHaveLength(1);
  });

  test('should show hover score', async () => {
    const wrapper = mount(Rate);
    const buttons = wrapper.findAll('.arco-rate-character-left');

    await buttons[2].trigger('mouseenter');
    expect(wrapper.findAll('.arco-rate-character-full')).toHaveLength(3);
    await wrapper.find('.arco-rate').trigger('mouseleave');
    expect(wrapper.findAll('.arco-rate-character-full')).toHaveLength(0);
  });
});
