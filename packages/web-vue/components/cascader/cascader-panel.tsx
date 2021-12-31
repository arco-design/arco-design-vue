import { defineComponent, PropType, TransitionGroup } from 'vue';
import { CascaderOptionInfo } from './interface';
import CascaderOption from './cascader-option';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';

export default defineComponent({
  name: 'CascaderPanel',
  props: {
    displayColumns: {
      type: Array as PropType<CascaderOptionInfo[][]>,
      required: true,
    },
    selectedPath: {
      type: Array as PropType<string[]>,
      required: true,
    },
    activeKey: String,
    computedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    totalLevel: {
      type: Number,
      required: true,
    },
    expandTrigger: String,
    multiple: Boolean,
    checkStrictly: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader');

    const renderEmpty = () => {
      return <Empty />;
    };

    const renderColumn = (column: CascaderOptionInfo[], level = 0) => {
      return (
        <div
          class={`${prefixCls}-panel-column`}
          key={`column-${level}`}
          style={{ zIndex: props.totalLevel - level }}
        >
          {column.length === 0 ? (
            <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
          ) : (
            <ul
              class={[
                `${prefixCls}-list`,
                {
                  [`${prefixCls}-list-multiple`]: Boolean(props?.multiple),
                  [`${prefixCls}-list-strictly`]: Boolean(props?.checkStrictly),
                },
              ]}
            >
              {column.map((item) => {
                return (
                  <CascaderOption
                    key={item.key}
                    option={item}
                    computedKeys={props.computedKeys}
                    active={
                      props.selectedPath.includes(item.key) ||
                      item.key === props.activeKey
                    }
                    multiple={props.multiple}
                    checkStrictly={props.checkStrictly}
                    expandTrigger={props.expandTrigger}
                  />
                );
              })}
            </ul>
          )}
        </div>
      );
    };

    return () => (
      <TransitionGroup
        tag="div"
        name="cascader-slide"
        class={`${prefixCls}-panel`}
      >
        {props.displayColumns.length > 0
          ? props.displayColumns.map((column, index) =>
              renderColumn(column, index)
            )
          : renderEmpty()}
      </TransitionGroup>
    );
  },
});
