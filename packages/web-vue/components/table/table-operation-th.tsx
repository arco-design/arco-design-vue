import { computed, defineComponent, PropType } from 'vue';
import { getOperationFixedCls, getOperationStyle } from './utils';
import { getPrefixCls } from '../_utils/global-config';
import Checkbox from '../checkbox';
import { TableOperationColumn } from './interface';

export default defineComponent({
  name: 'OperationTh',
  props: {
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
    rowSelection: {
      type: Object,
    },
    expandable: {
      type: Object,
    },
    selectedNumber: {
      type: Number,
      default: 0,
    },
    totalNumber: {
      type: Number,
      default: 0,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    totalEnabledNumber: {
      type: Number,
      default: 0,
    },
  },
  emits: ['selectAll'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('table');

    const renderContent = () => {
      if (props.operationColumn.name === 'selection') {
        if (props.rowSelection?.showCheckedAll) {
          const checked =
            props.totalNumber > 0 &&
            props.selectedNumber >= props.totalEnabledNumber;
          const indeterminate =
            props.selectedNumber > 0 &&
            props.selectedNumber < props.totalEnabledNumber;

          return (
            <Checkbox
              v-slots={{
                default: props.rowSelection?.title
                  ? props.rowSelection.title
                  : undefined,
              }}
              modelValue={checked}
              indeterminate={indeterminate}
              uninjectGroupContext
              onChange={(value: boolean) => emit('selectAll', value)}
            />
          );
        }

        return props.rowSelection?.title ?? '';
      }
      return props.expandable?.title ?? '';
    };

    const style = computed(() =>
      getOperationStyle(props.operationColumn, props.operations)
    );

    const cls = computed(() => [
      `${prefixCls}-th`,
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

    return () => (
      <th
        class={cls.value}
        style={style.value}
        rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}
      >
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </th>
    );
  },
});
