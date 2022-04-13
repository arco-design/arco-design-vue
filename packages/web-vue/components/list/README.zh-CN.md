```yaml
meta:
  type: 组件
  category: 数据展示
title: 列表 List
description: 最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。
```

@import ./__demo__/basic.md

@import ./__demo__/size.md

@import ./__demo__/meta.md

@import ./__demo__/grid.md

@import ./__demo__/scroll.md

@import ./__demo__/virtual-list.md

## API


### `<list>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|data|列表数据，需要和 `item` 插槽同时使用|`any[]`|`-`|
|size|列表大小|`'small' \| 'medium' \| 'large'`|`'medium'`|
|bordered|是否显示边框|`boolean`|`true`|
|split|是否显示分割线|`boolean`|`true`|
|loading|是否为加载中状态|`boolean`|`false`|
|hoverable|是否显示选中样式|`boolean`|`false`|
|pagination-props|列表分页配置|`PaginationProps`|`-`|
|grid-props|列表栅格配置|`object`|`-`|
|max-height|列表的最大高度|`number`|`0`|
|bottom-offset|触发到达底部的距离阈值|`number`|`0`|
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`|
### `<list>` Events

|事件名|描述|参数|
|---|---|---|
|scroll|列表滚动时触发|-|
|reach-bottom|当列表到达底部时触发|-|
|page-change|表格分页发生改变时触发|page: `number`|
|page-size-change|表格每页数据数量发生改变时触发|pageSize: `number`|
### `<list>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|scrollIntoView|虚拟滚动到某个元素|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-|
### `<list>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|scroll-loading|滚动加载状态时，滚动到底部的提示|-|2.20.0|
|item|列表项|index: `number`<br>item: `any`||
|footer|底部信息|-||
|header|头部信息|-||




### `<list-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action-layout|操作组排列方向|`string`|`'horizontal'`|
### `<list-item>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|meta|meta信息|-|
|extra|额外内容|-|
|actions|操作组|-|




### `<list-item-meta>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|标题|`string`|`-`|
|description|描述内容|`string`|`-`|
### `<list-item-meta>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|avatar|头像|-|
|title|标题|-|
|description|描述内容|-|




### VirtualListProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|height|可视区域高度|`number \| string`|`-`|
|threshold|自动开启虚拟滚动的元素数量阈值，传入 null 表示禁止虚拟滚动|`number \| null`|`-`|
|isStaticItemHeight|元素高度是否是固定的|`boolean`|`false`|


