<template>
  <Tree
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :data="treeData"
    @check="onCheck"
  />
</template>

<script>
import { ref } from 'vue';
import { Tree } from '@web-vue/components';

export default {
  components: { Tree },
  setup() {
    const checkedKeys = ref([]);

    return {
      checkedKeys,
      treeData,
      onCheck(...args) {
        console.log(...args);
      },
    };
  },
};

const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        disabled: true,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
          },
          {
            title: 'Leaf',
            key: '0-0-2-2',
            disableCheckbox: true,
          },
        ],
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
        children: [
          {
            title: 'Leaf ',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf ',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf',
        key: '0-1-2',
      },
    ],
  },
];
</script>
