import { defineComponent, PropType } from 'vue';
import { CascaderOptionInfo } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';
import CascaderOption from './cascader-option';

export default defineComponent({
  name: 'CascaderSearchPanel',
  props: {
    options: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    computedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    loading: Boolean,
    activeKey: String,
    multiple: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader');

    const renderContent = () => {
      if (props.loading) {
        return <Spin />;
      }
      if (props.options.length === 0) {
        return (
          <div class={`${prefixCls}-list-empty`}>
            <Empty />
          </div>
        );
      }
      return (
        <ul
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
              computedKeys={props.computedKeys}
              active={item.key === props.activeKey}
              multiple={props.multiple}
              searchOption
            />
          ))}
        </ul>
      );
    };

    return () => (
      <div class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}>
        {renderContent()}
      </div>
    );
  },
});
