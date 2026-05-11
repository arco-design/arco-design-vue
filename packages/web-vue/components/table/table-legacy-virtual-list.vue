<template>
  <Component
    :is="mergedComponent.container"
    ref="containerRef"
    :class="prefixCls"
    :style="style"
    @scroll="onScroll"
  >
    <Component
      :is="mergedComponent.list"
      v-bind="listAttrs"
      :style="
        paddingPosition === 'list'
          ? {
              paddingTop: `${frontPadding}px`,
              paddingBottom: `${behindPadding}px`,
            }
          : {}
      "
    >
      <Component
        :is="mergedComponent.content"
        ref="contentRef"
        v-bind="contentAttrs"
        :style="
          paddingPosition === 'content'
            ? {
                paddingTop: `${frontPadding}px`,
                paddingBottom: `${behindPadding}px`,
              }
            : {}
        "
      >
        <TableVirtualListItem
          v-for="(item, index) of currentList"
          :key="getItemKey(item, start + index)"
          :has-item-size="hasItemSize"
          :set-item-size="setItemSize"
        >
          <slot name="item" :item="item" :index="start + index" />
        </TableVirtualListItem>
      </Component>
    </Component>
  </Component>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, toRefs, type PropType } from 'vue';

  import type { ScrollOptions, VirtualItemKey } from '../_components/virtual-list/interface';

  import { getPrefixCls } from '../_utils/global-config';
  import { isNumber, isObject } from '../_utils/is';
  import { useTableVirtualSize } from './hooks/use-table-virtual-size';
  import TableVirtualListItem from './table-virtual-list-item';

  export default defineComponent({
    name: 'TableLegacyVirtualList',
    components: {
      TableVirtualListItem,
    },
    props: {
      height: {
        type: [Number, String],
        default: 200,
      },
      data: {
        type: Array as PropType<unknown[]>,
        default: () => [],
      },
      threshold: {
        type: Number,
        default: 0,
      },
      itemKey: {
        type: [String, Function] as PropType<
          string | ((item: unknown, index: number) => VirtualItemKey)
        >,
        default: 'key',
      },
      fixedSize: {
        type: Boolean,
        default: false,
      },
      estimatedSize: {
        type: Number,
        default: 30,
      },
      buffer: {
        type: Number,
        default: 10,
      },
      component: {
        type: [String, Object],
        default: 'div',
      },
      listAttrs: {
        type: Object as PropType<Record<string, unknown> | undefined>,
        default: undefined,
      },
      contentAttrs: {
        type: Object as PropType<Record<string, unknown> | undefined>,
        default: undefined,
      },
      paddingPosition: {
        type: String as PropType<'content' | 'list'>,
        default: 'content',
      },
    },
    emits: {
      scroll: (_ev: Event) => true,
      reachBottom: (_ev: Event) => true,
    },
    setup(props, { emit, expose }) {
      const { data, itemKey, fixedSize, estimatedSize, buffer, height } = toRefs(props);
      const prefixCls = getPrefixCls('virtual-list');

      const getItemKey = (item: unknown, index: number) => {
        if (typeof itemKey.value === 'function') {
          return itemKey.value(item, index);
        }

        if (item && typeof item === 'object') {
          return ((item as Record<string, unknown>)[itemKey.value] ?? index) as VirtualItemKey;
        }

        return index;
      };

      const mergedComponent = computed(() => {
        if (isObject(props.component)) {
          return {
            container: 'div',
            list: 'div',
            content: 'div',
            ...props.component,
          };
        }

        return {
          container: props.component,
          list: 'div',
          content: 'div',
        };
      });

      const containerRef = ref<HTMLElement>();
      const contentRef = ref<HTMLElement>();

      const style = computed(() => ({
        height: isNumber(height.value) ? `${height.value}px` : height.value,
        overflow: 'auto',
      }));

      const dataKeys = computed(() => data.value.map((item, index) => getItemKey(item, index)));

      const {
        frontPadding,
        behindPadding,
        start,
        end,
        getStartByScroll,
        setItemSize,
        hasItemSize,
        setStart,
        getScrollOffset,
      } = useTableVirtualSize({
        dataKeys,
        fixedSize,
        estimatedSize,
        buffer,
      });

      const currentList = computed(() => {
        if (props.threshold && data.value.length <= props.threshold) {
          return data.value;
        }

        return data.value.slice(start.value, end.value);
      });

      const scrollTo = (options: ScrollOptions) => {
        if (!containerRef.value) {
          return;
        }

        if (isNumber(options)) {
          containerRef.value.scrollTop = options;
          return;
        }

        const index = options.index ?? dataKeys.value.indexOf(options.key ?? '');
        setStart(index - buffer.value);
        containerRef.value.scrollTop = getScrollOffset(index);

        nextTick(() => {
          if (!containerRef.value) {
            return;
          }

          const scrollTop = getScrollOffset(index);
          if (scrollTop !== containerRef.value.scrollTop) {
            containerRef.value.scrollTop = scrollTop;
          }
        });
      };

      const onScroll = (ev: Event) => {
        const { scrollTop, scrollHeight, offsetHeight } = ev.target as HTMLElement;
        const nextStart = getStartByScroll(scrollTop);
        if (nextStart !== start.value) {
          setStart(nextStart);
          nextTick(() => {
            scrollTo(scrollTop);
          });
        }

        emit('scroll', ev);
        const bottom = Math.floor(scrollHeight - (scrollTop + offsetHeight));
        if (bottom <= 0) {
          emit('reachBottom', ev);
        }
      };

      expose({
        scrollTo,
      });

      return {
        prefixCls,
        containerRef,
        contentRef,
        frontPadding,
        currentList,
        behindPadding,
        getItemKey,
        onScroll,
        setItemSize,
        hasItemSize,
        start,
        style,
        mergedComponent,
      };
    },
  });
</script>
