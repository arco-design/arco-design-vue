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

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ensureImportSpecifiers(scriptContent, moduleName, specifiers, isType = false) {
  if (specifiers.length === 0) {
    return scriptContent;
  }

  const importPattern = new RegExp(
    `^\\s*import\\s+${isType ? 'type\\s+' : ''}\\{([^}]*)\\}\\s+from\\s+['"]${escapeForRegExp(moduleName)}['"];?\\n?`,
    'm',
  );
  const match = scriptContent.match(importPattern);

  if (match) {
    const existingSpecifiers = match[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    const nextSpecifiers = toSortedList(new Set([...existingSpecifiers, ...specifiers]));

    return scriptContent.replace(
      importPattern,
      `import ${isType ? 'type ' : ''}{ ${nextSpecifiers.join(', ')} } from '${moduleName}';\n`,
    );
  }

  const importStatement = `import ${isType ? 'type ' : ''}{ ${toSortedList(specifiers).join(', ')} } from '${moduleName}';`;
  const lines = scriptContent.split('\n');
  let insertIndex = 0;

  while (insertIndex < lines.length && lines[insertIndex].startsWith('import ')) {
    insertIndex += 1;
  }

  lines.splice(insertIndex, 0, importStatement);
  return lines.join('\n');
}

function normalizeImports(scriptContent) {
  const importPattern = /^\s*import\s+(type\s+)?\{([\s\S]*?)\}\s+from\s+['"]([^'"]+)['"];?\s*$/gm;
  const importMap = new Map();
  const matches = [...scriptContent.matchAll(importPattern)];

  if (matches.length === 0) {
    return scriptContent;
  }

  for (const match of matches) {
    const isType = Boolean(match[1]);
    const specifiers = match[2]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    const moduleName = match[3];
    const key = `${isType ? 'type:' : 'value:'}${moduleName}`;
    const existing = importMap.get(key) ?? new Set();

    for (const specifier of specifiers) {
      existing.add(specifier);
    }

    importMap.set(key, existing);
  }

  const body = scriptContent.replace(importPattern, '').replace(/^\s*\n+/, '');
  const mergedImports = [...importMap.entries()]
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, specifierSet]) => {
      const [kind, moduleName] = key.split(':');
      return `import ${kind === 'type' ? 'type ' : ''}{ ${toSortedList(specifierSet).join(', ')} } from '${moduleName}';`;
    })
    .join('\n');

  return `${mergedImports}\n\n${body}`;
}

function splitSfcSections(source) {
  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
  const scriptSetupMatch = source.match(/<script\s+setup\s+lang="ts">([\s\S]*?)<\/script>/);
  if (!scriptSetupMatch) {
    return null;
  }

  return {
    template: templateMatch?.[1] ?? '',
    scriptSetup: scriptSetupMatch[1],
    scriptSetupBlock: scriptSetupMatch[0],
  };
}

function buildLiteralTypeFromValue(rawValue) {
  const trimmedValue = rawValue.trim();
  if (/^-?\d+(?:\.\d+)?$/.test(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue === 'true' || trimmedValue === 'false') {
    return trimmedValue;
  }

  return `'${trimmedValue.replaceAll("'", "\\'")}'`;
}

function collectRadioModelLiteralTypes(templateSource) {
  const modelTypes = new Map();
  const groupPattern =
    /<sd-radio-group\b[^>]*\bv-model="([^"]+)"[^>]*>([\s\S]*?)<\/sd-radio-group>/g;

  for (const match of templateSource.matchAll(groupPattern)) {
    const [, modelName, groupContent] = match;
    const literalTypes = new Set();
    const radioPattern = /<sd-radio\b[^>]*(?:\svalue="([^"]+)"|\s:value="([^"]+)")[^>]*>/g;

    for (const radioMatch of groupContent.matchAll(radioPattern)) {
      const rawValue = radioMatch[1] ?? radioMatch[2];
      if (!rawValue) {
        continue;
      }

      literalTypes.add(buildLiteralTypeFromValue(rawValue));
    }

    if (literalTypes.size > 0) {
      modelTypes.set(modelName, [...literalTypes].join(' | '));
    }
  }

  return modelTypes;
}

function annotateRadioModelRefs(scriptContent, templateSource) {
  const modelTypes = collectRadioModelLiteralTypes(templateSource);
  if (modelTypes.size === 0) {
    return scriptContent;
  }

  return scriptContent.replace(
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*(ref|shallowRef)\(([^\n;]+)\);/g,
    (match, bindingName, helperName, initializer) => {
      if (!modelTypes.has(bindingName) || match.includes('<')) {
        return match;
      }

      return `const ${bindingName} = ${helperName}<${modelTypes.get(bindingName)}>(${initializer.trim()});`;
    },
  );
}

function inferArrayElementTypeFromLiteralArray(arraySource) {
  const elements = splitTopLevel(arraySource.trim());
  if (elements.length === 0) {
    return null;
  }

  if (elements.every((item) => /^(?:'[^']*'|"[^"]*"|`[^`]*`)$/.test(item))) {
    return 'string';
  }

  if (elements.every((item) => /^-?\d+(?:\.\d+)?$/.test(item))) {
    return 'number';
  }

  if (elements.every((item) => item === 'true' || item === 'false')) {
    return 'boolean';
  }

  return null;
}

function inferRefArrayElementType(scriptContent, bindingName) {
  const directAssignmentPattern = new RegExp(
    `${bindingName}\\.value\\s*=\\s*\\[([\\s\\S]*?)\\];`,
    'g',
  );
  for (const match of scriptContent.matchAll(directAssignmentPattern)) {
    const inferredType = inferArrayElementTypeFromLiteralArray(match[1]);
    if (inferredType) {
      return inferredType;
    }
  }

  const aliasAssignmentPattern = new RegExp(
    `${bindingName}\\.value\\s*=\\s*([A-Za-z_$][\\w$]*);`,
    'g',
  );
  for (const match of scriptContent.matchAll(aliasAssignmentPattern)) {
    const aliasName = match[1];
    const aliasPattern = new RegExp(`const\\s+${aliasName}\\s*=\\s*\\[([\\s\\S]*?)\\];`);
    const aliasMatch = scriptContent.match(aliasPattern);
    if (!aliasMatch) {
      continue;
    }

    const inferredType = inferArrayElementTypeFromLiteralArray(aliasMatch[1]);
    if (inferredType) {
      return inferredType;
    }
  }

  return null;
}

function annotateEmptyArrayRefs(scriptContent) {
  return scriptContent.replace(
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*ref\(\[\]\);/g,
    (match, bindingName) => {
      const inferredElementType = inferRefArrayElementType(scriptContent, bindingName);
      if (!inferredElementType) {
        return match;
      }

      return `const ${bindingName} = ref<${inferredElementType}[]>([]);`;
    },
  );
}

function applyAutoCompleteTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'AutoCompleteData',
      'AutoCompleteDropdownReachBottomHandler',
      'AutoCompleteDropdownScrollHandler',
      'AutoCompleteSearchHandler',
    ],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+data\s*=\s*ref(?:<[^>]+>)?\(\[\]\);/,
    'const data = ref<AutoCompleteData>([]);',
  );
  nextContent = nextContent.replace(
    /function\s+handleSearch\(([^):]+)\)\s*\{/g,
    'const handleSearch: AutoCompleteSearchHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleSearch\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleSearch: AutoCompleteSearchHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleScroll\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleScroll: AutoCompleteDropdownScrollHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleReachBottom\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleReachBottom: AutoCompleteDropdownReachBottomHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+createData\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const createData = ($1: string) => {',
  );

  return nextContent;
}

function applyTabsTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['ScrollPosition', 'TabTriggerEvent', 'TabsPosition', 'TabsType'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+position\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const position = ref<TabsPosition>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+scrollPosition\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const scrollPosition = ref<ScrollPosition>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+type\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const type = ref<TabsType>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+trigger\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const trigger = ref<TabTriggerEvent>($1);',
  );
  nextContent = nextContent.replace(/\((key)\)\s*=>/g, '($1: string | number) =>');

  return nextContent;
}

function applyTimelineTypeFixes(source, scriptContent) {
  let nextSource = source.replace(/\?\s*'horizontal'\s*:\s*''/g, "? 'horizontal' : undefined");
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['LabelPositionType', 'ModeType'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+mode\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const mode = ref<ModeType>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+pos\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const pos = ref<LabelPositionType>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+onModeChange\s*=\s*\((_?mode)\)\s*=>\s*\{/g,
    'const onModeChange = ($1: string | number | boolean) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onLabelPositionChange\s*=\s*\((_?pos)\)\s*=>\s*\{/g,
    'const onLabelPositionChange = ($1: string | number | boolean) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onChange\s*=\s*\((bool|fixed|v)\)\s*=>\s*\{/g,
    'const onChange = ($1: string | number | boolean) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onChange\s*=\s*\((_?mode)\)\s*=>\s*\{\s*\n\s*mode\.value\s*=\s*_?mode;/g,
    'const onChange = ($1: string | number | boolean) => {\n    mode.value = $1 as ModeType;',
  );
  nextContent = nextContent.replace(
    /const\s+onLabelPositionChange\s*=\s*\((_?pos):\s*LabelPositionType\)\s*=>\s*\{\s*\n\s*pos\.value\s*=\s*_?pos;/g,
    'const onLabelPositionChange = ($1: string | number | boolean) => {\n    pos.value = $1 as LabelPositionType;',
  );
  nextContent = nextContent.replace(
    /const\s+onModeChange\s*=\s*\((_?mode):\s*ModeType\)\s*=>\s*\{\s*\n\s*mode\.value\s*=\s*_?mode;/g,
    'const onModeChange = ($1: string | number | boolean) => {\n    mode.value = $1 as ModeType;',
  );
  nextContent = nextContent.replace(
    /isReverse\.value\s*=\s*bool;/g,
    'isReverse.value = Boolean(bool);',
  );
  nextSource = nextSource.replace(
    /@change="\(v\) => onChange\(\{ reverse: v \}\)"/g,
    '@change="(v) => onChange({ reverse: Boolean(v) })"',
  );
  nextSource = nextSource.replace(
    /@change="\(v\) => onChange\(\{ pending: v \? 'This is a pending dot' : false \}\)"/g,
    '@change="(v) => onChange({ pending: Boolean(v) ? \'This is a pending dot\' : false })"',
  );
  nextSource = nextSource.replace(
    /@change="\(v\) => onChange\(\{ hasPendingDot: v \}\)"/g,
    '@change="(v) => onChange({ hasPendingDot: Boolean(v) })"',
  );
  nextContent = nextContent.replace(
    /const\s+pendingProps\s*=\s*ref<Record<string, boolean \| string>>\(\{\}\);/,
    "const pendingProps = ref<{ direction?: 'horizontal'; reverse?: boolean; pending?: string | boolean; hasPendingDot?: boolean }>({});",
  );
  nextContent = nextContent.replace(
    /function\s+onChange\(newProps: Record<string, boolean \| string>\)\s*\{/,
    "function onChange(newProps: { direction?: 'horizontal'; reverse?: boolean; pending?: string | boolean; hasPendingDot?: boolean }) {",
  );

  return nextSource.replace(scriptContent, nextContent);
}

function applyTreeTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'CheckedStrategy',
      'LoadMore',
      'Size',
      'TreeCheckHandler',
      'TreeDropHandler',
      'TreeExpandHandler',
      'TreeNodeData',
      'TreeNodeKey',
      'TreeSelectHandler',
    ],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+treeData\s*=\s*\[/,
    'const treeData: TreeNodeData[] = [',
  );
  nextContent = nextContent.replace(
    /const\s+treeData\s*=\s*ref\(\[/,
    'const treeData = ref<TreeNodeData[]>([',
  );
  nextContent = nextContent.replace(
    /const\s+treeData\s*=\s*ref\(defaultTreeData\);/g,
    'const treeData = ref<TreeNodeData[]>(defaultTreeData);',
  );
  nextContent = nextContent.replace(
    /const\s+strategyOptions\s*=\s*\[/g,
    'const strategyOptions: Array<{ value: CheckedStrategy; label: string }> = [',
  );
  nextContent = nextContent.replace(
    /const\s+selectedKeys\s*=\s*ref(?:<[^>]+>)?\(\[\]\);/,
    'const selectedKeys = ref<TreeNodeKey[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+checkedKeys\s*=\s*ref(?:<[^>]+>)?\(\[\]\);/,
    'const checkedKeys = ref<TreeNodeKey[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+expandedKeys\s*=\s*ref(?:<[^>]+>)?\(\[\]\);/,
    'const expandedKeys = ref<TreeNodeKey[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+checkedStrategy\s*=\s*ref<'item\?\.value'>\('all'\);/g,
    "const checkedStrategy = ref<CheckedStrategy>('all');",
  );
  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/,
    'const size = ref<Size>($1);',
  );
  nextContent = nextContent.replace(
    /function\s+onSelect\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onSelect($1: Parameters<TreeSelectHandler>[0], $2: Parameters<TreeSelectHandler>[1]) {',
  );
  nextContent = nextContent.replace(
    /function\s+onCheck\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onCheck($1: Parameters<TreeCheckHandler>[0], $2: Parameters<TreeCheckHandler>[1]) {',
  );
  nextContent = nextContent.replace(
    /function\s+onExpand\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onExpand($1: Parameters<TreeExpandHandler>[0], $2: { expanded?: boolean; expandedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event }) {',
  );
  nextContent = nextContent.replace(
    /const\s+loadMore\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const loadMore: LoadMore = ($1) => {',
  );
  nextContent = nextContent.replace(
    /function\s+onDrop\(\{\s*dragNode\s*,\s*dropNode\s*,\s*dropPosition\s*\}\)\s*\{/g,
    'function onDrop({ dragNode, dropNode, dropPosition }: Parameters<TreeDropHandler>[0]) {',
  );
  nextContent = nextContent.replace(
    /const\s+loop\s*=\s*\(([^,)]+),\s*([^,)]+),\s*([^)]+)\)\s*=>\s*\{/g,
    'const loop = ($1: TreeNodeData[], $2: TreeNodeKey, $3: (item: TreeNodeData, index: number, arr: TreeNodeData[]) => void) => {',
  );
  nextContent = nextContent.replace(
    /function\s+searchData\(([^):]+)\)\s*\{/g,
    'function searchData($1: string) {',
  );
  nextContent = nextContent.replace(
    /const\s+loop\s*=\s*\(([^):]+)\)\s*=>\s*\{\s*\n\s*const\s+result\s*=\s*\[\];/g,
    'const loop = ($1: TreeNodeData[]): TreeNodeData[] => {\n      const result: TreeNodeData[] = [];',
  );
  nextContent = nextContent.replace(
    /function\s+getMatchIndex\(([^):]+)\)\s*\{/g,
    'function getMatchIndex($1: string) {',
  );
  nextContent = nextContent.replace(
    /const\s+treeNode\s*=\s*\{/g,
    'const treeNode: TreeNodeData = {',
  );
  nextContent = nextContent.replace(
    /const\s+list\s*=\s*\[\];/g,
    'const list: TreeNodeData[] = [];',
  );
  nextContent = nextContent.replace(
    /item\.title\.toLowerCase\(\)\.indexOf\(keyword\.toLowerCase\(\)\) > -1/g,
    "String(item.title ?? '').toLowerCase().indexOf(keyword.toLowerCase()) > -1",
  );

  return nextContent;
}

function applyTreeSelectTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'CheckedStrategy',
      'LabelValue',
      'Size',
      'TreeNodeData',
      'TreeNodeKey',
      'TreeSelectChangeHandler',
      'TreeSelectFallbackOption',
      'TreeSelectFilterTreeNode',
      'TreeSelectLoadMore',
      'TreeSelectSearchHandler',
    ],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+strategyOptions\s*=\s*\[/g,
    'const strategyOptions: Array<{ value: CheckedStrategy; label: string }> = [',
  );
  nextContent = nextContent.replace(
    /const\s+treeData\s*=\s*\[/g,
    'const treeData: TreeNodeData[] = [',
  );
  nextContent = nextContent.replace(
    /const\s+treeData\s*=\s*ref\(defaultTreeData\);/g,
    'const treeData = ref<TreeNodeData[]>(defaultTreeData);',
  );
  nextContent = nextContent.replace(
    /const\s+sizeToItemSize\s*=\s*\{/g,
    'const sizeToItemSize: Record<Size, number> = {',
  );
  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const size = ref<Size>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+treeCheckedStrategy\s*=\s*ref<'item\?\.value'>\('all'\);/g,
    "const treeCheckedStrategy = ref<CheckedStrategy>('all');",
  );
  nextContent = nextContent.replace(
    /const\s+list\s*=\s*\[\];/g,
    'const list: TreeNodeData[] = [];',
  );
  nextContent = nextContent.replace(
    /const\s+treeNode\s*=\s*\{/g,
    'const treeNode: TreeNodeData = {',
  );
  nextContent = nextContent.replace(
    /const\s+loadMore\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const loadMore: TreeSelectLoadMore = ($1) => {',
  );
  nextContent = nextContent.replace(
    /new\s+Promise\(\(resolve\)\s*=>/g,
    'new Promise<void>((resolve) =>',
  );
  nextContent = nextContent.replace(
    /function\s+searchData\(([^):]+)\)\s*\{/g,
    'function searchData($1: string) {',
  );
  nextContent = nextContent.replace(
    /const\s+loop\s*=\s*\(([^):]+)\)\s*=>\s*\{\s*\n\s*const\s+result\s*=\s*\[\];/g,
    'const loop = ($1: TreeNodeData[]): TreeNodeData[] => {\n      const result: TreeNodeData[] = [];',
  );
  nextContent = nextContent.replace(
    /const\s+onSearch\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const onSearch: TreeSelectSearchHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onChange\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const onChange: TreeSelectChangeHandler = ($1) => {',
  );
  nextContent = nextContent.replace(/\((key)\)\s*=>\s*\{/g, '($1: TreeNodeKey) => {');
  nextContent = nextContent.replace(
    /const\s+selected\s*=\s*ref(?:<[^>]+>)?\(\[\]\);/g,
    'const selected = ref<LabelValue[]>([]);',
  );
  nextContent = nextContent.replace(
    /function\s+filterTreeNode\(([^,)]+),\s*([^)]+)\)\s*\{/g,
    'function filterTreeNode($1: string, $2: TreeNodeData) {',
  );
  nextContent = nextContent.replace(
    /function\s+fallback\(([^):]+)\)\s*\{/g,
    'function fallback($1: TreeNodeKey) {',
  );
  nextContent = nextContent.replace(
    /function\s+onChange\(([^):]+)\)\s*\{/g,
    'function onChange($1: Parameters<TreeSelectChangeHandler>[0]) {',
  );
  nextContent = nextContent.replace(
    /String\(item\.title \?\? ''\)\.toLowerCase\(\)\.indexOf\(keyword\.toLowerCase\(\)\) > -1/g,
    "String(item.title ?? '').toLowerCase().indexOf(keyword.toLowerCase()) > -1",
  );
  nextContent = nextContent.replace(
    /item\.title\.toLowerCase\(\)\.indexOf\(keyword\.toLowerCase\(\)\) > -1/g,
    "String(item.title ?? '').toLowerCase().indexOf(keyword.toLowerCase()) > -1",
  );
  nextContent = nextContent.replace(
    /return\s+nodeData\.title\.toLowerCase\(\)\.indexOf\(searchValue\.toLowerCase\(\)\) > -1;/g,
    "return String(nodeData.title ?? '').toLowerCase().indexOf(searchValue.toLowerCase()) > -1;",
  );
  nextContent = nextContent.replace(
    /text\.value\s*=\s*selected;/g,
    'text.value = String(selected ?? "");',
  );

  return nextContent;
}

function applyTransferTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['TransferItem', 'TreeNodeData'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+getTransferData\s*=\s*\(treeData = \[\], transferDataSource = \[\]\)\s*=>\s*\{/g,
    'const getTransferData = (treeData: TreeNodeData[] = [], transferDataSource: TransferItem[] = []) => {',
  );
  nextContent = nextContent.replace(
    /const\s+getTreeData\s*=\s*\(data = \[\]\)\s*=>\s*\{/g,
    'const getTreeData = (data: TransferItem[] = []) => {',
  );
  nextContent = nextContent.replace(
    /const\s+travel\s*=\s*\(_treeData = \[\]\)\s*=>\s*\{\s*\n\s*const\s+treeDataSource\s*=\s*\[\];/g,
    'const travel = (_treeData: TreeNodeData[] = []) => {\n      const treeDataSource: TreeNodeData[] = [];',
  );
  nextContent = nextContent.replace(
    /transferDataSource\.push\(\{\s*label:\s*item\.title,\s*value:\s*item\.key\s*\}\);/g,
    "transferDataSource.push({ label: String(item.title ?? ''), value: String(item.key ?? '') });",
  );
  nextContent = nextContent.replace(
    /if \(item\.children \|\| values\.includes\(item\.key\)\) \{/g,
    'if (item.children || (item.key !== undefined && values.includes(String(item.key)))) {',
  );
  nextContent = nextContent.replace(/title:\s*item\.title,/g, "title: String(item.title ?? ''),");
  nextContent = nextContent.replace(/key:\s*item\.key,/g, "key: item.key ?? '',");

  return nextContent;
}

function applyTableTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'TableChangeExtra',
      'TableColumnData',
      'TableData',
      'TableExpandable',
      'TableLoadMore',
      'TableRowKey',
      'TableRowSelection',
      'TableSpanMethod',
      'TableSpanMethodContext',
      'TableSummary',
      'TableSummaryContext',
    ],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+columns\s*=\s*reactive\(\[/g,
    'const columns = reactive<TableColumnData[]>([',
  );
  nextContent = nextContent.replace(
    /const\s+columns\s*=\s*\[/g,
    'const columns: TableColumnData[] = [',
  );
  nextContent = nextContent.replace(
    /const\s+data\s*=\s*reactive\(\[/g,
    'const data = reactive<TableData[]>([',
  );
  nextContent = nextContent.replace(/const\s+data\s*=\s*\[/g, 'const data: TableData[] = [');
  nextContent = nextContent.replace(
    /const\s+data\s*=\s*ref\(\[/g,
    'const data = ref<TableData[]>([',
  );
  nextContent = nextContent.replace(
    /const\s+data\s*=\s*reactive\(\s*Array\(/g,
    'const data = reactive<TableData[]>(Array(',
  );
  nextContent = nextContent.replace(
    /const\s+expandable\s*=\s*reactive\(\{/g,
    'const expandable = reactive<TableExpandable>({',
  );
  nextContent = nextContent.replace(
    /const\s+expandable\s*=\s*\{/g,
    'const expandable: TableExpandable = {',
  );
  nextContent = nextContent.replace(
    /const\s+rowSelection\s*=\s*\{/g,
    'const rowSelection: TableRowSelection = {',
  );
  nextContent = nextContent.replace(
    /const\s+rowSelection\s*=\s*reactive\(\{/g,
    'const rowSelection = reactive<TableRowSelection>({',
  );
  nextContent = nextContent.replace(
    /const\s+options\s*=\s*\{/g,
    'const options: Record<string, string[]> = {',
  );
  nextContent = nextContent.replace(
    /const\s+expandedKeys\s*=\s*ref\(\[\]\);/g,
    'const expandedKeys = ref<string[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+tableHostRef\s*=\s*ref\(\);/g,
    'const tableHostRef = ref<HTMLElement | null>(null);',
  );
  nextContent = nextContent.replace(
    /const\s+summary\s*=\s*\(\{\s*columns\s*,\s*data\s*\}\)\s*=>\s*\{/g,
    'const summary: TableSummary = ({ columns, data }: TableSummaryContext) => {',
  );
  nextContent = nextContent.replace(
    /const\s+spanMethod\s*=\s*\(\{\s*rowIndex\s*,\s*columnIndex\s*\}\)\s*=>\s*\{/g,
    'const spanMethod: TableSpanMethod = ({ rowIndex, columnIndex }: TableSpanMethodContext) => {',
  );
  nextContent = nextContent.replace(
    /const\s+dataSpanMethod\s*=\s*\(\{\s*record\s*,\s*column\s*\}\)\s*=>\s*\{/g,
    'const dataSpanMethod: TableSpanMethod = ({ record, column }: TableSpanMethodContext) => {',
  );
  nextContent = nextContent.replace(
    /const\s+spanMethodAll\s*=\s*\(\{\s*rowIndex\s*,\s*columnIndex\s*\}\)\s*=>\s*\{/g,
    'const spanMethodAll: TableSpanMethod = ({ rowIndex, columnIndex }: TableSpanMethodContext) => {',
  );
  nextContent = nextContent.replace(
    /const\s+getColorClass\s*=\s*\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*=>\s*\{/g,
    'const getColorClass = ($1: TableColumnData, $2: TableData) => {',
  );
  nextContent = nextContent.replace(
    /const\s+loadMore\s*=\s*\((record)\s*,\s*(done)\)\s*=>\s*\{/g,
    'const loadMore: TableLoadMore = ($1, $2) => {',
  );
  nextContent = nextContent.replace(
    /const\s+getRowKey\s*=\s*\((record)\)\s*=>\s*record\.id;/g,
    "const getRowKey: TableRowKey = (record: TableData) => String(record.id ?? '');",
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\((_data)\)\s*=>\s*\{/g,
    'const handleChange = ($1: TableData[]) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\((rowIndex)\)\s*=>\s*\{/g,
    'const handleChange = ($1: number) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*=>\s*\{/g,
    'const handleChange = ($1: TableData[], $2: TableChangeExtra, $3: TableData[]) => {',
  );
  nextContent = nextContent.replace(
    /const\s+scrollTableToRow\s*=\s*async\s*\((row)\)\s*=>\s*\{/g,
    'const scrollTableToRow = async ($1: number) => {',
  );
  nextContent = nextContent.replace(
    /const\s+expandAndScrollToRow\s*=\s*async\s*\((row)\)\s*=>\s*\{/g,
    'const expandAndScrollToRow = async ($1: number) => {',
  );

  return nextContent;
}

function applySelectTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['SelectFallbackOption', 'Size'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const size = ref<Size>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+fallback\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const fallback: SelectFallbackOption = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+data\s*=\s*\{/g,
    'const data: Record<string, string[]> = {',
  );
  nextContent = nextContent.replace(
    /const\s+handleSearch\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleSearch = ($1: string) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleScroll\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleScroll = ($1: Event) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleReachBottom\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleReachBottom = ($1: Event) => {',
  );

  return nextContent;
}

function applyInputTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(scriptContent, '@sdata/web-vue', ['Size'], true);

  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const size = ref<Size>($1);',
  );

  return nextContent;
}

function applyCheckboxTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+data\s*=\s*ref\(\[\]\);/g,
    'const data = ref<string[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+handleChangeAll\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleChangeAll = ($1: boolean | (string | number | boolean)[], _event: Event) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleChange = ($1: (string | number | boolean)[], _event: Event) => {',
  );

  return nextContent;
}

function applyLayoutTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+onCollapse\s*=\s*\(([^,)]+)\s*,\s*([^)]+)\)\s*=>\s*\{/g,
    "const onCollapse = ($1: boolean, $2: 'responsive' | 'clickTrigger') => {",
  );
  nextContent = nextContent.replace(
    /function\s+onClickMenuItem\(([^):]+)\)\s*\{/g,
    'function onClickMenuItem($1: string | number) {',
  );

  return nextContent;
}

function applyCarouselTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['CarouselIndicatorPosition', 'CarouselIndicatorType'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+indicatorType\s*=\s*shallowRef\('dot'\);/g,
    "const indicatorType = shallowRef<CarouselIndicatorType>('dot');",
  );
  nextContent = nextContent.replace(
    /const\s+indicatorPosition\s*=\s*shallowRef\('bottom'\);/g,
    "const indicatorPosition = shallowRef<CarouselIndicatorPosition>('bottom');",
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleChange = ($1: number) => {',
  );
  nextContent = nextContent.replace(
    /function\s+updateType\(([^):]+)\)\s*\{/g,
    'function updateType($1: string | number | boolean) {',
  );
  nextContent = nextContent.replace(
    /function\s+updatePosition\(([^):]+)\)\s*\{/g,
    'function updatePosition($1: string | number | boolean) {',
  );
  nextContent = nextContent.replace(
    /indicatorType\.value\s*=\s*type;/g,
    'indicatorType.value = type as CarouselIndicatorType;',
  );
  nextContent = nextContent.replace(
    /indicatorPosition\.value\s*=\s*position;/g,
    'indicatorPosition.value = position as CarouselIndicatorPosition;',
  );

  return nextContent;
}

function applyDrawerTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+custom\s*=\s*ref\(\[\]\);/g,
    "const custom = ref<Array<'hide header' | 'hide footer' | 'hide cancel'>>([]);",
  );
  nextContent = nextContent.replace(
    /const\s+position\s*=\s*ref\('right'\);/g,
    "const position = ref<'top' | 'right' | 'bottom' | 'left'>('right');",
  );

  return nextContent;
}

function applySwitchTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+handleChangeIntercept(\d*)\s*=\s*async\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleChangeIntercept$1 = async ($2: string | number | boolean) => {',
  );

  return nextContent;
}

function applyTimePickerTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['Size', 'TimeValue'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+value\s*=\s*shallowRef\(null\);/g,
    'const value = shallowRef<TimeValue | undefined>();',
  );
  nextContent = nextContent.replace(
    /const\s+size\s*=\s*shallowRef\('small'\);/g,
    "const size = shallowRef<Size>('small');",
  );
  nextContent = nextContent.replace(
    /function\s+print\(\.\.\.arg\)\s*\{/g,
    'function print(...arg: [string, string | Array<string | undefined> | undefined, Date | Array<Date | undefined> | undefined]) {',
  );

  return nextContent;
}

function applyTagTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['InputInstance'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+inputRef\s*=\s*ref\(null\);/g,
    'const inputRef = ref<InputInstance | null>(null);',
  );
  nextContent = nextContent.replace(
    /const\s+handleRemove\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleRemove = ($1: string) => {',
  );

  return nextContent;
}

function applyStepsTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['StepsChangeHandler'],
    true,
  );

  nextContent = nextContent.replace(
    /function\s+setCurrent\(([^):]+)\)\s*\{\s*\n\s*current\.value\s*=\s*\1;/g,
    'const setCurrent: StepsChangeHandler = (step) => {\n    current.value = step;',
  );
  nextContent = nextContent.replace(
    /const\s+setCurrent\s*=\s*\(([^):]+)\)\s*=>\s*\{\s*\n\s*current\.value\s*=\s*\1;/g,
    'const setCurrent: StepsChangeHandler = (step) => {\n    current.value = step;',
  );

  return nextContent;
}

function applySliderTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['SliderFormatTooltip', 'SliderValue'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+value\s*=\s*ref\(\[([^)]+)\]\);/g,
    'const value = ref<SliderValue>([$1]);',
  );
  nextContent = nextContent.replace(
    /const\s+formatter\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const formatter: SliderFormatTooltip = ($1) => {',
  );

  return nextContent;
}

function applyOverflowListTypeFixes(source) {
  return source.replace(/<sd-form\s+auto-label-width>/g, '<sd-form :auto-label-width="true">');
}

function applyMenuTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['MenuCollapseHandler'],
    true,
  );

  nextContent = nextContent.replace(
    /function\s+onCollapse\(([^,)]+)\s*,\s*([^)]+)\)\s*\{/g,
    'const onCollapse: MenuCollapseHandler = ($1, $2) => {',
  );

  return nextContent;
}

function applyListTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+data\s*=\s*reactive\(\[\]\);/g,
    'const data = reactive<string[]>([]);',
  );

  return nextContent;
}

function applyInputNumberTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['InputNumberFormatter', 'InputNumberParser'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+formatter\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const formatter: InputNumberFormatter = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+parser\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const parser: InputNumberParser = ($1) => {',
  );

  return nextContent;
}

function applyImageTypeFixes(scriptContent) {
  let nextContent = scriptContent;

  nextContent = nextContent.replace(
    /const\s+timestamp\s*=\s*ref\(''\);/g,
    'const timestamp = ref(Date.now());',
  );

  return nextContent;
}

function applyCascaderTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'CascaderChangeHandler',
      'CascaderFallback',
      'CascaderFormatLabel',
      'CascaderLoadMore',
      'CascaderOption',
      'CascaderPathValue',
    ],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+options\s*=\s*\[/g,
    'const options: CascaderOption[] = [',
  );
  nextContent = nextContent.replace(
    /const\s+fallback\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const fallback: CascaderFallback = ($1) => {',
  );
  nextContent = nextContent.replace(
    /return\s+([A-Za-z_$][\w$]*)\.map\(/g,
    (match, bindingName) =>
      `return (Array.isArray(${bindingName}) ? ${bindingName} : [${bindingName}]).map(`,
  );
  nextContent = nextContent.replace(
    /\.map\(\(([^)]+)\)\s*=>\s*\1\.toUpperCase\(\)\)/g,
    '.map(($1) => String($1).toUpperCase())',
  );
  nextContent = nextContent.replace(
    /const\s+format\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const format: CascaderFormatLabel = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+loadMore\s*=\s*\(([^,)]+),\s*([^)]+)\)\s*=>\s*\{/g,
    'const loadMore: CascaderLoadMore = ($1, $2) => {',
  );
  nextContent = nextContent.replace(
    /const\s+handleChange\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const handleChange: CascaderChangeHandler = ($1) => {',
  );
  nextContent = nextContent.replace(
    /const\s+createLeafOptions\s*=\s*\(([^,)]+),\s*([^)]+)\)\s*=>\s*\{/g,
    'const createLeafOptions = ($1: string, $2: number): CascaderOption[] => {',
  );
  nextContent = nextContent.replace(
    /const\s+preset\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    "const preset = ref<'default' | 'explicit'>($1);",
  );

  return nextContent;
}

function applyDescriptionsTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['DescData', 'DescLayout', 'Size'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const size = ref<Size>($1);',
  );
  nextContent = nextContent.replace(/const\s+data\s*=\s*\[/g, 'const data: DescData[] = [');
  nextContent = nextContent.replace(/size:\s*'medium',/g, "size: 'medium' as Size,");
  nextContent = nextContent.replace(
    /layout:\s*'horizontal',/g,
    "layout: 'horizontal' as DescLayout,",
  );
  nextContent = nextContent.replace(
    /tableLayout:\s*'auto',/g,
    "tableLayout: 'auto' as 'auto' | 'fixed',",
  );
  nextContent = nextContent.replace(
    /const\s+layoutOptions\s*=\s*\[/g,
    'const layoutOptions: DescLayout[] = [',
  );
  nextContent = nextContent.replace(
    /const\s+sizeOptions\s*=\s*\[/g,
    'const sizeOptions: Size[] = [',
  );

  return nextContent;
}

function applyUploadTypeFixes(scriptContent) {
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['CustomIcon', 'FileItem', 'FileStatus', 'RequestOption', 'UploadInstance', 'UploadRequest'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+file\s*=\s*ref\(\);/g,
    'const file = ref<FileItem | undefined>();',
  );
  nextContent = nextContent.replace(
    /const\s+files\s*=\s*ref\(\[\]\);/g,
    'const files = ref<FileItem[]>([]);',
  );
  nextContent = nextContent.replace(
    /const\s+uploadRef\s*=\s*ref\(\);/g,
    'const uploadRef = ref<UploadInstance | null>(null);',
  );
  nextContent = nextContent.replace(
    /const\s+type\s*=\s*ref(?:<[^>]+>)?\('text'\);/g,
    "const type = ref<'text' | 'picture' | 'picture-card'>('text');",
  );
  nextContent = nextContent.replace(/const\s+fileList\s*=\s*\[/g, 'const fileList: FileItem[] = [');
  nextContent = nextContent.replace(/status:\s*'error',/g, "status: 'error' as FileStatus,");
  nextContent = nextContent.replace(
    /const\s+beforeRemove\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const beforeRemove = ($1: FileItem) => {',
  );
  nextContent = nextContent.replace(
    /const\s+beforeUpload\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const beforeUpload = ($1: File) => {',
  );
  nextContent = nextContent.replace(
    /return\s+new\s+Promise\(\(resolve,\s*reject\)\s*=>/g,
    'return new Promise<boolean>((resolve, reject) =>',
  );
  nextContent = nextContent.replace(
    /const\s+customRequest\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const customRequest = ($1: RequestOption): UploadRequest => {',
  );
  nextContent = nextContent.replace(
    /const\s+\{\s*onProgress,\s*onError,\s*onSuccess,\s*fileItem,\s*name\s*\}\s*=\s*option;/g,
    "const { onProgress, onError, onSuccess, fileItem, name } = option;\n    const fileName = typeof name === 'function' ? name(fileItem) : (name ?? 'file');",
  );
  nextContent = nextContent.replace(
    /formData\.append\(name\s*\|\|\s*'file',\s*fileItem\.file\);/g,
    'formData.append(fileName, fileItem.file);',
  );
  nextContent = nextContent.replace(
    /const\s+onChange\s*=\s*\(([^,)]+),\s*([^)]+)\)\s*=>\s*\{/g,
    'const onChange = ($1: FileItem[], $2: FileItem) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onProgress\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const onProgress = ($1: FileItem) => {',
  );
  nextContent = nextContent.replace(
    /const\s+getCustomIcon\s*=\s*\(\)\s*=>\s*\{/g,
    'const getCustomIcon = (): CustomIcon => {',
  );
  nextContent = nextContent.replace(
    /fileName:\s*\(([^):]+)\)\s*=>\s*\{/g,
    'fileName: ($1: FileItem) => {',
  );
  nextContent = nextContent.replace(
    /const\s+submitOne\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const submitOne = ($1: Event) => {',
  );
  nextContent = nextContent.replace(
    /const\s+submit\s*=\s*\(([^):]+)\)\s*=>\s*\{/g,
    'const submit = ($1: Event) => {',
  );
  nextContent = nextContent.replace(
    /const\s+onChange\s*=\s*\((fileList)\)\s*=>\s*\{/g,
    'const onChange = ($1: FileItem[]) => {',
  );

  return nextContent;
}

function applyFormTypeFixes(source, scriptContent) {
  let nextSource = source.replace(/\$refs\.formRef\./g, 'formRef?.');
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['FieldRule', 'FormInstance', 'Size', 'ValidateStatus', 'ValidatedError'],
    true,
  );

  nextContent = nextContent.replace(
    /const\s+formRef\s*=\s*ref\((?:null)?\);/g,
    'const formRef = ref<FormInstance | null>(null);',
  );
  nextContent = nextContent.replace(
    /const\s+formRef\s*=\s*ref\(\);/g,
    'const formRef = ref<FormInstance | null>(null);',
  );

  if (nextSource.includes('ref="formRef"') && !/const\s+formRef\s*=/.test(nextContent)) {
    nextContent = nextContent.replace(
      /import\s+\{([^}]*)\}\s+from\s+'vue';/,
      (match, specifiers) => {
        const nextSpecifiers = toSortedList(
          new Set(
            specifiers
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
              .concat('ref'),
          ),
        );
        return `import { ${nextSpecifiers.join(', ')} } from 'vue';`;
      },
    );
    nextContent = `${nextContent}\nconst formRef = ref<FormInstance | null>(null);`;
  }

  nextContent = nextContent.replace(
    /const\s+size\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const size = ref<Size>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+status\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    'const status = ref<ValidateStatus>($1);',
  );
  nextContent = nextContent.replace(
    /const\s+layout\s*=\s*ref(?:<[^>]+>)?\(([^)]+)\);/g,
    "const layout = ref<'horizontal' | 'vertical' | 'inline'>($1);",
  );
  nextContent = nextContent.replace(
    /handleSubmit\s*=\s*\(\{\s*values\s*,\s*errors\s*\}\)\s*=>\s*\{/g,
    'handleSubmit = ({ values, errors }: { values: Record<string, unknown>; errors: Record<string, ValidatedError> | undefined }) => {',
  );
  nextContent = nextContent.replace(
    /handleSubmit\s*=\s*\(([A-Za-z_$][\w$]*)\)\s*=>\s*\{/g,
    'handleSubmit = ($1: { values: Record<string, unknown>; errors: Record<string, ValidatedError> | undefined }) => {',
  );
  nextContent = nextContent.replace(/const\s+rules\s*=\s*\[/g, 'const rules: FieldRule[] = [');
  nextContent = nextContent.replace(
    /const\s+rules\s*=\s*\{/g,
    'const rules: Record<string, FieldRule[]> = {',
  );
  nextContent = nextContent.replace(
    /validator:\s*\(([^,)]+),\s*([^)]+)\)\s*=>/g,
    'validator: ($1: unknown, $2: (error?: string) => void) =>',
  );
  nextContent = nextContent.replace(
    /new\s+Promise\(\(resolve\)\s*=>/g,
    'new Promise<void>((resolve) =>',
  );
  nextContent = nextContent.replace(/size:\s*'medium',/g, "size: 'medium' as Size,");
  nextContent = nextContent.replace(/formRef\.value\.setFields\(/g, 'formRef.value?.setFields(');
  nextContent = nextContent.replace(
    /const\s+handleDelete\s*=\s*\(([A-Za-z_$][\w$]*)\)\s*=>\s*\{/g,
    'const handleDelete = ($1: number) => {',
  );

  nextSource = nextSource.replace(scriptContent, nextContent);
  return nextSource;
}

function applyDatePickerTypeFixes(source, scriptContent) {
  let nextSource = source
    .replace(
      /:format="\(value\) => `custom format: \$\{dayjs\(value\)\.format\('YYYY-MM-DD'\)\}`"/g,
      ':format="formatDate"',
    )
    .replace(
      /:disabledDate="\(current\) => dayjs\(current\)\.isBefore\(dayjs\(\)\)"/g,
      ':disabledDate="disablePastDate"',
    )
    .replace(
      /:disabledDate="\(current\) => dayjs\(current\)\.isBefore\(dayjs\('2020-08-08'\)\)"/g,
      ':disabledDate="disableBeforePresetDate"',
    );

  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    [
      'CalendarValue',
      'DatePickerChangeHandler',
      'DisabledDate',
      'DisabledTime',
      'DisabledTimeProps',
      'FormatFunc',
      'RangeDisabledTime',
    ],
    true,
  );

  if (nextSource.includes('formatDate') && !nextContent.includes('const formatDate')) {
    nextContent +=
      "\nconst formatDate: FormatFunc = (value) => `custom format: ${dayjs(value).format('YYYY-MM-DD')}`;";
  }

  if (nextSource.includes('disablePastDate') && !nextContent.includes('const disablePastDate')) {
    nextContent +=
      '\nconst disablePastDate: DisabledDate = (current) => dayjs(current).isBefore(dayjs());';
  }

  if (
    nextSource.includes('disableBeforePresetDate') &&
    !nextContent.includes('const disableBeforePresetDate')
  ) {
    nextContent +=
      "\nconst disableBeforePresetDate: DisabledDate = (current) => dayjs(current).isBefore(dayjs('2020-08-08'));";
  }

  nextContent = nextContent.replace(
    /function\s+range\(([^,)]+),\s*([^)]+)\)\s*\{/g,
    'function range($1: number, $2: number) {',
  );
  nextContent = nextContent.replace(
    /function\s+getDisabledTime\(([^)]+)\)\s*\{/g,
    'function getDisabledTime($1: Date): DisabledTimeProps {',
  );
  nextContent = nextContent.replace(
    /function\s+getDisabledRangeTime\(([^,)]+),\s*([^)]+)\)\s*\{/g,
    "function getDisabledRangeTime($1: Date, $2: 'start' | 'end'): DisabledTimeProps {",
  );
  nextContent = nextContent.replace(
    /function\s+onSelect\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onSelect($1: unknown, $2: unknown) {',
  );
  nextContent = nextContent.replace(
    /function\s+onChange\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onChange($1: unknown, $2: unknown) {',
  );
  nextContent = nextContent.replace(
    /function\s+onOk\(([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\)\s*\{/g,
    'function onOk($1: unknown, $2: unknown) {',
  );
  nextContent = nextContent.replace(
    /const\s+pickerValue\s*=\s*shallowRef\(null\);/g,
    'const pickerValue = shallowRef<CalendarValue | undefined>(undefined);',
  );
  nextContent = nextContent.replace(
    /const\s+rangePickerValue\s*=\s*shallowRef\(null\);/g,
    'const rangePickerValue = shallowRef<CalendarValue[] | undefined>(undefined);',
  );

  nextSource = nextSource.replace(scriptContent, nextContent);
  return nextSource;
}

function applyMessageTypeFixes(source, scriptContent) {
  let nextSource = source
    .replace(/this\.\$message\./g, 'Message.')
    .replace(/status="primary"/g, 'type="primary"')
    .replace(/this\.\$data\.index\+\+/g, 'index.value++');
  const nextContent = ensureImportSpecifiers(scriptContent, '@sdata/web-vue', ['Message'], false);
  return nextSource.replace(scriptContent, nextContent);
}

function applyNotificationTypeFixes(source, scriptContent) {
  let nextSource = source.replace(/this\.\$notification\./g, 'Notification.');
  let nextContent = ensureImportSpecifiers(
    scriptContent,
    '@sdata/web-vue',
    ['Notification'],
    false,
  );
  nextContent = nextContent.replace(
    /onClick:\s*closeNotification/g,
    'onClick: () => closeNotification()',
  );
  nextContent = nextContent.replace(
    /onClick:\s*\(\)\s*=>\s*closeNotification\(\)/g,
    'onClick: () => closeNotification.close()',
  );
  nextSource = nextSource.replace(scriptContent, nextContent);
  nextSource = nextSource.replace(
    /footer:\s*h\(Space, null, \(\) => \[/g,
    'footer: () => h(Space, null, () => [',
  );
  nextSource = nextSource.replace(/closeIcon:\s*h\(([^)]+)\)/g, 'closeIcon: () => h($1)');
  nextSource = nextSource.replace(
    /closeIconElement:\s*h\(([^,]+),\s*([^,]+),\s*\(\) => ([^)]+)\)/g,
    'closeIconElement: () => h($1, $2, () => $3)',
  );
  return nextSource;
}

function applyTypedScriptSetupFixes(source, relativePath) {
  const sections = splitSfcSections(source);
  if (!sections) {
    return source;
  }

  let nextSource = source;
  let nextScriptContent = annotateRadioModelRefs(sections.scriptSetup, sections.template);
  nextScriptContent = annotateEmptyArrayRefs(nextScriptContent);

  if (relativePath.includes('/auto-complete/')) {
    nextScriptContent = applyAutoCompleteTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/tabs/')) {
    nextScriptContent = applyTabsTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/tree-select/')) {
    nextScriptContent = applyTreeSelectTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/tree/')) {
    nextScriptContent = applyTreeTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/transfer/')) {
    nextScriptContent = applyTransferTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/table/')) {
    nextScriptContent = applyTableTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/select/')) {
    nextScriptContent = applySelectTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/input/')) {
    nextScriptContent = applyInputTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/checkbox/')) {
    nextScriptContent = applyCheckboxTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/layout/')) {
    nextScriptContent = applyLayoutTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/carousel/')) {
    nextScriptContent = applyCarouselTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/drawer/')) {
    nextScriptContent = applyDrawerTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/switch/')) {
    nextScriptContent = applySwitchTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/time-picker/')) {
    nextScriptContent = applyTimePickerTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/tag/')) {
    nextScriptContent = applyTagTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/steps/')) {
    nextScriptContent = applyStepsTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/slider/')) {
    nextScriptContent = applySliderTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/overflow-list/')) {
    nextSource = applyOverflowListTypeFixes(nextSource);
  }

  if (relativePath.includes('/menu/')) {
    nextScriptContent = applyMenuTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/list/')) {
    nextScriptContent = applyListTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/input-number/')) {
    nextScriptContent = applyInputNumberTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/image/')) {
    nextScriptContent = applyImageTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/cascader/')) {
    nextScriptContent = applyCascaderTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/descriptions/')) {
    nextScriptContent = applyDescriptionsTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/upload/')) {
    nextScriptContent = applyUploadTypeFixes(nextScriptContent);
  }

  if (relativePath.includes('/form/')) {
    const rewrittenSource = applyFormTypeFixes(nextSource, nextScriptContent);
    const rewrittenSections = splitSfcSections(rewrittenSource);
    if (rewrittenSections) {
      nextSource = rewrittenSource;
      nextScriptContent = rewrittenSections.scriptSetup;
    }
  }

  if (relativePath.includes('/date-picker/')) {
    const rewrittenSource = applyDatePickerTypeFixes(nextSource, nextScriptContent);
    const rewrittenSections = splitSfcSections(rewrittenSource);
    if (rewrittenSections) {
      nextSource = rewrittenSource;
      nextScriptContent = rewrittenSections.scriptSetup;
    }
  }

  if (relativePath.includes('/timeline/')) {
    const rewrittenSource = applyTimelineTypeFixes(nextSource, nextScriptContent);
    const rewrittenSections = splitSfcSections(rewrittenSource);
    if (rewrittenSections) {
      nextSource = rewrittenSource;
      nextScriptContent = rewrittenSections.scriptSetup;
    }
  }

  if (relativePath.includes('/message/')) {
    const rewrittenSource = applyMessageTypeFixes(nextSource, nextScriptContent);
    const rewrittenSections = splitSfcSections(rewrittenSource);
    if (rewrittenSections) {
      nextSource = rewrittenSource;
      nextScriptContent = rewrittenSections.scriptSetup;
    }
  }

  if (relativePath.includes('/notification/')) {
    const rewrittenSource = applyNotificationTypeFixes(nextSource, nextScriptContent);
    const rewrittenSections = splitSfcSections(rewrittenSource);
    if (rewrittenSections) {
      nextSource = rewrittenSource;
      nextScriptContent = rewrittenSections.scriptSetup;
    }
  }

  const updatedBlock = `<script setup lang="ts">${normalizeImports(nextScriptContent)}</script>`;
  return nextSource.replace(splitSfcSections(nextSource).scriptSetupBlock, updatedBlock);
}

function transformSource(source, relativePath) {
  const withNormalizedPrefix = normalizeLegacyTailwindPrefix(source);
  const withStaticStyles = transformStaticStyles(withNormalizedPrefix);
  const withBoundStyles = transformBoundStyles(withStaticStyles);
  const withLegacyScript = transformLegacyScript(withBoundStyles);
  const withSharedStyleBindings = transformSharedStyleBindings(withLegacyScript);
  const withTypedScriptFixes = applyTypedScriptSetupFixes(withSharedStyleBindings, relativePath);
  return normalizeLegacyTailwindPrefix(withTypedScriptFixes);
}

const vueFiles = collectVueFiles(targetDir);
let changedFiles = 0;

for (const filePath of vueFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(rootDir, filePath).replaceAll('\\', '/');
  const nextSource = transformSource(source, relativePath);

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
