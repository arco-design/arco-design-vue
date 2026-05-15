## Why

packages/sd-vue-docs 中的 generated 组件示例目前同时混用无类型的 Options API script、局部 style 块和少量内联样式，导致文档示例源码风格不一致，也难以直接体现仓库当前推荐的 Vue 3 + TypeScript + Tailwind 用法。现在需要把这批示例统一到 script setup lang="ts" 和 Tailwind 原子类，以降低维护成本，并让交互式示例展示的源码与团队期望的写法保持一致。

## What Changes

- 将 packages/sd-vue-docs/src/components/generated 下的生成示例统一为 script setup lang="ts" 实现，不再保留普通 script/Options API 作为生成目标。
- 为 generated 示例建立 Tailwind 使用约束，使用 utility class 替代局部 style 块和纯展示性内联样式，生成结果不再包含 style 标签。
- 调整文档示例生成与展示链路，使交互式示例编辑器展示规范化后的 Vue 源码，同时保持原示例标题、说明和运行行为。
- 为 sd-vue-docs 补齐 generated 示例所需的 Tailwind 支持入口与校验方式，确保本地开发和站点构建都能解析这些 utility class。

## Capabilities

### New Capabilities

- `generated-demo-source-conventions`: 约束 generated 组件示例统一输出为 script setup lang="ts" 的 Vue SFC，并使用 Tailwind utility class 表达演示样式。

### Modified Capabilities

- `interactive-doc-examples`: 交互式示例需要展示经过规范化的 generated 源码，而不是简单保留迁移前的原始 script/style 结构。

## Impact

- Affected code: packages/sd-vue-docs/src/components/generated/\*_/_.vue、相关示例生成/迁移脚本、交互式示例源码加载链路。
- Affected systems: sd-vue-docs 本地开发、文档站构建、示例源码预览与编辑体验。
- Dependencies: sd-vue-docs 的 Tailwind 配置与样式入口需要覆盖 generated 示例使用场景。
