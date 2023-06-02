import { computed, defineComponent, inject, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import Checkbox from '../checkbox';
import IconClose from '../icon/icon-close';
import { TransferItem } from './interface';
import { transferInjectionKey } from './context';

export default defineComponent({
  name: 'TransferListItem',
  props: {
    type: {
      type: String as PropType<'source' | 'target'>,
    },
    data: {
      type: Object as PropType<TransferItem>,
      required: true,
    },
    allowClear: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    draggable: {
      type: Boolean,
    },
    simple: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('transfer-list-item');
    const transferCtx = inject(transferInjectionKey, undefined);

    const handleClick = () => {
      if (!props.simple) {
        return;
      }

      transferCtx?.moveTo(
        [props.data.value],
        props.type === 'target' ? 'source' : 'target'
      );
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-draggable`]: props.draggable,
      },
    ]);

    const handleRemove = () => {
      transferCtx?.moveTo([props.data.value], 'source');
    };

    return () => (
      <div class={cls.value} onClick={handleClick}>
        {props.allowClear || props.simple ? (
          <span class={`${prefixCls}-content`}>
            {transferCtx?.slots.item?.({
              label: props.data.label,
              value: props.data.value,
            }) ?? props.data.label}
          </span>
        ) : (
          <Checkbox
            class={[`${prefixCls}-content`, `${prefixCls}-checkbox`]}
            modelValue={transferCtx?.selected}
            value={props.data.value}
            onChange={(value: unknown) =>
              transferCtx?.onSelect(value as string[])
            }
            uninjectGroupContext
            disabled={props.disabled}
          >
            {transferCtx?.slots.item?.({
              label: props.data.label,
              value: props.data.value,
            }) ?? props.data.label}
          </Checkbox>
        )}
        {props.allowClear && !props.disabled && (
          <IconHover
            class={`${prefixCls}-remove-btn`}
            // @ts-ignore
            onClick={handleRemove}
          >
            <IconClose />
          </IconHover>
        )}
      </div>
    );
  },
});
