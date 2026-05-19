<template>
  <client-only>
    <teleport :to="teleportContainer" :disabled="!renderToBody">
      <div
        v-if="!unmountOnClose || computedVisible || mounted"
        v-show="computedVisible || mounted"
        :class="`${prefixCls}-container`"
        :style="{ zIndex }"
        v-bind="$attrs"
      >
        <transition :name="maskAnimationName" appear>
          <div
            v-if="mergedMask"
            v-show="computedVisible"
            ref="maskRef"
            :class="`${prefixCls}-mask`"
            :style="mergedMaskStyle"
          />
        </transition>
        <div
          ref="wrapperRef"
          :class="wrapperCls"
          @click.self="handleMaskClick"
          @mousedown.self="handleMaskMouseDown"
        >
          <transition
            :name="modalAnimationName"
            appear
            @after-enter="handleOpen"
            @after-leave="handleClose"
          >
            <div
              v-show="computedVisible"
              ref="modalRef"
              :class="modalCls"
              :style="mergedModalStyle"
            >
              <div
                v-if="!hideTitle && ($slots.title || title || mergedClosable)"
                :class="`${prefixCls}-header`"
                @mousedown="handleMoveDown"
              >
                <div
                  v-if="$slots.title || title"
                  :class="[`${prefixCls}-title`, `${prefixCls}-title-align-${mergedTitleAlign}`]"
                >
                  <div v-if="messageType" :class="`${prefixCls}-title-icon`">
                    <icon-info-circle-fill v-if="messageType === 'info'" />
                    <icon-check-circle-fill v-if="messageType === 'success'" />
                    <icon-exclamation-circle-fill v-if="messageType === 'warning'" />
                    <icon-close-circle-fill v-if="messageType === 'error'" />
                  </div>
                  <slot name="title">{{ title }}</slot>
                </div>
                <div
                  v-if="!simple && mergedClosable"
                  tabindex="-1"
                  role="button"
                  aria-label="Close"
                  :class="`${prefixCls}-close-btn`"
                  @click="handleCancel"
                >
                  <icon-hover>
                    <icon-close />
                  </icon-hover>
                </div>
              </div>
              <div :class="[`${prefixCls}-body`, bodyClass]" :style="bodyStyle">
                <slot />
              </div>
              <div v-if="mergedFooter" :class="`${prefixCls}-footer`">
                <slot name="footer">
                  <sd-button
                    v-if="!mergedHideCancel"
                    v-bind="mergedCancelButtonProps"
                    @click="handleCancel"
                  >
                    {{ cancelDisplayText }}
                  </sd-button>
                  <sd-button
                    type="primary"
                    v-bind="mergedOkButtonProps"
                    :loading="mergedOkLoading"
                    @click="handleOk"
                  >
                    {{ okDisplayText }}
                  </sd-button>
                </slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </teleport>
  </client-only>
</template>

