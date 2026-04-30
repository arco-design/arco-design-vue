## 1. Theme Infrastructure & Contracts

- [x] 1.1 设计并实现 ConfigProvider 统一 `theme` 对象协议（tokens/components/meta）与类型定义。
- [x] 1.2 实现 `theme` 对象归一化流程（默认值、校验、兼容字段转换）。
- [x] 1.3 建立运行时 token 分发机制，将归一化结果注入 CSS variables。
- [x] 1.4 实现主题动态更新链路（ConfigProvider 值变化 -> CSS variables 更新 -> 组件即时生效）。
- [x] 1.5 为主题协议补充单元测试（对象归一化、动态更新、组件级覆盖）。

## 2. Scss Migration Foundation

- [x] 2.1 在 `packages/web-vue` 引入 Scss 编译依赖与构建配置（含按需样式产物链路）。
- [x] 2.2 建立 Scss token/mixin/function 基础层，统一消费 CSS variables。
- [x] 2.3 建立 Less 旧变量到新 token 的兼容映射层与迁移标记。
- [x] 2.4 迁移全局样式入口与核心基础样式（reset/base/common）到 Scss。
- [x] 2.5 更新样式生成脚本（替换 Less 生成逻辑，保留过渡期兼容）。

## 3. Component Style Migration

- [x] 3.1 制定组件迁移批次（基础组件 -> 数据录入组件 -> 复杂组件）与验收清单。
- [x] 3.2 按批次将组件样式从 Less 迁移到 Scss，确保样式 API 不变。
- [ ] 3.3 将组件主题相关样式替换为 CSS variable 消费并补充 fallback 值。
- [x] 3.4 验证组件级 token override 优先级（global -> component）。
- [x] 3.5 对每批迁移执行视觉回归和快照校验并修复问题。

## 4. Documentation Theme Editor

- [x] 4.1 在 `packages/sd-vue-docs` 新增主题编辑器路由与页面骨架。
- [x] 4.2 实现编辑器参数面板（颜色、圆角、字号、间距等）与节流更新策略。
- [x] 4.3 构建实时预览容器，使用 ConfigProvider `theme` 对象驱动示例组件。
- [x] 4.4 实现主题 JSON 下载（含 schemaVersion）与上传解析流程。
- [x] 4.5 增加 JSON schema 兼容性校验与错误提示（不兼容版本、缺失字段）。

## 5. Homepage Theme Showcase

- [x] 5.1 在首页新增主题切换展示模块并接入预设主题集合。
- [x] 5.2 提供至少默认/暗色/紧凑/品牌色/赛博朋克风等示例主题预览。
- [x] 5.3 复用编辑器与组件库统一主题协议，确保预设对象可直接传给 ConfigProvider。
- [ ] 5.4 为首页主题切换交互补充文档示例。

## 6. Validation, Migration Docs, and Cleanup

- [x] 6.1 执行组件库与文档站全量构建与测试，修复迁移引入的问题。
- [x] 6.2 编写迁移文档（Less -> Scss、主题对象用法、CSS variables 约定）。
- [x] 6.3 标记并清理废弃 Less 变量链路与临时兼容代码。
- [x] 6.4 在“开始使用”的下面新增一个<迁移文档>分类，把“Naive UI 迁移”放到这个分类下面，同时输出本次样式修改的手册（迁移步骤与风险说明）。
