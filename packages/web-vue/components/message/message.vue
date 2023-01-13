<template>
  <li
    role="alert"
    :class="[
      prefixCls,
      `${prefixCls}-${type}`,
      { [`${prefixCls}-closable`]: closable },
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-if="showIcon && !(type === 'normal' && !$slots.icon)"
      :class="`${prefixCls}-icon`"
    >
      <slot name="icon">
        <icon-info-circle-fill v-if="type === 'info'" />
        <icon-check-circle-fill v-else-if="type === 'success'" />
        <icon-exclamation-circle-fill v-else-if="type === 'warning'" />
        <icon-close-circle-fill v-else-if="type === 'error'" />
        <icon-loading v-else-if="type === 'loading'" />
      </slot>
    </span>
    <span :class="`${prefixCls}-content`">
      <slot />
    </span>
    <span
      v-if="closable"
      :class="`${prefixCls}-close-btn`"
      @click="handleClose"
    >
      <a-icon-hover>
        <icon-close />
      </a-icon-hover>
    </span>
  </li>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, onUnmounted, onUpdated } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { MESSAGE_TYPES, MessageType } from '../_utils/constant';
import AIconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import IconInfoCircleFill from '../icon/icon-info-circle-fill';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import IconCloseCircleFill from '../icon/icon-close-circle-fill';
import IconLoading from '../icon/icon-loading';

export default defineComponent({
  name: 'Message',
  components: {
    AIconHover,
    IconInfoCircleFill,
    IconCheckCircleFill,
    IconExclamationCircleFill,
    IconCloseCircleFill,
    IconClose,
    IconLoading,
  },
  props: {
    type: {
      type: String as PropType<MessageType | 'loading' | 'normal'>,
      default: 'info',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    resetOnUpdate: {
      type: Boolean,
      default: false,
    },
    resetOnHover: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('message');
    let timer = 0;

    const handleClose = () => {
      emit('close');
    };

    const startTimer = () => {
      if (props.duration > 0) {
        timer = window.setTimeout(handleClose, props.duration);
      }
    };

    const clearTimer = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
      }
    };

    onMounted(() => {
      startTimer();
    });

    onUpdated(() => {
      if (props.resetOnUpdate) {
        clearTimer();
        startTimer();
      }
    });

    onUnmounted(() => {
      clearTimer();
    });

    const handleMouseEnter = () => {
      if (props.resetOnHover) {
        clearTimer();
      }
    };

    const handleMouseLeave = () => {
      if (props.resetOnHover) {
        startTimer();
      }
    };
    return {
      handleMouseEnter,
      handleMouseLeave,
      prefixCls,
      handleClose,
    };
  },
});
</script>
