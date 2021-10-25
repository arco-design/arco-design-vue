import { ParamTag, SlotDescriptor } from 'vue-docgen-api';
import { escapeCharacter, toKebabCase } from '../utils';

const bindingsTmpl = (bindings: SlotDescriptor['bindings']): string => {
  return (bindings || [])
    .map((binding) => {
      const { type, name, description } = binding;
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

const tmpl = (slots: SlotDescriptor[], lang: string): string => {
  return slots
    .filter((slot) => slot.description || lang in (slot.tags ?? {}))
    .map((slot) => {
      const { name, bindings, tags } = slot;
      let { description } = slot;
      if (tags?.[lang]) {
        description = (tags[lang] as any).content as string;
      }

      return `|${toKebabCase(name)}|${escapeCharacter(description || '')}|${
        escapeCharacter(bindingsTmpl(bindings)) || '-'
      }|`;
    })
    .join('\n');
};

export default (slots: SlotDescriptor[], lang: string) => {
  const content = tmpl(slots, lang);
  if (!content) return '';

  if (lang === 'en') {
    return `
|Slot Name|Description|Parameters|
|---|---|---|
${content}
`;
  }

  return `
|插槽名|描述|参数|
|---|:---:|---|
${content}
`;
};
