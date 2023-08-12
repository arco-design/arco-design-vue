<template>
  <template v-if="error.length > 0">
    <template v-for="item of error" :key="item">
      <transition name="form-blink" appear>
        <div role="alert" :class="[prefixCls]">
          {{ item }}
        </div>
      </transition>
    </template>
  </template>
  <transition v-else-if="help || $slots.help" name="form-blink" appear>
    <div :class="[prefixCls, `${prefixCls}-help`]">
      <slot name="help">
        {{ help }}
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'FormItemMessage',
  props: {
    error: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    help: String,
  },
  setup() {
    const prefixCls = getPrefixCls('form-item-message');

    return {
      prefixCls,
    };
  },
});
</script>
