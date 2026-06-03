import { promises as fs } from 'node:fs';
import path from 'node:path';

const declarationKinds = ['interface', 'type', 'enum'];

export async function buildTypeReferenceManifest({ workspaceRoot, webVueRoot }) {
  const publicTypesEntryPath = path.resolve(webVueRoot, 'components', 'index.ts');
  const exportedTypes = await collectPublicTypeExports(publicTypesEntryPath);
  const manifestEntries = [];
  const seenNames = new Set();

  for (const exportedType of exportedTypes) {
    if (seenNames.has(exportedType.name)) {
      continue;
    }

    const resolvedDeclaration = await resolveTypeDeclaration(
      exportedType.sourceFilePath,
      exportedType.importedName,
    );

    if (!resolvedDeclaration) {
      continue;
    }

    seenNames.add(exportedType.name);
    manifestEntries.push({
      code: resolvedDeclaration.code,
      kind: resolvedDeclaration.kind,
      modulePath: toPosixPath(path.relative(workspaceRoot, resolvedDeclaration.filePath)),
      name: exportedType.name,
    });
  }

  manifestEntries.sort((left, right) => left.name.localeCompare(right.name));

  return {
    generatedAt: new Date().toISOString(),
    packageName: '@sdata/web-vue',
    types: Object.fromEntries(
      manifestEntries.map((entry) => [
        entry.name,
        {
          code: entry.code,
          kind: entry.kind,
          modulePath: entry.modulePath,
        },
      ]),
    ),
  };
}

async function collectPublicTypeExports(entryFilePath) {
  const source = await fs.readFile(entryFilePath, 'utf8');
  const exports = [];

  for (const statement of matchExportTypeStatements(source)) {
    if (!statement.specifier) {
      continue;
    }

    const sourceFilePath = await resolveModulePath(entryFilePath, statement.specifier);
    const specifiers = parseNamedSpecifiers(statement.specifiers);

    for (const specifier of specifiers) {
      exports.push({
        importedName: specifier.importedName,
        name: specifier.exportedName,
        sourceFilePath,
      });
    }
  }

  return exports;
}

async function resolveTypeDeclaration(filePath, exportedName, visited = new Set()) {
  const visitKey = `${filePath}:${exportedName}`;

  if (visited.has(visitKey)) {
    return null;
  }

  visited.add(visitKey);

  const source = await fs.readFile(filePath, 'utf8');
  const directDeclaration = extractDeclaration(source, exportedName);

  if (directDeclaration) {
    return {
      ...directDeclaration,
      filePath,
    };
  }

  const imports = collectImports(source);

  for (const statement of matchExportTypeStatements(source)) {
    const specifiers = parseNamedSpecifiers(statement.specifiers);
    const matchingSpecifier = specifiers.find(
      (specifier) => specifier.exportedName === exportedName,
    );

    if (!matchingSpecifier) {
      continue;
    }

    if (statement.specifier) {
      return resolveTypeDeclaration(
        await resolveModulePath(filePath, statement.specifier),
        matchingSpecifier.importedName,
        visited,
      );
    }

    const importedSource = imports.get(matchingSpecifier.importedName);

    if (!importedSource) {
      continue;
    }

    return resolveTypeDeclaration(
      await resolveModulePath(filePath, importedSource),
      matchingSpecifier.importedName,
      visited,
    );
  }

  return null;
}

function collectImports(source) {
  const imports = new Map();
  const importPatterns = [
    /import\s+type\s+\{([\s\S]*?)\}\s+from\s+['"]([^'"]+)['"];?/g,
    /import\s+\{([\s\S]*?)\}\s+from\s+['"]([^'"]+)['"];?/g,
  ];

  for (const pattern of importPatterns) {
    for (const match of source.matchAll(pattern)) {
      const rawSpecifiers = match[1];
      const specifier = match[2];

      if (!rawSpecifiers || !specifier) {
        continue;
      }

      for (const namedSpecifier of parseNamedSpecifiers(rawSpecifiers)) {
        imports.set(namedSpecifier.exportedName, specifier);
        imports.set(namedSpecifier.importedName, specifier);
      }
    }
  }

  return imports;
}

function matchExportTypeStatements(source) {
  return Array.from(
    source.matchAll(/export\s+type\s+\{([\s\S]*?)\}(?:\s+from\s+['"]([^'"]+)['"])?;?/g),
    (match) => ({
      specifier: match[2] ?? null,
      specifiers: match[1] ?? '',
    }),
  );
}

function parseNamedSpecifiers(source) {
  return source
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const normalizedItem = item.replace(/^type\s+/, '').trim();
      const [importedName, exportedName] = normalizedItem
        .split(/\s+as\s+/i)
        .map((part) => part.trim());

      return {
        exportedName: exportedName ?? importedName,
        importedName,
      };
    });
}

function extractDeclaration(source, typeName) {
  for (const kind of declarationKinds) {
    const matcher = new RegExp(`export\\s+${kind}\\s+${escapeRegExp(typeName)}\\b`, 'm');
    const match = matcher.exec(source);

    if (!match || match.index < 0) {
      continue;
    }

    const code =
      kind === 'type'
        ? extractTypeAlias(source, match.index)
        : extractBlockDeclaration(source, match.index);

    if (!code) {
      continue;
    }

    return {
      code: code.trim(),
      kind,
    };
  }

  return null;
}

function extractTypeAlias(source, startIndex) {
  let index = startIndex;
  let depth = 0;
  let stringQuote = null;

  while (index < source.length) {
    const char = source[index];
    const previousChar = source[index - 1];

    if (stringQuote) {
      if (char === stringQuote && previousChar !== '\\') {
        stringQuote = null;
      }

      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      stringQuote = char;
      index += 1;
      continue;
    }

    if (char === '{' || char === '[' || char === '(' || char === '<') {
      depth += 1;
    } else if (char === '}' || char === ']' || char === ')' || char === '>') {
      depth = Math.max(0, depth - 1);
    } else if (char === ';' && depth === 0) {
      return source.slice(startIndex, index + 1);
    }

    index += 1;
  }

  return source.slice(startIndex);
}

function extractBlockDeclaration(source, startIndex) {
  const blockStartIndex = source.indexOf('{', startIndex);

  if (blockStartIndex < 0) {
    return null;
  }

  let index = blockStartIndex;
  let depth = 0;
  let stringQuote = null;

  while (index < source.length) {
    const char = source[index];
    const previousChar = source[index - 1];

    if (stringQuote !== null) {
      stringQuote = consumeStringQuote(stringQuote, char, previousChar);
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      stringQuote = char;
      index += 1;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }

    index += 1;
  }

  return null;
}

function consumeStringQuote(currentQuote, char, previousChar) {
  if (char === currentQuote && previousChar !== '\\') {
    return null;
  }

  return currentQuote;
}

async function resolveModulePath(fromFilePath, specifier) {
  const resolvedBasePath = path.resolve(path.dirname(fromFilePath), specifier);
  const candidatePaths = [
    resolvedBasePath,
    `${resolvedBasePath}.ts`,
    `${resolvedBasePath}.tsx`,
    path.resolve(resolvedBasePath, 'index.ts'),
    path.resolve(resolvedBasePath, 'index.tsx'),
  ];

  for (const candidatePath of candidatePaths) {
    if (path.extname(candidatePath) === '') {
      continue;
    }

    try {
      await fs.access(candidatePath);
      return candidatePath;
    } catch {
      // continue
    }
  }

  return `${resolvedBasePath}.ts`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toPosixPath(value) {
  return value.replaceAll(path.sep, '/');
}
