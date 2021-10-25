```yaml
meta:
  type: 组件
  category: 导航
title: 分页 Pagination
description: 采用分页控制单页内的信息数量，也可进行页面跳转。
```

@import ./__demo__/basic.md

@import ./__demo__/ellipsis.md

@import ./__demo__/page-size.md

@import ./__demo__/jumper.md

@import ./__demo__/size.md

@import ./__demo__/simple.md

@import ./__demo__/total.md

@import ./__demo__/all.md


### `<pagination>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|total **(必填)**|数据总数|`number`|`-`|
|current **(v-model)**|当前的页数|`number`|`-`|
|default-current|默认的页数（非受控状态）|`number`|`1`|
|page-size **(v-model)**|每页展示的数据条数|`number`|`-`|
|default-page-size|默认每页展示的数据条数（非受控状态）|`number`|`10`|
|disabled|是否禁用|`boolean`|`false`|
|hide-on-single-page|单页时是否隐藏分页|`boolean`|`false`|
|simple|是否为简单模式|`boolean`|`false`|
|show-total|是否显示数据总数|`boolean`|`false`|
|show-more|是否显示更多按钮|`boolean`|`false`|
|show-jumper|是否显示跳转|`boolean`|`false`|
|show-page-size|是否显示数据条数选择器|`boolean`|`false`|
|page-size-options|数据条数选择器的选项列表|`number[]`|`[10, 20, 30, 40, 50]`|
|page-size-props|数据条数选择器的Props|`SelectProps`|`-`|
|size|分页选择器的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|page-item-style|分页按钮的样式|`CSSProperties`|`-`|
|active-page-item-style|当前分页按钮的样式|`CSSProperties`|`-`|
### `<pagination>` Events

|事件名|描述|参数|
|---|---|---|
|change|页码改变时触发|page: `number`|
|page-size-change|数据条数改变时触发|pageSize: `number`|
### `<pagination>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|page-item|分页按钮|type: `PageItemType`The type of page item<br>page: `number`The page number of the paging button (exists only when `type='page'`)<br>element: `VNode`Default page item|


