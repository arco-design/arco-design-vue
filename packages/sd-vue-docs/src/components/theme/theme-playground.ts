import type { SDThemeConfig } from '@sdata/web-vue';

export interface ThemeTokenMap {
  [key: string]: string | number;
}

export interface ThemeComponentTokenMap {
  [componentName: string]: ThemeTokenMap;
}

export interface ThemeMeta {
  name?: string;
  schemaVersion?: number;
  cssVarPrefix?: string;
}

export type ThemeConfig = SDThemeConfig;

export interface ThemePreset {
  key: string;
  name: string;
  description: string;
  summary: string;
  mode?: 'light' | 'dark';
  theme: ThemeConfig;
}

export interface ThemeRuntimePayload {
  mode: 'light' | 'dark';
  theme: ThemeConfig;
}

export interface ThemeField {
  key: string;
  label: string;
  type: 'color' | 'text';
  token: string;
  placeholder?: string;
  hint?: string;
}

export interface ThemeFieldGroup {
  key: string;
  title: string;
  description: string;
  fields: ThemeField[];
}

export interface ThemeValidationResult {
  valid: boolean;
  data?: ThemeConfig;
  errors: string[];
}

export const THEME_SCHEMA_VERSION = 1;

const DEFAULT_STATUS_PALETTES = {
  success: [
    '232,250,240',
    '175,240,203',
    '123,228,166',
    '76,214,130',
    '35,197,94',
    '22,163,74',
    '21,128,61',
  ],
  warning: [
    '255,247,219',
    '255,228,158',
    '255,207,91',
    '255,183,32',
    '245,158,11',
    '217,119,6',
    '180,83,9',
  ],
  danger: [
    '255,236,232',
    '255,211,204',
    '255,178,165',
    '255,139,122',
    '244,63,94',
    '225,29,72',
    '190,24,93',
  ],
} as const;

const PRESET_PRIMARY_PALETTES = {
  default: [
    '232,243,255',
    '190,219,255',
    '145,193,255',
    '96,164,255',
    '52,130,255',
    '20,118,255',
    '9,88,217',
  ],
  dark: [
    '46,58,82',
    '61,78,112',
    '76,98,143',
    '93,118,173',
    '122,154,214',
    '151,188,255',
    '191,215,255',
  ],
  compact: [
    '233,244,255',
    '198,223,255',
    '156,198,255',
    '109,170,255',
    '72,142,243',
    '43,110,217',
    '27,81,173',
  ],
  brand: [
    '255,240,244',
    '255,214,225',
    '255,182,204',
    '255,141,177',
    '255,98,150',
    '230,57,122',
    '184,28,90',
  ],
  cyberpunk: [
    '246,236,255',
    '232,207,255',
    '214,173,255',
    '190,126,255',
    '170,84,255',
    '140,49,255',
    '104,29,217',
  ],
} as const;

