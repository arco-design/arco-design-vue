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

<script setup lang="ts">
  import { PropType } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'FormItemMessage' });

  const props = defineProps({
    error: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    help: String,
  });

  const prefixCls = getPrefixCls('form-item-message');
</script>
