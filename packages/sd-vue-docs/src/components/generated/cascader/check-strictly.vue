<template>
  <sd-space direction="vertical" size="large">
    <sd-cascader
      :options="options"
      default-value="beijing"
      class="sd:w-80"
      placeholder="Please select ..."
      check-strictly
    />
    <sd-cascader
      :options="options"
      :default-value="['beijing']"
      class="sd:w-80"
      placeholder="Please select ..."
      multiple
      check-strictly
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { CascaderOption } from '@sdata/web-vue';

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
          disabled: true,
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
