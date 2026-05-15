import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const workspaceRoot = path.resolve(rootDir, '..', '..');
const args = process.argv.slice(2);

const targetDirArg =
  args.find((arg) => !arg.startsWith('--')) ?? 'src/components/generated/date-picker';
const shouldWrite = args.includes('--write');
const targetDir = path.resolve(rootDir, targetDirArg);

function collectVueFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.resolve(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectVueFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.vue')) {
      files.push(absolutePath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function formatVueFile(filePath) {
  execFileSync('pnpm', ['exec', 'oxfmt', filePath], {
    cwd: workspaceRoot,
    stdio: 'ignore',
    shell: process.platform === 'win32',
  });
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function createScannerState() {
  return {
    depthParen: 0,
    depthBrace: 0,
    depthBracket: 0,
    quote: '',
    templateDepth: 0,
  };
}

function isQuoteCharacter(char) {
  return char === "'" || char === '"' || char === '`';
}

function consumeQuotedCharacter(state, source, index) {
  if (!state.quote) {
    return false;
  }

  const char = source[index];
  const previousChar = source[index - 1] ?? '';

  if (state.quote === '`') {
    if (char === '$' && source[index + 1] === '{' && previousChar !== '\\') {
      state.templateDepth += 1;
      return true;
    }

    if (char === '}' && state.templateDepth > 0 && previousChar !== '\\') {
      state.templateDepth -= 1;
      return true;
    }

    if (char === '`' && previousChar !== '\\' && state.templateDepth === 0) {
      state.quote = '';
    }

    return true;
  }

  if (char === state.quote && previousChar !== '\\') {
    state.quote = '';
  }

  return true;
}

function beginQuotedSection(state, char) {
  if (!isQuoteCharacter(char)) {
    return false;
  }

  state.quote = char;
  return true;
}

function updateScannerDepth(state, char) {
  switch (char) {
    case '(':
      state.depthParen += 1;
      return true;
    case ')':
      state.depthParen -= 1;
      return true;
    case '{':
      state.depthBrace += 1;
      return true;
    case '}':
      state.depthBrace -= 1;
      return true;
    case '[':
      state.depthBracket += 1;
      return true;
    case ']':
      state.depthBracket -= 1;
      return true;
    default:
      return false;
  }
}

function isScannerAtTopLevel(state) {
  return state.depthParen === 0 && state.depthBrace === 0 && state.depthBracket === 0;
}

function isWordBoundaryCharacter(char) {
  return !char || /[^A-Za-z0-9_$]/.test(char);
}

function findStartTagEndIndex(source, startIndex) {
  const state = createScannerState();

  for (let cursor = startIndex + 1; cursor < source.length; cursor += 1) {
    const char = source[cursor];

    if (consumeQuotedCharacter(state, source, cursor)) {
      continue;
    }

    if (beginQuotedSection(state, char)) {
      continue;
    }

    if (char === '>') {
      return cursor;
    }
  }

  return -1;
}

function replaceStartTags(source, replacer) {
  let result = '';
  let lastIndex = 0;
  let searchIndex = 0;

  while (searchIndex < source.length) {
    const tagStartIndex = source.indexOf('<', searchIndex);
    if (tagStartIndex === -1) {
      break;
    }

    const nextChar = source[tagStartIndex + 1] ?? '';
    if (nextChar === '/' || nextChar === '!' || nextChar === '?') {
      searchIndex = tagStartIndex + 1;
      continue;
    }

    const tagEndIndex = findStartTagEndIndex(source, tagStartIndex);
    if (tagEndIndex === -1) {
      break;
    }

    result += source.slice(lastIndex, tagStartIndex);
    result += replacer(source.slice(tagStartIndex, tagEndIndex + 1));
    lastIndex = tagEndIndex + 1;
    searchIndex = tagEndIndex + 1;
  }

  return result + source.slice(lastIndex);
}

function splitTopLevel(source) {
  const parts = [];
  let current = '';
  const state = createScannerState();

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (consumeQuotedCharacter(state, source, index)) {
      current += char;
      continue;
    }

    if (beginQuotedSection(state, char) || updateScannerDepth(state, char)) {
      current += char;
      continue;
    }

    if (char === ',' && isScannerAtTopLevel(state)) {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        parts.push(trimmed);
      }
      current = '';
      continue;
    }

    current += char;
  }

  const trailing = current.trim();
  if (trailing.length > 0) {
    parts.push(trailing);
  }

  return parts;
}

function findMatchingBrace(source, startIndex) {
  let depth = 0;
  const state = createScannerState();

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (consumeQuotedCharacter(state, source, index)) {
      continue;
    }

    if (beginQuotedSection(state, char)) {
      continue;
    }

    if (char === '{') {
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function findTopLevelReturnIndex(source) {
  const state = createScannerState();

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (consumeQuotedCharacter(state, source, index)) {
      continue;
    }

    if (beginQuotedSection(state, char)) {
      continue;
    }

    if (updateScannerDepth(state, char)) {
      continue;
    }

    if (
      isScannerAtTopLevel(state) &&
      source.slice(index, index + 6) === 'return' &&
      isWordBoundaryCharacter(source[index - 1]) &&
      isWordBoundaryCharacter(source[index + 6])
    ) {
      return index;
    }
  }

  return -1;
}

function mergeClassAttribute(tagSource, classes) {
  const mergedClasses = classes.join(' ');

  if (mergedClasses.length === 0) {
    return tagSource;
  }

  if (/\sclass="([^"]*)"/.test(tagSource)) {
    return tagSource.replace(/\sclass="([^"]*)"/, (_match, existingClass) => {
      const nextClass = normalizeWhitespace(`${existingClass} ${mergedClasses}`);
      return ` class="${nextClass}"`;
    });
  }

  if (/\s:style="([^"]*)"/.test(tagSource)) {
    return tagSource.replace(/\s:style="([^"]*)"/, ` class="${mergedClasses}" :style="$1"`);
  }

  return tagSource.replace(/\sstyle="([^"]*)"/, ` class="${mergedClasses}" style="$1"`);
}

