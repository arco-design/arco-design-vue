```yaml
changelog: true
```

## 2.6.1

`2021-11-24`

### 💎 功能优化

- **table:** 数据为空时不展示滚动 ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 问题修复

- **trigger:** 修复嵌套不同类型 `<trigger>` 时触发错误的问题 ([#244](https://github.com/arco-design/arco-design-vue/pull/244))
- **page-header:** 修复没有子标题时仍然显示分割线的问题 ([#224](https://github.com/arco-design/arco-design-vue/pull/224))
- **table:** 修复展开行按钮触发表单提交的问题 ([#210](https://github.com/arco-design/arco-design-vue/pull/210))
- **steps:** 修复 `<step>` 组件中 `status` 属性不生效的问题 ([#209](https://github.com/arco-design/arco-design-vue/pull/209))
- **form:** 修复表单附加内容样式没生效的问题 ([#208](https://github.com/arco-design/arco-design-vue/pull/208))

### 🆎 类型修正

- 修复在 `<form>` 中使用输入型组件在控制台出现类型警告的问题 ([#247](https://github.com/arco-design/arco-design-vue/pull/247))


## 2.6.0

`2021-11-19`

### 🆕 新增功能

- **input-tag:** 增加退格键的支持 ([#202](https://github.com/arco-design/arco-design-vue/pull/202))
- **select:** 增加 `footer` 插槽 ([#201](https://github.com/arco-design/arco-design-vue/pull/201))
- **textarea:** 增加 `word-length` 属性 ([#199](https://github.com/arco-design/arco-design-vue/pull/199))
- **trigger:** 增加 `prevent-focus` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **select:** 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))
- **cascader:** 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))

### 🐛 问题修复

- **select:** 修复 `option` 插槽没有传出 `data` 参数的问题 ([#200](https://github.com/arco-design/arco-design-vue/pull/200))
- **upload:** 修复图片名过长时溢出的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- **upload:** 修复照片墙模式，超出长度不能换行的问题 ([#198](https://github.com/arco-design/arco-design-vue/pull/198))
- 修复 input 型组件重复获取焦点的问题 ([#196](https://github.com/arco-design/arco-design-vue/pull/196))
- **date-picker:** 修复在 form 里校验异常的问题 ([#195](https://github.com/arco-design/arco-design-vue/pull/195))

### 💅 样式更新

- **menu:** 弹出型子菜单适配暗色主题 ([#193](https://github.com/arco-design/arco-design-vue/pull/193))


## 2.5.0

`2021-11-18`

### ⚠️ 重点注意

- **select:** 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))
- **cascader:** 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🆕 新增功能

- **select:** `<option>` 添加 label 属性支持 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))

### 🐛 问题修复

- **tree-select:** 无法选中 key 为 0 的选项 ([#185](https://github.com/arco-design/arco-design-vue/pull/185))
- 修复 input 型组件在弹出层不能获取焦点的问题 ([#184](https://github.com/arco-design/arco-design-vue/pull/184))
- 修复弹出型组件 `z-index` 错误的问题 ([#182](https://github.com/arco-design/arco-design-vue/pull/182))


## 2.4.0

`2021-11-17`

### 💎 功能优化

- **modal:** 统一管理弹出层的 zIndex ([#167](https://github.com/arco-design/arco-design-vue/pull/167))

### 🆕 新增功能

- **cascader:** 增加 `options.value` 数字类型和 `options.label` 自定义渲染的支持 ([#176](https://github.com/arco-design/arco-design-vue/pull/176))
- **upload:** 增加 `upload-button` 和 `upload-item` 插槽 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** 增加 `success` 和 `error` 事件 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **upload:** 增加 `on-click-button` 、`custom-icon`、`directory ` 属性 ([#174](https://github.com/arco-design/arco-design-vue/pull/174))
- **drawer:** `width` 和 `height` 增加支持字符类型 ([#172](https://github.com/arco-design/arco-design-vue/pull/172))
- **select:** 增加 `option` 插槽 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **select:** `options.label` 支持自定义渲染 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- **tree:** `key` 支持 `number`  类型 ([#169](https://github.com/arco-design/arco-design-vue/pull/169))

### 🐛 问题修复

- **cascader:** 修复搜索输入框不能滚动的问题 ([#175](https://github.com/arco-design/arco-design-vue/pull/175))
- **form:** 修复 `filed` 字段传入 null 导致报错的问题 ([#173](https://github.com/arco-design/arco-design-vue/pull/173))
- **input-tag:** 修复中文输入法问题 ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **input-tag:** 修复 Enter 键触发 form 提交的问题 ([#171](https://github.com/arco-design/arco-design-vue/pull/171))
- **trigger:** 修复 `<svg>` 元素定位错误的问题 ([#162](https://github.com/arco-design/arco-design-vue/pull/162))
- **input-tag:** 修复disabled状态下标签仍可被关闭 ([#161](https://github.com/arco-design/arco-design-vue/pull/161))

### 💅 样式更新

- **image:** 将错误状态图标的最大尺寸设置为父元素的大小 ([#160](https://github.com/arco-design/arco-design-vue/pull/160))


## 2.3.0

`2021-11-12`

### 🆕 新增功能

- **form:** 增加 `setFields` 方法 ([#150](https://github.com/arco-design/arco-design-vue/pull/150))
- **message:** 增加 `onClose` 回调方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **message:** 增加 `loading` 方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **notification:** 增加 `onClose` 回调方法 ([#149](https://github.com/arco-design/arco-design-vue/pull/149))
- **alert:** 增加 `#action` 插槽 ([#148](https://github.com/arco-design/arco-design-vue/pull/148))

### 🐛 问题修复

- **table:** 修复 `<table-column>` 在分组表头错误的问题 ([#151](https://github.com/arco-design/arco-design-vue/pull/151))
- **menu:** 修复嵌套自定义组件的时候父菜单没有高亮的问题 ([#147](https://github.com/arco-design/arco-design-vue/pull/147))
- **alert:** 修复组件导出名字错误的问题 ([#142](https://github.com/arco-design/arco-design-vue/pull/142))
- **textarea:** 修复 `disabled` 不生效的问题 ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **textarea:** 修复缺失 `style/index.js` 的问题 ([#139](https://github.com/arco-design/arco-design-vue/pull/139))
- **breadcrumb:** 修复 `breadcrumb-item` 没有继承 Attribute 的问题 ([#137](https://github.com/arco-design/arco-design-vue/pull/137))
- **tree:** 修复设置  `default-checked-keys` 无效的问题 ([#131](https://github.com/arco-design/arco-design-vue/pull/131))
- 当虚拟列表 `data` 改变时重置 VNode 缓存 ([#129](https://github.com/arco-design/arco-design-vue/pull/129))


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
