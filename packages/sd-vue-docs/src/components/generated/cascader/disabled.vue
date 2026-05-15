<template>
  <sd-cascader :options="options" class="sd:w-[320px]" placeholder="Please select ..." />
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
              disabled: true,
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
