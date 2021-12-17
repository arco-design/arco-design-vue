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
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    activeNode: {
      type: Object as PropType<CascaderOptionInfo>,
    },
    computedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    expandTrigger: String,
    multiple: Boolean,
    totalLevel: {
      type: Number,
      required: true,
    },
    checkStrictly: Boolean,
  },
  emits: ['clickOption', 'activeChange', 'pathChange'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('cascader');

    // const panelRefs = ref([]);
    // const optionRefs = ref([]);

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
                    isActive={
                      props.selectedPath.includes(item) ||
                      item.key === props.activeNode?.key
                    }
                    multiple={props.multiple}
                    checkStrictly={props.checkStrictly}
                    expandTrigger={props.expandTrigger}
                    onClickOption={(
                      option: CascaderOptionInfo,
                      checked?: boolean
                    ) => emit('clickOption', option, checked)}
                    onActiveChange={(option: CascaderOptionInfo) =>
                      emit('activeChange', option)
                    }
                    onPathChange={(option: CascaderOptionInfo) =>
                      emit('pathChange', option)
                    }
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
