<template>
  <transition name="zoom-in-top" @after-leave="handleAfterLeave">
    <div v-if="visible" :class="cls">
      <div v-if="showIcon" :class="`${prefixCls}-icon`">
        <slot name="icon">
          <icon-info-circle-fill v-if="type === 'info'" />
          <icon-check-circle-fill v-else-if="type === 'success'" />
          <icon-exclamation-circle-fill v-else-if="type === 'warning'" />
          <icon-close-circle-fill v-else-if="type === 'error'" />
        </slot>
      </div>
      <div :class="`${prefixCls}-body`">
        <div v-if="title || $slots.title" :class="`${prefixCls}-title`">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div :class="`${prefixCls}-content`">
          <slot />
        </div>
      </div>
      <div v-if="$slots.action" :class="`${prefixCls}-action`">
        <slot name="action" />
      </div>
      <div
        v-if="closable"
        :class="`${prefixCls}-close-btn`"
        @click="handleClose"
      >
        <icon-hover>
          <icon-close />
        </icon-hover>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
/**
 * @todo 增加自定义关闭按钮图标功能
 */
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { MessageType } from '../_utils/constant';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import IconInfoCircleFill from '../icon/icon-info-circle-fill';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import IconCloseCircleFill from '../icon/icon-close-circle-fill';

export default defineComponent({
  name: 'Alert',
  components: {
    IconHover,
    IconClose,
    IconInfoCircleFill,
    IconCheckCircleFill,
    IconExclamationCircleFill,
    IconCloseCircleFill,
  },
  props: {
    /**
     * @zh 警告提示的类型
     * @en Type of the alert
     * @values info, success, warning, error
     */
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    /**
     * @zh 是否展示图标
     * @en Whether to show the icon
     */
    showIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否展示关闭按钮
     * @en Whether to show the close button
     */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 警告提示的标题
     * @en The title of the alert
     */
    title: String,
    /**
     * @zh 是否作为顶部公告使用（去除边框和圆角）
     * @en Whether to use as the top announcement (remove the border and rounded corners)
     */
    banner: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onClose: {
      type: Function as PropType<() => void>,
    },
    onAfterClose: {
      type: Function as PropType<() => void>,
    },
  },
  emits: [
    /**
     * @zh 点击关闭按钮时触发
     * @en Triggered when the close button is clicked
     */
    'close',
    /**
     * @zh 关闭动画结束后触发
     * @en Triggered after the close animation ends
     */
    'afterClose',
  ],
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('alert');
    const visible = ref(true);

    const handleClose = () => {
      visible.value = false;
      emit('close');
    };

    const handleAfterLeave = () => {
      emit('afterClose');
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.type}`,
      {
        [`${prefixCls}-with-title`]: Boolean(props.title || slots.title),
        [`${prefixCls}-banner`]: props.banner,
      },
    ]);

    return {
      prefixCls,
      cls,
      visible,
      handleClose,
      handleAfterLeave,
    };
  },
});
</script>
