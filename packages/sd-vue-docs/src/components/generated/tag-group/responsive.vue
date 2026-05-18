<template>
  <sd-space direction="vertical" fill>
    <sd-typography-text type="secondary">
      拖拽右侧手柄，观察标签组如何根据容器宽度自动折叠。
    </sd-typography-text>
    <sd-resize-box
      v-model:width="width"
      :directions="['right']"
      class="sd:min-w-25 sd:max-w-full sd:p-2"
    >
      <div class="sd:w-full">
        <sd-tag-group :options="options" />
      </div>
    </sd-resize-box>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const width = ref(300);
  const options = ['超长标签文案需要折叠', '处理中', '已告警'];
</script>
