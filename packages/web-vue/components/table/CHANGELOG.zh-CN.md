```yaml
changelog: true
```

## 2.46.1

`2023-05-26`

### 💎 功能优化

- 增加表格右击、双击的相关事件 ([#2452](https://github.com/arco-design/arco-design-vue/pull/2452))


## 2.46.0

`2023-05-12`

### 🐛 问题修复

- 修复当 dataIndex 为路径格式时，排序和总结栏功能不生效的问题 ([#2413](https://github.com/arco-design/arco-design-vue/pull/2413))


## 2.45.1

`2023-04-14`

### 💅 样式更新

- 修复虚拟列表下显示横向滚动条的问题 ([#2337](https://github.com/arco-design/arco-design-vue/pull/2337))


## 2.41.1

`2023-01-06`

### 🐛 问题修复

- 修复开启 `scroll` 时浏览器缩放后可能出现宽度错误的问题 ([#2028](https://github.com/arco-design/arco-design-vue/pull/2028))


## 2.41.0

`2022-12-30`

### 🐛 问题修复

- 修复仅 `operations` 列固定的情况下没有阴影的问题 ([#1938](https://github.com/arco-design/arco-design-vue/pull/1938))


## 2.40.0

`2022-12-09`

### 🆕 新增功能

- change 事件增加当前数据参数 ([#1893](https://github.com/arco-design/arco-design-vue/pull/1893))


## 2.39.2

`2022-12-02`

### 🐛 问题修复

- 修复 thead 在某些情况下会出现纵向滚动条的问题 ([#1913](https://github.com/arco-design/arco-design-vue/pull/1913))


## 2.38.3

`2022-11-11`

### 🐛 问题修复

- 修复某些场景下自定义表格元素时会出现警告的问题


## 2.38.2

`2022-11-09`

### 🐛 问题修复

- 修复行选择器状态错误的问题 ([#1849](https://github.com/arco-design/arco-design-vue/pull/1849))


## 2.38.1

`2022-11-04`

### 🐛 问题修复

- 修复rowClass为函数时的参数 ([#1812](https://github.com/arco-design/arco-design-vue/pull/1812))


## 2.38.0

`2022-10-28`

### 💅 样式更新

- 修复暗黑模式下 stripe 样式问题 ([#1795](https://github.com/arco-design/arco-design-vue/pull/1795))


## 2.38.0-beta.1

`2022-10-14`

### 💅 样式更新

- 修复表格同时开启总结行和滚动时，总结行高度被压缩的问题 ([#1733](https://github.com/arco-design/arco-design-vue/pull/1733))


## 2.37.4

`2022-09-30`

### 🐛 问题修复

- 修复 default sorter&filters 在模板用法下失效的问题 ([#1707](https://github.com/arco-design/arco-design-vue/pull/1707))


## 2.37.3

`2022-09-23`

### 🐛 问题修复

- 修复内容变化后tooltip不显示的问题 ([#1662](https://github.com/arco-design/arco-design-vue/pull/1662))

### 🆎 类型修正

- 修复 TableRowSelection 类型声明 ([#1667](https://github.com/arco-design/arco-design-vue/pull/1667))


## 2.37.2

`2022-09-21`

### 🐛 问题修复

- 修复 scroll 属性中 maxHeight 导致虚拟滚动条样式错误问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))


## 2.36.0

`2022-09-02`

### 🆕 新增功能

- 新增自定义类名相关属性 ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))

### 💎 功能优化

- 扩展 key 的类型 ([#1580](https://github.com/arco-design/arco-design-vue/pull/1580))


## 2.35.0

`2022-08-12`

### 💅 样式更新

- 调整固定列的 zIndex ([#1479](https://github.com/arco-design/arco-design-vue/pull/1479))


## 2.34.0

`2022-07-29`

### 💎 功能优化

- columns 支持 reactive 类型的更新 ([#1470](https://github.com/arco-design/arco-design-vue/pull/1470))
- rowClass 支持函数类型的值 ([#1453](https://github.com/arco-design/arco-design-vue/pull/1453))


## 2.33.1

`2022-07-22`

### 💎 功能优化

- 单独设置 selected-keys 时可以显示选中行 ([#1440](https://github.com/arco-design/arco-design-vue/pull/1440))


## 2.32.1

`2022-07-01`

### 🐛 问题修复

- 修复文本提示没有跟随内容更新的问题 ([#1373](https://github.com/arco-design/arco-design-vue/pull/1373))


## 2.32.0

`2022-06-24`

### 🆕 新增功能

- TableRowSelection 增加 onlyCurrent 属性，更改表格默认维护所有分页的选择状态 ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))

### 💎 功能优化

- cellStyle 类属性添加的样式移动到 td 元素上，解决部分场景下背景色问题 ([#1334](https://github.com/arco-design/arco-design-vue/pull/1334))


## 2.31.0

`2022-06-17`

### 🆕 新增功能

- 增加新的组件方法，详情可见文档 ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))
- titleSlotName 定义的插槽增加 column 参数 ([#1304](https://github.com/arco-design/arco-design-vue/pull/1304))


## 2.30.2

`2022-06-11`

### 🐛 问题修复

- 修复 align='left' 时表头居中的问题 ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))

### 💎 功能优化

- 无展开按钮时不再显示缩进 ([#1278](https://github.com/arco-design/arco-design-vue/pull/1278))


## 2.30.0

`2022-06-10`

### ⚠️ 重点注意

- 由于功能需要，`arco-table-cell` 改为 flex 布局，且在表格内容外新增 `arco-table-td-content`  包裹层，如有自定义样式请留意 DOM 结构的改变 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🆕 新增功能

- 增加 `sticky-header` 表头吸顶功能 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- 表格列配置增加 `summaryCellStyle` 属性 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 🐛 问题修复

- 修复树型数据时文字省略错误的问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))
- 修复分组表头与固定列同时使用出现的问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💎 功能优化

- 支持虚拟列表和固定列同时使用 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))

### 💅 样式更新

- 修复横向滚动阴影问题 ([#1248](https://github.com/arco-design/arco-design-vue/pull/1248))


## 2.29.0

`2022-05-27`

### 🆕 新增功能

- 行选择器增加非严格模式支持（级联控制） ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))
- 列属性增加 headerCellStyle 和 bodyCellStyle ([#1202](https://github.com/arco-design/arco-design-vue/pull/1202))


## 2.28.0

`2022-05-20`

### 🆕 新增功能

- `expand ` 和 `select ` 事件增加 record 参数 ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))
- 新增 `columnResize`  事件 ([#1178](https://github.com/arco-design/arco-design-vue/pull/1178))


## 2.27.0

`2022-05-13`

### 💅 样式更新

- 修复存在固定列时，出现竖向滚动条的问题 ([#1124](https://github.com/arco-design/arco-design-vue/pull/1124))

### 🆎 类型修正

- 使用 VNodeChild 替代接口中的 VNode，支持更广泛类型 ([#1118](https://github.com/arco-design/arco-design-vue/pull/1118))


## 2.26.0

`2022-04-29`

### 🆕 新增功能

- column 配置增加 tooltip 属性 ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))
- 增加 thead、th 插槽，tr、td 插槽增加传出数据 ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))

### 💎 功能优化

- table-column 动态修改顺序不需要再手动指定 index ([#1065](https://github.com/arco-design/arco-design-vue/pull/1065))


## 2.25.1

`2022-04-27`

### 🐛 问题修复

- 修复 `2.25.0` 版本中扩展行传出 record 参数格式错误问题 ([#1047](https://github.com/arco-design/arco-design-vue/pull/1047))

### 💅 样式更新

- 增加内部 table 类名，修复与 `descriptions` 组件一起使用的样式问题 ([#1053](https://github.com/arco-design/arco-design-vue/pull/1053))


## 2.25.0

`2022-04-22`

### 🆕 新增功能

- 增加行选择器和展开行双向绑定属性 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- `select` 事件新增第二个参数 `rowKey` ([#999](https://github.com/arco-design/arco-design-vue/pull/999))

### 💎 功能优化

- 自定义单元格渲染的 `record` 参数支持修改 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))


## 2.24.0

`2022-04-15`

### 💎 功能优化

- 当 columns 属性中存在 titleSlotName 时会优先使用 ([#969](https://github.com/arco-design/arco-design-vue/pull/969))

### 🆎 类型修正

- `TableColumn` 接口名修改为 `TableColumnData` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))


## 2.23.0

`2022-04-08`

### 💎 功能优化

- 横向滚动模式下，如果数据为空，表头会显示滚动条 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))

### 🆕 新增功能

- columns 属性增加 titleSlotName，filterable 属性增加 slotName ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- table-column 增加 filter-content，filter-content 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- 增加 summary-cell 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))


## 2.22.1

`2022-04-02`

### 🐛 问题修复

- 修复虚拟列表和滚动一起使用的问题 ([#926](https://github.com/arco-design/arco-design-vue/pull/926))


## 2.22.0

`2022-04-01`

### 🆕 新增功能

- 增加 `selectAll` 方法 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))

### 🐛 问题修复

- 修复某些情况下虚拟列表宽度错误的问题 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))


## 2.21.0

`2022-03-25`

### 🆕 新增功能

- 增加总结行功能 ([#877](https://github.com/arco-design/arco-design-vue/pull/877))


## 2.20.2

`2022-03-24`

### 🐛 问题修复

- 修复 `table-column` 组件在模板中直接书写对象参数时导致不断更新的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- 修复仅有一个 `table-column` 时没有列数据的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- 修复 `table-column` 的排序问题，可通过 `index` 参数解决 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))


## 2.20.0

`2022-03-18`

### 🆕 新增功能

- 使用 Context 方式重构组件，`table-colum` 支持二次封装 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- scroll 属性增加 `maxHeight`, `minWidth` 属性 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))

### 💅 样式更新

- 修复开启排序后，表头文字不能居中的问题 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))

## 2.19.0

`2022-03-11`

### ⚠️ 重点注意

- 修改排序函数 sorter 的传出数据，增强使用 ([#810](https://github.com/arco-design/arco-design-vue/pull/810))


## 2.18.0

`2022-03-04`

### 🆕 新增功能

- 滚动模式支持设置高度百分比 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- column 数据增加 slotName 属性，允许指定渲染插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- 增加 `pagination-left` 和 `pagination-right` 插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 新增功能

- 增加 `span-all`  属性 ([#735](https://github.com/arco-design/arco-design-vue/pull/735))

### 🐛 问题修复

- 修复 table-column 嵌套使用时，v-for 不能渲染的问题 ([#734](https://github.com/arco-design/arco-design-vue/pull/734))


## 2.18.0-beta.1

`2022-02-18`

### 💎 功能优化

- 在数据为空时，不展示分页组件 ([#684](https://github.com/arco-design/arco-design-vue/pull/684))


## 2.16.2

`2022-01-24`

### 🐛 问题修复

- 修复阻止冒泡导致懒加载失效的问题 ([#641](https://github.com/arco-design/arco-design-vue/pull/641))
- **table:** 修复在展开行展开时，删除后显示空行的问题


## 2.16.0

`2022-01-21`

### 💎 功能优化

- 内部按钮不再触发 `row-click` 事件 ([#630](https://github.com/arco-design/arco-design-vue/pull/630))

### 🆕 新增功能

- 增加拖拽排序的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- 增加调整列宽的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- 增加 `tbody`、`tr`、`td` 插槽 ([#619](https://github.com/arco-design/arco-design-vue/pull/619))


## 2.15.0

`2022-01-14`

### 🆕 新增功能

- `sortable.sorter` 增加 boolean 类型，支持服务器端排序 ([#575](https://github.com/arco-design/arco-design-vue/pull/575))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- 修复 table 内容超出容器，导致某些情况下边框不显示的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- 增加 hideExpandButtonOnEmpty 属性 ([#520](https://github.com/arco-design/arco-design-vue/pull/520))

### 🐛 问题修复

- 修复 x 轴 resize 问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- 修复存在固定列时，展开行宽度设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- 修复存在子树时，复选框全选设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))


## 2.13.0

`2021-12-31`

### 🆕 新增功能

- 增加 `loadMore` 属性，支持子树懒加载 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- 增加 `filterIconAlignLeft` 属性 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- 增加 `change` 事件，可获取处理后数据 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))

### 🐛 问题修复

- 修复 `sortOrder ` 置空失效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- 修复 `expand-icon` 插槽在子树中不生效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- 修复固定列在表格尺寸动态变化时阴影不显示的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))


## 2.12.0

`2021-12-24`

### 💅 样式更新

- 修复 table 滚动模式下最后一行多余边框的问题 ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- `columns` 新增 cellStyle 属性 ([#411](https://github.com/arco-design/arco-design-vue/pull/411))

### 🐛 问题修复

- 修复固定列模式下，表格尺寸变化导致表头和主体宽度不一致问题 ([#410](https://github.com/arco-design/arco-design-vue/pull/410))


## 2.10.0

`2021-12-10`

### 🆕 新增功能

- 增加 span-method 属性 ([#360](https://github.com/arco-design/arco-design-vue/pull/360))


## 2.9.0

`2021-12-03`

### 🐛 问题修复

- 修复树形展开按钮触发表单提交的问题 ([#321](https://github.com/arco-design/arco-design-vue/pull/321))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- 增加 `footer` 插槽 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- 常规模式下表格宽度大于容器时会开启滚动条 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))


## 2.6.1

`2021-11-24`

### 💎 功能优化

- 数据为空时不展示滚动 ([#245](https://github.com/arco-design/arco-design-vue/pull/245))

### 🐛 问题修复

- 修复展开行按钮触发表单提交的问题 ([#210](https://github.com/arco-design/arco-design-vue/pull/210))


## 2.3.0

`2021-11-12`

### 🐛 问题修复

- 修复 `<table-column>` 在分组表头错误的问题 ([#151](https://github.com/arco-design/arco-design-vue/pull/151))


## 2.2.0

`2021-11-10`

### 🆕 新增功能

- 增加 `row-key` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- 增加 `expandable` 中的 `expandedRowRender ` 和 `icon` 属性 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))
- 增加 `expand-icon` 和 `expand-row` 插槽 ([#128](https://github.com/arco-design/arco-design-vue/pull/128))

### 🐛 问题修复

- 修复表头分组中表格操作项占位错误的问题 ([#127](https://github.com/arco-design/arco-design-vue/pull/127))


## 2.1.0

`2021-11-05`

### 🆕 新增功能

- 添加 `table-column` 中的 `#title` 插槽 ([#95](https://github.com/arco-design/arco-design-vue/pull/95))

### 🐛 问题修复

- 修复 `#column` 插槽不能支持Fragment的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))
- 修复 `scroll.x` 单独使用不生效的问题 ([#83](https://github.com/arco-design/arco-design-vue/pull/83))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- 修复 `scroll` 模式下，滚动条的显隐导致单元格错位 ([#29](https://github.com/arco-design/arco-design-vue/pull/29))