function withTailwindPrefix(utility) {
  return `sd:${utility}`;
}

function toTailwindScaleToken(value) {
  const pixelMatch = /^(\d+)px$/.exec(value);
  if (!pixelMatch) {
    return null;
  }

  const pixelValue = Number(pixelMatch[1]);
  if (pixelValue % 2 !== 0) {
    return null;
  }

  const normalizedValue = pixelValue / 4;
  return String(normalizedValue);
}

function toTailwindSizeToken(value) {
  if (value === '100%') {
    return 'full';
  }

  return toTailwindScaleToken(value);
}

function toTailwindFontSizeToken(value) {
  const fontSizeTokenMap = {
    '12px': 'xs',
    '14px': 'sm',
    '16px': 'base',
    '18px': 'lg',
    '20px': 'xl',
    '24px': '2xl',
  };

  return fontSizeTokenMap[value] ?? null;
}

function normalizeTailwindDimensionClassName(className) {
  const match = /^sd:(w|h|max-w|min-w|leading)-\[(.+)\]$/.exec(className);
  if (!match) {
    return className;
  }

  const [, prefix, value] = match;
  const normalizedSizeToken = toTailwindSizeToken(value);
  if (!normalizedSizeToken) {
    return className;
  }

  return withTailwindPrefix(`${prefix}-${normalizedSizeToken}`);
}

function normalizeTailwindSpacingClassName(className) {
  const match = /^sd:(m|mx|my|mt|mr|mb|ml|p|px|py|pt|pr|pb|pl)-\[(.+)\]$/.exec(className);
  if (!match) {
    return className;
  }

  const [, prefix, value] = match;
  const normalizedScaleToken = toTailwindScaleToken(value);
  if (!normalizedScaleToken) {
    return className;
  }

  return withTailwindPrefix(`${prefix}-${normalizedScaleToken}`);
}

function normalizeTailwindTextClassName(className) {
  const fontSizeMatch = /^sd:text-\[(.+)\]$/.exec(className);
  if (!fontSizeMatch) {
    return className;
  }

  const normalizedFontSizeToken = toTailwindFontSizeToken(fontSizeMatch[1]);
  if (!normalizedFontSizeToken) {
    return className;
  }

  return withTailwindPrefix(`text-${normalizedFontSizeToken}`);
}

function convertDimensionClass(property, value) {
  const prefixByProperty = {
    'width': 'w',
    'height': 'h',
    'max-width': 'max-w',
    'min-width': 'min-w',
    'line-height': 'leading',
  };
  const prefix = prefixByProperty[property];
  if (!prefix) {
    return null;
  }

  const normalizedSizeToken = toTailwindSizeToken(value);
  if (normalizedSizeToken) {
    return [withTailwindPrefix(`${prefix}-${normalizedSizeToken}`)];
  }

  return [withTailwindPrefix(`${prefix}-[${value}]`)];
}

function convertBorderClass(property, value) {
  if (property !== 'border') {
    return null;
  }

  const borderMatch = /^(\d+px)\s+(solid|dashed|dotted)\s+(.+)$/.exec(value);
  if (!borderMatch) {
    return null;
  }

  const [, width, style, color] = borderMatch;
  const classes = [withTailwindPrefix(`border-${style}`)];

  if (width === '1px') {
    classes.unshift(withTailwindPrefix('border'));
  } else {
    classes.unshift(withTailwindPrefix(`border-[${width}]`));
  }

  if (/^var\(--[^)]+\)$/.test(color)) {
    classes.push(withTailwindPrefix(`border-(${color.slice(4, -1)})`));
  } else {
    classes.push(withTailwindPrefix(`border-[${color}]`));
  }
  return classes;
}

