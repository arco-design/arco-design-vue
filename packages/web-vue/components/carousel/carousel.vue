<template>
  <div :class="cls" v-on="eventHandlers">
    <div :class="contentCls">
      <slot />
    </div>
    <div v-if="hasIndicator" :class="indicatorCls">
      <CarouselIndicator
        :class="indicatorClass"
        :type="indicatorType"
        :count="length"
        :active-index="mergedIndexes.mergedIndex"
        :position="indicatorPosition"
        :trigger="trigger"
        :on-select-index="
          (index) =>
            slideTo({
              targetIndex: index,
              isNegative: index < mergedIndexes.mergedIndex,
              isManual: true,
            })
        "
      />
    </div>
    <CarouselArrow
      v-if="hasArrow"
      :class="arrowClass"
      :direction="direction"
      :show-arrow="showArrow"
      :prev="
        () =>
          slideTo({
            targetIndex: mergedIndexes.mergedPrevIndex,
            isNegative: true,
            isManual: true,
          })
      "
      :next="
        () =>
          slideTo({
            targetIndex: mergedIndexes.mergedNextIndex,
            isManual: true,
          })
      "
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  toRefs,
  PropType,
  ref,
  Ref,
  watchEffect,
  onBeforeUnmount,
  provide,
  reactive,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  ANIMATIONS,
  AnimationType,
  TRIGGERS,
  TriggerType,
  DIRECTIONS,
  DirectionType,
  ARROWS,
  ArrowType,
  INDICATORS,
  IndicatorType,
  INDICATORS_POSITION,
  IndicatorPositionType,
} from './constants';
import CarouselIndicator from './carousel-indicator.vue';
import CarouselArrow from './carousel-arrow.vue';
import { carouselInjectionKey, VItem } from './context';

const DEFAULT_AUTO_PLAY_INTERVAL = 3000;
const DEFAULT_AUTO_PLAY = {
  interval: DEFAULT_AUTO_PLAY_INTERVAL,
  hoverToPause: true,
};

type AutoPlayConfig = { interval: number; hoverToPause: boolean };

function getValidIndex(i: number, length: number): number {
  const indexNumber = +i;
  return typeof indexNumber === 'number' && !Number.isNaN(indexNumber)
    ? (indexNumber + length) % length
    : i;
}

