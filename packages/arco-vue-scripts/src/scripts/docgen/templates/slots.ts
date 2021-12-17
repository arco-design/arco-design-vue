import { SlotDescriptor } from 'vue-docgen-api';
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

const tmpl = (slots: SlotDescriptor[], lang: string) => {
  const displayableSlots = slots.filter(
    (slot) => slot.description || lang in (slot.tags ?? {})
  );
  const hasVersion = displayableSlots.some((slot) => slot?.tags?.version);
  const content = displayableSlots
    .map((slot) => {
      const { name, bindings, tags } = slot;
      let { description } = slot;
      if (tags?.[lang]) {
        description = (tags[lang] as any).content as string;
      }

      let lineContent = `|${toKebabCase(name)}|${escapeCharacter(
        description || ''
      )}|${escapeCharacter(bindingsTmpl(bindings)) || '-'}|`;

      if (hasVersion) {
        const version = (tags?.version as any)?.content as string;
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

export default (slots: SlotDescriptor[], lang: string) => {
  const { content, hasVersion } = tmpl(slots, lang);
  if (!content) return '';

  const header =
    lang === 'en'
      ? ['|Slot Name|Description|Parameters|', '|---|---|---|']
      : ['|插槽名|描述|参数|', '|---|:---:|---|'];

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
