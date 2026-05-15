# @sd-design/sd-vue-docs

基于 Astro Starlight 的 SD Design 简体中文文档站。

## 目录架构

```text
packages/sd-vue-docs/
├── astro.config.mjs                 # Astro/Starlight 站点配置
├── public/
│   └── vendor/                      # 在线示例运行时依赖，构建前自动生成，不提交 Git
├── scripts/
│   ├── migrate-generated-demo-conventions.mjs
│   │                               # generated 示例自动转换脚本
│   └── sync-vendor.mjs              # 同步在线示例运行时依赖
├── src/
│   ├── browser-repl/                # Vue REPL 使用的浏览器模块桥接
│   ├── components/
│   │   ├── docs/                    # 文档专用组件，如 DemoBlock / DemoEditor
│   │   └── generated/               # 迁移脚本输出的示例 Vue 组件
│   ├── content/
│   │   └── docs/                    # 当前站点最终文档源，组件页和指南页直接在这里维护
│   ├── generated/                   # 迁移脚本输出的侧边栏和迁移清单
│   ├── pages/
│   │   └── _app.ts                  # Astro Vue app 入口，注册组件库插件
│   └── styles/                      # 站点全局样式
├── package.json
└── README.md
```

## 维护边界

- `src/content/docs/**/*.mdx` 是当前文档站的最终页面源文件，页面级调整优先直接修改这里。
- `src/components/generated/` 和 `src/generated/` 是文档站依赖的生成文件，通常不手工维护。
- `public/vendor/` 仅用于在线示例运行时依赖，由构建或开发命令自动补齐。

## 开发说明

### 首次准备

在仓库根目录执行：

```bash
pnpm install
```

### 日常开发

```bash
# 启动文档站开发环境
# 命令会先构建 web-vue 模块产物、补齐 public/vendor/ 运行时依赖，再启动 Astro dev server
pnpm --filter @sd-design/sd-vue-docs run dev

# 仅补齐在线示例运行时依赖，不重写 MDX 页面
pnpm --filter @sd-design/sd-vue-docs run docs:vendor
```

推荐流程：

1. 页面细调、排版、链接、额外说明直接改 `src/content/docs/**/*.mdx`。
2. 日常启动直接用 `dev`，命令只会补齐在线示例依赖，不会改写文档内容。
3. 组件库产物变化后，如在线示例资源缺失，可单独执行 `docs:vendor`，它会自动先准备 web-vue 模块产物。
4. 批量迁移 generated 示例时，执行 `pnpm --filter @sd-design/sd-vue-docs run migrate:generated-demos -- <target-dir> --write`。
5. 现在 generated 示例已经全部完成 `<script setup lang="ts">` 与非 `style` 标签内联样式迁移；仓库不再保留额外的 generated demo 校验脚本和 baseline 文件。

## 打包说明

```bash
# 生产构建
# 命令会先准备 web-vue 模块产物并补齐 public/vendor/，再执行 astro build
pnpm --filter @sd-design/sd-vue-docs run build

# 本地预览构建产物
pnpm --filter @sd-design/sd-vue-docs run preview
```

仓库根目录常用入口：

```bash
pnpm run dev:docs
pnpm run build:docs
```

Netlify 当前也已经切到 `packages/sd-vue-docs/dist` 作为发布目录。
