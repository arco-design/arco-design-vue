<template>
  <ResizeObserver @resize="updatePositionThrottle">
    <div ref="wrapperRef">
      <div v-if="isFixed" :style="placeholderStyles" />
      <div :class="classNames" :style="fixedStyles">
        <ResizeObserver @resize="updatePositionThrottle">
          <slot />
        </ResizeObserver>
      </div>
    </div>
  </ResizeObserver>
</template>

<script lang="ts">
import type { CSSProperties, PropType, Ref } from 'vue';
import {
  defineComponent,
  toRefs,
  ref,
  watchEffect,
  computed,
  onMounted,
} from 'vue';
import ResizeObserver from '../_components/resize-observer';
import { getPrefixCls } from '../_utils/global-config';
import { throttleByRaf } from '../_utils/throttle-by-raf';
import { isWindow, isUndefined } from '../_utils/is';
import { on, off, getElement } from '../_utils/dom';

function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : target.getBoundingClientRect();
}

export default defineComponent({
  name: 'Affix',
  components: {
    ResizeObserver,
  },
  props: {
    /**
     * @zh 距离窗口顶部达到指定偏移量后触发
     * @en Triggered when the specified offset is reached from the top of the window
     */
    offsetTop: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 距离窗口底部达到指定偏移量后触发
     * @en Triggered when the specified offset is reached from the bottom of the window
     */
    offsetBottom: {
      type: Number,
    },
    /**
     * @zh 滚动容器，默认是 `window`
     * @en Scroll container, default is `window`
     */
    target: {
      type: [String, Object, Function] as PropType<
        string | HTMLElement | Window
      >,
    },
    /**
     * @zh `target`的外层滚动元素，默认是 `window`。`Affix `将会监听该元素的滚动事件，并实时更新固钉的位置。主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题
     * @en The outer scroll element of `target`, the default is `window`. `Affix` will monitor the scroll event of the element and update the position of the anchor in real time. The main purpose is to solve the problem that if the outer element scrolls when the target attribute is specified as a non-window element, it may cause the nail to escape from the container.
     */
    targetContainer: {
      type: [String, Object, Function] as PropType<
        string | HTMLElement | Window
      >,
    },
  },
  emits: {
    /**
     * @zh 固定状态发生改变时触发
     * @en Triggered when the fixed state changes
     * @param {boolean} fixed
     */
    change: (fixed: boolean) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('affix');
    const { target, targetContainer } = toRefs(props);
    const wrapperRef = ref<HTMLElement>();
    const targetRef = ref<HTMLElement | Window>();
    const isFixed = ref(false);
    const placeholderStyles: Ref<CSSProperties> = ref({});
    const fixedStyles: Ref<CSSProperties> = ref({});
    const classNames = computed(() => ({ [prefixCls]: isFixed.value }));

    const updatePositionThrottle = throttleByRaf(() => {
      if (!wrapperRef.value || !targetRef.value) return;

      const { offsetTop, offsetBottom } = props;
      const offsetType = isUndefined(offsetBottom) ? 'top' : 'bottom';
      const wrapperRect = wrapperRef.value.getBoundingClientRect();
      const targetRect = getTargetRect(targetRef.value);
      let newIsFixed = false;
      let newFixedStyles = {};
      const newPlaceholderStyles: CSSProperties = {
        width: `${wrapperRef.value.offsetWidth}px`,
        height: `${wrapperRef.value.offsetHeight}px`,
      };

      if (offsetType === 'top') {
        newIsFixed = wrapperRect.top - targetRect.top < (offsetTop || 0);
        newFixedStyles = newIsFixed
          ? {
              position: 'fixed',
              top: `${targetRect.top + (offsetTop || 0)}px`,
            }
          : {};
      } else {
        newIsFixed =
          targetRect.bottom - wrapperRect.bottom < (offsetBottom || 0);
        newFixedStyles = newIsFixed
          ? {
              position: 'fixed',
              bottom: `${
                window.innerHeight - targetRect.bottom + (offsetBottom || 0)
              }px`,
            }
          : {};
      }

      // update isFixed
      if (newIsFixed !== isFixed.value) {
        isFixed.value = newIsFixed;
        emit('change', newIsFixed);
      }
      // update placeholderStyles
      placeholderStyles.value = newPlaceholderStyles;
      // update fixedStyles
      fixedStyles.value = {
        ...newFixedStyles,
        ...(newIsFixed ? newPlaceholderStyles : {}),
      };
    });

    onMounted(() => {
      // Binding of scroll events inside the scroll container
      watchEffect((onInvalidate) => {
        const element =
          (target &&
            target.value !== window &&
            getElement(target.value as string | HTMLElement)) ||
          window;

        targetRef.value = element;

        if (element) {
          on(element, 'scroll', updatePositionThrottle);
          on(element, 'resize', updatePositionThrottle);

          onInvalidate(() => {
            off(element, 'scroll', updatePositionThrottle);
            off(element, 'resize', updatePositionThrottle);
          });
        }
      });

      // When the scroll container is not a window, you need to bind the outer scroll event of the scroll container to update the position
      watchEffect((onInvalidate) => {
        if (!targetRef.value) return;

        const container =
          (targetContainer &&
            targetContainer.value !== window &&
            getElement(targetContainer.value as string | HTMLElement)) ||
          window;

        if (container) {
          on(container, 'scroll', updatePositionThrottle);
          on(container, 'resize', updatePositionThrottle);

          onInvalidate(() => {
            off(container, 'scroll', updatePositionThrottle);
            off(container, 'resize', updatePositionThrottle);
          });
        }
      });
    });

    return {
      wrapperRef,
      isFixed,
      classNames,
      placeholderStyles,
      fixedStyles,
      updatePositionThrottle,
    };
  },
  methods: {
    /**
     * @zh 更新位置
     * @en Update position
     * @public
     */
    updatePosition() {
      this.updatePositionThrottle();
    },
  },
});
</script>
