import * as bt from '@babel/types';
import { Documentation } from 'vue-docgen-api';
import getDoclets from 'vue-docgen-api/dist/utils/getDoclets';
import getProperties from 'vue-docgen-api/dist/script-handlers/utils/getProperties';
import getDocblock from 'vue-docgen-api/dist/utils/getDocblock';

export function slotTagHandler(documentation: Documentation, path: any) {
  if (bt.isObjectExpression(path.node)) {
    const setupPath = getProperties(path, 'setup');

    if (!setupPath.length) {
      return Promise.resolve();
    }

    let i = 0;
    let docBlock = getDocblock(setupPath[0], { commentIndex: i });
    while (docBlock) {
      // if no doc block return
      if (!docBlock || !docBlock.length) {
        return Promise.resolve();
      }

      const jsDoc = getDoclets(docBlock);
      if (jsDoc.tags) {
        const slotTag = jsDoc.tags.find((a: any) => a.title === 'slot');
        if (slotTag) {
          const name =
            // @ts-ignore
            typeof slotTag.content === 'string' ? slotTag.content : 'default';
          const slotDescriptor = documentation.getSlotDescriptor(name);
          slotDescriptor.description = jsDoc.description;
          const bindingsTag = jsDoc.tags.filter(
            (t: any) => t.title === 'binding'
          );
          if (bindingsTag) {
            slotDescriptor.bindings = bindingsTag;
          }
          const customTags = jsDoc.tags.filter(
            (t: any) => t.title !== 'binding' && t.title !== 'slot'
          );
          if (customTags.length) {
            const tags = customTags.reduce((pre, item) => {
              pre[item.title] = item;
              return pre;
            }, {} as any);
            slotDescriptor.tags = tags;
          }
        }
      }
      docBlock = getDocblock(setupPath[0], { commentIndex: ++i });
    }
  }
  return Promise.resolve();
}
