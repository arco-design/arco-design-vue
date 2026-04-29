import type { PluginOption, UserConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import CleanCSS from 'clean-css';
import { globSync } from 'glob';
import fs from 'node:fs';
import { access, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';
import { defineConfig } from 'vite-plus';
import { configDefaults } from 'vitest/config';

import cssjsPlugin from './scripts/plugins/vite-plugin-cssjs.mjs';
import externalPlugin from './scripts/plugins/vite-plugin-external.mjs';
import vueExportHelperPlugin from './scripts/plugins/vite-plugin-vue-export-helper.mjs';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

const resolveFromRoot = (...segments: string[]) => path.resolve(packageRoot, ...segments);

const componentsRoot = resolveFromRoot('components');

const styleAliasEntries = [
  {
    find: /^@style\/(.*)$/,
    replacement: `${resolveFromRoot('components/style')}/$1`,
  },
  {
    find: /^@components\/(.*)$/,
    replacement: `${componentsRoot}/$1`,
  },
];

const sassFileExtensions = ['.scss', '.sass', '.css'];

const langFiles = globSync('components/locale/lang/*.ts', {
  cwd: packageRoot,
  posix: true,
});

function createTestSupportConfig(): UserConfig {
  return {
    resolve: {
      alias: [
        ...styleAliasEntries,
        {
          find: /^@sdata\/web-vue$/,
          replacement: resolveFromRoot('components/index.ts'),
        },
        {
          find: /^@sdata\/web-vue\/es\/icon$/,
          replacement: resolveFromRoot('components/icon/index.ts'),
        },
        {
          find: /^@sdata\/web-vue\/es\/locale\/lang\/(.*)$/,
          replacement: `${resolveFromRoot('components/locale/lang')}/$1`,
        },
      ],
    },
    plugins: [vue(), vueJsx()],
  };
}

function createRunConfig() {
  return {
    tasks: {
      'clean:outputs': {
        command: 'pnpm exec rimraf es lib dist .temp-types',
        cache: false,
      },
      'gen:icons': {
        command: 'node ./scripts/gen-icons.mjs',
      },
      'gen:web-types': {
        command: 'node ./scripts/gen-web-types.mjs',
      },
      'task:dev-component': {
        command: 'vite build --config vite.config.ts --mode dev-component --watch',
        cache: false,
      },
      'task:build-module': {
        command:
          'vp run clean:outputs && vp run task:build-module-main && vp run task:build-module-icon && vp run write:icon-compat',
      },
      'task:build-module-main': {
        command: 'vite build --config vite.config.ts --mode build-module',
        cache: false,
      },
      'task:build-module-icon': {
        command: 'vite build --config vite.config.ts --mode build-module-icon',
        cache: false,
      },
      'write:icon-compat': {
        command: 'node ./scripts/write-icon-compat-entry.mjs',
        cache: false,
      },
      'task:build-umd-component': {
        command: 'vite build --config vite.config.ts --mode build-umd-component',
      },
      'task:build-umd-component-min': {
        command: 'vite build --config vite.config.ts --mode build-umd-component-min',
      },
      'task:build-umd-icon': {
        command: 'vite build --config vite.config.ts --mode build-umd-icon',
      },
      'task:build-umd-icon-min': {
        command: 'vite build --config vite.config.ts --mode build-umd-icon-min',
      },
      'task:build-component': {
        command:
          'vp run clean:outputs && vp run task:build-module && vp run task:build-umd-component && vp run task:build-umd-component-min && vp run task:build-umd-icon && vp run task:build-umd-icon-min',
      },
      'task:build-style': {
        command: 'vite build --config vite.config.ts --mode build-style',
      },
      'task:build-dts': {
        command: 'node ./scripts/build-dts.mjs',
      },
    },
  };
}

function createModuleBuildConfig(): UserConfig {
  return {
    mode: 'production',
    resolve: {
      alias: styleAliasEntries,
    },
    build: {
      target: 'es2015',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      reportCompressedSize: false,
      rollupOptions: {
        input: ['components/index.ts', ...langFiles],
        output: {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      },
      lib: {
        entry: 'components/index.ts',
        formats: ['es'],
      },
    },
    plugins: [externalPlugin(), vue(), vueJsx(), vueExportHelperPlugin()],
  };
}

function createIconModuleBuildConfig(): UserConfig {
  return {
    mode: 'production',
    resolve: {
      alias: styleAliasEntries,
    },
    build: {
      target: 'es2015',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          format: 'es',
          entryFileNames: 'icon.js',
          inlineDynamicImports: true,
        },
      },
      lib: {
        entry: 'components/icon/index.ts',
        formats: ['es'],
      },
    },
    plugins: [externalPlugin(), vue(), vueJsx(), vueExportHelperPlugin()],
  };
}

function createUmdBuildConfig(type: 'component' | 'icon', minify: boolean): UserConfig {
  const entry = type === 'component' ? 'components/sd-vue.ts' : 'components/icon/sd-vue-icon.ts';
  const entryFileName = type === 'component' ? 'sd-vue' : 'sd-vue-icon';
  const name = type === 'component' ? 'SDVue' : 'SDVueIcon';

  return {
    mode: 'production',
    resolve: {
      alias: styleAliasEntries,
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: !minify,
      minify: minify ? 'esbuild' : false,
      reportCompressedSize: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          format: 'umd',
          name,
          entryFileNames: `${entryFileName}${minify ? '.min' : ''}.js`,
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry,
        formats: ['umd'],
        name,
      },
    },
    plugins: [vue(), vueJsx()],
  };
}

