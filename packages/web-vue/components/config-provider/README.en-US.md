```yaml
meta:
  type: Component
  category: Common
title: ConfigProvider
description: Configure in the outermost layer of the application, set once, and take effect globally. Generally used to set functions such as internationalized languages.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/empty.md

## API


### `<config-provider>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|prefix-cls|Component classname prefix|`string`|`'arco'`||
|locale|Configure language pack|`ArcoLang`|`-`||
|size|Size|`Size`|`-`|2.14.0|
|global|Is global effect|`boolean`|`false`|2.25.0|
|scroll-to-close|Whether to close the popover when scrolling|`boolean`|`false`|2.46.0|
### `<config-provider>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|loading|Custom loading element|-|2.28.0|
|empty|Custom empty element|component: `string`|2.28.0|




## FAQ

### Global Config

When the `global` property is set to `true`, the configuration content will be injected into the Vue AppContext, which is generally used to solve the problem that the configuration content cannot take effect when the functional call method of the Modal and Message components is used.

### Customize empty state display

You can customize the display of the global empty state of the component library in `#empty`. If the `Empty` component is used in the slot, you need to enable the `inConfigProvider` property.
