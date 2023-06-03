<template>
  <client-only>
    <teleport :to="teleportContainer" :disabled="!renderToBody">
      <div
        v-if="!unmountOnClose || computedVisible || mounted"
        v-show="computedVisible || mounted"
        :class="`${prefixCls}-container`"
        :style="
          isFixed ? { zIndex } : { zIndex: 'inherit', position: 'absolute' }
        "
        v-bind="$attrs"
      >
        <transition name="fade-drawer" appear>
          <div
            v-if="mask"
            v-show="computedVisible"
            :class="`${prefixCls}-mask`"
            @click="handleMask"
          />
        </transition>
        <transition
          :name="`slide-${placement}-drawer`"
          appear
          @after-enter="handleOpen"
          @after-leave="handleClose"
        >
          <div v-show="computedVisible" :class="prefixCls" :style="style">
            <div v-if="header" :class="`${prefixCls}-header`">
              <slot name="header">
                <div v-if="$slots.title || title" :class="`${prefixCls}-title`">
                  <slot name="title">{{ title }}</slot>
                </div>
                <div
                  v-if="closable"
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
              </slot>
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
                  {{ cancelText || t('drawer.cancelText') }}
                </arco-button>
                <arco-button
                  type="primary"
                  :loading="mergedOkLoading"
                  v-bind="okButtonProps"
                  @click="handleOk"
                >
                  {{ okText || t('drawer.okText') }}
                </arco-button>
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </teleport>
  </client-only>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import ClientOnly from '../_components/client-only';
import ArcoButton, { ButtonProps } from '../button';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { useI18n } from '../locale';
import { useOverflow } from '../_hooks/use-overflow';
import { off, on } from '../_utils/dom';
import usePopupManager from '../_hooks/use-popup-manager';
import { isBoolean, isFunction, isNumber, isPromise } from '../_utils/is';
import { KEYBOARD_KEY } from '../_utils/keyboard';
import { useTeleportContainer } from '../_hooks/use-teleport-container';

const DRAWER_PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const;
type DrawerPlacements = typeof DRAWER_PLACEMENTS[number];

