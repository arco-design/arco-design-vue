```yaml
meta:
  type: 组件
  category: 数据输入
title: 开关 Switch
description: 互斥性的操作控件，用户可打开或关闭某个功能。
```

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/size.md

@import ./__demo__/disabled.md

@import ./__demo__/color.md

@import ./__demo__/value.md

@import ./__demo__/change-intercept.md

@import ./__demo__/loading.md

@import ./__demo__/text.md

@import ./__demo__/icon.md

## API


### `<switch>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string\|number\|boolean`|`-`||
|default-checked|默认选中状态（非受控状态）|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|type|开关的类型|`'circle' \| 'round' \| 'line'`|`'circle'`||
|size|开关的大小|`'small' \| 'medium'`|`'medium'`||
|checked-value|选中时的值|`string\|number\|boolean`|`true`|2.12.0|
|unchecked-value|未选中时的值|`string\|number\|boolean`|`false`|2.12.0|
|checked-color|选中时的开关颜色|`string`|`-`|2.12.0|
|unchecked-color|未选中时的开关颜色|`string`|`-`|2.12.0|
|before-change|switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。|`(  newValue: string \| number \| boolean) => Promise<boolean \| void> \| boolean \| void`|`-`|2.37.0|
|checked-text|打开状态时的文案（`type='line'`和`size='small'`时不生效）|`string`|`-`|2.45.0|
|unchecked-text|关闭状态时的文案（`type='line'`和`size='small'`时不生效）|`string`|`-`|2.45.0|
### `<switch>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| string \| number `<br>ev: `Event`|
|focus|组件获得焦点时触发|ev: `FocusEvent`|
|blur|组件失去焦点时触发|ev: `FocusEvent`|
### `<switch>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|checked-icon|打开状态时，按钮上的图标|-|
|unchecked-icon|关闭状态时，按钮上的图标|-|
|checked|打开状态时的文案（`type='line'`和`size='small'`时不生效）|-|
|unchecked|关闭状态时的文案（`type='line'`和`size='small'`时不生效）|-|


