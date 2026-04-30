## Why

当前局部主题链路在运行时和文档示例中存在一致性问题：`scss` 入口、`ConfigProvider` 的局部主题容器行为、首页预设切换与主题编辑器的输出协议没有形成稳定闭环，导致同一份 theme 数据在不同场景下表现不一致。该问题已经影响迁移验证和文档可信度，需要尽快按成熟实现模式统一修复。

## What Changes

- 对局部主题实现进行端到端修复：从样式入口到运行时 ThemeProvider 挂载行为，确保局部主题不依赖全局 `body` 才能生效。
- 统一 `ConfigProvider` 的 `theme` 与 `theme-mode` 在子树中的语义，明确局部主题容器创建、继承与销毁规则。
- 修正文档站中与局部主题相关的示例链路：`ConfigProvider` 局部主题示例、首页主题切换预览、主题交互编辑器。
- 在方案与行为定义上对齐并借鉴 `vuetify` 与 `naive-ui` 的主题提供器与配置提供器实践，避免拍脑袋式实现。
- 补齐验证与回归覆盖，确保局部主题与全局主题并存时行为可预期。

## Capabilities

### New Capabilities

- `local-theme-provider-runtime`: 定义局部主题容器在组件子树中的挂载、变量注入、继承与隔离行为，并约束与 `ConfigProvider` 的协作关系。
- `theme-docs-runtime-consistency`: 定义文档站中局部主题相关示例与编辑器的数据协议和运行时一致性要求，确保示例行为可复现。

### Modified Capabilities

- None.

## Impact

- Affected code:
  - `packages/web-vue/components/config-provider/**`
  - `packages/web-vue/components/theme-provider/**` (若存在)
  - `packages/web-vue/components/style/**` 与相关 `scss` 入口
  - `packages/sd-vue-docs/src/components/home/HomeThemePreview.vue`
  - `packages/sd-vue-docs/src/content/docs/components/config-provider/index.mdx`
  - `packages/sd-vue-docs/src/content/docs/guides/theme-editor.mdx`
  - `packages/sd-vue-docs/src/components/theme/**`
- 可能新增或调整主题运行时测试与文档示例测试。
- 不引入对外 API 的破坏性变更，主要是修复和强化既有能力语义。
