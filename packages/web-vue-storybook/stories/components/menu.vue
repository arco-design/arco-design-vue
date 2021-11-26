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
</template>
<script>
import { defineComponent } from 'vue';
import { Menu, Checkbox, Switch } from '@web-vue/components';
import { IconApps, IconBug, IconBulb } from '@web-vue/components/icon';
import CustomMenu from './custom-menu.vue';

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
  },
  setup() {},
  data() {
    return {
      checked: true,
      checked1: true,
      isVertical: true,
      collapsed: true,
      hide: false,
    };
  },
  methods: {
    onItemClick(args) {
      console.log('menu item click: ', args);
    },
  },
});
</script>
