```yaml
meta:
  type: 组件
  category: 布局
title: 栅格 Grid
description: 栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。
```

@import ./__demo__/basic.md

@import ./__demo__/offset.md

@import ./__demo__/gutter.md

@import ./__demo__/flex-justify.md

@import ./__demo__/flex-align.md

@import ./__demo__/order.md

@import ./__demo__/adaptation.md

@import ./__demo__/adaptation-object.md

@import ./__demo__/flex.md


### `<row>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|`number\| Partial<Record<'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs', number>>\| GridRowGutter[]`|`0`|
|justify|水平对齐方式 (`justify-content`)|`'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'`|`'start'`|
|align|竖直对齐方式 ( `align-items` )|`'start' \| 'center' \| 'end' \| 'stretch'`|`'start'`|
|div|开启这个选项`Row`和`Col`都会被当作div而不会附带任何Grid相关的类和样式|`boolean`|`false`|




### `<col>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|span|栅格占位格数|`number`|`24`||
|offset|栅格左侧的间隔格数，间隔内不可以有栅格|`number`|`-`||
|order|对元素进行排序|`number`|`-`||
|xs|< 576px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|sm|>= 576px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|md|>= 768px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|lg|>= 992px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|xl|>= 1200px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|xxl|>= 1600px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|flex|设置 flex 布局属性|`number \| string \| 'initial' \| 'auto' \| 'none'`|`-`|2.10.0|


