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
    multiple: Boolean,
    computedKeys: {
      type: Array,
    },
    activeNode: {
      type: Object,
    },
  },
  emits: ['clickOption', 'activeChange'],
  setup(props, { emit }) {
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
                isActive={item.key === props.activeNode?.key}
                multiple={props.multiple}
                searchOption
                onClickOption={(
                  option: CascaderOptionInfo,
                  checked?: boolean
                ) => emit('clickOption', option, checked)}
                onActiveChange={(option: CascaderOptionInfo) =>
                  emit('activeChange', option)
                }
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
