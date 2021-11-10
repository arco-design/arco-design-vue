```yaml
changelog: true
```

## 2.2.0

`2021-11-10`

### 🆕 新增功能

- **table:** 增加 `row-key` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** 增加 `expandable` 中的 `expandedRowRender ` 和 `icon` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- **table:** 增加 `expand-icon` 和 `expand-row` 插槽 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 问题修复

- **table:** 修复表头分组中表格操作项占位错误的问题 ([#127](https://github.com/arco-design/arco-design-vue/pull/127))
- **trigger:** 修复 `disabled` 状态切换失效的问题 ([#126](https://github.com/arco-design/arco-design-vue/pull/126))
- **upload:** 修复 `limit` 属性无效的问题 ([#123](https://github.com/arco-design/arco-design-vue/pull/123))
- **typography:** 修复无法输入的问题 ([#121](https://github.com/arco-design/arco-design-vue/pull/121))


## 2.1.1

`2021-11-08`

### 💎 功能优化

- **menu:** 将弹出型 `menu` 的默认展开方式改为 hover ([#111](https://github.com/arco-design/arco-design-vue/pull/111))

### 🐛 问题修复

- **modal:** 修复 `title` 属性不生效的问题 ([#116](https://github.com/arco-design/arco-design-vue/pull/116))
- **image:** 修复图片的高度限制无效的问题 ([#115](https://github.com/arco-design/arco-design-vue/pull/115))
- **input-number:** 修复输入负号出错的问题 ([#114](https://github.com/arco-design/arco-design-vue/pull/114))
- **textarea:** 修复 `autoSize` 模式下内部循环更新的问题 ([#113](https://github.com/arco-design/arco-design-vue/pull/113))
- **popconfirm:** 修复 `ok/cancel` 按钮参数丢失的问题 ([#105](https://github.com/arco-design/arco-design-vue/pull/105))


## 2.1.0

`2021-11-05`

### 💎 功能优化

- **tree-select:** 选项的可点击范围默认占满一行 ([#90](https://github.com/arco-design/arco-design-vue/pull/90))
- **tabs:** 优化标签栏滚动方法 ([#87](https://github.com/arco-design/arco-design-vue/pull/87))
- **trigger:** 将外部关闭事件移到 `document` 上 ([#76](https://github.com/arco-design/arco-design-vue/pull/76))

### 🆕 新增功能

- **table:** 添加 `table-column` 中的 `#title` 插槽 ([#95](https://github.com/arco-design/arco-design-vue/pull/95))
- **form:** 增加 `hideAsterisk ` 功能 ([#94](https://github.com/arco-design/arco-design-vue/pull/94))
- **input:** 增加 `wordLength` 属性 ([#91](https://github.com/arco-design/arco-design-vue/pull/91))
- **spin:** 增加 `size` 属性和 `#icon` & `#element` 插槽 ([#86](https://github.com/arco-design/arco-design-vue/pull/86))
- **image:** 增加一个名为 `error-icon` 的 slot 用于支持定制错误状态的图标 ([#85](https://github.com/arco-design/arco-design-vue/pull/85))
- 增加 `日文` 支持 ([#13](https://github.com/arco-design/arco-design-vue/pull/13))

### 🐛 问题修复

- **slider:** 修复点击右键没有释放拖拽事件的问题 ([#97](https://github.com/arco-design/arco-design-vue/pull/97))
- **select:** 修复 `#empty` 插槽丢失的问题 ([#96](https://github.com/arco-design/arco-design-vue/pull/96))
- **input-number:** 修复精度失效的问题 ([#93](https://github.com/arco-design/arco-design-vue/pull/93))
- **input-tag:** 修复输入框宽度计算错误的问题 ([#89](https://github.com/arco-design/arco-design-vue/pull/89))
- **input:** 移除 `keydown` 事件的阻止默认行为 ([#84](https://github.com/arco-design/arco-design-vue/pull/84))
- **table:** 修复 `#column` 插槽不能支持Fragment的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **table:** 修复 `scroll.x` 单独使用不生效的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- **textarea:** 修复自动高度调整不准的问题 ([#78](https://github.com/arco-design/arco-design-vue/pull/78))
- **input:** 修复 `a-input-number` 组件 `model-value` 默认值为 0 时不生效的问题 ([#75](https://github.com/arco-design/arco-design-vue/pull/75))
- **input:** 修复 `input-search` 和 `input-password` 不支持 `slot` 的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))
- **input:** 修复 `input-password` 切换密码可见状态时光标位置丢失的问题 ([#63](https://github.com/arco-design/arco-design-vue/pull/63))

### 💅 样式更新

- **input:** 修改 `clear-btn` 样式，解决 `select-view` 可能会抖动的问题 ([#70](https://github.com/arco-design/arco-design-vue/pull/70))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- **select:** 修复清除按钮在多选模式下不显示的问题 ([#38](https://github.com/arco-design/arco-design-vue/pull/38))
- **modal:** 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **drawer:** 修复主按钮类型错误的问题 ([#30](https://github.com/arco-design/arco-design-vue/pull/30))
- **table:** 修复 `scroll` 模式下，滚动条的显隐导致单元格错位 ([#29](https://github.com/arco-design/arco-design-vue/pull/29))
- **collapse:** 修复 `accordion` 模式不能收起的问题

## 2.0.2

`2021-10-26`

- 组件库默认字体调整

## 2.0.1

`2021-10-25`

- 更新 `package.json` 信息

## 2.0.0

`2021-10-24`

- 🏆 Arco Design Vue 2.0 正式版发布！
