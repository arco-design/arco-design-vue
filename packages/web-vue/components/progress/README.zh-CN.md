```yaml
meta:
  type: 组件
  category: 反馈
title: 进度条 Progress
description: 给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。
```

@import ./__demo__/basic.md

@import ./__demo__/status.md

@import ./__demo__/circle.md

@import ./__demo__/mini.md

@import ./__demo__/size.md

@import ./__demo__/linear.md

@import ./__demo__/steps.md

@import ./__demo__/trackColor.md

## API


### `<progress>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|进度条的类型|`'line' \| 'circle'`|`'line'`|
|size|进度条的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|percent|进度条当前的百分比|`number`|`0`|
|steps|开启步骤条模式，并设置步骤数|`number`|`0`|
|animation|是否开启过渡动画|`boolean`|`false`|
|stroke-width|进度条的线宽|`number`|`-`|
|width|进度条的长度|`number\|string`|`-`|
|color|进度条的颜色|`string\|object`|`-`|
|track-color|进度条的轨道颜色|`string`|`-`|
|show-text|是否显示文字|`boolean`|`true`|
|status|进度条状态|`'normal' \| 'success' \| 'warning' \| 'danger'`|`-`|


