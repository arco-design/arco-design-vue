import { EventDescriptor, Tag } from 'vue-docgen-api';
import { escapeCharacter, toKebabCase } from '../utils';

const propertiesTmpl = (properties: EventDescriptor['properties']): string => {
  return (properties || [])
    .map((property) => {
      const { type, name, description } = property;
      const res = [];
      name && res.push(name);
      if (type.names.length) {
        res.length && res.push(': ');
        res.push(`\`${type.names.join(' | ')}\``);
      }
      description && res.push(description);
      return res.join('');
    })
    .join('\n');
};

const tmpl = (events: EventDescriptor[], lang: string): string => {
  return events
    .filter((event) => event.description || event.tags?.length)
    .map((event) => {
      const { name, tags } = event;
      let { description } = event;
      if (tags?.length) {
        for (const item of tags) {
          if (item.title === lang) {
            description = (item as Tag).content as string;
          }
        }
      }

      return `|${toKebabCase(name)}|${escapeCharacter(description || '')}|${
        escapeCharacter(propertiesTmpl(event.properties)) || '-'
      }|`;
    })
    .join('\n');
};

export default (events: EventDescriptor[], lang: string) => {
  const content = tmpl(events, lang);
  if (!content) return '';

  if (lang === 'en') {
    return `
|Event Name|Description|Parameters|
|---|---|---|
${content}
`;
  }

  return `
|事件名|描述|参数|
|---|---|---|
${content}
`;
};
