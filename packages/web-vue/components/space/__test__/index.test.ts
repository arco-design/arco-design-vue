import { mount } from '@vue/test-utils';
import Space from '../index';

describe('Space', () => {
  test('Size should work', () => {
    const sizes = ['mini', 'small', 'medium', 'large'];
    sizes.forEach((size) => {
      const wrapper = mount(Space, {
        props: { size },
        slots: {
          default: ['<div>aaa</div>', '<div>bbb</div>'],
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
