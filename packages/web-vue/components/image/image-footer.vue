<template>
  <div :class="prefixCls">
    <div v-if="title || description" :class="`${prefixCls}-caption`">
      <div v-if="title" :class="`${prefixCls}-caption-title`" :title="title">
        {{ title }}
      </div>
      <div v-if="description" :class="`${prefixCls}-caption-description`" :title="description">
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.extra" :class="`${prefixCls}-extra`">
      <slot name="extra" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'ImageFooter' });

  const props = defineProps({
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  });

  const prefixCls = getPrefixCls('image-footer');
</script>
