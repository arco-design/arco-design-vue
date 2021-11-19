<template>
  <trigger
    :class="prefixCls"
    trigger="click"
    :position="position"
    show-arrow
    :popup-visible="computedPopupVisible"
    :popup-offset="10"
    :popup-container="popupContainer"
    :content-class="contentCls"
    :content-style="contentStyle"
    :arrow-class="arrowCls"
    :arrow-style="arrowStyle"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <slot />
    <template #content>
      <div :class="`${prefixCls}-body`">
        <span :class="`${prefixCls}-icon`">
          <slot name="icon">
            <icon-info-circle-fill v-if="type === 'info'" />
            <icon-check-circle-fill v-else-if="type === 'success'" />
            <icon-exclamation-circle-fill v-else-if="type === 'warning'" />
            <icon-close-circle-fill v-else-if="type === 'error'" />
          </slot>
        </span>
        <span :class="`${prefixCls}-content`">
          <slot name="content">{{ content }}</slot>
        </span>
      </div>
      <div :class="`${prefixCls}-footer`">
        <arco-button v-bind="cancelButtonProps" @click="handleCancel">
          {{ cancelText || t('popconfirm.cancelText') }}
        </arco-button>
        <arco-button
          v-bind="okButtonProps"
          type="primary"
          :loading="okLoading"
          @click="handleOk"
        >
          {{ okText || t('popconfirm.okText') }}
        </arco-button>
      </div>
    </template>
  </trigger>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, CSSProperties, defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  MESSAGE_TYPES,
  MessageType,
  TRIGGER_POSITIONS,
  TriggerPosition,
} from '../_utils/constant';
import IconInfoCircleFill from '../icon/icon-info-circle-fill';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import IconCloseCircleFill from '../icon/icon-close-circle-fill';
import ArcoButton from '../button';
import Trigger from '../trigger';
import { useI18n } from '../locale';
import { ClassName } from '../_utils/types';

export default defineComponent({
  name: 'Popconfirm',
  components: {
    ArcoButton,
    Trigger,
    IconInfoCircleFill,
    IconCheckCircleFill,
    IconExclamationCircleFill,
    IconCloseCircleFill,
  },
  props: {
    /**
     * @zh 标题
     * @en Title
     */
    title: String,
    /**
     * @zh 内容
     * @en Content
     */
    content: String,
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
     */
    position: {
      type: String as PropType<TriggerPosition>,
      default: 'top',
      validator: (value: any) => {
        return TRIGGER_POSITIONS.includes(value);
      },
    },
    /**
     * @zh 气泡确认框是否可见
     * @en Whether the popconfirm is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 气泡确认框默认是否可见（非受控模式）
     * @en Whether the popconfirm is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 气泡确认框的类型
     * @en Types of the popconfirm
     * @values 'info','success','warning','error'
     */
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
      validator: (value: any) => {
        return MESSAGE_TYPES.includes(value);
      },
    },
    /**
     * @zh 确认按钮的内容
     * @en The content of the ok button
     */
    okText: String,
    /**
     * @zh 取消按钮的内容
     * @en The content of the cancel button
     */
    cancelText: String,
    /**
     * @zh 确认按钮是否为加载中状态
     * @en Whether the ok button is in the loading state
     */
    okLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 确认按钮的Props
     * @en Props of ok button
     */
    okButtonProps: {
      type: Object,
    },
    /**
     * @zh 取消按钮的Props
     * @en Props of cancel button
     */
    cancelButtonProps: {
      type: Object,
    },
    /**
     * @zh 弹出框内容的类名
     * @en The class name of the popup content
     */
    contentClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 弹出框内容的样式
     * @en The style of the popup content
     */
    contentStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 弹出框箭头的类名
     * @en The class name of the popup arrow
     */
    arrowClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 弹出框箭头的样式
     * @en The style of the popup arrow
     */
    arrowStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 弹出框的挂载点
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
    /**
     * @zh 点击确认按钮是否关闭
     * @en Close after click ok button
     */
    okClose: {
      type: Boolean,
      default: true
    },
  },
  emits: [
    'update:popupVisible',
    /**
     * @zh 气泡确认框的显隐状态改变时触发
     * @en Triggered when the visible or hidden state of the bubble confirmation box changes
     */
    'popupVisibleChange',
    /**
     * @zh 点击确认按钮时触发
     * @en Triggered when the confirm button is clicked
     */
    'ok',
    /**
     * @zh 点击取消按钮时触发
     * @en Triggered when the cancel button is clicked
     */
    'cancel',
  ],
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('popconfirm');
    const { t } = useI18n();

    const _popupVisible = ref(props.defaultPopupVisible);
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );

    const close = () => {
      _popupVisible.value = false;
      emit('update:popupVisible', false);
      emit('popupVisibleChange', false);
    };

    const handlePopupVisibleChange = (visible: boolean) => {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    };

    const handleOk = () => {
      emit('ok');
      if(props.okClose){
        close();
      }
    };

    const handleCancel = () => {
      emit('cancel');
      close();
    };

    const contentCls = computed(() => [
      `${prefixCls}-popup-content`,
      props.contentClass,
    ]);

    const arrowCls = computed(() => [
      `${prefixCls}-popup-arrow`,
      props.arrowClass,
    ]);

    return {
      prefixCls,
      computedPopupVisible,
      contentCls,
      arrowCls,
      handlePopupVisibleChange,
      handleOk,
      handleCancel,
      t,
    };
  },
});
</script>
