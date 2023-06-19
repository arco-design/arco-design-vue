```yaml
changelog: true
```

## 2.47.0

`2023-06-02`

### 🐛 问题修复

- 添加 getDefaultValueFormat 解决周选择器和季度选择器的v-model 问题 ([#2437](https://github.com/arco-design/arco-design-vue/pull/2437))


## 2.46.1

`2023-05-26`

### 🐛 问题修复

- 修复日期范围选择器年、月、季度模式的箭头显示逻辑 ([#2451](https://github.com/arco-design/arco-design-vue/pull/2451))


## 2.46.0

`2023-05-12`

### 🆎 类型修正

- 日期选择器 ([#2359](https://github.com/arco-design/arco-design-vue/pull/2359))


## 2.45.2

`2023-04-21`

### 🐛 问题修复

- 修复只使用面板情况下的样式问题 ([#2349](https://github.com/arco-design/arco-design-vue/pull/2349))


## 2.45.0

`2023-04-07`

### 🆕 新增功能

- 增加 abbreviation 属性，控制月份是否显示简称 ([#2264](https://github.com/arco-design/arco-design-vue/pull/2264))

### 🐛 问题修复

- 修复 exchange-time 在选择时失效的问题 ([#2302](https://github.com/arco-design/arco-design-vue/pull/2302))


## 2.44.3

`2023-03-24`

### 🐛 问题修复

- 修复年份范围选择器存在的问题 ([#2270](https://github.com/arco-design/arco-design-vue/pull/2270))


## 2.43.1

`2023-02-17`

### 🐛 问题修复

- 修复因dayjs不支持季度解析导致返回错误的问题 ([#2110](https://github.com/arco-design/arco-design-vue/pull/2110))


## 2.43.0

`2023-02-10`

### 🆕 新增功能

- 增加 `disabled-input` 属性，可以禁用键盘输入 ([#2072](https://github.com/arco-design/arco-design-vue/pull/2072))


## 2.42.0

`2023-01-13`

### 🆕 新增功能

- 增加 blur 事件，可以在表单中支持相应检验 ([#1958](https://github.com/arco-design/arco-design-vue/pull/1958))


## 2.41.0

`2022-12-30`

### 🆕 新增功能

- `date-picker` 支持 `prefix` 插槽。 ([#1997](https://github.com/arco-design/arco-design-vue/pull/1997))


## 2.40.1

`2022-12-23`

### 🐛 问题修复

- 修复在国际化下面板文案显示错误的问题 ([#1965](https://github.com/arco-design/arco-design-vue/pull/1965))


## 2.40.0

`2022-12-09`

### 🐛 问题修复

- 修复 `Form` 组件的 `feedback` 属性在  `date-picker` 组件不生效的 bug。 ([#1932](https://github.com/arco-design/arco-design-vue/pull/1932))


## 2.39.0

`2022-11-18`

### 🐛 问题修复

- 修复选择年范围时无法跳转10年 ([#1847](https://github.com/arco-design/arco-design-vue/pull/1847))


## 2.38.1

`2022-11-04`

### 🐛 问题修复

- 修复内部属性错误问题 ([#1818](https://github.com/arco-design/arco-design-vue/pull/1818))


## 2.38.0-beta.2

`2022-10-21`

### 🐛 问题修复

- 修复在 safari 下 disabled 样式错误的问题 ([#1770](https://github.com/arco-design/arco-design-vue/pull/1770))


## 2.35.2

`2022-08-29`

### 🐛 问题修复

- 修复部分模式下选择面板年月选择时单击选择事件异常 ([#1562](https://github.com/arco-design/arco-design-vue/pull/1562))

### 💎 功能优化

- 优化范围选择器在选择时也会修正顺序 ([#1578](https://github.com/arco-design/arco-design-vue/pull/1578))


## 2.35.0

`2022-08-12`

### 🆕 新增功能

- 增加范围选择器头部点击与基础选择器月份点击至年份功能 ([#1421](https://github.com/arco-design/arco-design-vue/pull/1421))


## 2.33.0

`2022-07-08`

### 🐛 问题修复

- 修复 readonly 模式下仍可打开下拉菜单和清除选项的问题 ([#1400](https://github.com/arco-design/arco-design-vue/pull/1400))


## 2.29.0

`2022-05-27`

### 🆕 新增功能

- 新增属性 `show-confirm-btn` 用于自定义是否显示确认按钮 ([#1198](https://github.com/arco-design/arco-design-vue/pull/1198))

### 💎 功能优化

- 拼接时间的时候只更新日期 ([#1199](https://github.com/arco-design/arco-design-vue/pull/1199))


## 2.28.0

`2022-05-20`

### 🆕 新增功能

- 新增属性 `preview-shortcut` 用于自定义是否要预览快捷选项的结果 ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))

### 🐛 问题修复

- `选择时间`没有国际化 ([#1173](https://github.com/arco-design/arco-design-vue/pull/1173))

### 💎 功能优化

- 移出 `shortcut` 的时候重置回已选值 ([#1175](https://github.com/arco-design/arco-design-vue/pull/1175))


## 2.27.0

`2022-05-13`

### 🐛 问题修复

- 修复使用 `v-model` 绑定 `week-picker ` 和 `quarter-picker` 的时候值错误的问题 ([#1112](https://github.com/arco-design/arco-design-vue/pull/1112))


## 2.25.1

`2022-04-27`

### 🐛 问题修复

- 按钮 `今天` 无法通过将 `show-now-btn` 设置为 false 来隐藏 ([#1046](https://github.com/arco-design/arco-design-vue/pull/1046))


## 2.25.0

`2022-04-22`

### 🆕 新增功能

- 增加参数 `exchangeTime` ([#1020](https://github.com/arco-design/arco-design-vue/pull/1020))


## 2.24.0

`2022-04-15`

### 💎 功能优化

- 传递了 timePickerProps 就会在最终值上拼接时间 ([#981](https://github.com/arco-design/arco-design-vue/pull/981))


## 2.21.0

`2022-03-25`

### 🆕 新增功能

- `dayStartOfWeek` 支持设置为 0-6 ([#874](https://github.com/arco-design/arco-design-vue/pull/874))


## 2.20.0

`2022-03-18`

### 🐛 问题修复

- 选择结束时间的时候没有触发 select 事件 ([#844](https://github.com/arco-design/arco-design-vue/pull/844))


## 2.19.0

`2022-03-11`

### 🐛 问题修复

- 修复范围选择器弹出层的偏移量错误的问题 ([#796](https://github.com/arco-design/arco-design-vue/pull/796))


## 2.18.0

`2022-03-04`

### 🆕 新增功能

- 支持在头部快捷切换年月 ([#754](https://github.com/arco-design/arco-design-vue/pull/754))


## 2.16.2

`2022-01-24`

### 🐛 问题修复

- `headerValue` 在 `vue 3.2.28` 中报错 ([#643](https://github.com/arco-design/arco-design-vue/pull/643))


## 2.16.0

`2022-01-21`

### 🆕 新增功能

- 增加属性 `value-format` 用于格式化返回值 ([#631](https://github.com/arco-design/arco-design-vue/pull/631))

### 🐛 问题修复

- 点击清除按钮的时候不要展开弹出层 ([#633](https://github.com/arco-design/arco-design-vue/pull/633))
- 返回值在不显示时间选择面板的时候不应该拼接时间 ([#612](https://github.com/arco-design/arco-design-vue/pull/612))


## 2.15.0

`2022-01-14`

### 🐛 问题修复

- 修复事件参数缺失的问题 ([#579](https://github.com/arco-design/arco-design-vue/pull/579))


## 2.13.0

`2021-12-31`

### 🐛 问题修复

- 修复 `readonly` 无效的问题 ([#472](https://github.com/arco-design/arco-design-vue/pull/472))


## 2.6.0

`2021-11-19`

### 🐛 问题修复

- 修复在 form 里校验异常的问题 ([#195](https://github.com/arco-design/arco-design-vue/pull/195))

