<template>
  <div :class="cls" :style="outerStyle">
    <div ref="containerRef" :class="`${prefixCls}-container`" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import type {
    EventListenerArgs,
    EventListeners,
    OverlayScrollbars as OverlayScrollbarsInstance,
  } from 'overlayscrollbars';

  import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    PropType,
    ref,
    StyleValue,
    watch,
  } from 'vue';

  import { OverlayScrollbars } from 'overlayscrollbars';

  import type { ScrollbarEventListener, ScrollbarPlugin, ScrollbarProps } from './interface';

  import { getPrefixCls } from '../_utils/global-config';
  import { isObject } from '../_utils/is';

  export default defineComponent({
    name: 'Scrollbar',
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
      /**
       * @zh 是否使用绝对 padding。
       * @en Whether padding should be absolute.
       */
      paddingAbsolute: {
        type: Boolean as PropType<ScrollbarProps['paddingAbsolute']>,
        default: undefined,
      },
      /**
       * @zh 是否展示原生 overlay 滚动条。
       * @en Whether to show native overlaid scrollbars.
       */
      showNativeOverlaidScrollbars: {
        type: Boolean as PropType<ScrollbarProps['showNativeOverlaidScrollbars']>,
        default: undefined,
      },
      /**
       * @zh OverlayScrollbars 的 update 配置。
       * @en OverlayScrollbars update options.
       */
      updateOptions: {
        type: Object as PropType<ScrollbarProps['updateOptions']>,
      },
      /**
       * @zh OverlayScrollbars 的 overflow 配置。
       * @en OverlayScrollbars overflow options.
       */
      overflow: {
        type: Object as PropType<ScrollbarProps['overflow']>,
      },
      /**
       * @zh OverlayScrollbars 的 scrollbars 配置。
       * @en OverlayScrollbars scrollbar options.
       */
      scrollbars: {
        type: Object as PropType<ScrollbarProps['scrollbars']>,
      },
      /**
       * @zh 完整的 OverlayScrollbars options，会与组件级 props 合并。
       * @en Complete OverlayScrollbars options merged with component props.
       */
      overlayOptions: {
        type: Object as PropType<ScrollbarProps['overlayOptions']>,
      },
      /**
       * @zh 直接透传给 OverlayScrollbars 的事件监听。
       * @en Event listeners forwarded to OverlayScrollbars.
       */
      events: {
        type: Object as PropType<ScrollbarProps['events']>,
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
      scroll: (_ev: Event) => true,
    },
    setup(props, { emit }) {
      const prefixCls = getPrefixCls('scrollbar');
      const containerRef = ref<HTMLElement>();
      const osInstanceRef = ref<OverlayScrollbarsInstance | null>(null);
      const removeExternalListenersRef = ref<(() => void) | null>(null);

      const resolveOSInstance = () => {
        const osInstance = osInstanceRef.value;
        if (!osInstance || osInstance.state().destroyed) {
          return null;
        }
        return osInstance;
      };

      const getScrollOffsetElement = () => {
        const osInstance = resolveOSInstance();
        if (!osInstance) {
          return null;
        }
        return osInstance.elements().scrollOffsetElement ?? null;
      };

      const normalizeUpdateOptions = (update: ScrollbarProps['updateOptions']) => {
        if (!update?.debounce || !isObject(update.debounce) || Array.isArray(update.debounce)) {
          return update;
        }

        return {
          ...update,
          debounce: {
            mutation: update.debounce.mutation ?? 0,
            resize: update.debounce.resize ?? 0,
            event: update.debounce.event ?? 0,
            env: update.debounce.env ?? 0,
          },
        };
      };

      const mergedOptions = computed(() => {
        const optionProps = props.overlayOptions ?? {};
        const isTrackType = props.type === 'track';
        let visibility: 'hidden' | 'visible' | 'auto' = 'auto';
        if (props.hide) {
          visibility = 'hidden';
        } else if (isTrackType) {
          visibility = 'visible';
        }
        const autoHide = props.hide || isTrackType ? 'never' : 'leave';

        const mergedOverflow = {
          x: 'scroll',
          y: 'scroll',
          ...optionProps.overflow,
          ...props.overflow,
        };

        if (props.disableHorizontal) {
          mergedOverflow.x = 'hidden';
        }
        if (props.disableVertical) {
          mergedOverflow.y = 'hidden';
        }

        return {
          ...optionProps,
          paddingAbsolute: props.paddingAbsolute ?? optionProps.paddingAbsolute,
          showNativeOverlaidScrollbars:
            props.showNativeOverlaidScrollbars ?? optionProps.showNativeOverlaidScrollbars,
          update: normalizeUpdateOptions(props.updateOptions ?? optionProps.update),
          overflow: mergedOverflow,
          scrollbars: {
            theme: props.type === 'track' ? `${prefixCls}-theme-track` : `${prefixCls}-theme-embed`,
            visibility,
            autoHide,
            autoHideSuspend: true,
            clickScroll: 'instant',
            ...optionProps.scrollbars,
            ...props.scrollbars,
          },
        };
      });

      const bindExternalListeners = (eventListeners?: EventListeners) => {
        removeExternalListenersRef.value?.();
        removeExternalListenersRef.value = null;

        const osInstance = resolveOSInstance();
        if (!osInstance || !eventListeners) {
          return;
        }

        removeExternalListenersRef.value = osInstance.on(eventListeners);
      };

      const outerStyle = computed(() => props.outerStyle);

      const cls = computed(() => [
        `${prefixCls}`,
        `${prefixCls}-type-${props.type}`,
        props.outerClass,
      ]);

      const initScrollbar = () => {
        if (!containerRef.value) {
          return;
        }

        osInstanceRef.value = OverlayScrollbars(
          containerRef.value,
          mergedOptions.value as Parameters<typeof OverlayScrollbars>[1],
          {
            scroll: (_instance, event) => {
              emit('scroll', event);
            },
          },
        );

        bindExternalListeners(props.events);
      };

      onMounted(() => {
        initScrollbar();
      });

      watch(
        mergedOptions,
        (options) => {
          const osInstance = resolveOSInstance();
          if (!osInstance) {
            return;
          }
          osInstance.options(options as Parameters<typeof osInstance.options>[0]);
        },
        { deep: true },
      );

      watch(
        () => props.events,
        (eventListeners) => {
          bindExternalListeners(eventListeners);
        },
        { deep: true },
      );

      onBeforeUnmount(() => {
        removeExternalListenersRef.value?.();
        removeExternalListenersRef.value = null;
        osInstanceRef.value?.destroy();
        osInstanceRef.value = null;
      });

      return {
        prefixCls,
        cls,
        outerStyle,
        containerRef,
        mergedOptions,
        resolveOSInstance,
        getScrollOffsetElement,
      };
    },
    methods: {
      /**
       * @zh 获取底层 OverlayScrollbars 实例。
       * @en Get underlying OverlayScrollbars instance.
       */
      getOSInstance() {
        return this.resolveOSInstance();
      },
      /**
       * @zh 获取或更新底层 options。
       * @en Get or set OverlayScrollbars options.
       */
      options(newOptions?: ScrollbarProps['overlayOptions'], pure?: boolean) {
        const osInstance = this.getOSInstance();
        if (!osInstance) {
          return undefined;
        }

        if (typeof newOptions === 'undefined') {
          return osInstance.options();
        }

        return osInstance.options(newOptions as Parameters<typeof osInstance.options>[0], pure);
      },
      /**
       * @zh 绑定底层 OverlayScrollbars 事件。
       * @en Bind OverlayScrollbars listeners.
       */
      on(
        nameOrListeners: keyof EventListenerArgs | EventListeners,
        listenerOrPure?:
          | ScrollbarEventListener<keyof EventListenerArgs>
          | ScrollbarEventListener<keyof EventListenerArgs>[]
          | boolean,
      ) {
        const osInstance = this.getOSInstance();
        if (!osInstance) {
          return undefined;
        }

        if (isObject(nameOrListeners)) {
          return osInstance.on(
            nameOrListeners as EventListeners,
            listenerOrPure as boolean | undefined,
          );
        }

        if (Array.isArray(listenerOrPure)) {
          return osInstance.on(nameOrListeners, listenerOrPure);
        }

        return osInstance.on(
          nameOrListeners,
          listenerOrPure as ScrollbarEventListener<keyof EventListenerArgs>,
        );
      },
      /**
       * @zh 解绑底层 OverlayScrollbars 事件。
       * @en Remove OverlayScrollbars listeners.
       */
      off(
        name: keyof EventListenerArgs,
        listener:
          | ScrollbarEventListener<keyof EventListenerArgs>
          | ScrollbarEventListener<keyof EventListenerArgs>[],
      ) {
        const osInstance = this.getOSInstance();
        if (!osInstance) {
          return;
        }

        if (Array.isArray(listener)) {
          osInstance.off(name, listener);
          return;
        }

        osInstance.off(name, listener);
      },
      /**
       * @zh 强制更新底层实例。
       * @en Force instance update.
       */
      update(force?: boolean) {
        return this.getOSInstance()?.update(force) ?? false;
      },
      /**
       * @zh 设置底层实例休眠状态。
       * @en Toggle sleeping state.
       */
      sleep(sleeping: boolean) {
        this.getOSInstance()?.sleep(sleeping);
      },
      /**
       * @zh 获取底层状态。
       * @en Get underlying state.
       */
      state() {
        return this.getOSInstance()?.state();
      },
      /**
       * @zh 获取底层生成的元素引用。
       * @en Get generated elements.
       */
      elements() {
        return this.getOSInstance()?.elements();
      },
      /**
       * @zh 获取底层插件实例。
       * @en Get plugin instance.
       */
      plugin(osPlugin: ScrollbarPlugin) {
        return this.getOSInstance()?.plugin(osPlugin);
      },
      /**
       * @zh 销毁底层实例。
       * @en Destroy underlying instance.
       */
      destroy() {
        const osInstance = this.getOSInstance();
        if (!osInstance) {
          return;
        }

        osInstance.destroy();
      },
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
        y?: number,
      ) {
        const scrollOffsetElement = this.getScrollOffsetElement();
        if (!scrollOffsetElement || !('scrollTop' in scrollOffsetElement)) {
          return;
        }

        const canUseNativeScrollTo = typeof scrollOffsetElement.scrollTo === 'function';

        if (isObject(options)) {
          if (canUseNativeScrollTo) {
            scrollOffsetElement.scrollTo(options);
            return;
          }

          if (typeof options.top === 'number') {
            scrollOffsetElement.scrollTop = options.top;
          }
          if (typeof options.left === 'number') {
            scrollOffsetElement.scrollLeft = options.left;
          }

          return;
        }

        if (typeof options !== 'number' && typeof y !== 'number') {
          return;
        }

        if (canUseNativeScrollTo) {
          scrollOffsetElement.scrollTo(
            typeof options === 'number' ? options : scrollOffsetElement.scrollLeft,
            typeof y === 'number' ? y : scrollOffsetElement.scrollTop,
          );
          return;
        }

        if (typeof options === 'number') {
          scrollOffsetElement.scrollLeft = options;
        }
        if (typeof y === 'number') {
          scrollOffsetElement.scrollTop = y;
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
        const scrollOffsetElement = this.getScrollOffsetElement();
        if (!scrollOffsetElement || !('scrollTop' in scrollOffsetElement)) {
          return;
        }

        if (typeof scrollOffsetElement.scrollTo === 'function') {
          scrollOffsetElement.scrollTo({
            top,
          });
        } else {
          scrollOffsetElement.scrollTop = top;
        }
      },
      /**
       * @zh 横向滚动
       * @en scroll horizontal
       * @public
       * @param {number} left
       * @version 2.40.0
       */
      scrollLeft(left: number) {
        const scrollOffsetElement = this.getScrollOffsetElement();
        if (!scrollOffsetElement || !('scrollLeft' in scrollOffsetElement)) {
          return;
        }

        if (typeof scrollOffsetElement.scrollTo === 'function') {
          scrollOffsetElement.scrollTo({
            left,
          });
        } else {
          scrollOffsetElement.scrollLeft = left;
        }
      },
    },
  });
</script>
