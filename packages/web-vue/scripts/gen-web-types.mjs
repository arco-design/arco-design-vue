// oxlint-disable no-console
import fg from 'fast-glob';
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse as parseComponent } from 'vue-docgen-api';

import { toKebabCase } from './utils/convert-case.mjs';
import { getPackage } from './utils/package.mjs';
import { slotTagHandler } from './utils/slot-tag-handler.mjs';

const resolveExistingPath = async (basePath) => {
  const candidates = [basePath, `${basePath}.ts`, `${basePath}.tsx`, `${basePath}.vue`];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next supported source extension.
    }
  }

  throw new Error(`Unable to resolve component source from index import: ${basePath}`);
};

const getComponentsFromIndexes = async () => {
  const indexes = (
    await fg('components/*/index.ts', { ignore: ['components/locale/index.ts'] })
  ).sort((left, right) => left.localeCompare(right));
  const components = [];
  const seen = new Set();

  for (const item of indexes) {
    const dirname = path.dirname(item);
    const source = await readFile(item, 'utf8');
    const matches = Array.from(
      source.matchAll(/import\s+(_[A-Za-z0-9_$]+)\s+from\s+['"](\.[^'"]+)['"]/g),
    );

    for (const match of matches) {
      const importPath = match[2];
      if (!importPath) {
        continue;
      }

      const resolvedPath = await resolveExistingPath(path.resolve(dirname, importPath));
      if (!seen.has(resolvedPath)) {
        seen.add(resolvedPath);
        components.push(resolvedPath);
      }
    }
  }

  return components;
};

const isLanguageTag = (title) => ['zh', 'en'].includes(title);

const resolveTagName = (displayName) => {
  const normalizedName = displayName.includes('-') ? displayName : toKebabCase(displayName);

  return normalizedName.startsWith('sd-') ? normalizedName : `sd-${normalizedName}`;
};

const resolveComponent = (doc) => {
  return {
    name: resolveTagName(doc.displayName),
    props:
      doc.props
        ?.map((descriptor) => {
          const description = Object.values(descriptor.tags ?? {}).reduce(
            (accumulator, item) => {
              item.forEach((tag) => {
                if (isLanguageTag(tag.title)) {
                  accumulator[tag.title] = tag.description;
                }
              });

              return accumulator;
            },
            { zh: '', en: '' },
          );

          return {
            name: toKebabCase(descriptor.name),
            type: descriptor.type?.name,
            description,
          };
        })
        .filter((item) => Boolean(item.description.en)) ?? [],
    events:
      doc.events
        ?.map((descriptor) => {
          const description = (descriptor.tags ?? []).reduce(
            (accumulator, item) => {
              if (isLanguageTag(item.title)) {
                accumulator[item.title] = item.content;
              }

              return accumulator;
            },
            { zh: '', en: '' },
          );

          return {
            name: toKebabCase(descriptor.name),
            description,
          };
        })
        .filter((item) => Boolean(item.description.en) && !item.name.startsWith('update:')) ?? [],
    slots:
      doc.slots
        ?.map((descriptor) => {
          const description = Object.values(descriptor.tags ?? {}).reduce(
            (accumulator, item) => {
              if (isLanguageTag(item.title)) {
                accumulator[item.title] = item.content;
              }

              return accumulator;
            },
            { zh: '', en: '' },
          );

          return {
            name: toKebabCase(descriptor.name),
            description,
          };
        })
        .filter((item) => Boolean(item.description.en)) ?? [],
  };
};

const isValidType = (type = '') => {
  const types = type.split('|').map((item) => item.trim());
  for (const item of types) {
    if (item && !/^(number|string|boolean|array|object)$/.test(item)) {
      return false;
    }
  }

  return true;
};

const transformToVetur = (components) => {
  const tags = {};
  const attributes = {};

  for (const component of components) {
    const attrs = [];

    for (const item of component.events ?? []) {
      attrs.push(item.name);
      attributes[`${component.name}/${item.name}`] = {
        description: item.description.en,
      };
    }

    for (const item of component.props ?? []) {
      const attrName = item.name.replace(/^on-/, '');
      if (!attrs.includes(attrName)) {
        attrs.push(attrName);
        attributes[`${component.name}/${attrName}`] = {
          description: item.description.en,
          type: isValidType(item.type) ? item.type : undefined,
        };
      }
    }

    tags[component.name] = {
      attributes: attrs,
    };
  }

  return { tags, attributes };
};

const transformToWebTypes = (components, { version }) => {
  const json = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: '@sdata/web-vue',
    version,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        'tags': [],
      },
    },
  };

  for (const component of components) {
    json.contributions.html.tags.push({
      name: component.name,
      attributes: component.props?.map((item) => ({
        name: item.name,
        description: item.description.en,
        value: {
          type: item.type,
          kind: 'expression',
        },
      })),
      events: component.events?.map((item) => ({
        name: item.name,
        description: item.description.en,
      })),
      slots: component.slots?.map((item) => ({
        name: item.name,
        description: item.description.en,
      })),
    });
  }

  return json;
};

export default async function generateWebTypes() {
  const packageData = await getPackage();
  const components = await getComponentsFromIndexes();
  const docs = [];
  let typographyBase;
  let datePickerBase;

  for (const item of components) {
    const doc = resolveComponent(
      await parseComponent(item, {
        addScriptHandlers: [slotTagHandler],
      }),
    );

    if (/date-picker\/picker/.test(item)) {
      datePickerBase = doc;
      continue;
    }

    if (/typography\/base.tsx/.test(item)) {
      typographyBase = doc;
      continue;
    }

    if (/date-picker\/pickers\//.test(item)) {
      doc.props.push(...(datePickerBase?.props ?? []));
      doc.events.push(...(datePickerBase?.events ?? []));
      doc.slots.push(...(datePickerBase?.slots ?? []));
    }

    if (/typography\/(title|paragraph|text)/.test(item)) {
      doc.props.push(...(typographyBase?.props ?? []));
      doc.events.push(...(typographyBase?.events ?? []));
      doc.slots.push(...(typographyBase?.slots ?? []));
    }

    docs.push(doc);
  }

  await rm(path.resolve(process.cwd(), 'json'), { recursive: true, force: true });
  await mkdir(path.resolve(process.cwd(), 'json'), { recursive: true });
  const { tags, attributes } = transformToVetur(docs);
  await writeFile(
    path.resolve(process.cwd(), 'json', 'vetur-tags.json'),
    JSON.stringify(tags, null, 2),
  );
  await writeFile(
    path.resolve(process.cwd(), 'json', 'vetur-attributes.json'),
    JSON.stringify(attributes, null, 2),
  );

  const webTypes = transformToWebTypes(docs, { version: packageData.version });
  await writeFile(
    path.resolve(process.cwd(), 'json', 'web-types.json'),
    JSON.stringify(webTypes, null, 2),
  );
  console.log('Generated vetur/web-types metadata.');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateWebTypes();
}
