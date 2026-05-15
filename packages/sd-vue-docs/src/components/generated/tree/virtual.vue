<template>
  <div class="sd:w-105">
    <sd-radio-group v-model="size" type="button" class="sd:mb-3">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>

    <sd-radio-group v-model="mode" type="button" class="sd:mb-3">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="dynamic">动态高度</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-button type="primary" class="sd:mb-3" @click="scrollIntoView"> 滚动到 0-0-2-2 </sd-button>

    <sd-tree
      ref="treeRef"
      blockNode
      checkable
      :size="size"
      :data="treeData"
      :virtualListProps="virtualListProps"
    >
      <template #title="nodeData">
        <div v-if="mode === 'dynamic' && nodeData.description" class="sd:py-1.5">
          <div>{{ nodeData.title }}</div>
          <div class="sd:text-xs sd:leading-[1.5] sd:text-[var(--color-text-3)] sd:mt-0.5">{{
            nodeData.description
          }}</div>
        </div>
        <template v-else>
          {{ nodeData.title }}
        </template>
      </template>
    </sd-tree>
  </div>
</template>
<script setup lang="ts">
  import type {
    CheckedStrategy,
    LoadMore,
    Size,
    TreeCheckHandler,
    TreeDropHandler,
    TreeExpandHandler,
    TreeNodeData,
    TreeNodeKey,
    TreeSelectHandler,
  } from '@sdata/web-vue';

  import { computed, ref } from 'vue';

  const sizeToItemSize = {
    mini: 24,
    small: 28,
    medium: 32,
    large: 36,
  };

  function loop(path = '0', level = 2) {
    const list: TreeNodeData[] = [];
    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode: TreeNodeData = {
        title: `Node ${key}`,
        key,
      };

      if (level === 0 && i % 3 === 0) {
        treeNode.description =
          '动态模式可在不强制每行保持相同高度的情况下，确保多行辅助文本仍清晰可读。';
      }

      if (level > 0) {
        treeNode.children = loop(key, level - 1);
      }

      list.push(treeNode);
    }
    return list;
  }

  const treeRef = ref();
  const size = ref<Size>('medium');
  const mode = ref<'default' | 'dynamic'>('default');
  const treeData = loop();

  const helperText = computed(() => {
    return mode.value === 'default'
      ? `Tree 默认固定高度，映射 ${size.value} 行到 ${sizeToItemSize[size.value]}px。`
      : `动态高度模式使用 minItemSize: ${sizeToItemSize[size.value]}，并保持组件封装的 scrollbar。`;
  });

  const virtualListProps = computed(() => {
    return mode.value === 'default'
      ? { height: 240 }
      : { height: 240, minItemSize: sizeToItemSize[size.value] };
  });

  const scrollIntoView = () => {
    treeRef.value?.scrollIntoView({ key: '0-0-2-2' });
  };
</script>