<script lang="tsx">
  import type { CSSProperties, PropType, StyleValue } from 'vue';
  import { defineComponent, computed, ref, watch, onMounted, onBeforeUnmount, toRefs } from 'vue';

  import ClientOnly from '../_components/client-only';
  import IconHover from '../_components/icon-hover.vue';
  import { useConfigProviderProp } from '../_hooks/use-config-provider-prop';
  import { useOverflow } from '../_hooks/use-overflow';
  import usePopupManager from '../_hooks/use-popup-manager';
  import { useTeleportContainer } from '../_hooks/use-teleport-container';
  import { MessageType } from '../_utils/constant';
  import { getElement, off, on, contains } from '../_utils/dom';
  import { getPrefixCls } from '../_utils/global-config';
  import { isBoolean, isFunction, isNumber, isPromise } from '../_utils/is';
  import { KEYBOARD_KEY } from '../_utils/keyboard';
  import SDButton, { ButtonProps } from '../button';
  import IconCheckCircleFill from '../icon/icon-check-circle-fill';
  import IconClose from '../icon/icon-close';
  import IconCloseCircleFill from '../icon/icon-close-circle-fill';
  import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
  import IconInfoCircleFill from '../icon/icon-info-circle-fill';
  import { useI18n } from '../locale';
  import { useDraggable } from './hooks/use-draggable';

  export default defineComponent({
    name: 'Modal',
    components: {
      ClientOnly,
      SDButton,
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
       * @zh 对话框的宽度，不设置的情况下会使用样式中的宽度值
       * @en The width of the dialog box, if not set, the width value in the style will be used
       * @version 2.12.0
       */
      width: {
        type: [Number, String],
      },
      /**
       * @zh 对话框的距离顶部的高度，居中显示开启的情况下不生效
       * @en The height from the top of the dialog box. It does not take effect when the center display is turned on.
       * @version 2.12.0
       */
      top: {
        type: [Number, String],
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
       * @zh 标题的水平对齐方向
       * @en horizontal alignment of the title
       * @version 2.17.0
       */
      titleAlign: {
        type: String as PropType<'start' | 'center'>,
        default: 'center',
      },
      /**
       * @zh 对话框是否居中显示
       * @en Whether the dialog box is displayed in the center
       */
      alignCenter: {
        type: Boolean,
        default: true,
      },
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
        type: [String, Object] as PropType<string | HTMLElement>,
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
       * @version 2.7.0
       */
      onBeforeOk: {
        type: Function as PropType<
          (done: (closed: boolean) => void) => void | boolean | Promise<void | boolean>
        >,
      },
      /**
       * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
       * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
       * @version 2.7.0
       */
      onBeforeCancel: {
        type: Function as PropType<() => boolean>,
      },
      /**
       * @zh 是否支持 ESC 键关闭对话框
       * @en Whether to support the ESC key to close the dialog
       * @version 2.15.0
       */
      escToClose: {
        type: Boolean,
        default: true,
      },
      /**
       * @zh 是否支持拖动
       * @en Whether to support drag
       * @version 2.19.0
       */
      draggable: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 是否开启全屏
       * @en Whether to enable full screen
       * @version 2.19.0
       */
      fullscreen: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 遮罩层动画名字
       * @en Mask layer animation name
       * @defaultValue -
       * @version 2.24.0
       */
      maskAnimationName: {
        type: String,
        default: (props: Record<string, any>) => {
          if (props.fullscreen) {
            return 'fade-in-standard';
          }
          return 'fade-modal';
        },
      },
      /**
       * @zh 对话框动画名字
       * @en Modal animation name
       * @defaultValue -
       * @version 2.24.0
       */
      modalAnimationName: {
        type: String,
        default: (props: Record<string, any>) => {
          if (props.fullscreen) {
            return 'zoom-in';
          }
          return 'zoom-modal';
        },
      },
      /**
       * @zh 对话框内容部分的类名
       * @en The classname of the modal
       * @version 2.31.0
       */
      bodyClass: {
        type: [String, Array] as PropType<string | any[]>,
      },
      /**
       * @zh 对话框内容部分的样式
       * @en Modal style
       * @version 2.31.0
       */
      bodyStyle: {
        type: [String, Object, Array] as PropType<StyleValue>,
      },
      // private
      messageType: {
        type: String as PropType<MessageType>,
      },
      /**
       * @zh 是否隐藏标题
       * @en Whether to hide the title
       * @defaultValue false
       * @version 2.50.0
       */
      hideTitle: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      'update:visible': (_visible: boolean) => true,
      /**
       * @zh 点击确定按钮时触发
       * @en Triggered when the OK button is clicked
       * @property {MouseEvent} ev
       */
      'ok': (_e: Event) => true,
      /**
       * @zh 点击取消、关闭按钮时触发
       * @en Triggered when the cancel/close button is clicked
       * @property {MouseEvent | KeyboardEvent} ev
       */
      'cancel': (_e: Event) => true,
      /**
       * @zh 对话框打开后（动画结束）触发
       * @en Triggered after the modal is opened (the animation ends)
       */
      'open': () => true,
      /**
       * @zh 对话框关闭后（动画结束）触发
       * @en Triggered after the modal is closed (the animation ends)
       */
      'close': () => true,
      /**
       * @zh 对话框打开前触发
       * @en Triggered before dialog is opened
       * @version 2.16.0
       */
      'beforeOpen': () => true,
      /**
       * @zh 对话框关闭前触发
       * @en Triggered before dialog is closed
       * @version 2.16.0
       */
      'beforeClose': () => true,
    },
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
      const {
        fullscreen,
        popupContainer,
        alignCenter,
        mask,
        maskClosable,
        maskStyle,
        closable,
        titleAlign,
        top,
        footer,
        hideCancel,
        escToClose,
        draggable,
        okText,
        cancelText,
        okButtonProps,
        cancelButtonProps,
        width,
      } = toRefs(props);
      const prefixCls = getPrefixCls('modal');
      const { t } = useI18n();
      const wrapperRef = ref<HTMLElement>();
      const modalRef = ref<HTMLElement>();

      const { mergedValue: mergedMask } = useConfigProviderProp(mask, {
        propNames: ['mask'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.mask,
      });
      const { mergedValue: mergedMaskClosable } = useConfigProviderProp(maskClosable, {
        propNames: ['maskClosable', 'mask-closable'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.maskClosable,
      });
      const { mergedValue: mergedMaskStyle } = useConfigProviderProp(maskStyle, {
        propNames: ['maskStyle', 'mask-style'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.maskStyle,
      });
      const { mergedValue: mergedAlignCenter } = useConfigProviderProp(alignCenter, {
        propNames: ['alignCenter', 'align-center'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.alignCenter,
      });
      const { mergedValue: mergedEscToClose } = useConfigProviderProp(escToClose, {
        propNames: ['escToClose', 'esc-to-close'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.escToClose,
      });
      const { mergedValue: mergedDraggableBase } = useConfigProviderProp(draggable, {
        propNames: ['draggable'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.draggable,
      });
      const { mergedValue: mergedClosable } = useConfigProviderProp(closable, {
        propNames: ['closable'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.closable,
      });
      const { mergedValue: mergedTitleAlign } = useConfigProviderProp(titleAlign, {
        propNames: ['titleAlign', 'title-align'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.titleAlign,
      });
      const { mergedValue: mergedTop } = useConfigProviderProp(top, {
        propNames: ['top'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.top,
      });
      const { mergedValue: mergedFooter } = useConfigProviderProp(footer, {
        propNames: ['footer'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.footer,
      });
      const { mergedValue: mergedHideCancel } = useConfigProviderProp(hideCancel, {
        propNames: ['hideCancel', 'hide-cancel'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.hideCancel,
      });
      const { mergedValue: mergedOkText } = useConfigProviderProp(okText, {
        propNames: ['okText', 'ok-text'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.okText,
      });
      const { mergedValue: mergedCancelText } = useConfigProviderProp(cancelText, {
        propNames: ['cancelText', 'cancel-text'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.cancelText,
      });
      const { mergedValue: mergedOkButtonProps } = useConfigProviderProp(okButtonProps, {
        propNames: ['okButtonProps', 'ok-button-props'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.okButtonProps,
      });
      const { mergedValue: mergedCancelButtonProps } = useConfigProviderProp(cancelButtonProps, {
        propNames: ['cancelButtonProps', 'cancel-button-props'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.cancelButtonProps,
      });
      const { mergedValue: mergedWidth } = useConfigProviderProp(width, {
        propNames: ['width'],
        getGlobalValue: (configProviderCtx) => configProviderCtx?.modal?.width,
      });

      const _visible = ref(props.defaultVisible);
      const computedVisible = computed(() => props.visible ?? _visible.value);
      const _okLoading = ref(false);
      const mergedOkLoading = computed(() => props.okLoading || _okLoading.value);
      const mergedDraggable = computed(
        () => Boolean(mergedDraggableBase.value) && !props.fullscreen,
      );
      const mergedAlignCenterBoolean = computed(() => Boolean(mergedAlignCenter.value));

      const { teleportContainer, containerRef } = useTeleportContainer({
        popupContainer,
        visible: computedVisible,
      });

      const mounted = ref(computedVisible.value);

      const okDisplayText = computed(() => mergedOkText.value || t('modal.okText'));
      const cancelDisplayText = computed(() => mergedCancelText.value || t('modal.cancelText'));

      const { zIndex, isLastDialog } = usePopupManager('dialog', {
        visible: computedVisible,
      });

      let globalKeyDownListener = false;

      const handleGlobalKeyDown = (ev: KeyboardEvent) => {
        if (mergedEscToClose.value && ev.key === KEYBOARD_KEY.ESC && isLastDialog()) {
          handleCancel(ev);
        }
      };

      const addGlobalKeyDownListener = () => {
        if (mergedEscToClose.value && !globalKeyDownListener) {
          globalKeyDownListener = true;
          on(document.documentElement, 'keydown', handleGlobalKeyDown);
        }
      };

      const removeGlobalKeyDownListener = () => {
        globalKeyDownListener = false;
        off(document.documentElement, 'keydown', handleGlobalKeyDown);
      };

      // Used to ignore closed Promises
      let promiseNumber = 0;

      const { position, handleMoveDown } = useDraggable({
        wrapperRef,
        modalRef,
        draggable: mergedDraggable,
        alignCenter: mergedAlignCenterBoolean,
      });

      const close = () => {
        promiseNumber++;
        if (_okLoading.value) {
          _okLoading.value = false;
        }
        _visible.value = false;
        emit('update:visible', false);
      };

      const handleOk = async (e: Event) => {
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
            emit('ok', e);
            close();
          } else if (_okLoading.value) {
            _okLoading.value = false;
          }
        }
      };

      const handleCancel = (e: Event) => {
        let result = true;
        if (isFunction(props.onBeforeCancel)) {
          result = props.onBeforeCancel() ?? false;
        }
        if (result) {
          emit('cancel', e);
          close();
        }
      };

      const currentIsMask = ref(false);

      const handleMaskMouseDown = (ev: Event) => {
        if (ev.target === wrapperRef.value) {
          currentIsMask.value = true;
        }
      };

      const handleMaskClick = (e: Event) => {
        if (mergedMask.value && mergedMaskClosable.value && currentIsMask.value) {
          handleCancel(e);
        }
      };

      const handleOpen = () => {
        if (computedVisible.value) {
          if (
            !contains(wrapperRef.value, document.activeElement) &&
            document.activeElement instanceof HTMLElement
          ) {
            document.activeElement.blur();
          }
          emit('open');
        }
      };

      const handleClose = () => {
        if (!computedVisible.value) {
          if (mergedDraggable.value) {
            position.value = undefined;
          }

          mounted.value = false;
          resetOverflow();
          emit('close');
        }
      };

      const { setOverflowHidden, resetOverflow } = useOverflow(containerRef);

      onMounted(() => {
        containerRef.value = getElement(props.popupContainer);
        if (computedVisible.value) {
          setOverflowHidden();
          if (mergedEscToClose.value) {
            addGlobalKeyDownListener();
          }
        }
      });

      onBeforeUnmount(() => {
        resetOverflow();
        removeGlobalKeyDownListener();
      });

      watch(computedVisible, (value: boolean) => {
        if (_visible.value !== value) {
          _visible.value = value;
        }
        if (value) {
          emit('beforeOpen');
          mounted.value = true;
          currentIsMask.value = false;
          setOverflowHidden();
          addGlobalKeyDownListener();
        } else {
          emit('beforeClose');
          removeGlobalKeyDownListener();
        }
      });

      watch(fullscreen, () => {
        if (position.value) {
          position.value = undefined;
        }
      });

      const wrapperCls = computed(() => [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-align-center`]:
            mergedAlignCenterBoolean.value && !props.fullscreen,
          [`${prefixCls}-wrapper-moved`]: Boolean(position.value),
        },
      ]);

      const modalCls = computed(() => [
        `${prefixCls}`,
        props.modalClass,
        {
          [`${prefixCls}-simple`]: props.simple,
          [`${prefixCls}-draggable`]: mergedDraggable.value,
          [`${prefixCls}-fullscreen`]: props.fullscreen,
        },
      ]);

      const mergedModalStyle = computed(() => {
        const style: CSSProperties = {
          ...props.modalStyle,
        };
        // 修复设置width属性后，全屏无法生效的问题
        if (mergedWidth.value && !props.fullscreen) {
          style.width = isNumber(mergedWidth.value) ? `${mergedWidth.value}px` : mergedWidth.value;
        }
        if (!mergedAlignCenterBoolean.value && mergedTop.value) {
          style.top = isNumber(mergedTop.value) ? `${mergedTop.value}px` : mergedTop.value;
        }
        if (position.value) {
          style.transform = `translate(${position.value[0]}px, ${position.value[1]}px)`;
        }

        return style;
      });

      return {
        prefixCls,
        mounted,
        computedVisible,
        containerRef,
        wrapperRef,
        mergedModalStyle,
        okDisplayText,
        cancelDisplayText,
        mergedMask,
        mergedMaskStyle,
        mergedClosable,
        mergedTitleAlign,
        mergedFooter,
        mergedHideCancel,
        mergedOkButtonProps,
        mergedCancelButtonProps,
        zIndex,
        handleOk,
        handleCancel,
        handleMaskClick,
        handleMaskMouseDown,
        handleOpen,
        handleClose,
        mergedOkLoading,
        modalRef,
        wrapperCls,
        modalCls,
        teleportContainer,
        handleMoveDown,
      };
    },
  });
</script>
