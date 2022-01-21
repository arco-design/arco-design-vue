import { computed, createVNode, defineComponent, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TableColumn, TableData, TableOperationColumn } from './interface';
import { getFixedCls, getStyle } from './utils';
import { getValueByPath } from '../_utils/get-value-by-path';
import IconLoading from '../icon/icon-loading';
import { isFunction } from '../_utils/is';

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
    isSorted: {
      type: Boolean,
    },
    rowIndex: Number,
    record: {
      type: Object as PropType<TableData>,
      default: () => ({}),
    },
    column: {
      type: Object as PropType<TableColumn>,
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
      type: Array as PropType<TableColumn[]>,
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
    resizing: Boolean,
    loadMore: Function as PropType<
      (record: TableData, done: (children: TableData[]) => void) => void
    >,
    addLazyLoadData: Function as PropType<
      (children: TableData[] | undefined, record: TableData) => void
    >,
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

    const cls = computed(() => [
      `${prefixCls}-td`,
      `${prefixCls}-td-align-${props.column?.align ?? 'left'}`,
      {
        [`${prefixCls}-col-sorted`]: props.isSorted,
        [`${prefixCls}-td-resizing`]: props.resizing,
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

    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props.column.render) {
        return props.column.render({
          record: props.record,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        });
      }
      return String(getValueByPath(props.record, props.column.dataIndex) ?? '');
    };

    const isLoading = ref(false);

    const handleClick = () => {
      if (
        isFunction(props.loadMore) &&
        !props.record?.isLeaf &&
        !props.record?.children
      ) {
        isLoading.value = true;
        new Promise<TableData[] | undefined>((resolve) => {
          props.loadMore?.(props.record, resolve);
        }).then((children?: TableData[]) => {
          props.addLazyLoadData?.(children, props.record);
          isLoading.value = false;
        });
      }
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
                props.renderExpandBtn?.(props.record)
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