function convertMarginClass(property, value) {
  if (property === 'margin' && value === '0') {
    return [withTailwindPrefix('m-0')];
  }

  if (property === 'margin-right') {
    return [withTailwindPrefix(`mr-[${value}]`)];
  }

  if (property === 'margin-bottom' || property === 'marginbottom') {
    return [withTailwindPrefix(`mb-[${value}]`)];
  }

  if (property === 'margin-top') {
    return [withTailwindPrefix(`mt-[${value}]`)];
  }

  if (property === 'margin-left') {
    return [withTailwindPrefix(`ml-[${value}]`)];
  }

  const verticalMarginMatch = /^(\d+px)\s+0$/.exec(value);
  if (property === 'margin' && verticalMarginMatch) {
    return [withTailwindPrefix(`my-[${verticalMarginMatch[1]}]`)];
  }

  const horizontalMarginMatch = /^0\s+(\d+px)$/.exec(value);
  if (property === 'margin' && horizontalMarginMatch) {
    return [withTailwindPrefix(`mx-[${horizontalMarginMatch[1]}]`)];
  }

  const marginMatch = /^0\s+(\d+px)\s+(\d+px)\s+0$/.exec(value);
  if (property === 'margin' && marginMatch) {
    const [, rightValue, bottomValue] = marginMatch;
    return [withTailwindPrefix(`mr-[${rightValue}]`), withTailwindPrefix(`mb-[${bottomValue}]`)];
  }

  const verticalWithBottomMarginMatch = /^(\d+px)\s+0(?:px)?\s+(\d+px)$/.exec(value);
  if (property === 'margin' && verticalWithBottomMarginMatch) {
    const [, topValue, bottomValue] = verticalWithBottomMarginMatch;
    return [withTailwindPrefix(`mt-[${topValue}]`), withTailwindPrefix(`mb-[${bottomValue}]`)];
  }

  return null;
}

function convertPaddingClass(property, value) {
  if (property !== 'padding') {
    return null;
  }

  const singlePaddingMatch = /^(\d+px)$/.exec(value);
  if (singlePaddingMatch) {
    return [withTailwindPrefix(`p-[${singlePaddingMatch[1]}]`)];
  }

  const axisPaddingMatch = /^(\d+px)\s+(\d+px)$/.exec(value);
  if (axisPaddingMatch) {
    const [, verticalValue, horizontalValue] = axisPaddingMatch;
    return [
      withTailwindPrefix(`py-[${verticalValue}]`),
      withTailwindPrefix(`px-[${horizontalValue}]`),
    ];
  }

  const paddingMatch = /^(\d+px)\s+0$/.exec(value);
  if (paddingMatch) {
    return [withTailwindPrefix(`py-[${paddingMatch[1]}]`)];
  }

  const horizontalPaddingMatch = /^0\s+(\d+px)$/.exec(value);
  if (horizontalPaddingMatch) {
    return [withTailwindPrefix(`px-[${horizontalPaddingMatch[1]}]`)];
  }

  return null;
}

function convertStaticKeywordClass(property, value) {
  const keywordClassMap = {
    'box-sizing:border-box': [withTailwindPrefix('box-border')],
    'overflow:auto': [withTailwindPrefix('overflow-auto')],
    'overflow:hidden': [withTailwindPrefix('overflow-hidden')],
    'overflow-y:auto': [withTailwindPrefix('overflow-y-auto')],
    'position:absolute': [withTailwindPrefix('absolute')],
    'position:relative': [withTailwindPrefix('relative')],
    'display:block': [withTailwindPrefix('block')],
    'display:flex': [withTailwindPrefix('flex')],
    'display:inline-flex': [withTailwindPrefix('inline-flex')],
    'align-items:center': [withTailwindPrefix('items-center')],
    'justify-content:center': [withTailwindPrefix('justify-center')],
    'text-align:center': [withTailwindPrefix('text-center')],
  };

  return keywordClassMap[`${property}:${value}`] ?? null;
}

function convertTextClass(property, value) {
  if (property === 'flex' && value === '1') {
    return [withTailwindPrefix('flex-1')];
  }

  if (property === 'font-size') {
    const normalizedFontSizeToken = toTailwindFontSizeToken(value);
    if (normalizedFontSizeToken) {
      return [withTailwindPrefix(`text-${normalizedFontSizeToken}`)];
    }

    return [withTailwindPrefix(`text-[${value}]`)];
  }

  if (property === 'color') {
    return [withTailwindPrefix(`text-[${value}]`)];
  }

  if (property === 'vertical-align') {
    if (value === 'middle') {
      return [withTailwindPrefix('align-middle')];
    }

    return [withTailwindPrefix(`align-[${value}]`)];
  }

  return null;
}

