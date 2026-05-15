<template>
  <div class="sd:w-90">
    <sd-radio-group v-model="size" type="button" class="sd:mb-3">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>

    <sd-radio-group v-model="mode" type="button" class="sd:mb-3">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="explicit">显式设置 itemSize</sd-radio>
      <sd-radio value="dynamic">动态高度</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-tree-select
      :data="treeData"
      :size="size"
      :allow-search="{
        retainInputValue: true,
      }"
      multiple
      tree-checkable
      tree-checked-strategy="parent"
      :trigger-props="{ popupStyle: { maxHeight: '240px' } }"
      :virtual-list-props="virtualListProps"
      placeholder="Select nodes"
    />
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';

  const sizeToItemSize = {
    mini: 24,
    small: 28,
    medium: 32,
    large: 36,
  };

  function loop(path = '0', level = 2) {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
        title: `Node ${key}`,
        key,
      };

      if (level > 0) {
        treeNode.children = loop(key, level - 1);
      }

      list.push(treeNode);
    }
    return list;
  }

  const size = ref('medium');
  const mode = ref('default');
  const treeData = loop();

  const helperText = computed(() => {
    if (mode.value === 'default') {
      return `TreeSelect 现在支持直接使用 virtual-list-props，并会将 ${size.value} 行映射为默认的 ${sizeToItemSize[size.value]}px 高度。`;
    }

    if (mode.value === 'explicit') {
      return `显式设置 itemSize 可保持弹出层在相同的 ${sizeToItemSize[size.value]}px 固定行网格中。`;
    }

    return `动态模式下，minItemSize 设置为 ${sizeToItemSize[size.value]}，用于可展开的可变高度树行。`;
  });

  const virtualListProps = computed(() => {
    if (mode.value === 'default') {
      return {};
    }

    if (mode.value === 'explicit') {
      return { itemSize: sizeToItemSize[size.value], buffer: 220 };
    }

    return { minItemSize: sizeToItemSize[size.value], buffer: 220 };
  });
</script>
