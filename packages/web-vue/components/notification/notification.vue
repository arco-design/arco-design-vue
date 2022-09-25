<template>
  <li
    role="alert"
    :class="[
      prefixCls,
      `${prefixCls}-${type}`,
      { [`${prefixCls}-closable`]: closable },
    ]"
  >
    <div v-if="showIcon" :class="`${prefixCls}-left`">
      <div :class="`${prefixCls}-icon`">
        <slot name="icon">
          <icon-info-circle-fill v-if="type === 'info'" />
          <icon-check-circle-fill v-else-if="type === 'success'" />
          <icon-exclamation-circle-fill v-else-if="type === 'warning'" />
          <icon-close-circle-fill v-else-if="type === 'error'" />
        </slot>
      </div>
    </div>
    <div :class="`${prefixCls}-right`">
      <div v-if="$slots.default" :class="`${prefixCls}-title`">
        <slot />
      </div>
      <div v-if="$slots.content" :class="`${prefixCls}-content`">
        <slot name="content" />
      </div>
      <div v-if="$slots.footer" :class="`${prefixCls}-footer`">
        <slot name="footer" />
      </div>
    </div>
    <div v-if="closable" :class="`${prefixCls}-close-btn`" @click="handleClose">
      <slot name="closeIconElement">
        <a-icon-hover>
          <slot name="closeIcon">
            <icon-close />
          </slot>
        </a-icon-hover>
      </slot>
    </div>
  </li>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, onUnmounted, onUpdated } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { MessageType } from '../_utils/constant';
import AIconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import IconInfoCircleFill from '../icon/icon-info-circle-fill';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import IconCloseCircleFill from '../icon/icon-close-circle-fill';

export default defineComponent({
  name: 'Notification',
  components: {
    AIconHover,
    IconInfoCircleFill,
    IconCheckCircleFill,
    IconExclamationCircleFill,
    IconCloseCircleFill,
    IconClose,
  },
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    resetOnUpdate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, context) {
    const prefixCls = getPrefixCls('notification');
    let timer = 0;

    const handleClose = () => {
      context.emit('close');
    };

    onMounted(() => {
      if (props.duration > 0) {
        timer = window.setTimeout(handleClose, props.duration);
      }
    });

    onUpdated(() => {
      if (props.resetOnUpdate) {
        if (timer) {
          window.clearTimeout(timer);
          timer = 0;
        }
        if (props.duration > 0) {
          timer = window.setTimeout(handleClose, props.duration);
        }
      }
    });

    onUnmounted(() => {
      if (timer) {
        window.clearTimeout(timer);
      }
    });

    return {
      prefixCls,
      handleClose,
    };
  },
});
</script>
