import type { Plugin } from 'vite';

export default function externalPlugin(): Plugin {
  return {
    name: 'vite:external-node_modules',
    enforce: 'pre',
    async resolveId(source: string, importer) {
      const result = await this.resolve(source, importer, {
        skipSelf: true,
        custom: { 'node-resolve': {} },
      });

      if (result && /node_modules/.test(result.id)) {
        return false;
      }

      return null;
    },
  };
}
