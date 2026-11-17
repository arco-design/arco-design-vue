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
      <slot name="list-prefix" />
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
        <VirtualListItem
          v-for="(item, index) of currentList"
          :key="getItemKey(item, start + index)"
          :has-item-size="hasItemSize"
          :set-item-size="setItemSize"
        >
          <slot name="item" :item="item" :index="start + index" />
        </VirtualListItem>
      </Component>
    </Component>
  </Component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  toRefs,
  PropType,
} from 'vue';
import { useSize } from './hooks/use-size';
import VirtualListItem from './virtual-list-item';
import { getPrefixCls } from '../../_utils/global-config';
import { ScrollOptions, VirtualItemKey, VirtualListProps } from './interface';
import { isFunction, isNumber, isObject, isString } from '../../_utils/is';

export default defineComponent({
  name: 'VirtualList',
  components: { VirtualListItem },
  props: {
    height: {
      type: [Number, String],
      default: 200,
    },
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    threshold: {
      type: Number,
      default: 0,
    },
    itemKey: {
      // 接口里声明了 string | ((item) => key)，这里同步支持函数形式
      type: [String, Function] as PropType<VirtualListProps['itemKey']>,
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
      type: Object,
    },
    contentAttrs: {
      type: Object,
    },
    paddingPosition: {
      type: String,
      default: 'content',
    },
  },
  emits: {
    scroll: (ev: Event) => true,
    reachBottom: (ev: Event) => true,
  },
  setup(props, { emit }) {
    const { data, itemKey, fixedSize, estimatedSize, buffer, height } =
      toRefs(props);
    const prefixCls = getPrefixCls('virtual-list');

    const getItemKey = (
      item: Record<string, any>,
      fallbackIndex: number
    ): VirtualItemKey => {
      const _itemKey = itemKey.value;
      if (isFunction(_itemKey)) {
        return _itemKey(item);
      }
      if (isString(_itemKey)) {
        return (item[_itemKey] ?? fallbackIndex) as VirtualItemKey;
      }
      return fallbackIndex;
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

    const style = computed(() => {
      return {
        height: isNumber(height.value) ? `${height.value}px` : height.value,
        overflow: 'auto',
      };
    });

    const dataKeys = computed(() =>
      data.value.map((item: any, index) => getItemKey(item, index))
    );

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
    } = useSize({
      dataKeys,
      contentRef,
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

    const onScroll = (ev: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } =
        ev.target as HTMLElement;
      const _start = getStartByScroll(scrollTop);
      if (_start !== start.value) {
        setStart(_start);
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

    const scrollTo = (options: ScrollOptions) => {
      if (containerRef.value) {
        if (isNumber(options)) {
          containerRef.value.scrollTop = options;
        } else {
          const { align = 'top' } = options;
          const _index =
            options.index ?? dataKeys.value.indexOf(options.key ?? '');
          setStart(_index - buffer.value);
          containerRef.value.scrollTop = getScrollOffset(_index);
          nextTick(() => {
            if (containerRef.value) {
              const _scrollTop = getScrollOffset(_index);
              if (_scrollTop !== containerRef.value.scrollTop) {
                containerRef.value.scrollTop = _scrollTop;
              }
            }
          });
        }
      }
    };

    return {
      prefixCls,
      containerRef,
      contentRef,
      frontPadding,
      currentList,
      behindPadding,
      onScroll,
      setItemSize,
      hasItemSize,
      getItemKey,
      start,
      scrollTo,
      style,
      mergedComponent,
    };
  },
});
</script>
