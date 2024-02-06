import { defineComponent, PropType, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Color, HSV, RGB } from './interface';
import { rgbToHsv } from '../_utils/color';
import { InputGroup } from '../input';
import InputNumber from '../input-number';
import InputAlpha from './input-alpha';

export default defineComponent({
  name: 'InputRgb',
  props: {
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
    alpha: {
      type: Number,
      required: true,
    },
    disabled: Boolean,
    disabledAlpha: Boolean,
    onHsvChange: Function as PropType<(value: HSV) => void>,
    onAlphaChange: Function as PropType<(value: number) => void>,
  },
  setup(props) {
    const prefixCls = getPrefixCls('color-picker');
    const { color } = toRefs(props);

    const handleChange = (value: Partial<RGB>) => {
      const newRGB = { ...color.value.rgb, ...value };
      const hsv = rgbToHsv(newRGB.r, newRGB.g, newRGB.b);
      props.onHsvChange?.(hsv);
    };

    return () => (
      <InputGroup class={`${prefixCls}-input-group`}>
        {(['r', 'g', 'b'] as Array<keyof RGB>).map((channel) => (
          <InputNumber
            key={channel}
            size="mini"
            min={0}
            max={255}
            disabled={props.disabled}
            modelValue={color.value.rgb[channel]}
            hideButton
            onChange={(val = 0) => handleChange({ [channel]: val })}
          />
        ))}
        {!props.disabledAlpha && (
          <InputAlpha
            disabled={props.disabled}
            value={props.alpha}
            onChange={props.onAlphaChange}
          />
        )}
      </InputGroup>
    );
  },
});
