import { PropType, computed, defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { hexToRgb, rgbToHsv } from '../_utils/color';
import { Color, HSV } from './interface';
import { useI18n } from '../locale';
import useState from '../_hooks/use-state';
import ControlBar from './control-bar';
import Palette from './palette';
import Select from '../select';
import InputRgb from './input-rgb';
import InputHex from './input-hex';

export default defineComponent({
  name: 'Panel',
  props: {
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
    alpha: {
      type: Number,
      required: true,
    },
    colorString: String,
    disabled: Boolean,
    disabledAlpha: Boolean,
    showHistory: Boolean,
    showPreset: Boolean,
    format: String as PropType<'hex' | 'rgb'>,
    historyColors: Array as PropType<string[]>,
    presetColors: Array as PropType<string[]>,
    /**
     * @zh 显示调色板
     * @en show palette
     */
    showPalette: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 显示控制条
     * @en show control bar
     */
    showControls: {
      type: Boolean,
      default: true,
    },
    onAlphaChange: Function as PropType<(alpha: number) => void>,
    onHsvChange: Function as PropType<(hsv: HSV) => void>,
  },
  setup(props, { slots }) {
    const { t } = useI18n();
    const prefixCls = getPrefixCls('color-picker');
    const hsv = computed(() => props.color.hsv);
    const [format, setFormat] = useState<'hex' | 'rgb'>(props.format || 'hex');

    const onChange = (value: any) => {
      setFormat(value);
    };

    const showCopy = ref(false);

    const onHexInputChange = (value: string) => {
      const _rgb = hexToRgb(value) || { r: 255, g: 0, b: 0 };
      const _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
      props.onHsvChange?.(_hsv);
    };

    const renderInput = () => {
      const commonProps = {
        color: props.color,
        alpha: props.alpha,
        disabled: props.disabled,
        disabledAlpha: props.disabledAlpha,
        onHsvChange: props.onHsvChange,
        onAlphaChange: props.onAlphaChange,
      };
      if (format.value === 'rgb') {
        return <InputRgb {...commonProps} />;
      }
      return <InputHex {...commonProps} />;
    };

    const renderColorBlock = (color: string) => {
      return (
        <div
          key={color}
          class={`${prefixCls}-color-block`}
          style={{ backgroundColor: color }}
          onClick={() => onHexInputChange(color)}
        >
          <div
            class={`${prefixCls}-block`}
            style={{ backgroundColor: color }}
          />
        </div>
      );
    };

    const renderColorSection = (
      text: string,
      colors: string[] | undefined,
      type: 'history' | 'preset'
    ) => (
      <div class={`${prefixCls}-colors-section`}>
        {slots[`${type}-title`]?.() ?? (
          <div class={`${prefixCls}-colors-text`}>{text}</div>
        )}
        <div class={`${prefixCls}-colors-wrapper`}>
          {colors?.length ? (
            <div class={`${prefixCls}-colors-list`}>
              {colors.map(renderColorBlock)}
            </div>
          ) : (
            <span class={`${prefixCls}-colors-empty`}>
              {t('colorPicker.empty')}
            </span>
          )}
        </div>
      </div>
    );

    const defaultPalette = () => (
      <Palette
        color={props.color}
        onChange={(s, v) => props.onHsvChange?.({ h: hsv.value.h, s, v })}
      />
    );

    const defaultControls = () => (
      <div class={`${prefixCls}-panel-control`}>
        <div class={`${prefixCls}-control-wrapper`}>
          <div>
            <ControlBar
              type="hue"
              x={hsv.value.h}
              color={props.color}
              colorString={props.colorString}
              onChange={(h) =>
                props.onHsvChange?.({ h, s: hsv.value.s, v: hsv.value.v })
              }
            />
            {!props.disabledAlpha && (
              <ControlBar
                type="alpha"
                x={props.alpha}
                color={props.color}
                colorString={props.colorString}
                onChange={props.onAlphaChange}
              />
            )}
          </div>
          <div
            class={`${prefixCls}-preview`}
            style={{ backgroundColor: props.colorString }}
          />
        </div>
        <div class={`${prefixCls}-input-wrapper`}>
          <Select
            class={`${prefixCls}-select`}
            size="mini"
            trigger-props={{ class: `${prefixCls}-select-popup` }}
            options={[
              {
                value: 'hex',
                label: 'Hex',
              },
              {
                value: 'rgb',
                label: 'RGB',
              },
            ]}
            modelValue={format.value}
            onChange={onChange}
          />
          <div class={`${prefixCls}-group-wrapper`}>{renderInput()}</div>
        </div>
      </div>
    );

    const defaultColorSection = () => (
      <div
        class={{
          [`${prefixCls}-panel-colors`]: true,
          [`${prefixCls}-panel-colors-only`]:
            !props.showPalette && !props.showControls,
        }}
      >
        {props.showHistory &&
          renderColorSection(
            t('colorPicker.history'),
            props.historyColors,
            'history'
          )}
        {props.showPreset &&
          renderColorSection(
            t('colorPicker.preset'),
            props.presetColors,
            'preset'
          )}
      </div>
    );

    const renderPalette = () => {
      if (!props.showPalette) return null;
      return slots.palette?.({ palette: defaultPalette }) ?? defaultPalette();
    };

    const renderControls = () => {
      if (!props.showControls) return null;
      return (
        slots.controls?.({ controls: defaultControls }) ?? defaultControls()
      );
    };

    const renderColorSec = () => {
      if (props.showHistory || props.showPreset) {
        return (
          slots['color-section']?.({ colorSection: defaultColorSection }) ??
          defaultColorSection()
        );
      }
      return null;
    };

    return () => {
      return (
        <div
          class={{
            [`${prefixCls}-panel`]: true,
            [`${prefixCls}-panel-disabled`]: props.disabled,
          }}
        >
          {renderPalette()}
          {renderControls()}
          {renderColorSec()}
        </div>
      );
    };
  },
});
