<template>
  <SubMenu :key="parent.key">
    <template #title>{{ parent.title }}</template>
    <template v-for="(item, key) in parent.children" :key="item.key">
      <MenuItem v-if="!item.children" :key="item.key">{{
        item.title
      }}</MenuItem>
      <CustomSubMenu v-else :key="key" :parent="item" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
import { Menu } from '@web-vue/components';

export default {
  name: 'CustomSubMenu',
  components: {
    SubMenu: Menu.SubMenu,
    MenuItem: Menu.Item,
  },
  props: {
    parent: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
    },
  },
};
</script>
