<template>
  <sd-space size="large">
    <sd-avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      @click="toast"
      class="sd:bg-[#168cff]"
    >
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </sd-avatar>
    <sd-avatar @click="toast" class="sd:bg-[#14c9c9]">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </sd-avatar>
    <sd-avatar @click="toast" shape="square" class="sd:bg-[#ffc72e]">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </sd-avatar>
    <sd-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </sd-avatar>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconCamera, IconEdit, IconUser } from '@sdata/web-vue/es/icon/index.js';

  function toast() {
    this.$message.info('Uploading...');
  }
</script>
