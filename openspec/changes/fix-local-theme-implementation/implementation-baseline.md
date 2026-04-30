## 1.1 对标结论（Vuetify / Naive UI）

- Vuetify `VThemeProvider` 通过 `provideTheme` 在子树建立主题上下文，主题范围默认局部，不依赖 body 全局切换。
- Naive UI `ConfigProvider` 通过 inject + computed 合并父级主题（`mergedThemeRef` / `mergedThemeOverridesRef`），子级按需覆盖，未覆盖部分继承父级。
- 两者共同点：
  - 主题作用域以 provider 子树为边界
  - 嵌套 provider 采用“继承 + 局部覆盖”语义
  - 上层状态不因子级销毁而污染

## 1.2 当前 web-vue 差异清单

- `ThemeProvider` 在“仅传 theme、不传 themeMode”时会给局部容器强制写入 `sd-theme='light'`，会打断父级深色模式继承。
- 主题示例链路存在协议不完全统一：
  - 首页预览、编辑器、config-provider 示例对 runtime payload 的表达不一致。
  - 首页存在内外双层 `ConfigProvider` 场景，增加了调试复杂度。
- 文档存在过时描述：样式迁移页仍提示多预览最终以 body 覆盖为准，与当前局部容器目标不一致。

## 本次修复方向

- 去除局部容器对 `light` 的强制回填，保持未设置 `theme-mode` 时沿用父级模式。
- 统一 docs 三条链路为 `mode + theme` payload。
- 增加关键回归测试和文档路径校验，确保改动可验证。
