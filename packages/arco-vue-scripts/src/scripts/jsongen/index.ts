import fs from 'fs-extra';
import fg from 'fast-glob';
import path from 'path';
import {
  ComponentDoc,
  ParamTag,
  parse as parseComponent,
} from 'vue-docgen-api';
import { toKebabCase } from '../../utils/convert-case';
import { slotTagHandler } from '../docgen/slot-tag-handler';
import { getPackage } from '../../utils/get-package';

const getComponentsFromTemplates = async () => {
  const templates = await fg('components/**/TEMPLATE.md');

  const components: string[] = [];
  for (const item of templates) {
    const dirname = path.dirname(item);
    const source = await fs.readFile(item, 'utf8');
    const matches = Array.from(source.matchAll(/%%API\((.+?)\)%%/g));
    matches.forEach((match) => {
      if (match[1]) {
        components.push(path.resolve(dirname, match[1]));
      }
    });
  }

  return components;
};

interface ComponentData {
  name: string;
  props: Array<{
    name: string;
    type: string;
    description: {
      zh: string;
      en: string;
    };
  }>;
  events: Array<{
    name: string;
    description: {
      zh: string;
      en: string;
    };
  }>;
}

const isLanguageTag = (title: string): title is 'zh' | 'en' => {
  return ['zh', 'en'].includes(title);
};

const resolveComponent = (doc: ComponentDoc) => {
  return {
    name: toKebabCase(`a${doc.displayName}`),
    props:
      doc.props
        ?.map((descriptor) => {
          const description = Object.values(descriptor.tags ?? {}).reduce(
            (pre, item) => {
              item.forEach((tag) => {
                if (isLanguageTag(tag.title)) {
                  pre[tag.title] = (tag as ParamTag).description as string;
                }
              });
              return pre;
            },
            { zh: '', en: '' }
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
            (pre, item) => {
              if (isLanguageTag(item.title)) {
                // @ts-ignore
                pre[item.title] = item.content;
              }
              return pre;
            },
            { zh: '', en: '' }
          );

          return {
            name: toKebabCase(descriptor.name),
            description,
          };
        })
        .filter(
          (item) => Boolean(item.description.en) && !/^update:/.test(item.name)
        ) ?? [],
    slots:
      doc.slots
        ?.map((descriptor) => {
          const description = Object.values(descriptor.tags ?? {}).reduce(
            (pre, item) => {
              // @ts-ignore
              if (isLanguageTag(item.title)) {
                // @ts-ignore
                pre[item.title] = item.content;
              }
              return pre;
            },
            { zh: '', en: '' }
          );

          return {
            name: toKebabCase(descriptor.name),
            description,
          };
        })
        .filter((item) => Boolean(item.description.en)) ?? [],
  };
};

const isValidType = (type: string) => {
  const types = type.split('|').map((item) => item.trim());
  for (const item of types) {
    if (item && !/^(number|string|boolean|array|object)$/.test(item)) {
      return false;
    }
  }
  return true;
};

const transformToVetur = (components: ComponentData[]) => {
  const tags: Record<string, any> = {};
  const attributes: Record<string, any> = {};

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

  return {
    tags,
    attributes,
  };
};

const transformToWebTypes = (
  components: ComponentData[],
  { version }: { version: string }
) => {
  const json = {
    $schema:
      'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: '@arco-design/web-vue',
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
    const data = {
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
      // @ts-ignore
      slots: component.slots?.map((item) => ({
        name: item.name,
        description: item.description.en,
      })),
    };

    // @ts-ignore
    json.contributions.html.tags.push(data);
  }

  return json;
};

const jsongen = async () => {
  const packageData = await getPackage();

  const components = await getComponentsFromTemplates();

  const docs = [];
  let typographyBase;
  let datePickerBase;
  for (const item of components) {
    const doc = resolveComponent(
      await parseComponent(item, {
        addScriptHandlers: [slotTagHandler],
      })
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

  await fs.emptyDir(path.resolve(process.cwd(), 'json'));

  // @ts-ignore
  const { tags, attributes } = transformToVetur(docs);

  await fs.writeFile(
    path.resolve(process.cwd(), 'json/vetur-tags.json'),
    JSON.stringify(tags, null, 2)
  );
  await fs.writeFile(
    path.resolve(process.cwd(), 'json/vetur-attributes.json'),
    JSON.stringify(attributes, null, 2)
  );

  // @ts-ignore
  const web = transformToWebTypes(docs, { version: packageData.version });

  await fs.writeFile(
    path.resolve(process.cwd(), 'json/web-types.json'),
    JSON.stringify(web, null, 2)
  );
};

export default jsongen;
