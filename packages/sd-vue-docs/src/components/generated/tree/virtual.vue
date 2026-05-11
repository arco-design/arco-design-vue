<template>
  <div :style="{ width: '420px' }">
    <sd-radio-group v-model="size" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>

    <sd-radio-group v-model="mode" type="button" :style="{ marginBottom: '12px' }">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="dynamic">动态高度</sd-radio>
    </sd-radio-group>

    <div :style="helperStyle">
      {{ helperText }}
    </div>

    <sd-button type="primary" :style="{ marginBottom: '12px' }" @click="scrollIntoView">
      滚动到 0-0-2-2
    </sd-button>

    <sd-tree
      ref="treeRef"
      blockNode
      checkable
      :size="size"
      :data="treeData"
      :virtualListProps="virtualListProps"
    >
      <template #title="nodeData">
        <div v-if="mode === 'dynamic' && nodeData.description" :style="dynamicTitleStyle">
          <div>{{ nodeData.title }}</div>
          <div :style="dynamicDescriptionStyle">{{ nodeData.description }}</div>
        </div>
        <template v-else>
          {{ nodeData.title }}
        </template>
      </template>
    </sd-tree>
  </div>
</template>
<script>
  import { computed, ref } from 'vue';

  const sizeToItemSize = {
    mini: 24,
    small: 28,
    medium: 32,
    large: 36,
  };

  export default {
    setup() {
      const treeRef = ref();
      const size = ref('medium');
      const mode = ref('default');
      const treeData = loop();

      const helperStyle = {
        marginBottom: '12px',
        color: 'var(--color-text-2)',
        fontSize: '12px',
        lineHeight: '1.5',
      };

      const dynamicTitleStyle = {
        padding: '6px 0',
      };

      const dynamicDescriptionStyle = {
        fontSize: '12px',
        lineHeight: '1.5',
        color: 'var(--color-text-3)',
        marginTop: '2px',
      };

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

      return {
        treeRef,
        treeData,
        size,
        mode,
        helperStyle,
        helperText,
        virtualListProps,
        scrollIntoView,
        dynamicTitleStyle,
        dynamicDescriptionStyle,
      };
    },
  };

  function loop(path = '0', level = 2) {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
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
</script>
