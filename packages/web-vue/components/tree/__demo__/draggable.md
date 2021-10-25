```yaml
title:
  zh-CN: 拖拽
  en-US: Draggable
```

## zh-CN

可拖拽的树节点。

---

## en-US

Draggable nodes.

---

```vue
<template>
  <a-checkbox
    v-model="checked"
    style="margin-bottom: 20px;"
  >
    checkable
  </a-checkbox>
  <a-tree
    class="tree-demo"
    draggable
    blockNode
    :checkable="checked"
    :data="treeData"
    @drop="onDrop"
  />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const treeData = ref(defaultTreeData);
      const checkedKeys = ref([]);
      const checked = ref(false);

      return {
        treeData,
        checkedKeys,
        checked,
        onDrop({ dragNode, dropNode, dropPosition }) {
          const data = treeData.value;
          const loop = (data, key, callback) => {
            data.some((item, index, arr) => {
              if (item.key === key) {
                callback(item, index, arr);
                return true;
              }
              if (item.children) {
                return loop(item.children, key, callback);
              }
              return false;
            });
          };

          loop(data, dragNode.key, (_, index, arr) => {
            arr.splice(index, 1);
          });

          if (dropPosition === 0) {
            loop(data, dropNode.key, (item) => {
              item.children = item.children || [];
              item.children.push(dragNode);
            });
          } else {
            loop(data, dropNode.key, (_, index, arr) => {
              arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
            });
          }
        }
      };
    }
  };

  const defaultTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disableCheckbox: true,
          children: [
            {
              draggable: false,
              title: 'Leaf 0-0-2-1 (Drag disabled)',
              key: '0-0-2-1'
            }
          ]
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
            },
          ]
        },
        {
          title: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ]
</script>
<style scoped>
.tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title),
.tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title):hover, {
  animation: blinkBg 0.4s 2;
}

@keyframes blinkBg {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: var(--color-primary-light-1);
  }
}
</style>
```
