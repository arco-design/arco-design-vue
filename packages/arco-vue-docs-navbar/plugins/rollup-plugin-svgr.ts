import fs from 'fs';
import type { Plugin } from 'vite';
import svgr from '@svgr/core';
import esbuild from 'esbuild';

export default function svgrPlugin(): Plugin {
  // TODO: options
  return {
    name: 'vite:svgr',
    // eslint-disable-next-line consistent-return
    async transform(code, id) {
      if (id.endsWith('.svg')) {
        const svg = await fs.promises.readFile(id, 'utf8');

        const componentCode = await svgr(svg, {}, {}).then((res: string) => {
          return res;
        });

        const res = await esbuild.transform(componentCode, {
          loader: 'jsx',
        });

        return {
          code: res.code,
        };
      }
    },
  };
}
