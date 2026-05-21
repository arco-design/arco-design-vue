<template>
  <sd-space>
    <sd-cascader
      :options="options"
      class="sd:w-80"
      placeholder="Please select ..."
      :load-more="loadMore"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { CascaderLoadMore, CascaderOption } from '@sdata/web-vue';

  const options: CascaderOption[] = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
        },
        {
          value: 'haidian',
          label: 'Haidian',
          isLeaf: true,
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
          isLeaf: true,
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
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
          isLeaf: true,
        },
      ],
    },
  ];
  const loadMore: CascaderLoadMore = (option, done) => {
    window.setTimeout(() => {
      const nodes = [
        {
          value: `${option.value}-option1`,
          label: `${option.label}-Option1`,
          isLeaf: true,
        },
        {
          value: `${option.value}-option2`,
          label: `${option.label}-Option2`,
          isLeaf: true,
        },
      ];
      done(nodes);
    }, 2000);
  };
</script>
