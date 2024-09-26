import { defineComponent, inject, PropType, TransitionGroup } from 'vue';
import { configProviderInjectionKey } from '../config-provider/context';
import { CascaderOptionInfo } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';
import CascaderColumn from './cascader-column';

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
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
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
      return props.displayColumns.map((column, index) => (
        <CascaderColumn
          key={`column-${index}`}
          column={column}
          level={index}
          selectedPath={props.selectedPath}
          activeKey={props.activeKey}
          totalLevel={props.totalLevel}
          multiple={props.multiple}
          checkStrictly={props.checkStrictly}
          virtualListProps={props.virtualListProps}
          v-slots={{
            empty: slots.empty,
          }}
        />
      ));
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
