## 1. Demo Tailwind runtime support

- [x] 1.1 盘点 sd-vue-docs 当前 Tailwind 入口、前缀约定和 DemoEditor 预览注入点，确定 generated 示例应复用的 shared demo stylesheet 方案。
- [x] 1.2 实现 shared demo Tailwind stylesheet，并让组件文档页预览与 DemoEditor 的 REPL 预览都加载同一套 utility 样式。
- [x] 1.3 为至少一个使用明显 utility class 的 generated 示例做冒烟验证，确认页面预览与编辑器预览样式一致。

## 2. Generated demo source migration

- [x] 2.1 扫描 packages/sd-vue-docs/src/components/generated 中的普通 script、Options API、style 标签和静态内联样式，整理迁移清单和高风险示例类别。
- [ ] 2.2 将含脚本逻辑的 generated 示例迁移为 script setup lang="ts"，并保持无脚本逻辑的示例为 template-only SFC。
- [ ] 2.3 将 generated 示例中的局部 style 标签和展示性内联样式替换为符合文档站约定的 Tailwind utility class，必要时通过包装节点或 arbitrary values 保持展示效果。
- [ ] 2.4 复查依赖组件 prop 或运行时计算 style 的特殊示例，确保仅保留与组件 API 直接相关的动态样式输入，不再保留 SFC style 块。

## 3. Guardrails and verification

- [x] 3.1 为 generated 示例新增静态校验，阻止普通 script、style 标签和不符合约定的回归写法进入文档包。
- [x] 3.2 将上述校验接入 sd-vue-docs 的开发或构建验证命令，并更新相关维护说明。
- [ ] 3.3 运行文档包的聚焦验证，包括类型检查、站点构建和迁移后示例抽样检查，确认源码展示、页面预览和 REPL 预览都通过。
