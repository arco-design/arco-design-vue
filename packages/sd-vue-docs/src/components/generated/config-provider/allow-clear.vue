<template>
  <div class="config-provider-allow-clear-demo">
    <sd-space align="center" wrap>
      <sd-switch v-model="enabled">
        <template #checked>全局 allowClear 开启</template>
        <template #unchecked>全局 allowClear 关闭</template>
      </sd-switch>
      <sd-tag color="blue">组件显式传入 allow-clear 时优先级更高</sd-tag>
    </sd-space>

    <sd-config-provider :allow-clear="enabled">
      <sd-space direction="vertical" fill>
        <sd-input default-value="Input 会继承全局 allowClear" placeholder="请输入内容" />
        <sd-textarea default-value="Textarea 也会继承这个默认值" placeholder="请输入多行内容" />
        <sd-select :options="cityOptions" default-value="shanghai" placeholder="请选择城市" />
        <sd-input
          default-value="这个输入框显式关闭了 allowClear"
          :allow-clear="false"
          placeholder="显式 props 优先"
        />
      </sd-space>
    </sd-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const enabled = ref(true);
  const cityOptions = [
    { label: '上海', value: 'shanghai' },
    { label: '杭州', value: 'hangzhou' },
    { label: '成都', value: 'chengdu' },
  ];
</script>

<style scoped>
  .config-provider-allow-clear-demo {
    display: grid;
    gap: 12px;
  }
</style>
