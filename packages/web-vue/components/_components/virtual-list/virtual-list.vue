<template>
  <div ref="scrollbarHostRef" :class="hostClassNames" :style="containerOuterStyle">
    <component
      :is="currentScroller"
      ref="scrollerRef"
      :class="`${prefixCls}-scroller`"
      :style="scrollerStyle"
      v-bind="scrollerProps"
      v-on="scrollerListeners"
    >
      <template #before>
        <slot name="before" />
      </template>
      <template #default="slotProps">
        <DynamicScrollerItem
          v-if="isDynamicScroller"
          :item="slotProps.item"
          :active="slotProps.active"
          :index="slotProps.index"
          :size-dependencies="null"
        >
          <slot
            name="item"
            :item="slotProps.item"
            :index="slotProps.index"
            :active="slotProps.active"
            :item-with-size="getSlotItemWithSize(slotProps)"
          >
            <slot
              :item="slotProps.item"
              :index="slotProps.index"
              :active="slotProps.active"
              :item-with-size="getSlotItemWithSize(slotProps)"
            />
          </slot>
        </DynamicScrollerItem>
        <slot
          v-else
          name="item"
          :item="slotProps.item"
          :index="slotProps.index"
          :active="slotProps.active"
          :item-with-size="getSlotItemWithSize(slotProps)"
        >
          <slot
            :item="slotProps.item"
            :index="slotProps.index"
            :active="slotProps.active"
            :item-with-size="getSlotItemWithSize(slotProps)"
          />
        </slot>
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
      <template #after>
        <slot name="after" />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
  import {
    type CSSProperties,
    type Component,
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    PropType,
    watch,
  } from 'vue';

  import {
    OverlayScrollbars,
    type OverlayScrollbars as OverlayScrollbarsInstance,
    type PartialOptions as OverlayScrollbarsPartialOptions,
  } from 'overlayscrollbars';
  import {
    DynamicScroller,
    DynamicScrollerItem,
    RecycleScroller,
    type CacheSnapshot,
    type ClassValue,
    type DynamicScrollerExposed,
    type ItemSizeValue,
    type KeyFieldValue,
    type KeyValue,
    type RecycleScrollerExposed,
    type ScrollAlign,
    type ScrollDirection,
    type ScrollToOptions,
  } from 'vue-virtual-scroller';

  import type { ScrollbarProps } from '../../scrollbar';
  import type { ScrollIntoViewOptions, ScrollOptions, VirtualListRef } from './interface';

  import { getPrefixCls } from '../../_utils/global-config';
  import { isString } from '../../_utils/is';

  type ScrollerExpose = RecycleScrollerExposed<any, KeyValue> | DynamicScrollerExposed<any>;
  type ScrollerSlotProps = {
    item: unknown;
    index: number;
    active: boolean;
    itemWithSize?: Record<string, unknown>;
  };

  export default defineComponent({
    name: 'VirtualList',
    components: {
      RecycleScroller,
      DynamicScroller,
      DynamicScrollerItem,
    },
    props: {
      items: {
        type: Array as PropType<unknown[]>,
        default: () => [],
      },
      height: {
        type: [Number, String] as PropType<number | string>,
        default: undefined,
      },
      keyField: {
        type: [String, Function] as PropType<KeyFieldValue<any>>,
        default: 'key',
      },
      direction: {
        type: String as PropType<ScrollDirection>,
        default: 'vertical',
      },
      listTag: {
        type: String,
        default: 'div',
      },
      itemTag: {
        type: String,
        default: 'div',
      },
      itemSize: {
        type: [Number, Function, Object] as PropType<ItemSizeValue<any>>,
        default: undefined,
      },
      gridItems: Number,
      itemSecondarySize: Number,
      minItemSize: {
        type: [Number, String] as PropType<number | string | null>,
        default: undefined,
      },
      sizeField: String,
      typeField: String,
      buffer: Number,
      shift: Boolean,
      cache: Object as PropType<CacheSnapshot>,
      prerender: Number,
      emitUpdate: Boolean,
      disableTransform: Boolean,
      flowMode: Boolean,
      hiddenPosition: Number,
      updateInterval: Number,
      skipHover: Boolean,
      enabled: {
        type: Boolean,
        default: true,
      },
      listClass: {
        type: [String, Object, Array] as PropType<ClassValue>,
      },
      itemClass: {
        type: [String, Object, Array] as PropType<ClassValue>,
      },
      scrollbar: {
        type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
        default: true,
      },
    },
    emits: {
      scroll: (_ev: Event) => true,
      reachBottom: (_ev: Event) => true,
      resize: () => true,
      visible: () => true,
      hidden: () => true,
      update: (
        _startIndex: number,
        _endIndex: number,
        _visibleStartIndex: number,
        _visibleEndIndex: number,
      ) => true,
      scrollStart: () => true,
      scrollEnd: () => true,
    },
    setup(props, { emit, expose }) {
      const prefixCls = getPrefixCls('virtual-list');
      const scrollbarHostRef = ref<HTMLElement>();
      const scrollerRef = ref<ScrollerExpose>();
      const osInstanceRef = ref<OverlayScrollbarsInstance | null>(null);
      const overlayViewportReadyRef = ref(false);
      const resolvedItems = computed(() => props.items ?? []);

      const resolvedScrollbarProps = computed<ScrollbarProps | undefined>(() => {
        if (!props.scrollbar) {
          return undefined;
        }

        if (typeof props.scrollbar === 'boolean') {
          return {
            type: 'embed',
          };
        }

        return {
          type: 'embed',
          ...props.scrollbar,
        };
      });

      const hostClassNames = computed(() => [
        prefixCls,
        resolvedScrollbarProps.value && 'sd-scrollbar',
        resolvedScrollbarProps.value &&
          `sd-scrollbar-type-${resolvedScrollbarProps.value.type ?? 'embed'}`,
        resolvedScrollbarProps.value && `${prefixCls}-scrollbar`,
      ]);

      const containerOuterStyle = computed(() => {
        if (props.height === undefined) {
          return undefined;
        }
        const value = typeof props.height === 'number' ? `${props.height}px` : props.height;
        return {
          height: value,
        };
      });

      const resolvedHeightValue = computed(() => {
        if (props.height === undefined) {
          return undefined;
        }

        return typeof props.height === 'number' ? `${props.height}px` : props.height;
      });

      const isDynamicScroller = computed(() => {
        return props.itemSize === undefined;
      });

      const currentScroller = computed<Component>(() => {
        return isDynamicScroller.value ? DynamicScroller : RecycleScroller;
      });

      const scrollerStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {
          minHeight: 0,
        };

        if (resolvedHeightValue.value !== undefined) {
          style.height = resolvedScrollbarProps.value ? '100%' : resolvedHeightValue.value;
        }

        const shouldUseNativeViewport =
          !resolvedScrollbarProps.value || !overlayViewportReadyRef.value;

        if (shouldUseNativeViewport) {
          if (props.direction === 'horizontal') {
            style.overflowX = 'auto';
            style.overflowY = 'hidden';
          } else {
            style.overflowY = 'auto';
            style.overflowX = 'hidden';
          }
        }

        return style;
      });

      const resolvedOverlayOptions = computed<OverlayScrollbarsPartialOptions | null>(() => {
        const scrollbarProps = resolvedScrollbarProps.value;
        if (!scrollbarProps) {
          return null;
        }

        const overlayOptions = scrollbarProps.overlayOptions ?? {};
        const isTrackType = scrollbarProps.type === 'track';

        return {
          ...overlayOptions,
          paddingAbsolute: scrollbarProps.paddingAbsolute ?? overlayOptions.paddingAbsolute,
          showNativeOverlaidScrollbars:
            scrollbarProps.showNativeOverlaidScrollbars ??
            overlayOptions.showNativeOverlaidScrollbars,
          update: (scrollbarProps.updateOptions ??
            overlayOptions.update) as OverlayScrollbarsPartialOptions['update'],
          overflow: {
            x: 'scroll',
            y: 'scroll',
            ...overlayOptions.overflow,
            ...scrollbarProps.overflow,
          },
          scrollbars: {
            theme: isTrackType ? 'sd-scrollbar-theme-track' : 'sd-scrollbar-theme-embed',
            visibility: isTrackType ? 'visible' : 'auto',
            autoHide: isTrackType ? 'never' : 'leave',
            autoHideSuspend: true,
            clickScroll: 'instant',
            ...overlayOptions.scrollbars,
            ...scrollbarProps.scrollbars,
          },
        };
      });

      const resolveOSInstance = () => {
        const instance = osInstanceRef.value;
        if (!instance || instance.state().destroyed) {
          return null;
        }
        return instance;
      };

      const getScrollerElement = () => {
        const scroller = scrollerRef.value as { $el?: unknown } | undefined;
        return scroller?.$el instanceof HTMLElement ? scroller.$el : null;
      };

      const getEstimatedItemSize = () => {
        if (typeof props.itemSize === 'number' && props.itemSize > 0) {
          return props.itemSize;
        }

        if (typeof props.minItemSize === 'number' && props.minItemSize > 0) {
          return props.minItemSize;
        }

        return 32;
      };

      const shouldResetScrollForSmallList = (
        nextItems: unknown[],
        previousItems: unknown[] | undefined,
      ) => {
        const viewport = getScrollerElement();
        if (!viewport || viewport.scrollTop <= 0 || !previousItems?.length) {
          return false;
        }

        if (!nextItems.length) {
          return true;
        }

        if (nextItems.length >= previousItems.length || props.shift) {
          return false;
        }

        const estimatedItemSize = getEstimatedItemSize();
        const visibleCount = Math.max(1, Math.ceil(viewport.clientHeight / estimatedItemSize));
        return nextItems.length <= visibleCount * 2;
      };

      const clampScrollPosition = () => {
        const viewport = getScrollerElement();
        if (!viewport) {
          return;
        }

        const maxScrollTop = Math.max(viewport.scrollHeight - viewport.clientHeight, 0);
        if (viewport.scrollTop > maxScrollTop) {
          scrollToPosition(maxScrollTop);
        }
      };

      const refreshVisibleWindow = (itemsChanged = true) => {
        if (isDynamicScroller.value) {
          forceUpdate(true);
          return;
        }

        updateVisibleItems(itemsChanged, true);
      };

      const waitForLayoutFrame = async () => {
        await new Promise<void>((resolve) => {
          if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(() => resolve());
            return;
          }

          resolve();
        });
      };

      const destroyOverlayScrollbar = () => {
        overlayViewportReadyRef.value = false;
        osInstanceRef.value?.destroy();
        osInstanceRef.value = null;
      };

      const initOverlayScrollbar = async (waitForDom = true) => {
        destroyOverlayScrollbar();

        if (!resolvedOverlayOptions.value) {
          return;
        }

        if (waitForDom) {
          await nextTick();
        }

        const host = scrollbarHostRef.value;
        const viewport = getScrollerElement();
        if (!host || !viewport) {
          return;
        }

        osInstanceRef.value = OverlayScrollbars(
          {
            target: host,
            elements: {
              viewport,
              padding: false,
              content: false,
            },
          },
          resolvedOverlayOptions.value,
          {
            scroll: (_instance, event) => {
              onScroll(event);
            },
          },
        );

        overlayViewportReadyRef.value = true;
      };

      onMounted(() => {
        void initOverlayScrollbar(false);
      });

      watch(
        [currentScroller, resolvedOverlayOptions],
        async () => {
          if (!resolvedOverlayOptions.value) {
            destroyOverlayScrollbar();
            return;
          }

          await nextTick();

          const viewport = getScrollerElement();
          const osInstance = resolveOSInstance();

          if (!viewport || !scrollbarHostRef.value) {
            return;
          }

          if (!osInstance || osInstance.elements().viewport !== viewport) {
            await initOverlayScrollbar(true);
            return;
          }

          osInstance.options(resolvedOverlayOptions.value);
          osInstance.update(true);
        },
        { deep: true },
      );

      watch(
        () => resolvedItems.value,
        async (nextItems, previousItems) => {
          await nextTick();

          resolveOSInstance()?.update(true);
          await waitForLayoutFrame();

          if (shouldResetScrollForSmallList(nextItems, previousItems)) {
            scrollToPosition(0);
            await waitForLayoutFrame();
          }

          refreshVisibleWindow(true);

          await nextTick();
          await waitForLayoutFrame();
          clampScrollPosition();
          resolveOSInstance()?.update(true);

          await nextTick();
          await waitForLayoutFrame();
          refreshVisibleWindow(true);
        },
        { deep: true },
      );

      onBeforeUnmount(() => {
        destroyOverlayScrollbar();
      });

      const scrollerProps = computed<Record<string, unknown>>(() => {
        const commonProps = {
          items: resolvedItems.value,
          height: props.height,
          keyField: props.keyField,
          direction: props.direction,
          listTag: props.listTag,
          itemTag: props.itemTag,
          shift: props.shift,
          cache: props.cache,
          disableTransform: props.disableTransform,
          flowMode: props.flowMode,
          hiddenPosition: props.hiddenPosition,
          enabled: props.enabled,
        };

        if (isDynamicScroller.value) {
          return {
            ...commonProps,
            minItemSize: (props.minItemSize ?? 32) as number | string,
          };
        }

        return {
          ...commonProps,
          itemSize: props.itemSize,
          gridItems: props.gridItems,
          itemSecondarySize: props.itemSecondarySize,
          minItemSize: props.minItemSize,
          sizeField: props.sizeField,
          typeField: props.typeField,
          buffer: props.buffer,
          prerender: props.prerender,
          emitUpdate: props.emitUpdate,
          updateInterval: props.updateInterval,
          skipHover: props.skipHover,
          listClass: props.listClass,
          itemClass: props.itemClass,
        };
      });

      const onScroll = (ev: Event) => {
        emit('scroll', ev);
        const target = ev.target as HTMLElement | undefined;
        if (!target) {
          return;
        }
        const bottom = Math.floor(target.scrollHeight - (target.scrollTop + target.clientHeight));
        if (bottom <= 0) {
          emit('reachBottom', ev);
        }
      };

      const onScrollEnd = () => {
        emit('scrollEnd');
        const osInstance = resolveOSInstance();
        const target = osInstance
          ? ((osInstance.elements().scrollOffsetElement ??
              osInstance.elements().viewport) as HTMLElement)
          : getScrollerElement();
        if (!target) {
          return;
        }
        const event = new Event('scroll');
        emit('reachBottom', event);
      };

      const scrollerListeners = computed(() => {
        if (isDynamicScroller.value) {
          return {
            resize: () => emit('resize'),
            visible: () => emit('visible'),
          };
        }

        return {
          resize: () => emit('resize'),
          visible: () => emit('visible'),
          hidden: () => emit('hidden'),
          update: (
            startIndex: number,
            endIndex: number,
            visibleStartIndex: number,
            visibleEndIndex: number,
          ) => emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex),
          scrollStart: () => emit('scrollStart'),
          scrollEnd: onScrollEnd,
        };
      });

      const normalizeAlign = (align?: ScrollIntoViewOptions['align']): ScrollAlign | undefined => {
        if (!align || align === 'auto') {
          return 'nearest';
        }
        if (align === 'top') {
          return 'start';
        }
        if (align === 'bottom') {
          return 'end';
        }
        return align;
      };

      const getSlotItemWithSize = (slotProps: ScrollerSlotProps) => {
        return ('itemWithSize' in slotProps ? slotProps.itemWithSize : undefined) as
          | Record<string, unknown>
          | undefined;
      };

      const getScroller = () => scrollerRef.value;

      const scrollToItem = (index: number, options?: ScrollToOptions) => {
        getScroller()?.scrollToItem(index, options);
      };

      const scrollToPosition = (position: number, options?: ScrollToOptions) => {
        getScroller()?.scrollToPosition(position, options);
      };

      const findItemIndex = (offset: number) => {
        return getScroller()?.findItemIndex(offset) ?? -1;
      };

      const getItemOffset = (index: number) => {
        return getScroller()?.getItemOffset(index) ?? 0;
      };

      const getItemSize = (index: number) => {
        if (isDynamicScroller.value) {
          const dynamicScroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
          if (!dynamicScroller) {
            return 0;
          }
          return dynamicScroller.getItemSize(resolvedItems.value[index], index);
        }
        return (
          (getScroller() as RecycleScrollerExposed<unknown, KeyValue> | undefined)?.getItemSize(
            index,
          ) ?? 0
        );
      };

      const cacheSnapshot = () => {
        const scroller = getScroller() as
          | { cacheSnapshot?: CacheSnapshot | { value: CacheSnapshot } }
          | undefined;
        if (!scroller?.cacheSnapshot) {
          return undefined;
        }
        if ('value' in scroller.cacheSnapshot) {
          return scroller.cacheSnapshot.value;
        }
        return scroller.cacheSnapshot;
      };

      const restoreCache = (snapshot: CacheSnapshot | null | undefined) => {
        return getScroller()?.restoreCache(snapshot) ?? false;
      };

      const updateVisibleItems = (itemsChanged: boolean, checkPositionDiff?: boolean) => {
        const scroller = getScroller() as RecycleScrollerExposed<unknown, KeyValue> | undefined;
        scroller?.updateVisibleItems(itemsChanged, checkPositionDiff);
      };

      const scrollToBottom = () => {
        const scroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
        scroller?.scrollToBottom();
      };

      const forceUpdate = (clear?: boolean) => {
        const scroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
        scroller?.forceUpdate(clear);
      };

      const getDynamicItemSize = (item: unknown, index?: number) => {
        const scroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
        return scroller?.getItemSize(item, index) ?? 0;
      };

      const scrollTo = (options: ScrollOptions) => {
        if (typeof options === 'number') {
          scrollToPosition(options);
          return;
        }

        let index = options.index;
        if (typeof index !== 'number' && options.key !== undefined) {
          const keyField = props.keyField;
          index = resolvedItems.value.findIndex((item, currentIndex) => {
            if (typeof keyField === 'function') {
              return keyField(item, currentIndex) === options.key;
            }

            if (item && typeof item === 'object' && isString(keyField)) {
              return (item as Record<string, unknown>)[keyField] === options.key;
            }

            return currentIndex === options.key;
          });
        }

        if (typeof index !== 'number' || index < 0) {
          return;
        }

        scrollToItem(index, {
          align: normalizeAlign(options.align),
          smooth: options.smooth,
          offset: options.offset,
        });
      };

      expose({
        scrollToItem,
        scrollToPosition,
        findItemIndex,
        getItemOffset,
        getItemSize,
        cacheSnapshot,
        restoreCache,
        updateVisibleItems,
        scrollToBottom,
        forceUpdate,
        getDynamicItemSize,
        scrollTo,
      } satisfies VirtualListRef);

      return {
        prefixCls,
        hostClassNames,
        scrollbarHostRef,
        scrollerRef,
        currentScroller,
        isDynamicScroller,
        containerOuterStyle,
        scrollerStyle,
        scrollerProps,
        scrollerListeners,
        getSlotItemWithSize,
        onScroll,
      };
    },
  });
</script>

<style lang="scss">
  .sd-virtual-list {
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;

    &-scrollbar {
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    &-scroller {
      width: 100%;
      height: 100%;
      min-height: 0;
    }
  }
</style>
