## Context

packages/sd-vue-docs/src/components/generated 下的 Vue SFC 同时承担两件事：一方面作为组件文档页里的实时预览组件被直接导入，另一方面又通过 ?raw 形式作为 DemoEditor 的初始源码展示给读者。当前这批文件混用了普通 script、Options API、本地 style 标签和内联样式，导致示例源码风格不统一，也让文档站展示的示例写法落后于仓库当前推荐的 Vue 3 + TypeScript 工作流。

sd-vue-docs 已经具备 Astro + Tailwind v4 基础设施，站点样式入口通过 src/styles/site.css 接入 Tailwind，并使用前缀模式；但 DemoEditor 的 Vue REPL 预览目前只注入 @sdata/web-vue 的样式和少量内联基础样式，没有加载 Tailwind utility stylesheet。这意味着如果 generated 示例直接改写为 Tailwind class，文档页预览与编辑器预览会出现样式能力不一致的问题。

本次变更横跨 generated 示例文件、示例校验方式、以及文档预览/编辑器运行环境，属于跨模块但边界清晰的文档示例规范升级。

## Goals / Non-Goals

**Goals:**

- 让 packages/sd-vue-docs/src/components/generated/\*_/_.vue 统一输出为 script setup lang="ts" 的 Vue SFC。
- 用 Tailwind utility class 取代 generated 示例中的 style 标签和纯展示性内联样式，并约束生成结果不再包含局部 style 块。
- 保持文档页实时预览和 DemoEditor 中的 REPL 预览都能正确渲染这些 Tailwind 化后的示例。
- 建立可重复执行的校验机制，防止后续新增或迁移的 generated 示例重新引入普通 script 或 style 标签。

**Non-Goals:**

- 不在本次变更中调整组件 API、示例文案或组件文档的 MDX 结构。
- 不重做 DemoBlock、DemoEditor 的整体视觉设计，只处理与示例源码规范和运行支持直接相关的部分。
- 不要求把 packages/sd-vue-docs/src/components/docs 或非 generated 的站点组件全部改写为 Tailwind。

## Decisions

1. 以 generated Vue 文件为单一事实来源，原位完成源码规范化

- Decision:
  - 直接迁移 packages/sd-vue-docs/src/components/generated 下的 .vue 文件，而不是增加第二份“编辑器专用”或“预览专用”源码副本。
  - 文档页组件导入和 ?raw 源码导入继续指向同一个文件路径。
- Rationale:
  - 当前组件文档页已经同时依赖运行时导入和 ?raw 字符串导入；保留单一路径可以让预览结果和编辑器初始源码天然一致。
  - 减少双份源码同步和额外生成步骤，变更面更小。
- Alternatives considered:
  - 新增 editor-only 源码镜像：可以减少运行时代码迁移压力，但会引入重复文件和一致性风险。
  - 在导入阶段动态转换源码：会让调试链路更隐式，也不利于直接查看最终示例文件。

2. 统一采用 script setup lang="ts"，并以最小语义映射替换 Options API

- Decision:
  - generated 示例统一使用 script setup lang="ts"。
  - 原有 data、computed、methods、watch 等 Options API 写法按最小可读转换迁移为 ref、reactive、computed、watch 和普通函数；没有脚本逻辑的示例保持 template-only SFC，不强行添加空 script。
- Rationale:
  - script setup lang="ts" 与仓库当前 Vue 3 习惯一致，可让示例源码直接成为推荐写法。
  - 保留 template-only SFC 可以避免为了“形式统一”引入无意义样板代码。
- Alternatives considered:
  - 要求所有文件都带空 script setup：形式统一，但增加噪音，没有收益。
  - 保留少量 Options API 示例：迁移成本更低，但无法达成一致源码规范。

3. Tailwind 采用文档站现有 v4 基础设施，并为 demo 预览补充共享样式入口

- Decision:
  - generated 示例中的展示性样式统一改为 Tailwind utility class，遵循 sd-vue-docs 当前的 Tailwind 前缀约定。
  - 为文档站页面预览与 DemoEditor REPL 预览提供一份共享的 demo Tailwind stylesheet，使两条预览链路消费同一套 utility 输出。
  - DemoEditor 继续注入 sd.css，同时额外加载 demo Tailwind stylesheet，避免编辑器预览丢失 utility class 效果。
