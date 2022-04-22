import {
  computed,
  createVNode,
  defineComponent,
  inject,
  PropType,
  ref,
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
import { isFunction } from '../_utils/is';
import { TableContext, tableInjectionKey } from './context';

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
      type: Function,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('table');

    const style = computed(() =>
      getStyle(props.column, {
        dataColumns: props.dataColumns,
        operations: props.operations,
      })
    );

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

    const cls = computed(() => [
      `${prefixCls}-td`,
      `${prefixCls}-td-align-${props.column?.align ?? 'left'}`,
      {
        [`${prefixCls}-col-sorted`]: isSorted.value,
        [`${prefixCls}-td-resizing`]: resizing.value,
      },
      ...getFixedCls(prefixCls, props.column),
    ]);

    const cellStyle = computed(() => {
      if (props.isFixedExpand && props.containerWidth) {
        return {
          width: `${props.containerWidth}px`,
          ...props.column?.cellStyle,
        };
      }
      return props.column?.cellStyle;
    });

    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});

    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props.column.slots?.cell) {
        return props.column.slots.cell({
          record: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        });
      }
      if (props.column.render) {
        return props.column.render({
          record: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        });
      }
      if (props.column.slotName && tableCtx.slots?.[props.column.slotName]) {
        return tableCtx.slots[props.column.slotName]?.({
          record: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        });
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
            {
              [`${prefixCls}-cell-fixed-expand`]: props.isFixedExpand,
              [`${prefixCls}-cell-expand-icon`]: props.showExpandBtn,
              [`${prefixCls}-cell-text-ellipsis`]: props.column?.ellipsis,
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
          {renderContent()}
        </span>
      );
    };

    return () => {
      return createVNode(
        slots.td?.()[0] ?? 'td',
        {
          class: cls.value,
          style: style.value,
          rowspan: props.rowSpan > 1 ? props.rowSpan : undefined,
          colspan: props.colSpan > 1 ? props.colSpan : undefined,
        },
        [renderCell()]
      );
    };
  },
});
