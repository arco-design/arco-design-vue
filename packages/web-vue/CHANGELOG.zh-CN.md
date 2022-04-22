```yaml
changelog: true
```

## 2.25.0

`2022-04-22`

### 🆕 新增功能

- **notification:** 增加 footer 属性 ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))
- **tabs:** 增加 hideContent 属性 ([#1025](https://github.com/arco-design/arco-design-vue/pull/1025))
- **table:** 增加行选择器和展开行双向绑定属性 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **date-picker:** 增加参数 `exchangeTime` ([#1020](https://github.com/arco-design/arco-design-vue/pull/1020))
- **icon:** 增加 `attachment`, `archive`, `calendar-clock`, `palette`, `launch` 图标 ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))
- **config-provider:** 增加 updateAtScroll 属性 ([#1015](https://github.com/arco-design/arco-design-vue/pull/1015))
- **table:** `select` 事件新增第二个参数 `rowKey` ([#999](https://github.com/arco-design/arco-design-vue/pull/999))
- **config-provider:** 添加 `global` 属性 ([#933](https://github.com/arco-design/arco-design-vue/pull/933))

### 🐛 问题修复

- **input-number:** 修复 error 属性失效的问题 ([#1026](https://github.com/arco-design/arco-design-vue/pull/1026))
- 修复 Volar 智能提示失效的问题 ([#1022](https://github.com/arco-design/arco-design-vue/pull/1022))
- **icon:** 修正 `link`, `image-close`,`lock`, `unlock`,`sync` 图标 ([#1017](https://github.com/arco-design/arco-design-vue/pull/1017))

### 💎 功能优化

- **table:** 自定义单元格渲染的 `record` 参数支持修改 ([#1023](https://github.com/arco-design/arco-design-vue/pull/1023))
- **tree:** 调用方法操作单个节点的时候在回调参数重增加目标节点信息 ([#1021](https://github.com/arco-design/arco-design-vue/pull/1021))
- **modal:** 使用 `esc` 关闭时只会关闭最上层弹窗 ([#1018](https://github.com/arco-design/arco-design-vue/pull/1018))

### 💅 样式更新

- **menu:** 弹出菜单的 icon 增加 margin-right ([#1029](https://github.com/arco-design/arco-design-vue/pull/1029))

### 🆎 类型修正

- **tag:** 修复 TagProps 的问题 ([#1024](https://github.com/arco-design/arco-design-vue/pull/1024))


## 2.24.1

`2022-04-16`

### 🐛 问题修复

- **button:** 修复 `config-provide` 注入失效的问题 ([#986](https://github.com/arco-design/arco-design-vue/pull/986))


## 2.24.0

`2022-04-15`

### 💎 功能优化

- **date-picker:** 传递了 timePickerProps 就会在最终值上拼接时间 ([#981](https://github.com/arco-design/arco-design-vue/pull/981))
- **table:** 当 columns 属性中存在 titleSlotName 时会优先使用 ([#969](https://github.com/arco-design/arco-design-vue/pull/969))

### 🆕 新增功能

- **modal:** 增加动画名属性 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **button:** `button-group` 支持为子组件 `button` 设置属性 ([#967](https://github.com/arco-design/arco-design-vue/pull/967))

### 🐛 问题修复

- **typography:** 解决 `slots.default` 报警告的问题 ([#980](https://github.com/arco-design/arco-design-vue/pull/980))
- **modal:** 修复在某些情况下不会锁定 body 的问题 ([#968](https://github.com/arco-design/arco-design-vue/pull/968))
- **menu:** 修复 `auto-scroll-into-view` 无效的问题 ([#966](https://github.com/arco-design/arco-design-vue/pull/966))
- **cascader:** 修复复选框的半选状态显示错误的问题 ([#963](https://github.com/arco-design/arco-design-vue/pull/963))
- **steps:** 修复 Steps 与 Step 组件非直接父子关系时 index 错误的问题 ([#959](https://github.com/arco-design/arco-design-vue/pull/959))

### 💅 样式更新

- **modal:** 修复全屏下动画导致闪现滚动条的问题 ([#985](https://github.com/arco-design/arco-design-vue/pull/985))
- **pagination:** 分页选择项增加 padding ([#984](https://github.com/arco-design/arco-design-vue/pull/984))

### 🆎 类型修正

- 增加常用 typescript 类型定义的导出 ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **select:** `Option、OptionData、GroupOption`  接口名修改为 `SelectOption、SelectOptionData、SelectOptionGroup` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **table:** `TableColumn` 接口名修改为 `TableColumnData` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))
- **tree:** `FieldNames` 修改为 `TreeFieldNames` ([#977](https://github.com/arco-design/arco-design-vue/pull/977))


## 2.23.0

`2022-04-08`

### 💎 功能优化

- **pagination:** 优化切换 pageSize 时的页码改变逻辑 ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **input:** 输入类组件的 `clear` 事件会同时触发 `change` 事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **table:** 横向滚动模式下，如果数据为空，表头会显示滚动条 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **modal:** 修复在滚动条为浮动的情况下，body没有锁定的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))

### 🆕 新增功能

- **pagination:** 增加 `jumper-prepend` 和  `jumper-append` 插槽 ([#954](https://github.com/arco-design/arco-design-vue/pull/954))
- **image:** 增加 footer-class  属性 ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **cascader:** 增加 empty 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **select:** 增加 trigger 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **mention:** 增加 allow-clear 属性和事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **auto-complete:** 增加 allow-clear 属性和事件 ([#951](https://github.com/arco-design/arco-design-vue/pull/951))
- **menu:** 支持通过 `popup-max-height` 设置弹出框的最大高度 ([#949](https://github.com/arco-design/arco-design-vue/pull/949))
- **table:** columns 属性增加 titleSlotName，filterable 属性增加 slotName ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** table-column 增加 filter-content，filter-content 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **table:** 增加 summary-cell 插槽 ([#948](https://github.com/arco-design/arco-design-vue/pull/948))
- **upload:** 增加图标相关插槽 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** 增加 updateFile 方法，onBeforeUpload 支持返回 File ([#944](https://github.com/arco-design/arco-design-vue/pull/944))
- **upload:** 优化初始图片显示逻辑 ([#944](https://github.com/arco-design/arco-design-vue/pull/944))

### 🐛 问题修复

- **cascader:** 修复 2.22.0 版本中懒加载的 isLeaf 失效的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **cascader:** 修复 options 属性在某些情况下不能触发更新的问题 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))
- **tree-select:** 当 label-in-value 为 true 的时候，事件 change 的入参错误 ([#939](https://github.com/arco-design/arco-design-vue/pull/939))

### 💅 样式更新

- **image:** 修复 footer 区域底部圆角样式问题 ([#953](https://github.com/arco-design/arco-design-vue/pull/953))
- **modal:** 修复在简单模式下，title-align 靠左对齐失效的问题 ([#945](https://github.com/arco-design/arco-design-vue/pull/945))


## 2.22.1

`2022-04-02`

### 🐛 问题修复

- **menu:** 修复菜单图标的高度不对的问题 ([#928](https://github.com/arco-design/arco-design-vue/pull/928))
- **table:** 修复虚拟列表和滚动一起使用的问题 ([#926](https://github.com/arco-design/arco-design-vue/pull/926))
- **mention:** 修复开发环境下出现警告提示的问题 ([#925](https://github.com/arco-design/arco-design-vue/pull/925))


## 2.22.0

`2022-04-01`

### 💎 功能优化

- **select:** 加载状态下不再可以触发回车事件 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🆕 新增功能

- **table:** 增加 `selectAll` 方法 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **form:** 支持修改表单项标签的渲染元素 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))
- **cascader:** 增加 `field-names` 属性，允许自定义字段 ([#912](https://github.com/arco-design/arco-design-vue/pull/912))
- **select:** 增加 `field-names` 属性，允许自定义字段 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-tag:** 增加 `field-names` 属性 ([#910](https://github.com/arco-design/arco-design-vue/pull/910))
- **tree-select:** 新增参数 `fallback-option` ([#894](https://github.com/arco-design/arco-design-vue/pull/894))

### 🐛 问题修复

- **table:** 修复某些情况下虚拟列表宽度错误的问题 ([#920](https://github.com/arco-design/arco-design-vue/pull/920))
- **modal:** 修复 `align-center="false"` 时自动宽度和拖动错误的问题 ([#918](https://github.com/arco-design/arco-design-vue/pull/918))
- 修复虚拟列表在项目高度偏差较大的时候出现底部空白的问题 ([#917](https://github.com/arco-design/arco-design-vue/pull/917))
- **tree-select:** 修复  null 值显示为空的问题 ([#916](https://github.com/arco-design/arco-design-vue/pull/916))
- **typography:** 修复复制无效的问题 ([#915](https://github.com/arco-design/arco-design-vue/pull/915))
- **select:** 修复 `allow-create` 模式下会出现重复选项的问题 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))
- **input-number:** 修复切换 `mode` 时展示错误的问题 ([#909](https://github.com/arco-design/arco-design-vue/pull/909))
- **mention:** 修复 v-model 双向绑定在选择值时错误的问题 ([#908](https://github.com/arco-design/arco-design-vue/pull/908))
- **upload:** 修复 onButtonClick 属性不可用的问题 ([#907](https://github.com/arco-design/arco-design-vue/pull/907))
- **menu:** 弹出框中的图标与文字没有对齐 ([#889](https://github.com/arco-design/arco-design-vue/pull/889))

### 💅 样式更新

- **form:** 表单项内容样式增加最大宽度，防止溢出 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))


## 2.21.2

`2022-03-29`

### 🐛 问题修复

- **select:** 修复 `fallback-option` 属性设置 false 失效的问题 ([#893](https://github.com/arco-design/arco-design-vue/pull/893))
- **select:** 修复多选模式下选择的标签默认不显示删除的问题 ([#886](https://github.com/arco-design/arco-design-vue/pull/886))


## 2.21.1

`2022-03-25`

### 🐛 问题修复

- **affix:** 修复组件在 SSR 下报错的问题 ([#879](https://github.com/arco-design/arco-design-vue/pull/879))


## 2.21.0

`2022-03-25`

### 💎 功能优化

- 支持 SSR 使用 ([#872](https://github.com/arco-design/arco-design-vue/pull/872))

### 🆕 新增功能

- **table:** 增加总结行功能 ([#877](https://github.com/arco-design/arco-design-vue/pull/877))
- **tree:** 新增配置项 `onlyCheckLeaf` ([#876](https://github.com/arco-design/arco-design-vue/pull/876))
- **date-picker:** `dayStartOfWeek` 支持设置为 0-6 ([#874](https://github.com/arco-design/arco-design-vue/pull/874))
- **tree:** 支持关闭展开时的动效 ([#867](https://github.com/arco-design/arco-design-vue/pull/867))

### 🐛 问题修复

- **tree-select:** 修复 `max-tags` 参数名错误的问题，应为 `max-tag-count` ([#873](https://github.com/arco-design/arco-design-vue/pull/873))
- 修复部分组件使用 `popup-container` 指定的容器不存在时报错的问题 ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **trigger:** 修复在未卸载的情况下，最外层 `div` 没有隐藏的问题 ([#871](https://github.com/arco-design/arco-design-vue/pull/871))
- **avatar:** 修复没有内容时会出现警告提示的问题 ([#870](https://github.com/arco-design/arco-design-vue/pull/870))
- **tag:** 移除尺寸类型 `mini` ([#860](https://github.com/arco-design/arco-design-vue/pull/860))
- **modal:** 修复使用函数方式触发Modal显示时，按钮处于焦点，此时点击回车会继续出发点击事件 ([#860](https://github.com/arco-design/arco-design-vue/pull/860))

### 💅 样式更新

- **menu:** 解决菜单项的缩进换行的问题 ([#866](https://github.com/arco-design/arco-design-vue/pull/866))
- **tree:** 修复连接线显示错乱的问题 ([#865](https://github.com/arco-design/arco-design-vue/pull/865))

### 🆎 类型修正

- **tree:** 增加filednames的自定义icon功能 ([#848](https://github.com/arco-design/arco-design-vue/pull/848))


## 2.20.2

`2022-03-24`

### 🐛 问题修复

- **table:** 修复 `table-column` 组件在模板中直接书写对象参数时导致不断更新的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** 修复仅有一个 `table-column` 时没有列数据的问题 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))
- **table:** 修复 `table-column` 的排序问题，可通过 `index` 参数解决 ([#861](https://github.com/arco-design/arco-design-vue/pull/861))

### 💅 样式更新

- **dropdown:** 修复选项中图标的垂直居中问题 ([#862](https://github.com/arco-design/arco-design-vue/pull/862))
- 修复部分组件的下拉菜单动画问题 ([#862](https://github.com/arco-design/arco-design-vue/pull/862))


## 2.20.1

`2022-03-21`

### 🐛 问题修复

- **tree:** 修复新版本中展开事件名称错误的问题 ([#853](https://github.com/arco-design/arco-design-vue/pull/853))

### 💅 样式更新

- **form:** 修复 `form-item` 星号与 windicss 的兼容问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** 修复选项 #icon 插槽的垂直居中问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **select:** 修复选项超出宽度后没有显示省略的问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- **transfer:** 修复选项超出宽度后没有显示省略的问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.20.0

`2022-03-18`

### 🆕 新增功能

- **table:** 使用 Context 方式重构组件，`table-colum` 支持二次封装 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **table:** scroll 属性增加 `maxHeight`, `minWidth` 属性 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))
- **cascader:** 增加 `cascader-panel` 组件 ([#842](https://github.com/arco-design/arco-design-vue/pull/842))
- **descriptions:** `column` 属性支持响应式配置 ([#839](https://github.com/arco-design/arco-design-vue/pull/839))
- **list:** 增加 `#scroll-loading` 插槽 ([#838](https://github.com/arco-design/arco-design-vue/pull/838))
- **tree:** 添加树的实例方法 ([#837](https://github.com/arco-design/arco-design-vue/pull/837))

### 🐛 问题修复

- **date-picker:** 选择结束时间的时候没有触发 select 事件 ([#844](https://github.com/arco-design/arco-design-vue/pull/844))
- **cascader:** 修复下拉菜单选中路径可能与当前值不符的问题 ([#843](https://github.com/arco-design/arco-design-vue/pull/843))
- **select:** 修复开启虚拟列表时，搜索功能失败的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **select:** 修复小键盘 `Enter` 键不能选中的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- **modal:** 修复创建方法中返回的 `close` 函数错误的问题 ([#840](https://github.com/arco-design/arco-design-vue/pull/840))
- **typography:** 修复 `ellipsisText` 未更新的问题 ([#833](https://github.com/arco-design/arco-design-vue/pull/833))

### 💅 样式更新

- **table:** 修复开启排序后，表头文字不能居中的问题 ([#845](https://github.com/arco-design/arco-design-vue/pull/845))

## 2.19.0

`2022-03-11`

### ⚠️ 重点注意

- **table:** 修改排序函数 sorter 的传出数据，增强使用 ([#810](https://github.com/arco-design/arco-design-vue/pull/810))

### 💎 功能优化

- `modal`, `message`, `notifaction` 组件的函数式调用增加 appContext 的支持，详情请参见文档 ([#804](https://github.com/arco-design/arco-design-vue/pull/804))

### 🆕 新增功能

- **tree:** 支持设置半选节点 ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **tree:** 实例上新增可调用的方法:  `getCheckedNodes` `getSelectedNodes` `getExpandedNodes` `getHalfCheckedNodes` ([#809](https://github.com/arco-design/arco-design-vue/pull/809))
- **drawer:** 增加 `hide-cancel` 属性 ([#803](https://github.com/arco-design/arco-design-vue/pull/803))
- **modal:** 增加 `draggable` 属性，支持可拖动 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **modal:** 增加 `fullscreen` 属性，支持全屏展示 ([#802](https://github.com/arco-design/arco-design-vue/pull/802))
- **grid:** 当列跨度为0的时候`a-col`将被隐藏 ([#797](https://github.com/arco-design/arco-design-vue/pull/797))

### 🐛 问题修复

- **descriptions:** 修复 `data` 为空数据时报错的问题 ([#812](https://github.com/arco-design/arco-design-vue/pull/812))
- **form:** 修复 `form-item` 的 `field` 属性中存在数组时失效的问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **form:** 修复 `disabled` 开启后，部分组件功能仍可用问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- **tree:** 修复当节点找不到的时候组件渲染出错的问题 ([#800](https://github.com/arco-design/arco-design-vue/pull/800))
- **date-picker:** 修复范围选择器弹出层的偏移量错误的问题 ([#796](https://github.com/arco-design/arco-design-vue/pull/796))


## 2.18.1

`2022-03-07`

### 🐛 问题修复

- **tabs:** 修复初始化时会触发 activeKey 修改的问题 ([#787](https://github.com/arco-design/arco-design-vue/pull/787))
- **upload:** 修复上传进度计算错误的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))
- **upload:** 修复上传中，取消按钮失效的问题 ([#786](https://github.com/arco-design/arco-design-vue/pull/786))


## 2.18.0

`2022-03-04`

### 💎 功能优化

- **select:** 选择框展示使用 flex 布局方式 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **select:** trigger-props 属性可以覆盖默认属性 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- **breadcrumb:** 使用 Context 方式优化组件 ([#774](https://github.com/arco-design/arco-design-vue/pull/774))
- **avatar:** 使用 Context 方式优化组件 ([#773](https://github.com/arco-design/arco-design-vue/pull/773))
- **steps:** 使用 Context 方式优化组件 ([#772](https://github.com/arco-design/arco-design-vue/pull/772))
- **tabs:** 使用 Context 方式优化组件，支持对 TabPane 的二次封装 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** key 支持 number 类型 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))
- **tabs:** 增加 autoSwitch 属性 ([#771](https://github.com/arco-design/arco-design-vue/pull/771))

### 🆕 新增功能

- 增加 GlobalComponents 定义 ([#782](https://github.com/arco-design/arco-design-vue/pull/782))
- **cascader:** 增加 `#option`, `#label` 插槽 ([#781](https://github.com/arco-design/arco-design-vue/pull/781))
- **table:** 滚动模式支持设置高度百分比 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** column 数据增加 slotName 属性，允许指定渲染插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **table:** 增加 `pagination-left` 和 `pagination-right` 插槽 ([#780](https://github.com/arco-design/arco-design-vue/pull/780))
- **rate:** 增加 color 属性 ([#770](https://github.com/arco-design/arco-design-vue/pull/770))
- **checkbox:** 增加 checkbox 插槽，可以自定义复选框 ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **radio:** 增加 radio 插槽，可以自定义单选框 ([#769](https://github.com/arco-design/arco-design-vue/pull/769))
- **date-picker:** 支持在头部快捷切换年月 ([#754](https://github.com/arco-design/arco-design-vue/pull/754))

### 🐛 问题修复

- **select:** 修复 label 属性失效的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **select:** 修复 option 的属性没有同步更新的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- **list:** 列表项应渲染为 div ([#776](https://github.com/arco-design/arco-design-vue/pull/776))
- **slider:** 修复输入框改变时不会触发 change 的问题 ([#775](https://github.com/arco-design/arco-design-vue/pull/775))
- **form:** 修复嵌套数据中重置方法失效的问题 ([#768](https://github.com/arco-design/arco-design-vue/pull/768))

### 💅 样式更新

- **menu:** 菜单项的图标没有垂直居中 ([#767](https://github.com/arco-design/arco-design-vue/pull/767))


## 2.18.0-beta.3

`2022-02-26`

### 💎 功能优化

- **input:** modelValue 支持 null ([#743](https://github.com/arco-design/arco-design-vue/pull/743))

### 🐛 问题修复

- **transfer:** 修复列表显示问题 ([#744](https://github.com/arco-design/arco-design-vue/pull/744))


## 2.18.0-beta.2

`2022-02-25`

### ⚠️ 重点注意

- **trigger:** 弹出层增加一层 `wrapper div` 用来提供对tranform动画的支持 ([#732](https://github.com/arco-design/arco-design-vue/pull/732))
- **list:** 默认渲染 spin 组件，防止切换状态时导致组件重新挂载 ([#730](https://github.com/arco-design/arco-design-vue/pull/730))
- **list:** 支持渲染任何子元素 ([#730](https://github.com/arco-design/arco-design-vue/pull/730))

### 💎 功能优化

- **form:** `auto-label-width` 开启时不在允许标签换行，防止换行后计算错误 ([#738](https://github.com/arco-design/arco-design-vue/pull/738))
- **modal:** 优化点击遮罩层关闭 ([#737](https://github.com/arco-design/arco-design-vue/pull/737))

### 🆕 新增功能

- **descriptions:** 增加 `descriptions-item` 组件 ([#739](https://github.com/arco-design/arco-design-vue/pull/739))
- **table:** 增加 `span-all`  属性 ([#735](https://github.com/arco-design/arco-design-vue/pull/735))
- **trigger:** 增加 `show` 和 `hide` 事件 ([#731](https://github.com/arco-design/arco-design-vue/pull/731))
- **cascader:** 增加 `search-delay` 属性，并默认为 `500ms` ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **cascader:** 增加 `search-option-only-label` 属性，并修改搜索下拉菜单中的选项默认展示路径标签 ([#729](https://github.com/arco-design/arco-design-vue/pull/729))
- **select:** 增加 `search-delay` 属性，并默认为 `500ms` ([#728](https://github.com/arco-design/arco-design-vue/pull/728))
- **form:** 校验错误信息新增 label 属性 ([#724](https://github.com/arco-design/arco-design-vue/pull/724))
- **tree:** 新增插槽 `icon` 用于全局定制节点图标 ([#710](https://github.com/arco-design/arco-design-vue/pull/710))

### 🐛 问题修复

- **table:** 修复 table-column 嵌套使用时，v-for 不能渲染的问题 ([#734](https://github.com/arco-design/arco-design-vue/pull/734))
- **cascader:** 修复选项更新后选择框展示没有更新的问题 ([#727](https://github.com/arco-design/arco-design-vue/pull/727))
- **upload:** 修复使用插槽 `upload-item` 报错的问题 ([#715](https://github.com/arco-design/arco-design-vue/pull/715))
- 修复 `virtual-list` 在滚动条显示和隐藏的边界情况下数据变化没有更新视图的问题 ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- 修复 `virtual-list` 行高计算没有包含边框的问题 ([#711](https://github.com/arco-design/arco-design-vue/pull/711))
- **upload:** 仅在文件类型为图片时生成初始预览图片 ([#706](https://github.com/arco-design/arco-design-vue/pull/706))
- **message:** 修复同时调用时，出现销毁报错的问题 ([#705](https://github.com/arco-design/arco-design-vue/pull/705))

### 💅 样式更新

- **pagination:** 修复在safari下跳转器文字没有对齐的问题 ([#736](https://github.com/arco-design/arco-design-vue/pull/736))
- **tooltip:** 优化显示动画，同 react 版本保持一致 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popover:** 优化显示动画 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))
- **popconfirm:** 优化显示动画 ([#733](https://github.com/arco-design/arco-design-vue/pull/733))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ 重点注意

- 本版本为 beta 版本，存在较大改动，情谨慎测试后在生产环境使用
- **form:** <form-item> 组件重构，使用 context 管理输入组件。如果用户存在自定义输入组件，可参考 `自定义输入组件` 示例更改。 ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- 所有输入组件增加 FormItemContext 的注入 ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **radio:** 外层包裹 DOM 从 span 改为 label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **checkbox:** 外层包裹 DOM 从 span 改为 label ([#697](https://github.com/arco-design/arco-design-vue/pull/697))
- **select:** 组件使用 context 重构，允许对 Option 组件的封装使用 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** 增加 `valueKey` 属性，选项 value 支持 object 形式 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **select:** <option> 组件的类名由 arco-dropdown-option 改为 arco-select-option，并使用 flex 垂直居中布局 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- **dropdown:** <doption> 组件修改使用 flex 垂直居中布局 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))

### 💎 功能优化

- **table:** 在数据为空时，不展示分页组件 ([#684](https://github.com/arco-design/arco-design-vue/pull/684))

### 🆕 新增功能

- **menu:** 支持响应式收缩 ([#700](https://github.com/arco-design/arco-design-vue/pull/700))
- **grid:** 支持响应式配置 ([#693](https://github.com/arco-design/arco-design-vue/pull/693))
- 增加 ssr 支持（beta） ([#675](https://github.com/arco-design/arco-design-vue/pull/675))

### 🐛 问题修复

- **cascader:** 修复严格模式下禁用项仍可通过单选选择器选择的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))
- **cascader:** 修复严格模式下搜索结果没有包含路径选项的问题 ([#701](https://github.com/arco-design/arco-design-vue/pull/701))


## 2.17.0

`2022-02-11`

### 💎 功能优化

- **input:** 增加 input 元素部分原始属性的透传 ([#664](https://github.com/arco-design/arco-design-vue/pull/664))
- **trigger:** 优化自动调整位置后箭头的位置 ([#655](https://github.com/arco-design/arco-design-vue/pull/655))

### 🆕 新增功能

- **image:** 新增 actions 插槽用于自定义预览的操作项 ([#679](https://github.com/arco-design/arco-design-vue/pull/679))
- **modal:** 增加 `title-align` 属性 ([#673](https://github.com/arco-design/arco-design-vue/pull/673))

### 🐛 问题修复

- **image:** 修复旋转方向错误的问题 ([#678](https://github.com/arco-design/arco-design-vue/pull/678))
- **image:** 修复操作项的 `Tooltip` 被遮盖的问题 ([#677](https://github.com/arco-design/arco-design-vue/pull/677))
- **tooltip:** 修复按需加载时丢失 trigger 样式的问题 ([#674](https://github.com/arco-design/arco-design-vue/pull/674))
- **transfer:** 修复搜索功能应该检查选项的问题 ([#659](https://github.com/arco-design/arco-design-vue/pull/659))

### 💅 样式更新

- 修复部分图标默认颜色不统一问题 ([#676](https://github.com/arco-design/arco-design-vue/pull/676))
- **switch:** 修复开关动画偶现抖动问题 ([#656](https://github.com/arco-design/arco-design-vue/pull/656))


## 2.16.2

`2022-01-24`

### 🐛 问题修复

- **date-picker:** `headerValue` 在 `vue 3.2.28` 中报错 ([#643](https://github.com/arco-design/arco-design-vue/pull/643))
- **table:** 修复阻止冒泡导致懒加载失效的问题 ([#641](https://github.com/arco-design/arco-design-vue/pull/641))
- **table:** 修复在展开行展开时，删除后显示空行的问题

### 💅 样式更新

- 自定义 icon 组件增加 fill 属性，解决自定义颜色问题 ([#642](https://github.com/arco-design/arco-design-vue/pull/642))
- **input:** 修复 `input-group` 中使用 input 组件圆角问题 ([#640](https://github.com/arco-design/arco-design-vue/pull/640))


## 2.16.1

`2022-01-21`

### 🐛 问题修复

- **dropdown:** `<dropdown-button>` 组件补全 dropdown 相关属性 ([#637](https://github.com/arco-design/arco-design-vue/pull/637))


## 2.16.0

`2022-01-21`

### 💎 功能优化

- **table:** 内部按钮不再触发 `row-click` 事件 ([#630](https://github.com/arco-design/arco-design-vue/pull/630))

### 🆕 新增功能

- **select:** 增加自定义图标插槽 ([#634](https://github.com/arco-design/arco-design-vue/pull/634))
- **typography:** 新增属性 `copy-delay` 用于自定义复制成功状态消失的延迟时间 ([#632](https://github.com/arco-design/arco-design-vue/pull/632))
- **date-picker:** 增加属性 `value-format` 用于格式化返回值 ([#631](https://github.com/arco-design/arco-design-vue/pull/631))
- **modal:** 增加 `before-open` 和 `before-close` 事件 ([#628](https://github.com/arco-design/arco-design-vue/pull/628))
- **input:** `<input-search>` 组件增加自定义搜素按钮内容的功能 ([#625](https://github.com/arco-design/arco-design-vue/pull/625))
- **form:** 增加表单和相应输入组件的反馈图标功能 ([#622](https://github.com/arco-design/arco-design-vue/pull/622))
- **table:** 增加拖拽排序的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** 增加调整列宽的支持（实验性） ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **table:** 增加 `tbody`、`tr`、`td` 插槽 ([#619](https://github.com/arco-design/arco-design-vue/pull/619))
- **dropdown:** 使用 context 重构组件，支持嵌套使用 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** value 增加对 object 的支持 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** 新增 `dropdown-button` 组件 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **dropdown:** 下拉菜单打开时，为触发元素增加标识类名 ([#608](https://github.com/arco-design/arco-design-vue/pull/608))
- **split:** 属性 `min` `max` 支持设置 px ([#607](https://github.com/arco-design/arco-design-vue/pull/607))

### 🐛 问题修复

- **message:** 修复使用 loading 类型时类型警告的问题 ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **modal:** 修复样式文件缺少 `<button>` 组件样式引用的问题 ([#635](https://github.com/arco-design/arco-design-vue/pull/635))
- **date-picker:** 点击清除按钮的时候不要展开弹出层 ([#633](https://github.com/arco-design/arco-design-vue/pull/633))
- **cascader:** 修复在 `check-strictly` 模式下，搜索中不能选择的问题 ([#627](https://github.com/arco-design/arco-design-vue/pull/627))
- **date-picker:** 返回值在不显示时间选择面板的时候不应该拼接时间 ([#612](https://github.com/arco-design/arco-design-vue/pull/612))
- **typography:** 修复 JSX 使用中存在警告的问题 ([#591](https://github.com/arco-design/arco-design-vue/pull/591))
- **icon:** 修复 2.15.0 版本缺失的 icon-relation 图标

### 💅 样式更新

- **button:** 修复链接模式文字未居中的问题 ([#636](https://github.com/arco-design/arco-design-vue/pull/636))
- **input:** 修复 `<input-group>` 组件包裹 `<select>` 组件的样式问题 ([#588](https://github.com/arco-design/arco-design-vue/pull/588))


## 2.15.1

`2022-01-15`

### 🐛 问题修复

- **grid:** 修复组件名注册错误问题 ([#581](https://github.com/arco-design/arco-design-vue/pull/581))


## 2.15.0

`2022-01-14`

### 💎 功能优化

- 优化组件内置的选择框不会受到外部选择框组的控制 ([#569](https://github.com/arco-design/arco-design-vue/pull/569))
- **select:** 优化加载中状态显示 ([#557](https://github.com/arco-design/arco-design-vue/pull/557))

### 🆕 新增功能

- **input-tag:** 增加 `uniqueValue` 属性，支持输入时验证值不重复 ([#578](https://github.com/arco-design/arco-design-vue/pull/578))
- **modal:** 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **drawer:** 增加 `escToClose` 属性并默认开启 ([#577](https://github.com/arco-design/arco-design-vue/pull/577))
- **grid:** 新增基于 grid 的布局组件 `Grid` `Grid.Item` ([#576](https://github.com/arco-design/arco-design-vue/pull/576))
- **table:** `sortable.sorter` 增加 boolean 类型，支持服务器端排序 ([#575](https://github.com/arco-design/arco-design-vue/pull/575))
- 增加 `icon` 组件，并提供对 iconfont.cn 的支持 ([#574](https://github.com/arco-design/arco-design-vue/pull/574))
- **cascader:** 增加 loading 属性 ([#558](https://github.com/arco-design/arco-design-vue/pull/558))

### 🐛 问题修复

- **date-picker:** 修复事件参数缺失的问题 ([#579](https://github.com/arco-design/arco-design-vue/pull/579))

### 💅 样式更新

- **tag:** 修复 checkable 状态样式错误的问题 ([#570](https://github.com/arco-design/arco-design-vue/pull/570))
- **button:** 修复按钮组中 iconOnly 按钮的对齐问题 ([#567](https://github.com/arco-design/arco-design-vue/pull/567))
- **input:** 修复暗黑模式下背景颜色错误的问题 ([#560](https://github.com/arco-design/arco-design-vue/pull/560))


## 2.14.3

`2022-01-12`

### 🐛 问题修复

- **input:** 修复 input-search 在 button 模式属性失效的问题 ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **input-number:** 修复输入时光标位置改变的问题 ([#552](https://github.com/arco-design/arco-design-vue/pull/552))
- **select:** 调用虚拟列表的 `scrollTo` 函数时缺失了参数 ([#543](https://github.com/arco-design/arco-design-vue/pull/543))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- **steps:** 修复 dot 模式下可以开启 small 的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **form:** label-col 改用 flex 布局，解决 mini 尺寸下高度错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **table:** 修复 table 内容超出容器，导致某些情况下边框不显示的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **select:** 修复按需加载没有导入样式的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **input:** 修复在 Safari 浏览器下 disabled 状态字体颜色错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **textarea:** 修复在 Firefox 浏览器下行高设置失效的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))
- **statistic:** 修复动态赋值问题 ([#534](https://github.com/arco-design/arco-design-vue/pull/534))

### 💅 样式更新

- **button:** 修复 onlyIcon 模式图标未对齐问题 ([#538](https://github.com/arco-design/arco-design-vue/pull/538))


## 2.14.1

`2022-01-08`

### 🐛 问题修复

- **form:** 修复form默认大小样式问题 ([#526](https://github.com/arco-design/arco-design-vue/pull/526))
- **config-provider:** 修复按需加载样式问题 ([#526](https://github.com/arco-design/arco-design-vue/pull/526))


## 2.14.0

`2022-01-07`

### 🆕 新增功能

- **table:** 增加 hideExpandButtonOnEmpty 属性 ([#520](https://github.com/arco-design/arco-design-vue/pull/520))
- **upload:** 增加 imagePreview 属性，可以使用内置图片预览功能 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** 当 `listType` 为图片类时，默认设置 accept 为 `image/*` ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **upload:** 增加 `showOnExceedLimit` 属性 ([#517](https://github.com/arco-design/arco-design-vue/pull/517))
- **drawer:** 当没有设置 title 和 closable 时，隐藏标题栏 ([#515](https://github.com/arco-design/arco-design-vue/pull/515))
- **statistic:** value 值支持响应式修改 ([#514](https://github.com/arco-design/arco-design-vue/pull/514))
- **config-provider:** 增加 `size` 属性 ([#513](https://github.com/arco-design/arco-design-vue/pull/513))

### 🐛 问题修复

- **image:** `Image.PreviewGroup` 应该优先收集 `previewProps.src` ([#522](https://github.com/arco-design/arco-design-vue/pull/522))
- **table:** 修复 x 轴 resize 问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** 修复存在固定列时，展开行宽度设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **table:** 修复存在子树时，复选框全选设置错误的问题 ([#519](https://github.com/arco-design/arco-design-vue/pull/519))
- **trigger:** 修复某些情况下弹出框箭头位置错误的问题 ([#518](https://github.com/arco-design/arco-design-vue/pull/518))
- **input:** 修复 change 事件触发问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))
- **input:** 修复当存在前后置标签时，样式设置位置错误的问题 ([#516](https://github.com/arco-design/arco-design-vue/pull/516))

### 💅 样式更新

- **dropdown:** 修复选项后缀样式问题 ([#523](https://github.com/arco-design/arco-design-vue/pull/523))


## 2.13.0

`2021-12-31`

### ⚠️ 重点注意

- **form:** `form-item` 组件增加一个新的 `content-wrapper` div 元素包裹原先 `content` div 元素，以来支持新的布局方式 ([#488](https://github.com/arco-design/arco-design-vue/pull/488))

### 🆕 新增功能

- **form:** 增加 `autoLabelWidth` 属性，支持标签宽度自适应 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** 增加 `labelColFlex` 属性，支持标签宽度设置 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **form:** 增加 `mergeProps` 属性，支持自定义属性和事件覆写 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- **table:** 增加 `loadMore` 属性，支持子树懒加载 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** 增加 `filterIconAlignLeft` 属性 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **table:** 增加 `change` 事件，可获取处理后数据 ([#485](https://github.com/arco-design/arco-design-vue/pull/485))
- **upload:** 增加 `show-link` 属性 ([#483](https://github.com/arco-design/arco-design-vue/pull/483))
- **auto-complete:** 增加 input 中的插槽和 option 插槽支持 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** 增加 input 中的插槽和 option 插槽支持 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **mention:** 文本域类型下的下拉菜单跟随提示文字显示 ([#482](https://github.com/arco-design/arco-design-vue/pull/482))
- **cascader:** 增加 `load-more` 属性，支持数据懒加载 ([#476](https://github.com/arco-design/arco-design-vue/pull/476))
- **grid:** `Row` 新增属性 `wrap` ([#471](https://github.com/arco-design/arco-design-vue/pull/471))
- **descriptions:** `value` 和 `label` 插槽增加 index、data 参数 ([#470](https://github.com/arco-design/arco-design-vue/pull/470))

### 🐛 问题修复

- **pagination:** 修复跳转输入框失焦时没有清除值的问题 ([#487](https://github.com/arco-design/arco-design-vue/pull/487))
- **input-tag:** 修复中文输入法问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** 修复搜索时中文输入法问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **select:** 修复在 `drawer` 中 placeholder 显示不全的问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- **form:** 修复表单项 help 内容显示错误的问题 ([#480](https://github.com/arco-design/arco-design-vue/pull/480))
- **table:** 修复 `sortOrder ` 置空失效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** 修复 `expand-icon` 插槽在子树中不生效的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **table:** 修复固定列在表格尺寸动态变化时阴影不显示的问题 ([#478](https://github.com/arco-design/arco-design-vue/pull/478))
- **date-picker:** 修复 `readonly` 无效的问题 ([#472](https://github.com/arco-design/arco-design-vue/pull/472))

### 💅 样式更新

- **steps:** 修复下一步错误连线颜色错误问题 ([#477](https://github.com/arco-design/arco-design-vue/pull/477))


## 2.12.2

`2021-12-27`

### 🐛 问题修复

- **modal:** 修复 modalStyle 失效的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))
- **modal:** 修复 flex 布局导致垂直居中且超出高度显示不全的问题 ([#459](https://github.com/arco-design/arco-design-vue/pull/459))


## 2.12.1

`2021-12-24`

### 🐛 问题修复

- **upload:** 修复照片墙模式错误的问题 ([#457](https://github.com/arco-design/arco-design-vue/pull/457))


## 2.12.0

`2021-12-24`

### ⚠️ 重点注意

- **modal:** 修改 wrapper 层展示 modal 的方式，并添加 `width` 和 `top` 属性 ([#454](https://github.com/arco-design/arco-design-vue/pull/454))
- **textarea:** max-length 的计算不再排除回车情况，同 React 版本保持一致 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input:** 修改 change 事件仅在值发生改变时触发 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))
- **input-number:** 修改 change 事件仅在失焦和按下回车时触发，解决受控不能输入的问题 ([#452](https://github.com/arco-design/arco-design-vue/pull/452))

### 💎 功能优化

- **badge:** count 为 0 时不再渲染徽标 ([#445](https://github.com/arco-design/arco-design-vue/pull/445))

### 🆕 新增功能

- 图标类组件增加 size 属性 ([#455](https://github.com/arco-design/arco-design-vue/pull/455))
- **input:** `max-length` 增加 `errorOnly` 属性，增加 `word-slice` 属性 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **textarea:** `max-length` 增加 `errorOnly` 属性，增加 `word-slice` 属性 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **input-number:** 增加对 input 插槽的支持 ([#451](https://github.com/arco-design/arco-design-vue/pull/451))
- **link:** 增加 click 事件 ([#450](https://github.com/arco-design/arco-design-vue/pull/450))
- **drawer:** 增加 unmount-on-close 属性 ([#449](https://github.com/arco-design/arco-design-vue/pull/449))
- **switch:** 增加 `checked-value` 和 `unchecked-value` 属性 ([#444](https://github.com/arco-design/arco-design-vue/pull/444))
- **switch:** 增加 `checked-color` 和 `unchecked-color` 属性 ([#444](https://github.com/arco-design/arco-design-vue/pull/444))

### 🐛 问题修复

- **modal:** 修复按钮内容不能动态修改的问题 ([#453](https://github.com/arco-design/arco-design-vue/pull/453))
- **affix:** 修复与 anchor 组件组合使用，显示 warning 的问题 ([#448](https://github.com/arco-design/arco-design-vue/pull/448))
- **progress:** 修复显示数值精度问题 ([#447](https://github.com/arco-design/arco-design-vue/pull/447))
- **upload:** 修复按钮模式下 tip 没有显示的问题 ([#446](https://github.com/arco-design/arco-design-vue/pull/446))
- **upload:** 修复 `upload` 组件的禁用样式不生效的 bug ([#430](https://github.com/arco-design/arco-design-vue/pull/430))

### 💅 样式更新

- **table:** 修复 table 滚动模式下最后一行多余边框的问题 ([#456](https://github.com/arco-design/arco-design-vue/pull/456))


## 2.11.1

`2021-12-20`

### 🐛 问题修复

- **input-tag:** 修复 resize 导致的中文输入失效的问题 ([#428](https://github.com/arco-design/arco-design-vue/pull/428))
- **dropdown:** 修复使用 JSX 时，Group 不可用的问题 ([#427](https://github.com/arco-design/arco-design-vue/pull/427))
- **select:** 修复使用 JSX 时，Group 不可用的问题 ([#427](https://github.com/arco-design/arco-design-vue/pull/427))


## 2.11.0

`2021-12-17`

### 🆕 新增功能

- **upload:** 增加 `download` 属性 ([#418](https://github.com/arco-design/arco-design-vue/pull/418))
- **space:** 新增属性 `fill` ([#415](https://github.com/arco-design/arco-design-vue/pull/415))
- **menu:** `sub-menu` 和 `menu-item` 新增 icon 的 slot ([#412](https://github.com/arco-design/arco-design-vue/pull/412))
- **table:** `columns` 新增 cellStyle 属性 ([#411](https://github.com/arco-design/arco-design-vue/pull/411))
- **upload:** 新增 `show-remove-buttoon` 、`show-retry-button`、`show-cancel-button` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **upload:** 新增 `imageLoading` 属性 ([#396](https://github.com/arco-design/arco-design-vue/pull/396))
- **drawer:** 新增属性 `footer` ([#394](https://github.com/arco-design/arco-design-vue/pull/394))

### 🐛 问题修复

- **upload:** 修复上传中的图标位置不对的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** 修复拖拽上传文件夹时，`beforeUpload` 的第二个参数获取到的不是全部文件的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **upload:** 修复拖拽上传时，鼠标进入内部文字，拖拽样式闪动的问题 ([#417](https://github.com/arco-design/arco-design-vue/pull/417))
- **table:** 修复固定列模式下，表格尺寸变化导致表头和主体宽度不一致问题 ([#410](https://github.com/arco-design/arco-design-vue/pull/410))
- **tabs:** 修复标签栏宽度变化时，没有重新计算滚动的问题 ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **tabs:** 修复标签选项宽度变化时，指示器宽度不能跟随更新的问题 ([#409](https://github.com/arco-design/arco-design-vue/pull/409))
- **input-tag:** 修复某些情况下内部 input 大小计算错误的问题 ([#408](https://github.com/arco-design/arco-design-vue/pull/408))
- **input-number:** 修复 `model-value` 为 0 时展示错误的问题 ([#407](https://github.com/arco-design/arco-design-vue/pull/407))
- **trigger:** 修复容器尺寸变化导致弹出层位置错误的问题 ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **trigger:** 修复嵌套使用中 hover 方式导致弹出层关闭的问题 ([#406](https://github.com/arco-design/arco-design-vue/pull/406))
- **tree-select:** 修复设置 key 字段名的时候搜索失效的问题 ([#405](https://github.com/arco-design/arco-design-vue/pull/405))
- **anchor:** 修复加载后不会定位到 hash 位置的问题 ([#400](https://github.com/arco-design/arco-design-vue/pull/400))
- **cascader:** 修复层级 totalLevel 计算错误的问题 ([#399](https://github.com/arco-design/arco-design-vue/pull/399))
- **modal:** 修复 `alignCenter` 属性不生效的问题 ([#384](https://github.com/arco-design/arco-design-vue/pull/384))
- **modal:** 调整组件的 `alignCenter` 属性默认为 `true` ([#384](https://github.com/arco-design/arco-design-vue/pull/384))

### 💅 样式更新

- **menu:** 修复侧边栏可折叠的时候高度溢出的问题 ([#416](https://github.com/arco-design/arco-design-vue/pull/416))


## 2.10.1

`2021-12-14`

### 🐛 问题修复

- **cascader:** 修复多选模式下存在空子菜单时计数错误的问题 ([#388](https://github.com/arco-design/arco-design-vue/pull/388))
- **dropdown:** 修复 <doption> 组件 disabled 失效和属性继承的问题 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** 修复 options 属性中 disabled 失效的问题 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **select:** 修复 bordered 属性未生效的问题，添加示例 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- **trigger:** 修复弹出层尺寸变化不会触发更新的问题 ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **trigger:** 修复 `align-point` 模式下位置和自适应不生效的问题 ([#382](https://github.com/arco-design/arco-design-vue/pull/382))
- **card:** 修复 slots 内容存在不更新的问题 ([#380](https://github.com/arco-design/arco-design-vue/pull/380))

### 💅 样式更新

- **popconfirm:** 修正组件样式问题，并调整按钮默认大小为 `mini`，同React保持一致 ([#390](https://github.com/arco-design/arco-design-vue/pull/390))
- **input-tag:** 修复组件高度问题 ([#383](https://github.com/arco-design/arco-design-vue/pull/383))
- **input-tag:** 修复组件关闭按钮宽度问题 ([#383](https://github.com/arco-design/arco-design-vue/pull/383))

### 🆎 类型修正

- **modal:** `ModalConfig ` 增加 `simple` 属性注解 ([#389](https://github.com/arco-design/arco-design-vue/pull/389))


## 2.10.0

`2021-12-10`

### 💎 功能优化

- **select:** 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))
- **cascader:** 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 新增功能

- **tabs:** 增加 headerPadding 属性并默认开启 ([#362](https://github.com/arco-design/arco-design-vue/pull/362))
- **form:** `form-item` 增加布局和类名相关属性 ([#361](https://github.com/arco-design/arco-design-vue/pull/361))
- **table:** 增加 span-method 属性 ([#360](https://github.com/arco-design/arco-design-vue/pull/360))
- **collapse:** key增加对number的支持 ([#358](https://github.com/arco-design/arco-design-vue/pull/358))
- **dropdown:** 增加 footer 插槽 ([#350](https://github.com/arco-design/arco-design-vue/pull/350))
- **cascader:** 增加 checkStrictly 属性 ([#349](https://github.com/arco-design/arco-design-vue/pull/349))
- **select:** 增加 fallback-option 和 show-extra-options 属性 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **grid:** 组件 `a-col` 新增属性 `flex` ([#340](https://github.com/arco-design/arco-design-vue/pull/340))

### 🐛 问题修复

- **input-number:** 修复可重复输入 `-` 和 `.` 的问题 ([#359](https://github.com/arco-design/arco-design-vue/pull/359))
- **statistic:** 修复 precision 为 0 时没有生效的问题 ([#357](https://github.com/arco-design/arco-design-vue/pull/357))
- **tabs:** 修复可编辑模式下选项卡 closable 失效的问题 ([#356](https://github.com/arco-design/arco-design-vue/pull/356))
- **menu:** 修复菜单宽度没有撑满父元素的问题 ([#346](https://github.com/arco-design/arco-design-vue/pull/346))
- **carousel:** out子项内未隐藏 ([#343](https://github.com/arco-design/arco-design-vue/pull/343))
- **select:** 修复组件在 JSX 使用中出现警告、插槽不能使用变量的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- **select:** 修复多选输入框首次点击图标不能弹出下拉菜单的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))

### 💅 样式更新

- **textarea:** 修正禁止模式的样式问题 ([#355](https://github.com/arco-design/arco-design-vue/pull/355))
- **message:** 使用 flex 布局方式展示信息 ([#354](https://github.com/arco-design/arco-design-vue/pull/354))
- **modal:** 修复 modal 信息展示模式错误的问题 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **modal:** 简单模式下不展示标题栏关闭按钮 ([#351](https://github.com/arco-design/arco-design-vue/pull/351))
- **input-tag:** 优化标签动画和关闭按钮样式 ([#345](https://github.com/arco-design/arco-design-vue/pull/345))


## 2.9.0

`2021-12-03`

### 🆕 新增功能

- **drawer:** `Drawer` 支持 `okButtonProps` 和  `cancelButtonProps` 属性 ([#325](https://github.com/arco-design/arco-design-vue/pull/325))
- **pagination:** 修改和增加插槽，支持模板自定义 ([#324](https://github.com/arco-design/arco-design-vue/pull/324))
- **tree:** 新增属性 `default-expand-selected` `default-expand-checked` `auto-expand-parent` ([#322](https://github.com/arco-design/arco-design-vue/pull/322))
- **steps:** 增加 title 属性 ([#316](https://github.com/arco-design/arco-design-vue/pull/316))

### 🐛 问题修复

- **table:** 修复树形展开按钮触发表单提交的问题 ([#321](https://github.com/arco-design/arco-design-vue/pull/321))
- **spin:** 修复容器模式下切换状态导致子组件重新加载的问题 ([#320](https://github.com/arco-design/arco-design-vue/pull/320))
- **space:** 修复渲染 v-if 节点的问题 ([#318](https://github.com/arco-design/arco-design-vue/pull/318))


## 2.8.0

`2021-12-01`

### ⚠️ 重点注意

- **spin:** 容器模式的非加载情况下，不会再额外增加一层 `<div>`

### 🆕 新增功能

- **textarea:** 增加最小行和最大行的支持 ([#309](https://github.com/arco-design/arco-design-vue/pull/309))
- **select:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **cascader:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **input-tag:** 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))
- **menu:** 新增属性  `auto-open-selected` ([#306](https://github.com/arco-design/arco-design-vue/pull/306))
- **result:** 增加 `extra` 插槽和 `default` 插槽 ([#302](https://github.com/arco-design/arco-design-vue/pull/302))
- **list:** 增加空数据的展示 ([#296](https://github.com/arco-design/arco-design-vue/pull/296))
- 增加 body 上的 font-family ([#287](https://github.com/arco-design/arco-design-vue/pull/287))

### 🐛 问题修复

- **form:** 修复 `setFields` 方法设定空值失效的问题 ([#311](https://github.com/arco-design/arco-design-vue/pull/311))
- **auto-complete:** 修复 disabled 不可用的问题 ([#310](https://github.com/arco-design/arco-design-vue/pull/310))
- **pagination:** 修复 `disabled` 属性设置为 true 时，输入框和条数选择器未禁用的问题 ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **drawer:** 修复设置 `popup-container` 属性时，抽屉仍然是 `fixed` 布局的问题 ([#297](https://github.com/arco-design/arco-design-vue/pull/297))
- **input-number:** 修复 button 模式下按钮没有添加 size 的问题 ([#293](https://github.com/arco-design/arco-design-vue/pull/293))
- **tree:** 动态加载节点后更新勾选状态 ([#206](https://github.com/arco-design/arco-design-vue/pull/206))

### 💅 样式更新

- **radio:** 去除 button 模式下选中加粗的效果 ([#308](https://github.com/arco-design/arco-design-vue/pull/308))
- **cascader:** 去除选项选中加粗的效果 ([#308](https://github.com/arco-design/arco-design-vue/pull/308))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- **progress:** 增加 `track-color` 属性 ([#277](https://github.com/arco-design/arco-design-vue/pull/277))
- **pagination:** 增加 `base-size` & `buffer-size` 属性 ([#275](https://github.com/arco-design/arco-design-vue/pull/275))
- 增加对 web-types 和 vetur 的智能提示支持 ([#272](https://github.com/arco-design/arco-design-vue/pull/272))
- **form:** 增加 `rules` 属性 ([#271](https://github.com/arco-design/arco-design-vue/pull/271))
- **dropdown:** 增加 `disabled` 属性 ([#270](https://github.com/arco-design/arco-design-vue/pull/270))
- **descriptions:** 增加 `align` 属性 ([#268](https://github.com/arco-design/arco-design-vue/pull/268))
- **table:** 增加 `footer` 插槽 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **table:** 常规模式下表格宽度大于容器时会开启滚动条 ([#266](https://github.com/arco-design/arco-design-vue/pull/266))
- **avatar:** 支持 `maxStyle` 和 `maxPopoverTriggerProps` 属性。 ([#242](https://github.com/arco-design/arco-design-vue/pull/242))
- **modal:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **drawer:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **popconfirm:** 增加 `on-before-ok` 和 `on-before-cancel` 属性事件 ([#229](https://github.com/arco-design/arco-design-vue/pull/229))
- **link:** 增加通过 `icon` 属性/插槽设置图标 ([#226](https://github.com/arco-design/arco-design-vue/pull/226))
- **mention:** 增加 `type`  属性 ([#205](https://github.com/arco-design/arco-design-vue/pull/205))

### 🐛 问题修复

- **input:** 修复数字键盘回车键没有触发 `press-enter` 的问题 ([#273](https://github.com/arco-design/arco-design-vue/pull/273))
- **modal:** 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **drawer:** 修复初始触发 `open` 事件的问题 ([#267](https://github.com/arco-design/arco-design-vue/pull/267))
- **menu:** `trigger-props` 不生效 ([#265](https://github.com/arco-design/arco-design-vue/pull/265))
- **menu:** 横向的菜单项收起再展开的时候没有正常显示 ([#264](https://github.com/arco-design/arco-design-vue/pull/264))

### 💅 样式更新

- **steps:** 修复竖直步骤条连线颜色的问题 ([#276](https://github.com/arco-design/arco-design-vue/pull/276))
- 修复新版浏览器中选择图标会出现外边框的问题 ([#274](https://github.com/arco-design/arco-design-vue/pull/274))
- **descriptions:** 修改 value 区域样式，支持换行文本 ([#269](https://github.com/arco-design/arco-design-vue/pull/269))
- **tree:** 让树节点的内容垂直居中 ([#260](https://github.com/arco-design/arco-design-vue/pull/260))


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
