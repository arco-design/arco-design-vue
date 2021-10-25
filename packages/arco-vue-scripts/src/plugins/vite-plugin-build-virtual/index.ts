import type { Plugin } from 'vite';
import path from 'path';

export default function virtualPlugin(): Plugin {
  return {
    name: 'vite:build-virtual',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const item of Object.values(bundle)) {
        if (/_virtual/.test(item.fileName)) {
          const ext = path.extname(item.fileName);
          if (!ext) {
            item.fileName += '.js';
          }
        }
      }
    },
  };
}
