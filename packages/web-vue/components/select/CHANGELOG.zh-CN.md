```yaml
changelog: true
```

## 2.47.1

`2023-06-09`

### 🐛 问题修复

- 修复搜索模式下鼠标光标定位问题 ([#2487](https://github.com/arco-design/arco-design-vue/pull/2487))


## 2.47.0

`2023-06-02`

### 🆕 新增功能

- 空状态下可以显示 header 和 footer ([#2429](https://github.com/arco-design/arco-design-vue/pull/2429))


## 2.46.0

`2023-05-12`

### 💎 功能优化

- 选择框增加 title 提示 ([#2412](https://github.com/arco-design/arco-design-vue/pull/2412))


## 2.45.3

`2023-04-28`

### 🐛 问题修复

- 修复输入法状态下 Enter 键会触发选择的问题 ([#2378](https://github.com/arco-design/arco-design-vue/pull/2378))


## 2.45.2

`2023-04-21`

### 💅 样式更新

- 修复 select-view-input 的 line-height 和 height 不一致 ([#2346](https://github.com/arco-design/arco-design-vue/pull/2346))


## 2.44.6

`2023-03-31`

### 🐛 问题修复

- 修复设置 modelValue 为 undefined 失效的问题 ([#2285](https://github.com/arco-design/arco-design-vue/pull/2285))


## 2.44.3

`2023-03-24`

### 🐛 问题修复

- 修复动态 slot options 导致 dropdown 为空的问题 ([#2265](https://github.com/arco-design/arco-design-vue/pull/2265))
- 不允许自动创建空字符串条目。含有空字符串的下拉选项，清空时将值设置为 `undefined` ([#2257](https://github.com/arco-design/arco-design-vue/pull/2257))


## 2.44.2

`2023-03-17`

### 🐛 问题修复

- 下拉选项值支持空字符串 ([#2190](https://github.com/arco-design/arco-design-vue/pull/2190))


## 2.43.0

`2023-02-10`

### 🆕 新增功能

- 新增 `defaultActiveFirstOption` 属性 ([#2107](https://github.com/arco-design/arco-design-vue/pull/2107))
- 增加 header 插槽 ([#2099](https://github.com/arco-design/arco-design-vue/pull/2099))


## 2.41.0

`2022-12-30`

### 💅 样式更新

- 统一 `select` 组件单选和多选时后缀图标为 `arrow-icon`。 ([#2005](https://github.com/arco-design/arco-design-vue/pull/2005))


## 2.38.0

`2022-10-28`

### 🐛 问题修复

- 修复 formatLabel 在无数据时报错的问题 ([#1797](https://github.com/arco-design/arco-design-vue/pull/1797))


## 2.38.0-beta.1

`2022-10-14`

### 💎 功能优化

- 增加已选择项的缓存，优化在远程搜索时的 label 显示问题 ([#1731](https://github.com/arco-design/arco-design-vue/pull/1731))


## 2.37.4

`2022-09-30`

### 💅 样式更新

- 修复自定义标签颜色显示错误的问题 ([#1703](https://github.com/arco-design/arco-design-vue/pull/1703))


## 2.37.2

`2022-09-21`

### 🐛 问题修复

- 修复键盘交互中下拉菜单没有跟随滚动的问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))
- 修复内置虚拟滚动条部分情况下报错的问题 ([#1655](https://github.com/arco-design/arco-design-vue/pull/1655))


## 2.36.1

`2022-09-09`

### 🐛 问题修复

- 修复 option 插槽参数错误的问题 ([#1607](https://github.com/arco-design/arco-design-vue/pull/1607))


## 2.32.1

`2022-07-01`

### 🐛 问题修复

- 修复在火狐浏览器下搜索模式的点击展开问题 ([#1371](https://github.com/arco-design/arco-design-vue/pull/1371))


## 2.30.0

`2022-06-10`

### 🐛 问题修复

- 修复远程搜索与 fieldNames 同时使用，没有显示选项的问题 ([#1271](https://github.com/arco-design/arco-design-vue/pull/1271))

### 💅 样式更新

- 修复在选项 label 为空时，选择框塌陷的问题 ([#1274](https://github.com/arco-design/arco-design-vue/pull/1274))


## 2.29.0

`2022-05-27`

### 🐛 问题修复

- 修复 inputValue 受控失效的问题 ([#1204](https://github.com/arco-design/arco-design-vue/pull/1204))


## 2.27.1

`2022-05-16`

### 🐛 问题修复

- 修复使用 options 属性时，分组选项不能选择的问题 ([#1141](https://github.com/arco-design/arco-design-vue/pull/1141))


## 2.27.0

`2022-05-13`

### 🐛 问题修复

- 修复 options 属性中 `render`、`tagProps` 不生效的问题 ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))

### 💅 样式更新

- 修复开启搜索时，禁用状态下鼠标指针错误的问题 ([#1114](https://github.com/arco-design/arco-design-vue/pull/1114))


## 2.24.0

`2022-04-15`

### 🆎 类型修正

- `Option、OptionData、GroupOption`  接口名修改为 `SelectOption、SelectOptionData、SelectOptionGroup` ([#983](https://github.com/arco-design/arco-design-vue/pull/983))


## 2.23.0

`2022-04-08`

### 🆕 新增功能

- 增加 trigger 插槽 ([#952](https://github.com/arco-design/arco-design-vue/pull/952))


## 2.22.0

`2022-04-01`

### 💎 功能优化

- 加载状态下不再可以触发回车事件 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🆕 新增功能

- 增加 `field-names` 属性，允许自定义字段 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))

### 🐛 问题修复

- 修复 `allow-create` 模式下会出现重复选项的问题 ([#911](https://github.com/arco-design/arco-design-vue/pull/911))


## 2.21.2

`2022-03-29`

### 🐛 问题修复

- 修复 `fallback-option` 属性设置 false 失效的问题 ([#893](https://github.com/arco-design/arco-design-vue/pull/893))
- 修复多选模式下选择的标签默认不显示删除的问题 ([#886](https://github.com/arco-design/arco-design-vue/pull/886))


## 2.20.1

`2022-03-21`

### 💅 样式更新

- 修复选项 #icon 插槽的垂直居中问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))
- 修复选项超出宽度后没有显示省略的问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.20.0

`2022-03-18`

### 🐛 问题修复

- 修复开启虚拟列表时，搜索功能失败的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))
- 修复小键盘 `Enter` 键不能选中的问题 ([#841](https://github.com/arco-design/arco-design-vue/pull/841))


## 2.18.0

`2022-03-04`

### 💎 功能优化

- 选择框展示使用 flex 布局方式 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))
- trigger-props 属性可以覆盖默认属性 ([#778](https://github.com/arco-design/arco-design-vue/pull/778))

### 🐛 问题修复

- 修复 label 属性失效的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))
- 修复 option 的属性没有同步更新的问题 ([#777](https://github.com/arco-design/arco-design-vue/pull/777))


## 2.18.0-beta.2

`2022-02-25`

### 🆕 新增功能

- 增加 `search-delay` 属性，并默认为 `500ms` ([#728](https://github.com/arco-design/arco-design-vue/pull/728))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ 重点注意

- 组件使用 context 重构，允许对 Option 组件的封装使用 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- 增加 `valueKey` 属性，选项 value 支持 object 形式 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))
- <option> 组件的类名由 arco-dropdown-option 改为 arco-select-option，并使用 flex 垂直居中布局 ([#688](https://github.com/arco-design/arco-design-vue/pull/688))


## 2.16.0

`2022-01-21`

### 🆕 新增功能

- 增加自定义图标插槽 ([#634](https://github.com/arco-design/arco-design-vue/pull/634))


## 2.15.0

`2022-01-14`

### 💎 功能优化

- 优化加载中状态显示 ([#557](https://github.com/arco-design/arco-design-vue/pull/557))


## 2.14.3

`2022-01-12`

### 🐛 问题修复

- 调用虚拟列表的 `scrollTo` 函数时缺失了参数 ([#543](https://github.com/arco-design/arco-design-vue/pull/543))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- 修复按需加载没有导入样式的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.13.0

`2021-12-31`

### 🐛 问题修复

- 修复搜索时中文输入法问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))
- 修复在 `drawer` 中 placeholder 显示不全的问题 ([#481](https://github.com/arco-design/arco-design-vue/pull/481))


## 2.11.1

`2021-12-20`

### 🐛 问题修复

- 修复使用 JSX 时，Group 不可用的问题 ([#427](https://github.com/arco-design/arco-design-vue/pull/427))


## 2.10.1

`2021-12-14`

### 🐛 问题修复

- 修复 options 属性中 disabled 失效的问题 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))
- 修复 bordered 属性未生效的问题，添加示例 ([#385](https://github.com/arco-design/arco-design-vue/pull/385))


## 2.10.0

`2021-12-10`

### 💎 功能优化

- 输入框可编辑时，点击不会关闭下拉菜单 ([#348](https://github.com/arco-design/arco-design-vue/pull/348))

### 🆕 新增功能

- 增加 fallback-option 和 show-extra-options 属性 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))

### 🐛 问题修复

- 修复组件在 JSX 使用中出现警告、插槽不能使用变量的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))
- 修复多选输入框首次点击图标不能弹出下拉菜单的问题 ([#347](https://github.com/arco-design/arco-design-vue/pull/347))


## 2.8.0

`2021-12-01`

### 🆕 新增功能

- 增加 `tagProps` 的支持 ([#307](https://github.com/arco-design/arco-design-vue/pull/307))


## 2.6.0

`2021-11-19`

### 🆕 新增功能

- 增加 `footer` 插槽 ([#201](https://github.com/arco-design/arco-design-vue/pull/201))
- 增加 `trigger-props` 属性 ([#197](https://github.com/arco-design/arco-design-vue/pull/197))

### 🐛 问题修复

- 修复 `option` 插槽没有传出 `data` 参数的问题 ([#200](https://github.com/arco-design/arco-design-vue/pull/200))


## 2.5.0

`2021-11-18`

### ⚠️ 重点注意

- 将 2.4.0 添加的 `options.label` 的自定义渲染移动到 `options.render` 上 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))
- `<option>` 添加 label 属性支持 ([#183](https://github.com/arco-design/arco-design-vue/pull/183))


## 2.4.0

`2021-11-17`

### 🆕 新增功能

- 增加 `option` 插槽 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))
- `options.label` 支持自定义渲染 ([#170](https://github.com/arco-design/arco-design-vue/pull/170))


## 2.1.0

`2021-11-05`

### 🐛 问题修复

- 修复 `#empty` 插槽丢失的问题 ([#96](https://github.com/arco-design/arco-design-vue/pull/96))


## 2.0.3

`2021-10-29`

### 🐛 问题修复

- 修复清除按钮在多选模式下不显示的问题 ([#38](https://github.com/arco-design/arco-design-vue/pull/38))

