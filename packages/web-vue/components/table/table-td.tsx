import {
  computed,
  createVNode,
  defineComponent,
  inject,
  PropType,
  ref,
  VNode,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  TableColumnData,
  TableData,
  TableDataWithRaw,
  TableOperationColumn,
} from './interface';
import { getFixedCls, getStyle } from './utils';
import { getValueByPath } from '../_utils/get-value-by-path';
import IconLoading from '../icon/icon-loading';
import { isFunction, isObject } from '../_utils/is';
import { TableContext, tableInjectionKey } from './context';
import AutoTooltip from '../_components/auto-tooltip/auto-tooltip';

const TD_TYPES = [
  'normal',
  'operation',
  'checkbox',
  'radio',
  'expand',
] as const;
type TdTypes = typeof TD_TYPES[number];

export default defineComponent({
  name: 'Td',
  props: {
    rowIndex: Number,
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({}),
    },
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({}),
    },
    type: {
      type: String as PropType<TdTypes>,
      default: 'normal',
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      default: () => [],
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    colSpan: {
      type: Number,
      default: 1,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    isFixedExpand: {
      type: Boolean,
      default: false,
    },
    containerWidth: {
      type: Number,
    },
    showExpandBtn: {
      type: Boolean,
      default: false,
    },
    indentSize: {
      type: Number,
      default: 0,
    },
    renderExpandBtn: {
      type: Function as PropType<
        (record: TableDataWithRaw, stopPropagation?: boolean) => VNode
      >,
    },
    summary: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('table');

    const tooltipProps = computed(() => {
      if (isObject(props.column?.tooltip)) {
        return props.column.tooltip;
      }
      return undefined;
    });

    const isSorted = computed(
      () =>
        props.column?.dataIndex &&
        tableCtx.sorter?.field === props.column.dataIndex
    );

    const resizing = computed(
      () =>
        props.column?.dataIndex &&
        tableCtx.resizingColumn === props.column.dataIndex
    );

    const getCustomClass = () => {
      if (props.summary) {
        return isFunction(props.column?.summaryCellClass)
          ? props.column.summaryCellClass(props.record?.raw)
          : props.column?.summaryCellClass;
      }
      return isFunction(props.column?.bodyCellClass)
        ? props.column.bodyCellClass(props.record?.raw)
        : props.column?.bodyCellClass;
    };

    const cls = computed(() => [
      `${prefixCls}-td`,
      {
        [`${prefixCls}-col-sorted`]: isSorted.value,
        [`${prefixCls}-td-resizing`]: resizing.value,
      },
      ...getFixedCls(prefixCls, props.column),
      props.column?.cellClass,
      getCustomClass(),
    ]);

    const getCustomStyle = () => {
      if (props.summary) {
        return isFunction(props.column?.summaryCellStyle)
          ? props.column.summaryCellStyle(props.record?.raw)
          : props.column?.summaryCellStyle;
      }
      return isFunction(props.column?.bodyCellStyle)
        ? props.column.bodyCellStyle(props.record?.raw)
        : props.column?.bodyCellStyle;
    };

    const style = computed(() => {
      const style = getStyle(props.column, {
        dataColumns: props.dataColumns,
        operations: props.operations,
      });
      const customStyle = getCustomStyle();
      return {
        ...style,
        ...props.column?.cellStyle,
        ...customStyle,
      };
    });

    const cellStyle = computed(() => {
      if (props.isFixedExpand && props.containerWidth) {
        return {
          width: `${props.containerWidth}px`,
        };
      }
      return undefined;
    });

    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});

    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      const data = {
        record: props.record?.raw,
        column: props.column,
        rowIndex: props.rowIndex ?? -1,
      };
      if (slots.cell) {
        return slots.cell(data);
      }
      if (props.column.slots?.cell) {
        return props.column.slots.cell(data);
      }
      if (props.column.render) {
        return props.column.render(data);
      }
      if (props.column.slotName && tableCtx.slots?.[props.column.slotName]) {
        return tableCtx.slots[props.column.slotName]?.(data);
      }
      return String(
        getValueByPath(props.record?.raw, props.column.dataIndex) ?? ''
      );
    };

    const isLoading = ref(false);

    const handleClick = (ev: Event) => {
      if (
        isFunction(tableCtx.loadMore) &&
        !props.record?.isLeaf &&
        !props.record?.children
      ) {
        isLoading.value = true;
        new Promise<TableData[] | undefined>((resolve) => {
          tableCtx.loadMore?.(props.record.raw, resolve);
        }).then((children?: TableData[]) => {
          tableCtx.addLazyLoadData?.(children, props.record);
          isLoading.value = false;
        });
      }
      ev.stopPropagation();
    };

    const renderCell = () => {
      return (
        <span
          class={[
            `${prefixCls}-cell`,
            `${prefixCls}-cell-align-${props.column?.align ?? 'left'}`,
            {
              [`${prefixCls}-cell-fixed-expand`]: props.isFixedExpand,
              [`${prefixCls}-cell-expand-icon`]: props.showExpandBtn,
            },
          ]}
          style={cellStyle.value}
        >
          {props.indentSize > 0 && (
            <span
              style={{
                paddingLeft: `${props.indentSize}px`,
              }}
            />
          )}
          {props.showExpandBtn && (
            <span class={`${prefixCls}-cell-inline-icon`} onClick={handleClick}>
              {isLoading.value ? (
                <IconLoading />
              ) : (
                props.renderExpandBtn?.(props.record, false)
              )}
            </span>
          )}
          {props.column?.ellipsis && props.column?.tooltip ? (
            <AutoTooltip
              class={`${prefixCls}-td-content`}
              tooltipProps={tooltipProps.value}
            >
              {renderContent()}
            </AutoTooltip>
          ) : (
            <span
              class={[
                `${prefixCls}-td-content`,
                {
                  [`${prefixCls}-text-ellipsis`]: props.column?.ellipsis,
                },
              ]}
            >
              {renderContent()}
            </span>
          )}
        </span>
      );
    };

    return () => {
      return createVNode(
        slots.td?.({
          record: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        })[0] ?? 'td',
        {
          class: cls.value,
          style: style.value,
          rowspan: props.rowSpan > 1 ? props.rowSpan : undefined,
          colspan: props.colSpan > 1 ? props.colSpan : undefined,
        },
        {
          default: () => [renderCell()],
        }
      );
    };
  },
});
