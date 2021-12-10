<template>
  <teleport :to="popupContainer" :disabled="!renderToBody">
    <div
      v-if="!unmountOnClose || computedVisible || mounted"
      v-bind="$attrs"
      :class="`${prefixCls}-container`"
    >
      <transition name="fade-modal" appear>
        <div
          v-if="mask"
          v-show="computedVisible"
          ref="maskRef"
          :class="`${prefixCls}-mask`"
          :style="mergedMaskStyle"
        />
      </transition>
      <transition
        name="zoom-modal"
        appear
        @after-enter="handleOpen"
        @after-leave="handleClose"
      >
        <div
          v-show="computedVisible"
          :class="[
            `${prefixCls}-wrapper`,
            { [`${prefixCls}-align-center`]: alignCenter },
          ]"
          :style="{ zIndex }"
          @click.self="handleMask"
        >
          <div
            ref="modalRef"
            :class="[
              `${prefixCls}`,
              modalClass,
              { [`${prefixCls}-simple`]: simple },
            ]"
            :style="modalStyle"
          >
            <div
              v-if="$slots.title || title || closable"
              :class="`${prefixCls}-header`"
            >
              <div v-if="$slots.title || title" :class="`${prefixCls}-title`">
                <div v-if="messageType" :class="`${prefixCls}-title-icon`">
                  <icon-info-circle-fill v-if="messageType === 'info'" />
                  <icon-check-circle-fill v-if="messageType === 'success'" />
                  <icon-exclamation-circle-fill
                    v-if="messageType === 'warning'"
                  />
                  <icon-close-circle-fill v-if="messageType === 'error'" />
                </div>
                <slot name="title">{{ title }}</slot>
              </div>
              <div
                v-if="!simple && closable"
                :class="`${prefixCls}-close-btn`"
                @click="handleCancel"
              >
                <icon-hover>
                  <icon-close />
                </icon-hover>
              </div>
            </div>
            <div :class="`${prefixCls}-body`">
              <slot />
            </div>
            <div v-if="footer" :class="`${prefixCls}-footer`">
              <slot name="footer">
                <arco-button
                  v-if="!hideCancel"
                  v-bind="cancelButtonProps"
                  @click="handleCancel"
                >
                  {{ cancelDisplayText }}
                </arco-button>
                <arco-button
                  type="primary"
                  v-bind="okButtonProps"
                  :loading="mergedOkLoading"
                  @click="handleOk"
                >
                  {{ okDisplayText }}
                </arco-button>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="tsx">
import type { ComputedRef, CSSProperties, PropType } from 'vue';
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { MessageType } from '../_utils/constant';
import IconHover from '../_components/icon-hover.vue';
import ArcoButton from '../button';
import IconClose from '../icon/icon-close';
import IconInfoCircleFill from '../icon/icon-info-circle-fill';
import IconCheckCircleFill from '../icon/icon-check-circle-fill';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import IconCloseCircleFill from '../icon/icon-close-circle-fill';
import { useI18n } from '../locale';
import { useOverflow } from '../_hooks/use-overflow';
import { getElement } from '../_utils/dom';
import usePopupManager from '../_hooks/use-popup-manager';
import { isBoolean, isFunction } from '../_utils/is';

