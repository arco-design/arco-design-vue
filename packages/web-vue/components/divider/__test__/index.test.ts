import { mount } from '@vue/test-utils';
import Divider from '../index';

describe('Divider', () => {
  test('Should work on both direction', async () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'horizontal',
      },
    });
    expect(wrapper.find('.arco-divider-horizontal').exists()).toBe(true);
    await wrapper.setProps({ direction: 'vertical' });
    expect(wrapper.find('.arco-divider-vertical').exists()).toBe(true);
  });
});
