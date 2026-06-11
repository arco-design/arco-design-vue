<template>
  <li
    role="alert"
    :class="[prefixCls, `${prefixCls}-${type}`, { [`${prefixCls}-closable`]: closable }]"
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

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { onMounted, onUnmounted, onUpdated } from 'vue';

  import AIconHover from '../_components/icon-hover.vue';
  import { MessageType } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import IconCheckCircleFill from '../icon/icon-check-circle-fill';
  import IconClose from '../icon/icon-close';
  import IconCloseCircleFill from '../icon/icon-close-circle-fill';
  import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
  import IconInfoCircleFill from '../icon/icon-info-circle-fill';

  defineOptions({ name: 'Notification' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{ close: [] }>();

  const prefixCls = getPrefixCls('notification');
  let timer = 0;

  const handleClose = () => {
    emit('close');
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
</script>