- Rationale:
  - 文档站已经启用了 Tailwind v4，不需要重复引入第二套 CSS 方案。
  - 共享 stylesheet 能避免“页面预览正常、REPL 预览失效”的双环境分叉。
- Alternatives considered:
  - 仅依赖文档页全局 Tailwind：无法覆盖 REPL iframe 预览。
  - 在每个示例中保留 style 标签兜底：违背此次统一迁移目标。

4. 约束“移除 style 标签”，但允许保留与组件 API 直接相关的动态样式输入

- Decision:
  - generated 示例不再使用 SFC style 标签表达布局、间距、边框、尺寸、颜色等展示样式。
  - 对必须通过组件 prop、slot prop 或运行时计算传入的 style 对象，允许保留组件 API 层面的动态样式写法，但不再通过 SFC style 块承载演示样式。
- Rationale:
  - 用户需求是把 style 改成 Tailwind；这个目标针对的是示例展示层，而不是否定组件 API 本身接受 style 对象的能力。
  - 保留 API 驱动的动态 style，可以避免为了迁移而扭曲真实组件用法。
- Alternatives considered:
  - 禁止任何 style 属性：会误伤组件 API 演示场景，且难以覆盖所有动态定位类示例。

5. 用自动校验保障新规范，而不是依赖人工巡检

- Decision:
  - 为 generated 示例新增约束校验，至少覆盖以下规则：禁止普通 script、禁止 style 标签、禁止未约定的本地样式块；对 Tailwind 前缀、script setup lang="ts" 和高风险内联 style 做静态检查。
  - 将校验纳入 sd-vue-docs 的开发或构建前验证路径，保证后续新增示例不会回退到旧写法。
- Rationale:
  - generated 示例数量大，仅靠一次性迁移无法保证长期一致性。
  - 静态校验比人工 review 更便宜，也更适合作为生成产物的门禁。
- Alternatives considered:
  - 仅在迁移完成后人工 spot-check：短期可行，但很难防止后续回归。

## Risks / Trade-offs

- [Tailwind 前缀约定与示例类名不匹配，导致页面预览无样式] → 明确示例类名规范与共享 stylesheet 的产出方式，并在迁移后做至少一次全站构建验证。
- [DemoEditor REPL 未加载 Tailwind stylesheet，导致编辑器预览与页面预览不一致] → 在 DemoEditor 预览 headHTML 中显式注入共享 demo Tailwind stylesheet，并增加一类带明显 utility 样式的冒烟示例。
- [部分复杂示例原本依赖 scoped CSS 选择器，直接改为 utilities 后结构可读性变差] → 优先通过额外包装节点、状态类和 Tailwind arbitrary values 表达；对极少数无法直接表达的场景单独列为迁移例外并在任务中审查。
- [批量改写 Options API 到 script setup 时引入行为回归] → 先建立静态规则和小批量样例，再执行全量迁移，并用文档站构建和聚焦示例抽查验证行为。

## Migration Plan

1. 盘点 generated 示例中的普通 script、style 标签和高频样式模式，确定可批量替换的迁移规则。
2. 为 sd-vue-docs 补齐 shared demo Tailwind stylesheet 及 DemoEditor 预览注入点，确保页面预览与 REPL 预览样式能力一致。
3. 分批迁移 generated 示例到 script setup lang="ts" 和 Tailwind utility class，优先处理含脚本和 style 块的高风险文件。
4. 为 generated 示例增加静态校验，并接入文档包的验证命令。
5. 运行文档站构建与聚焦预览验证，确认源码展示、实时预览和站点构建全部通过。

Rollback strategy:

- 迁移期间保留单文件粒度回退能力，必要时可先回退共享 Tailwind 注入改动，再逐步恢复个别示例文件。
- 若 REPL 预览对 Tailwind 支持短期内无法稳定，可先让页面预览和源码迁移落地，同时将 REPL 样式支持作为紧随其后的修复项，但不把未样式化的 REPL 预览视为最终完成状态。

## Open Questions

- shared demo Tailwind stylesheet 应该直接复用现有 src/styles/site.css 的子集，还是生成一份更轻量、仅服务 demo 的独立入口，以降低 REPL 预览负担？
- 是否需要把 generated 示例迁移做成一次性脚本，以便后续重新同步上游 demo 资源时复用，而不是只做手工改写？
- 对极少数必须依赖复杂选择器的示例，仓库是否接受“保留受控例外”策略，还是要求 100% 无 style 属性/无自定义 CSS？
