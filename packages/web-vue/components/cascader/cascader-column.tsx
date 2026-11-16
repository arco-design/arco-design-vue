import { defineComponent, inject, PropType, ref } from 'vue';
import { configProviderInjectionKey } from '../config-provider/context';
import { CascaderOptionInfo } from './interface';
import CascaderOption from './cascader-option';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Scrollbar from '../scrollbar';
import VirtualList from '../_components/virtual-list-v2';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';

export default defineComponent({
  name: 'CascaderColumn',
  props: {
    column: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
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
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const virtualListRef = ref();
    const isVirtual = ref(Boolean(props.virtualListProps));

    const renderEmpty = () => {
      return (
        slots.empty?.() ??
        configCtx?.slots.empty?.({ component: 'cascader' }) ?? <Empty />
      );
    };

    return () => {
      return (
        <div
          class={`${prefixCls}-panel-column`}
          style={{ zIndex: props.totalLevel - props.level }}
        >
          {props.column.length === 0 ? (
            <Scrollbar class={`${prefixCls}-column-content`}>
              <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
            </Scrollbar>
          ) : isVirtual.value ? (
            <VirtualList
              key={props.column?.length}
              {...props.virtualListProps}
              ref={virtualListRef}
              data={props.column}
              v-slots={{
                item: ({ item }: { item: CascaderOptionInfo }) => {
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
                },
              }}
            />
          ) : (
            <Scrollbar class={`${prefixCls}-column-content`}>
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
                {props.column.map((item) => {
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
            </Scrollbar>
          )}
        </div>
      );
    };
  },
});
