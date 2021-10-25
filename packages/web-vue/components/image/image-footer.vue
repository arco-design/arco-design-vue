<template>
  <div :class="prefixCls">
    <div v-if="title || description" :class="`${prefixCls}-caption`">
      <div v-if="title" :class="`${prefixCls}-caption-title`" :title="title">
        {{ title }}
      </div>
      <div
        v-if="description"
        :class="`${prefixCls}-caption-description`"
        :title="description"
      >
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.extra" :class="`${prefixCls}-extra`">
      <slot name="extra" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'ImageFooter',
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  setup() {
    const prefixCls = getPrefixCls('image-footer');

    return {
      prefixCls,
    };
  },
});
</script>
