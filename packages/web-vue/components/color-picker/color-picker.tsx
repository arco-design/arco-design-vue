import { defineComponent, PropType, computed, ref } from 'vue';

import { Size } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import Input from '../input';
import Trigger, { TriggerProps } from '../trigger';
import { colors } from './colors';
import {
  ColorFormat,
  ColorModes,
  ColorObject,
  ColorPickerChangeTrigger,
  LegacyFormat,
  RecentColorsValue,
} from './interface';
import Panel from './panel';
import {
  formatColorState,
  getColorBackground,
  getColorObject,
  normalizeFormat,
  parseColorState,
} from './utils';

export default defineComponent({
  name: 'ColorPicker',
  props: {
    borderless: Boolean,
    clearable: Boolean,
    colorModes: {
      type: Array as PropType<ColorModes>,
      default: () => ['monochrome'],
    },
    enableMultipleGradient: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 色值
     * @en Value
     */
    value: String,
    modelValue: String,
    /**
     * @zh 默认色值
     * @en Default value
     */
    defaultValue: {
      type: String,
      default: '',
    },
    /**
     * @zh 格式化色值
     * @en Value format
     */
    format: {
      type: String as PropType<ColorFormat | LegacyFormat>,
      default: 'RGB',
    },
    /**
     * @zh 尺寸
     * @en Size
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size | 'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * @zh 是否开启透明通道
     * @en Whether alpha channel is enabled
     */
    enableAlpha: Boolean,
    /**
     * @zh 是否展示颜色预览块
     * @en Whether to show primary color preview
     */
    showPrimaryColorPreview: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 输入框透传属性
     * @en Input props
     */
    inputProps: {
      type: Object as PropType<Record<string, unknown>>,
    },
    /**
     * @zh 最近使用颜色
     * @en Recent colors
     */
    recentColors: {
      type: [Array, Boolean] as PropType<RecentColorsValue>,
      default: undefined,
    },
    /**
     * @zh 最近使用颜色，非受控
     * @en Default recent colors
     */
    defaultRecentColors: {
      type: [Array, Boolean] as PropType<RecentColorsValue>,
      default: () => [],
    },
    /**
     * @zh 系统色板
     * @en Swatch colors
     */
    swatchColors: {
      type: Array as PropType<string[] | null>,
      default: undefined,
    },
    /**
     * @zh 是否禁用
     * @en Disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否内联面板。兼容旧版 hideTrigger 语义
     * @en Render panel inline
     */
    hideTrigger: Boolean,
    /**
     * @zh 透传 Trigger 组件属性
     * @en Trigger props
     */
    triggerProps: {
      type: Object as PropType<Partial<TriggerProps>>,
    },
    /**
     * @zh 兼容旧版历史颜色
     * @en Legacy history colors
     */
    historyColors: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 兼容旧版预设颜色
     * @en Legacy preset colors
     */
    presetColors: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 兼容旧版显示文字
     * @en Legacy show text
     */
    showText: Boolean,
    /**
     * @zh 兼容旧版显示历史色
     * @en Legacy show history
     */
    showHistory: Boolean,
    /**
     * @zh 兼容旧版显示预设色
     * @en Legacy show preset
     */
    showPreset: Boolean,
    /**
     * @zh 兼容旧版禁用透明通道
     * @en Legacy disable alpha
     */
    disabledAlpha: Boolean,
    /**
     * @zh 兼容 tdesign 的选择输入框透传属性，当前版本未使用
     * @en Select input props
     */
    selectInputProps: {
      type: Object as PropType<Record<string, unknown>>,
    },
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    'update:value': (_value: string) => true,
    /**
     * @zh 颜色值改变时触发
     * @en Triggered when the color value changes
     */
    'change': (
      _value: string,
      _context: { color: ColorObject; trigger: ColorPickerChangeTrigger },
    ) => true,
    /**
     * @zh 颜色面板展开和收起时触发
     * @en Triggered when the color panel is expanded and collapsed
     */
    'popup-visible-change': (_visible: boolean, _value: string) => true,
    'clear': (_context: { e: MouseEvent }) => true,
    'palette-bar-change': (_context: { color: ColorObject }) => true,
    'recent-colors-change': (_value: string[]) => true,
  },
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('color-picker');
    const innerValue = ref(props.defaultValue);
    const innerRecentColors = ref<string[]>(
      Array.isArray(props.defaultRecentColors) ? props.defaultRecentColors : [],
    );

    const mergedValue = computed(() => {
      return props.modelValue ?? props.value ?? innerValue.value;
    });

    const mergedEnableAlpha = computed(() => props.enableAlpha || !props.disabledAlpha);

    const normalizedFormat = computed(() => normalizeFormat(props.format, mergedEnableAlpha.value));

    const mergedRecentColors = computed(() => {
      if (props.showHistory && props.historyColors) return props.historyColors;
      if (props.recentColors === null || props.recentColors === false) return props.recentColors;
      if (Array.isArray(props.recentColors)) return props.recentColors;
      return innerRecentColors.value;
    });

    const mergedSwatchColors = computed(() => {
      if (props.showPreset) return props.presetColors ?? colors;
      if (props.swatchColors === null) return null;
      if (Array.isArray(props.swatchColors)) return props.swatchColors;
      if (props.swatchColors === undefined && props.showPreset === false) return null;
      return colors;
    });

    const colorState = computed(() => parseColorState(mergedValue.value, props.colorModes));
    const triggerInputValue = computed(() => {
      if (!mergedValue.value) return '';
      return formatColorState(colorState.value, normalizedFormat.value, mergedEnableAlpha.value);
    });
    const previewStyle = computed(() => {
      const background = getColorBackground(colorState.value);
      return colorState.value.mode === 'linear-gradient'
        ? { backgroundImage: background }
        : { backgroundColor: background };
    });

    const syncValue = (value: string) => {
      if (props.modelValue === undefined && props.value === undefined) {
        innerValue.value = value;
      }
      emit('update:modelValue', value);
      emit('update:value', value);
    };

    const syncRecentColors = (value: string[]) => {
      if (props.recentColors === undefined) {
        innerRecentColors.value = value;
      }
      emit('recent-colors-change', value);
    };

    const emitChange = (value: string, trigger: ColorPickerChangeTrigger) => {
      syncValue(value);
      emit('change', value, {
        color: getColorObject(parseColorState(value, props.colorModes)),
        trigger,
      });
    };

    const handleColorChange = (value: string, trigger: ColorPickerChangeTrigger) => {
      if (props.disabled) return;
      emitChange(value, trigger);
    };

    const handleClear = (event: MouseEvent) => {
      syncValue('');
      emit('clear', { e: event });
      emit('change', '', {
        color: getColorObject(parseColorState('', props.colorModes)),
        trigger: 'clear',
      });
    };

    const handleTriggerInputChange = (value: string) => {
      if (!value) {
        handleClear(new MouseEvent('click'));
        return;
      }
      const nextState = parseColorState(value, props.colorModes);
      handleColorChange(
        formatColorState(nextState, normalizedFormat.value, mergedEnableAlpha.value),
        'input',
      );
    };

    const onPopupVisibleChange = (visible: boolean) => {
      emit('popup-visible-change', visible, triggerInputValue.value);
    };

    const mergedTriggerProps = computed(
      () =>
        ({
          trigger: 'click',
          position: 'bl',
          disabled: props.disabled,
          popupOffset: 4,
          animationName: 'slide-dynamic-origin',
          ...props.triggerProps,
        }) satisfies Partial<TriggerProps>,
    );

    const renderTriggerInput = () => {
      return (
        <div
          class={{
            [prefixCls]: true,
            [`${prefixCls}-size-${props.size}`]: props.size,
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-borderless`]: props.borderless,
          }}
        >
          <Input
            class={`${prefixCls}-trigger-input`}
            size={props.size === 'mini' ? 'mini' : (props.size as Size)}
            allowClear={props.clearable}
            disabled={props.disabled}
            modelValue={triggerInputValue.value}
            onChange={handleTriggerInputChange}
            onClear={handleClear}
            {...props.inputProps}
            v-slots={{
              prefix: () => <div class={`${prefixCls}-preview`} style={previewStyle.value} />,
            }}
          />
        </div>
      );
    };

    const renderPanel = () => {
      return (
        <Panel
          value={mergedValue.value}
          colorModes={props.colorModes}
          enableMultipleGradient={props.enableMultipleGradient}
          recentColors={mergedRecentColors.value as string[] | boolean | null}
          swatchColors={mergedSwatchColors.value}
          disabled={props.disabled}
          enableAlpha={mergedEnableAlpha.value}
          format={normalizedFormat.value}
          showPrimaryColorPreview={props.showPrimaryColorPreview}
          onChange={handleColorChange}
          onRecentColorsChange={syncRecentColors}
          onPaletteBarChange={(context) => {
            emit('palette-bar-change', context);
          }}
        />
      );
    };

    return () => {
      return props.hideTrigger ? (
        renderPanel()
      ) : (
        <Trigger
          v-slots={{ content: renderPanel }}
          onPopupVisibleChange={onPopupVisibleChange}
          {...mergedTriggerProps.value}
        >
          {slots.default ? slots.default() : renderTriggerInput()}
        </Trigger>
      );
    };
  },
});
