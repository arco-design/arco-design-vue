<template>
  <Menu
    :style="{ width: '500px', height: '100%' }"
    :default-open-keys="['0']"
    :default-selected-keys="['0_1']"
    show-collapse-button
    mode="horizontal"
  >
    <SubMenu key="0">
      <template #title><icon-apps /> Navigation 1</template>
      <MenuItem key="0_0">Menu 1</MenuItem>
      <MenuItem key="0_1">Menu 2</MenuItem>
      <MenuItem key="0_2" disabled>Menu 3</MenuItem>
    </SubMenu>
    <SubMenu key="1">
      <template #title><icon-bug /> Navigation 2</template>
      <MenuItem key="1_0">Menu 1</MenuItem>
      <MenuItem key="1_1">Menu 2</MenuItem>
      <MenuItem key="1_2">Menu 3</MenuItem>
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
</template>
<script>
import { defineComponent } from 'vue';
import { Menu } from '@web-vue/components';
import { IconApps, IconBug, IconBulb } from '@web-vue/components/icon';

export default defineComponent({
  components: {
    Menu,
    SubMenu: Menu.SubMenu,
    MenuItem: Menu.Item,
    MenuGroup: Menu.Group,
    IconApps,
    IconBug,
    IconBulb,
  },
  setup() {},
});
</script>
