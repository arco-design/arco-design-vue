```yaml
meta:
  type: 组件
  category: 数据展示
title: 数值显示 Statistic
description: 突出展示某个或某组数字、带描述的统计类数据。
```

@import ./__demo__/basic.md

@import ./__demo__/prefix.md

@import ./__demo__/animation.md

@import ./__demo__/countdown.md

## API


### `<statistic>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|数值显示的标题|`string`|`-`||
|value|数值显示的值|`number \| Date`|`-`||
|format|数值显示的格式 [dayjs](https://day.js.org/docs/en/display/format)（日期模式使用）|`string`|`'HH:mm:ss'`||
|extra|额外的显示内容|`string`|`-`||
|start|是否开始动画|`boolean`|`true`||
|precision|小数保留位数（数字模式使用）|`number`|`0`||
|separator|进位分隔符（数字模式使用）|`string`|`-`||
|show-group-separator|是否展示进位分隔符（数字模式使用）|`boolean`|`false`||
|animation|是否开启动画|`boolean`|`false`||
|animation-duration|动画的过度时间|`number`|`2000`||
|value-from|动画的起始值|`number`|`-`||
|placeholder|提示文字（当 value 为 undefined 时显示）|`string`|`-`|2.28.0|
|value-style|自定义显示值的样式|`CSSProperties`|`-`|2.32.0|
### `<statistic>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|prefix|前缀|-|
|suffix|后缀|-|
|extra|额外内容|-|




### `<countdown>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|倒计时的标题|`string`|`-`||
|value|倒计时的值|`number`|`() => Date.now() + 300000`||
|now|用于修正初始化时间显示不正确|`number`|`() => Date.now()`||
|format|倒计时的展示格式 [dayjs](https://day.js.org/docs/en/display/format)|`string`|`'HH:mm:ss'`||
|start|是否开始倒计时|`boolean`|`true`||
|value-style|自定义显示值的样式|`CSSProperties`|`-`|2.32.0|
### `<countdown>` Events

|事件名|描述|参数|
|---|---|---|
|finish|倒计时完成后触发的回调|-|
### `<countdown>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|