async function copyInto(targetPath: string, sourcePath: string) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  await cp(sourcePath, targetPath, { recursive: true, force: true });
}

async function canAccessFile(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function resolveSassImport(url: string, fromDir: string) {
  const normalizedUrl = url.replaceAll('\\', '/');

  if (/^(?:sass:|https?:|file:)/.test(normalizedUrl)) {
    return null;
  }

  const aliasedPath = styleAliasEntries.reduce<string | null>((resolved, aliasEntry) => {
    if (resolved || typeof aliasEntry.find === 'string') {
      return resolved;
    }

    const match = aliasEntry.find.exec(normalizedUrl);

    if (!match) {
      return resolved;
    }

    return aliasEntry.replacement.replace('$1', match[1] ?? '');
  }, null);
  let basePath = path.resolve(fromDir, normalizedUrl);

  if (aliasedPath) {
    basePath = path.resolve(aliasedPath);
  } else if (normalizedUrl.startsWith('/')) {
    basePath = path.resolve(packageRoot, `.${normalizedUrl}`);
  }
  const extension = path.extname(basePath);
  const dirname = path.dirname(basePath);
  const basename = path.basename(basePath);
  const candidates = extension
    ? [basePath]
    : [
        ...sassFileExtensions.map((current) => `${basePath}${current}`),
        ...sassFileExtensions.map((current) => path.join(dirname, `_${basename}${current}`)),
        ...sassFileExtensions.map((current) => path.join(basePath, `index${current}`)),
        ...sassFileExtensions.map((current) => path.join(basePath, `_index${current}`)),
      ];

  return candidates.find((current) => fs.existsSync(current)) ?? null;
}

const sassImporter: sass.Importer<'async'> = {
  canonicalize(url, context) {
    const fromDir = context.containingUrl
      ? path.dirname(fileURLToPath(context.containingUrl))
      : packageRoot;
    const resolved = resolveSassImport(url, fromDir);

    return resolved ? pathToFileURL(resolved) : null;
  },
  async load(canonicalUrl) {
    if (canonicalUrl.protocol !== 'file:') {
      return null;
    }

    const filePath = fileURLToPath(canonicalUrl);
    const extension = path.extname(filePath);
    let syntax: 'scss' | 'indented' | 'css' = 'scss';

    if (extension === '.sass') {
      syntax = 'indented';
    } else if (extension === '.css') {
      syntax = 'css';
    }
    const source = await fs.promises.readFile(filePath, 'utf8');

    return {
      contents: source,
      syntax,
      sourceMapUrl: canonicalUrl,
    };
  },
};

async function compileStyleEntry(absolutePath: string, filename: string) {
  const source = await fs.promises.readFile(absolutePath, 'utf8');
  const result = await sass.compileStringAsync(source, {
    loadPaths: [path.resolve(componentsRoot, path.dirname(filename)), packageRoot],
    importers: [sassImporter],
    style: 'expanded',
    url: pathToFileURL(absolutePath),
  });

  return result.css;
}

async function emitStyleArtifacts(log?: (message: string) => void) {
  const files = globSync('**/*.{scss,js}', {
    cwd: componentsRoot,
    posix: true,
  });
  const styleEntries = globSync('**/style/index.ts', {
    cwd: componentsRoot,
    posix: true,
  }).map((filename) => filename.replace(/\.ts$/, '.scss'));
  const styleEntrySet = new Set(styleEntries);
  let compiledStyleEntryCount = 0;

  log?.(
    `Generating style artifacts for ${styleEntries.length} component style entries and root bundle...`,
  );

  for (const filename of files) {
    const absolute = resolveFromRoot('components', filename);
    await copyInto(resolveFromRoot('es', filename), absolute);

    if (styleEntrySet.has(filename)) {
      compiledStyleEntryCount += 1;
      log?.(`Compiling style entry ${compiledStyleEntryCount}/${styleEntries.length}: ${filename}`);
      const css = await compileStyleEntry(absolute, filename);
      const cssFilename = filename.replace(/\.scss$/, '.css');
      await writeFile(resolveFromRoot('es', cssFilename), css, 'utf8');
    }
  }

  const indexScssPath = resolveFromRoot('components', 'index.scss');
  const hasScssIndex = await canAccessFile(indexScssPath);

  if (hasScssIndex) {
    await copyInto(resolveFromRoot('es', 'index.scss'), indexScssPath);
  }

  log?.('Compiling root style bundle: components/index.scss');
  const css = await compileStyleEntry(indexScssPath, 'index.scss');
  await writeFile(resolveFromRoot('es', 'index.css'), css, 'utf8');

  await rm(resolveFromRoot('dist'), { recursive: true, force: true });
  await mkdir(resolveFromRoot('dist'), { recursive: true });

  await writeFile(resolveFromRoot('dist', 'sd.scss'), "@import '../es/index.scss';\n\n", 'utf8');
  await writeFile(resolveFromRoot('dist', 'sd.css'), css, 'utf8');

  const compress = (new CleanCSS() as any).minify(css);
  await writeFile(resolveFromRoot('dist', 'sd.min.css'), compress.styles, 'utf8');
  log?.('Style artifact generation completed.');
}

function createStyleArtifactsPlugin(): PluginOption {
  return {
    name: 'sd-style-artifacts',
    async buildStart() {
      await emitStyleArtifacts((message) => this.info(message));
    },
  };
}

function createStyleBuildConfig(): UserConfig {
  const indexFiles = globSync('components/**/style/index.ts', {
    cwd: packageRoot,
    posix: true,
  });
  const rollupInput = Object.fromEntries(
    indexFiles.map((current) => [current.slice(11, -3), resolveFromRoot(current)]),
  );

  return {
    mode: 'production',
    resolve: {
      alias: styleAliasEntries,
    },
    build: {
      target: 'es2015',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      reportCompressedSize: false,
      rollupOptions: {
        external: /scss$/,
        input: rollupInput,
        output: {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
        },
      },
      lib: {
        entry: 'components/index.ts',
        formats: ['es'],
      },
    },
    plugins: [createStyleArtifactsPlugin(), cssjsPlugin()],
  };
}

function createDevBuildConfig(): UserConfig {
  return {
    mode: 'development',
    resolve: {
      alias: styleAliasEntries,
    },
    build: {
      target: 'es2015',
      outDir: 'es',
      emptyOutDir: true,
      minify: false,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      },
      lib: {
        entry: 'components/index.ts',
        formats: ['es'],
      },
      watch: {},
    },
    plugins: [externalPlugin(), vue(), vueJsx()],
  };
}

