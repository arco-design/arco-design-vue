<template>
  <div class="config-provider-allow-search-demo">
    <sd-space align="center" wrap>
      <sd-switch v-model="enabled">
        <template #checked>全局 allowSearch 开启</template>
        <template #unchecked>全局 allowSearch 关闭</template>
      </sd-switch>
      <sd-tag color="blue">组件显式传入 allow-search 时优先级更高</sd-tag>
    </sd-space>

    <sd-config-provider :allow-search="enabled">
      <sd-space direction="vertical" fill>
        <sd-cascader :options="cityOptions" placeholder="Cascader 会继承全局 allowSearch" />
        <sd-tree-select
          :data="treeOptions"
          placeholder="TreeSelect 也会继承这个默认值"
          tree-check-strictly
        />
        <sd-select :options="selectOptions" placeholder="Select 保持可搜索行为" />
        <sd-cascader
          :options="cityOptions"
          :allow-search="false"
          placeholder="这个 Cascader 显式关闭了 allowSearch"
        />
      </sd-space>
    </sd-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const enabled = ref(true);
  const cityOptions = [
    {
      label: '浙江',
      value: 'zhejiang',
      children: [
        { label: '杭州', value: 'hangzhou' },
        { label: '宁波', value: 'ningbo' },
      ],
    },
    {
      label: '四川',
      value: 'sichuan',
      children: [
        { label: '成都', value: 'chengdu' },
        { label: '绵阳', value: 'mianyang' },
      ],
    },
  ];
  const treeOptions = [
    {
      title: '华东',
      key: 'east',
      value: 'east',
      children: [
        { title: '上海', key: 'shanghai', value: 'shanghai' },
        { title: '杭州', key: 'hangzhou', value: 'hangzhou' },
      ],
    },
  ];
  const selectOptions = [
    { label: '上海', value: 'shanghai' },
    { label: '杭州', value: 'hangzhou' },
    { label: '成都', value: 'chengdu' },
  ];
</script>

<style scoped>
  .config-provider-allow-search-demo {
    display: grid;
    gap: 12px;
  }
</style>
