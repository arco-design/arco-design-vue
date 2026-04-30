## Context

当前 `web-vue` 的局部主题能力存在三类耦合问题：

- 样式层：`scss` 入口与局部主题变量挂载链路不稳定，局部区域在某些构建产物下会回退到全局变量或直接丢失组件变量。
- 运行时层：`ConfigProvider` 对 `theme` 与 `theme-mode` 的处理没有形成稳定的“子树容器优先”机制，导致局部主题与全局主题并存时边界不清晰。
- 文档层：`ConfigProvider` 示例、首页主题切换预览、主题编辑器对 theme 协议的消费路径不一致，演示结果与真实运行时偏差较大。

本次变更需要跨越 `packages/web-vue` 与 `packages/sd-vue-docs`，并参考 `vuetify` 的 `VThemeProvider` 与 `naive-ui` 的 `ConfigProvider` 主题继承方式，统一为可预测、可测试的局部主题机制。

## Goals / Non-Goals

**Goals:**

- 让 `ConfigProvider` 在设置 `theme-mode` 或局部 `theme` 时，稳定创建并维护局部主题容器，变量注入范围限定在当前子树。
- 定义局部主题与上层主题的继承规则：未覆盖 token 继承父级，已覆盖 token 只在子树生效。
- 统一文档站三个入口（组件示例、首页预览、主题编辑器）的协议与渲染行为，保证同一 theme 对象表现一致。
- 为局部主题能力补齐关键回归测试，覆盖嵌套 provider、模式切换、示例联动。

**Non-Goals:**

- 不重写整套主题 token 体系，不引入新的 token 命名规范。
- 不新增与局部主题无关的组件 API。
- 不在本次变更中处理所有历史样式产物问题，仅修复影响局部主题行为的入口和注入链路。

## Decisions

1. 采用“子树主题容器”作为局部主题唯一载体

- Decision: 当 `ConfigProvider` 接收到局部 `theme` 或 `theme-mode` 时，创建真实的局部主题容器节点，组件变量从该容器解析，而不是依赖 `body` 或全局根节点。
- Rationale: 这与 `vuetify` `VThemeProvider` 的作用域思路一致，可明确主题边界，避免全局污染。
- Alternatives considered:
  - 仅在 `body` 动态切换 class：实现简单，但无法支持同页多主题并存。
  - 通过 CSS 选择器叠加覆盖：维护成本高，且嵌套场景易失效。

2. 明确继承算法：父级快照 + 子级增量覆盖

- Decision: 局部 provider 以父级解析结果为基底，应用本地 token/component overrides 后生成子级变量快照；子级销毁时不影响父级状态。
- Rationale: 与 `naive-ui` `ConfigProvider` 的继承式主题配置思想一致，行为可预测，便于嵌套测试。
- Alternatives considered:
  - 完全独立计算不继承父级：会导致配置重复和示例行为割裂。
  - 每次渲染全量回算全局主题：性能与调试复杂度更高。

3. 文档站统一使用同一运行时协议对象

- Decision: `HomeThemePreview`、`theme-editor`、`config-provider` 文档示例都消费同构 theme payload（含 mode + theme），并通过 `sd-config-provider` 落地。
- Rationale: 示例与真实运行时一致，减少“Demo 能用、业务不能用”的偏差。
- Alternatives considered:
  - 各页面自行转换 theme 数据：短期快，但长期会出现协议漂移。

4. 测试优先覆盖行为边界而非实现细节

- Decision: 增加/调整测试以断言可观察行为：变量作用域、嵌套继承、切换稳定性、文档示例关键路径。
- Rationale: 运行时样式实现可能调整，但外部行为应稳定。

## Risks / Trade-offs

- [Risk] 局部容器挂载策略变更可能影响现有样式优先级 → Mitigation: 增加同页多 provider 场景测试，检查高频组件（Button、Tag、Tabs）在局部/全局并存下的样式回归。

- [Risk] 文档示例协议统一后，历史 JSON 可能出现字段不兼容 → Mitigation: 在主题编辑器中保留 schemaVersion 校验与兼容提示，并提供默认回退。

- [Risk] 继承快照机制引入额外计算开销 → Mitigation: 仅在 `theme` 或 `theme-mode` 变更时重算，普通渲染复用缓存结果。

## Migration Plan

1. 先在 `web-vue` 修复局部主题容器与继承逻辑，并通过单测验证。
2. 修复/确认局部主题相关 `scss` 入口链路，保证构建后变量注入生效。
3. 对齐文档站三个入口的 theme 协议与示例实现。
4. 增加文档与 FAQ，明确 `ConfigProvider` 与 `ThemeProvider` 的使用边界。
5. 运行文档构建与相关测试作为发布前门禁。

Rollback strategy:

- 保留现有 API 形态不变；若回归严重，可临时关闭局部主题容器新路径，回退到旧逻辑并保留文档修复。

## Open Questions

- `ThemeProvider` 组件与 `ConfigProvider(theme-mode)` 的职责是否需要进一步在 API 文档中强约束（例如推荐优先级）？
- 是否需要在后续变更中引入专门的“主题作用域调试标记”以便排查复杂嵌套页面？