const PRESET_NEUTRALS = {
  default: {
    colorBg2: '#ffffff',
    colorBg5: '#ffffff',
    colorNeutral1: '#f6f8fb',
    colorNeutral2: '#eef2f7',
    colorNeutral3: '#d9e2f0',
    colorNeutral4: '#b6c2d2',
    colorNeutral6: '#7a8699',
    colorNeutral8: '#334155',
    colorNeutral10: '#0f172a',
    borderRadiusSmall: '6px',
    borderRadiusMedium: '10px',
    borderRadiusLarge: '16px',
    fontSizeBody3: '14px',
    spacing7: '16px',
  },
  dark: {
    colorBg2: '#1a202c',
    colorBg5: '#2d3748',
    colorNeutral1: '#2a3443',
    colorNeutral2: '#334155',
    colorNeutral3: '#475569',
    colorNeutral4: '#64748b',
    colorNeutral6: '#cbd5e1',
    colorNeutral8: '#e2e8f0',
    colorNeutral10: '#f8fafc',
    borderRadiusSmall: '8px',
    borderRadiusMedium: '12px',
    borderRadiusLarge: '18px',
    fontSizeBody3: '14px',
    spacing7: '14px',
  },
  compact: {
    colorBg2: '#ffffff',
    colorBg5: '#ffffff',
    colorNeutral1: '#f7f9fc',
    colorNeutral2: '#edf2f7',
    colorNeutral3: '#d6dee9',
    colorNeutral4: '#aeb9c8',
    colorNeutral6: '#6b7280',
    colorNeutral8: '#1f2937',
    colorNeutral10: '#111827',
    borderRadiusSmall: '4px',
    borderRadiusMedium: '6px',
    borderRadiusLarge: '10px',
    fontSizeBody3: '13px',
    spacing7: '12px',
  },
  brand: {
    colorBg2: '#fff8fb',
    colorBg5: '#ffffff',
    colorNeutral1: '#fff1f5',
    colorNeutral2: '#ffe4ec',
    colorNeutral3: '#fbcfe0',
    colorNeutral4: '#f9a8c3',
    colorNeutral6: '#9d174d',
    colorNeutral8: '#4a102a',
    colorNeutral10: '#2d1020',
    borderRadiusSmall: '10px',
    borderRadiusMedium: '14px',
    borderRadiusLarge: '22px',
    fontSizeBody3: '14px',
    spacing7: '18px',
  },
  cyberpunk: {
    colorBg2: '#0c0a1f',
    colorBg5: '#16102c',
    colorNeutral1: '#1b1436',
    colorNeutral2: '#241b44',
    colorNeutral3: '#33265c',
    colorNeutral4: '#59458c',
    colorNeutral6: '#d5c9ff',
    colorNeutral8: '#efe9ff',
    colorNeutral10: '#ffffff',
    borderRadiusSmall: '12px',
    borderRadiusMedium: '18px',
    borderRadiusLarge: '28px',
    fontSizeBody3: '14px',
    spacing7: '18px',
  },
} as const;

function buildStatusTokens(kind: keyof typeof DEFAULT_STATUS_PALETTES) {
  const values = DEFAULT_STATUS_PALETTES[kind];

  return {
    [`${kind}1`]: values[0],
    [`${kind}2`]: values[1],
    [`${kind}3`]: values[2],
    [`${kind}4`]: values[3],
    [`${kind}5`]: values[4],
    [`${kind}6`]: values[5],
    [`${kind}7`]: values[6],
  } satisfies ThemeTokenMap;
}

function buildPrimaryTokens(palette: readonly string[]) {
  return {
    primary1: palette[0],
    primary2: palette[1],
    primary3: palette[2],
    primary4: palette[3],
    primary5: palette[4],
    primary6: palette[5],
    primary7: palette[6],
    link1: palette[0],
    link2: palette[1],
    link3: palette[2],
    link4: palette[3],
    link5: palette[4],
    link6: palette[5],
    link7: palette[6],
  } satisfies ThemeTokenMap;
}

function buildPresetTheme(
  presetKey: keyof typeof PRESET_PRIMARY_PALETTES,
  meta: Pick<ThemeMeta, 'name'>,
): ThemeConfig {
  return {
    meta: {
      schemaVersion: THEME_SCHEMA_VERSION,
      cssVarPrefix: '--',
      name: meta.name,
    },
    tokens: {
      ...buildPrimaryTokens(PRESET_PRIMARY_PALETTES[presetKey]),
      ...buildStatusTokens('success'),
      ...buildStatusTokens('warning'),
      ...buildStatusTokens('danger'),
      ...PRESET_NEUTRALS[presetKey],
    },
  };
}

