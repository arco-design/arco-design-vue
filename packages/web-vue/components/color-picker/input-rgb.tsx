import { defineComponent, PropType, toRefs, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Color, HSV, RGB } from './interface';
import { rgbToHsv } from '../_utils/color';
import { InputGroup } from '../input';
import InputNumber from '../input-number';
import InputAlpha from './input-alpha';
import { colorPickerInjectionKey } from './context';

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
    const colorPickerCtx = inject(colorPickerInjectionKey);

    const handleChange = (value: Partial<RGB>) => {
      const newRGB = { ...color.value.rgb, ...value };
      const rgba = colorPickerCtx?.defaultRgba();
      if (
        newRGB.r === 0 &&
        newRGB.g === 0 &&
        newRGB.b === 0 &&
        colorPickerCtx?.clearColor === false
      ) {
        colorPickerCtx.clearColor = true;
        newRGB.r = rgba?.r ?? 0;
      }
      const hsv = rgbToHsv(newRGB.r, newRGB.g, newRGB.b);
      props.onHsvChange?.(hsv);
    };

    const renderInput = (channel: keyof RGB) => {
      if (colorPickerCtx?.isEmptyColor) {
        const rgb = colorPickerCtx?.defaultRgba();
        return (
          <InputNumber
            key={channel}
            size="mini"
            min={0}
            max={255}
            disabled={props.disabled || colorPickerCtx?.isEmptyColor}
            modelValue={rgb[channel]}
            hideButton
            onChange={(val = 0) => handleChange({ [channel]: val })}
          />
        );
      }
      return (
        <InputNumber
          key={channel}
          size="mini"
          min={0}
          max={255}
          disabled={props.disabled || colorPickerCtx?.isEmptyColor}
          modelValue={color.value.rgb[channel]}
          hideButton
          onChange={(val = 0) => handleChange({ [channel]: val })}
        />
      );
    };

    return () => (
      <InputGroup class={`${prefixCls}-input-group`}>
        {(['r', 'g', 'b'] as Array<keyof RGB>).map((channel) =>
          renderInput(channel)
        )}
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
