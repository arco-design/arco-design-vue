<template>
  <SubMenu key="custom_3">
    <template #title>Custom Navigation 1 - 1</template>
    <MenuItem key="custom_3_0">Menu 3</MenuItem>
  </SubMenu>
</template>
<script>
import { defineComponent } from 'vue';
import { Menu } from '@web-vue/components';

export default defineComponent({
  components: {
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
  },
  setup() {},
});
</script>
