import { computed, defineComponent, inject, PropType } from 'vue';
import { CascaderOptionInfo } from './interface';
import { getPrefixCls } from '../_utils/global-config';
import { configProviderInjectionKey } from '../config-provider/context';
import Empty from '../empty';
import Spin from '../spin';
import CascaderOption from './cascader-option';
import Scrollbar from '../scrollbar';
import VirtualList from '../_components/virtual-list-v2';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';

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
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const isVirtual = computed(() => Boolean(props.virtualListProps));

    const renderOption = (item: CascaderOptionInfo) => (
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
    );

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
      // 命中项可能非常多，设置 virtual-list-props 后与列面板一样走虚拟滚动
      if (isVirtual.value) {
        return (
          <VirtualList
            {...props.virtualListProps}
            data={props.options}
            itemKey="key"
            v-slots={{
              item: ({ item }: { item: CascaderOptionInfo }) =>
                renderOption(item),
            }}
          />
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
          {props.options.map((item) => renderOption(item))}
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