export default defineComponent({
  name: 'Carousel',
  components: {
    CarouselIndicator,
    CarouselArrow,
  },
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
      type: [Boolean, Object],
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
     * @values 'slide', 'fade', 'card'
     */
    animationName: {
      type: String as PropType<AnimationType | 'card'>,
      default: 'slide',
    },
    /**
     * @zh 幻灯片切换触发方式, click/hover 指示器
     * @en How to trigger the slide switch, click/hover the indicator
     * @values 'click', 'hover'
     */
    trigger: {
      type: String as PropType<TriggerType>,
      validator: (value: TriggerType) => {
        return TRIGGERS.includes(value);
      },
      default: 'click',
    },
    /**
     * @zh 幻灯片移动方向
     * @en The direction of the slide movement
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String as PropType<DirectionType>,
      validator: (value: DirectionType) => {
        return DIRECTIONS.includes(value);
      },
      default: 'horizontal',
    },
    /**
     * @zh 切换箭头显示时机
     * @en When to show the arrow used to switch
     * @values 'always', 'hover', 'never'
     */
    showArrow: {
      type: String as PropType<ArrowType>,
      validator: (value: ArrowType) => {
        return ARROWS.includes(value);
      },
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
      type: String as PropType<IndicatorType>,
      validator: (value: IndicatorType) => {
        return INDICATORS.includes(value);
      },
      default: 'dot',
    },
    /**
     * @zh 指示器位置
     * @en Position of indication
     * @values 'bottom', 'top', 'left', 'right', 'outer'
     */
    indicatorPosition: {
      type: String as PropType<IndicatorPositionType>,
      validator: (value: IndicatorPositionType) => {
        return INDICATORS_POSITION.includes(value);
      },
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
  emits: [
    'update:current',
    /**
     * @zh 幻灯片发生切换时的回调函数
     * @en Callback when slide changes
     * @param {number} index Index of current slide
     * @param {number} prevIndex Index of previous slide
     * @param {boolean} isManual Whether the slide change is triggered manually
     */
    'change',
  ],
  setup(props, { emit }) {
    const {
      current: currentRef,
      indicatorType: indicatorTypeRef,
      animationName,
      moveSpeed,
      transitionTimingFunction,
      autoPlay,
      showArrow: showArrowRef,
    } = toRefs(props);

    const prefixCls = getPrefixCls('carousel');
    const animationTimerRef = ref<null | number>(null);
    const intervalRef = ref<null | number>(null);
    const isPauseRef = ref<boolean>(false);
    const previousIndexRef = ref<number | null>(null);
    const slideDirectionRef = ref<'positive' | 'negative' | null>(null);
    const itemsRef = ref<VItem[]>([]);
    const itemsLegnthRef = computed(() => itemsRef.value.length);
    const computedAutoPlayRef = useAutoPlay(autoPlay);
    const indexRef = ref<number>(props.defaultCurrent - 1);

    const mergedIndexesRef = computed(() => {
      const childrenLength = itemsRef.value.length;
      const current = currentRef?.value;
      const index = indexRef.value;
      const mergedIndex =
        typeof current === 'number'
          ? getValidIndex(current - 1, itemsLegnthRef.value)
          : index;
      const prevIndex = getValidIndex(mergedIndex - 1, childrenLength);
      const nextIndex = getValidIndex(mergedIndex + 1, childrenLength);
      return {
        mergedIndex,
        mergedPrevIndex: prevIndex,
        mergedNextIndex: nextIndex,
      };
    });

    function addItem(item: VItem) {
      itemsRef.value.push(item);
    }

    function removeItem(uid: number) {
      const index = itemsRef.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        itemsRef.value.splice(index, 1);
      }
    }

    const carouselContext = reactive({
      addItem,
      removeItem,
      slideTo,
      mergedIndexes: mergedIndexesRef,
      previousIndex: previousIndexRef,
      animationName,
      slideDirection: slideDirectionRef,
      items: itemsRef,
      transitionTimingFunction,
      moveSpeed,
    });
    provide(carouselInjectionKey, carouselContext);

    const clearTimer = () => {
      if (intervalRef.value) {
        window.clearInterval(intervalRef.value);
      }
    };
    watchEffect(() => {
      const { interval } = computedAutoPlayRef.value || {};
      const { mergedNextIndex } = mergedIndexesRef.value;
      const _interval =
        itemsRef.value?.length > 1 && !isPauseRef.value && interval;
      clearTimer();
      if (_interval) {
        intervalRef.value = window.setInterval(() => {
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
      if (
        !animationTimerRef.value &&
        targetIndex !== mergedIndexesRef.value.mergedIndex
      ) {
        emit('update:current', targetIndex + 1);
        emit('change', targetIndex + 1, indexRef.value + 1, isManual);
        previousIndexRef.value = indexRef.value;
        indexRef.value = targetIndex;
        slideDirectionRef.value = isNegative ? 'negative' : 'positive';
        animationTimerRef.value = window.setTimeout(() => {
          animationTimerRef.value = null;
        }, moveSpeed.value);
      }
    }

    const eventHandlers = useEventHandlers(computedAutoPlayRef, isPauseRef);

    const hasIndicator = computed(() => {
      return indicatorTypeRef.value !== 'never' && itemsLegnthRef.value > 1;
    });

    const hasArrow = computed(() => {
      return showArrowRef.value !== 'never' && itemsLegnthRef.value > 1;
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
        { [`${prefixCls}-negative`]: slideDirectionRef.value === 'negative' },
      ];
    });

    const indicatorCls = computed(() => {
      return [
        `${prefixCls}-indicator-wrapper`,
        `${prefixCls}-indicator-wrapper-${props.indicatorPosition}`,
      ];
    });

    return {
      prefixCls,
      eventHandlers,
      length: itemsLegnthRef,
      mergedIndexes: mergedIndexesRef,
      slideTo,
      hasIndicator,
      hasArrow,
      slideDirection: slideDirectionRef,
      cls,
      contentCls,
      indicatorCls,
    };
  },
});

const useAutoPlay = (autoPlayRef: Ref<boolean | AutoPlayConfig>) => {
  return computed(() => {
    const { value: autoPlay } = autoPlayRef;
    if (autoPlay === false) {
      return {} as AutoPlayConfig;
    }
    if (autoPlay === true) {
      return DEFAULT_AUTO_PLAY;
    }
    return {
      ...DEFAULT_AUTO_PLAY,
      ...autoPlay,
    };
  });
};

const useEventHandlers = (
  computedAutoPlayRef: Ref<AutoPlayConfig>,
  isPauseRef: Ref<boolean>
) => {
  return computed(() => {
    const { value: autoPlayConfig } = computedAutoPlayRef;
    return autoPlayConfig.hoverToPause
      ? {
          mouseEnter: () => (isPauseRef.value = true),
          mouseLeave: () => (isPauseRef.value = false),
        }
      : {};
  });
};
</script>
