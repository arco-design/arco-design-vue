<template>
  <div :class="prefixCls">
    <div
      :class="[
        `${prefixCls}-left`,
        {
          [`${prefixCls}-disabled`]: !onPrev,
        },
      ]"
      @click="
        (e) => {
          e.preventDefault();
          onPrev && onPrev();
        }
      "
    >
      <icon-left />
    </div>
    <div
      :class="[
        `${prefixCls}-right`,
        {
          [`${prefixCls}-disabled`]: !onNext,
        },
      ]"
      @click="
        (e) => {
          e.preventDefault();
          onNext && onNext();
        }
      "
    >
      <icon-right />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';
  import IconLeft from '../icon/icon-left';
  import IconRight from '../icon/icon-right';

  defineOptions({ name: 'ImagePreviewArrow' });

  const props = defineProps({
    onPrev: {
      type: Function,
    },
    onNext: {
      type: Function,
    },
  });

  const prefixCls = getPrefixCls('image-preview-arrow');
</script>
