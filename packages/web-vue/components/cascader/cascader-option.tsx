import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { getPrefixCls } from '../_utils/global-config';
import type { CascaderOption, CascaderOptionInfo } from './interface';
import IconRight from '../icon/icon-right';
import IconLoading from '../icon/icon-loading';
import { getCheckedStatus, getOptionLabel } from './utils';
import { isFunction } from '../_utils/is';
import { CascaderContext, cascaderInjectionKey } from './context';

export default defineComponent({
  name: 'CascaderOption',
  props: {
    option: {
      type: Object as PropType<CascaderOptionInfo>,
      required: true,
    },
    active: Boolean,
    multiple: Boolean,
    checkStrictly: Boolean,
    searchOption: Boolean,
    pathLabel: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader-option');
    const cascaderCtx = inject<Partial<CascaderContext>>(
      cascaderInjectionKey,
      {}
    );

    const isLoading = ref(false);
    const events: Record<string, any> = {};

    const handlePathChange = (ev: Event) => {
      if (isFunction(cascaderCtx.loadMore) && !props.option.isLeaf) {
        const { isLeaf, children, key } = props.option;
        if (!isLeaf && !children) {
          isLoading.value = true;
          new Promise<CascaderOption[] | undefined>((resolve) => {
            cascaderCtx.loadMore?.(props.option.raw, resolve);
          }).then((children?: CascaderOption[]) => {
            isLoading.value = false;
            if (children) {
              cascaderCtx.addLazyLoadOptions?.(children, key);
            }
          });
        }
      }
      cascaderCtx.setSelectedPath?.(props.option.key);
    };

    if (!props.option.disabled) {
      events.onMouseenter = [
        () => cascaderCtx.setActiveKey?.(props.option.key),
      ];
      events.onMouseleave = () => cascaderCtx.setActiveKey?.();
      events.onClick = [];
      if (cascaderCtx.expandTrigger === 'hover') {
        events.onMouseenter.push((ev: Event) => handlePathChange(ev));
      } else {
        events.onClick.push((ev: Event) => handlePathChange(ev));
      }
      if (props.option.isLeaf && !props.multiple) {
        events.onClick.push((ev: Event) => {
          handlePathChange(ev);
          cascaderCtx.onClickOption?.(props.option);
        });
      }
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.active,
        [`${prefixCls}-disabled`]: props.option.disabled,
      },
    ]);

    const checkedStatus = computed(() => {
      if (props.checkStrictly) {
        return {
          checked: cascaderCtx.valueMap?.has(props.option.key),
          indeterminate: false,
        };
      }
      return getCheckedStatus(props.option, cascaderCtx.valueMap);
    });

    const renderLabelContent = () => {
      if (props.pathLabel) {
        return (
          cascaderCtx?.formatLabel?.(
            props.option.path.map((item) => item.raw)
          ) ?? getOptionLabel(props.option)
        );
      }
      if (cascaderCtx.slots?.option) {
        return cascaderCtx.slots.option({ data: props.option });
      }
      if (isFunction(props.option.render)) {
        return props.option.render();
      }
      return props.option.label;
    };

    const renderIcon = () => {
      if (isLoading.value) {
        return <IconLoading />;
      }
      if (!props.searchOption && !props.option.isLeaf) {
        return <IconRight />;
      }
      return null;
    };

    return () => (
      <li
        tabindex="0"
        role="menuitem"
        aria-disabled={props.option.disabled}
        aria-haspopup={!props.option.isLeaf}
        aria-expanded={!props.option.isLeaf && props.active}
        title={props.option.label}
        class={cls.value}
        {...events}
      >
        {props.multiple && (
          <Checkbox
            modelValue={checkedStatus.value.checked}
            indeterminate={checkedStatus.value.indeterminate}
            disabled={props.option.disabled || props.option.selectionDisabled}
            uninjectGroupContext
            onChange={(value: any, ev: Event) => {
              ev.stopPropagation();
              handlePathChange(ev);
              cascaderCtx.onClickOption?.(
                props.option,
                !checkedStatus.value.checked
              );
            }}
            // @ts-ignore
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )}
        {props.checkStrictly && !props.multiple && (
          <Radio
            modelValue={cascaderCtx.valueMap?.has(props.option.key)}
            disabled={props.option.disabled}
            uninjectGroupContext
            onChange={(value: any, ev: Event) => {
              ev.stopPropagation();
              handlePathChange(ev);
              cascaderCtx.onClickOption?.(props.option, true);
            }}
            // @ts-ignore
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )}
        <div class={`${prefixCls}-label`}>
          {renderLabelContent()}
          {renderIcon()}
        </div>
      </li>
    );
  },
});
