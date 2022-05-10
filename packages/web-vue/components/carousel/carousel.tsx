import type { PropType } from 'vue';
import {
  defineComponent,
  computed,
  toRefs,
  ref,
  watchEffect,
  onBeforeUnmount,
  provide,
  reactive,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import CarouselIndicator from './carousel-indicator.vue';
import CarouselArrow from './carousel-arrow.vue';
import { carouselInjectionKey } from './context';
import { isNumber, isObject } from '../_utils/is';
import type {
  CarouselArrowType,
  CarouselAutoPlayConfig,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselTriggerEvent,
} from './interface';
import { Direction } from '../_utils/constant';
import { useChildrenComponents } from '../_hooks/use-children-components';

const DEFAULT_AUTO_PLAY = {
  interval: 3000,
  hoverToPause: true,
};

function getValidIndex(i: number, length: number): number {
  const indexNumber = +i;
  return typeof indexNumber === 'number' && !Number.isNaN(indexNumber)
    ? (indexNumber + length) % length
    : i;
}

export default defineComponent({
  name: 'Carousel',
  props: {
    /**
     * @zh 当前展示索引
     * @en The index of current slide which starts from 1
     * @vModel
     */
    current: {
      type: Number,
    },
    /**
     * @zh 当前展示索引
     * @en Default index of current slide
     */
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置
     * @en* Whether to automatically loop the display, or pass in `{ interval: the time interval for switching (default: 3000),
     * hoverToPause: whether to pause switching while hover (default: true) }` for configuration (object is supported from `2.14.0`)
     */
    autoPlay: {
      type: [Boolean, Object] as PropType<boolean | CarouselAutoPlayConfig>,
      default: false,
    },
    /**
     * @zh 幻灯片移动速率(ms)
     * @en The duration of the slide movement(ms)
     */
    moveSpeed: {
      type: Number,
      default: 500,
    },
    /**
     * @zh 切换动画
     * @en The animation of the slide movement
     */
    animationName: {
      type: String as PropType<'slide' | 'fade' | 'card'>,
      default: 'slide',
    },
    /**
     * @zh 幻灯片切换触发方式, click/hover 指示器
     * @en How to trigger the slide switch, click/hover the indicator
     * @values 'click', 'hover'
     */
    trigger: {
      type: String as PropType<CarouselTriggerEvent>,
      default: 'click',
    },
    /**
     * @zh 幻灯片移动方向
     * @en The direction of the slide movement
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 切换箭头显示时机
     * @en When to show the arrow used to switch
     * @values 'always', 'hover', 'never'
     */
    showArrow: {
      type: String as PropType<CarouselArrowType>,
      default: 'always',
    },
    /**
     * @zh 切换箭头样式
     * @en The additional css class to arrow used to switch
     */
    arrowClass: {
      type: String,
      default: '',
    },
    /**
     * @zh 指示器类型，可为小方块和小圆点或不显示
     * @en Type of indicator
     * @values 'line', 'dot', 'slider', 'never'
     */
    indicatorType: {
      type: String as PropType<CarouselIndicatorType>,
      default: 'dot',
    },
    /**
     * @zh 指示器位置
     * @en Position of indication
     * @values 'bottom', 'top', 'left', 'right', 'outer'
     */
    indicatorPosition: {
      type: String as PropType<CarouselIndicatorPosition>,
      default: 'bottom',
    },
    /**
     * @zh 指示器的样式
     * @en The additional css class to indicator
     */
    indicatorClass: {
      type: String,
      default: '',
    },
    /**
     * @zh 过渡速度曲线, 默认匀速 [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
     * @en How intermediate values are calculated for CSS properties being affected by a transition effect.
     * [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
     */
    transitionTimingFunction: {
      type: String,
      default: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
    },
  },
  emits: {
    'update:current': (index: number) => true,
    /**
     * @zh 幻灯片发生切换时的回调函数
     * @en Callback when slide changes
     * @param {number} index
     * @param {number} prevIndex
     * @param {boolean} isManual
     */
    'change': (index: number, prevIndex: number, isManual: boolean) => true,
  },
  setup(props, { emit, slots }) {
    const { current, animationName, moveSpeed, transitionTimingFunction } =
      toRefs(props);
    const prefixCls = getPrefixCls('carousel');

    const isPause = ref(false);
    const previousIndex = ref<number>();
    const slideDirection = ref<'positive' | 'negative'>();
    const computedAutoPlay = computed<CarouselAutoPlayConfig>(() => {
      if (isObject(props.autoPlay)) {
        return {
          ...DEFAULT_AUTO_PLAY,
          ...props.autoPlay,
        };
      }
      return props.autoPlay ? DEFAULT_AUTO_PLAY : {};
    });
    let intervalTimer = 0;
    let animationTimer = 0;
    const { children, components } = useChildrenComponents('CarouselItem');
    const _index = ref(props.defaultCurrent - 1);

    const mergedIndexes = computed(() => {
      const childrenLength = components.value.length;
      const mergedIndex = isNumber(current.value)
        ? getValidIndex(current.value - 1, childrenLength)
        : _index.value;
      const prevIndex = getValidIndex(mergedIndex - 1, childrenLength);
      const nextIndex = getValidIndex(mergedIndex + 1, childrenLength);
      return {
        mergedIndex,
        mergedPrevIndex: prevIndex,
        mergedNextIndex: nextIndex,
      };
    });

    const carouselContext = reactive({
      items: components,
      slideTo,
      mergedIndexes,
      previousIndex,
      animationName,
      slideDirection,
      transitionTimingFunction,
      moveSpeed,
    });
    provide(carouselInjectionKey, carouselContext);

    const clearTimer = () => {
      if (intervalTimer) {
        window.clearInterval(intervalTimer);
      }
    };

    watchEffect(() => {
      const { interval } = computedAutoPlay.value || {};
      const { mergedNextIndex } = mergedIndexes.value;
      const shouldInterval =
        components.value?.length > 1 && !isPause.value && Boolean(interval);
      clearTimer();
      if (shouldInterval) {
        intervalTimer = window.setInterval(() => {
          slideTo({
            targetIndex: mergedNextIndex,
          });
        }, interval);
      }
    });

    onBeforeUnmount(() => {
      clearTimer();
    });

    function slideTo({
      targetIndex,
      isNegative = false,
      isManual = false,
    }: {
      targetIndex: number;
      isNegative?: boolean;
      isManual?: boolean;
    }) {
      if (!animationTimer && targetIndex !== mergedIndexes.value.mergedIndex) {
        previousIndex.value = _index.value;
        _index.value = targetIndex;
        slideDirection.value = isNegative ? 'negative' : 'positive';
        animationTimer = window.setTimeout(() => {
          animationTimer = 0;
        }, moveSpeed.value);
        emit('update:current', _index.value + 1);
        emit('change', _index.value + 1, previousIndex.value + 1, isManual);
      }
    }

    const onPreviousClick = () =>
      slideTo({
        targetIndex: mergedIndexes.value.mergedPrevIndex,
        isNegative: true,
        isManual: true,
      });

    const onNextClick = () =>
      slideTo({
        targetIndex: mergedIndexes.value.mergedNextIndex,
        isManual: true,
      });

    const onSelect = (index: number) =>
      slideTo({
        targetIndex: index,
        isNegative: index < mergedIndexes.value.mergedIndex,
        isManual: true,
      });

    const eventHandlers = computed(() => {
      return computedAutoPlay.value.hoverToPause
        ? {
            onMouseenter: () => {
              isPause.value = true;
            },
            onMouseleave: () => {
              isPause.value = false;
            },
          }
        : {};
    });

    const hasIndicator = computed(() => {
      return props.indicatorType !== 'never' && components.value.length > 1;
    });

    const hasArrow = computed(() => {
      return props.showArrow !== 'never' && components.value.length > 1;
    });

    const cls = computed(() => {
      return [
        prefixCls,
        `${prefixCls}-indicator-position-${props.indicatorPosition}`,
      ];
    });

    const contentCls = computed(() => {
      return [
        `${prefixCls}-${props.animationName}`,
        `${prefixCls}-${props.direction}`,
        { [`${prefixCls}-negative`]: slideDirection.value === 'negative' },
      ];
    });

    const indicatorCls = computed(() => {
      return [
        `${prefixCls}-indicator-wrapper`,
        `${prefixCls}-indicator-wrapper-${props.indicatorPosition}`,
      ];
    });

    return () => {
      children.value = slots.default?.();

      return (
        <div class={cls.value} {...eventHandlers.value}>
          <div class={contentCls.value}>{children.value}</div>
          {hasIndicator.value && (
            <div class={indicatorCls.value}>
              <CarouselIndicator
                class={props.indicatorClass}
                type={props.indicatorType}
                count={components.value.length}
                activeIndex={mergedIndexes.value.mergedIndex}
                position={props.indicatorPosition}
                trigger={props.trigger}
                onSelect={onSelect}
              />
            </div>
          )}
          {hasArrow.value && (
            <CarouselArrow
              class={props.arrowClass}
              direction={props.direction}
              showArrow={props.showArrow}
              onPreviousClick={onPreviousClick}
              onNextClick={onNextClick}
            />
          )}
        </div>
      );
    };
  },
});
