<template>
  <div :class="cls" :style="style">
    <ResizeObserver @resize="handleResize">
      <div
        ref="containerRef"
        :class="`${prefixCls}-container`"
        v-bind="$attrs"
        @scroll="handleScroll"
      >
        <ResizeObserver @resize="handleResize">
          <slot />
        </ResizeObserver>
      </div>
    </ResizeObserver>
    <thumb
      v-if="!hide && hasHorizontalScrollbar"
      ref="horizontalThumbRef"
      :data="horizontalData"
      direction="horizontal"
      :both="isBoth"
      @scroll="handleHorizontalScroll"
    />
    <thumb
      v-if="!hide && hasVerticalScrollbar"
      ref="verticalThumbRef"
      :data="verticalData"
      direction="vertical"
      :both="isBoth"
      @scroll="handleVerticalScroll"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  PropType,
  ref,
  StyleValue,
} from 'vue';
import { ThumbData } from './interface';
import ResizeObserver from '../_components/resize-observer-v2';
import Thumb from './thumb.vue';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber, isObject } from '../_utils/is';

const THUMB_MIN_SIZE = 20;
const TRACK_SIZE = 15;

export default defineComponent({
  name: 'Scrollbar',
  components: {
    ResizeObserver,
    Thumb,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 类型
     * @en Type
     */
    type: {
      type: String as PropType<'track' | 'embed'>,
      default: 'embed',
    },
    /**
     * @zh 外层的类名
     * @en Outer class
     */
    outerClass: [String, Object, Array],
    /**
     * @zh 外层的样式
     * @en Outer style
     */
    outerStyle: {
      type: [String, Object, Array] as PropType<StyleValue>,
    },
    // private
    hide: {
      type: Boolean,
      default: false,
    },
    disableHorizontal: {
      type: Boolean,
      default: false,
    },
    disableVertical: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * @zh 滚动时触发
     * @en Triggered when scroll
     */
    scroll: (ev: Event) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('scrollbar');

    const containerRef = ref<HTMLElement>();
    const horizontalData = ref<ThumbData>();
    const verticalData = ref<ThumbData>();
    const horizontalThumbRef = ref();
    const verticalThumbRef = ref();
    const _hasHorizontalScrollbar = ref(false);
    const _hasVerticalScrollbar = ref(false);
    const hasHorizontalScrollbar = computed(
      () => _hasHorizontalScrollbar.value && !props.disableHorizontal
    );
    const hasVerticalScrollbar = computed(
      () => _hasVerticalScrollbar.value && !props.disableVertical
    );
    const isBoth = ref(false);

    const getContainerSize = () => {
      if (containerRef.value) {
        const {
          clientWidth,
          clientHeight,
          offsetWidth,
          offsetHeight,
          scrollWidth,
          scrollHeight,
          scrollTop,
          scrollLeft,
        } = containerRef.value;
        _hasHorizontalScrollbar.value = scrollWidth > clientWidth;
        _hasVerticalScrollbar.value = scrollHeight > clientHeight;
        isBoth.value =
          hasHorizontalScrollbar.value && hasVerticalScrollbar.value;
        const horizontalTrackWidth =
          props.type === 'embed' && isBoth.value
            ? offsetWidth - TRACK_SIZE
            : offsetWidth;
        const verticalTrackHeight =
          props.type === 'embed' && isBoth.value
            ? offsetHeight - TRACK_SIZE
            : offsetHeight;

        const horizontalThumbWidth = Math.round(
          horizontalTrackWidth /
            Math.min(
              scrollWidth / clientWidth,
              horizontalTrackWidth / THUMB_MIN_SIZE
            )
        );
        const maxHorizontalOffset = horizontalTrackWidth - horizontalThumbWidth;
        const horizontalRatio =
          (scrollWidth - clientWidth) / maxHorizontalOffset;
        const verticalThumbHeight = Math.round(
          verticalTrackHeight /
            Math.min(
              scrollHeight / clientHeight,
              verticalTrackHeight / THUMB_MIN_SIZE
            )
        );
        const maxVerticalOffset = verticalTrackHeight - verticalThumbHeight;
        const verticalRatio = (scrollHeight - clientHeight) / maxVerticalOffset;

        horizontalData.value = {
          ratio: horizontalRatio,
          thumbSize: horizontalThumbWidth,
          max: maxHorizontalOffset,
        };
        verticalData.value = {
          ratio: verticalRatio,
          thumbSize: verticalThumbHeight,
          max: maxVerticalOffset,
        };
        if (scrollTop > 0) {
          const verticalOffset = Math.round(
            scrollTop / (verticalData.value?.ratio ?? 1)
          );
          verticalThumbRef.value?.setOffset(verticalOffset);
        }
        if (scrollLeft > 0) {
          const horizontalOffset = Math.round(
            scrollLeft / (verticalData.value?.ratio ?? 1)
          );
          horizontalThumbRef.value?.setOffset(horizontalOffset);
        }
      }
    };

    onMounted(() => {
      getContainerSize();
    });

    const handleResize = () => {
      getContainerSize();
    };

    const handleScroll = (ev: Event) => {
      if (containerRef.value) {
        if (hasHorizontalScrollbar.value && !props.disableHorizontal) {
          const horizontalOffset = Math.round(
            containerRef.value.scrollLeft / (horizontalData.value?.ratio ?? 1)
          );
          horizontalThumbRef.value?.setOffset(horizontalOffset);
        }
        if (hasVerticalScrollbar.value && !props.disableVertical) {
          const verticalOffset = Math.round(
            containerRef.value.scrollTop / (verticalData.value?.ratio ?? 1)
          );
          verticalThumbRef.value?.setOffset(verticalOffset);
        }
      }
      emit('scroll', ev);
    };

    const handleHorizontalScroll = (offset: number) => {
      if (containerRef.value) {
        containerRef.value.scrollTo({
          left: offset * (horizontalData.value?.ratio ?? 1),
        });
      }
    };

    const handleVerticalScroll = (offset: number) => {
      if (containerRef.value) {
        containerRef.value.scrollTo({
          top: offset * (verticalData.value?.ratio ?? 1),
        });
      }
    };

    const style = computed(() => {
      const style: CSSProperties = {};
      if (props.type === 'track') {
        if (hasHorizontalScrollbar.value) {
          style.paddingBottom = `${TRACK_SIZE}px`;
        }
        if (hasVerticalScrollbar.value) {
          style.paddingRight = `${TRACK_SIZE}px`;
        }
      }
      return [style, props.outerStyle];
    });

    const cls = computed(() => [
      `${prefixCls}`,
      `${prefixCls}-type-${props.type}`,
      {
        [`${prefixCls}-both`]: isBoth.value,
      },
      props.outerClass,
    ]);

    return {
      prefixCls,
      cls,
      style,
      containerRef,
      horizontalThumbRef,
      verticalThumbRef,
      horizontalData,
      verticalData,
      isBoth,
      hasHorizontalScrollbar,
      hasVerticalScrollbar,
      handleResize,
      handleScroll,
      handleHorizontalScroll,
      handleVerticalScroll,
    };
  },
  methods: {
    /**
     * @zh 滚动
     * @en scrollTo
     * @public
     * @param {number | {left?: number;top?: number}} options
     * @param {number} y
     */
    scrollTo(
      options?:
        | number
        | {
            left?: number;
            top?: number;
          },
      y?: number
    ) {
      if (isObject(options)) {
        (this.$refs.containerRef as HTMLElement)?.scrollTo(options);
      } else if (options || y) {
        (this.$refs.containerRef as HTMLElement)?.scrollTo(
          options as number,
          y as number
        );
      }
    },
    /**
     * @zh 纵向滚动
     * @en scroll vertically
     * @public
     * @param {number} top
     * @version 2.40.0
     */
    scrollTop(top: number) {
      (this.$refs.containerRef as HTMLElement)?.scrollTo({
        top,
      });
    },
    /**
     * @zh 横向滚动
     * @en scroll horizontal
     * @public
     * @param {number} left
     * @version 2.40.0
     */
    scrollLeft(left: number) {
      (this.$refs.containerRef as HTMLElement)?.scrollTo({
        left,
      });
    },
  },
});
</script>
