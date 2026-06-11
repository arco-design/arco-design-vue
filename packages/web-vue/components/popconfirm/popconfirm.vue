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
    animation-name="zoom-in-fade-out"
    auto-fit-transform-origin
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
        <sd-button size="mini" v-bind="cancelButtonProps" @click="handleCancel">
          {{ cancelText || t('popconfirm.cancelText') }}
        </sd-button>
        <sd-button
          type="primary"
          size="mini"
          v-bind="okButtonProps"
          :loading="mergedOkLoading"
          @click="handleOk"
        >
          {{ okText || t('popconfirm.okText') }}
        </sd-button>
      </div>
    </template>
  </trigger>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, CSSProperties, ref } from 'vue';

  import type { MessageType, TriggerPosition } from '../_utils/constant';

  import { getPrefixCls } from '../_utils/global-config';
  import { isBoolean, isFunction, isPromise } from '../_utils/is';
  import { ClassName } from '../_utils/types';
  import SDButton, { ButtonProps } from '../button';
  import IconCheckCircleFill from '../icon/icon-check-circle-fill';
  import IconCloseCircleFill from '../icon/icon-close-circle-fill';
  import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
  import IconInfoCircleFill from '../icon/icon-info-circle-fill';
  import { useI18n } from '../locale';
  import Trigger from '../trigger';

  defineOptions({ name: 'Popconfirm' });

  const props = defineProps({
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
      type: Object as PropType<ButtonProps>,
    },
    /**
     * @zh 取消按钮的Props
     * @en Props of cancel button
     */
    cancelButtonProps: {
      type: Object as PropType<ButtonProps>,
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
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    /**
     * @zh 触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。
     * @en The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.
     */
    onBeforeOk: {
      type: Function as PropType<
        (done: (closed: boolean) => void) => void | boolean | Promise<void | boolean>
      >,
    },
    /**
     * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
     * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
     */
    onBeforeCancel: {
      type: Function as PropType<() => boolean>,
    },
  });

  const emit = defineEmits<{
    'update:popupVisible': [_visible: boolean];
    /**
     * @zh 气泡确认框的显隐状态改变时触发
     * @en Triggered when the visible or hidden state of the bubble confirmation box changes
     * @param {boolean} visible
     */
    'popupVisibleChange': [_visible: boolean];
    /**
     * @zh 点击确认按钮时触发
     * @en Triggered when the confirm button is clicked
     */
    'ok': [];
    /**
     * @zh 点击取消按钮时触发
     * @en Triggered when the cancel button is clicked
     */
    'cancel': [];
  }>();

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

  const prefixCls = getPrefixCls('popconfirm');
  const { t } = useI18n();

  const _popupVisible = ref(props.defaultPopupVisible);
  const computedPopupVisible = computed(() => props.popupVisible ?? _popupVisible.value);
  const _okLoading = ref(false);
  const mergedOkLoading = computed(() => props.okLoading || _okLoading.value);

  // Used to ignore closed Promises
  let promiseNumber = 0;

  const close = () => {
    promiseNumber++;
    if (_okLoading.value) {
      _okLoading.value = false;
    }
    _popupVisible.value = false;
    emit('update:popupVisible', false);
    emit('popupVisibleChange', false);
  };

  const handlePopupVisibleChange = (visible: boolean) => {
    if (!visible) {
      close();
    } else {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    }
  };

  const handleOk = async () => {
    const currentPromiseNumber = promiseNumber;
    const closed = await new Promise<boolean>(
      // oxlint-disable-next-line no-async-promise-executor
      async (resolve) => {
        if (isFunction(props.onBeforeOk)) {
          let result = props.onBeforeOk((closed = true) => resolve(closed));
          if (isPromise(result) || !isBoolean(result)) {
            _okLoading.value = true;
          }
          if (isPromise(result)) {
            try {
              // if onBeforeOk is Promise<void> ,set Defaults true
              result = (await result) ?? true;
            } catch (error) {
              result = false;
              throw error;
            }
          }
          if (isBoolean(result)) {
            resolve(result);
          }
        } else {
          resolve(true);
        }
      },
    );

    if (currentPromiseNumber === promiseNumber) {
      if (closed) {
        emit('ok');
        close();
      } else if (_okLoading.value) {
        _okLoading.value = false;
      }
    }
  };

  const handleCancel = () => {
    let result = true;
    if (isFunction(props.onBeforeCancel)) {
      result = props.onBeforeCancel() ?? false;
    }
    if (result) {
      emit('cancel');
      close();
    }
  };

  const contentCls = computed(() => [`${prefixCls}-popup-content`, props.contentClass]);

  const arrowCls = computed(() => [`${prefixCls}-popup-arrow`, props.arrowClass]);
</script>
