export type ThemeTokenValue = string | number;

export type ThemeTokenMap = Record<string, ThemeTokenValue>;

export interface SDThemeMeta {
  name?: string;
  schemaVersion?: number;
  cssVarPrefix?: string;
}

export type SDThemeMode = 'light' | 'dark';

export interface SDThemeConfig {
  tokens?: ThemeTokenMap;
  components?: Record<string, ThemeTokenMap>;
  meta?: SDThemeMeta;
  token?: ThemeTokenMap;
  component?: Record<string, ThemeTokenMap>;
  [key: string]: unknown;
}

export interface SDThemeNormalized {
  tokens: ThemeTokenMap;
  components: Record<string, ThemeTokenMap>;
  meta: Required<Pick<SDThemeMeta, 'schemaVersion' | 'cssVarPrefix'>> & Pick<SDThemeMeta, 'name'>;
}

const DEFAULT_THEME_META: SDThemeNormalized['meta'] = {
  schemaVersion: 1,
  cssVarPrefix: '--',
};

const RESERVED_THEME_KEYS = new Set(['tokens', 'components', 'meta', 'token', 'component']);

function normalizeCssVarPrefix(prefix?: string): string {
  if (!prefix) {
    return '--';
  }

  const trimmed = prefix.trim();
  if (!trimmed || trimmed === '--') {
    return '--';
  }

  if (trimmed.startsWith('--')) {
    return trimmed.endsWith('-') ? trimmed : `${trimmed}-`;
  }

  return `--${trimmed.replace(/^-+/, '')}${trimmed.endsWith('-') ? '' : '-'}`;
}

export function normalizeTokenKey(key: string): string {
  return key
    .trim()
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d+)/g, '$1-$2')
    .replace(/(\d+)([a-zA-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function normalizeTokenMap(tokens?: unknown): ThemeTokenMap {
  if (!tokens || typeof tokens !== 'object') {
    return {};
  }

  const normalized: ThemeTokenMap = {};
  for (const [key, value] of Object.entries(tokens as Record<string, unknown>)) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    const normalizedKey = normalizeTokenKey(key);
    if (!normalizedKey) {
      continue;
    }

    normalized[normalizedKey] = typeof value === 'string' ? value.trim() : value;
  }

  return normalized;
}

function normalizeComponentTokenMap(components?: unknown): Record<string, ThemeTokenMap> {
  if (!components || typeof components !== 'object') {
    return {};
  }

  const normalized: Record<string, ThemeTokenMap> = {};
  for (const [componentName, tokenMap] of Object.entries(components as Record<string, unknown>)) {
    const normalizedName = normalizeTokenKey(componentName);
    if (!normalizedName) {
      continue;
    }

    const normalizedTokens = normalizeTokenMap(tokenMap);
    if (Object.keys(normalizedTokens).length) {
      normalized[normalizedName] = normalizedTokens;
    }
  }

  return normalized;
}

function collectLegacyRootTokens(theme: SDThemeConfig): ThemeTokenMap {
  const rootTokenSource = Object.fromEntries(
    Object.entries(theme).filter(([key, value]) => {
      if (RESERVED_THEME_KEYS.has(key)) {
        return false;
      }

      return typeof value === 'string' || typeof value === 'number';
    }),
  );

  return normalizeTokenMap(rootTokenSource);
}

export function normalizeTheme(theme?: SDThemeConfig): SDThemeNormalized {
  if (!theme || typeof theme !== 'object') {
    return {
      tokens: {},
      components: {},
      meta: DEFAULT_THEME_META,
    };
  }

  const themeTokens = normalizeTokenMap(theme.tokens ?? theme.token);
  const legacyRootTokens = collectLegacyRootTokens(theme);

  const meta = {
    name: theme.meta?.name,
    schemaVersion: theme.meta?.schemaVersion ?? DEFAULT_THEME_META.schemaVersion,
    cssVarPrefix: normalizeCssVarPrefix(
      theme.meta?.cssVarPrefix ?? DEFAULT_THEME_META.cssVarPrefix,
    ),
  };

  return {
    tokens: {
      ...legacyRootTokens,
      ...themeTokens,
    },
    components: normalizeComponentTokenMap(theme.components ?? theme.component),
    meta,
  };
}

export function resolveThemeToken(
  theme: SDThemeNormalized,
  componentName: string,
  tokenKey: string,
): ThemeTokenValue | undefined {
  const normalizedComponentName = normalizeTokenKey(componentName);
  const normalizedTokenKey = normalizeTokenKey(tokenKey);

  return (
    theme.components[normalizedComponentName]?.[normalizedTokenKey] ??
    theme.tokens[normalizedTokenKey]
  );
}

export function getThemeCSSVariables(theme: SDThemeNormalized): Record<string, string> {
  const cssVariables: Record<string, string> = {};
  const prefix = theme.meta.cssVarPrefix;

  for (const [tokenKey, tokenValue] of Object.entries(theme.tokens)) {
    cssVariables[`${prefix}${tokenKey}`] = `${tokenValue}`;
  }

  for (const [componentName, tokenMap] of Object.entries(theme.components)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenMap)) {
      cssVariables[`${prefix}component-${componentName}-${tokenKey}`] = `${tokenValue}`;
    }
  }

  return cssVariables;
}

export function applyThemeCSSVariables(
  target: HTMLElement,
  theme: SDThemeNormalized,
  previousKeys: Set<string> = new Set(),
): Set<string> {
  const variableMap = getThemeCSSVariables(theme);
  const nextKeys = new Set(Object.keys(variableMap));

  for (const key of previousKeys) {
    if (!nextKeys.has(key)) {
      target.style.removeProperty(key);
    }
  }

  for (const [key, value] of Object.entries(variableMap)) {
    target.style.setProperty(key, value);
  }

  return nextKeys;
}

export function clearThemeCSSVariables(target: HTMLElement, keys: Set<string>): void {
  for (const key of keys) {
    target.style.removeProperty(key);
  }
}
