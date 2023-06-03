import {
  computed,
  defineComponent,
  inject,
  isVNode,
  onMounted,
  PropType,
  ref,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { configProviderInjectionKey } from '../config-provider/context';
import Spin from '../spin';
import Grid from '../grid';
import Pagination, { PaginationProps } from '../pagination';
import Empty from '../empty';
import VirtualList from '../_components/virtual-list-v2';
import type {
  ScrollIntoViewOptions,
  VirtualListProps,
} from '../_components/virtual-list-v2/interface';
import { usePagination } from './use-pagination';
import { omit } from '../_utils/omit';
import { getAllElements } from '../_utils/vue-utils';
import Scrollbar, { ScrollbarProps } from '../scrollbar';
import { useComponentRef } from '../_hooks/use-component-ref';
import { useScrollbar } from '../_hooks/use-scrollbar';

export default defineComponent({
  name: 'List',
  props: {
    /**
     * @zh 列表数据，需要和 `item` 插槽同时使用
     * @en List data, need to be used with `item` slot at the same time
     */
    data: {
      type: Array as PropType<any[]>,
    },
    /**
     * @zh 列表大小
     * @en List size
     */
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否显示分割线
     * @en Whether to show the dividing line
     */
    split: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示选中样式
     * @en Whether to display the selected style
     */
    hoverable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 列表分页配置
     * @en List pagination configuration
     */
    paginationProps: {
      type: Object as PropType<PaginationProps>,
    },
    /**
     * @zh 列表栅格配置
     * @en List grid configuration
     */
    gridProps: {
      type: Object,
    },
    /**
     * @zh 列表的最大高度
     * @en Maximum height of the list
     */
    maxHeight: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 触发到达底部的距离阈值
     * @en Trigger the distance threshold to reach the bottom
     */
    bottomOffset: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
     * @en Pass virtual list properties, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    /**
     * @zh 是否开启虚拟滚动条
     * @en Whether to enable virtual scroll bar
     * @version 2.38.0
     */
    scrollbar: {
      type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
  },
  emits: {
    /**
     * @zh 列表滚动时触发
     * @en Triggered when the list scrolls
     */
    scroll: () => true,
    /**
     * @zh 当列表到达底部时触发
     * @en Triggered when the list reaches the bottom
     */
    reachBottom: () => true,
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    pageChange: (page: number) => true,
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    pageSizeChange: (pageSize: number) => true,
  },
  /**
   * @zh 头部信息
   * @en Header
   * @slot header
   */
  /**
   * @zh 底部信息
   * @en Footer
   * @slot footer
   */
  /**
   * @zh 空白展示
   * @en Empty
   * @slot empty
   */
  /**
   * @zh 列表项
   * @en List Item
   * @slot item
   * @binding {number} index
   * @binding {any} item
   */
  /**
   * @zh 滚动加载状态时，滚动到底部的提示
   * @en When scrolling loading state, scroll to the bottom tip
   * @slot scroll-loading
   * @version 2.20.0
   */
  setup(props, { emit, slots }) {
    const { scrollbar } = toRefs(props);
    const prefixCls = getPrefixCls('list');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const { componentRef, elementRef: listRef } =
      useComponentRef('containerRef');
    const isVirtualList = computed(() => props.virtualListProps);
    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar);
    let preScrollTop = 0;

    const handleScroll = (e: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target as HTMLElement;
      const bottom = Math.floor(scrollHeight - (scrollTop + offsetHeight));
      if (scrollTop > preScrollTop && bottom <= props.bottomOffset) {
        emit('reachBottom');
      }
      emit('scroll');
      preScrollTop = scrollTop;
    };

    onMounted(() => {
      if (listRef.value) {
        const { scrollTop, scrollHeight, offsetHeight } = listRef.value;
        if (scrollHeight <= scrollTop + offsetHeight) {
          emit('reachBottom');
        }
      }
    });

    const { current, pageSize, handlePageChange, handlePageSizeChange } =
      usePagination(props, { emit });

    const getCurrentPageItems = (data: unknown[]) => {
      if (!props.paginationProps) {
        return data;
      }
      if (props.paginationProps && data.length > pageSize.value) {
        const startIndex = (current.value - 1) * pageSize.value;
        return data.slice(startIndex, startIndex + pageSize.value);
      }
      return data;
    };

    const renderGridItems = (data: unknown[]) => {
      if (!props.gridProps) {
        return null;
      }
      const currentPageItems = getCurrentPageItems(data);

      if (props.gridProps.span) {
        const items = [];
        const rowSize = 24 / props.gridProps.span;
        for (let i = 0; i < currentPageItems.length; i += rowSize) {
          const nextIndex = i + rowSize;
          const rowIndex = Math.floor(i / rowSize);
          items.push(
            <Grid.Row
              key={rowIndex}
              class={`${prefixCls}-row`}
              gutter={props.gridProps.gutter}
            >
              {currentPageItems.slice(i, nextIndex).map((item, index) => (
                <Grid.Col
                  key={`${rowIndex}-${index}`}
                  class={`${prefixCls}-col`}
                  span={props.gridProps?.span}
                >
                  {isVNode(item) ? item : slots.item?.({ item, index })}
                </Grid.Col>
              ))}
            </Grid.Row>
          );
        }
        return items;
      }

      return (
        <Grid.Row class={`${prefixCls}-row`} gutter={props.gridProps.gutter}>
          {currentPageItems.map((item, index) => (
            <Grid.Col
              key={index}
              class={`${prefixCls}-col`}
              {...omit(props.gridProps!, ['gutter'])}
            >
              {isVNode(item) ? item : slots.item?.({ item, index })}
            </Grid.Col>
          ))}
        </Grid.Row>
      );
    };

    const renderListItems = (data: unknown[]) => {
      const currentPageItems = getCurrentPageItems(data);

      return currentPageItems.map((item, index) =>
        isVNode(item) ? item : slots.item?.({ item, index })
      );
    };

    const renderItems = () => {
      const data = slots.default ? getAllElements(slots.default()) : props.data;

      if (data && data.length > 0) {
        return props.gridProps ? renderGridItems(data) : renderListItems(data);
      }

      return renderEmpty();
    };

    const renderPagination = () => {
      if (!props.paginationProps) {
        return null;
      }

      const paginationProps = omit(props.paginationProps, [
        'current',
        'pageSize',
        'defaultCurrent',
        'defaultPageSize',
      ]);

      return (
        <Pagination
          class={`${prefixCls}-pagination`}
          {...paginationProps}
          current={current.value}
          pageSize={pageSize.value}
          onChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      );
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.size}`,
      {
        [`${prefixCls}-bordered`]: props.bordered,
        [`${prefixCls}-split`]: props.split,
        [`${prefixCls}-hover`]: props.hoverable,
      },
    ]);

    const contentStyle = computed(() => {
      if (props.maxHeight > 0) {
        return { maxHeight: `${props.maxHeight}px`, overflowY: 'auto' };
      }
      return undefined;
    });

    const contentCls = computed(() => [
      `${prefixCls}-content`,
      {
        [`${prefixCls}-virtual`]: isVirtualList.value,
      },
    ]);

    const virtualListRef = ref();
    const renderVirtualList = () => {
      const currentPageItems = getCurrentPageItems(props.data ?? []);

      return currentPageItems.length ? (
        <VirtualList
          ref={virtualListRef}
          v-slots={{
            item: ({ item, index }: { item: unknown; index: number }) =>
              slots.item?.({ item, index }),
          }}
          class={contentCls.value}
          data={currentPageItems}
          {...props.virtualListProps}
          onScroll={handleScroll}
        />
      ) : (
        renderEmpty()
      );
    };

    const renderScrollLoading = () => {
      if (slots['scroll-loading']) {
        return (
          <div class={[`${prefixCls}-item`, `${prefixCls}-scroll-loading`]}>
            {slots['scroll-loading']()}
          </div>
        );
      }
      return null;
    };

    const renderEmpty = () => {
      if (slots['scroll-loading']) {
        return null;
      }

      return (
        slots.empty?.() ??
        configCtx?.slots.empty?.({ component: 'list' }) ?? <Empty />
      );
    };

    const render = () => {
      const Component = displayScrollbar.value ? Scrollbar : 'div';

      return (
        <div class={`${prefixCls}-wrapper`}>
          <Spin class={`${prefixCls}-spin`} loading={props.loading}>
            <Component
              ref={componentRef}
              class={cls.value}
              style={contentStyle.value}
              {...scrollbarProps.value}
              onScroll={handleScroll}
            >
              <div class={`${prefixCls}-content-wrapper`}>
                {slots.header && (
                  <div class={`${prefixCls}-header`}>{slots.header()}</div>
                )}
                {isVirtualList.value && !props.gridProps ? (
                  <>
                    {renderVirtualList()}
                    {renderScrollLoading()}
                  </>
                ) : (
                  <div role="list" class={contentCls.value}>
                    {renderItems()}
                    {renderScrollLoading()}
                  </div>
                )}
                {slots.footer && (
                  <div class={`${prefixCls}-footer`}>{slots.footer()}</div>
                )}
              </div>
            </Component>
            {renderPagination()}
          </Spin>
        </div>
      );
    };

    return {
      virtualListRef,
      render,
    };
  },
  methods: {
    /**
     * @zh 虚拟滚动到某个元素
     * @en Virtual scroll to an element
     * @param {{ index?: number; key?: number | string; align: 'auto' | 'top' | 'bottom'}} options
     * @public
     */
    scrollIntoView(options: ScrollIntoViewOptions) {
      if (this.virtualListRef) {
        this.virtualListRef.scrollTo(options);
      }
    },
  },
  render() {
    return this.render();
  },
});