function convertTransformClass(property, value) {
  if (property !== 'transform') {
    return null;
  }

  const translateYMatch = /^translatey\((-?\d+px)\)$/.exec(value);
  if (!translateYMatch) {
    return null;
  }

  const [, rawValue] = translateYMatch;
  const sign = rawValue.startsWith('-') ? '-' : '';
  const normalizedScaleToken = toTailwindScaleToken(rawValue.replace(/^-/, ''));
  if (normalizedScaleToken) {
    return [withTailwindPrefix(`${sign}translate-y-${normalizedScaleToken}`)];
  }

  return [withTailwindPrefix(`${sign}translate-y-[${rawValue.replace(/^-/, '')}]`)];
}

function convertBackgroundClass(property, value) {
  if (property !== 'background-color' && property !== 'background') {
    return null;
  }

  if (/^var\(--[^)]+\)$/.test(value)) {
    return [withTailwindPrefix(`bg-(${value.slice(4, -1)})`)];
  }

  return [withTailwindPrefix(`bg-[${value}]`)];
}

function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

function parseObjectStyleLiteral(styleSource) {
  const trimmedStyle = styleSource.trim();
  if (!trimmedStyle.startsWith('{') || !trimmedStyle.endsWith('}')) {
    return null;
  }

  const objectBody = trimmedStyle.slice(1, -1).trim();
  if (objectBody.length === 0 || objectBody.includes('...')) {
    return null;
  }

  return parseStyleObjectEntries(objectBody);
}

function parseStyleObjectEntries(objectBody) {
  const entries = splitTopLevel(objectBody);
  const declarations = [];

  for (const entry of entries) {
    const propertyMatch = /^([A-Za-z_$][\w$-]*)\s*:\s*(?:(['"])(.*?)\2|(-?\d+(?:\.\d+)?))$/s.exec(
      entry.trim(),
    );
    if (!propertyMatch) {
      return null;
    }

    const [, rawProperty, , quotedValue, numericValue] = propertyMatch;
    declarations.push({
      property: camelToKebabCase(rawProperty).toLowerCase(),
      value: `${(quotedValue ?? numericValue).trim().toLowerCase()}`,
    });
  }

  return declarations;
}

function readObjectLiteral(source, openingBraceIndex) {
  const closingBraceIndex = findMatchingBrace(source, openingBraceIndex);
  if (closingBraceIndex === -1) {
    return null;
  }

  return {
    body: source.slice(openingBraceIndex + 1, closingBraceIndex),
    endIndex: closingBraceIndex,
  };
}

function collectStyleObjectBindings(source) {
  const bindings = new Map();
  const declarationPattern = /const\s+([A-Za-z_$][\w$]*)\s*=\s*\{/g;

  let match = declarationPattern.exec(source);
  while (match) {
    const [, bindingName] = match;
    const openingBraceIndex = declarationPattern.lastIndex - 1;
    const objectLiteral = readObjectLiteral(source, openingBraceIndex);

    if (objectLiteral) {
      const declarations = parseStyleObjectEntries(objectLiteral.body.trim());
      const declarationEnd = source.indexOf(';', objectLiteral.endIndex);
      if (declarations) {
        bindings.set(bindingName, {
          declarations,
          bindingName,
          declarationSource:
            declarationEnd === -1
              ? source.slice(match.index, objectLiteral.endIndex + 1)
              : source.slice(match.index, declarationEnd + 1),
        });
      }

      declarationPattern.lastIndex = objectLiteral.endIndex + 1;
    }

    match = declarationPattern.exec(source);
  }

  return bindings;
}

function mergeStyleDeclarations(baseDeclarations, overrideDeclarations) {
  const mergedDeclarations = new Map();

  for (const declaration of baseDeclarations) {
    mergedDeclarations.set(declaration.property, declaration.value);
  }

  for (const declaration of overrideDeclarations) {
    mergedDeclarations.set(declaration.property, declaration.value);
  }

  return [...mergedDeclarations.entries()].map(([property, value]) => ({
    property,
    value,
  }));
}

function convertDeclarationsToClasses(declarations) {
  const classes = [];

  for (const declaration of declarations) {
    const declarationClasses = convertDeclarationToClasses(declaration.property, declaration.value);
    if (!declarationClasses) {
      return null;
    }

    classes.push(...declarationClasses);
  }

  return [...new Set(classes)];
}

function convertSpreadStyleBindingToTailwindClasses(styleSource, bindings) {
  const trimmedStyle = styleSource.trim();
  if (!trimmedStyle.startsWith('{') || !trimmedStyle.endsWith('}')) {
    return null;
  }

  const objectBody = trimmedStyle.slice(1, -1).trim();
  const entries = splitTopLevel(objectBody);
  if (entries.length < 2) {
    return null;
  }

  const spreadMatch = /^\.\.\.([A-Za-z_$][\w$]*)$/.exec(entries[0].trim());
  if (!spreadMatch) {
    return null;
  }

  const binding = bindings.get(spreadMatch[1]);
  if (!binding) {
    return null;
  }

  const overrideDeclarations = parseStyleObjectEntries(entries.slice(1).join(', '));
  if (!overrideDeclarations) {
    return null;
  }

  return convertDeclarationsToClasses(
    mergeStyleDeclarations(binding.declarations, overrideDeclarations),
  );
}

function convertObjectStyleToTailwindClasses(styleSource) {
  const declarations = parseObjectStyleLiteral(styleSource);
  if (!declarations) {
    return null;
  }

  return convertDeclarationsToClasses(declarations);
}

function convertDeclarationToClasses(property, value) {
  return (
    convertDimensionClass(property, value) ??
    convertBorderClass(property, value) ??
    convertMarginClass(property, value) ??
    convertPaddingClass(property, value) ??
    convertStaticKeywordClass(property, value) ??
    convertBackgroundClass(property, value) ??
    convertTextClass(property, value) ??
    convertTransformClass(property, value)
  );
}

function convertStyleToTailwindClasses(styleSource) {
  const declarations = styleSource
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);

  const classes = [];

  for (const declaration of declarations) {
    const separatorIndex = declaration.indexOf(':');
    if (separatorIndex === -1) {
      return null;
    }

    const property = declaration.slice(0, separatorIndex).trim().toLowerCase().replace(/\s+/g, '');
    const value = declaration
      .slice(separatorIndex + 1)
      .trim()
      .toLowerCase();

    const declarationClasses = convertDeclarationToClasses(property, value);
    if (declarationClasses) {
      classes.push(...declarationClasses);
      continue;
    }

    return null;
  }

  return [...new Set(classes)];
}

function shouldPreserveInlineStyle(tagSource, styleSource) {
  if (!/^<sd-layout-sider\b/.test(tagSource)) {
    return false;
  }

  return /(^|;)\s*width\s*:/.test(styleSource);
}

function transformStaticStyles(source) {
  return source.replace(/<[^/!][^>]*>/gs, (tagSource) => {
    const styleMatch = tagSource.match(/\sstyle="([^"]*)"/);
    if (!styleMatch) {
      return tagSource;
    }

    if (shouldPreserveInlineStyle(tagSource, styleMatch[1])) {
      return tagSource;
    }

    const classes = convertStyleToTailwindClasses(styleMatch[1]);
    if (!classes) {
      return tagSource;
    }

    const mergedTagSource = mergeClassAttribute(tagSource, classes);
    return mergedTagSource.replace(/\sstyle="([^"]*)"/, '');
  });
}

