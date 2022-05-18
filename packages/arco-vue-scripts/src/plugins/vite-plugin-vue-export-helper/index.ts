import type { Plugin } from 'vite';

const EXPORT_HELPER_ID = 'plugin-vue:export-helper';
const helperCode = `
export default (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val
  }
  return sfc
}
`;

export default function virtualPlugin(): Plugin {
  return {
    name: 'vite:vue-export-helper',
    enforce: 'pre',
    resolveId(source: string) {
      if (source === EXPORT_HELPER_ID) {
        return `${EXPORT_HELPER_ID}.js`;
      }
      return null;
    },
    load(source) {
      if (source === `${EXPORT_HELPER_ID}.js`) {
        return helperCode;
      }
      return null;
    },
  };
}
