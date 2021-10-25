import { mount } from '@vue/test-utils';
import Tag from '../index';

describe('Tag', () => {
  test('should ', async () => {
    const wrapper = mount(Tag, {
      props: {
        checkable: true,
      },
    });
    await wrapper.trigger('click');

    expect(wrapper.emitted('check')?.[0]).toEqual([false]);
  });
});
