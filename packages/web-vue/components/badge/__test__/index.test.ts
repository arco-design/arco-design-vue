import { mount } from '@vue/test-utils';
import Badge from '../index';

describe('Badge', () => {
  test('Should have prefix', () => {
    const wrapper = mount(Badge);
    expect(wrapper.classes()).toContain('arco-badge');
  });

  test('Count should work', () => {
    const wrapper = mount(Badge, {
      props: {
        count: 10,
      },
    });
    const numberElement = wrapper.find('.arco-badge-number');
    expect(numberElement.text()).toContain('10');
  });

  test('Max count should work', () => {
    const wrapper = mount(Badge, {
      props: {
        maxCount: 99,
        count: 1000,
      },
    });
    const numberElement = wrapper.find('.arco-badge-number');
    expect(numberElement.text()).toContain('99+');
  });

  test('Dot should work', async () => {
    const wrapper = mount(Badge, {
      props: {
        dot: true,
      },
    });
    let dotElement = wrapper.find('.arco-badge-dot');
    expect(dotElement.exists()).toBe(false);
    await wrapper.setProps({ count: 1 });
    // dot only shows when count > 0
    dotElement = wrapper.find('.arco-badge-dot');
    expect(dotElement.exists()).toBe(true);
  });

  test('Can set custom text', () => {
    const wrapper = mount(Badge, {
      props: {
        text: 'hello world',
      },
    });
    const textElement = wrapper.find('.arco-badge-text');
    expect(textElement.text()).toContain('hello world');
  });
});
