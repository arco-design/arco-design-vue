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
import { cascaderInjectionKey } from './context';

export default defineComponent({
  name: 'CascaderOption',
  props: {
    option: {
      type: Object as PropType<CascaderOptionInfo>,
      required: true,
    },
    computedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    active: Boolean,
    multiple: Boolean,
    expandTrigger: String,
    checkStrictly: Boolean,
    searchOption: Boolean,
    pathLabel: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader-option');
    const cascaderCtx = inject(cascaderInjectionKey, undefined);

    const isLoading = ref(false);
    const events: Record<string, any> = {};

    const handlePathChange = (ev: Event) => {
      if (isFunction(cascaderCtx?.loadMore) && !props.option.isLeaf) {
        const { isLeaf, children, key } = props.option;
        if (!isLeaf && !children) {
          isLoading.value = true;
          new Promise<CascaderOption[] | undefined>((resolve) => {
            cascaderCtx?.loadMore(props.option, resolve);
          }).then((children?: CascaderOption[]) => {
            isLoading.value = false;
            if (children) {
              cascaderCtx?.addLazyLoadOptions(children, key);
            }
          });
        }
      }
      cascaderCtx?.setSelectedPath(props.option.key);
    };

    if (!props.option.disabled) {
      events.onMouseenter = [() => cascaderCtx?.setActiveKey(props.option.key)];
      events.onMouseleave = () => cascaderCtx?.setActiveKey();

      if (props.option.isLeaf && !props.multiple) {
        events.onClick = (ev: Event) => {
          handlePathChange(ev);
          cascaderCtx?.onClickOption(props.option);
        };
      } else if (props.expandTrigger === 'hover') {
        events.onMouseenter.push((ev: Event) => handlePathChange(ev));
      } else {
        events.onClick = (ev: Event) => handlePathChange(ev);
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
          checked: props.computedKeys.includes(props.option.key),
          indeterminate: false,
        };
      }
      return getCheckedStatus(props.option, props.computedKeys);
    });

    const renderLabelContent = () => {
      if (props.pathLabel) {
        return (
          cascaderCtx?.formatLabel?.(props.option.path) ??
          getOptionLabel(props.option)
        );
      }
      if (cascaderCtx?.slots.option) {
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
      <li class={cls.value} {...events}>
        {props.multiple && (
          <Checkbox
            modelValue={checkedStatus.value.checked}
            indeterminate={checkedStatus.value.indeterminate}
            disabled={props.option.disabled}
            uninjectGroupContext
            onChange={(value: any, ev: Event) => {
              ev.stopPropagation();
              handlePathChange(ev);
              cascaderCtx?.onClickOption(
                props.option,
                !checkedStatus.value.checked
              );
            }}
          />
        )}
        {props.checkStrictly && !props.multiple && (
          <Radio
            modelValue={props.computedKeys.includes(props.option.key)}
            disabled={props.option.disabled}
            uninjectGroupContext
            onChange={(value: any, ev: Event) => {
              ev.stopPropagation();
              handlePathChange(ev);
              cascaderCtx?.onClickOption(props.option, true);
            }}
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