export default defineComponent({
  name: 'Drawer',
  components: {
    ClientOnly,
    ArcoButton,
    IconHover,
    IconClose,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 抽屉是否可见
     * @en Whether the drawer is visible
     * @vModel
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 抽屉默认是否可见（非受控模式）
     * @en Whether the drawer is visible by default (uncontrolled mode)
     */
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 抽屉放置的位置
     * @en Where the drawer is placed
     * @values 'top','right','bottom','left'
     */
    placement: {
      type: String as PropType<DrawerPlacements>,
      default: 'right',
      validator: (value: any) => DRAWER_PLACEMENTS.includes(value),
    },
    /**
     * @zh 标题
     * @en Title
     */
    title: String,
    /**
     * @zh 是否显示遮罩层
     * @en Whether to show the mask
     */
    mask: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 点击遮罩层是否可以关闭
     * @en Click on the mask layer to be able to close
     */
    maskClosable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否展示关闭按钮
     * @en Whether to show the close button
     */
    closable: {
      type: Boolean,
      default: true,
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
     * @en Props of confirm button
     * @version 2.9.0
     */
    okButtonProps: {
      type: Object as PropType<ButtonProps>,
    },
    /**
     * @zh 取消按钮的Props
     * @en Props of cancel button
     * @version 2.9.0
     */
    cancelButtonProps: {
      type: Object as PropType<ButtonProps>,
    },
    /**
     * @zh 关闭时是否卸载节点
     * @en Whether to uninstall the node when close
     * @version 2.12.0
     */
    unmountOnClose: Boolean,
    /**
     * @zh 抽屉的宽度（仅在placement为right,left时可用）
     * @en The width of the drawer (only available when placement is right, left)
     */
    width: {
      type: [Number, String],
      default: 250,
    },
    /**
     * @zh 抽屉的高度（仅在placement为top,bottom时可用）
     * @en The height of the drawer (only available when placement is top, bottom)
     */
    height: {
      type: [Number, String],
      default: 250,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
    },
    /**
     * @zh 抽屉的样式
     * @en Drawer style
     */
    drawerStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。
     * @en The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.
     */
    onBeforeOk: {
      type: Function as PropType<
        (
          done: (closed: boolean) => void
        ) => void | boolean | Promise<void | boolean>
      >,
    },
    /**
     * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
     * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
     */
    onBeforeCancel: {
      type: Function as PropType<() => boolean>,
    },
    /**
     * @zh 是否支持 ESC 键关闭抽屉
     * @en Whether to support the ESC key to close the dialog
     * @version 2.15.0
     */
    escToClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 抽屉是否挂载在 `body` 元素下
     * @en Whether the drawer is mounted under the `body` element
     */
    renderToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否展示头部内容
     * @en Whether to display high-quality content
     * @version 2.33.0
     */
    header: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否展示底部内容
     * @en Whether to display the bottom content
     * @version 2.11.0
     */
    footer: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否隐藏取消按钮
     * @en Whether to hide the cancel button
     * @version 2.19.0
     */
    hideCancel: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:visible': (visible: boolean) => true,
    /**
     * @zh 点击确定按钮时触发
     * @en Triggered when the OK button is clicked
     * @property {MouseEvent} ev
     */
    'ok': (e: Event) => true,
    /**
     * @zh 点击取消、关闭按钮时触发
     * @en Triggered when the cancel or close button is clicked
     * @property {MouseEvent | KeyboardEvent} ev
     */
    'cancel': (e: Event) => true,
    /**
     * @zh 抽屉打开后（动画结束）触发
     * @en Triggered after the drawer is opened (the animation ends)
     */
    'open': () => true,
    /**
     * @zh 抽屉关闭后（动画结束）触发
     * @en Triggered when the drawer is closed (the animation ends)
     */
    'close': () => true,
    /**
     * @zh 对话框打开前触发
     * @en Triggered before drawer is opened
     * @version 2.43.0
     */
    'beforeOpen': () => true,
    /**
     * @zh 对话框关闭前触发
     * @en Triggered before drawer is closed
     * @version 2.43.0
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
  /**
   * @zh 页眉
   * @en Header
   * @slot header
   * @version 2.33.0
   */
  setup(props, { emit }) {
    const { popupContainer } = toRefs(props);
    const prefixCls = getPrefixCls('drawer');
    const { t } = useI18n();

    const _visible = ref(props.defaultVisible);
    const computedVisible = computed(() => props.visible ?? _visible.value);
    const _okLoading = ref(false);
    const mergedOkLoading = computed(() => props.okLoading || _okLoading.value);

    const { teleportContainer, containerRef } = useTeleportContainer({
      popupContainer,
      visible: computedVisible,
    });

    const mounted = ref(computedVisible.value);

    let globalKeyDownListener = false;

    const handleGlobalKeyDown = (ev: KeyboardEvent) => {
      if (props.escToClose && ev.key === KEYBOARD_KEY.ESC && isLastDialog()) {
        handleCancel(ev);
      }
    };

    const addGlobalKeyDownListener = () => {
      if (props.escToClose && !globalKeyDownListener) {
        globalKeyDownListener = true;
        on(document.documentElement, 'keydown', handleGlobalKeyDown);
      }
    };

    const removeGlobalKeyDownListener = () => {
      if (globalKeyDownListener) {
        globalKeyDownListener = false;
        off(document.documentElement, 'keydown', handleGlobalKeyDown);
      }
    };

    const { zIndex, isLastDialog } = usePopupManager('dialog', {
      visible: computedVisible,
    });
    const isFixed = computed(() => {
      return containerRef?.value === document.body;
    });

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

    const handleOk = async (e: Event) => {
      const currentPromiseNumber = promiseNumber;
      const closed = await new Promise<boolean>(
        // eslint-disable-next-line no-async-promise-executor
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
              }
            }
            if (isBoolean(result)) {
              resolve(result);
            }
          } else {
            resolve(true);
          }
        }
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

    const handleMask = (e: Event) => {
      if (props.maskClosable) {
        handleCancel(e);
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
        resetOverflow();
        emit('close');
      }
    };

    const { setOverflowHidden, resetOverflow } = useOverflow(containerRef);

    onMounted(() => {
      if (computedVisible.value) {
        mounted.value = true;
        setOverflowHidden();
        addGlobalKeyDownListener();
      }
    });

    onBeforeUnmount(() => {
      resetOverflow();
      removeGlobalKeyDownListener();
    });

    watch(computedVisible, (visible) => {
      if (_visible.value !== visible) {
        _visible.value = visible;
      }
      if (visible) {
        emit('beforeOpen');
        mounted.value = true;
        setOverflowHidden();
        addGlobalKeyDownListener();
      } else {
        emit('beforeClose');
        removeGlobalKeyDownListener();
      }
    });

    const style = computed(() => {
      const style: CSSProperties = {
        [props.placement]: 0,
        ...(props.drawerStyle ?? {}),
      };
      if (['right', 'left'].includes(props.placement)) {
        style.width = isNumber(props.width) ? `${props.width}px` : props.width;
      } else {
        style.height = isNumber(props.height)
          ? `${props.height}px`
          : props.height;
      }
      return style;
    });

    return {
      prefixCls,
      style,
      t,
      mounted,
      computedVisible,
      mergedOkLoading,
      zIndex,
      handleOk,
      handleCancel,
      handleOpen,
      handleClose,
      handleMask,
      isFixed,
      teleportContainer,
    };
  },
});
</script>
