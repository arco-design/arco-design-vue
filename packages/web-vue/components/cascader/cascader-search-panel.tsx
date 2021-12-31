import { defineComponent, PropType } from 'vue';
import { CascaderOptionInfo } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
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
    activeKey: String,
    multiple: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader');

    const renderEmpty = () => {
      return <Empty />;
    };

    return () => (
      <div class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}>
        {props.options.length > 0 ? (
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
        ) : (
          <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
        )}
      </div>
    );
  },
});
