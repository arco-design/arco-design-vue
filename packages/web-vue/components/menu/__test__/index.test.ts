import { mount } from '@vue/test-utils';
import { h } from 'vue';
import Menu from '../index';

// BaseMenu 内部通过 useResponsive 注册断点监听，jsdom 未实现 matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Menu', () => {
  test('passes attrs through to BaseMenu and applies selectedKeys', () => {
    const wrapper = mount(Menu, {
      props: {
        mode: 'vertical',
      },
      // Menu 包装组件只声明了 theme / mode，其余 props 通过 attrs 透传给 BaseMenu
      attrs: {
        selectedKeys: ['1'],
        accordion: true,
      },
      slots: {
        default: () => [
          h(Menu.Item, { key: '1' }, () => 'Item 1'),
          h(Menu.Item, { key: '2' }, () => 'Item 2'),
        ],
      },
    });

    const baseMenu = wrapper.findComponent({ name: 'BaseMenu' });
    expect(baseMenu.exists()).toBe(true);
    expect(baseMenu.props('mode')).toBe('vertical');
    expect(baseMenu.props('selectedKeys')).toEqual(['1']);
    expect(baseMenu.props('accordion')).toBe(true);

    // 正常运行且 selectedKeys 生效
    expect(wrapper.find('.arco-menu').exists()).toBe(true);
    expect(wrapper.find('.arco-menu-vertical').exists()).toBe(true);
    expect(wrapper.findAll('.arco-menu-item')).toHaveLength(2);
    expect(wrapper.find('.arco-menu-selected').text()).toBe('Item 1');
  });
});
