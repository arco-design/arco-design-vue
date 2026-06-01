import { promises as fs } from 'node:fs';
import path from 'node:path';
import { build as rolldownBuild } from 'rolldown';
import { build as viteBuild } from 'vite';

const docsNextRoot = path.resolve(import.meta.dirname, '..');
const workspaceRoot = path.resolve(docsNextRoot, '..', '..');
const webVueRoot = path.resolve(workspaceRoot, 'packages', 'web-vue');
const webVueComponentsRoot = path.resolve(webVueRoot, 'components');
const webVueStyleRoot = path.resolve(webVueComponentsRoot, 'style');
const webVueVeturTagsPath = path.resolve(webVueRoot, 'json', 'vetur-tags.json');
const publicVendorRoot = path.resolve(docsNextRoot, 'public', 'vendor', 'sd-web-vue');
const tempStyleBuildRoot = path.resolve(docsNextRoot, '.temp-vendor-style');
const webVuePackageName = '@sdata/web-vue';
const importLikePatterns = [
  /\b(?:import|export)\b[^'"`]*?from\s*['"]([^./][^'"`]*)['"]/g,
  /\bimport\s*['"]([^./][^'"`]*)['"]/g,
  /\bimport\s*\(\s*['"]([^./][^'"`]*)['"]\s*\)/g,
];
const excludedSpecifiers = new Set(['vue', '@vue/shared']);

await resetVendorRoot();
await syncVendorAssets();

console.log('Synced docs vendor assets.');

async function resetVendorRoot() {
  await fs.rm(publicVendorRoot, { recursive: true, force: true });
  await fs.mkdir(publicVendorRoot, { recursive: true });
}

async function syncVendorAssets() {
  const webVueEsRoot = path.resolve(webVueRoot, 'es');
  const styleEntryCandidates = [path.resolve(webVueRoot, 'components', 'index.scss')];
  const styleEntryPath = await resolveFirstExistingPath(styleEntryCandidates);

  await assertExists(webVueEsRoot, 'packages/web-vue/es 不存在，无法同步在线编辑器浏览器模块。');
  if (!styleEntryPath) {
    throw new Error('packages/web-vue/components/index.scss 不存在，无法编译在线编辑器样式。');
  }

  const vendorDependencyOutputs = await collectVendorDependencyOutputs(webVueEsRoot);
  const componentManifest = await collectBrowserComponentManifest(webVueEsRoot);

  await fs.cp(webVueEsRoot, path.resolve(publicVendorRoot, 'es'), {
    recursive: true,
    force: true,
  });
  await fs.mkdir(path.resolve(publicVendorRoot, 'dist'), { recursive: true });
  await bundleVendorDependencies(vendorDependencyOutputs);
  await writeVendorImportMap(vendorDependencyOutputs);
  await writeComponentManifest(componentManifest);

  await bundleVendorStyles(styleEntryPath);
}

function toPascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function parseExportBindingClause(clause, modulePath, bindingMap) {
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
      const [importedName, localName] = namedImport.split(/\s+as\s+/i).map((item) => item.trim());

      if (!importedName) {
        continue;
      }

      bindingMap.set(localName ?? importedName, {
        importedName,
        importMode: 'named',
        modulePath,
      });
    }

    return;
  }

  const namespaceMatch = /^\*\s+as\s+([A-Za-z_$][\w$]*)$/.exec(trimmedClause);

  if (namespaceMatch?.[1]) {
    bindingMap.set(namespaceMatch[1], {
      importedName: '*',
      importMode: 'namespace',
      modulePath,
    });
    return;
  }

  const [defaultImport, remainingClause] = trimmedClause
    .split(/,\s*(?=\{|\*\s+as\s+)/)
    .map((item) => item.trim());

  if (defaultImport) {
    bindingMap.set(defaultImport, {
      importedName: 'default',
      importMode: 'default',
      modulePath,
    });
  }

  if (!remainingClause) {
    return;
  }

  parseExportBindingClause(remainingClause, modulePath, bindingMap);
}

async function collectBrowserComponentManifest(webVueEsRoot) {
  const entryPath = path.resolve(webVueEsRoot, 'index.js');
  const entrySource = await fs.readFile(entryPath, 'utf8');
  const veturTags = JSON.parse(await fs.readFile(webVueVeturTagsPath, 'utf8'));
  const bindingMap = collectBrowserEntryBindings(entrySource);
  const exports = collectBrowserExportEntries(entrySource, bindingMap);
  const tags = collectBrowserTagEntries(veturTags, exports);

  return { exports, tags };
}

function collectBrowserEntryBindings(entrySource) {
  const bindingMap = new Map();

  for (const match of entrySource.matchAll(/import\s+([\s\S]*?)\s+from\s+["'](\.[^"']+)["'];/g)) {
    const clause = match[1];
    const modulePath = match[2];

    if (!clause || !modulePath) {
      continue;
    }

    parseExportBindingClause(clause, modulePath, bindingMap);
  }

  return bindingMap;
}

