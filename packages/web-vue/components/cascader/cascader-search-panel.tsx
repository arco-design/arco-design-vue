import { defineComponent, inject, PropType } from 'vue';
import { CascaderOptionInfo } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import { configProviderInjectionKey } from '../config-provider/context';
import Empty from '../empty';
import Spin from '../spin';
import CascaderOption from './cascader-option';
import Scrollbar from '../scrollbar';

export default defineComponent({
  name: 'CascaderSearchPanel',
  props: {
    options: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    loading: Boolean,
    activeKey: String,
    multiple: Boolean,
    checkStrictly: Boolean,
    pathLabel: Boolean,
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader');
    const configCtx = inject(configProviderInjectionKey, undefined);

    const renderContent = () => {
      if (props.loading) {
        return <Spin />;
      }
      if (props.options.length === 0) {
        return (
          <div class={`${prefixCls}-list-empty`}>
            {slots.empty?.() ??
              configCtx?.slots.empty?.({ component: 'cascader' }) ?? <Empty />}
          </div>
        );
      }
      return (
        <ul
          role="menu"
          class={[
            `${prefixCls}-list`,
            `${prefixCls}-search-list`,
            {
              [`${prefixCls}-list-multiple`]: props.multiple,
            },
          ]}
        >
          {props.options.map((item) => (
            <CascaderOption
              key={item.key}
              class={`${prefixCls}-search-option`}
              option={item}
              active={item.key === props.activeKey}
              multiple={props.multiple}
              checkStrictly={props.checkStrictly}
              pathLabel={props.pathLabel}
              searchOption
            />
          ))}
        </ul>
      );
    };

    return () => (
      <Scrollbar class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}>
        {renderContent()}
      </Scrollbar>
    );
  },
});
