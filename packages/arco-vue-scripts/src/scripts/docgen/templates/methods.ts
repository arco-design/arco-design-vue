import { MethodDescriptor, ParamTag, ParamType } from 'vue-docgen-api';
import { escapeCharacter } from '../utils';

const paramsTmpl = (params: MethodDescriptor['params']): string => {
  return (params || [])
    .filter((param) => param.type)
    .map((param): string => {
      const { name, type, description } = param;
      const res = [];
      name && res.push(name);
      if (type?.name) {
        res.length && res.push(': ');
        res.push(`\`${type.name}\``);
      }
      description && res.push(description);
      return res.join('');
    })
    .join('\n');
};

const returnsTmpl = (returns: MethodDescriptor['returns']): string => {
  if (!returns) return '';

  const { type, description } = returns;

  if (!type) return '';

  const getNames = (type: ParamType): string => {
    const { name, elements } = type;
    if (!elements || !elements.length) return name || '';

    const names: string[] = [];
    elements.forEach((element) => {
      names.push(getNames(element));
    });

    return `${name}\\<${names.join(',')}\\>`;
  };

  const res = [
    type.name ? `${getNames(type)}` : '',
    description ? ` - ${description}` : '',
  ];
  return res.join('');
};

const tmpl = (methods: MethodDescriptor[], lang: string) => {
  const displayableMethods = methods.filter(
    (method) => method.description || lang in (method.tags ?? {})
  );
  const hasVersion = displayableMethods.some((method) => method?.tags?.version);
  const content = displayableMethods
    .map((method) => {
      const { name, tags } = method;
      let { description } = method;
      if (tags?.[lang]?.length) {
        description = (tags[lang][0] as ParamTag).description as string;
      }

      const readableParams = paramsTmpl(method.params) || '-';
      const readableReturns = returnsTmpl(method.returns) || '-';
      let lineContent = `|${name}|${escapeCharacter(
        description || ''
      )}|${escapeCharacter(readableParams)}|${escapeCharacter(
        readableReturns
      )}|`;

      if (hasVersion) {
        const version = (tags?.version?.[0] as ParamTag)?.description as string;
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

export default (methods: MethodDescriptor[], lang: string) => {
  const { content, hasVersion } = tmpl(methods, lang);
  if (!content) return '';

  const header =
    lang === 'en'
      ? ['|Method|Description|Parameters|Return|', '|---|---|---|:---:|']
      : ['|方法名|描述|参数|返回值|', '|---|---|---|---|'];

  if (hasVersion) {
    header[0] += lang === 'en' ? 'version|' : '版本|';
    header[1] += ':---|';
  }

  return `
${header[0]}
${header[1]}
${content}
`;
};
