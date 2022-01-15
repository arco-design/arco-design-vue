```yaml
changelog: true
```

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
