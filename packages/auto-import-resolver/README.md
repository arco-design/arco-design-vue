# @sdata/web-vue-auto-import-resolver

`@sdata/web-vue-auto-import-resolver` 为 `@sdata/web-vue` 提供 `unplugin-vue-components` 自动导入解析能力。

解析器会在运行时读取已安装的 `@sdata/web-vue` 发布产物来识别组件导出和样式入口，因此新增组件后不需要再维护额外的组件映射文件。

当前解析器仅面向模板自动导入场景，不支持 SSR。

## 安装

```bash
pnpm add @sdata/web-vue
pnpm add -D @sdata/web-vue-auto-import-resolver unplugin-vue-components
```

## Vite

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { SdDesignResolver } from '@sdata/web-vue-auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        SdDesignResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
});
```

`sideEffect: true` 会自动注入组件样式入口，例如 `@sdata/web-vue/es/button/style/index.js`。

## 选项

```ts
interface SdDesignResolverOptions {
  prefix?: string;
  sideEffect?: boolean;
}
```

- `prefix`：组件前缀，默认是 `Sd`，对应模板里的 `<sd-button />`。
- `sideEffect`：是否自动导入组件样式。
