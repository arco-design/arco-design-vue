import { mount } from '@vue/test-utils';
import List from '../index';

describe('List', () => {
  test('should render empty component', () => {
    const wrapper = mount(List, {
      props: {
        data: [],
      },
    });
    const empty = wrapper.find('.arco-empty').exists();
    expect(empty).toBe(true);
  });
});
