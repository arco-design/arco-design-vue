## zh-CN
```yaml
meta:
  type: 组件
  category: 通用
title: 全局配置 ConfigProvider
description: 在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Common
title: ConfigProvider
description: Configure in the outermost layer of the application, set once, and take effect globally. Generally used to set functions such as internationalized languages.
```
---

@import ./__demo__/basic.md

@import ./__demo__/empty.md

## API

%%API(config-provider.vue)%%


## FAQ

## zh-CN
### 全局配置

`global` 属性设置为 `true` 时，会将配置内容注入到 Vue AppContext 中，一般用于解决使用 Modal、Message 组件的函数式调用方法时，配置内容无法生效的问题。

### 自定义空状态展示

可以在 `#empty` 中自定义组件库全局的空状态展示，如果在插槽中使用到了 `Empty` 组件，需要开启 `inConfigProvider` 属性。

---
## en-US
### Global Config

When the `global` property is set to `true`, the configuration content will be injected into the Vue AppContext, which is generally used to solve the problem that the configuration content cannot take effect when the functional call method of the Modal and Message components is used.

### Customize empty state display

You can customize the display of the global empty state of the component library in `#empty`. If the `Empty` component is used in the slot, you need to enable the `inConfigProvider` property.

---
