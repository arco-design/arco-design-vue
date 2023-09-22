```yaml
meta:
  type: 组件
  category: 数据展示
title: 头像 Avatar
description: 用作头像显示，可以为图片、图标或字符形式展示。
```


@import ./\_\_demo\_\_/basic.md

@import ./\_\_demo\_\_/size.md

@import ./\_\_demo\_\_/group.md

@import ./\_\_demo\_\_/icon.md

@import ./\_\_demo\_\_/fit.md

@import ./\_\_demo\_\_/image-url.md

## API


### `<avatar>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|shape|头像的形状，有圆形(circle)和正方形(square)两种|`'circle' \| 'square'`|`'circle'`||
|image-url|自定义头像图片地址，如果传入该属性，会默认渲染img标签|`string`|`-`|2.40.0|
|size|头像的尺寸大小，单位是 `px`。未填写时使用样式中的大小 `40px`|`number`|`-`||
|auto-fix-font-size|是否自动根据头像尺寸调整字体大小|`boolean`|`true`||
|trigger-type|可点击的头像交互类型|`'mask' \| 'button'`|`'button'`||
|trigger-icon-style|交互图标的样式|`CSSProperties`|`-`||
|object-fit|图片在容器内的的适应类型|`ObjectFit`|`-`|2.52.0|
### `<avatar>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击回调|ev: `MouseEvent`|
|error|图片加载错误|-|
|load|图片加载成功|-|
### `<avatar>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|trigger-icon|可点击的头像交互图标|-|




### `<avatar-group>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|shape|头像的形状，有圆形(circle)和正方形(square)两种|`'circle' \| 'square'`|`'circle'`||
|size|头像的尺寸大小，单位是 `px`|`number`|`-`||
|auto-fix-font-size|是否自动根据头像尺寸调整字体大小|`boolean`|`true`||
|max-count|头像组最多显示的头像数量，多余头像将以 `+x` 的形式展示。|`number`|`0`||
|z-index-ascend|头像组内的头像 `z-index` 递增，默认是递减。|`boolean`|`false`||
|max-style|多余头像样式。|`CSSProperties`|`-`|2.7.0|
|max-popover-trigger-props|多余头像气泡的 `TriggerProps`|`TriggerProps`|`-`|2.7.0|


