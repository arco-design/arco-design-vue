```yaml
meta:
  type: 组件
  category: 反馈
title: 骨架屏 Skeleton
description: 将加载中的数据用灰色占位。
```

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/animation.md

## API


### `<skeleton>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|loading|是否展示骨架屏（加载中状态）|`boolean`|`true`|
|animation|是否开启骨架屏动画|`boolean`|`false`|




### `<skeleton-line>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|rows|展示的行数|`number`|`1`|
|widths|线型骨架的宽度|`Array<number \| string>`|`[]`|
|line-height|线型骨架的行高|`number`|`20`|
|line-spacing|线型骨架的行间距|`number`|`15`|




### `<skeleton-shape>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|shape|图形骨架的形状|`'square' \| 'circle'`|`'square'`|
|size|图形骨架的大小|`'small' \| 'medium' \| 'large'`|`'medium'`|


