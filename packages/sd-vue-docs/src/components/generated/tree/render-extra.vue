<template>
  <div class="sd:w-125 sd:p-0.5 sd:overflow-auto">
    <sd-tree :blockNode="true" :checkable="true" :data="treeData">
      <template #extra="nodeData">
        <IconPlus
          class="sd:absolute sd:top-[10px] sd:right-2 sd:text-xs sd:text-[#3370ff]"
          @click="() => onIconClick(nodeData)"
        />
      </template>
    </sd-tree>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  import { IconPlus } from '@sdata/web-vue/es/icon/index.js';

  const treeData = ref([
    {
      title: 'Trunk',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk',
      key: '0-1',
      children: [
        {
          title: 'Branch',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
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
  ]);

  function onIconClick(nodeData) {
    const children = nodeData.children || [];
    children.push({
      title: 'new tree node',
      key: `${nodeData.key}-${children.length + 1}`,
    });
    nodeData.children = children;
    treeData.value = [...treeData.value];
  }
</script>
