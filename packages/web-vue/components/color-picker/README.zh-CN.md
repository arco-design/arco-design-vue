```yaml
meta:
  type: 组件
  category: 数据输入
title: 颜色选择器 ColorPicker
description: 用于选择和展示颜色
```

@import ./__demo__/basic.md
@import ./__demo__/size.md
@import ./__demo__/disabled.md
@import ./__demo__/format.md
@import ./__demo__/colors.md
@import ./__demo__/trigger.md
@import ./__demo__/trigger-element.md
@import ./__demo__/only-panel.md
@import ./__demo__/custom-panel.md

## API


### `<color-picker>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string`|`-`|
|default-value|默认值（非受控状态）|`string`|`-`|
|format|颜色值的格式|`'hex' \| 'rgb'`|`-`|
|size|尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|show-text|显示颜色值|`boolean`|`false`|
|show-history|显示历史颜色|`boolean`|`false`|
|show-preset|显示预设颜色|`boolean`|`false`|
|show-palette|显示调色板|`boolean`|`true`|
|show-controls|显示控制条|`boolean`|`true`|
|disabled|禁用|`boolean`|`false`|
|disabled-alpha|禁用透明通道|`boolean`|`false`|
|hide-trigger|没有触发元素，只显示颜色面板|`boolean`|`false`|
|trigger-props|接受所有 [Trigger](/vue/component/trigger) 组件的Props|`Partial<TriggerProps>`|`-`|
|history-colors|历史颜色的颜色数组|`string[]`|`-`|
|preset-colors|预设颜色的颜色数组|`string[]`|`() => colors`|
### `<color-picker>` Events

|事件名|描述|参数|
|---|---|---|
|change|颜色值改变时触发|value: `string`|
|popup-visible-change|颜色面板展开和收起时触发|visible: `boolean`<br>value: `string`|
### `<color-picker>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|preset-title|预设颜色标题|-|
|history-title|历史颜色标题|-|
|color-section|颜色选择区域|colorSection: `() => JSX.Element`|
|controls|控制条区域|controls: `() => JSX.Element`|
|palette|调色板区域|palette: `() => JSX.Element`|


