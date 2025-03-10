```yaml
changelog: true
```

## 2.57.0

`2025-03-10`

### 🐛 问题修复

- 修复表单 `id` 属性被消费无法透传问题 ([#3450](https://github.com/arco-design/arco-design-vue/pull/3450))


## 2.54.0

`2023-12-15`


## 2.51.2

`2023-09-15`

### 🐛 问题修复

- 修复field为数组对象时滚动报错问题 ([#2707](https://github.com/arco-design/arco-design-vue/pull/2707))


## 2.51.0

`2023-09-01`

### 🆕 新增功能

- 新增滚动到指定表单字段 ([#2680](https://github.com/arco-design/arco-design-vue/pull/2680))


## 2.44.2

`2023-03-17`

### 🐛 问题修复

- 修复 field 属性中对数组格式不支持的问题 ([#2242](https://github.com/arco-design/arco-design-vue/pull/2242))

### 💎 功能优化

- 增加中文检验信息 ([#2240](https://github.com/arco-design/arco-design-vue/pull/2240))


## 2.43.2

`2023-02-24`

### 🐛 问题修复

- 修复 FormItem 的 validateStatus 失效问题 ([#2158](https://github.com/arco-design/arco-design-vue/pull/2158))


## 2.41.0

`2022-12-30`

### 🆕 新增功能

- `form-item` 支持 tooltip 属性 ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))
- `form-item` 支持 asteriskPosition 属性 ([#1991](https://github.com/arco-design/arco-design-vue/pull/1991))


## 2.40.0

`2022-12-09`

### 🐛 问题修复

- 修复 `Form` 组件的 `validate-status` 属性在 `date-picker` 组件不生效的 bug。 ([#1928](https://github.com/arco-design/arco-design-vue/pull/1928))


## 2.38.0

`2022-10-28`

### 🐛 问题修复

- 不修改规则原始对象数据 ([#1779](https://github.com/arco-design/arco-design-vue/pull/1779))


## 2.33.1

`2022-07-22`

### 🐛 问题修复

- 修复 form-item 内容可能超出限制宽度的问题 ([#1437](https://github.com/arco-design/arco-design-vue/pull/1437))


## 2.31.0

`2022-06-17`

### 🆕 新增功能

- resetFields 和  clearValidate 方法增加参数支持 ([#1305](https://github.com/arco-design/arco-design-vue/pull/1305))


## 2.22.0

`2022-04-01`

### 🆕 新增功能

- 支持修改表单项标签的渲染元素 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))

### 💅 样式更新

- 表单项内容样式增加最大宽度，防止溢出 ([#919](https://github.com/arco-design/arco-design-vue/pull/919))


## 2.20.1

`2022-03-21`

### 💅 样式更新

- 修复 `form-item` 星号与 windicss 的兼容问题 ([#854](https://github.com/arco-design/arco-design-vue/pull/854))


## 2.19.0

`2022-03-11`

### 🐛 问题修复

- 修复 `form-item` 的 `field` 属性中存在数组时失效的问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))
- 修复 `disabled` 开启后，部分组件功能仍可用问题 ([#807](https://github.com/arco-design/arco-design-vue/pull/807))


## 2.18.0

`2022-03-04`

### 🐛 问题修复

- 修复嵌套数据中重置方法失效的问题 ([#768](https://github.com/arco-design/arco-design-vue/pull/768))


## 2.18.0-beta.2

`2022-02-25`

### 💎 功能优化

- `auto-label-width` 开启时不在允许标签换行，防止换行后计算错误 ([#738](https://github.com/arco-design/arco-design-vue/pull/738))

### 🆕 新增功能

- 校验错误信息新增 label 属性 ([#724](https://github.com/arco-design/arco-design-vue/pull/724))


## 2.18.0-beta.1

`2022-02-18`

### ⚠️ 重点注意

- <form-item> 组件重构，使用 context 管理输入组件。如果用户存在自定义输入组件，可参考 `自定义输入组件` 示例更改。 ([#697](https://github.com/arco-design/arco-design-vue/pull/697))


## 2.16.0

`2022-01-21`

### 🆕 新增功能

- 增加表单和相应输入组件的反馈图标功能 ([#622](https://github.com/arco-design/arco-design-vue/pull/622))


## 2.14.2

`2022-01-10`

### 🐛 问题修复

- label-col 改用 flex 布局，解决 mini 尺寸下高度错误的问题 ([#536](https://github.com/arco-design/arco-design-vue/pull/536))


## 2.14.1

`2022-01-08`

### 🐛 问题修复

- 修复form默认大小样式问题 ([#526](https://github.com/arco-design/arco-design-vue/pull/526))


## 2.13.0

`2021-12-31`

### ⚠️ 重点注意

- `form-item` 组件增加一个新的 `content-wrapper` div 元素包裹原先 `content` div 元素，以来支持新的布局方式 ([#488](https://github.com/arco-design/arco-design-vue/pull/488))

### 🆕 新增功能

- 增加 `autoLabelWidth` 属性，支持标签宽度自适应 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- 增加 `labelColFlex` 属性，支持标签宽度设置 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))
- 增加 `mergeProps` 属性，支持自定义属性和事件覆写 ([#486](https://github.com/arco-design/arco-design-vue/pull/486))

### 🐛 问题修复

- 修复表单项 help 内容显示错误的问题 ([#480](https://github.com/arco-design/arco-design-vue/pull/480))


## 2.10.0

`2021-12-10`

### 🆕 新增功能

- `form-item` 增加布局和类名相关属性 ([#361](https://github.com/arco-design/arco-design-vue/pull/361))


## 2.8.0

`2021-12-01`

### 🐛 问题修复

- 修复 `setFields` 方法设定空值失效的问题 ([#311](https://github.com/arco-design/arco-design-vue/pull/311))


## 2.7.0

`2021-11-26`

### 🆕 新增功能

- 增加 `rules` 属性 ([#271](https://github.com/arco-design/arco-design-vue/pull/271))


## 2.6.1

`2021-11-24`

### 🐛 问题修复

- 修复表单附加内容样式没生效的问题 ([#208](https://github.com/arco-design/arco-design-vue/pull/208))


## 2.4.0

`2021-11-17`

### 🐛 问题修复

- 修复 `filed` 字段传入 null 导致报错的问题 ([#173](https://github.com/arco-design/arco-design-vue/pull/173))


## 2.3.0

`2021-11-12`

### 🆕 新增功能

- 增加 `setFields` 方法 ([#150](https://github.com/arco-design/arco-design-vue/pull/150))


## 2.1.0

`2021-11-05`

### 🆕 新增功能

- 增加 `hideAsterisk ` 功能 ([#94](https://github.com/arco-design/arco-design-vue/pull/94))

