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

const tmpl = (events: EventDescriptor[], lang: string) => {
  const displayableEvents = events.filter(
    (event) => event.description || event.tags?.length
  );
  const hasVersion = displayableEvents.some((event) =>
    event?.tags?.some((tag) => tag.title === 'version')
  );
  const content = displayableEvents
    .map((event) => {
      const { name, tags } = event;
      let { description } = event;
      let version = '';
      if (tags?.length) {
        for (const item of tags) {
          if (item.title === 'version') {
            version = (item as Tag).content as string;
            continue;
          }
          if (item.title === lang) {
            description = (item as Tag).content as string;
          }
        }
      }

      let lineContent = `|${toKebabCase(name)}|${escapeCharacter(
        description || ''
      )}|${escapeCharacter(propertiesTmpl(event.properties)) || '-'}|`;

      if (hasVersion) {
        lineContent += `${version}|`;
      }

      return lineContent;
    })
    .join('\n');
  return {
    content,
    hasVersion,
  };
};

export default (events: EventDescriptor[], lang: string) => {
  const { content, hasVersion } = tmpl(events, lang);
  if (!content) return '';

  const header =
    lang === 'en'
      ? ['|Event Name|Description|Parameters|', '|---|---|---|']
      : ['|事件名|描述|参数|', '|---|---|---|'];

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