export const themePresets: ThemePreset[] = [
  {
    key: 'default',
    name: '默认',
    description: '延续组件库默认的理性蓝色语义，适合大多数后台与内容场景。',
    summary: '稳定、清晰、可直接落地。',
    mode: 'light',
    theme: buildPresetTheme('default', { name: 'Default' }),
  },
  {
    key: 'dark',
    name: '暗色',
    description: '压低背景亮度并提升文字对比度，适合夜间长时间浏览。',
    summary: '更适合低光环境与大屏展示。',
    mode: 'dark',
    theme: buildPresetTheme('dark', { name: 'Dark' }),
  },
  {
    key: 'compact',
    name: '紧凑',
    description: '收紧圆角与中性色层级，让信息密度更高，适合运营与配置台。',
    summary: '强调效率与扫描速度。',
    mode: 'light',
    theme: buildPresetTheme('compact', { name: 'Compact' }),
  },
  {
    key: 'brand',
    name: '品牌色',
    description: '以桃红色谱替换主品牌色，更适合营销活动与品牌专题页。',
    summary: '强调记忆点和品牌识别。',
    mode: 'light',
    theme: buildPresetTheme('brand', { name: 'Brand' }),
  },
  {
    key: 'cyberpunk',
    name: '赛博朋克',
    description: '高饱和紫电色搭配深色中性背景，适合实验性视觉与活动首页。',
    summary: '氛围强、对比激进。',
    mode: 'dark',
    theme: buildPresetTheme('cyberpunk', { name: 'Cyberpunk' }),
  },
];

export const themeFieldGroups: ThemeFieldGroup[] = [
  {
    key: 'brand',
    title: '品牌主色',
    description: '主色会驱动按钮、链接、焦点态与语义浅色层。',
    fields: [
      { key: 'primary-5', label: 'Primary 5', type: 'color', token: 'primary5' },
      { key: 'primary-6', label: 'Primary 6', type: 'color', token: 'primary6' },
      { key: 'primary-7', label: 'Primary 7', type: 'color', token: 'primary7' },
    ],
  },
  {
    key: 'surface',
    title: '背景与文本',
    description: '这里控制面板背景、中性色与主要文本对比。',
    fields: [
      { key: 'bg-2', label: 'Color Bg 2', type: 'color', token: 'colorBg2' },
      { key: 'bg-5', label: 'Color Bg 5', type: 'color', token: 'colorBg5' },
      { key: 'neutral-2', label: 'Neutral 2', type: 'color', token: 'colorNeutral2' },
      { key: 'neutral-3', label: 'Neutral 3', type: 'color', token: 'colorNeutral3' },
      { key: 'neutral-8', label: 'Neutral 8', type: 'color', token: 'colorNeutral8' },
      { key: 'neutral-10', label: 'Neutral 10', type: 'color', token: 'colorNeutral10' },
    ],
  },
  {
    key: 'shape',
    title: '圆角与节奏',
    description: '字号和间距 token 已开放编辑，实际生效范围会随 Scss 迁移继续扩大。',
    fields: [
      {
        key: 'radius-small',
        label: 'Radius Small',
        type: 'text',
        token: 'borderRadiusSmall',
        placeholder: '6px',
      },
      {
        key: 'radius-medium',
        label: 'Radius Medium',
        type: 'text',
        token: 'borderRadiusMedium',
        placeholder: '10px',
      },
      {
        key: 'font-size-body-3',
        label: 'Body 3',
        type: 'text',
        token: 'fontSizeBody3',
        placeholder: '14px',
      },
      {
        key: 'spacing-7',
        label: 'Spacing 7',
        type: 'text',
        token: 'spacing7',
        placeholder: '16px',
      },
    ],
  },
];

function cloneTokenMap(tokenMap?: ThemeTokenMap): ThemeTokenMap {
  return tokenMap ? { ...tokenMap } : {};
}

function cloneComponentMap(componentMap?: ThemeComponentTokenMap): ThemeComponentTokenMap {
  if (!componentMap) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(componentMap).map(([componentName, tokens]) => [
      componentName,
      cloneTokenMap(tokens),
    ]),
  );
}

