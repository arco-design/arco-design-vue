import { computed, defineComponent, PropType } from 'vue';
import { TableData, TableOperationColumn } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import { getOperationFixedCls, getOperationStyle } from './utils';
import Checkbox from '../checkbox';
import Radio from '../radio';
import IconPlus from '../icon/icon-plus';
import IconMinus from '../icon/icon-minus';

export default defineComponent({
  name: 'OperationTd',
  components: {
    Checkbox,
    Radio,
    IconPlus,
    IconMinus,
  },
  props: {
    record: {
      type: Object as PropType<TableData>,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'key',
    },
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    isRadio: {
      type: Boolean,
    },
    hasExpand: {
      type: Boolean,
    },
    selectedRowKeys: {
      type: Array,
      required: true,
    },
    expandedIcon: {
      type: Function,
    },
    expandedRowKeys: {
      type: Array,
      required: true,
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
          props.operationColumn.name === 'selection' && !props.isRadio,
        [`${prefixCls}-radio`]:
          props.operationColumn.name === 'selection' && props.isRadio,
        [`${prefixCls}-expand`]: props.operationColumn.name === 'expand',
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ]);

    const renderSelection = () => {
      const rowKey = props.record[props.rowKey];

      if (props.isRadio) {
        return (
          <Radio
            modelValue={props.selectedRowKeys[0] ?? ''}
            onChange={(value: string) => emit('select', [value])}
            disabled={Boolean(props.record.disabled)}
            value={rowKey}
          />
        );
      }

      return (
        <Checkbox
          modelValue={props.selectedRowKeys}
          onChange={(values: string[]) => emit('select', values)}
          disabled={Boolean(props.record.disabled)}
          value={rowKey}
        />
      );
    };

    const renderExpand = () => {
      const rowKey = props.record[props.rowKey];
      const expanded = props.expandedRowKeys.includes(rowKey);

      return (
        <button
          class={`${prefixCls}-expand-btn`}
          onClick={() => emit('expand', rowKey)}
        >
          {slots['expand-icon']?.({ expanded, record: props.record }) ??
            props.expandedIcon?.(expanded, props.record) ??
            (expanded ? <IconMinus /> : <IconPlus />)}
        </button>
      );
    };

    const renderContent = () => {
      if (props.operationColumn.name === 'selection') {
        return renderSelection();
      }
      if (props.operationColumn.name === 'expand') {
        if (props.hasExpand) {
          return renderExpand();
        }
        return null;
      }
      if (props.operationColumn.bodyNode) {
        return props.operationColumn.bodyNode(props.record, {
          class: cls.value,
          style: style.value,
        });
      }
      return null;
    };

    return () => (
      <td class={cls.value} style={style.value}>
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </td>
    );
  },
});
