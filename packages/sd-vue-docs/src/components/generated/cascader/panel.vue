<template>
  <sd-cascader-panel :options="options" v-model="value" expand-child />
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

  import { ref } from 'vue';

  const value = ref('');

  const options: CascaderOption[] = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli',
            },
          ],
        },
        {
          value: 'haidian',
          label: 'Haidian',
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
          children: [
            {
              value: 'jinrongjie',
              label: 'Jinrongjie',
            },
            {
              value: 'tianqiao',
              label: 'Tianqiao',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'huangpu',
          label: 'Huangpu',
        },
      ],
    },
  ];
</script>
