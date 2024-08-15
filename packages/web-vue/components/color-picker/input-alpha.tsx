import { defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import InputNumber from '../input-number';

export default defineComponent({
  name: 'InputAlpha',
  props: {
    value: {
      type: Number,
      required: true,
    },
    disabled: Boolean,
    onChange: Function as PropType<(value: number) => void>,
  },
  setup(props) {
    const prefixCls = getPrefixCls('color-picker');

    return () => (
      <InputNumber
        class={`${prefixCls}-input-alpha`}
        size="mini"
        v-slots={{ suffix: () => '%' }}
        min={0}
        max={100}
        disabled={props.disabled}
        modelValue={Math.round(props.value * 100)}
        onChange={(a = 100) => props.onChange?.(a / 100)}
      />
    );
  },
});