export function cloneThemeConfig(theme?: ThemeConfig): ThemeConfig {
  return {
    meta: {
      schemaVersion: theme?.meta?.schemaVersion ?? THEME_SCHEMA_VERSION,
      cssVarPrefix: theme?.meta?.cssVarPrefix ?? '--',
      name: theme?.meta?.name,
    },
    tokens: cloneTokenMap(theme?.tokens),
    components: cloneComponentMap(theme?.components),
  };
}

export function getThemePreset(presetKey: string) {
  return themePresets.find((preset) => preset.key === presetKey) ?? themePresets[0];
}

export function buildThemeRuntimePayload(theme: ThemeConfig, mode?: ThemePreset['mode']) {
  return {
    mode: mode ?? 'light',
    theme: cloneThemeConfig(theme),
  } satisfies ThemeRuntimePayload;
}

export function getThemeToken(theme: ThemeConfig, tokenKey: string) {
  return theme.tokens?.[tokenKey] ?? '';
}

export function setThemeToken(theme: ThemeConfig, tokenKey: string, value: string | number) {
  return {
    ...cloneThemeConfig(theme),
    tokens: {
      ...cloneTokenMap(theme.tokens),
      [tokenKey]: value,
    },
  } satisfies ThemeConfig;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function validateTokenMap(value: unknown, path: string, errors: string[]) {
  if (!isPlainObject(value)) {
    errors.push(`${path} 必须是对象。`);
    return {};
  }

  const tokenMap: ThemeTokenMap = {};
  for (const [tokenKey, tokenValue] of Object.entries(value)) {
    if (typeof tokenValue !== 'string' && typeof tokenValue !== 'number') {
      errors.push(`${path}.${tokenKey} 只能是字符串或数字。`);
      continue;
    }

    tokenMap[tokenKey] = tokenValue;
  }

  return tokenMap;
}

export function validateThemeConfig(input: unknown): ThemeValidationResult {
  const errors: string[] = [];
  if (!isPlainObject(input)) {
    return {
      valid: false,
      errors: ['主题 JSON 必须是对象。'],
    };
  }

  const metaInput = isPlainObject(input.meta) ? input.meta : {};
  const schemaVersion = metaInput.schemaVersion;
  if (schemaVersion !== undefined && schemaVersion !== THEME_SCHEMA_VERSION) {
    errors.push(
      `当前仅支持 schemaVersion ${THEME_SCHEMA_VERSION}，收到 ${String(schemaVersion)}。`,
    );
  }

  const tokens = input.tokens === undefined ? {} : validateTokenMap(input.tokens, 'tokens', errors);

  let components: ThemeComponentTokenMap = {};
  if (input.components !== undefined) {
    if (!isPlainObject(input.components)) {
      errors.push('components 必须是对象。');
    } else {
      components = Object.fromEntries(
        Object.entries(input.components).map(([componentName, tokenMap]) => [
          componentName,
          validateTokenMap(tokenMap, `components.${componentName}`, errors),
        ]),
      );
    }
  }

  if (Object.keys(tokens).length === 0 && Object.keys(components).length === 0) {
    errors.push('至少需要提供 tokens 或 components 之一。');
  }

  const data: ThemeConfig = {
    meta: {
      schemaVersion: THEME_SCHEMA_VERSION,
      cssVarPrefix:
        typeof metaInput.cssVarPrefix === 'string' && metaInput.cssVarPrefix.trim().length > 0
          ? metaInput.cssVarPrefix
          : '--',
      name: typeof metaInput.name === 'string' ? metaInput.name : 'Imported Theme',
    },
    tokens,
    components,
  };

  return {
    valid: errors.length === 0,
    data,
    errors,
  };
}

export function serializeThemeConfig(theme: ThemeConfig) {
  return JSON.stringify(cloneThemeConfig(theme), null, 2);
}

export function parseThemeText(text: string) {
  try {
    return validateThemeConfig(JSON.parse(text));
  } catch {
    return {
      valid: false,
      errors: ['JSON 解析失败，请检查逗号、引号和对象结构。'],
    } satisfies ThemeValidationResult;
  }
}
