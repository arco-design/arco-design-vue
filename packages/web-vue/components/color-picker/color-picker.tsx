import { defineComponent, PropType, computed, watch } from 'vue';
import { Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { colors } from './colors';
import { HSV } from './interface';
import Panel from './panel';
import Trigger, { TriggerProps } from '../trigger';
import useState from '../_hooks/use-state';
import {
  formatInputToHSVA,
  hsvToRgb,
  rgbaToHex,
  rgbToHex,
} from '../_utils/color';

export default defineComponent({
  name: 'ColorPicker',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: String,
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: String,
    },
    /**
     * @zh 颜色值的格式
     * @en Color value format
     */
    format: {
      type: String as PropType<'hex' | 'rgb'>,
    },
    /**
     * @zh 尺寸
     * @en Size
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
    },
    /**
     * @zh 显示颜色值
     * @en Show color value
     */
    showText: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 显示历史颜色
     * @en Show history colors
     */
    showHistory: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 显示预设颜色
     * @en Show preset colors
     */
    showPreset: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 禁用
     * @en disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 禁用透明通道
     * @en Disable transparency channel
     */
    disabledAlpha: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 没有触发元素，只显示颜色面板
     * @en There is no trigger element, only the color panel is displayed
     * */
    hideTrigger: {
      type: Boolean,
    },
    /**
     * @zh 接受所有 [Trigger](/vue/component/trigger) 组件的Props
     * @en Can accept Props of all [Trigger](/vue/component/trigger) components
     * */
    triggerProps: {
      type: Object as PropType<Partial<TriggerProps>>,
    },
    /**
     * @zh 历史颜色的颜色数组
     * @en Color array of historical colors
     */
    historyColors: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 预设颜色的颜色数组
     * @en Color array of preset colors
     */
    presetColors: {
      type: Array as PropType<string[]>,
      default: () => colors,
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
    /**
     * @zh 颜色值改变时触发
     * @en Triggered when the color value changes
     * @param {string} value
     */
    'change': (value: string) => true,
    /**
     * @zh 颜色面板展开和收起时触发
     * @en Triggered when the color panel is expanded and collapsed
     * @param {boolean} visible
     * @param {string} value
     */
    'popup-visible-change': (visible: boolean, value: string) => true,
  },
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('color-picker');
    const mergeValue = computed(() => {
      return props.modelValue ?? props.defaultValue;
    });

    const formatInput = computed(() => {
      return formatInputToHSVA(mergeValue.value || '');
    });

    const [alpha, setAlpha] = useState(formatInput.value.a);
    const [hsv, setHsv] = useState({
      h: formatInput.value.h,
      s: formatInput.value.s,
      v: formatInput.value.v,
    });

    watch(
      () => formatInput.value,
      (value) => {
        if (mergeValue.value !== formatValue.value) {
          setAlpha(value.a);
          setHsv({
            h: value.h,
            s: value.s,
            v: value.v,
          });
        }
      }
    );

    const color = computed(() => {
      const rgb = hsvToRgb(hsv.value.h, hsv.value.s, hsv.value.v);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      return {
        hsv: hsv.value,
        rgb,
        hex,
      };
    });

    const colorString = computed(() => {
      const { r, g, b } = color.value.rgb;
      return `rgba(${r}, ${g}, ${b}, ${alpha.value.toFixed(2)})`;
    });

    const formatValue = computed(() => {
      const { r, g, b } = color.value.rgb;
      if (props.format === 'rgb') {
        return alpha.value < 1 && !props.disabledAlpha
          ? `rgba(${r}, ${g}, ${b}, ${alpha.value.toFixed(2)})`
          : `rgb(${r}, ${g}, ${b})`;
      }
      return alpha.value < 1 && !props.disabledAlpha
        ? `#${rgbaToHex(r, g, b, alpha.value)}`
        : `#${rgbToHex(r, g, b)}`;
    });

    watch(formatValue, (value) => {
      emit('update:modelValue', value);
      emit('change', value);
    });

    const onHsvChange = (_value: HSV) => {
      !props.disabled && setHsv(_value);
    };

    const onAlphaChange = (_value: number) => {
      !props.disabled && setAlpha(_value);
    };

    const onPopupVisibleChange = (visible: boolean) => {
      emit('popup-visible-change', visible, formatValue.value);
    };

    const renderInput = () => {
      return (
        <div
          class={{
            [prefixCls]: true,
            [`${prefixCls}-size-${props.size}`]: props.size,
            [`${prefixCls}-disabled`]: props.disabled,
          }}
        >
          <div
            class={`${prefixCls}-preview`}
            style={{ backgroundColor: formatValue.value }}
          />
          {props.showText && (
            <div class={`${prefixCls}-value`}>{formatValue.value}</div>
          )}
          <input
            class={`${prefixCls}-input`}
            value={formatValue.value}
            disabled={props.disabled}
          />
        </div>
      );
    };

    const renderPanel = () => {
      return (
        <Panel
          color={color.value}
          alpha={alpha.value}
          colorString={colorString.value}
          historyColors={props.historyColors}
          presetColors={props.presetColors}
          showHistory={props.showHistory}
          showPreset={props.showPreset}
          disabled={props.disabled}
          disabledAlpha={props.disabledAlpha}
          format={props.format}
          onHsvChange={onHsvChange}
          onAlphaChange={onAlphaChange}
        />
      );
    };

    return () => {
      return props.hideTrigger ? (
        renderPanel()
      ) : (
        <Trigger
          v-slots={{ content: renderPanel }}
          trigger="click"
          position="bl"
          animationName="slide-dynamic-origin"
          popupOffset={4}
          disabled={props.disabled}
          onPopupVisibleChange={onPopupVisibleChange}
          {...props.triggerProps}
        >
          {slots.default ? slots.default() : renderInput()}
        </Trigger>
      );
    };
  },
});
