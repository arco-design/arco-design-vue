```yaml
title:
  zh-CN: 下拉框的页头和页脚
  en-US: Dropdown Header and Footer
```

## zh-CN

自定义树选择下拉框的页头和页脚

---

## en-US

Custom Tree Select the header and footer of the drop-down box.

---

```vue
<template>
  <a-form layout="inline" :model="form">
   <a-form-item label="empty">
      <a-switch v-model="form.empty" />
    </a-form-item>
    <a-form-item label="showHeaderOnEmpty">
      <a-switch v-model="form.showHeaderOnEmpty" />
    </a-form-item>
    <a-form-item label="showFooterOnEmpty">
      <a-switch v-model="form.showFooterOnEmpty" />
    </a-form-item>
  </a-form>
  <a-tree-select
    style="width: 300px"
    placeholder="Please select ..."
    :data="computedTreeData"
    :show-header-on-empty="form.showHeaderOnEmpty"
    :show-footer-on-empty="form.showFooterOnEmpty"
  >
    <template #header>
      <div style="padding: 6px 12px;" >
        <a-checkbox value="1">All</a-checkbox>
      </div>
    </template>
      <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <a-button>Click Me</a-button>
      </div>
    </template>
  </a-tree-select>
</template>
<script>
  import { h, reactive, computed } from 'vue';
  import { IconCalendar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      const form = reactive({
        empty: false,
        showHeaderOnEmpty: false,
        showFooterOnEmpty: false,
      });

      const treeData = [
        {
          key: 'node1',
          icon: () => h(IconCalendar),
          title: 'Trunk',
          children: [
            {
              key: 'node2',
              title: 'Leaf',
            },
          ],
        },
        {
          key: 'node3',
          title: 'Trunk2',
          icon: () => h(IconCalendar),
          children: [
            {
              key: 'node4',
              title: 'Leaf',
            },
            {
              key: 'node5',
              title: 'Leaf',
            },
          ],
        },
        {
          key: 'node6',
          title: 'Trunk3',
          icon: () => h(IconCalendar),
          children: [
            {
              key: 'node7',
              title: 'Leaf',
            },
            {
              key: 'node8',
              title: 'Leaf',
            },
          ],
        },
      ];

      const computedTreeData = computed(() => {
        return form.empty ? [] : treeData;
      });

      return {
        form,
        computedTreeData,
      };
    },
  };
</script>
```
