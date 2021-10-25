import { mount } from '@vue/test-utils';
import Link from '../index';

describe('Link', () => {
  test('should remove href attribute', () => {
    const wrapper = mount(Link, {
      props: {
        disabled: true,
      },
    });
    const href = wrapper.find('a').attributes('href');

    expect(href).toBeUndefined();
  });
});