function createBrowserExportEntry(binding) {
  const relativeModulePath = binding.modulePath.replace(/^\.\//, '');
  const isPluginExport =
    !binding.modulePath.startsWith('./_') && binding.modulePath !== './sd-vue.js';

  return {
    importMode: binding.importMode,
    importedName: binding.importMode === 'named' ? binding.importedName : undefined,
    pluginSpecifier: isPluginExport
      ? `${webVuePackageName}/es/${relativeModulePath.split('/')[0]}/index.js`
      : null,
    specifier: `${webVuePackageName}/es/${relativeModulePath}`,
  };
}

function collectBrowserExportEntries(entrySource, bindingMap) {
  const exportBlockMatch = /export\s*\{([\s\S]*?)\};?\s*$/.exec(entrySource);
  const exports = {};

  if (!exportBlockMatch?.[1]) {
    return exports;
  }

  const exportSpecifiers = exportBlockMatch[1]
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  for (const exportSpecifier of exportSpecifiers) {
    const [localName, exportedName] = exportSpecifier.split(/\s+as\s+/i).map((item) => item.trim());
    const exportName = exportedName ?? localName;

    if (!localName || !exportName || exportName === 'default') {
      continue;
    }

    const binding = bindingMap.get(localName);

    if (!binding || binding.importMode === 'namespace') {
      continue;
    }

    exports[exportName] = createBrowserExportEntry(binding);
  }

  return exports;
}

function getRawTagName(tagName) {
  if (tagName.startsWith('sd-')) {
    return tagName.slice(3);
  }

  if (tagName.startsWith('sd')) {
    return tagName.slice(2);
  }

  return tagName;
}

function collectBrowserTagEntries(veturTags, exports) {
  const tags = {};

  for (const tagName of Object.keys(veturTags)) {
    const exportName = toPascalCase(getRawTagName(tagName));

    if (!exports[exportName]?.pluginSpecifier) {
      continue;
    }

    tags[tagName] = exportName;
  }

  return tags;
}

async function bundleVendorStyles(styleEntryPath) {
  await fs.rm(tempStyleBuildRoot, { recursive: true, force: true });

  await viteBuild({
    configFile: false,
    publicDir: false,
    logLevel: 'silent',
    root: webVueRoot,
    resolve: {
      alias: {
        '@style': webVueStyleRoot,
        '@components': webVueComponentsRoot,
      },
    },
    build: {
      emptyOutDir: true,
      outDir: tempStyleBuildRoot,
      rollupOptions: {
        input: styleEntryPath,
        output: {
          assetFileNames: 'assets/[name][extname]',
          chunkFileNames: 'assets/[name].js',
          entryFileNames: 'assets/[name].js',
        },
      },
    },
  });

  const cssFiles = (await collectFiles(tempStyleBuildRoot)).filter((filePath) =>
    filePath.endsWith('.css'),
  );

  if (cssFiles.length !== 1) {
    throw new Error(`期望 Vite 产出 1 个 CSS 文件，实际得到 ${cssFiles.length} 个。`);
  }

  await fs.copyFile(cssFiles[0], path.resolve(publicVendorRoot, 'dist', 'sd.css'));
  await fs.rm(tempStyleBuildRoot, { recursive: true, force: true });
}

async function bundleVendorDependencies(vendorDependencyOutputs) {
  for (const [specifier, outputPath] of Object.entries(vendorDependencyOutputs)) {
    const outfile = path.resolve(publicVendorRoot, outputPath);

    await fs.mkdir(path.dirname(outfile), { recursive: true });
    await rolldownBuild({
      input: specifier,
      platform: 'browser',
      logLevel: 'silent',
      write: true,
      output: {
        file: outfile,
        format: 'esm',
      },
    });
  }
}

async function collectVendorDependencyOutputs(webVueEsRoot) {
  const sourceFiles = await collectFiles(webVueEsRoot);
  const specifiers = new Set();

  for (const filePath of sourceFiles) {
    if (!filePath.endsWith('.js')) {
      continue;
    }

    const source = await fs.readFile(filePath, 'utf8');

    for (const pattern of importLikePatterns) {
      pattern.lastIndex = 0;

      for (const match of source.matchAll(pattern)) {
        const specifier = match[1];

        if (!specifier || excludedSpecifiers.has(specifier)) {
          continue;
        }

        specifiers.add(specifier);
      }
    }
  }

  return Object.fromEntries(
    Array.from(specifiers)
      .sort((left, right) => left.localeCompare(right))
      .map((specifier) => [specifier, `deps/${specifier}.js`]),
  );
}

async function writeVendorImportMap(vendorDependencyOutputs) {
  const importMap = {
    imports: Object.fromEntries(
      Object.entries(vendorDependencyOutputs).map(([specifier, outputPath]) => [
        specifier,
        `/vendor/sd-web-vue/${outputPath.replaceAll('\\', '/')}`,
      ]),
    ),
  };

  await fs.writeFile(
    path.resolve(publicVendorRoot, 'deps', 'import-map.json'),
    JSON.stringify(importMap, null, 2),
  );
}

async function writeComponentManifest(componentManifest) {
  await fs.writeFile(
    path.resolve(publicVendorRoot, 'deps', 'component-manifest.json'),
    JSON.stringify(componentManifest, null, 2),
  );
}

async function collectFiles(rootPath) {
  const entries = await fs.readdir(rootPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.resolve(rootPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
      continue;
    }

    files.push(entryPath);
  }

  return files;
}

async function assertExists(targetPath, errorMessage) {
  try {
    await fs.access(targetPath);
  } catch {
    throw new Error(errorMessage);
  }
}

async function resolveFirstExistingPath(candidates) {
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // continue searching
    }
  }

  return null;
}
