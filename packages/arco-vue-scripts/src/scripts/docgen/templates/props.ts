import { ParamTag, PropDescriptor } from 'vue-docgen-api';
import {
  escapeCharacter,
  toKebabCase,
  unquote,
  trimStr,
  cleanStr,
} from '../utils';

const tmpl = (
  props: PropDescriptor[],
  { isInterface = false }: { isInterface: boolean },
  lang: string
) => {
  const displayableProps = props.filter(
    ({ name, description, tags }) =>
      description || ['disabled'].includes(name) || lang in (tags ?? {})
  );
  const hasVersion = displayableProps.some((prop) => prop?.tags?.version);
  const content = displayableProps
    .map((prop) => {
      const { name, type, values, defaultValue, required, tags } = prop;
      let { description } = prop;
      if (tags?.[lang]?.length) {
        description = (tags[lang][0] as ParamTag).description as string;
      }

      // 支持通过名为 type 的 tag 重新定义字段的类型
      const fixedType = cleanStr(
        // tag 的 ts 类型有问题，所以忽略 ts 规则检查
        // @ts-ignore-next-line
        trimStr(tags?.type?.[0]?.description || type?.name || '')
      );

      const getName = () =>
        `${isInterface ? name : toKebabCase(name)}${
          tags?.vModel || name === 'modelValue' ? ' **(v-model)**' : ''
        }${
          required ? (lang === 'zh' ? ' **(必填)**' : ' **(required)**') : ''
        }`;

      const getDescription = () => {
        if (!description && name === 'disabled') {
          return lang === 'zh' ? '是否禁用' : 'Whether to disable';
        }

        return escapeCharacter(trimStr(description || ''));
      };

      const getType = () => {
        if (values) {
          return escapeCharacter(
            values
              .map((item) => {
                const fixItem =
                  fixedType === 'string' ? `'${unquote(item)}'` : item;
                return fixItem;
              })
              .join(' | ')
          );
        }
        return escapeCharacter(fixedType);
      };

      const getDefaultValue = () => {
        if (tags?.defaultValue) {
          // @ts-ignore-next-line
          return tags.defaultValue[0]?.description;
        }

        if (defaultValue?.value === 'undefined') {
          return '-';
        }

        const regForArrayDefaultValue = /^\(\)\s*=>\s*(\[[^]*\]*\])$/;
        if (
          (fixedType.includes('[]') ||
            fixedType.includes('Array') ||
            fixedType.includes('array')) &&
          defaultValue?.func &&
          regForArrayDefaultValue.test(defaultValue.value)
        ) {
          return cleanStr(
            defaultValue.value.match(regForArrayDefaultValue)?.[1] || ''
          );
        }

        if (fixedType === 'boolean') {
          return cleanStr(defaultValue?.value || 'false');
        }

        return defaultValue?.value || '-';
      };

      let lineContent = `|${getName()}|${getDescription()}|\`${getType()}\`|\`${getDefaultValue()}\`|`;

      if (hasVersion) {
        // tag 的 ts 类型有问题，所以忽略 ts 规则检查
        // @ts-ignore-next-line
        const version = tags?.version?.[0]?.description;
        lineContent += `${version || ''}|`;
      }

      return lineContent;
    })
    .join('\n');
  return {
    hasVersion,
    content,
  };
};

export default (
  props: PropDescriptor[],
  options: { isInterface: boolean },
  lang = 'zh'
) => {
  const { content, hasVersion } = tmpl(props, options, lang);
  if (!content) return '';

  let header: [string, string] = ['', ''];
  if (lang === 'en') {
    header = options.isInterface
      ? ['|Name|Description|Type|Default|', '|---|---|---|:---:|']
      : ['|Attribute|Description|Type|Default|', '|---|---|---|:---:|'];
    if (hasVersion) {
      header[0] += 'version|';
      header[1] += ':---|';
    }
  } else {
    header = ['|参数名|描述|类型|默认值|', '|---|---|---|:---:|'];
    if (hasVersion) {
      header[0] += '版本|';
      header[1] += ':---|';
    }
  }

  return `
${header[0]}
${header[1]}
${content}
`;
};