function transformBoundStyles(source) {
  return source.replace(/<[^/!][^>]*>/gs, (tagSource) => {
    const styleBindingMatch = tagSource.match(/\s:style="([^"]*)"/);
    if (!styleBindingMatch) {
      return tagSource;
    }

    const classes = convertObjectStyleToTailwindClasses(styleBindingMatch[1]);
    if (!classes) {
      return tagSource;
    }

    const mergedTagSource = mergeClassAttribute(tagSource, classes);
    return mergedTagSource.replace(/\s:style="([^"]*)"/, '');
  });
}

function transformSharedStyleBindings(source) {
  const bindings = collectStyleObjectBindings(source);
  if (bindings.size === 0) {
    return source;
  }

  let nextSource = source.replace(/<[^/!][^>]*>/gs, (tagSource) => {
    const styleBindingMatch = tagSource.match(/\s:style="([^"]*)"/);
    if (!styleBindingMatch) {
      return tagSource;
    }

    const styleExpression = styleBindingMatch[1].trim();
    let classes = null;

    const directBinding = bindings.get(styleExpression);
    if (directBinding) {
      classes = convertDeclarationsToClasses(directBinding.declarations);
    } else {
      classes = convertSpreadStyleBindingToTailwindClasses(styleExpression, bindings);
    }

    if (!classes) {
      return tagSource;
    }

    const mergedTagSource = mergeClassAttribute(tagSource, classes);
    return mergedTagSource.replace(/\s:style="([^"]*)"/, '');
  });

  for (const binding of bindings.values()) {
    const withoutDeclaration = nextSource.replace(binding.declarationSource, '');
    const bindingReferencePattern = new RegExp(
      `(?<![:\\w$-])${binding.bindingName}(?![\\w$-])`,
      'g',
    );
    if (!bindingReferencePattern.test(withoutDeclaration)) {
      nextSource = withoutDeclaration.replace(/\n{3,}/g, '\n\n');
    }
  }

  return nextSource;
}

function normalizeLegacyTailwindPrefix(source) {
  return replaceStartTags(source, (tagSource) => {
    return tagSource.replace(/(\sclass=")([^"]+)(")/s, (_match, before, classValue, after) => {
      const nextClassValue = classValue
        .split(/\s+/)
        .map((className) => {
          let nextClassName = className;

          if (nextClassName.startsWith('sd-')) {
            nextClassName = withTailwindPrefix(nextClassName.slice(3));
          }

          nextClassName = normalizeTailwindDimensionClassName(nextClassName);
          nextClassName = normalizeTailwindSpacingClassName(nextClassName);
          return normalizeTailwindTextClassName(nextClassName);
        })
        .join(' ');

      return `${before}${nextClassValue}${after}`;
    });
  });
}

