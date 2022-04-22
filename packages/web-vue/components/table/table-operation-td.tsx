import { computed, defineComponent, PropType, VNode } from 'vue';
import { TableDataWithRaw, TableOperationColumn } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import { getOperationFixedCls, getOperationStyle } from './utils';
import Checkbox from '../checkbox';
import Radio from '../radio';
import IconPlus from '../icon/icon-plus';
import IconMinus from '../icon/icon-minus';
import IconDragDotVertical from '../icon/icon-drag-dot-vertical';

export default defineComponent({
  name: 'OperationTd',
  components: {
    Checkbox,
    Radio,
    IconPlus,
    IconMinus,
  },
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    record: {
      type: Object as PropType<TableDataWithRaw>,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'key',
    },
    hasExpand: {
      type: Boolean,
      default: false,
    },
    selectedRowKeys: {
      type: Array as PropType<string[]>,
    },
    renderExpandBtn: {
      type: Function as PropType<
        (record: TableDataWithRaw, stopPropagation?: boolean) => VNode
      >,
    },
    colSpan: {
      type: Number,
      default: 1,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    summary: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select', 'expand'],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('table');

    const style = computed(() =>
      getOperationStyle(props.operationColumn, props.operations)
    );

    const cls = computed(() => [
      `${prefixCls}-td`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]:
          props.operationColumn.name === 'selection-checkbox',
        [`${prefixCls}-radio`]:
          props.operationColumn.name === 'selection-radio',
        [`${prefixCls}-expand`]: props.operationColumn.name === 'expand',
        [`${prefixCls}-drag-handle`]:
          props.operationColumn.name === 'drag-handle',
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ]);

    const renderContent = () => {
      if (props.summary) {
        return null;
      }
      if (props.operationColumn.render) {
        return props.operationColumn.render(props.record);
      }
      if (props.operationColumn.name === 'selection-checkbox') {
        const value = props.record.key;
        return (
          <Checkbox
            value={value}
            modelValue={props.selectedRowKeys ?? []}
            disabled={Boolean(props.record.disabled)}
            uninjectGroupContext
            onChange={(values: string[]) => emit('select', values, value)}
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        );
      }
      if (props.operationColumn.name === 'selection-radio') {
        const value = props.record.key;
        return (
          <Radio
            value={value}
            modelValue={props.selectedRowKeys?.[0] ?? ''}
            disabled={Boolean(props.record.disabled)}
            uninjectGroupContext
            onChange={(value: string) => emit('select', [value], value)}
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        );
      }
      if (props.operationColumn.name === 'expand') {
        if (props.hasExpand && props.renderExpandBtn) {
          return props.renderExpandBtn(props.record);
        }
        return null;
      }
      if (props.operationColumn.name === 'drag-handle') {
        return slots['drag-handle-icon']?.() ?? <IconDragDotVertical />;
      }
      return null;
    };

    return () => (
      <td
        class={cls.value}
        style={style.value}
        rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}
        colspan={props.colSpan > 1 ? props.colSpan : undefined}
      >
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </td>
    );
  },
});
