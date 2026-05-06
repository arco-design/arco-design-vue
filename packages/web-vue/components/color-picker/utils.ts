import type {
  ColorFormat,
  ColorMode,
  ColorObject,
  ColorValueState,
  GradientColorPoint,
  HSVA,
  LegacyFormat,
} from './interface';

import { formatInputToHSVA, hsvToRgb, rgbToHsv, rgbToHex, rgbaToHex } from '../_utils/color';

const DEFAULT_HSVA: HSVA = { h: 0, s: 1, v: 1, a: 1 };
export const DEFAULT_LINEAR_GRADIENT =
  'linear-gradient(90deg, rgba(0, 82, 217, 1) 0%, rgba(255, 255, 255, 1) 100%)';
export const TD_COLOR_USED_COLORS_MAX_SIZE = 8;

const HSL_REGEXP = /^hsla?\((.+)\)$/i;
const HSV_REGEXP = /^hsva?\((.+)\)$/i;
const CMYK_REGEXP = /^cmyk\((.+)\)$/i;
const LINEAR_GRADIENT_REGEXP = /^linear-gradient\((.+)\)$/i;
const GRADIENT_DEGREE_REGEXP = /^(-?\d+(?:\.\d+)?)deg$/i;
const GRADIENT_STOP_REGEXP = /^(.*?)(?:\s+(-?\d+(?:\.\d+)?)%)?$/;

let gradientPointId = 0;

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
};

export const round = (value: number, precision = 0) => {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};

const parseUnitValue = (value: string, max: number) => {
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) {
    return clamp(parseFloat(trimmed) / 100, 0, 1) * max;
  }
  return clamp(parseFloat(trimmed), 0, max);
};

const toGradientPointId = () => `gradient-point-${++gradientPointId}`;

export const rgbToHsl = (r: number, g: number, b: number) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      case blue:
        hue = (red - green) / delta + 4;
        break;
      default:
        break;
    }

    hue /= 6;
  }

  return {
    h: round(hue * 360),
    s: round(saturation * 100),
    l: round(lightness * 100),
  };
};

const hueToRgb = (p: number, q: number, t: number) => {
  let next = t;
  if (next < 0) next += 1;
  if (next > 1) next -= 1;
  if (next < 1 / 6) return p + (q - p) * 6 * next;
  if (next < 1 / 2) return q;
  if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
  return p;
};

