import type {
  PropType,
  CSSProperties,
  ComponentPublicInstance,
  Ref,
} from 'vue';
import {
  defineComponent,
  ref,
  reactive,
  computed,
  nextTick,
  watch,
  inject,
  provide,
  Teleport,
  Transition,
  onUpdated,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { AnimationDuration, ClassName, EmitType } from '../_utils/types';
import type { TriggerEvent, TriggerPosition } from '../_utils/constant';
import { TRIGGER_EVENTS } from '../_utils/constant';
import {
  getArrowStyle,
  getPopupStyle,
  PopupTranslate,
  getElementScrollRect,
  getScrollElements,
} from './utils';
import ResizeObserver from '../_components/resize-observer';
import { getElement, off, on } from '../_utils/dom';
import {
  isEmptyChildren,
  isComponentInstance,
  mergeFirstChild,
} from '../_utils/vue-utils';
import usePickSlots from '../_hooks/use-pick-slots';
import { triggerInjectionKey } from './context';
import { throttleByRaf } from '../_utils/throttle-by-raf';
import usePopupManager from '../_hooks/use-popup-manager';

export default defineComponent({
  name: 'Trigger',
  inheritAttrs: false,
  props: {
    /**
     * @zh 弹出框是否可见
     * @en Whether the popup is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 弹出框默认是否可见（非受控模式）
     * @en Whether the popup is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click','focus','contextMenu'
     */
    trigger: {
      type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
      default: 'hover',
      validator: (value: any) => {
        const values: any[] = [].concat(value);
        for (const value of values) {
          if (!TRIGGER_EVENTS.includes(value)) {
            return false;
          }
        }
        return true;
      },
    },
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
     */
    position: {
      type: String as PropType<TriggerPosition>,
      default: 'bottom',
    },
    /**
     * @zh 触发器是否禁用
     * @en Whether the trigger is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 弹出框的偏移量（弹出框距离触发器的偏移距离）
     * @en The offset of the popup (the offset distance of the popup from the trigger)
     */
    popupOffset: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 弹出框的移动距离
     * @en The moving distance of the popup
     */
    popupTranslate: {
      type: [Array, Object] as PropType<PopupTranslate>,
    },
    /**
     * @zh 弹出框是否显示箭头
     * @en Whether the popup shows an arrow
     */
    showArrow: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 弹出框是否跟随鼠标
     * @en Whether the popup follows the mouse
     */
    alignPoint: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在移出触发器，并移入弹出框时保持弹出框显示
     * @en Whether to keep the popup displayed when the trigger is moved out and moved into the popup
     */
    popupHoverStay: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在触发器失去焦点时关闭弹出框
     * @en Whether to close the popup when the trigger loses focus
     */
    blurToClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在点击触发器时关闭弹出框
     * @en Whether to close the popup when the trigger is clicked
     */
    clickToClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在点击外部区域时关闭弹出框
     * @en Whether to close the popup when clicking on the outer area
     */
    clickOutsideToClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否在关闭时卸载弹出框节点
     * @en Whether to uninstall the popup node when closing
     */
    unmountOnClose: {
      type: Boolean,
      default: true,
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
     * @zh 弹出框的样式
     * @en The style of the popup
     */
    popupStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 弹出动画的name
     * @en The name of the popup animation
     */
    animationName: {
      type: String,
      default: 'fade-in',
    },
    /**
     * @zh 弹出动画的持续时间
     * @en The duration of the popup animation
     */
    duration: {
      type: [Number, Object] as PropType<AnimationDuration>,
    },
    /**
     * @zh mouseenter事件延时触发的时间（毫秒）
     * @en Delay trigger time of mouseenter event (ms)
     */
    mouseEnterDelay: {
      type: Number,
      default: 100,
    },
    /**
     * @zh mouseleave事件延时触发的时间（毫秒）
     * @en Delay trigger time of mouseleave event (ms)
     */
    mouseLeaveDelay: {
      type: Number,
      default: 100,
    },
    /**
     * @zh focus事件延时触发的时间（毫秒）
     * @en Delay trigger time of focus event (ms)
     */
    focusDelay: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否将弹出框宽度设置为触发器宽度
     * @en Whether to set the width of the popup to the width of the trigger
     */
    autoFitPopupWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否将弹出框的最小宽度设置为触发器宽度
     * @en Whether to set the minimum width of the popup to the trigger width
     */
    autoFitPopupMinWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 当触发器的尺寸发生变化时，是否重新计算弹出框位置
     * @en When the size of the trigger changes, whether to recalculate the position of the popup
     */
    autoFixPosition: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
    /**
     * @zh 是否在容器滚动时更新弹出框的位置
     * @us Whether to update the position of the popup when the container is scrolled
     */
    updateAtScroll: {
      type: Boolean,
      default: false,
    },
    autoFitTransformOrigin: {
      type: Boolean,
      default: false,
    },
    hideEmpty: {
      type: Boolean,
      default: false,
    },
    openedCls: {
      type: String,
    },
    /**
     * @zh 是否自动调整弹出框位置，以适应窗口大小
     * @en Whether to automatically adjust the position of the popup to fit the window size
     */
    autoFitPosition: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否挂载在 `body` 元素下
     * @en Whether to mount under the `body` element
     */
    renderToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否阻止弹出层中的元素点击时获取焦点
     * @en Whether to prevent elements in the pop-up layer from gaining focus when clicked
     */
    preventFocus: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onPopupVisibleChange: {
      type: [Function, Array] as PropType<
        EmitType<(popupVisible: boolean) => void>
      >,
    },
  },
  emits: [
    'update:popupVisible',
    /**
     * @zh 弹出框显示状态改变时触发
     * @en Emitted when the status of the popup changes
     * @property {boolean} popupVisible
     */
    'popupVisibleChange',
  ],
  /**
   * @zh 弹出框内容
   * @en Popup content
   * @slot content
   */
  setup(props, { emit, slots, attrs }) {
    const prefixCls = getPrefixCls('trigger');
    const triggerMethods = computed(() =>
      ([] as Array<TriggerEvent>).concat(props.trigger)
    );
    // 用于多个trigger嵌套时，保持打开状态
    const childrenRefs = new Set<Ref<HTMLElement>>();
    const triggerCtx = inject(triggerInjectionKey, undefined);
    // trigger相关变量
    const triggerRef = ref<Element | ComponentPublicInstance>();
    const triggerEle = computed<HTMLElement>(() =>
      isComponentInstance(triggerRef.value)
        ? triggerRef.value.$el
        : triggerRef.value
    );
    // popup相关变量
    const popupRef = ref<HTMLElement>();
    const popupVisible = ref(props.defaultPopupVisible);
    const popupPosition = ref(props.position);
    const popupStyle = ref<CSSProperties>({});
    const arrowStyle = ref<CSSProperties>({});
    // container相关变量
    const containerEle = computed(() =>
      getElement(props.popupContainer ?? document.documentElement)
    );
    // 鼠标相关变量
    const arrowRef = ref<HTMLElement>();
    const mousePosition = ref({
      top: 0,
      left: 0,
    });

    const computedVisible = computed(
      () => props.popupVisible ?? popupVisible.value
    );

    const { zIndex } = usePopupManager({ visible: computedVisible });

    let delayTimer = 0;
    let outsideListener = false;

    const cleanDelayTimer = () => {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = 0;
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      if (props.alignPoint) {
        const { pageX, pageY } = e;
        mousePosition.value = {
          top: pageY,
          left: pageX,
        };
      }
    };

    const updatePopupStyle = () => {
      if (!triggerEle.value || !popupRef.value || !containerEle.value) {
        return;
      }
      const containerRect = containerEle.value.getBoundingClientRect();
      const triggerRect = props.alignPoint
        ? {
            top: mousePosition.value.top,
            bottom: mousePosition.value.top,
            left: mousePosition.value.left,
            right: mousePosition.value.left,
            scrollTop: mousePosition.value.top,
            scrollBottom: mousePosition.value.top,
            scrollLeft: mousePosition.value.left,
            scrollRight: mousePosition.value.left,
            width: 0,
            height: 0,
          }
        : getElementScrollRect(triggerEle.value, containerRect);
      const popupRect = getElementScrollRect(popupRef.value, containerRect);
      const { style, position } = getPopupStyle(
        props.position,
        containerRect,
        triggerRect,
        popupRect,
        {
          offset: props.popupOffset,
          translate: props.popupTranslate,
          customStyle: props.popupStyle,
          autoFitPosition: props.autoFitPosition,
          autoFitTransformOrigin: props.autoFitTransformOrigin,
        }
      );
      if (props.autoFitPopupMinWidth) {
        style.minWidth = `${triggerRect.width}px`;
      } else if (props.autoFitPopupWidth) {
        style.width = `${triggerRect.width}px`;
      }

      if (popupPosition.value !== position) {
        popupPosition.value = position;
      }
      popupStyle.value = style;
      if (props.showArrow) {
        arrowStyle.value = getArrowStyle(position, triggerRect, {
          customStyle: props.arrowStyle,
        });
      }
    };

    const changeVisible = (visible: boolean, delay?: number) => {
      if (visible === computedVisible.value && delayTimer === 0) {
        return;
      }

      const update = () => {
        popupVisible.value = visible;
        emit('update:popupVisible', visible);
        emit('popupVisibleChange', visible);
        if (visible) {
          nextTick(() => {
            updatePopupStyle();
          });
        }
      };

      if (delay) {
        cleanDelayTimer();
        delayTimer = window.setTimeout(update, delay);
      } else {
        update();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (
        props.disabled ||
        !triggerMethods.value.includes('click') ||
        (computedVisible.value && !props.clickToClose)
      ) {
        return;
      }
      updateMousePosition(e);
      changeVisible(!computedVisible.value);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      triggerCtx?.onMouseenter(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      updateMousePosition(e);
      changeVisible(true, props.mouseEnterDelay);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      triggerCtx?.onMouseleave(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      changeVisible(false, props.mouseLeaveDelay);
    };

    const handleFocusin = (e: FocusEvent) => {
      triggerCtx?.onFocusin(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      changeVisible(true, props.focusDelay);
    };

    const handleFocusout = (e: FocusEvent) => {
      triggerCtx?.onFocusout(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      if (!props.blurToClose) {
        return;
      }
      changeVisible(false);
    };

    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
      if (
        props.disabled ||
        !triggerMethods.value.includes('contextMenu') ||
        (computedVisible.value && !props.clickToClose)
      ) {
        return;
      }
      updateMousePosition(e);
      changeVisible(!computedVisible.value);
    };

    const addChildRef = (ref: any) => {
      childrenRefs.add(ref);
      triggerCtx?.addChildRef(ref);
    };
    const removeChildRef = (ref: any) => {
      childrenRefs.delete(ref);
      triggerCtx?.removeChildRef(ref);
    };

    // 添加triggerCtx，用于嵌套时保持状态
    provide(
      triggerInjectionKey,
      reactive({
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
        onFocusin: handleFocusin,
        onFocusout: handleFocusout,
        addChildRef,
        removeChildRef,
      })
    );

    // 外部事件
    const removeOutsideListener = () => {
      off(document.documentElement, 'mousedown', handleOutsideClick);
      outsideListener = false;
    };

    const contentSlot = usePickSlots(slots, 'content');

    const hidePopup = computed(() => {
      return props.hideEmpty && isEmptyChildren(contentSlot.value?.());
    });

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        triggerEle.value?.contains(e.target as HTMLElement) ||
        popupRef.value?.contains(e.target as HTMLElement)
      ) {
        return;
      }

      for (const item of childrenRefs) {
        if (item.value?.contains(e.target as HTMLElement)) {
          return;
        }
      }

      removeOutsideListener();
      changeVisible(false);
    };

    const handleScroll = throttleByRaf(() => {
      if (computedVisible.value) {
        updatePopupStyle();
      }
    });

    const handleResize = () => {
      if (computedVisible.value) {
        updatePopupStyle();
      }
    };

    const handlePopupMouseDown = (e: Event) => {
      if (props.preventFocus) {
        e.preventDefault();
      }
    };

    triggerCtx?.addChildRef(popupRef);

    const triggerCls = computed(() => {
      return computedVisible.value ? props.openedCls : undefined;
    });

    let scrollElements: HTMLElement[];

    // 当popup显示状态改变时，修改外部点击事件
    watch(computedVisible, (value) => {
      if (props.clickOutsideToClose) {
        if (outsideListener && !value) {
          removeOutsideListener();
          return;
        }

        if (!outsideListener) {
          on(document.documentElement, 'mousedown', handleOutsideClick);
          outsideListener = true;
        }
      }

      if (props.updateAtScroll) {
        if (value) {
          scrollElements = getScrollElements(triggerEle.value);
          for (const item of scrollElements) {
            item.addEventListener('scroll', handleScroll);
          }
        } else if (scrollElements) {
          for (const item of scrollElements) {
            item.removeEventListener('scroll', handleScroll);
          }
        }
      }
    });

    // 影响popup显示的参数变化时，更新popup样式
    watch(
      () => [props.autoFitPopupWidth, props.autoFitPopupMinWidth],
      () => {
        if (computedVisible.value) {
          updatePopupStyle();
        }
      }
    );

    onMounted(() => {
      // 默认显示时，更新popup位置
      if (computedVisible.value) {
        updatePopupStyle();
      }
    });

    onUpdated(() => {
      if (computedVisible.value) {
        updatePopupStyle();
      }
    });

    onBeforeUnmount(() => {
      triggerCtx?.removeChildRef(popupRef);
    });

    return () => {
      const children = slots.default?.() ?? [];

      mergeFirstChild(children, {
        ref: triggerRef,
        class: triggerCls.value,
        onClick: handleClick,
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
        onFocusin: handleFocusin,
        onFocusout: handleFocusout,
        onContextmenu: handleContextmenu,
      });

      return (
        <>
          {props.autoFixPosition ? (
            <ResizeObserver onResize={handleResize}>{children}</ResizeObserver>
          ) : (
            children
          )}
          <Teleport
            to={props.popupContainer ?? 'body'}
            disabled={!props.renderToBody}
          >
            <Transition name={props.animationName} duration={props.duration}>
              {(!props.unmountOnClose || computedVisible.value) &&
                !hidePopup.value && (
                  <ResizeObserver onResize={handleResize}>
                    <div
                      v-show={computedVisible.value}
                      ref={popupRef}
                      class={[
                        `${prefixCls}-popup`,
                        `${prefixCls}-position-${popupPosition.value}`,
                      ]}
                      style={{ ...popupStyle.value, zIndex: zIndex.value }}
                      trigger-placement={popupPosition.value}
                      onMouseenter={handleMouseEnter}
                      onMouseleave={handleMouseLeave}
                      onMousedown={handlePopupMouseDown}
                      {...attrs}
                    >
                      <div
                        class={[`${prefixCls}-content`, props.contentClass]}
                        style={props.contentStyle}
                      >
                        {slots.content?.()}
                      </div>
                      {props.showArrow && (
                        <div
                          ref={arrowRef}
                          class={[`${prefixCls}-arrow`, props.arrowClass]}
                          style={arrowStyle.value}
                        />
                      )}
                    </div>
                  </ResizeObserver>
                )}
            </Transition>
          </Teleport>
        </>
      );
    };
  },
});
