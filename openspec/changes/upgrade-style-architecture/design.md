## Context

`@sdata/web-vue` 当前样式以 Less 为核心，主题能力依赖构建期变量替换，导致以下问题：

- 主题切换难以在运行时即时生效，文档演示能力受限。
- token 与组件样式映射分散，缺少统一主题对象协议。
- 文档站缺少可编辑、可导入导出主题的完整体验。

本次改造跨越组件库（`packages/web-vue`）与文档站（`packages/sd-vue-docs`），属于跨模块架构升级，且涉及样式基础设施迁移、配置协议演进和可视化编辑器落地。

## Goals / Non-Goals

**Goals:**

- 以 Scss 替代 Less 作为样式源码载体，并保持现有组件对外 API 稳定。
- 提供 ConfigProvider 主题对象注入能力，支持运行时动态更新，无需重新编译样式。
- 建立以 CSS variables 为主的 token 分发机制，覆盖高频主题维度（颜色、圆角、阴影、字号、间距等）。
- 在文档站新增主题编辑器页面，支持实时预览、在线调整、主题 JSON 上传与下载。
- 在文档首页新增主题切换展示模块，提供多个预置主题的效果对比与快速预览。

**Non-Goals:**

- 不在本次改造中重构所有组件的结构或交互逻辑。
- 不引入与主题无关的大规模视觉改版。
- 不承诺一次性覆盖所有历史 Less 私有变量，仅保证公共 token 通路和核心组件可用。

## Decisions

1. 主题协议采用“单一对象 + 扁平 token map + 可选组件级覆盖”结构

- Decision:
  - 在 ConfigProvider 中新增统一 `theme` 配置对象（例如 `theme.tokens`, `theme.components`, `theme.meta`）。
  - 运行时将配置对象归一化后写入根节点 CSS variables，并触发订阅更新。
- Rationale:
  - 与 Ant Design 使用体验一致，调用侧只需传入一个对象即可。
  - 有利于 JSON 序列化、上传下载、版本迁移和编辑器联动。
- Alternatives considered:
  - 继续使用 Less 变量与构建时替换：无法满足运行时动态调整。
  - 将 token 拆成多个 provider：使用成本高，难以序列化与共享。

2. 样式迁移采用“增量替换 + 兼容层”策略

- Decision:
  - 先建立 token 到 CSS variable 的基础层与 Scss 工具层（mixins/functions），再按组件域分批从 Less 迁移到 Scss。
  - 保留临时兼容映射（旧变量名 -> 新 token），并在迁移窗口内支持双读。
- Rationale:
  - 降低一次性迁移风险，减少视觉回归面。
- Alternatives considered:
  - 全量一次性迁移：风险高、回归成本不可控。

3. CSS variables 作为主题主通道，Scss 负责静态组织

- Decision:
  - 组件最终样式优先消费 `var(--sd-*)`，Scss 仅用于结构化样式与默认值编排。
  - 关键 token 提供回退值（`var(--sd-color-primary, #1677ff)`）。
- Rationale:
  - 实现运行时主题更新，同时保证未注入主题时仍可工作。
- Alternatives considered:
  - 仅 Scss 变量：无法运行时更新。
  - 仅内联 style：难以维护且不利于按需样式输出。

4. 文档主题编辑器采用“编辑器态 + 预览态 + 序列化态”三层模型

- Decision:
  - 编辑器态：表单参数（颜色、圆角、字号尺度等）。
  - 预览态：将编辑结果映射为 ConfigProvider `theme` 对象并实时渲染示例组件。
  - 序列化态：导出/导入版本化 JSON（包含 schemaVersion、tokens、components、name）。
- Rationale:
  - 解耦 UI 控件与运行时协议，便于后续扩展更多 token 或主题算法。
- Alternatives considered:
  - 直接导出页面状态：结构不稳定，难做兼容迁移。

5. 首页主题模块复用编辑器协议并提供预设主题集

- Decision:
  - 在首页提供主题切换模块，复用同一 theme 协议，附带多个示例主题（默认、深色、紧凑、品牌色）。
- Rationale:
  - 降低维护成本，确保首页演示与编辑器能力一致。

## Risks / Trade-offs

- [大规模样式迁移带来视觉回归] → 建立组件回归清单，优先迁移基础组件并在每批迁移后执行快照与文档预览回归。
- [CSS variable 优先级与历史样式冲突] → 约定变量注入层级（root -> provider scope -> component override）并统一命名前缀。
- [主题 JSON 向后兼容压力] → 引入 `schemaVersion` 与迁移函数（旧版本自动补齐缺省字段）。
- [运行时频繁更新造成性能抖动] → 对编辑器输入做节流与批量提交，避免每次输入都触发全量重算。
- [Less/Scss 双轨阶段维护成本上升] → 明确迁移里程碑与淘汰时间，按组件域收口兼容层。

## Migration Plan

1. 基础设施阶段

- 引入 Scss 构建依赖与脚本，建立 token -> CSS variable 的基础层。
- 扩展 ConfigProvider 主题对象协议并打通运行时变量注入。

2. 组件迁移阶段

- 按组件域分批迁移 Less 到 Scss。
- 每批提供旧变量映射兼容，补充回归样例。

3. 文档能力阶段

- 新增主题编辑器页面（预览、在线编辑、JSON 上传下载）。
- 首页加入主题切换演示模块并接入预置主题。

4. 收尾阶段

- 清理未使用的 Less 变量链路和兼容映射。
- 更新文档与迁移指南，标记旧用法废弃时间线。

Rollback strategy:

- 在过渡期保留旧主题入口与关键 Less 兼容映射。
- 若出现严重回归，可切回旧默认主题链路，同时保留新协议代码分支以便快速修复后再启用。

## Open Questions

- ConfigProvider 主题对象是否需要支持算法型 token（如色阶自动推导）以及算法扩展接口？
- 主题 JSON 的组件级覆盖粒度是否首期就开放，还是先只开放全局 tokens？
- 文档编辑器是否需要“分享链接”能力（JSON 压缩到 URL）作为后续增量？
