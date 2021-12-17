import { computed, defineComponent, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Spin from '../spin';
import Grid from '../grid';
import Pagination, { PaginationProps } from '../pagination';
import Empty from '../empty';
import VirtualList from '../_components/virtual-list/virtual-list.vue';
import { ScrollIntoViewOptions } from '../_components/virtual-list/interface';
import { usePagination } from '../_hooks/use-pagination';
import { omit } from '../_utils/omit';

const LIST_SIZES = ['small', 'medium', 'large'] as const;
type ListSize = typeof LIST_SIZES[number];

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
     * @values 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<ListSize>,
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
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)
     * @en Pass virtual list properties, pass in this parameter to turn on virtual scrolling [VirtualListProps](#virtuallistprops)
     * @type VirtualListProps
     */
    virtualListProps: {
      type: Object,
    },
  },
  emits: [
    /**
     * @zh 列表滚动时触发
     * @en Triggered when the list scrolls
     */
    'scroll',
    /**
     * @zh 当列表到达底部时触发
     * @en Triggered when the list reaches the bottom
     */
    'reachBottom',
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    'pageChange',
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    'pageSizeChange',
  ],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('list');
    const hasChildren = computed(() => Boolean(slots.default));

    const isVirtualList = computed(() => props.virtualListProps);

    const handleScroll = (e: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target as HTMLElement;
      const bottom = scrollHeight - (scrollTop + offsetHeight);
      if (bottom <= props.bottomOffset) {
        emit('reachBottom');
      }
      emit('scroll');
    };

    const { current, pageSize, handlePageChange, handlePageSizeChange } =
      usePagination(props, { emit });

    const getCurrentPageItems = (data: unknown[]) => {
      if (!props.paginationProps) {
        return data;
      }

      const startIndex = (current.value - 1) * pageSize.value;
      return data.slice(startIndex, startIndex + pageSize.value);
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
                  {hasChildren.value ? item : slots.item?.({ item, index })}
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
            <Grid.Col key={index} class={`${prefixCls}-col`}>
              {hasChildren.value ? item : slots.item?.({ item, index })}
            </Grid.Col>
          ))}
        </Grid.Row>
      );
    };

    const getListItemRenderMsg = (data: unknown[]) => {
      const currentPageItems = getCurrentPageItems(data);
      const currentPageItemRenderFunc = (item: unknown, index: number) =>
        hasChildren.value
          ? currentPageItems[index]
          : slots.item?.({ item, index });

      return {
        currentPageItems,
        currentPageItemRenderFunc,
      };
    };

    const renderListItems = (data: unknown[]) => {
      const { currentPageItems, currentPageItemRenderFunc } =
        getListItemRenderMsg(data);

      return currentPageItems.map(currentPageItemRenderFunc);
    };

    const renderItems = () => {
      const data = slots.default?.() ?? props.data;
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
          {...paginationProps}
          class={`${prefixCls}-pagination`}
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
        return { maxHeight: `${props.maxHeight}px` };
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
      const { currentPageItems, currentPageItemRenderFunc } =
        getListItemRenderMsg(props.data || []);
      return currentPageItems.length ? (
        <VirtualList
          ref={virtualListRef}
          {...props.virtualListProps}
          class={contentCls.value}
          data={currentPageItems}
          v-slots={{
            item: ({ item, index }: { item: unknown; index: number }) =>
              currentPageItemRenderFunc(item, index),
          }}
          onScroll={handleScroll}
        />
      ) : (
        renderEmpty()
      );
    };

    const renderEmpty = () => {
      return <Empty />;
    };

    const renderList = () => {
      return (
        <div class={`${prefixCls}-wrapper`}>
          <div
            class={cls.value}
            style={contentStyle.value}
            onScroll={handleScroll}
          >
            {slots.header && (
              <div class={`${prefixCls}-header`}>{slots.header()}</div>
            )}
            {isVirtualList.value && !props.gridProps ? (
              renderVirtualList()
            ) : (
              <div class={contentCls.value}>{renderItems()}</div>
            )}
            {slots.footer && (
              <div class={`${prefixCls}-footer`}>{slots.footer()}</div>
            )}
          </div>
          {renderPagination()}
        </div>
      );
    };

    return {
      virtualListRef,
      renderList,
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
    const { loading, renderList } = this;
    if (loading) {
      return (
        <Spin style={{ display: 'block' }} loading>
          {renderList()}
        </Spin>
      );
    }
    return renderList();
  },
});
