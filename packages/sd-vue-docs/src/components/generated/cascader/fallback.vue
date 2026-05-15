<template>
  <sd-space direction="vertical" size="large">
    <sd-cascader
      :options="options"
      v-model="value"
      class="sd:w-[320px]"
      placeholder="Please select ..."
      multiple
    />
    <sd-cascader
      :options="options"
      v-model="value2"
      class="sd:w-[320px]"
      placeholder="Please select ..."
      path-mode
      multiple
      :fallback="fallback"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref(['datunli', 'wuhou']);
  const value2 = ref([
    ['beijing', 'chaoyang', 'datunli'],
    ['sichuan', 'chengdu', 'wuhou'],
  ]);
  const fallback = (value) => {
    return value.map((item) => item.toUpperCase()).join('-');
  };

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
