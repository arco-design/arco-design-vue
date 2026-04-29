import { promises as fs } from 'node:fs';
import path from 'node:path';
import { build as rolldownBuild } from 'rolldown';
import { build as viteBuild } from 'vite';

const docsNextRoot = path.resolve(import.meta.dirname, '..');
const workspaceRoot = path.resolve(docsNextRoot, '..', '..');
const webVueRoot = path.resolve(workspaceRoot, 'packages', 'web-vue');
const webVueComponentsRoot = path.resolve(webVueRoot, 'components');
const webVueStyleRoot = path.resolve(webVueComponentsRoot, 'style');
const publicVendorRoot = path.resolve(docsNextRoot, 'public', 'vendor', 'sd-web-vue');
const tempStyleBuildRoot = path.resolve(docsNextRoot, '.temp-vendor-style');
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

  await fs.cp(webVueEsRoot, path.resolve(publicVendorRoot, 'es'), {
    recursive: true,
    force: true,
  });
  await fs.mkdir(path.resolve(publicVendorRoot, 'dist'), { recursive: true });
  await bundleVendorDependencies(vendorDependencyOutputs);
  await writeVendorImportMap(vendorDependencyOutputs);

  await bundleVendorStyles(styleEntryPath);
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
