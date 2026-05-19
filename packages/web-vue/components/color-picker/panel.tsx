import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { useDraggable } from '@vueuse/core';

import { getPrefixCls } from '../_utils/global-config';
import Input, { InputGroup } from '../input';
import InputNumber from '../input-number';
import Radio from '../radio';
import Select from '../select';
import { colors } from './colors';
import ControlBar from './control-bar';
import {
  Color,
  ColorFormat,
  GradientColorPoint,
  ColorModes,
  ColorObject,
  ColorPickerChangeTrigger,
  ColorValueState,
  HSVA,
  RecentColorsValue,
} from './interface';
import Palette from './palette';
import {
  TD_COLOR_USED_COLORS_MAX_SIZE,
  addGradientColor,
  formatColor,
  formatColorState,
  getActiveGradientPoint,
  getColorBackground,
  getColorObject,
  getDefaultColorState,
  getDefaultGradientState,
  getFormatInputs,
  getGradientThumbBackground,
  getLinearGradientString,
  normalizeFormat,
  parseColorState,
  parseFormatInputValues,
  removeGradientColor,
  round,
  setActiveColorHsva,
  setGradientColors,
  setGradientDegree,
  setGradientSelectedPoint,
} from './utils';

const MODE_OPTIONS = [
  { value: 'monochrome', label: '单色' },
  { value: 'linear-gradient', label: '渐变' },
] as const;

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const getGradientPointComparableColor = (point: GradientColorPoint) =>
  formatColor(point.hsva, 'CSS', true);

const matchGradientPoint = (
  previousPoints: GradientColorPoint[],
  nextPoint: GradientColorPoint,
  usedIds: Set<string>,
) => {
  const availablePoints = previousPoints.filter((point) => !usedIds.has(point.id));

  if (!availablePoints.length) {
    return undefined;
  }

  const nextColor = getGradientPointComparableColor(nextPoint);
  const sameColorPoints = availablePoints.filter(
    (point) => getGradientPointComparableColor(point) === nextColor,
  );
  const candidates = sameColorPoints.length ? sameColorPoints : availablePoints;

  return candidates.reduce<GradientColorPoint | undefined>((closestPoint, point) => {
    if (!closestPoint) {
      return point;
    }

    return Math.abs(point.left - nextPoint.left) < Math.abs(closestPoint.left - nextPoint.left)
      ? point
      : closestPoint;
  }, undefined);
};

const reconcileGradientState = (previousState: ColorValueState, nextState: ColorValueState) => {
  if (previousState.mode !== 'linear-gradient' || nextState.mode !== 'linear-gradient') {
    return nextState;
  }

  const usedIds = new Set<string>();
  const nextColors = nextState.gradientColors.map((point) => {
    const matchedPoint = matchGradientPoint(previousState.gradientColors, point, usedIds);

    if (!matchedPoint) {
      return point;
    }

    usedIds.add(matchedPoint.id);

    return {
      ...point,
      id: matchedPoint.id,
    } satisfies GradientColorPoint;
  });

  const selectedPoint =
    nextColors.find((point) => point.id === previousState.gradientSelectedId) || nextColors[0];

  return {
    ...nextState,
    gradientColors: nextColors,
    gradientSelectedId: selectedPoint?.id || '',
    hsva: selectedPoint?.hsva || nextState.hsva,
  } satisfies ColorValueState;
};

