<template>
  <div class="sd:w-90">
    <sd-radio-group v-model="preset" type="button" class="sd:mb-3">
      <sd-radio value="default">default fixed</sd-radio>
      <sd-radio value="explicit">explicit itemSize</sd-radio>
    </sd-radio-group>

    <div class="sd:mb-3 sd:text-[var(--color-text-2)] sd:text-xs sd:leading-[1.5]">
      {{ helperText }}
    </div>

    <sd-cascader
      :options="options"
      class="sd:w-full"
      placeholder="Please select ..."
      allow-search
      :trigger-props="{ popupStyle: { maxHeight: '220px' } }"
      :virtual-list-props="virtualListProps"
    />
  </div>
</template>

<script setup lang="ts">
  import type {
    CascaderChangeHandler,
    CascaderFallback,
    CascaderFormatLabel,
    CascaderLoadMore,
    CascaderOption,
    CascaderPathValue,
  } from '@sdata/web-vue';

  import { computed, ref } from 'vue';

  const preset = ref<'default' | 'explicit'>('default');

  const helperText = computed(() => {
    return preset.value === 'default'
      ? "The large second-level columns use Cascader's new default fixed-height virtualization."
      : 'Explicit itemSize: 36 is helpful when you want to standardize multiple cascader panels.';
  });

  const virtualListProps = computed(() => {
    return preset.value === 'default' ? {} : { itemSize: 36, buffer: 260 };
  });

  const createLeafOptions = (prefix: string, count: number): CascaderOption[] => {
    return Array(count)
      .fill(null)
      .map((_, index) => ({
        value: `${prefix}-${index}`,
        label: `${prefix} option ${index}`,
      }));
  };

  const options: CascaderOption[] = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'Chaoyang',
          children: createLeafOptions('Chaoyang', 1200),
        },
        {
          value: 'haidian',
          label: 'Haidian',
          children: createLeafOptions('Haidian', 800),
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'pudong',
          label: 'Pudong',
          children: createLeafOptions('Pudong', 1500),
        },
        {
          value: 'minhang',
          label: 'Minhang',
          children: createLeafOptions('Minhang', 900),
        },
      ],
    },
  ];
</script>
