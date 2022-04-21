```yaml
meta:
  type: 组件
  category: 反馈
title: 结果页 Result
description: 用于反馈一系列操作任务的处理结果，当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。
```

@import ./__demo__/basic.md

@import ./__demo__/success.md

@import ./__demo__/warning.md

@import ./__demo__/error.md

@import ./__demo__/403.md

@import ./__demo__/404.md

@import ./__demo__/500.md

@import ./__demo__/custom.md


@import ./__demo__/all.md

## API


### `<result>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|status|结果页显示的状态|`'info' \| 'success' \| 'warning' \| 'error' \| '403' \| '404' \| '500' \| null`|`'info'`|
|title|标题内容|`string`|`-`|
|subtitle|子标题内容|`string`|`-`|
### `<result>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-||
|title|标题|-||
|subtitle|副标题|-||
|extra|操作区|-|2.8.0|
|default|默认插槽|-|2.8.0|


