import { computed, defineComponent, PropType } from 'vue';
import Checkbox from '../checkbox';
import { getPrefixCls } from '../_utils/global-config';
import { CascaderOptionInfo } from './interface';
import IconRight from '../icon/icon-right';
import { getCheckedStatus } from './utils';

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

    const checkedStatus = computed(() =>
      getCheckedStatus(props.option, props.computedKeys)
    );

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
        <div class={`${prefixCls}-label`}>
          {props.option.label}
          {!props.option.isLeaf && <IconRight />}
        </div>
      </li>
    );
  },
});
