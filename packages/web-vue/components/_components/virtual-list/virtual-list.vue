<template>
  <div ref="scrollbarHostRef" :class="hostClassNames" :style="containerOuterStyle">
    <template v-if="isCompatMode">
      <component
        :is="mergedCompatComponent.container"
        ref="viewportRef"
        :class="`${prefixCls}-scroller`"
        :style="compatViewportStyle"
        @scroll="onCompatScroll"
      >
        <component
          :is="mergedCompatComponent.list"
          v-bind="props.listAttrs"
          :style="compatListStyle"
        >
          <slot name="before" />
          <component
            :is="mergedCompatComponent.content"
            v-for="(item, index) in compatCurrentList"
            :key="getCompatItemKey(item, compatStart + index)"
            v-bind="props.contentAttrs"
            :ref="
              (element) => setCompatItemRef(getCompatItemKey(item, compatStart + index), element)
            "
            :style="getCompatContentStyle(index)"
          >
            <slot
              name="item"
              :item="item"
              :index="compatStart + index"
              :active="true"
              :item-with-size="undefined"
            >
              <slot
                :item="item"
                :index="compatStart + index"
                :active="true"
                :item-with-size="undefined"
              />
            </slot>
          </component>
          <slot name="after" />
        </component>
      </component>
    </template>
    <component
      v-else
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
    onUpdated,
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
  import type {
    ScrollIntoViewOptions,
    ScrollOptions,
    VirtualItemKey,
    VirtualListRef,
  } from './interface';

  import { getPrefixCls } from '../../_utils/global-config';
  import { isObject, isString } from '../../_utils/is';
  import { useVirtualSize } from './use-virtual-size';

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
      threshold: {
        type: Number,
        default: 0,
      },
      fixedSize: {
        type: Boolean,
        default: false,
      },
      estimatedSize: {
        type: Number,
        default: undefined,
      },
      component: {
        type: [String, Object] as PropType<keyof HTMLElementTagNameMap | Record<string, unknown>>,
        default: undefined,
      },
      listAttrs: {
        type: Object as PropType<Record<string, unknown> | undefined>,
        default: undefined,
      },
      contentAttrs: {
        type: Object as PropType<Record<string, unknown> | undefined>,
        default: undefined,
      },
      listStyle: {
        type: Object as PropType<CSSProperties | undefined>,
        default: undefined,
      },
      paddingPosition: {
        type: String as PropType<'content' | 'list'>,
        default: 'content',
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
      const viewportRef = ref<HTMLElement>();
      const compatItemRefs = new Map<VirtualItemKey, HTMLElement>();
      const osInstanceRef = ref<OverlayScrollbarsInstance | null>(null);
      const overlayViewportReadyRef = ref(false);
      const resolvedItems = computed(() => props.items ?? []);
      const isCompatMode = computed(() => {
        return Boolean(
          props.component ||
          props.listAttrs ||
          props.contentAttrs ||
          props.listStyle ||
          props.paddingPosition !== 'content',
        );
      });

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

      const mergedCompatComponent = computed(() => {
        if (isObject(props.component)) {
          return {
            container: 'div',
            list: 'div',
            content: 'div',
            ...props.component,
          };
        }

        return {
          container: props.component ?? 'div',
          list: 'div',
          content: 'div',
        };
      });

      const compatFixedSize = computed(() => {
        return props.fixedSize || typeof props.itemSize === 'number';
      });

      const compatEstimatedSize = computed(() => {
        if (props.estimatedSize !== undefined) {
          return props.estimatedSize;
        }

        if (typeof props.itemSize === 'number') {
          return props.itemSize;
        }

        if (typeof props.minItemSize === 'number') {
          return props.minItemSize;
        }

        return undefined;
      });

      const compatViewportSize = ref(0);
      const compatResolvedItemSize = computed(() => compatEstimatedSize.value ?? 30);
      const compatBuffer = computed(() => props.buffer ?? 200);
      const compatOverscan = computed(() => {
        const baseItemSize = Math.max(compatResolvedItemSize.value, 1);
        return Math.max(Math.ceil(compatBuffer.value / baseItemSize), 0);
      });
      const compatVisibleCount = computed(() => {
        const baseItemSize = Math.max(compatResolvedItemSize.value, 1);

        if (compatViewportSize.value <= 0) {
          return 1;
        }

        return Math.max(Math.ceil(compatViewportSize.value / baseItemSize), 1);
      });

      const getCompatItemKey = (item: unknown, index: number) => {
        const keyField = props.keyField;

        if (typeof keyField === 'function') {
          return keyField(item, index) as VirtualItemKey;
        }

        if (item && typeof item === 'object' && isString(keyField)) {
          return ((item as Record<string, unknown>)[keyField] ?? index) as VirtualItemKey;
        }

        return index;
      };

      const compatDataKeys = computed(() => {
        return resolvedItems.value.map((item, index) => getCompatItemKey(item, index));
      });

      const {
        frontPadding: compatFrontPadding,
        behindPadding: compatBehindPadding,
        start: compatStartRef,
        end: compatEnd,
        getStartByScroll: getCompatStartByScroll,
        setItemSize: compatSetItemSize,
        setStart: setCompatStart,
        getScrollOffset: getCompatScrollOffset,
        getItemSize: getCompatItemSize,
      } = useVirtualSize({
        dataKeys: compatDataKeys,
        fixedSize: compatFixedSize,
        estimatedSize: compatEstimatedSize,
        overscan: compatOverscan,
        visibleCount: compatVisibleCount,
      });

      const compatCurrentList = computed(() => {
        if (!isCompatMode.value) {
          return [];
        }

        if (props.threshold && resolvedItems.value.length <= props.threshold) {
          return resolvedItems.value;
        }

        return resolvedItems.value.slice(compatStartRef.value, compatEnd.value);
      });

      const compatStart = computed(() => {
        if (props.threshold && resolvedItems.value.length <= props.threshold) {
          return 0;
        }

        return compatStartRef.value;
      });

      const compatViewportStyle = computed<CSSProperties>(() => {
        const style: CSSProperties = {
          minHeight: 0,
        };

        if (resolvedHeightValue.value !== undefined) {
          const shouldFillHeight =
            resolvedScrollbarProps.value && resolvedHeightValue.value !== 'auto';
          style.height = shouldFillHeight ? '100%' : resolvedHeightValue.value;
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

      const compatListPaddingStyle = computed<CSSProperties | undefined>(() => {
        if (props.paddingPosition !== 'list') {
          return undefined;
        }

        return {
          paddingTop: `${compatFrontPadding.value}px`,
          paddingBottom: `${compatBehindPadding.value}px`,
        };
      });

      const compatContentPaddingStyle = computed<CSSProperties | undefined>(() => {
        if (props.paddingPosition !== 'content') {
          return undefined;
        }

        return {
          paddingTop: `${compatFrontPadding.value}px`,
          paddingBottom: `${compatBehindPadding.value}px`,
        };
      });

      const compatListStyle = computed<CSSProperties | undefined>(() => {
        if (!props.listStyle && !compatListPaddingStyle.value) {
          return undefined;
        }

        return {
          ...props.listStyle,
          ...compatListPaddingStyle.value,
        };
      });

      const compatContentStyle = computed<CSSProperties | undefined>(() => {
        return compatContentPaddingStyle.value;
      });

      const updateCompatItemSize = (key: VirtualItemKey, element: HTMLElement) => {
        const height = element.getBoundingClientRect().height || element.offsetHeight;

        if (height) {
          compatSetItemSize(key, height);
        }
      };

      const updateCompatItemSizes = () => {
        compatItemRefs.forEach((element, key) => {
          updateCompatItemSize(key, element);
        });
      };

      const updateCompatViewportSize = () => {
        if (!isCompatMode.value) {
          compatViewportSize.value = 0;
          return;
        }

        const scrollerElement = getScrollerElement();
        const nextViewportSize =
          props.direction === 'horizontal'
            ? (scrollerElement?.clientWidth ?? 0)
            : (scrollerElement?.clientHeight ?? 0);

        if (nextViewportSize > 0) {
          compatViewportSize.value = nextViewportSize;
        }
      };

      const setCompatItemRef = (key: VirtualItemKey, value: unknown) => {
        const element = (value as { $el?: unknown } | null | undefined)?.$el ?? value;

        if (!(element instanceof HTMLElement)) {
          compatItemRefs.delete(key);
          return;
        }

        compatItemRefs.set(key, element);
        updateCompatItemSize(key, element);
      };

      const getCompatContentStyle = (index: number): CSSProperties | undefined => {
        if (props.paddingPosition !== 'content') {
          return compatContentStyle.value;
        }

        const style: CSSProperties = {
          ...compatContentStyle.value,
        };

        if (index === 0) {
          style.paddingTop = `${compatFrontPadding.value}px`;
        }
        if (index === compatCurrentList.value.length - 1) {
          style.paddingBottom = `${compatBehindPadding.value}px`;
        }

        return style;
      };

      const isDynamicScroller = computed(() => {
        return !isCompatMode.value && props.itemSize === undefined;
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
        if (isCompatMode.value) {
          return viewportRef.value ?? null;
        }

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
              if (!isCompatMode.value) {
                onScroll(event);
              }
            },
          },
        );

        overlayViewportReadyRef.value = true;
      };

      onMounted(async () => {
        await nextTick();
        updateCompatViewportSize();
        void initOverlayScrollbar(false);
      });

      onUpdated(() => {
        if (isCompatMode.value) {
          updateCompatItemSizes();
          updateCompatViewportSize();
        }
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

          if (isCompatMode.value) {
            updateCompatItemSizes();
            updateCompatViewportSize();
          }

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

      const onCompatScroll = (ev: Event) => {
        const target = ev.target as HTMLElement | undefined;
        if (target) {
          const nextStart = getCompatStartByScroll(target.scrollTop);
          if (nextStart !== compatStartRef.value) {
            setCompatStart(nextStart);
          }
        }

        onScroll(ev);
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
        if (isCompatMode.value) {
          scrollTo({
            index,
            align: options?.behavior === 'smooth' ? 'auto' : undefined,
          });
          return;
        }

        getScroller()?.scrollToItem(index, options);
      };

      const scrollToPosition = (position: number, options?: ScrollToOptions) => {
        if (isCompatMode.value) {
          const viewport = getScrollerElement();
          if (!viewport) {
            return;
          }

          if (options?.behavior === 'smooth') {
            viewport.scrollTo({ top: position, behavior: options.behavior });
          } else {
            viewport.scrollTop = position;
          }
          return;
        }

        getScroller()?.scrollToPosition(position, options);
      };

      const findItemIndex = (offset: number) => {
        if (isCompatMode.value) {
          return getCompatStartByScroll(offset);
        }

        return getScroller()?.findItemIndex(offset) ?? -1;
      };

      const getItemOffset = (index: number) => {
        if (isCompatMode.value) {
          return getCompatScrollOffset(index);
        }

        return getScroller()?.getItemOffset(index) ?? 0;
      };

      const getItemSize = (index: number) => {
        if (isCompatMode.value) {
          return getCompatItemSize(index);
        }

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
        if (isCompatMode.value) {
          const viewport = getScrollerElement();
          if (!viewport) {
            return;
          }

          scrollToPosition(viewport.scrollHeight);
          return;
        }

        const scroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
        scroller?.scrollToBottom();
      };

      const forceUpdate = (clear?: boolean) => {
        if (isCompatMode.value) {
          if (clear) {
            setCompatStart(0);
          }
          return;
        }

        const scroller = getScroller() as DynamicScrollerExposed<unknown> | undefined;
        scroller?.forceUpdate(clear);
      };

      const getDynamicItemSize = (item: unknown, index?: number) => {
        if (isCompatMode.value) {
          return typeof index === 'number' ? getCompatItemSize(index) : 0;
        }

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

        if (isCompatMode.value) {
          setCompatStart(index - compatOverscan.value);
          scrollToPosition(getCompatScrollOffset(index), {
            behavior: options.smooth ? 'smooth' : 'auto',
          });
          nextTick(() => {
            const scrollTop = getCompatScrollOffset(index);
            const viewport = getScrollerElement();
            if (viewport && scrollTop !== viewport.scrollTop) {
              viewport.scrollTop = scrollTop;
            }
          });
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
        props,
        hostClassNames,
        scrollbarHostRef,
        scrollerRef,
        viewportRef,
        isCompatMode,
        mergedCompatComponent,
        compatViewportStyle,
        compatListStyle,
        compatContentStyle,
        compatCurrentList,
        compatStart,
        getCompatItemKey,
        setCompatItemRef,
        getCompatContentStyle,
        onCompatScroll,
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
