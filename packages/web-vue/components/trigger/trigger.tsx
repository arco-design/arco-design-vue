import type { PropType, CSSProperties, Ref } from 'vue';
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
  toRefs,
  onDeactivated,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { TriggerEvent, TriggerPosition } from '../_utils/constant';
import {
  getArrowStyle,
  getPopupStyle,
  getElementScrollRect,
  getScrollElements,
  getTransformOrigin,
} from './utils';
import ResizeObserver from '../_components/resize-observer-v2';
import { off, on } from '../_utils/dom';
import { isEmptyChildren, mergeFirstChild } from '../_utils/vue-utils';
import usePickSlots from '../_hooks/use-pick-slots';
import { triggerInjectionKey } from './context';
import { throttleByRaf } from '../_utils/throttle-by-raf';
import usePopupManager from '../_hooks/use-popup-manager';
import { useResizeObserver } from '../_hooks/use-resize-observer';
import ClientOnly from '../_components/client-only';
import { useTeleportContainer } from '../_hooks/use-teleport-container';
import { TriggerPopupTranslate } from './interface';
import { configProviderInjectionKey } from '../config-provider/context';
import { useFirstElement } from '../_hooks/use-first-element';
import { omit } from '../_utils/omit';

const TRIGGER_EVENTS = [
  'onClick',
  'onMouseenter',
  'onMouseleave',
  'onFocusin',
  'onFocusout',
  'onContextmenu',
];

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
      type: [Array, Object] as PropType<TriggerPopupTranslate>,
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
      type: [String, Array, Object],
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
      type: [String, Array, Object],
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
      type: [Number, Object] as PropType<
        | number
        | {
            enter: number;
            leave: number;
          }
      >,
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
      type: [String, Object] as PropType<string | HTMLElement>,
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
    openedClass: {
      type: [String, Array, Object],
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
    /**
     * @zh 是否在滚动时关闭弹出框
     * @en Whether to close the popover when scrolling
     * @version 2.46.0
     */
    scrollToClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:popupVisible': (visible: boolean) => true,
    /**
     * @zh 弹出框显示状态改变时触发
     * @en Emitted when the status of the popup changes
     * @param {boolean} visible
     */
    'popupVisibleChange': (visible: boolean) => true,
    /**
     * @zh 弹出框显示后（动画结束）触发
     * @en Triggered after the trigger is shown (the animation ends)
     * @version 2.18.0
     */
    'show': () => true,
    /**
     * @zh 弹出框隐藏后（动画结束）触发
     * @en Triggered after the popup is hidden (the animation ends)
     * @version 2.18.0
     */
    'hide': () => true,
    // for internal
    'resize': () => true,
  },
  /**
   * @zh 弹出框内容
   * @en Popup content
   * @slot content
   */
  setup(props, { emit, slots, attrs }) {
    const { popupContainer } = toRefs(props);
    const prefixCls = getPrefixCls('trigger');
    const popupAttrs = computed(() => omit(attrs, TRIGGER_EVENTS));
    const configCtx = inject(configProviderInjectionKey, undefined);

    const triggerMethods = computed(() =>
      ([] as Array<TriggerEvent>).concat(props.trigger)
    );
    // 用于多个trigger嵌套时，保持打开状态
    const childrenRefs = new Set<Ref<HTMLElement>>();
    const triggerCtx = inject(triggerInjectionKey, undefined);
    // trigger相关变量
    const { children, firstElement } = useFirstElement();
    // popup相关变量
    const popupRef = ref<HTMLElement>();
    const popupVisible = ref(props.defaultPopupVisible);
    const popupPosition = ref(props.position);
    const popupStyle = ref<CSSProperties>({});
    const transformStyle = ref<CSSProperties>({});
    const arrowStyle = ref<CSSProperties>({});
    // 鼠标相关变量
    const arrowRef = ref<HTMLElement>();
    const mousePosition = ref({
      top: 0,
      left: 0,
    });

    const computedVisible = computed(
      () => props.popupVisible ?? popupVisible.value
    );

    const { teleportContainer, containerRef } = useTeleportContainer({
      popupContainer,
      visible: computedVisible,
      documentContainer: true,
    });

    const { zIndex } = usePopupManager('popup', { visible: computedVisible });

    let delayTimer = 0;
    let outsideListener = false;
    let windowListener = false;

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
      if (!firstElement.value || !popupRef.value || !containerRef.value) {
        return;
      }
      const containerRect = containerRef.value.getBoundingClientRect();
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
        : getElementScrollRect(firstElement.value, containerRect);
      const getPopupRect = () =>
        // @ts-ignore
        getElementScrollRect(popupRef.value, containerRect);
      const popupRect = getPopupRect();
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
        }
      );
      if (props.autoFitTransformOrigin) {
        transformStyle.value = {
          transformOrigin: getTransformOrigin(position),
        };
      }
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
        nextTick(() => {
          arrowStyle.value = getArrowStyle(
            position,
            triggerRect,
            getPopupRect(),
            {
              customStyle: props.arrowStyle,
            }
          );
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
        if (visible !== computedVisible.value) {
          delayTimer = window.setTimeout(update, delay);
        }
      } else {
        update();
      }
    };

    const handleClick = (e: MouseEvent) => {
      (attrs as any).onClick?.(e);
      if (props.disabled || (computedVisible.value && !props.clickToClose)) {
        return;
      }
      if (triggerMethods.value.includes('click')) {
        updateMousePosition(e);
        changeVisible(!computedVisible.value);
      } else if (
        triggerMethods.value.includes('contextMenu') &&
        computedVisible.value
      ) {
        changeVisible(false);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      (attrs as any).onMouseenter?.(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      updateMousePosition(e);
      changeVisible(true, props.mouseEnterDelay);
    };

    const handleMouseEnterWithContext = (e: MouseEvent) => {
      triggerCtx?.onMouseenter(e);
      handleMouseEnter(e);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      (attrs as any).onMouseleave?.(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      changeVisible(false, props.mouseLeaveDelay);
    };

    const handleMouseLeaveWithContext = (e: MouseEvent) => {
      triggerCtx?.onMouseleave(e);
      handleMouseLeave(e);
    };

    const handleFocusin = (e: FocusEvent) => {
      (attrs as any).onFocusin?.(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      changeVisible(true, props.focusDelay);
    };

    const handleFocusout = (e: FocusEvent) => {
      (attrs as any).onFocusout?.(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      if (!props.blurToClose) {
        return;
      }
      changeVisible(false);
    };

    const handleContextmenu = (e: MouseEvent) => {
      (attrs as any).onContextmenu?.(e);
      if (
        props.disabled ||
        !triggerMethods.value.includes('contextMenu') ||
        (computedVisible.value && !props.clickToClose)
      ) {
        return;
      }
      updateMousePosition(e);
      changeVisible(!computedVisible.value);
      e.preventDefault();
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
        onMouseenter: handleMouseEnterWithContext,
        onMouseleave: handleMouseLeaveWithContext,
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
        firstElement.value?.contains(e.target as HTMLElement) ||
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
        if (props.scrollToClose || configCtx?.scrollToClose) {
          changeVisible(false);
        } else {
          updatePopupStyle();
        }
      }
    });

    const removeWindowScroll = () => {
      off(window, 'scroll', onWindowScroll);
      windowListener = false;
    };

    const onWindowScroll = throttleByRaf(() => {
      changeVisible(false);
      removeWindowScroll();
    });

    const handleResize = () => {
      if (computedVisible.value) {
        updatePopupStyle();
      }
    };

    const onTargetResize = () => {
      handleResize();
      emit('resize');
    };

    const handlePopupMouseDown = (e: Event) => {
      if (props.preventFocus) {
        e.preventDefault();
      }
    };

    triggerCtx?.addChildRef(popupRef);

    const triggerCls = computed(() => {
      return computedVisible.value ? props.openedClass : undefined;
    });

    let scrollElements: HTMLElement[] | undefined;

    // 当popup显示状态改变时，修改外部点击事件
    watch(computedVisible, (value) => {
      if (props.clickOutsideToClose) {
        if (!value && outsideListener) {
          removeOutsideListener();
        } else if (value && !outsideListener) {
          on(document.documentElement, 'mousedown', handleOutsideClick);
          outsideListener = true;
        }
      }

      if (props.scrollToClose || configCtx?.scrollToClose) {
        on(window, 'scroll', onWindowScroll);
        windowListener = true;
      }

      if (props.updateAtScroll || configCtx?.updateAtScroll) {
        if (value) {
          scrollElements = getScrollElements(firstElement.value);
          for (const item of scrollElements) {
            item.addEventListener('scroll', handleScroll);
          }
        } else if (scrollElements) {
          for (const item of scrollElements) {
            item.removeEventListener('scroll', handleScroll);
          }
          scrollElements = undefined;
        }
      }

      if (value) {
        mounted.value = true;
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

    const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
      elementRef: containerRef,
      onResize: handleResize,
    });

    onMounted(() => {
      createResizeObserver();

      // 默认显示时，更新popup位置
      if (computedVisible.value) {
        updatePopupStyle();
        if (props.clickOutsideToClose && !outsideListener) {
          on(document.documentElement, 'mousedown', handleOutsideClick);
          outsideListener = true;
        }
        if (props.updateAtScroll || configCtx?.updateAtScroll) {
          scrollElements = getScrollElements(firstElement.value);
          for (const item of scrollElements) {
            item.addEventListener('scroll', handleScroll);
          }
        }
      }
    });

    onUpdated(() => {
      if (computedVisible.value) {
        updatePopupStyle();
      }
    });

    onDeactivated(() => {
      changeVisible(false);
    });

    onBeforeUnmount(() => {
      triggerCtx?.removeChildRef(popupRef);
      destroyResizeObserver();
      if (outsideListener) {
        removeOutsideListener();
      }
      if (windowListener) {
        removeWindowScroll();
      }
      if (scrollElements) {
        for (const item of scrollElements) {
          item.removeEventListener('scroll', handleScroll);
        }
        scrollElements = undefined;
      }
    });

    const mounted = ref(computedVisible.value);
    const isAnimation = ref(false);

    const onAnimationStart = () => {
      isAnimation.value = true;
    };

    const handleShow = () => {
      isAnimation.value = false;
      if (computedVisible.value) {
        emit('show');
      }
    };

    const handleHide = () => {
      isAnimation.value = false;
      if (!computedVisible.value) {
        mounted.value = false;
        emit('hide');
      }
    };

    return () => {
      children.value = slots.default?.() ?? [];

      mergeFirstChild(children.value, {
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
            <ResizeObserver onResize={onTargetResize}>
              {children.value}
            </ResizeObserver>
          ) : (
            children.value
          )}
          <ClientOnly>
            <Teleport
              to={teleportContainer.value}
              disabled={!props.renderToBody}
            >
              {(!props.unmountOnClose ||
                computedVisible.value ||
                mounted.value) &&
                !hidePopup.value && (
                  <ResizeObserver onResize={handleResize}>
                    <div
                      ref={popupRef}
                      class={[
                        `${prefixCls}-popup`,
                        `${prefixCls}-position-${popupPosition.value}`,
                      ]}
                      style={{
                        ...popupStyle.value,
                        zIndex: zIndex.value,
                        pointerEvents: isAnimation.value ? 'none' : 'auto',
                      }}
                      trigger-placement={popupPosition.value}
                      onMouseenter={handleMouseEnterWithContext}
                      onMouseleave={handleMouseLeaveWithContext}
                      onMousedown={handlePopupMouseDown}
                      {...popupAttrs.value}
                    >
                      <Transition
                        name={props.animationName}
                        duration={props.duration}
                        appear
                        onBeforeEnter={onAnimationStart}
                        onAfterEnter={handleShow}
                        onBeforeLeave={onAnimationStart}
                        onAfterLeave={handleHide}
                      >
                        <div
                          class={`${prefixCls}-popup-wrapper`}
                          style={transformStyle.value}
                          v-show={computedVisible.value}
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
                      </Transition>
                    </div>
                  </ResizeObserver>
                )}
            </Teleport>
          </ClientOnly>
        </>
      );
    };
  },
});
