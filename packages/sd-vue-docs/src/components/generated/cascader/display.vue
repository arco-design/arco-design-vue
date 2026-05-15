<template>
  <sd-space direction="vertical" size="large">
    <sd-cascader
      :options="options"
      default-value="datunli"
      class="sd:w-80"
      placeholder="Show full path"
      separator=" > "
    />
    <sd-cascader
      :options="options"
      default-value="datunli"
      class="sd:w-80"
      placeholder="Only show leaf label"
      :show-path="false"
    />
    <sd-cascader
      :options="options"
      :default-value="['chaoyang', 'haidian', 'dongcheng']"
      class="sd:w-80"
      placeholder="Responsive tags"
      multiple
      allow-clear
      max-tag-count="responsive"
    />
  </sd-space>
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