function buildRefDeclaration(key, valueSource) {
  const trimmedValue = valueSource.trim();
  const primitiveStringPattern = /^(?:'[^']*'|"[^"]*"|`[^`]*`)$/s;
  const primitiveValuePattern = /^(?:-?\d+(?:\.\d+)?|true|false|null)$/;
  const helper =
    primitiveStringPattern.test(trimmedValue) || primitiveValuePattern.test(trimmedValue)
      ? 'shallowRef'
      : 'ref';
  return {
    name: key,
    declaration: `const ${key} = ${helper}(${trimmedValue});`,
    helper,
  };
}

function trimEmptyLines(source) {
  return source.replace(/^\s*\n+/s, '').replace(/\n+\s*$/s, '');
}

function normalizeScriptChunk(source) {
  return trimEmptyLines(source).trim();
}

function normalizeFunctionSource(name, params, body) {
  const normalizedParams = params.trim();
  const normalizedBody = trimEmptyLines(body);
  const nextBody = normalizedBody.length > 0 ? `\n${normalizedBody}\n` : '\n';
  return `function ${name}(${normalizedParams}) {${nextBody}}`;
}

const methodBindingPattern = /^([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{([\s\S]*)\}$/;
const propertyBindingPattern = /^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/;

function parseBindingEntry(entry) {
  if (/^[A-Za-z_$][\w$]*$/.test(entry)) {
    return { type: 'existing', source: entry, name: entry };
  }

  const methodMatch = methodBindingPattern.exec(entry);
  if (methodMatch) {
    const [, name, params, body] = methodMatch;
    return {
      type: 'function',
      name,
      source: normalizeFunctionSource(name, params, body),
    };
  }

  const propertyMatch = propertyBindingPattern.exec(entry);
  if (propertyMatch) {
    const [, name, valueSource] = propertyMatch;
    return {
      type: 'const',
      name,
      source: `const ${name} = ${valueSource.trim()};`,
    };
  }

  return null;
}

function parseReturnedBindings(returnObjectSource) {
  const entries = splitTopLevel(returnObjectSource);
  const bindings = [];

  for (const entry of entries) {
    const binding = parseBindingEntry(entry);
    if (!binding) {
      return null;
    }

    bindings.push(binding);
  }

  return bindings;
}

function parseMethodsObject(methodsSource) {
  const entries = splitTopLevel(methodsSource);
  const bindings = [];

  for (const entry of entries) {
    const binding = parseBindingEntry(entry);
    if (binding?.type !== 'function') {
      return null;
    }

    bindings.push(binding);
  }

  return bindings;
}

function rewriteThisReferences(source, refNames) {
  let nextSource = source;

  for (const refName of refNames) {
    const referencePattern = new RegExp(`\\bthis\\.${refName}\\b`, 'g');
    nextSource = nextSource.replace(referencePattern, `${refName}.value`);
  }

  return nextSource;
}

function toSortedList(values) {
  return [...values].sort((left, right) => {
    if (left < right) {
      return -1;
    }

    if (left > right) {
      return 1;
    }

    return 0;
  });
}

function renderScriptSetup({
  existingPrelude,
  existingSuffix,
  setupPrelude,
  bindings,
  dataBindings,
}) {
  const lines = [];
  const normalizedPrelude = normalizeScriptChunk(existingPrelude);
  const normalizedSuffix = normalizeScriptChunk(existingSuffix);
  const normalizedSetupPrelude = normalizeScriptChunk(setupPrelude);

  const helpers = new Set();
  if (dataBindings) {
    for (const binding of dataBindings) {
      helpers.add(binding.helper);
    }
  }

  if (helpers.size > 0) {
    lines.push(`import { ${toSortedList(helpers).join(', ')} } from 'vue';`);
  }

  if (normalizedPrelude.length > 0) {
    lines.push(normalizedPrelude);
  }

  if (normalizedSuffix.length > 0) {
    lines.push(normalizedSuffix);
  }

  if (normalizedSetupPrelude.length > 0) {
    lines.push(normalizedSetupPrelude);
  }

  if (dataBindings) {
    for (const binding of dataBindings) {
      lines.push(binding.declaration);
    }
  }

  for (const binding of bindings) {
    if (binding.type === 'existing') {
      continue;
    }
    lines.push(normalizeScriptChunk(binding.source));
  }

  return `<script setup lang="ts">\n${lines.filter(Boolean).join('\n\n')}\n</script>`;
}

function stripDefineComponentImport(prelude) {
  return prelude.replace(
    /import\s*\{\s*([^}]*)\s*\}\s*from\s*'vue';?/,
    (match, specifiersSource) => {
      const specifiers = specifiersSource
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .filter((item) => item !== 'defineComponent');

      if (specifiers.length === 0) {
        return '';
      }

      return `import { ${specifiers.join(', ')} } from 'vue';`;
    },
  );
}

function unwrapDefineComponentExport(exportSource) {
  const defineComponentMatch = exportSource.match(
    /^export\s+default\s+defineComponent\(\s*(\{[\s\S]*\})\s*\)\s*;?$/,
  );
  if (!defineComponentMatch) {
    return exportSource;
  }

  return `export default ${defineComponentMatch[1]};`;
}

function splitExportDefaultBlock(scriptContent) {
  const exportDefaultIndex = scriptContent.indexOf('export default');
  if (exportDefaultIndex === -1) {
    return null;
  }

  const exportObjectStart = scriptContent.indexOf('{', exportDefaultIndex);
  if (exportObjectStart === -1) {
    return null;
  }

  const exportObjectEnd = findMatchingBrace(scriptContent, exportObjectStart);
  if (exportObjectEnd === -1) {
    return null;
  }

  let exportBlockEnd = exportObjectEnd + 1;
  while (/\s/.test(scriptContent[exportBlockEnd] ?? '')) {
    exportBlockEnd += 1;
  }

  if (scriptContent[exportBlockEnd] === ';') {
    exportBlockEnd += 1;
  }

  return {
    prelude: scriptContent.slice(0, exportDefaultIndex).trim(),
    exportSource: scriptContent.slice(exportDefaultIndex, exportBlockEnd).trim(),
    suffix: scriptContent.slice(exportBlockEnd).trim(),
  };
}

function transformLegacyScript(source) {
  const scriptMatch = source.match(/<script(?:\s+lang="ts")?>([\s\S]*?)<\/script>/);
  if (!scriptMatch || /<script\s+setup/.test(source)) {
    return source;
  }

  const scriptContent = scriptMatch[1].trim();
  const exportParts = splitExportDefaultBlock(scriptContent);
  if (!exportParts) {
    return source;
  }

  const rawPrelude = exportParts.prelude;
  const rawExportSource = exportParts.exportSource;
  const existingSuffix = exportParts.suffix;
  const exportSource = unwrapDefineComponentExport(rawExportSource);
  const prelude =
    exportSource === rawExportSource ? rawPrelude : stripDefineComponentImport(rawPrelude).trim();

  const nextDataScript = transformDataScript(
    source,
    scriptMatch[0],
    prelude,
    existingSuffix,
    exportSource,
  );
  if (nextDataScript) {
    return nextDataScript;
  }

  const nextMethodsScript = transformMethodsScript(
    source,
    scriptMatch[0],
    prelude,
    existingSuffix,
    exportSource,
  );
  if (nextMethodsScript) {
    return nextMethodsScript;
  }

  const nextComponentsScript = transformComponentsOnlyScript(
    source,
    scriptMatch[0],
    prelude,
    existingSuffix,
    exportSource,
  );
  if (nextComponentsScript) {
    return nextComponentsScript;
  }

  const nextSetupScript = transformSetupScript(
    source,
    scriptMatch[0],
    prelude,
    existingSuffix,
    exportSource,
  );
  return nextSetupScript ?? source;
}

function transformDataScript(source, fullScriptBlock, prelude, existingSuffix, exportSource) {
  const dataWithMethodsMatch = exportSource.match(
    /^export\s+default\s*\{\s*data\(\)\s*\{([\s\S]*?)\}\s*,\s*methods\s*:\s*\{([\s\S]*?)\}\s*,?\s*\}\s*;?$/,
  );
  const dataOnlyMatch = exportSource.match(
    /^export\s+default\s*\{\s*data\(\)\s*\{([\s\S]*?)\}\s*,?\s*\}\s*;?$/,
  );
  const dataMatch = dataWithMethodsMatch ?? dataOnlyMatch;
  if (!dataMatch) {
    return null;
  }

  const [, dataBodySource, methodsSource = ''] = dataMatch;
  const returnIndex = dataBodySource.indexOf('return');
  if (returnIndex === -1) {
    return null;
  }

  const objectStart = dataBodySource.indexOf('{', returnIndex);
  const objectEnd = findMatchingBrace(dataBodySource, objectStart);
  if (objectStart === -1 || objectEnd === -1) {
    return null;
  }

  const returnObjectSource = dataBodySource.slice(objectStart + 1, objectEnd);
  const entries = splitTopLevel(returnObjectSource);
  const dataBindings = [];
  const existingBindings = [];

  for (const entry of entries) {
    if (/^[A-Za-z_$][\w$]*$/.test(entry)) {
      existingBindings.push({ type: 'existing', source: entry, name: entry });
      continue;
    }

    const propertyMatch = propertyBindingPattern.exec(entry);
    if (!propertyMatch) {
      return null;
    }

    const [, key, valueSource] = propertyMatch;
    dataBindings.push(buildRefDeclaration(key, valueSource));
  }

  let methodBindings = [];
  if (methodsSource.trim().length > 0) {
    const parsedMethodBindings = parseMethodsObject(methodsSource);
    if (!parsedMethodBindings) {
      return null;
    }

    const refNames = dataBindings.map((binding) => binding.name);
    methodBindings = parsedMethodBindings.map((binding) => ({
      ...binding,
      source: rewriteThisReferences(binding.source, refNames),
    }));
  }

  const nextScript = renderScriptSetup({
    existingPrelude: prelude,
    existingSuffix,
    setupPrelude: '',
    bindings: [...existingBindings, ...methodBindings],
    dataBindings,
  });

  return source.replace(fullScriptBlock, nextScript);
}

function transformMethodsScript(source, fullScriptBlock, prelude, existingSuffix, exportSource) {
  const methodsWithComponentsMatch = exportSource.match(
    /^export\s+default\s*\{\s*components\s*:\s*\{[\s\S]*?\}\s*,\s*methods\s*:\s*\{([\s\S]*?)\}\s*,?\s*\}\s*;?$/,
  );
  const methodsOnlyMatch = exportSource.match(
    /^export\s+default\s*\{\s*methods\s*:\s*\{([\s\S]*?)\}\s*,?\s*\}\s*;?$/,
  );
  const methodsMatch = methodsWithComponentsMatch ?? methodsOnlyMatch;
  if (!methodsMatch) {
    return null;
  }

  const [, methodsSource] = methodsMatch;
  const bindings = parseMethodsObject(methodsSource);
  if (!bindings) {
    return null;
  }

  const nextScript = renderScriptSetup({
    existingPrelude: prelude,
    existingSuffix,
    setupPrelude: '',
    bindings,
    dataBindings: null,
  });

  return source.replace(fullScriptBlock, nextScript);
}

function transformComponentsOnlyScript(
  source,
  fullScriptBlock,
  prelude,
  existingSuffix,
  exportSource,
) {
  const componentsOnlyMatch = exportSource.match(
    /^export\s+default\s*\{\s*components\s*:\s*\{[\s\S]*?\}\s*,?\s*\}\s*;?$/,
  );
  if (!componentsOnlyMatch) {
    return null;
  }

  const nextScript = renderScriptSetup({
    existingPrelude: prelude,
    existingSuffix,
    setupPrelude: '',
    bindings: [],
    dataBindings: null,
  });

  return source.replace(fullScriptBlock, nextScript);
}

function transformSetupScript(source, fullScriptBlock, prelude, existingSuffix, exportSource) {
  const setupWithComponentsMatch = exportSource.match(
    /^export\s+default\s*\{\s*components\s*:\s*\{[\s\S]*?\}\s*,\s*setup\(\)\s*\{([\s\S]*)\}\s*,?\s*\}\s*;?$/,
  );
  const setupOnlyMatch = exportSource.match(
    /^export\s+default\s*\{\s*setup\(\)\s*\{([\s\S]*)\}\s*,?\s*\}\s*;?$/,
  );
  const setupMatch = setupWithComponentsMatch ?? setupOnlyMatch;
  if (!setupMatch) {
    return null;
  }

  const setupBody = setupMatch[1].trim();
  const returnIndex = findTopLevelReturnIndex(setupBody);
  if (returnIndex === -1) {
    return null;
  }

  const objectStart = setupBody.indexOf('{', returnIndex);
  const objectEnd = findMatchingBrace(setupBody, objectStart);
  if (objectStart === -1 || objectEnd === -1) {
    return null;
  }

  const setupPrelude = setupBody.slice(0, returnIndex).trim();
  const returnObjectSource = setupBody.slice(objectStart + 1, objectEnd);
  const bindings = parseReturnedBindings(returnObjectSource);
  if (!bindings) {
    return null;
  }

  const nextScript = renderScriptSetup({
    existingPrelude: prelude,
    existingSuffix,
    setupPrelude,
    bindings,
    dataBindings: null,
  });

  return source.replace(fullScriptBlock, nextScript);
}

function transformSource(source) {
  const withNormalizedPrefix = normalizeLegacyTailwindPrefix(source);
  const withStaticStyles = transformStaticStyles(withNormalizedPrefix);
  const withBoundStyles = transformBoundStyles(withStaticStyles);
  const withLegacyScript = transformLegacyScript(withBoundStyles);
  const withSharedStyleBindings = transformSharedStyleBindings(withLegacyScript);
  return normalizeLegacyTailwindPrefix(withSharedStyleBindings);
}

const vueFiles = collectVueFiles(targetDir);
let changedFiles = 0;

for (const filePath of vueFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const nextSource = transformSource(source);

  if (source === nextSource) {
    continue;
  }

  changedFiles += 1;

  if (shouldWrite) {
    fs.writeFileSync(filePath, nextSource, 'utf8');
    formatVueFile(filePath);
  }

  console.log(`${shouldWrite ? 'updated' : 'would update'} ${path.relative(rootDir, filePath)}`);
}

console.log(`${shouldWrite ? 'updated' : 'matched'} ${changedFiles} file(s)`);