export default defineConfig(({ mode }) => {
  const run = createRunConfig();
  const test: any = {
    globals: true,
    environment: 'jsdom',
    testTimeout: 15000,
    setupFiles: ['./vitest.setup.ts'],
    sequence: {
      hooks: 'list' as const,
    },
    include: [
      'components/**/__test__/**/*.test.{ts,tsx}',
      'components/**/__test__/**/*.spec.{ts,tsx}',
    ],
    exclude: [...configDefaults.exclude, '**/{dist,lib,es,json}/**', '**/.temp-types/**'],
    snapshotSerializers: ['jest-serializer-vue'],
  };

  if (mode === 'dev-component') {
    return {
      ...createDevBuildConfig(),
      run,
      test,
    } as any;
  }

  if (mode === 'build-module') {
    return {
      ...createModuleBuildConfig(),
      run,
      test,
    } as any;
  }

  if (mode === 'build-module-icon') {
    return {
      ...createIconModuleBuildConfig(),
      run,
      test,
    } as any;
  }

  if (mode === 'build-umd-component') {
    return {
      ...createUmdBuildConfig('component', false),
      run,
      test,
    } as any;
  }

  if (mode === 'build-umd-component-min') {
    return {
      ...createUmdBuildConfig('component', true),
      run,
      test,
    } as any;
  }

  if (mode === 'build-umd-icon') {
    return {
      ...createUmdBuildConfig('icon', false),
      run,
      test,
    } as any;
  }

  if (mode === 'build-umd-icon-min') {
    return {
      ...createUmdBuildConfig('icon', true),
      run,
      test,
    } as any;
  }

  if (mode === 'build-style') {
    return {
      ...createStyleBuildConfig(),
      run,
      test,
    } as any;
  }

  return {
    ...createTestSupportConfig(),
    run,
    test,
  } as any;
});
