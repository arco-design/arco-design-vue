## Why

当前 `@sdata/web-vue` 主题体系依赖 Less 变量替换，导致运行时动态切换能力弱、主题编辑体验割裂、文档演示与实际接入路径不一致。随着组件库和文档站点演进，需要建立与现代设计系统一致的运行时主题能力：以配置对象驱动、CSS 变量承载、可视化编辑与实时预览闭环。

## What Changes

- 将 `packages/web-vue` 的样式架构从 Less 迁移到 Scss，保留现有组件 API，并提供迁移兼容层。
- 新增 ConfigProvider 主题对象协议，支持通过单一 theme config 对象注入并在运行时动态更新，不再依赖 Less 变量编译替换。
- 在组件样式层尽可能以 CSS variables 承载设计 token（颜色、圆角、间距、阴影、字号等），并建立 token 回退策略。
- 在 `packages/sd-vue-docs` 新增主题编辑器页面：实时预览、在线调参、JSON 主题上传/下载。
- 在文档首页新增与 Ant Design 类似的主题切换演示模块，提供多个示例主题与切换预览。

## Capabilities

### New Capabilities

- `runtime-theme-config-provider`: 定义并实现通过 ConfigProvider 注入主题对象、运行时生效与动态更新的能力。
- `scss-style-architecture`: 将组件库样式体系迁移到 Scss，并提供从旧 Less 体系到新体系的迁移规则与兼容策略。
- `css-variable-token-system`: 建立 CSS variables token 映射与回退机制，支撑组件运行时主题化。
- `docs-theme-editor`: 在文档站提供主题编辑器，支持实时预览、参数编辑与主题 JSON 导入导出。
- `homepage-theme-showcase`: 在文档首页提供示例主题切换与预览模块，展示主题能力与效果。

### Modified Capabilities

- （无）

## Impact

- Affected packages:
  - `packages/web-vue`: ConfigProvider、全局样式入口、组件样式文件、构建脚本（Less -> Scss）、token 映射。
  - `packages/sd-vue-docs`: 路由与页面结构、首页模块、主题编辑器状态管理与预览容器。
- Tooling/build:
  - 更新样式构建链路以支持 Scss 产物与按需样式输出。
  - 评估并补充样式相关依赖（例如 `sass`）与构建任务。
- API/contracts:
  - 新增/扩展 ConfigProvider 的 `theme` 配置协议（对象结构、默认值、动态更新行为）。
  - 主题 JSON 结构需要版本字段与基础校验规则，确保上传兼容性。
- Risks:
  - 大规模样式迁移可能引入视觉回归，需要回归清单和示例主题快照校验。
  - CSS 变量与旧样式覆盖顺序可能冲突，需要明确优先级策略。
