import { computed, defineComponent, PropType } from 'vue';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { getPrefixCls } from '../_utils/global-config';
import { CascaderOptionInfo } from './interface';
import IconRight from '../icon/icon-right';
import { getCheckedStatus } from './utils';
import { isFunction } from '../_utils/is';

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
    isActive: Boolean,
    multiple: Boolean,
    expandTrigger: {
      type: String,
    },
    checkStrictly: Boolean,
    searchOption: Boolean,
  },
  emits: ['clickOption', 'activeChange', 'pathChange'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('cascader-option');

    const events: Record<string, any> = {};

    if (!props.option.disabled) {
      events.onMouseenter = [() => emit('activeChange', props.option)];
      events.onMouseleave = () => emit('activeChange');
      if (props.option.isLeaf && !props.multiple) {
        events.onClick = () => {
          emit('clickOption', props.option);
          emit('pathChange', props.option);
        };
      } else if (props.expandTrigger === 'hover') {
        events.onMouseenter.push(() => emit('pathChange', props.option));
      } else {
        events.onClick = () => emit('pathChange', props.option);
      }
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.isActive,
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
      if (isFunction(props.option.render)) {
        return props.option.render();
      }
      return props.option.label;
    };

    return () => (
      <li class={cls.value} {...events}>
        {props.multiple && (
          <Checkbox
            modelValue={checkedStatus.value.checked}
            indeterminate={checkedStatus.value.indeterminate}
            disabled={props.option.disabled}
            onClick={(e: Event) => {
              emit('clickOption', props.option, !checkedStatus.value.checked);
              emit('pathChange', props.option);
            }}
          />
        )}
        {props.checkStrictly && !props.multiple && (
          <Radio
            modelValue={props.computedKeys.includes(props.option.key)}
            disabled={props.option.disabled}
            onClick={(e: Event) => {
              emit('clickOption', props.option, true);
              emit('pathChange', props.option);
            }}
          />
        )}
        <div class={`${prefixCls}-label`}>
          {renderLabelContent()}
          {!props.searchOption && !props.option.isLeaf && <IconRight />}
        </div>
      </li>
    );
  },
});
