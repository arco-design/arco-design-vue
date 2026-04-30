## 1. 对齐实现基线

- [x] 1.1 审阅 `vendor/vuetify` 的 `VThemeProvider` 与 `vendor/naive-ui` 的 `ConfigProvider` 主题继承实现，整理本仓库可复用的作用域与继承规则
- [x] 1.2 盘点 `packages/web-vue` 当前局部主题链路（`ConfigProvider`、主题容器、`scss` 入口）并记录与目标规则的差异清单

## 2. 修复 web-vue 运行时局部主题能力

- [x] 2.1 在 `ConfigProvider` 中实现/修正局部主题容器挂载逻辑，确保 `theme` 或 `theme-mode` 触发子树级变量作用域
- [x] 2.2 实现父级继承 + 子级增量覆盖的主题解析逻辑，保证嵌套 provider 行为稳定且可回收
- [x] 2.3 修复局部主题相关 `scss` 入口与注入链路，确保构建产物下局部变量不会回退或丢失

## 3. 统一文档站主题示例链路

- [x] 3.1 更新 `config-provider` 局部主题模式示例，使其严格走运行时 `theme`/`theme-mode` 协议
- [x] 3.2 更新首页主题切换预览（`HomeThemePreview`）以复用同一主题 payload 结构并验证局部作用域
- [x] 3.3 更新主题交互编辑器页面与相关组件，保证导入导出 JSON 后预览行为与 `ConfigProvider` 示例一致
- [x] 3.4 补充文档说明与 FAQ，明确 `ConfigProvider(theme-mode)` 与 `ThemeProvider` 的使用边界

## 4. 增加回归验证

- [x] 4.1 为 `web-vue` 增加/更新局部主题测试，覆盖容器作用域、嵌套继承、运行时切换和卸载回收
- [x] 4.2 为文档示例关键路径增加验证（至少覆盖局部主题示例、首页预览、主题编辑器 JSON 导入）
- [x] 4.3 执行文档构建与相关测试命令，确认本次改动满足发布门禁
