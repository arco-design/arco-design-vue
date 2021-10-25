<template>
  <div v-if="isHelp" :class="cls">
    <slot />
  </div>
  <transition v-else name="form-blink" appear>
    <div :class="cls">
      <slot>
        {{ error }}
      </slot>
    </div>
  </transition>
</template>

<script lang="tsx">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'FormItemMessage',
  props: {
    error: String,
    isHelp: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('form-item-message');

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-help`]: props.isHelp,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
