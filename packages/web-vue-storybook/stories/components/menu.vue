<template>
  <Checkbox v-model="isVertical">vertical</Checkbox>
  <Checkbox v-model="collapsed">collapsed</Checkbox>
  <Checkbox v-model="checked">Menu 1</Checkbox>
  <Checkbox v-model="checked1">Menu 11</Checkbox>
  <Menu
    :style="{ width: '500px', height: '100%' }"
    :default-open-keys="['0']"
    :default-selected-keys="['0_1']"
    :show-collapse-button="false"
    :collapsed="collapsed"
    :mode="isVertical ? 'vertical' : 'horizontal'"
  >
    <MenuItem key="00">Menu Item 0</MenuItem>
    <SubMenu key="0">
      <template #title><icon-apps /> Navigation 1</template>
      <MenuItem v-if="checked" key="0_0">Menu 1</MenuItem>
      <MenuItem key="0_1">Menu 2</MenuItem>
      <MenuItem key="0_2" disabled>Menu 3</MenuItem>
      <SubMenu key="01" selectable>
        <template #title><icon-apps /> Navigation 11</template>
        <MenuItem v-if="checked1" key="01_0">Menu 11</MenuItem>
        <MenuItem key="01_1">Menu 21</MenuItem>
        <MenuItem key="01_2" disabled>Menu 31</MenuItem>
      </SubMenu>
    </SubMenu>
    <SubMenu key="1">
      <template #title><icon-bug /> Navigation 2</template>
      <MenuItem key="1_0">Menu 1</MenuItem>
      <MenuItem key="1_1">Menu 2</MenuItem>
      <MenuItem key="1_2">Menu 3</MenuItem>
      <CustomMenu />
    </SubMenu>
    <SubMenu key="2">
      <template #title><icon-bulb /> Navigation 3</template>
      <MenuGroup title="Menu Group 1">
        <MenuItem key="2_0">Menu 1</MenuItem>
        <MenuItem key="2_1">Menu 2</MenuItem>
      </MenuGroup>
      <MenuGroup title="Menu Group 2">
        <MenuItem key="2_2">Menu 3</MenuItem>
        <MenuItem key="2_3">Menu 4</MenuItem>
      </MenuGroup>
    </SubMenu>
  </Menu>
  <div>
    <Switch v-model="hide">hide</Switch>
    <Menu v-show="!hide" mode="horizontal">
      <MenuItem v-for="index in 20" :key="index" @click="onItemClick"
        >Menu {{ index }}
      </MenuItem>
    </Menu>
  </div>
  <TypographyTitle :heading="4">带有自己封装的 SubMenu</TypographyTitle>
  <Menu
    :default-open-keys="['0']"
    :default-selected-keys="['0_1']"
    :show-collapse-button="false"
    :mode="'horizontal'"
  >
    <template v-for="item in menuList" :key="item.key">
      <MenuItem v-if="!item.children" :key="item.key">{{
        item.title
      }}</MenuItem>
      <template v-else
        ><CustomSubMenu :key="`${item.key}-sub`" :parent="item"
      /></template>
    </template>
  </Menu>
</template>
<script>
import { defineComponent } from 'vue';
import { Menu, Checkbox, Switch, Typography } from '@web-vue/components';
import { IconApps, IconBug, IconBulb } from '@web-vue/components/icon';
import CustomMenu from './custom-menu.vue';
import CustomSubMenu from './custom-sub-menu.vue';

export default defineComponent({
  components: {
    Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
    Checkbox,
    IconApps,
    MenuGroup: Menu.ItemGroup,
    IconBug,
    IconBulb,
    CustomMenu,
    Switch,
    CustomSubMenu,
    TypographyTitle: Typography.Title,
  },
  setup() {},
  data() {
    return {
      checked: true,
      checked1: true,
      isVertical: true,
      collapsed: true,
      hide: false,
      menuList: [
        {
          key: 1,
          title: '菜单1',
        },
        {
          key: 2,
          title: '菜单2',
        },
        {
          key: 3,
          title: '菜单3',
          children: [
            {
              key: 11,
              title: '菜单3-1',
            },
            {
              key: 12,
              title: '菜单3-2',
            },
            {
              key: 12,
              title: '菜单3-2',
            },
          ],
        },
        {
          key: 4,
          title: '菜单4',
          children: [
            {
              key: 41,
              title: '菜单4-1',
            },
            {
              key: 42,
              title: '菜单4-2',
            },
            {
              key: 43,
              title: '菜单4-3',
            },
          ],
        },
        {
          key: 5,
          title: '菜单5',
          children: [
            {
              key: 51,
              title: '菜单5-1',
            },
            {
              key: 52,
              title: '菜单5-2',
            },
            {
              key: 53,
              title: '菜单5-3',
            },
          ],
        },
        {
          key: 6,
          title: '菜单6',
          children: [
            {
              key: 61,
              title: '菜单6-1',
            },
            {
              key: 62,
              title: '菜单6-2',
            },
            {
              key: 63,
              title: '菜单6-3',
            },
          ],
        },
        {
          key: 7,
          title: '菜单7',
          children: [
            {
              key: 71,
              title: '菜单7-1',
            },
            {
              key: 72,
              title: '菜单7-2',
            },
            {
              key: 73,
              title: '菜单7-3',
            },
          ],
        },
        {
          key: 8,
          title: '菜单8',
          children: [
            {
              key: 81,
              title: '菜单8-1',
            },
            {
              key: 82,
              title: '菜单8-2',
            },
            {
              key: 83,
              title: '菜单8-3',
            },
          ],
        },
      ],
    };
  },
  methods: {
    onItemClick(args) {
      console.log('menu item click: ', args);
    },
  },
});
</script>
