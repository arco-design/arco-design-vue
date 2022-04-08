import { computed, defineComponent, PropType } from 'vue';
import { getOperationFixedCls, getOperationStyle } from './utils';
import { getPrefixCls } from '../_utils/global-config';
import Checkbox from '../checkbox';
import { TableOperationColumn } from './interface';
import { isFunction } from '../_utils/is';

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
    rowSpan: {
      type: Number,
      default: 1,
    },
    // for selection
    selectAll: {
      type: Boolean,
      default: false,
    },
    selectedNumber: {
      type: Number,
      default: 0,
    },
    totalEnabledNumber: {
      type: Number,
      default: 0,
    },
  },
  emits: ['selectAll'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('table');

    const checked = computed(
      () =>
        props.totalEnabledNumber > 0 &&
        props.selectedNumber >= props.totalEnabledNumber
    );
    const indeterminate = computed(
      () =>
        props.selectedNumber > 0 &&
        props.selectedNumber < props.totalEnabledNumber
    );

    const renderContent = () => {
      if (props.selectAll) {
        return (
          <Checkbox
            v-slots={{
              default: isFunction(props.operationColumn.title)
                ? props.operationColumn.title()
                : props.operationColumn.title,
            }}
            modelValue={checked.value}
            indeterminate={indeterminate.value}
            uninjectGroupContext
            onChange={(value: boolean) => emit('selectAll', value)}
          />
        );
      }
      if (props.operationColumn.title) {
        return isFunction(props.operationColumn.title)
          ? props.operationColumn.title()
          : props.operationColumn.title;
      }
      return null;
    };

    const style = computed(() =>
      getOperationStyle(props.operationColumn, props.operations)
    );

    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]: props.selectAll,
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
