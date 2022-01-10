<template>
  <transition v-if="help || $slots.help" name="form-blink" appear>
    <div :class="[prefixCls, `${prefixCls}-help`]">
      <slot name="help">
        {{ help }}
      </slot>
    </div>
  </transition>
  <transition v-for="item of error" v-else :key="item" name="form-blink" appear>
    <div :class="[prefixCls]">
      {{ item }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'FormItemMessage',
  props: {
    error: Array,
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
