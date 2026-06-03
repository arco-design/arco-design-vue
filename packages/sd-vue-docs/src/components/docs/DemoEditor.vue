<script setup lang="ts">
  import { File, Repl, useStore } from '@vue/repl';
  import type { ReplStore } from '@vue/repl';
  import Monaco from '@vue/repl/monaco-editor';
  import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';

  import overlayScrollbarsStylesheetHref from 'overlayscrollbars/overlayscrollbars.css?url';
  import vueRuntimeSource from 'vue/dist/vue.runtime.esm-browser.js?raw';

  import demoStylesheetHref from '../../styles/demo.css?url';

  function createJavaScriptDataUrl(source: string) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
  }

  interface BrowserComponentExportEntry {
    importMode: 'default' | 'named';
    importedName?: string;
    pluginSpecifier?: string | null;
    specifier: string;
  }

  interface BrowserComponentManifest {
    exports: Record<string, BrowserComponentExportEntry>;
    tags: Record<string, string>;
  }

  interface BrowserTypeReferenceManifestEntry {
    code: string;
    kind: string;
    modulePath: string;
  }

  interface BrowserTypeReferenceManifest {
    packageName: string;
    types: Record<string, BrowserTypeReferenceManifestEntry>;
  }

  interface ParsedImportSpecifier {
    importedName: string;
    isType: boolean;
    localName: string;
  }

  let cachedVendorDependencyImports: Record<string, string> | null = null;
  let cachedVendorDependencyImportsPromise: Promise<Record<string, string>> | null = null;
  let cachedComponentManifest: BrowserComponentManifest | null = null;
  let cachedComponentManifestPromise: Promise<BrowserComponentManifest> | null = null;
  let cachedTypeReferenceManifest: BrowserTypeReferenceManifest | null = null;
  let cachedTypeReferenceManifestPromise: Promise<BrowserTypeReferenceManifest> | null = null;

  function parseNamedImportSpecifiers(clause: string) {
    const trimmedClause = clause.trim();

    if (!trimmedClause.startsWith('{') || !trimmedClause.endsWith('}')) {
      return null;
    }

    return trimmedClause
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map<ParsedImportSpecifier>((item) => {
        const isType = item.startsWith('type ');
        const normalizedItem = isType ? item.slice(5).trim() : item;
        const [importedName, localAlias] = normalizedItem
          .split(/\s+as\s+/i)
          .map((part) => part.trim());

        return {
          importedName,
          isType,
          localName: localAlias ?? importedName,
        };
      });
  }

  function renderNamedImportSpecifier(specifier: ParsedImportSpecifier) {
    const aliasClause =
      specifier.localName === specifier.importedName ? '' : ` as ${specifier.localName}`;
    return `${specifier.isType ? 'type ' : ''}${specifier.importedName}${aliasClause}`;
  }

  function extractUsedTagNames(source: string) {
    const tagNames = new Set<string>();

    for (const match of source.matchAll(/<\/?([a-z][\w-]*)\b/g)) {
      const tagName = match[1];

      if (!tagName?.startsWith('sd')) {
        continue;
      }

      tagNames.add(tagName);
    }

    return Array.from(tagNames).sort((left, right) => left.localeCompare(right));
  }

  function buildPreviewLibrarySetup(
    source: string,
    manifest: BrowserComponentManifest | null,
    theme: 'light' | 'dark',
  ) {
    const pluginSpecifiers = manifest
      ? extractUsedTagNames(source)
          .map((tagName) => manifest.tags[tagName])
          .filter((exportName): exportName is string => Boolean(exportName))
          .map((exportName) => manifest.exports[exportName]?.pluginSpecifier)
          .filter((specifier): specifier is string => Boolean(specifier))
      : [];
    const uniquePluginSpecifiers = Array.from(new Set(pluginSpecifiers));
    const importCode = uniquePluginSpecifiers
      .map((specifier, index) => `import __SdPlugin${index} from '${specifier}';`)
      .join('\n');
    const useStatements = uniquePluginSpecifiers.map((_, index) => `app.use(__SdPlugin${index});`);

    useStatements.push(
      `if (${JSON.stringify(theme)} === 'dark') { document.body.setAttribute('sd-theme', 'dark'); } else { document.body.removeAttribute('sd-theme'); }`,
    );

    return {
      importCode,
      useCode: useStatements.join('\n'),
    };
  }

  function rewriteWebVueRuntimeImports(source: string, manifest: BrowserComponentManifest | null) {
    if (!manifest) {
      return source;
    }

    return source.replace(
      /import\s+([\s\S]*?)\s+from\s+['"]@sdata\/web-vue['"];?/g,
      (fullMatch, clause: string) => {
        const namedSpecifiers = parseNamedImportSpecifiers(clause);

        if (!namedSpecifiers) {
          return fullMatch;
        }

        const transformedImports: string[] = [];
        const unresolvedValueSpecifiers: ParsedImportSpecifier[] = [];
        const unresolvedTypeSpecifiers: ParsedImportSpecifier[] = [];

        for (const specifier of namedSpecifiers) {
          if (specifier.isType) {
            unresolvedTypeSpecifiers.push(specifier);
            continue;
          }

          const exportEntry = manifest.exports[specifier.importedName];

          if (!exportEntry) {
            unresolvedValueSpecifiers.push(specifier);
            continue;
          }

          if (exportEntry.importMode === 'default') {
            transformedImports.push(
              `import ${specifier.localName} from '${exportEntry.specifier}';`,
            );
            continue;
          }

          const importedName = exportEntry.importedName ?? specifier.importedName;
          const aliasClause =
            specifier.localName === importedName ? '' : ` as ${specifier.localName}`;

          transformedImports.push(
            `import { ${importedName}${aliasClause} } from '${exportEntry.specifier}';`,
          );
        }

        if (unresolvedValueSpecifiers.length > 0) {
          transformedImports.push(
            `import { ${unresolvedValueSpecifiers.map(renderNamedImportSpecifier).join(', ')} } from '@sdata/web-vue';`,
          );
        }

        if (unresolvedTypeSpecifiers.length > 0) {
          transformedImports.push(
            `import type { ${unresolvedTypeSpecifiers.map(renderNamedImportSpecifier).join(', ')} } from '@sdata/web-vue';`,
          );
        }

        return transformedImports.join('\n');
      },
    );
  }

  async function loadVendorDependencyImports() {
    if (cachedVendorDependencyImports) {
      return cachedVendorDependencyImports;
    }

    cachedVendorDependencyImportsPromise ??= fetch('/vendor/sd-web-vue/deps/import-map.json')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`依赖映射加载失败: ${response.status}`);
        }

        const manifest = (await response.json()) as { imports?: Record<string, string> };
        cachedVendorDependencyImports = manifest.imports ?? {};
        return cachedVendorDependencyImports;
      })
      .catch((error) => {
        cachedVendorDependencyImportsPromise = null;
        throw error;
      });

    return cachedVendorDependencyImportsPromise;
  }

  async function loadComponentManifest() {
    if (cachedComponentManifest) {
      return cachedComponentManifest;
    }

    cachedComponentManifestPromise ??= fetch('/vendor/sd-web-vue/deps/component-manifest.json')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`组件清单加载失败: ${response.status}`);
        }

        cachedComponentManifest = (await response.json()) as BrowserComponentManifest;
        return cachedComponentManifest;
      })
      .catch((error) => {
        cachedComponentManifestPromise = null;
        throw error;
      });

    return cachedComponentManifestPromise;
  }

  async function loadTypeReferenceManifest() {
    if (cachedTypeReferenceManifest) {
      return cachedTypeReferenceManifest;
    }

    cachedTypeReferenceManifestPromise ??= fetch(
      '/vendor/sd-web-vue/deps/type-reference-manifest.json',
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`类型索引加载失败: ${response.status}`);
        }

        cachedTypeReferenceManifest = (await response.json()) as BrowserTypeReferenceManifest;
        return cachedTypeReferenceManifest;
      })
      .catch((error) => {
        cachedTypeReferenceManifestPromise = null;
        throw error;
      });

    return cachedTypeReferenceManifestPromise;
  }

  const vueModuleUrl = createJavaScriptDataUrl(vueRuntimeSource);

  const props = defineProps<{
    source: string;
    mainFile: string;
  }>();

  const expanded = shallowRef(false);
  const loadError = shallowRef('');
  const currentTheme = shallowRef<'light' | 'dark'>('light');
  const replStore = shallowRef<ReplStore | null>(null);
  const themeObserver = shallowRef<MutationObserver | null>(null);
  const browserComponentManifest = shallowRef<BrowserComponentManifest | null>(null);
  const vendorDependencyImports = shallowRef<Record<string, string>>({});
  const previewEnvironmentScriptCloseTag = '</scr' + 'ipt>';
  const previewThemeScriptCloseTag = '</scr' + 'ipt>';

  const normalizedCode = computed(() => props.source.trim());
  const resolvedSource = computed(() =>
    rewriteWebVueRuntimeImports(normalizedCode.value, browserComponentManifest.value),
  );
  const replTheme = computed(() => currentTheme.value);
  const previewLibrarySetup = computed(() =>
    buildPreviewLibrarySetup(normalizedCode.value, browserComponentManifest.value, replTheme.value),
  );
  const editorFiles = computed(() => ({
    [props.mainFile]: resolvedSource.value,
    'import-map.json': JSON.stringify(importMap.value, null, 2),
  }));

  const previewOptions = computed(() => ({
    headHTML: [
      '<link rel="stylesheet" href="/vendor/sd-web-vue/dist/sd.css">',
      `<link rel="stylesheet" href="${overlayScrollbarsStylesheetHref}">`,
      `<link rel="stylesheet" href="${demoStylesheetHref}">`,
      '<style>body{margin:0;padding:16px;font-family:Inter,Segoe UI,sans-serif;}body[sd-theme="dark"]{background:#141414;color:#f2f3f5;}#app{min-height:40px;}</style>',
      `<script>globalThis.process??={env:{NODE_ENV:'production'}};globalThis.global??=globalThis;${previewEnvironmentScriptCloseTag}`,
      `<script>document.addEventListener('DOMContentLoaded',function(){if(${JSON.stringify(replTheme.value)}==='dark'){document.body.setAttribute('sd-theme','dark');}else{document.body.removeAttribute('sd-theme');}});${previewThemeScriptCloseTag}`,
    ].join(''),
    customCode: previewLibrarySetup.value,
  }));
  const importMap = computed(() => ({
    imports: {
      'vue': vueModuleUrl,
      '@sdata/web-vue': '/vendor/sd-web-vue/es/index.js',
      '@sdata/web-vue/es/icon': '/vendor/sd-web-vue/es/icon/index.js',
      '@sdata/web-vue/': '/vendor/sd-web-vue/',
      '@sdata/web-vue/es/icon.js': '/vendor/sd-web-vue/es/icon/index.js',
      ...vendorDependencyImports.value,
    },
  }));

  async function ensureVendorImportMapLoaded() {
    if (
      Object.keys(vendorDependencyImports.value).length > 0 &&
      browserComponentManifest.value &&
      cachedTypeReferenceManifest
    ) {
      return;
    }

    const [imports, manifest, typeManifest] = await Promise.all([
      loadVendorDependencyImports(),
      loadComponentManifest(),
      loadTypeReferenceManifest(),
    ]);

    vendorDependencyImports.value = imports;
    browserComponentManifest.value = manifest;
    cachedTypeReferenceManifest = typeManifest;
  }

  function indentLines(source: string, indent = '  ') {
    return source
      .split('\n')
      .map((line) => `${indent}${line}`)
      .join('\n');
  }

  function buildModuleDeclarations(manifest: BrowserComponentManifest) {
    const modules = new Map<string, { defaultExport: boolean; namedExports: Set<string> }>();

    for (const [exportName, exportEntry] of Object.entries(manifest.exports)) {
      const bucket = modules.get(exportEntry.specifier) ?? {
        defaultExport: false,
        namedExports: new Set<string>(),
      };

      if (exportEntry.importMode === 'default') {
        bucket.defaultExport = true;
      }

      if (exportEntry.importMode === 'named') {
        bucket.namedExports.add(exportEntry.importedName ?? exportName);
      }

      modules.set(exportEntry.specifier, bucket);
    }

    return Array.from(modules.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([specifier, exports]) => {
        const lines = [`declare module '${specifier}' {`];

        if (exports.defaultExport) {
          lines.push('  const component: any;');
          lines.push('  export default component;');
        }

        for (const namedExport of Array.from(exports.namedExports).sort((left, right) =>
          left.localeCompare(right),
        )) {
          lines.push(`  export const ${namedExport}: any;`);
        }

        lines.push('}');
        return lines.join('\n');
      })
      .join('\n\n');
  }

  function buildTypeReferenceDeclarationFile(
    typeManifest: BrowserTypeReferenceManifest,
    componentManifest: BrowserComponentManifest,
  ) {
    const typeLines = Object.entries(typeManifest.types)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([, entry]) => indentLines(entry.code))
      .join('\n\n');
    const valueExports = Object.keys(componentManifest.exports)
      .sort((left, right) => left.localeCompare(right))
      .map((exportName) => `  export const ${exportName}: any;`)
      .join('\n');
    const moduleDeclarations = buildModuleDeclarations(componentManifest);

    return [
      "declare module '@sdata/web-vue' {",
      valueExports,
      '  const plugin: { install(...args: any[]): void };',
      '  export default plugin;',
      typeLines,
      '}',
      '',
      "declare module '@sdata/web-vue/es/icon.js' {",
      '  const iconPlugin: any;',
      '  export default iconPlugin;',
      '}',
      '',
      moduleDeclarations,
    ]
      .filter(Boolean)
      .join('\n');
  }

  function applyHiddenTypeFiles(
    store: ReplStore,
    componentManifest: BrowserComponentManifest,
    typeManifest: BrowserTypeReferenceManifest,
  ) {
    const declarationFileName = 'src/types/sd-web-vue.generated.d.ts';
    const declarationFile = new File(
      declarationFileName,
      buildTypeReferenceDeclarationFile(typeManifest, componentManifest),
      true,
    );
    const tsconfigFile = new File(
      'tsconfig.json',
      JSON.stringify(
        {
          compilerOptions: {
            allowJs: true,
            checkJs: false,
            jsx: 'preserve',
            module: 'ESNext',
            moduleResolution: 'Bundler',
            strict: true,
            target: 'ES2022',
            types: [],
          },
          include: ['src/**/*'],
        },
        null,
        2,
      ),
      true,
    );

    store.files[declarationFileName] = declarationFile;
    store.files['tsconfig.json'] = tsconfigFile;
    store.reloadLanguageTools?.();
  }

  function installBrowserProcessShim() {
    const shimTarget = globalThis as Record<string, unknown>;
    const processShim =
      (shimTarget.process as
        | {
            env?: Record<string, string>;
            argv?: string[];
            cwd?: () => string;
            versions?: Record<string, string>;
          }
        | undefined) ?? {};

    shimTarget.global ??= globalThis;
    processShim.env ??= {};
    processShim.env.NODE_ENV ??= 'production';
    processShim.argv ??= [];
    processShim.cwd ??= () => '/';
    shimTarget.process = processShim;
  }

  function applySafeVirtualFs(store: ReplStore) {
    const target = ('value' in store.sfcOptions ? store.sfcOptions.value : store.sfcOptions) as {
      script?: {
        fs?: {
          fileExists(file: unknown): boolean;
          readFile(file: unknown): string;
        };
      };
    };

    target.script ||= {};
    target.script.fs = {
      fileExists(file: unknown) {
        if (typeof file !== 'string' || file.length === 0) {
          return false;
        }

        const normalizedFile = file.startsWith('/') ? file.slice(1) : file;
        return Boolean(store.files[normalizedFile]);
      },
      readFile(file: unknown) {
        if (typeof file !== 'string' || file.length === 0) {
          return '';
        }

        const normalizedFile = file.startsWith('/') ? file.slice(1) : file;
        return store.files[normalizedFile]?.code ?? '';
      },
    };
  }

  function syncTheme() {
    currentTheme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  watch(normalizedCode, (code) => {
    replStore.value?.setFiles(editorFiles.value, props.mainFile);
  });

  watch(currentTheme, () => {
    replStore.value?.setFiles(editorFiles.value, props.mainFile);
  });

  async function ensureReplLoaded() {
    if (replStore.value) {
      return;
    }

    loadError.value = '';

    try {
      installBrowserProcessShim();
      await ensureVendorImportMapLoaded();
      const store = useStore({}, '');

      store.showOutput = false;
      store.outputMode = 'preview';

      await store.setFiles(editorFiles.value, props.mainFile);

      if (browserComponentManifest.value && cachedTypeReferenceManifest) {
        applyHiddenTypeFiles(store, browserComponentManifest.value, cachedTypeReferenceManifest);
      }

      applySafeVirtualFs(store);

      replStore.value = store;
    } catch (error) {
      loadError.value = error instanceof Error ? error.message : '编辑器加载失败';
    }
  }

  async function toggleEditor() {
    expanded.value = !expanded.value;

    if (expanded.value) {
      await ensureReplLoaded();
    }
  }

  onMounted(() => {
    installBrowserProcessShim();
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    themeObserver.value = observer;
  });

  onBeforeUnmount(() => {
    themeObserver.value?.disconnect();
  });
</script>

<template>
  <div class="demo-editor">
    <div class="demo-editor__toolbar">
      <button class="demo-editor__button" type="button" @click="toggleEditor">
        {{ expanded ? '收起' : '在线编辑' }}
      </button>
    </div>

    <div v-if="expanded" class="demo-editor__panel">
      <div v-if="loadError" class="demo-editor__state demo-editor__state--error">
        {{ loadError }}
      </div>
      <Repl
        v-else-if="replStore"
        :editor="Monaco"
        :show-compile-output="false"
        :show-import-map="false"
        :show-ssr-output="false"
        :store="replStore"
        :theme="replTheme"
        :preview-options="previewOptions"
      />
    </div>
  </div>
</template>

<style scoped>
  .demo-editor__toolbar {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    background: var(--sl-color-gray-7);
  }

  .demo-editor__button {
    margin-left: auto;
    padding: 0.1rem 0.5rem;
    color: white;
    font: inherit;
    font-size: smaller;
    background: var(--sl-color-accent);
    border: 0;
    border-radius: 999px;
    cursor: pointer;
  }

  .demo-editor__panel {
    border-top: 1px solid var(--sl-color-gray-5);
  }

  .demo-editor__state {
    padding: 1rem;
    color: var(--sl-color-gray-2);
  }

  .demo-editor__state--error {
    color: #d92d20;
  }

  .demo-editor__panel :deep(.vue-repl) {
    height: 540px;
  }

  .demo-editor__panel :deep(.vue-repl, .vue-repl pre, .vue-repl code) {
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  }
</style>