const GradientThumb = defineComponent({
  name: 'GradientThumb',
  props: {
    point: {
      type: Object as PropType<GradientColorPoint>,
      required: true,
    },
    prefixCls: {
      type: String,
      required: true,
    },
    active: Boolean,
    disabled: Boolean,
    onSelect: Function as PropType<() => void>,
    onMove: Function as PropType<(clientX: number) => void>,
    onRemove: Function as PropType<() => void>,
  },
  setup(props) {
    const thumbRef = ref<HTMLElement>();
    const shouldIgnoreClick = ref(false);

    useDraggable(thumbRef, {
      axis: 'x',
      buttons: [0, -1],
      disabled: computed(() => props.disabled),
      preventDefault: true,
      stopPropagation: true,
      onStart: () => {
        props.onSelect?.();
        shouldIgnoreClick.value = false;
      },
      onMove: (_, event) => {
        shouldIgnoreClick.value = true;
        props.onMove?.(event.clientX);
      },
      onEnd: () => {
        window.setTimeout(() => {
          shouldIgnoreClick.value = false;
        }, 0);
      },
    });

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (shouldIgnoreClick.value) {
        return;
      }
      props.onSelect?.();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        props.onRemove?.();
      }
    };

    return () => (
      <button
        ref={thumbRef}
        type="button"
        class={{
          [`${props.prefixCls}-gradient-thumb`]: true,
          [`${props.prefixCls}-gradient-thumb-active`]: props.active,
        }}
        style={{ left: `${props.point.left}%` }}
        onClick={handleClick}
        onKeydown={handleKeyDown}
      >
        <span
          class={`${props.prefixCls}-gradient-thumb-inner`}
          style={{ backgroundColor: formatColor(props.point.hsva, 'CSS', true) }}
        />
      </button>
    );
  },
});

