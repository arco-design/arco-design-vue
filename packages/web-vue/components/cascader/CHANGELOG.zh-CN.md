```yaml
changelog: true
```

## 2.24.0

`2022-04-15`

### 🐛 问题修复

- 修复复选框的半选状态显示错误的问题 ([#963](https://github.com/arco-design/arco-design-vue/pull/963))


## 2.23.0

`2022-04-08`

### 🆕 新增功能

- 增加 empty 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))

### 🐛 问题修复

- 修复 2.22.0 版本中懒加载的 isLeaf 失效的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- 修复 options 属性在某些情况下不能触发更新的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))


## 2.22.0

`2022-04-01`

### 🆕 新增功能

- 增加 `field-names` 属性，允许自定义字段 ([#912](https://github.com/arco-design/arco-design-vue/pull/912))


## 2.20.0

`2022-03-18`

### 🆕 新增功能

- 增加 `cascader-panel` 组件 ([#842](https://github.com/arco-design/arco-design-vue/pull/842))

### 🐛 问题修复

- 修复下拉菜单选中路径可能与当前值不符的问题 ([#843](https://github.com/arco-design/arco-design-vue/pull/843))


## 2.18.0

`2022-03-04`

### 🆕 新增功能

- 增加 `#option`, `#label` 插槽 ([#781](https://github.com/arco-design/arco-design-vue/pull/781))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 新增功能

- 增加 `search-delay` 属性，并默认为 `500ms` ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- 增加 `search-option-only-label` 属性，并修改搜索下拉菜单中的选项默认展示路径标签 ([#729](https://github.com/arco-design/arco-design-vue/pull/729))

### 🐛 问题修复

- 修复选项更新后选择框展示没有更新的问题 ([#727](https://github.com/arco-design/arco-design-vue/pull/727))


## 2.18.0-beta.1

`2022-02-18`

### 🐛 问题修复

- 修复严格模式下禁用项仍可通过单选选择器选择的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))
- 修复严格模式下搜索结果没有包含路径选项的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))


## 2.16.0

`2022-01-21`

### 🐛 问题修复

- 修复在 `check-strictly` 模式下，搜索中不能选择的问题 ([#627](https://github.com/arco-design/arco-design-vue/pull/627))


## 2.15.0

`2022-01-14`

### 🆕 新增功能

- 增加 loading 属性 ([#558](https://github.com/arco-design/arco-design-vue/pull/558))


## 2.13.0

`2021-12-31`

### 🆕 新增功能

- 增加 `load-more` 属性，支持数据懒加载 ([#476](https://github.com/arco-design/arco-design-vue/pull/476))


## 2.11.0

`2021-12-17`

### 🐛 问题修复

- 修复层级 totalLevel 计算错误的问题 ([#399](https://github.com/arco-design/arco-design-vue/pull/399))


## 2.10.1

`2021-12-14`

### 🐛 问题修复

- 修复多选模式下存在空子菜单时计数错误的问题 ([#388](https://github.com/arco-design/arco-design-vue/pull/388))


## 2.10.0

`2021-12-10`

### 💎 功能优化

- 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 新增功能

- 增加 checkStrictly 属性 ([#349](https://github.com/arco-design/arco-design-vue/pull/349))


## 2.8.0

`2021-12-01`

### 🆕 新增功能

- 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))

### 💅 样式更新

- 去除选项选中加粗的效果 ([#308](https://github.com/arco-design/arco-design-vue/pull/308))


## 2.6.0

`2021-11-19`

### 🆕 新增功能

- 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))


## 2.5.0

`2021-11-18`

### ⚠️ 重点注意

- 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))


## 2.4.0

`2021-11-17`

### 🆕 新增功能

- 增加 `options.value` 数字类型和 `options.label` 自定义渲染的支持 ([#176](https://github.com/arco-design/arco-design-vue/pull/176))

### 🐛 问题修复

- 修复搜索输入框不能滚动的问题 ([#175](https://github.com/arco-design/arco-design-vue/pull/175))

