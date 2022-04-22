```yaml
meta:
  type: Component
  category: Common
title: ConfigProvider
description: Configure in the outermost layer of the application, set once, and take effect globally. Generally used to set functions such as internationalized languages.
```

*Auto translate by google.*

@import ./__demo__/basic.md

## API


### `<config-provider>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|prefix-cls|Component classname prefix|`string`|`'arco'`||
|locale|Configure language pack|`ArcoLang`|`-`||
|size|Size|`Size`|`-`|2.14.0|
|global|Is global effect|`boolean`|`false`|2.25.0|




## FAQ

### Global Config

When the `global` property is set to `true`, the configuration content will be injected into the Vue AppContext, which is generally used to solve the problem that the configuration content cannot take effect when the functional call method of the Modal and Message components is used.
