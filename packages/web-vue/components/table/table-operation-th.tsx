import { computed, defineComponent, inject, PropType } from 'vue';

import { getPrefixCls } from '../_utils/global-config';
import { isFunction } from '../_utils/is';
import Checkbox from '../checkbox';
import { TableContext, tableInjectionKey } from './context';
import { TableOperationColumn } from './interface';
import { getOperationFixedCls, getOperationStyle } from './utils';

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
  },
  setup(props) {
    const prefixCls = getPrefixCls('table');
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});

    const checkboxStatus = computed(() => {
      let checked = false;
      let indeterminate = false;

      const currentSelectedEnabledRowKeys =
        tableCtx.currentSelectedRowKeys?.filter(
          (key) => tableCtx.currentAllEnabledRowKeys?.includes(key) ?? true,
        ) ?? [];

      const selectedNumber = currentSelectedEnabledRowKeys.length;
      const totalEnabledNumber = tableCtx.currentAllEnabledRowKeys?.length ?? 0;
      if (selectedNumber > 0) {
        if (selectedNumber >= totalEnabledNumber) {
          checked = true;
        } else {
          indeterminate = true;
        }
      }
      return {
        checked,
        indeterminate,
      };
    });

    const renderContent = () => {
      if (props.selectAll) {
        return (
          <Checkbox
            v-slots={{
              default: isFunction(props.operationColumn.title)
                ? props.operationColumn.title()
                : props.operationColumn.title,
            }}
            modelValue={checkboxStatus.value.checked}
            indeterminate={checkboxStatus.value.indeterminate}
            uninjectGroupContext
            onChange={(checked) => {
              tableCtx.onSelectAll?.(checked as boolean);
            }}
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

    const style = computed(() => ({
      ...getOperationStyle(props.operationColumn, props.operations),
      ...(props.rowSpan > 1 ? { gridRow: `span ${props.rowSpan}` } : undefined),
    }));

    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]: props.selectAll,
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ]);

    return () => (
      <div class={cls.value} style={style.value}>
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </div>
    );
  },
});
