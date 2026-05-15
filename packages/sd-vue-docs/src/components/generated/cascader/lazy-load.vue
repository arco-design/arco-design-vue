<template>
  <sd-space>
    <sd-cascader
      :options="options"
      class="sd:w-[320px]"
      placeholder="Please select ..."
      :load-more="loadMore"
    />
  </sd-space>
</template>

<script setup lang="ts">
  const options = [
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
  const loadMore = (option, done) => {
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
