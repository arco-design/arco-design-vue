```yaml
meta:
  type: Component
  category: Data Entry
title: ColorPicker
description: Used for select and display colors.
```

*Auto translate by google.*

@import ./__demo__/basic.md
@import ./__demo__/size.md
@import ./__demo__/disabled.md
@import ./__demo__/format.md
@import ./__demo__/colors.md
@import ./__demo__/trigger.md
@import ./__demo__/trigger-element.md
@import ./__demo__/only-panel.md

## API


### `<color-picker>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string`|`-`|
|default-value|Default value (uncontrolled state)|`string`|`-`|
|format|Color value format|`'hex' \| 'rgb'`|`-`|
|size|Size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|show-text|Show color value|`boolean`|`false`|
|show-history|Show history colors|`boolean`|`false`|
|show-preset|Show preset colors|`boolean`|`false`|
|disabled|disabled|`boolean`|`false`|
|disabled-alpha|Disable transparency channel|`boolean`|`false`|
|hide-trigger|There is no trigger element, only the color panel is displayed|`boolean`|`false`|
|trigger-props|Can accept Props of all [Trigger](/vue/component/trigger) components|`Partial<TriggerProps>`|`-`|
|history-colors|Color array of historical colors|`string[]`|`-`|
|preset-colors|Color array of preset colors|`string[]`|`() => colors`|
### `<color-picker>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the color value changes|value: `string`|
|popup-visible-change|Triggered when the color panel is expanded and collapsed|visible: `boolean`<br>value: `string`|


