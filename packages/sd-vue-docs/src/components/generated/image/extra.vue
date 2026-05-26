<template>
  <sd-image
    src="https://picsum.photos/1000/1000"
    title="A user’s avatar"
    description="Present by SD Design"
    width="260"
    class="sd:mr-[67px] sd:align-top"
    :preview-visible="visible1"
    @preview-visible-change="
      () => {
        visible1 = false;
      }
    "
  >
    <template #extra>
      <div class="actions">
        <span
          class="action"
          @click="
            () => {
              visible1 = true;
            }
          "
          ><icon-eye
        /></span>
        <span class="action" @click="onDownLoad"><icon-download /></span>
        <sd-tooltip content="A user’s avatar">
          <span class="action"><icon-info-circle /></span>
        </sd-tooltip>
      </div>
    </template>
  </sd-image>
  <sd-image
    src="https://picsum.photos/1000/1000"
    title="A user’s avatar"
    description="Present by SD Design"
    width="260"
    footer-position="outer"
    :preview-visible="visible2"
    @preview-visible-change="
      () => {
        visible2 = false;
      }
    "
  >
    <template #extra>
      <div class="actions actions-outer">
        <span
          class="action"
          @click="
            () => {
              visible2 = true;
            }
          "
          ><icon-eye
        /></span>
        <span class="action" @click="onDownLoad"><icon-download /></span>
        <sd-tooltip content="A user’s avatar">
          <span class="action"><icon-info-circle /></span>
        </sd-tooltip>
      </div>
    </template>
  </sd-image>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  import { IconEye, IconDownload, IconInfoCircle } from '@sdata/web-vue/es/icon/index.js';

  const visible1 = ref(false);
  const visible2 = ref(false);

  function onDownLoad() {
    console.log('download');
  }
</script>
<style scoped>
  .actions {
    display: flex;
    align-items: center;
  }

  .action {
    margin-left: 12px;
    padding: 5px 4px;
    font-size: 14px;
    line-height: 1;
    border-radius: 2px;
    cursor: pointer;
  }

  .action:first-child {
    margin-left: 0;
  }

  .action:hover {
    background: rgb(0 0 0 / 50%);
  }

  .actions-outer {
    .action {
      &:hover {
        color: #fff;
      }
    }
  }
</style>
