```yaml
title:
  zh-CN: 响应式侧边栏
  en-US: Responsive Sider
```

## zh-CN

左侧 Slider 可以结合 Menu 设置为展开/收起状态, 设置`breakpoint`可触发响应式收缩。

---

## en-US

The Slider on the left can be set to expand/collapse in conjunction with Menu, and set `breakpoint` for responsive contraction.

---

```vue
<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      theme="dark"
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
    >
      <div class="logo" />
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_2']"
        @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="0_1" disabled>
          <IconHome />
          Menu 1
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar />
          Menu 2
        </a-menu-item>
        <a-sub-menu key="1">
          <template #title>
            <span><IconCalendar />Navigation 1</span>
          </template>
          <a-menu-item key="1_1">Menu 1</a-menu-item>
          <a-menu-item key="1_2">Menu 2</a-menu-item>
          <a-sub-menu key="2" title="Navigation 2">
            <a-menu-item key="2_1">Menu 1</a-menu-item>
            <a-menu-item key="2_2">Menu 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3" title="Navigation 3">
            <a-menu-item key="3_1">Menu 1</a-menu-item>
            <a-menu-item key="3_2">Menu 2</a-menu-item>
            <a-menu-item key="3_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="4">
          <template #title>
            <span><IconCalendar />Navigation 4</span>
          </template>
          <a-menu-item key="4_1">Menu 1</a-menu-item>
          <a-menu-item key="4_2">Menu 2</a-menu-item>
          <a-menu-item key="4_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-menu
          :openKeys="['1']"
          :selectedKeys="['0_2']"
          mode='horizontal'
        >
          <a-menu-item key="0_1" disabled>
            <IconHome />
            Menu 1
          </a-menu-item>
          <a-menu-item key="0_2">
            <IconCalendar />
            Menu 2
          </a-menu-item>
          <a-sub-menu key="1">
            <template #title>
              <span><IconCalendar />Navigation 1</span>
            </template>
            <a-menu-item key="1_1">Menu 1</a-menu-item>
            <a-menu-item key="1_2">Menu 2</a-menu-item>
            <a-sub-menu key="2" title="Navigation 2">
              <a-menu-item key="2_1">Menu 1</a-menu-item>
              <a-menu-item key="2_2">Menu 2</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="3" title="Navigation 3">
              <a-menu-item key="3_1">Menu 1</a-menu-item>
              <a-menu-item key="3_2">Menu 2</a-menu-item>
              <a-menu-item key="3_3">Menu 3</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="4">
            <template #title>
              <span><IconCalendar />Navigation 4</span>
            </template>
            <a-menu-item key="4_1">Menu 1</a-menu-item>
            <a-menu-item key="4_2">Menu 2</a-menu-item>
            <a-menu-item key="4_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

export default defineComponent({
  components: {
    IconHome,
    IconCalendar,
  },
  setup() {
    const collapsed = ref(false);
    const onCollapse = (val, type) => {
      const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
      Message.info({
        content,
        duration: 2000,
      });
      collapsed.value = val;
    }
    return {
      collapsed,
      onCollapse,
      onClickMenuItem(key) {
        Message.info({ content: `You select ${key}`, showIcon: true });
      }
    };
  }
});
</script>
<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
```
