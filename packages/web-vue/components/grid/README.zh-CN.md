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

@import ./__demo__/grid.md

@import ./__demo__/grid-responsive.md

## API


### `<row>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|`number\| ResponsiveValue\| [number \| ResponsiveValue, number \| ResponsiveValue]`|`0`||
|justify|水平对齐方式 (`justify-content`)|`'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'`|`'start'`||
|align|竖直对齐方式 ( `align-items` )|`'start' \| 'center' \| 'end' \| 'stretch'`|`'start'`||
|div|开启这个选项`Row`和`Col`都会被当作div而不会附带任何Grid相关的类和样式|`boolean`|`false`||
|wrap|`Col` 是否支持换行|`boolean`|`true`|2.13.0|




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




### `<grid>` Props (2.15.0)
响应式配置从 `2.18.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|cols|每一行展示的列数|`number \| ResponsiveValue`|`24`|
|row-gap|行与行之间的间距|`number \| ResponsiveValue`|`0`|
|col-gap|列与列之间的间距|`number \| ResponsiveValue`|`0`|
|collapsed|是否折叠|`boolean`|`false`|
|collapsed-rows|折叠时显示的行数|`number`|`1`|




### `<grid-item>` Props (2.15.0)
响应式配置从 `2.18.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|span|跨越的格数|`number \| ResponsiveValue`|`1`|
|offset|左侧的间隔格数|`number \| ResponsiveValue`|`0`|
|suffix|是否是后缀元素|`boolean`|`false`|




### ResponsiveValue

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|xxl|>= 1600px 响应式配置|`number`|`-`|
|xl|>= 1200px 响应式配置|`number`|`-`|
|lg|>= 992px 响应式配置|`number`|`-`|
|md|>= 768px 响应式配置|`number`|`-`|
|sm|>= 576px 响应式配置|`number`|`-`|
|xs|< 576px 响应式配置|`number`|`-`|



