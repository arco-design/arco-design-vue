import { defineComponent, inject, PropType, TransitionGroup } from 'vue';
import { configProviderInjectionKey } from '../config-provider/context';
import { CascaderOptionInfo } from './interface';
import CascaderOption from './cascader-option';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';
import Scrollbar from '../scrollbar';

export default defineComponent({
  name: 'BaseCascaderPanel',
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
    totalLevel: {
      type: Number,
      required: true,
    },
    multiple: Boolean,
    checkStrictly: Boolean,
    loading: Boolean,
    dropdown: Boolean,
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader');
    const configCtx = inject(configProviderInjectionKey, undefined);

    const renderEmpty = () => {
      return (
        slots.empty?.() ??
        configCtx?.slots.empty?.({ component: 'cascader' }) ?? <Empty />
      );
    };

    const renderColumn = (column: CascaderOptionInfo[], level = 0) => {
      return (
        <div
          class={`${prefixCls}-panel-column`}
          key={`column-${level}`}
          style={{ zIndex: props.totalLevel - level }}
        >
          <Scrollbar class={`${prefixCls}-column-content`}>
            {column.length === 0 ? (
              <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
            ) : (
              <ul
                role="menu"
                class={[
                  `${prefixCls}-list`,
                  {
                    [`${prefixCls}-list-multiple`]: Boolean(props?.multiple),
                    [`${prefixCls}-list-strictly`]: Boolean(
                      props?.checkStrictly
                    ),
                  },
                ]}
              >
                {column.map((item) => {
                  return (
                    <CascaderOption
                      key={item.key}
                      option={item}
                      active={
                        props.selectedPath.includes(item.key) ||
                        item.key === props.activeKey
                      }
                      multiple={props.multiple}
                      checkStrictly={props.checkStrictly}
                    />
                  );
                })}
              </ul>
            )}
          </Scrollbar>
        </div>
      );
    };

    const renderContent = () => {
      if (props.loading) {
        return (
          <div
            key="panel-column-loading"
            class={[
              `${prefixCls}-panel-column`,
              `${prefixCls}-panel-column-loading`,
            ]}
          >
            <Spin />
          </div>
        );
      }
      if (props.displayColumns.length === 0) {
        return (
          <div key="panel-column-empty" class={`${prefixCls}-panel-column`}>
            <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
          </div>
        );
      }
      return props.displayColumns.map((column, index) =>
        renderColumn(column, index)
      );
    };

    return () => (
      <TransitionGroup
        tag="div"
        name="cascader-slide"
        // @ts-ignore
        class={[
          `${prefixCls}-panel`,
          {
            [`${prefixCls}-dropdown-panel`]: props.dropdown,
          },
        ]}
      >
        {renderContent()}
      </TransitionGroup>
    );
  },
});
