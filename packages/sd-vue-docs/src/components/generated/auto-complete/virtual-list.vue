<template>
  <div class="sd:w-90">
    <sd-radio-group v-model="preset" type="button" class="sd:mb-3">
      <sd-radio value="default">默认固定高度</sd-radio>
      <sd-radio value="explicit">显式设置 itemSize</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-auto-complete
      :data="data"
      @search="handleSearch"
      class="sd:w-full"
      placeholder="Type sd or design"
      :trigger-props="{ popupStyle: { maxHeight: '220px' } }"
      :virtual-list-props="virtualListProps"
    />
  </div>
</template>

<script setup lang="ts">
  import type {
    AutoCompleteData,
    AutoCompleteDropdownReachBottomHandler,
    AutoCompleteDropdownScrollHandler,
    AutoCompleteSearchHandler,
  } from '@sdata/web-vue';

  import { computed, ref } from 'vue';

  const preset = ref<'default' | 'explicit'>('default');
  const data = ref<AutoCompleteData>([]);

  const helperText = computed(() => {
    return preset.value === 'default'
      ? 'AutoComplete 现在默认使用固定高度的虚拟行，当你只启用 virtual-list-props 时。'
      : '显式设置 itemSize: 36 在你希望保持下拉配置自描述时非常有用。';
  });

  const virtualListProps = computed(() => {
    return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
  });

  const createData = (value: string) => {
    if (!value) {
      return [];
    }

    return [...Array(3000)].map((_, index) => `${value}-result-${index}`);
  };

  const handleSearch: AutoCompleteSearchHandler = (value) => {
    data.value = createData(value);
  };
</script>
