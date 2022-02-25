```yaml
changelog: true
```

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

