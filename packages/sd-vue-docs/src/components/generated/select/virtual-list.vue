<template>
  <div class="sd:w-90">
    <sd-radio-group v-model="preset" type="button" class="sd:mb-3">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="explicit">显式设置 itemSize</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-select
      class="sd:w-full"
      :options="options"
      placeholder="Please select ..."
      :trigger-props="{ popupStyle: { maxHeight: '220px' } }"
      :virtual-list-props="virtualListProps"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { computed, ref } from 'vue';

  const preset = ref<'default' | 'explicit'>('default');

  const helperText = computed(() => {
    return preset.value === 'default'
      ? '使用空对象 `{}` 可展示 Select 控件的新默认固定高度下拉菜单行为。'
      : '使用 itemSize: 36 可显式设置固定高度模式，并增加渲染缓冲区。';
  });

  const virtualListProps = computed(() => {
    return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
  });

  const options = Array(1500)
    .fill(null)
    .map((_, index) => ({
      value: `option-${index}`,
      label: `选项 ${index} · 虚拟行 ${index % 9}`,
    }));
</script>
