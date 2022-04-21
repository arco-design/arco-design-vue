import type { Plugin } from 'vite';
import { transformChangelog, transformDemo, transformMain } from './markdown';
import { getDescriptor } from './descriptor';
import {
  getFrontMatter,
  getVueId,
  isDemoMarkdown,
  isVirtualModule,
} from './utils';
import marked from './marked';

export default function vueMdPlugin(): Plugin {
  let vuePlugin: Plugin | undefined;

  return {
    name: 'vite:arco-vue-docs',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      // 获取vue插件，在hotUpload中使用
      vuePlugin = resolvedConfig.plugins.find((p) => p.name === 'vite:vue');
    },
    resolveId(id: string) {
      // 遇到虚拟md模块，直接返回id
      if (isVirtualModule(id)) {
        return id;
      }
      return null;
    },
    load(id) {
      // 遇到虚拟md模块，直接返回缓存的内容
      if (isVirtualModule(id)) {
        return getDescriptor(id);
      }
      return null;
    },
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) {
        return null;
      }
      if (!vuePlugin) {
        return this.error('Not found plugin [vite:vue]');
      }
      if (isVirtualModule(id)) {
        return vuePlugin.transform?.call(this, code, getVueId(id));
      }

      const tokens = marked.lexer(code);
      const frontMatter = getFrontMatter(tokens);

      if (frontMatter?.changelog) {
        return transformChangelog(tokens);
      }

      const vueCode = isDemoMarkdown(id)
        ? transformDemo(tokens, id, frontMatter)
        : transformMain(tokens, id, frontMatter);

      return vuePlugin.transform?.call(this, vueCode, getVueId(id));
    },

    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md') || !vuePlugin) {
        return undefined;
      }

      const { file, read, timestamp, server, modules } = ctx;
      const { moduleGraph } = server;

      const content = await read();

      const tokens = marked.lexer(content);
      const frontMatter = getFrontMatter(tokens);

      if (frontMatter?.changelog) {
        return modules;
      }

      const updated = [];

      const isDemo = isDemoMarkdown(file);

      const component = isDemo
        ? transformDemo(tokens, file, frontMatter)
        : transformMain(tokens, file, frontMatter);

      if (isDemo) {
        const virtualPath = `/@virtual${file}`;

        const mods = moduleGraph.getModulesByFile(virtualPath);
        if (mods) {
          const ret = await vuePlugin.handleHotUpdate?.({
            file: getVueId(virtualPath),
            timestamp,
            modules: [...mods],
            server,
            read: () => getDescriptor(virtualPath),
          });

          updated.push(...(ret || []));
        }
      }

      // reload the content component
      const ret = await vuePlugin.handleHotUpdate?.({
        file: getVueId(file),
        timestamp,
        modules,
        server,
        read: () => component,
      });

      return [...updated, ...(ret || [])];
    },
  };
}
