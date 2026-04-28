```yaml
meta:
  type: 组件
  category: 其他
title: 锚点 Anchor
description: 通过锚点可以快速找到信息内容在当前页面的位置。
```

@import ./__demo__/basic.md

@import ./__demo__/static.md

@import ./__demo__/line-less.md

@import ./__demo__/horizontal.md

@import ./__demo__/affix.md

@import ./__demo__/boundary.md

@import ./__demo__/hash.md

## API


### `<anchor>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|boundary|滚动边界值，设置该值为数字后，将会在距离滚动容器 `boundary` 距离时停止滚动。|`'start' \| 'end' \| 'center' \| 'nearest' \| number`|`'start'`|
|line-less|是否显示左侧轴线|`boolean`|`false`|
|affix|是否固定|`boolean`|`false`|
|affix-style|设置 Affix 组件的样式|`CSSProperties`|`-`|
|offset-top|距离窗口顶部的偏移量|`number`|`0`|
|offset-bottom|距离窗口底部的偏移量|`number`|`-`|
|direction|锚点方向|`'vertical' \| 'horizontal'`|`'vertical'`|
|target-offset|锚点区域边界相对于滚动容器顶部的偏移量。未设置时，默认值为滚动容器高度的一半|`number`|`-`|
|scroll-container|滚动容器|`string \| HTMLElement \| Window`|`-`|
|change-hash|是否改变hash。设置为 `false` 时点击锚点不会改变页面的 hash|`boolean`|`true`|
|smooth|是否使用平滑滚动|`boolean`|`true`|
### `<anchor>` Events

|事件名|描述|参数|
|---|---|---|
|select|用户点击链接时触发|hash: ` string \| undefined `<br>preHash: `string`|
|change|链接发生改变时触发|hash: `string`|




### `<anchor-link>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|锚点链接的文本内容|`string`|`-`|
|href|锚点链接的地址|`string`|`-`|