export default defineComponent({
  name: 'Panel',
  props: {
    value: {
      type: String,
      default: '',
    },
    colorModes: {
      type: Array as PropType<ColorModes>,
      default: () => ['monochrome'],
    },
    enableMultipleGradient: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    enableAlpha: Boolean,
    showPrimaryColorPreview: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String as PropType<ColorFormat>,
      default: 'RGB',
    },
    recentColors: {
      type: [Array, Boolean] as PropType<RecentColorsValue>,
      default: () => [],
    },
    swatchColors: {
      type: Array as PropType<string[] | null>,
      default: () => colors,
    },
    onChange: Function as PropType<(value: string, trigger: ColorPickerChangeTrigger) => void>,
    onRecentColorsChange: Function as PropType<(value: string[]) => void>,
    onPaletteBarChange: Function as PropType<(context: { color: ColorObject }) => void>,
  },
  setup(props) {
    const prefixCls = getPrefixCls('color-picker');
    const sliderRef = ref<HTMLElement>();
    const gradientShellRef = ref<HTMLElement>();
    const colorState = ref<ColorValueState>(parseColorState(props.value, props.colorModes));
    const selectedFormat = ref<ColorFormat>(normalizeFormat(props.format, props.enableAlpha));
    const formatDrafts = ref<string[]>([]);

    const activeHsva = computed(
      () => getActiveGradientPoint(colorState.value)?.hsva || colorState.value.hsva,
    );

    const syncDrafts = () => {
      formatDrafts.value = getFormatInputs(
        activeHsva.value,
        selectedFormat.value,
        props.enableAlpha,
      );
    };

    watch(
      () => [props.value, props.colorModes] as const,
      () => {
        colorState.value = reconcileGradientState(
          colorState.value,
          parseColorState(props.value, props.colorModes),
        );
        syncDrafts();
      },
      { deep: true },
    );

    watch(
      () => [props.format, props.enableAlpha] as const,
      () => {
        selectedFormat.value = normalizeFormat(props.format, props.enableAlpha);
        syncDrafts();
      },
    );

    syncDrafts();

    const formatOptions = computed(() => {
      const base: Array<{ value: ColorFormat; label: string }> = [
        { value: 'HEX', label: 'HEX' },
        { value: 'RGB', label: 'RGB' },
        { value: 'HSL', label: 'HSL' },
        { value: 'HSV', label: 'HSV' },
        { value: 'CMYK', label: 'CMYK' },
        { value: 'CSS', label: 'CSS' },
      ];

      if (!props.enableAlpha) {
        return base;
      }

      return [
        { value: 'HEX8', label: 'HEX8' },
        { value: 'RGBA', label: 'RGBA' },
        { value: 'HSLA', label: 'HSLA' },
        { value: 'HSVA', label: 'HSVA' },
        ...base,
      ];
    });

    const previewColor = computed(() => getColorBackground(colorState.value));
    const colorModel = computed<Color>(() => {
      const colorObject = getColorObject(colorState.value);
      return {
        hsv: {
          h: activeHsva.value.h,
          s: activeHsva.value.s,
          v: activeHsva.value.v,
        },
        rgb: {
          r: colorObject.red,
          g: colorObject.green,
          b: colorObject.blue,
        },
        hex: colorObject.hex.replace('#', ''),
      };
    });
    const recentColorList = computed(() => {
      if (!Array.isArray(props.recentColors)) return undefined;
      const onlyGradient =
        props.colorModes.length === 1 && props.colorModes[0] === 'linear-gradient';
      return onlyGradient
        ? props.recentColors.filter((item) => item.startsWith('linear-gradient('))
        : props.recentColors;
    });
    const swatchColorList = computed(() => {
      if (!Array.isArray(props.swatchColors)) return undefined;
      const onlyGradient =
        props.colorModes.length === 1 && props.colorModes[0] === 'linear-gradient';
      return onlyGradient
        ? props.swatchColors.filter((item) => item.startsWith('linear-gradient('))
        : props.swatchColors;
    });

    const emitStateChange = (
      nextState: ColorValueState,
      trigger: ColorPickerChangeTrigger,
      notifyPaletteBar?: boolean,
    ) => {
      colorState.value = nextState;
      syncDrafts();
      props.onChange?.(
        formatColorState(nextState, selectedFormat.value, props.enableAlpha),
        trigger,
      );
      if (notifyPaletteBar) {
        props.onPaletteBarChange?.({ color: getColorObject(nextState) });
      }
    };

    const handleHsvaChange = (
      nextHsva: HSVA,
      trigger: ColorPickerChangeTrigger,
      notifyPaletteBar?: boolean,
    ) => {
      emitStateChange(setActiveColorHsva(colorState.value, nextHsva), trigger, notifyPaletteBar);
    };

    const handleModeChange = (mode: string | number | boolean) => {
      if (props.disabled || typeof mode !== 'string' || mode === colorState.value.mode) return;
      if (mode === 'linear-gradient') {
        emitStateChange(
          getDefaultGradientState(formatColor(activeHsva.value, 'CSS', true)),
          'input',
        );
        return;
      }

      emitStateChange(
        {
          ...getDefaultColorState(),
          mode: 'monochrome',
          hsva: activeHsva.value,
        },
        'input',
      );
    };

    const updateDraft = (index: number, value: string) => {
      const nextDrafts = [...formatDrafts.value];
      nextDrafts[index] = value;
      formatDrafts.value = nextDrafts;
    };

    const commitDrafts = () => {
      const nextHsva = parseFormatInputValues(
        formatDrafts.value,
        selectedFormat.value,
        props.enableAlpha,
      );
      handleHsvaChange(nextHsva, 'input');
    };

    const getThumbTrackRect = () => {
      const slider = sliderRef.value || gradientShellRef.value;
      return slider?.getBoundingClientRect();
    };

    const updateThumbLeft = (pointId: string, clientX: number) => {
      const rect = getThumbTrackRect();
      if (!rect) return;
      const nextLeft = clampPercent(((clientX - rect.left) / rect.width) * 100);
      const gradientColors = colorState.value.gradientColors.map((point) =>
        point.id === pointId
          ? {
              ...point,
              left: round(nextLeft, 2),
            }
          : point,
      );
      emitStateChange(setGradientColors(colorState.value, gradientColors), 'input');
    };

    const handleGradientBarClick = (event: MouseEvent) => {
      if (
        props.disabled ||
        !props.enableMultipleGradient ||
        colorState.value.mode !== 'linear-gradient'
      )
        return;
      if (event.target !== sliderRef.value && event.target !== gradientShellRef.value) return;
      const slider = sliderRef.value || gradientShellRef.value;
      if (!slider) return;
      const rect = slider.getBoundingClientRect();
      const left = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
      emitStateChange(addGradientColor(colorState.value, left), 'input');
    };

    const handleGradientBarKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        !props.disabled &&
        props.enableMultipleGradient
      ) {
        event.preventDefault();
        emitStateChange(addGradientColor(colorState.value, 50), 'input');
      }
    };

    const handleThumbRemove = (pointId: string) => {
      if (colorState.value.gradientColors.length <= 2) {
        return;
      }
      emitStateChange(removeGradientColor(colorState.value, pointId), 'input');
    };

    const addRecentColor = () => {
      if (props.recentColors === null || props.recentColors === false) return;
      const currentValue = formatColorState(
        colorState.value,
        selectedFormat.value,
        props.enableAlpha,
      );
      const next = [...(recentColorList.value || [])];
      const index = next.indexOf(currentValue);
      if (index !== -1) {
        next.splice(index, 1);
      }
      next.unshift(currentValue);
      if (next.length > TD_COLOR_USED_COLORS_MAX_SIZE) {
        next.length = TD_COLOR_USED_COLORS_MAX_SIZE;
      }
      props.onRecentColorsChange?.(next);
    };

    const renderColorBlock = (value: string, trigger: 'recent' | 'preset') => {
      const isGradient = value.startsWith('linear-gradient(');
      const style = isGradient ? { backgroundImage: value } : { backgroundColor: value };
      return (
        <button
          key={value}
          type="button"
          class={`${prefixCls}-color-block`}
          aria-label={`选择颜色 ${value}`}
          onClick={() => emitStateChange(parseColorState(value, props.colorModes), trigger)}
        >
          <div class={`${prefixCls}-block`} style={style} />
        </button>
      );
    };

    const renderColorSection = (
      text: string,
      values: string[] | undefined,
      trigger: 'recent' | 'preset',
    ) => (
      <div class={`${prefixCls}-colors-section`}>
        <div class={`${prefixCls}-colors-header`}>
          <div class={`${prefixCls}-colors-text`}>{text}</div>
          {trigger === 'recent' && values && (
            <button type="button" class={`${prefixCls}-colors-action`} onClick={addRecentColor}>
              添加当前颜色
            </button>
          )}
        </div>
        <div class={`${prefixCls}-colors-wrapper`}>
          {values?.length ? (
            <div class={`${prefixCls}-colors-list`}>
              {values.map((value) => renderColorBlock(value, trigger))}
            </div>
          ) : (
            <span class={`${prefixCls}-colors-empty`}>暂无颜色</span>
          )}
        </div>
      </div>
    );

    const renderColorSec = () => {
      const showRecent = Boolean(recentColorList.value);
      const showSwatches = Boolean(swatchColorList.value?.length);
      if (showRecent || showSwatches) {
        return (
          <div class={`${prefixCls}-panel-colors`}>
            {showRecent && renderColorSection('最近使用', recentColorList.value, 'recent')}
            {showSwatches && renderColorSection('系统色板', swatchColorList.value, 'preset')}
          </div>
        );
      }
      return null;
    };

    const renderGradientPanel = () => {
      if (colorState.value.mode !== 'linear-gradient') return null;
      return (
        <div class={`${prefixCls}-gradient-panel`}>
          <div ref={gradientShellRef} class={`${prefixCls}-gradient-bar-shell`}>
            <button
              ref={sliderRef}
              type="button"
              class={`${prefixCls}-gradient-bar`}
              disabled={props.disabled}
              style={{
                backgroundImage: getGradientThumbBackground(colorState.value.gradientColors),
              }}
              onClick={handleGradientBarClick}
              onKeydown={handleGradientBarKeyDown}
            />
            {colorState.value.gradientColors.map((point) => (
              <GradientThumb
                key={point.id}
                point={point}
                prefixCls={prefixCls}
                active={point.id === colorState.value.gradientSelectedId}
                disabled={props.disabled}
                onSelect={() => {
                  if (colorState.value.gradientSelectedId === point.id) {
                    return;
                  }

                  emitStateChange(setGradientSelectedPoint(colorState.value, point.id), 'input');
                }}
                onMove={(clientX) => updateThumbLeft(point.id, clientX)}
                onRemove={() => handleThumbRemove(point.id)}
              />
            ))}
          </div>
          <div class={`${prefixCls}-gradient-meta`}>
            <span class={`${prefixCls}-gradient-label`}>角度</span>
            <InputNumber
              class={`${prefixCls}-gradient-degree`}
              size="mini"
              min={0}
              max={360}
              hideButton
              disabled={props.disabled}
              modelValue={colorState.value.gradientDegree}
              onChange={(value) => {
                if (typeof value !== 'number') {
                  return;
                }

                emitStateChange(setGradientDegree(colorState.value, value), 'input');
              }}
            />
          </div>
          <div
            class={`${prefixCls}-gradient-preview`}
            style={{ backgroundImage: getLinearGradientString(colorState.value) }}
          />
        </div>
      );
    };

    const renderFormatInputs = () => {
      return (
        <InputGroup class={`${prefixCls}-input-group`}>
          {formatDrafts.value.map((draft, index) => (
            <Input
              key={`${selectedFormat.value}-${index}`}
              class={`${prefixCls}-format-input`}
              size="mini"
              disabled={props.disabled}
              modelValue={draft}
              onInput={(value: string) => updateDraft(index, value)}
              onChange={commitDrafts}
              onPressEnter={commitDrafts}
            />
          ))}
        </InputGroup>
      );
    };

    return () => (
      <div
        class={{
          [`${prefixCls}-panel`]: true,
          [`${prefixCls}-panel-disabled`]: props.disabled,
        }}
      >
        {props.colorModes.length > 1 && (
          <div class={`${prefixCls}-panel-head`}>
            <Radio.Group
              type="button"
              size="small"
              modelValue={colorState.value.mode}
              options={MODE_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
              disabled={props.disabled}
              onChange={handleModeChange}
            />
          </div>
        )}
        {renderGradientPanel()}
        <Palette
          color={colorModel.value}
          onChange={(s, v) =>
            handleHsvaChange({ ...activeHsva.value, s, v }, 'palette-saturation-brightness')
          }
        />
        <div class={`${prefixCls}-panel-control`}>
          <div class={`${prefixCls}-control-wrapper`}>
            <div>
              <ControlBar
                type="hue"
                x={activeHsva.value.h}
                color={colorModel.value}
                colorString={formatColor(activeHsva.value, 'CSS', true)}
                onChange={(h) => {
                  const next = { ...activeHsva.value, h };
                  handleHsvaChange(next, 'palette-hue-bar', true);
                }}
              />
              {props.enableAlpha && (
                <ControlBar
                  type="alpha"
                  x={activeHsva.value.a}
                  color={colorModel.value}
                  colorString={formatColor(activeHsva.value, 'CSS', true)}
                  onChange={(alpha) => {
                    const next = { ...activeHsva.value, a: alpha };
                    handleHsvaChange(next, 'palette-alpha-bar', true);
                  }}
                />
              )}
            </div>
            {props.showPrimaryColorPreview && (
              <div
                class={`${prefixCls}-preview`}
                style={
                  colorState.value.mode === 'linear-gradient'
                    ? { backgroundImage: previewColor.value }
                    : { backgroundColor: previewColor.value }
                }
              />
            )}
          </div>
          <div class={`${prefixCls}-input-wrapper`}>
            <Select
              class={`${prefixCls}-select`}
              size="mini"
              trigger-props={{ class: `${prefixCls}-select-popup` }}
              options={formatOptions.value}
              modelValue={selectedFormat.value}
              disabled={props.disabled}
              onChange={(value) => {
                if (typeof value !== 'string') return;
                selectedFormat.value = value as ColorFormat;
                syncDrafts();
              }}
            />
            <div class={`${prefixCls}-group-wrapper`}>{renderFormatInputs()}</div>
          </div>
        </div>
        {renderColorSec()}
      </div>
    );
  },
});
