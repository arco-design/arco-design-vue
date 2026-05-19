import type { ComponentResolver, ComponentResolveResult } from 'unplugin-vue-components/types';

import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

export interface SDataComponentMeta {
  importName: string;
  from: string;
  sideEffects?: string;
}

export interface SDataResolverOptions {
  prefix?: string;
  sideEffect?: boolean;
  importStyle?: boolean;
  resolve?: (meta: SDataComponentMeta, type: 'component') => ComponentResolveResult | undefined;
}

const DEFAULT_PREFIX = 'Sd';
const PACKAGE_NAME = '@sdata/web-vue';

let cachedComponentMap: Record<string, SDataComponentMeta> | undefined;

const getName = (name: string, prefix: string) => {
  if (!prefix) {
    return name;
  }

  if (!name.startsWith(prefix)) {
    return;
  }

  return name.substring(prefix.length);
};

const parseImportClause = (
  clause: string,
  modulePath: string,
  importPathMap: Map<string, string>,
) => {
  const trimmedClause = clause.trim();

  if (!trimmedClause) {
    return;
  }

  const namedOnlyMatch = /^\{([\s\S]*)\}$/.exec(trimmedClause);

  if (namedOnlyMatch) {
    const namedImports =
      namedOnlyMatch[1]
        ?.split(',')
        .map((item) => item.trim())
        .filter(Boolean) ?? [];

    for (const namedImport of namedImports) {
      const [sourceName, localName] = namedImport.split(/\s+as\s+/i).map((item) => item.trim());
      importPathMap.set(localName ?? sourceName, modulePath);
    }

    return;
  }

  const [defaultImport, namedImportsClause] = trimmedClause
    .split(/,\s*(?=\{)/)
    .map((item) => item.trim());

  if (defaultImport) {
    importPathMap.set(defaultImport, modulePath);
  }

  if (!namedImportsClause) {
    return;
  }

  parseImportClause(namedImportsClause, modulePath, importPathMap);
};

const getPackageRoot = () => {
  const require = createRequire(import.meta.url);
  return path.dirname(require.resolve(`${PACKAGE_NAME}/package.json`));
};

const getComponentMetaMap = (): Record<string, SDataComponentMeta> => {
  if (cachedComponentMap) {
    return cachedComponentMap;
  }

  const packageRoot = getPackageRoot();
  const entryPath = path.resolve(packageRoot, 'es/index.js');
  const source = readFileSync(entryPath, 'utf8');
  const importPathMap = new Map<string, string>();

  for (const match of source.matchAll(/import\s+([\s\S]*?)\s+from\s+["'](\.[^"']+)["'];/g)) {
    const clause = match[1];
    const modulePath = match[2];

    if (!clause || !modulePath) {
      continue;
    }

    parseImportClause(clause, modulePath, importPathMap);
  }

  const exportBlockMatch = /export\s*\{([\s\S]*?)\};?\s*$/.exec(source);

  if (!exportBlockMatch?.[1]) {
    cachedComponentMap = {};
    return cachedComponentMap;
  }

  const exportSpecifiers = exportBlockMatch[1]
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const componentMap: Record<string, SDataComponentMeta> = {};

  for (const exportSpecifier of exportSpecifiers) {
    const [localName, exportedName] = exportSpecifier.split(/\s+as\s+/i).map((item) => item.trim());
    const importName = exportedName ?? localName;

    if (!localName || !importName || importName === 'default') {
      continue;
    }

    const modulePath = importPathMap.get(localName);

    if (!modulePath || modulePath.startsWith('./_') || modulePath === './sd-vue.js') {
      continue;
    }

    const styleDir = modulePath.replace(/^\.\//, '').split('/')[0];
    const styleFile = path.resolve(packageRoot, 'es', styleDir, 'style/index.js');

    componentMap[importName] = {
      importName,
      from: PACKAGE_NAME,
      ...(existsSync(styleFile)
        ? { sideEffects: `${PACKAGE_NAME}/es/${styleDir}/style/index.js` }
        : {}),
    };
  }

  cachedComponentMap = componentMap;
  return componentMap;
};

const resolveSideEffects = (meta: SDataComponentMeta, options: SDataResolverOptions) => {
  const importStyle = options.sideEffect ?? options.importStyle ?? false;

  if (!importStyle || !meta.sideEffects) {
    return;
  }

  return meta.sideEffects;
};

export function SDataResolver(options: SDataResolverOptions = {}): ComponentResolver[] {
  const prefix = options.prefix ?? DEFAULT_PREFIX;

  return [
    {
      type: 'component',
      resolve: (name: string) => {
        const componentName = getName(name, prefix);

        if (!componentName) {
          return;
        }

        const meta = getComponentMetaMap()[componentName];

        if (!meta) {
          return;
        }

        return (
          options.resolve?.(meta, 'component') ?? {
            name: meta.importName,
            from: meta.from,
            sideEffects: resolveSideEffects(meta, options),
          }
        );
      },
    },
  ];
}

export const SDResolver = SDataResolver;
