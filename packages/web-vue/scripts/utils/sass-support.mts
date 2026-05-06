import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';

type AliasEntry = {
  find: RegExp;
  replacement: string;
};

type CreateSassStyleSupportOptions = {
  packageRoot: string;
  componentsRoot: string;
  styleRoot: string;
};

const sassFileExtensions = ['.scss', '.sass', '.css'];

export function createSassStyleSupport({
  packageRoot,
  componentsRoot,
  styleRoot,
}: CreateSassStyleSupportOptions) {
  const styleAliasEntries: AliasEntry[] = [
    {
      find: /^@style\/(.*)$/,
      replacement: `${styleRoot}/$1`,
    },
    {
      find: /^@components\/(.*)$/,
      replacement: `${componentsRoot}/$1`,
    },
  ];

  function resolveSassImport(url: string, fromDir: string) {
    const normalizedUrl = url.replaceAll('\\', '/');

    if (/^(?:sass:|https?:|file:)/.test(normalizedUrl)) {
      return null;
    }

    const aliasedPath = styleAliasEntries.reduce<string | null>((resolved, aliasEntry) => {
      if (resolved) {
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

  return {
    styleAliasEntries,
    resolveSassImport,
    sassImporter,
    compileStyleEntry,
  };
}
