```yaml
title:
  zh-CN: 控制下拉框的展开收起
  en-US: Control Collapse
```

## zh-CN

通过 `popupVisible` (支持 `v-model`) 控制下拉框的展开和收起。

---

## en-US

The dropdown expanded by default. Use popupVisible and onVisibleChange to control the expansion and collapse of the dropdown.

For example, in this demo, onVisibleChange is triggered when the mouse moves out of the dropdown and the popup, the parameter is false, and the dropdown box is collapsed.

---

```vue
<template>
  <div style="margin-bottom: 24px;">
    <a-button type="primary" @click="onClick">toggle</a-button>
  </div>
  <a-tree-select
    :popupVisible="popupVisible"
    :allow-clear="true"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  ></a-tree-select>
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const popupVisible = ref(false);
      function onClick() {
        popupVisible.value = !popupVisible.value;
      }

      return {
        onClick,
        popupVisible,
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
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
  ];
</script>
```