export default defineComponent({
  name: 'Modal',
  components: {
    ArcoButton,
    IconHover,
    IconClose,
    IconInfoCircleFill,
    IconCheckCircleFill,
    IconExclamationCircleFill,
    IconCloseCircleFill,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 对话框是否可见
     * @en Whether the modal is visible
     * @vModel
     */
    visible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 对话框默认是否可见（非受控状态）
     * @en Whether the modal is visible by default (uncontrolled state)
     */
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示遮罩层
     * @en Whether to show the mask
     */
    mask: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 标题
     * @en Title
     */
    title: {
      type: String,
    },
    /**
     * @zh 对话框是否居中显示
     * @en Whether the dialog box is displayed in the center
     */
    alignCenter: Boolean,
    /**
     * @zh 关闭时是否卸载节点
     * @en Whether to uninstall the node when close
     */
    unmountOnClose: Boolean,
    /**
     * @zh 是否点击遮罩层可以关闭对话框
     * @en Whether to close the modal when click the mask
     */
    maskClosable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否隐藏取消按钮
     * @en Whether to hide the cancel button
     */
    hideCancel: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启简单模式
     * @en Whether to enable simple mode
     */
    simple: {
      type: Boolean,
      default: (props: any) => {
        return props.notice;
      },
    },
    /**
     * @zh 是否显示关闭按钮
     * @en Whether to show the close button
     */
    closable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 确认按钮的内容
     * @en The content of the confirm button
     */
    okText: String,
    /**
     * @zh 取消按钮的内容
     * @en The content of the cancel button
     */
    cancelText: String,
    /**
     * @zh 确认按钮是否为加载中状态
     * @en Whether the confirm button is in the loading state
     */
    okLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 确认按钮的Props
     * @en Props of confirm button
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
     * @zh 是否展示页脚部分
     * @en Whether to show the footer
     */
    footer: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 对话框是否挂载在 `body` 元素下
     * @en Whether the modal is mounted under the `body` element
     */
    renderToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for modal
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
      default: 'body',
    },
    /**
     * @zh 蒙层的样式
     * @en Mask style
     */
    maskStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 对话框的类名
     * @en The classname of the modal
     */
    modalClass: {
      type: [String, Array] as PropType<string | any[]>,
    },
    /**
     * @zh 对话框的样式
     * @en Modal style
     */
    modalStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。
     * @en The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.
     */
    onBeforeOk: {
      type: [Function, Array] as PropType<
        (done: (closed: boolean) => void) => void | boolean
      >,
    },
    /**
     * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
     * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
     */
    onBeforeCancel: {
      type: [Function, Array] as PropType<() => boolean>,
    },

    // private
    messageType: {
      type: String as PropType<MessageType>,
    },
  },
  emits: [
    'update:visible',
    /**
     * @zh 点击确定按钮时触发
     * @en Triggered when the OK button is clicked
     */
    'ok',
    /**
     * @zh 点击取消、关闭按钮时触发
     * @en Triggered when the cancel/close button is clicked
     */
    'cancel',
    /**
     * @zh 对话框打开后（动画结束）触发
     * @en Triggered after the modal is opened (the animation ends)
     */
    'open',
    /**
     * @zh 对话框关闭后（动画结束）触发
     * @en Triggered after the modal is closed (the animation ends)
     */
    'close',
  ],
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 页脚
   * @en Footer
   * @slot footer
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('modal');
    const { t } = useI18n();
    const containerRef = ref<HTMLElement>();

    const _visible = ref(props.defaultVisible);
    const computedVisible = computed(() => props.visible ?? _visible.value);
    const _okLoading = ref(false);
    const mergedOkLoading = computed(() => props.okLoading || _okLoading.value);

    const mounted = ref(computedVisible.value);

    const okDisplayText = props.okText || computed(() => t('modal.okText'));
    const cancelDisplayText =
      props.cancelText || computed(() => t('modal.cancelText'));

    const { zIndex } = usePopupManager({ visible: computedVisible });

    // Used to ignore closed Promises
    let promiseNumber = 0;

    const close = () => {
      promiseNumber++;
      if (_okLoading.value) {
        _okLoading.value = false;
      }
      _visible.value = false;
      emit('update:visible', false);
    };

    const handleOk = () => {
      const currentPromiseNumber = promiseNumber;
      const promise = new Promise((resolve: (closed?: boolean) => void) => {
        if (isFunction(props.onBeforeOk)) {
          const result = props.onBeforeOk(resolve);

          if (isBoolean(result)) {
            resolve(result);
          } else {
            _okLoading.value = true;
          }
        } else {
          resolve();
        }
      });

      promise.then((closed = true) => {
        if (currentPromiseNumber === promiseNumber) {
          _okLoading.value = false;
          if (closed) {
            emit('ok');
            close();
          }
        }
      });
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

    const handleMask = () => {
      if (props.mask && props.maskClosable) {
        handleCancel();
      }
    };

    const handleOpen = () => {
      if (computedVisible.value) {
        emit('open');
      }
    };

    const handleClose = () => {
      if (!computedVisible.value) {
        mounted.value = false;
        emit('close');
      }
    };

    const { setOverflowHidden, resetOverflow } = useOverflow(containerRef);

    onMounted(() => {
      containerRef.value = getElement(props.popupContainer);
      if (computedVisible.value) {
        setOverflowHidden();
      }
    });

    watch(computedVisible, (value: boolean) => {
      if (_visible.value !== value) {
        _visible.value = value;
      }
      if (value) {
        mounted.value = true;
        setOverflowHidden();
      } else {
        resetOverflow();
      }
    });

    const mergedMaskStyle: ComputedRef<CSSProperties> = computed(() => {
      return {
        zIndex: zIndex.value,
        ...(props.maskStyle ?? {}),
      };
    });

    return {
      prefixCls,
      mounted,
      computedVisible,
      containerRef,
      mergedMaskStyle,
      okDisplayText,
      cancelDisplayText,
      zIndex,
      handleOk,
      handleCancel,
      handleMask,
      handleOpen,
      handleClose,
      mergedOkLoading,
    };
  },
});
</script>