export const hslToRgb = (h: number, s: number, l: number) => {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = clamp(s / 100, 0, 1);
  const lightness = clamp(l / 100, 0, 1);

  if (saturation === 0) {
    const channel = Math.round(lightness * 255);
    return { r: channel, g: channel, b: channel };
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  return {
    r: Math.round(hueToRgb(p, q, hue + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, hue) * 255),
    b: Math.round(hueToRgb(p, q, hue - 1 / 3) * 255),
  };
};

const parseCommaArguments = (input: string) => {
  const result: string[] = [];
  let buffer = '';
  let depth = 0;

  for (const char of input) {
    if (char === '(') depth += 1;
    if (char === ')') depth = Math.max(0, depth - 1);

    if (char === ',' && depth === 0) {
      result.push(buffer.trim());
      buffer = '';
      continue;
    }

    buffer += char;
  }

  if (buffer.trim()) {
    result.push(buffer.trim());
  }

  return result;
};

const parseColorTuple = (input: string) => parseCommaArguments(input);

const parseHslString = (input: string) => {
  const match = HSL_REGEXP.exec(input);
  if (!match) return null;
  const parts = parseColorTuple(match[1]);
  if (parts.length < 3) return null;
  const rgb = hslToRgb(
    parseFloat(parts[0]),
    parseUnitValue(parts[1], 100),
    parseUnitValue(parts[2], 100),
  );
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  return {
    ...hsv,
    a: parts[3] ? clamp(parseUnitValue(parts[3], 1), 0, 1) : 1,
  } satisfies HSVA;
};

const parseHsvString = (input: string) => {
  const match = HSV_REGEXP.exec(input);
  if (!match) return null;
  const parts = parseColorTuple(match[1]);
  if (parts.length < 3) return null;
  return {
    h: clamp((((parseFloat(parts[0]) % 360) + 360) % 360) / 360, 0, 1),
    s: clamp(parseUnitValue(parts[1], 100) / 100, 0, 1),
    v: clamp(parseUnitValue(parts[2], 100) / 100, 0, 1),
    a: parts[3] ? clamp(parseUnitValue(parts[3], 1), 0, 1) : 1,
  } satisfies HSVA;
};

const parseCmykString = (input: string) => {
  const match = CMYK_REGEXP.exec(input);
  if (!match) return null;
  const parts = parseColorTuple(match[1]);
  if (parts.length < 4) return null;
  const [c, m, y, k] = parts.map((part) => clamp(parseUnitValue(part, 100) / 100, 0, 1));
  const rgb = {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  return {
    ...hsv,
    a: 1,
  } satisfies HSVA;
};

export const normalizeFormat = (format?: string, enableAlpha?: boolean) => {
  if (!format) return enableAlpha ? 'RGBA' : 'RGB';
  const normalized = format.toUpperCase() as ColorFormat;
  if (normalized === 'HEX' && enableAlpha) return 'HEX8';
  if (normalized === 'RGB' && enableAlpha) return 'RGBA';
  return normalized;
};

export const parseColor = (input?: string) => {
  if (!input) {
    return { ...DEFAULT_HSVA } satisfies HSVA;
  }

  const trimmed = input.trim();
  return (
    parseHsvString(trimmed) ||
    parseHslString(trimmed) ||
    parseCmykString(trimmed) ||
    formatInputToHSVA(trimmed)
  );
};

const parseGradientStop = (input: string, index: number, total: number) => {
  const match = GRADIENT_STOP_REGEXP.exec(input);
  const color = match?.[1]?.trim() || input.trim();
  let left = total === 1 ? 0 : (index / (total - 1)) * 100;
  if (match?.[2] !== undefined) {
    left = parseFloat(match[2]);
  }
  const hsva = parseColor(color);

  return {
    id: toGradientPointId(),
    left: clamp(left, 0, 100),
    color,
    hsva,
  } satisfies GradientColorPoint;
};

export const isGradientColor = (input?: string) =>
  Boolean(input && LINEAR_GRADIENT_REGEXP.exec(input.trim()));

export const parseGradientString = (input?: string) => {
  if (!input || !isGradientColor(input)) return null;
  const match = LINEAR_GRADIENT_REGEXP.exec(input.trim());
  if (!match) return null;

  const parts = parseCommaArguments(match[1]);
  if (parts.length < 2) return null;

  let degree = 90;
  let stops = parts;
  const degreeMatch = GRADIENT_DEGREE_REGEXP.exec(parts[0]);
  if (degreeMatch) {
    degree = parseFloat(degreeMatch[1]);
    stops = parts.slice(1);
  }

  const gradientColors = stops
    .map((item, index) => parseGradientStop(item, index, stops.length))
    .sort((a, b) => a.left - b.left);

  if (!gradientColors.length) return null;

  return {
    degree: clamp(degree, 0, 360),
    colors: gradientColors,
  };
};

export const formatColor = (
  hsva: HSVA,
  format: ColorFormat | LegacyFormat,
  enableAlpha?: boolean,
) => {
  const normalized = normalizeFormat(format, enableAlpha);
  const rgb = hsvToRgb(hsva.h, hsva.s, hsva.v);
  const alpha = round(hsva.a, 2);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hue = round(hsva.h * 360);
  const saturation = round(hsva.s * 100);
  const value = round(hsva.v * 100);

  switch (normalized) {
    case 'HEX':
      return `#${rgbToHex(rgb.r, rgb.g, rgb.b)}`;
    case 'HEX8':
      return `#${rgbaToHex(rgb.r, rgb.g, rgb.b, hsva.a)}`;
    case 'RGB':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'RGBA':
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    case 'HSL':
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    case 'HSLA':
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`;
    case 'HSV':
      return `hsv(${hue}, ${saturation}%, ${value}%)`;
    case 'HSVA':
      return `hsva(${hue}, ${saturation}%, ${value}%, ${alpha})`;
    case 'CMYK': {
      const red = rgb.r / 255;
      const green = rgb.g / 255;
      const blue = rgb.b / 255;
      const key = 1 - Math.max(red, green, blue);
      const cyan = key === 1 ? 0 : (1 - red - key) / (1 - key);
      const magenta = key === 1 ? 0 : (1 - green - key) / (1 - key);
      const yellow = key === 1 ? 0 : (1 - blue - key) / (1 - key);
      return `cmyk(${round(cyan * 100)}%, ${round(magenta * 100)}%, ${round(yellow * 100)}%, ${round(key * 100)}%)`;
    }
    case 'CSS':
    default:
      return hsva.a < 1
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
};

export const createGradientPoint = (left: number, color: string) => {
  const hsva = parseColor(color);
  return {
    id: toGradientPointId(),
    left: clamp(left, 0, 100),
    color,
    hsva,
  } satisfies GradientColorPoint;
};

export const getDefaultGradientState = (baseColor?: string): ColorValueState => {
  const start =
    baseColor && !isGradientColor(baseColor)
      ? formatColor(parseColor(baseColor), 'CSS', true)
      : 'rgba(0, 82, 217, 1)';
  const end = 'rgba(255, 255, 255, 1)';
  const gradientColors = [createGradientPoint(0, start), createGradientPoint(100, end)];

  return {
    mode: 'linear-gradient',
    hsva: gradientColors[0].hsva,
    gradientDegree: 90,
    gradientSelectedId: gradientColors[0].id,
    gradientColors,
  };
};

export const getDefaultColorState = (): ColorValueState => ({
  mode: 'monochrome',
  hsva: { ...DEFAULT_HSVA },
  gradientDegree: 90,
  gradientSelectedId: '',
  gradientColors: [],
});

export const getColorMode = (input: string | undefined, colorModes: ColorMode[]) => {
  if (colorModes.length === 1) return colorModes[0];
  return colorModes.includes('linear-gradient') && isGradientColor(input)
    ? 'linear-gradient'
    : 'monochrome';
};

export const parseColorState = (
  input?: string,
  colorModes: ColorMode[] = ['monochrome', 'linear-gradient'],
): ColorValueState => {
  const mode = getColorMode(input, colorModes);

  if (mode === 'linear-gradient') {
    const parsed = parseGradientString(input) || parseGradientString(DEFAULT_LINEAR_GRADIENT);
    if (!parsed) {
      return getDefaultGradientState();
    }
    const selected = parsed.colors[0];
    return {
      mode,
      hsva: selected.hsva,
      gradientDegree: parsed.degree,
      gradientSelectedId: selected.id,
      gradientColors: parsed.colors,
    };
  }

  return {
    ...getDefaultColorState(),
    mode: 'monochrome',
    hsva: parseColor(input),
  };
};

export const getGradientThumbBackground = (points: GradientColorPoint[]) => {
  const stops = points
    .map((point) => `${formatColor(point.hsva, 'CSS', true)} ${round(point.left, 2)}%`)
    .join(', ');
  return `linear-gradient(90deg, ${stops})`;
};

export const getLinearGradientString = (state: ColorValueState) => {
  const colors = state.gradientColors.length
    ? state.gradientColors
    : getDefaultGradientState().gradientColors;
  return `linear-gradient(${round(state.gradientDegree, 2)}deg, ${colors
    .map((point) => `${formatColor(point.hsva, 'CSS', true)} ${round(point.left, 2)}%`)
    .join(', ')})`;
};

export const formatColorState = (
  state: ColorValueState,
  format: ColorFormat | LegacyFormat,
  enableAlpha?: boolean,
) => {
  if (state.mode === 'linear-gradient') {
    return getLinearGradientString(state);
  }
  return formatColor(state.hsva, format, enableAlpha);
};

export const getActiveGradientPoint = (state: ColorValueState) => {
  if (!state.gradientColors.length) return null;
  return (
    state.gradientColors.find((point) => point.id === state.gradientSelectedId) ||
    state.gradientColors[0]
  );
};

export const setGradientSelectedPoint = (state: ColorValueState, selectedId: string) => {
  const point = state.gradientColors.find((item) => item.id === selectedId);
  if (!point) return state;
  return {
    ...state,
    gradientSelectedId: selectedId,
    hsva: point.hsva,
  } satisfies ColorValueState;
};

export const setActiveColorHsva = (state: ColorValueState, hsva: HSVA) => {
  if (state.mode !== 'linear-gradient') {
    return {
      ...state,
      hsva,
    } satisfies ColorValueState;
  }

  const current = getActiveGradientPoint(state) || state.gradientColors[0];
  const gradientColors = state.gradientColors.map((point) =>
    point.id === current.id
      ? {
          ...point,
          hsva,
          color: formatColor(hsva, 'CSS', true),
        }
      : point,
  );

  return {
    ...state,
    hsva,
    gradientColors,
  } satisfies ColorValueState;
};

export const setGradientDegree = (state: ColorValueState, degree: number) =>
  ({
    ...state,
    gradientDegree: clamp(degree, 0, 360),
  }) satisfies ColorValueState;

export const setGradientColors = (state: ColorValueState, gradientColors: GradientColorPoint[]) => {
  const nextColors = [...gradientColors].sort((a, b) => a.left - b.left);
  const selected = nextColors.find((item) => item.id === state.gradientSelectedId) || nextColors[0];
  return {
    ...state,
    gradientColors: nextColors,
    gradientSelectedId: selected?.id || '',
    hsva: selected?.hsva || state.hsva,
  } satisfies ColorValueState;
};

export const addGradientColor = (state: ColorValueState, left: number, color?: string) => {
  const nextPoint = createGradientPoint(left, color || formatColor(state.hsva, 'CSS', true));
  return setGradientSelectedPoint(
    setGradientColors(state, [...state.gradientColors, nextPoint]),
    nextPoint.id,
  );
};

export const removeGradientColor = (state: ColorValueState, selectedId: string) => {
  if (state.gradientColors.length <= 2) return state;
  const nextColors = state.gradientColors.filter((point) => point.id !== selectedId);
  return setGradientColors(state, nextColors);
};

export const getColorBackground = (state: ColorValueState) =>
  state.mode === 'linear-gradient'
    ? getLinearGradientString(state)
    : formatColor(state.hsva, 'CSS', true);

export const getColorObject = (input: HSVA | ColorValueState): ColorObject => {
  const state =
    'mode' in input
      ? input
      : ({ ...getDefaultColorState(), hsva: input } satisfies ColorValueState);
  const active =
    state.mode === 'linear-gradient'
      ? getActiveGradientPoint(state)?.hsva || state.hsva
      : state.hsva;
  const rgb = hsvToRgb(active.h, active.s, active.v);

  return {
    alpha: round(active.a, 2),
    css: formatColor(active, 'CSS', true),
    hex: formatColor(active, 'HEX'),
    hex8: formatColor(active, 'HEX8', true),
    hsl: formatColor(active, 'HSL'),
    hsla: formatColor(active, 'HSLA', true),
    hsv: formatColor(active, 'HSV'),
    hsva: formatColor(active, 'HSVA', true),
    rgb: formatColor(active, 'RGB'),
    rgba: formatColor(active, 'RGBA', true),
    saturation: round(active.s * 100),
    value: round(active.v * 100),
    isGradient: state.mode === 'linear-gradient',
    linearGradient: state.mode === 'linear-gradient' ? getLinearGradientString(state) : undefined,
    red: rgb.r,
    green: rgb.g,
    blue: rgb.b,
  };
};

export const getFormatInputs = (hsva: HSVA, format: ColorFormat, enableAlpha?: boolean) => {
  const rgb = hsvToRgb(hsva.h, hsva.s, hsva.v);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hue = round(hsva.h * 360);
  const saturation = round(hsva.s * 100);
  const value = round(hsva.v * 100);
  const alpha = round(hsva.a * 100);

  switch (normalizeFormat(format, enableAlpha)) {
    case 'HEX8':
      return [rgbaToHex(rgb.r, rgb.g, rgb.b, hsva.a), `${alpha}%`];
    case 'HEX':
      return [rgbToHex(rgb.r, rgb.g, rgb.b)];
    case 'RGBA':
      return [`${rgb.r}`, `${rgb.g}`, `${rgb.b}`, `${alpha}%`];
    case 'RGB':
      return [`${rgb.r}`, `${rgb.g}`, `${rgb.b}`];
    case 'HSLA':
      return [`${hue}`, `${hsl.s}%`, `${hsl.l}%`, `${alpha}%`];
    case 'HSL':
      return [`${hue}`, `${hsl.s}%`, `${hsl.l}%`];
    case 'HSVA':
      return [`${hue}`, `${saturation}%`, `${value}%`, `${alpha}%`];
    case 'HSV':
      return [`${hue}`, `${saturation}%`, `${value}%`];
    case 'CMYK': {
      const red = rgb.r / 255;
      const green = rgb.g / 255;
      const blue = rgb.b / 255;
      const key = 1 - Math.max(red, green, blue);
      const cyan = key === 1 ? 0 : (1 - red - key) / (1 - key);
      const magenta = key === 1 ? 0 : (1 - green - key) / (1 - key);
      const yellow = key === 1 ? 0 : (1 - blue - key) / (1 - key);
      return [
        `${round(cyan * 100)}%`,
        `${round(magenta * 100)}%`,
        `${round(yellow * 100)}%`,
        `${round(key * 100)}%`,
      ];
    }
    case 'CSS':
    default:
      return [formatColor(hsva, 'CSS', true)];
  }
};

export const parseFormatInputValues = (
  values: string[],
  format: ColorFormat,
  enableAlpha?: boolean,
) => {
  const normalized = normalizeFormat(format, enableAlpha);

  switch (normalized) {
    case 'HEX':
      return parseColor(`#${values[0] || ''}`);
    case 'HEX8': {
      const hex = values[0] || '';
      if (hex.length === 8) {
        return parseColor(`#${hex}`);
      }
      const alpha = clamp(parseUnitValue(values[1] || '100%', 100) / 100, 0, 1);
      return { ...parseColor(`#${hex.slice(0, 6)}`), a: alpha } satisfies HSVA;
    }
    case 'RGB':
    case 'RGBA': {
      const rgb = {
        r: clamp(parseFloat(values[0] || '0'), 0, 255),
        g: clamp(parseFloat(values[1] || '0'), 0, 255),
        b: clamp(parseFloat(values[2] || '0'), 0, 255),
      };
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      return {
        ...hsv,
        a: normalized === 'RGBA' ? clamp(parseUnitValue(values[3] || '100%', 100) / 100, 0, 1) : 1,
      } satisfies HSVA;
    }
    case 'HSL':
    case 'HSLA': {
      const rgb = hslToRgb(
        parseFloat(values[0] || '0'),
        parseUnitValue(values[1] || '0%', 100),
        parseUnitValue(values[2] || '0%', 100),
      );
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      return {
        ...hsv,
        a: normalized === 'HSLA' ? clamp(parseUnitValue(values[3] || '100%', 100) / 100, 0, 1) : 1,
      } satisfies HSVA;
    }
    case 'HSV':
    case 'HSVA':
      return {
        h: clamp((((parseFloat(values[0] || '0') % 360) + 360) % 360) / 360, 0, 1),
        s: clamp(parseUnitValue(values[1] || '0%', 100) / 100, 0, 1),
        v: clamp(parseUnitValue(values[2] || '0%', 100) / 100, 0, 1),
        a: normalized === 'HSVA' ? clamp(parseUnitValue(values[3] || '100%', 100) / 100, 0, 1) : 1,
      } satisfies HSVA;
    case 'CMYK': {
      const c = clamp(parseUnitValue(values[0] || '0%', 100) / 100, 0, 1);
      const m = clamp(parseUnitValue(values[1] || '0%', 100) / 100, 0, 1);
      const y = clamp(parseUnitValue(values[2] || '0%', 100) / 100, 0, 1);
      const k = clamp(parseUnitValue(values[3] || '0%', 100) / 100, 0, 1);
      const rgb = {
        r: Math.round(255 * (1 - c) * (1 - k)),
        g: Math.round(255 * (1 - m) * (1 - k)),
        b: Math.round(255 * (1 - y) * (1 - k)),
      };
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      return {
        ...hsv,
        a: 1,
      } satisfies HSVA;
    }
    case 'CSS':
    default:
      return parseColor(values[0]);
  }
};
