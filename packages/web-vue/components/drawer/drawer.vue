<template>
  <teleport :to="containerNode" :disabled="!renderToBody">
    <transition name="fade-drawer" appear>
      <div
        v-show="computedVisible"
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
            <div :class="`${prefixCls}-header`">
              <div :class="`${prefixCls}-title`">
                <slot name="title">{{ title }}</slot>
              </div>
              <div
                v-if="closable"
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
            <div :class="`${prefixCls}-footer`">
              <slot name="footer">
                <arco-button v-bind="cancelButtonProps" @click="handleCancel">
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
    </transition>
  </teleport>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import ArcoButton from '../button';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { useI18n } from '../locale';
import { useOverflow } from '../_hooks/use-overflow';
import { getElement } from '../_utils/dom';
import usePopupManager from '../_hooks/use-popup-manager';
import { isBoolean, isFunction, isNumber } from '../_utils/is';

const DRAWER_PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const;
type DrawerPlacements = typeof DRAWER_PLACEMENTS[number];

export default defineComponent({
  name: 'Drawer',
  components: {
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
      type: Object,
    },
    /**
     * @zh 取消按钮的Props
     * @en Props of cancel button
     * @version 2.9.0
     */
    cancelButtonProps: {
      type: Object,
    },
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
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
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

    renderToBody: {
      type: Boolean,
      default: true,
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
     * @en Triggered when the cancel or close button is clicked
     */
    'cancel',
    /**
     * @zh 抽屉打开后（动画结束）触发
     * @en Triggered after the drawer is opened (the animation ends)
     */
    'open',
    /**
     * @zh 抽屉关闭后（动画结束）触发
     * @en Triggered when the drawer is closed (the animation ends)
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
    const prefixCls = getPrefixCls('drawer');
    const { t } = useI18n();
    const containerRef = ref<HTMLElement>();

    const _visible = ref(props.defaultVisible);
    const computedVisible = computed(() => props.visible ?? _visible.value);
    const _okLoading = ref(false);
    const mergedOkLoading = computed(() => props.okLoading || _okLoading.value);

    const { zIndex } = usePopupManager({ visible: computedVisible });
    const isFixed = computed(() => {
      return containerRef?.value === document.body;
    });

    const containerNode = computed(() => {
      const ele = getElement(props.popupContainer);
      if (!ele && !computedVisible.value) {
        //  watch computedVisible
        return 'body';
      }
      return ele || 'body';
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
      if (props.maskClosable) {
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

    watch(computedVisible, (visible) => {
      if (_visible.value !== visible) {
        _visible.value = visible;
      }
      if (visible) {
        setOverflowHidden();
      } else {
        resetOverflow();
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
      computedVisible,
      mergedOkLoading,
      zIndex,
      handleOk,
      handleCancel,
      handleOpen,
      handleClose,
      handleMask,
      isFixed,
      containerNode,
    };
  },
});
</script>
