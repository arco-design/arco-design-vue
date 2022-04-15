import type { PropType, VNode, CSSProperties } from 'vue';
import {
  computed,
  defineComponent,
  isVNode,
  provide,
  reactive,
  toRefs,
} from 'vue';
import type { Size, TextAlign } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isFunction, isObject } from '../_utils/is';
import { descriptionsInjectionKey } from './context';
import { DescData, DescItemData, RenderData } from './interface';
import { getAllElements, isSlotsChildren } from '../_utils/vue-utils';
import { useResponsiveState } from '../grid/hook/use-responsive-state';
import { ResponsiveValue } from '../grid';

const getTotalSpan = (renderData?: RenderData[]) => {
  return renderData
    ? renderData.reduce((total, data) => total + data.span, 0)
    : 0;
};

export default defineComponent({
  name: 'Descriptions',
  props: {
    /**
     * @zh 描述列表的数据
     * @en Data for descriptions
     */
    data: {
      type: Array as PropType<DescData[]>,
      default: () => [],
    },
    /**
     * @zh 每行放置的数据个数。2.20.0 版本支持响应式配置，配置可参考 Grid
     * @en The number of data placed in each row. Version 2.20.0 supports reactive configuration, the configuration can refer to Grid
     */
    column: {
      type: [Number, Object] as PropType<number | ResponsiveValue>,
      default: 3,
    },
    /**
     * @zh 描述列表的标题
     * @en Title of descriptions
     */
    title: String,
    /**
     * @zh 描述列表的排列方式
     * @en Arrangement of descriptions
     */
    layout: {
      type: String as PropType<
        'horizontal' | 'vertical' | 'inline-horizontal' | 'inline-vertical'
      >,
      default: 'horizontal',
    },
    /**
     *  @zh 文字的对齐位置
     *  @en Alignment position of text
     */
    align: {
      type: [String, Object] as PropType<
        TextAlign | { label?: TextAlign; value?: TextAlign }
      >,
      default: 'left',
    },
    /**
     * @zh 描述列表的大小
     * @en The size of the descriptions
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     */
    bordered: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 数据标签的样式
     * @en Data label style
     */
    labelStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 数据内容的样式
     * @en Data content style
     */
    valueStyle: {
      type: Object as PropType<CSSProperties>,
    },
  },
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 数据标签
   * @en Data label
   * @slot label
   * @binding {string} label
   * @binding {number} index
   * @binding {DescData} data
   */
  /**
   * @zh 数据内容
   * @en Data value
   * @slot value
   * @binding {string} value
   * @binding {number} index
   * @binding {DescData} data
   */
  setup(props, { slots }) {
    const { column } = toRefs(props);
    const prefixCls = getPrefixCls('descriptions');

    const computedColumn = useResponsiveState(column, 3, true);

    const labelAlign = computed(
      () => (isObject(props.align) ? props.align.label : props.align) ?? 'left'
    );
    const valueAlign = computed(
      () => (isObject(props.align) ? props.align.value : props.align) ?? 'left'
    );

    const labelStyle = computed<CSSProperties>(() => ({
      textAlign: labelAlign.value,
      ...props.labelStyle,
    }));

    const valueStyle = computed<CSSProperties>(() => ({
      textAlign: valueAlign.value,
      ...props.valueStyle,
    }));

    const descItemMap = reactive(new Map<number, DescItemData>());
    const sortedSpans = computed(() =>
      Array.from(descItemMap.values())
        .sort((a, b) => a.index - b.index)
        .map((data) => data.span)
    );

    const addItem = (id: number, data: DescItemData) => {
      descItemMap.set(id, data);
    };

    const removeItem = (id: number) => {
      descItemMap.delete(id);
    };

    provide(
      descriptionsInjectionKey,
      reactive({
        addItem,
        removeItem,
      })
    );

    const getGroupedData = (data: (DescData | VNode)[]) => {
      const groupedData: RenderData[][] = [];
      data.forEach((item, index) => {
        const itemSpan = Math.min(
          (isVNode(item) ? sortedSpans.value[index] : item.span) ?? 1,
          computedColumn.value
        );
        const lastData = groupedData[groupedData.length - 1];
        const lastDataTotalSpan = getTotalSpan(lastData);
        if (
          lastDataTotalSpan === 0 ||
          lastDataTotalSpan >= computedColumn.value
        ) {
          // add item to new row
          groupedData.push([
            {
              data: item,
              span: itemSpan,
            },
          ]);
        } else {
          // add item to current row
          lastData.push({
            data: item,
            span:
              itemSpan + lastDataTotalSpan > computedColumn.value
                ? computedColumn.value - lastDataTotalSpan
                : itemSpan,
          });
        }
      });
      if (groupedData.length) {
        const lastData = groupedData[groupedData.length - 1];
        const lastDataTotalSpan = getTotalSpan(lastData);
        if (lastDataTotalSpan < computedColumn.value) {
          lastData[lastData.length - 1].span +=
            computedColumn.value - lastDataTotalSpan;
        }
      }
      return groupedData;
    };

    const groupedData = computed(() => getGroupedData(props.data ?? []));

    const renderLabel = (item: DescData | VNode, index: number) => {
      if (isVNode(item)) {
        return (
          (isSlotsChildren(item, item.children) && item.children.label?.()) ||
          item.props?.label
        );
      }
      return (
        slots.label?.({ label: item.label, index, data: item }) ??
        (isFunction(item.label) ? item.label() : item.label)
      );
    };

    const renderValue = (item: DescData | VNode, index: number) => {
      if (isVNode(item)) {
        return item;
      }
      return (
        slots.value?.({ value: item.value, index, data: item }) ??
        (isFunction(item.value) ? item.value() : item.value)
      );
    };

    const renderVerticalItems = (data: RenderData[]) => (
      <>
        <tr class={`${prefixCls}-row`}>
          {data.map((item, index) => (
            <td
              key={`label-${index}`}
              class={[
                `${prefixCls}-item-label`,
                `${prefixCls}-item-label-block`,
              ]}
              style={labelStyle.value}
              colspan={item.span}
            >
              {renderLabel(item.data, index)}
            </td>
          ))}
        </tr>
        <tr class={`${prefixCls}-row`}>
          {data.map((item, index) => (
            <td
              key={`value-${index}`}
              class={[
                `${prefixCls}-item-value`,
                `${prefixCls}-item-value-block`,
              ]}
              style={valueStyle.value}
              colspan={item.span}
            >
              {renderValue(item.data, index)}
            </td>
          ))}
        </tr>
      </>
    );

    const renderHorizontalItems = (data: RenderData[], index: number) => (
      <tr class={`${prefixCls}-row`} key={`tr-${index}`}>
        {data.map((item) => (
          <>
            <td
              class={[
                `${prefixCls}-item-label`,
                `${prefixCls}-item-label-block`,
              ]}
              style={labelStyle.value}
            >
              {renderLabel(item.data, index)}
            </td>
            <td
              class={[
                `${prefixCls}-item-value`,
                `${prefixCls}-item-value-block`,
              ]}
              style={valueStyle.value}
              colspan={item.span * 2 - 1}
            >
              {renderValue(item.data, index)}
            </td>
          </>
        ))}
      </tr>
    );

    const renderInlineItems = (data: RenderData[], index: number) => (
      <tr class={`${prefixCls}-row`} key={`inline-${index}`}>
        {data.map((item, index) => (
          <td
            key={`item-${index}`}
            class={`${prefixCls}-item`}
            colspan={item.span}
          >
            <div
              class={[
                `${prefixCls}-item-label`,
                `${prefixCls}-item-label-inline`,
              ]}
              style={labelStyle.value}
            >
              {renderLabel(item.data, index)}
            </div>
            <div
              class={[
                `${prefixCls}-item-value`,
                `${prefixCls}-item-value-inline`,
              ]}
              style={valueStyle.value}
            >
              {renderValue(item.data, index)}
            </div>
          </td>
        ))}
      </tr>
    );

    const renderItems = (data: RenderData[], index: number) => {
      if (['inline-horizontal', 'inline-vertical'].includes(props.layout)) {
        return renderInlineItems(data, index);
      }
      if (props.layout === 'vertical') {
        return renderVerticalItems(data);
      }
      return renderHorizontalItems(data, index);
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-layout-${props.layout}`,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-border`]: props.bordered,
      },
    ]);

    const renderTitle = () => {
      const title = slots.title?.() ?? props.title;
      if (title) {
        return <div class={`${prefixCls}-title`}>{title}</div>;
      }
      return null;
    };

    return () => {
      const _groupedData = slots.default
        ? getGroupedData(getAllElements(slots.default()))
        : groupedData.value;

      return (
        <div class={cls.value}>
          {renderTitle()}
          <div class={`${prefixCls}-body`}>
            <table class={`${prefixCls}-table`}>
              <tbody>
                {_groupedData.map((data, index) => renderItems(data, index))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
  },
});
