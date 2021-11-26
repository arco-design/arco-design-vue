import type { PropType, VNode, CSSProperties } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import type { Size, TextAlign } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isArray, isFunction, isObject } from '../_utils/is';

export type DescData = {
  key: string;
  label: string | (() => VNode);
  value: string | (() => VNode);
  span: number;
};

const DESC_LAYOUTS = [
  'horizontal',
  'vertical',
  'inline-horizontal',
  'inline-vertical',
] as const;
type DescLayout = typeof DESC_LAYOUTS[number];

const getItemSpan = (item: DescData, column: number) => {
  if (!item.span) {
    return 1;
  }
  if (item.span > column) {
    return column;
  }
  return item.span;
};

const getTotalSpan = (arr?: DescData[]) => {
  return isArray(arr)
    ? arr.reduce((total, data) => total + (data.span || 1), 0)
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
     * @zh 每行放置的数据个数
     * @en The number of data placed in each row
     */
    column: {
      type: Number,
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
     * @values 'horizontal', 'vertical', 'inline-horizontal', 'inline-vertical'
     */
    layout: {
      type: String as PropType<DescLayout>,
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
   */
  /**
   * @zh 数据内容
   * @en Data value
   * @slot value
   * @binding {string} value
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('descriptions');

    const screen = ref();

    const column = computed(() =>
      isObject(props.column) ? props.column[screen.value] : props.column
    );

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

    const data = computed(() => {
      const data = [];
      if (isArray(props.data) && props.data.length > 0 && column.value > 0) {
        for (const item of props.data) {
          const itemSpan = getItemSpan(item, column.value);
          const lastData = data[data.length - 1];
          const lastDataTotalSpan = getTotalSpan(lastData);
          if (lastDataTotalSpan === 0 || lastDataTotalSpan >= column.value) {
            data.push([
              {
                ...item,
                span: itemSpan,
              },
            ]);
          } else {
            const span = item.span
              ? item.span + lastDataTotalSpan > column.value
                ? column.value - lastDataTotalSpan
                : item.span
              : 1;
            lastData.push({
              ...item,
              span,
            });
          }
        }
        // 最后一列填满span
        const lastData = data[data.length - 1];
        const lastDataTotalSpan = getTotalSpan(lastData);
        if (lastDataTotalSpan < column.value) {
          lastData[lastData.length - 1].span =
            lastData[lastData.length - 1].span +
            column.value -
            lastDataTotalSpan;
        }
      }
      return data;
    });

    const renderVerticalItems = (data: DescData[]) => (
      <>
        <tr class={`${prefixCls}-row`}>
          {data.map((item, index) => (
            <td
              key={`${item.key ?? index}_label`}
              class={`${prefixCls}-item-label`}
              style={labelStyle.value}
              colspan={item.span}
            >
              {slots.label?.({ label: item.label }) ??
                (isFunction(item.label) ? item.label() : item.label)}
            </td>
          ))}
        </tr>
        <tr class={`${prefixCls}-row`}>
          {data.map((item, index) => (
            <td
              key={`${item.key ?? index}_value`}
              class={`${prefixCls}-item-value`}
              style={valueStyle.value}
              colspan={item.span}
            >
              {slots.value?.({ value: item.value }) ??
                (isFunction(item.value) ? item.value() : item.value)}
            </td>
          ))}
        </tr>
      </>
    );

    const renderHorizontalItems = (data: DescData[], index: number) => (
      <tr class={`${prefixCls}-row`} key={`tr-${index}`}>
        {data.map((item) => (
          <>
            <td class={`${prefixCls}-item-label`} style={labelStyle.value}>
              {slots.label?.({ label: item.label }) ??
                (isFunction(item.label) ? item.label() : item.label)}
            </td>
            <td
              class={`${prefixCls}-item-value`}
              style={valueStyle.value}
              colspan={item.span * 2 - 1}
            >
              {slots.value?.({ value: item.value }) ??
                (isFunction(item.value) ? item.value() : item.value)}
            </td>
          </>
        ))}
      </tr>
    );

    const renderInlineItems = (data: DescData[], index: number) => (
      <tr class={`${prefixCls}-row`} key={`inline-${index}`}>
        {data.map((item, index) => (
          <td
            key={item.key ?? index}
            class={`${prefixCls}-item`}
            colspan={item.span}
          >
            <div
              class={`${prefixCls}-item-label-inline`}
              style={labelStyle.value}
            >
              {slots.label?.({ label: item.label }) ??
                (isFunction(item.label) ? item.label() : item.label)}
            </div>
            <div
              class={`${prefixCls}-item-value-inline`}
              style={valueStyle.value}
            >
              {slots.value?.({ value: item.value }) ??
                (isFunction(item.value) ? item.value() : item.value)}
            </div>
          </td>
        ))}
      </tr>
    );

    const renderItems = (data: DescData[], index: number) => {
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

    return () => (
      <div class={cls.value}>
        {renderTitle()}
        <div class={`${prefixCls}-body`}>
          <table class={`${prefixCls}-table`}>
            <tbody>
              {data.value.map((data, index) => renderItems(data, index))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
