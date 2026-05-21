import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import Ellipsis from '../../ellipsis';
import Menu from '../index';

const MenuHarness = defineComponent({
  components: {
    Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
  },
  props: {
    ellipsis: {
      type: Boolean,
      default: false,
    },
    ellipsisProps: {
      type: Object,
      default: undefined,
    },
  },
  template: `
    <Menu :ellipsis="ellipsis" :ellipsis-props="ellipsisProps">
      <MenuItem key="item-1">A very long menu item title</MenuItem>
      <SubMenu key="sub-1" title="A very long submenu title">
        <MenuItem key="sub-1-item-1">Nested menu item</MenuItem>
      </SubMenu>
    </Menu>
  `,
});

describe('Menu', () => {
  test('should keep plain menu text rendering when ellipsis is disabled', () => {
    const wrapper = mount(MenuHarness);

    expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
    expect(wrapper.text()).toContain('A very long menu item title');
  });

  test('should render ellipsis component and forward ellipsis props', () => {
    const wrapper = mount(MenuHarness, {
      props: {
        ellipsis: true,
        ellipsisProps: {
          lineClamp: 2,
          tooltip: false,
        },
      },
    });

    const ellipsisList = wrapper.findAllComponents(Ellipsis);

    expect(ellipsisList.length).toBeGreaterThan(0);
    expect(ellipsisList[0].props('lineClamp')).toBe(2);
    expect(ellipsisList[0].props('tooltip')).toBe(false);
  });
});
