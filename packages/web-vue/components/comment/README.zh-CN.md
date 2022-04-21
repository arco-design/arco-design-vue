```yaml
meta:
  type: 组件
  category: 数据展示
title: 评论 Comment
description: 展示评论信息
```

@import ./__demo__/basic.md

@import ./__demo__/align.md

@import ./__demo__/nest.md

@import ./__demo__/editor.md

## API


### `<comment>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|author|作者名|`string`|`-`|
|avatar|头像|`string`|`-`|
|content|评论内容|`string`|`-`|
|datetime|时间描述|`string`|`-`|
|align|靠左/靠右 展示 datetime 和 actions|`'left' \| 'right' \| { datetime?: "left" \| "right"; actions?: "left" \| "right" }`|`'left'`|
### `<comment>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|avatar|头像|-|
|author|作者|-|
|datetime|时间描述|-|
|content|评论内容|-|
|actions|操作列表|-|


