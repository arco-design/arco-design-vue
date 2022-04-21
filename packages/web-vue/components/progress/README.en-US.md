```yaml
meta:
  type: Component
  category: Feedback
title: Progress
description: Give users feedback on the running status of tasks in the current system execution, which is mostly used in scenes that run for a period of time, effectively reducing the anxiety of users during waiting.
```

*Auto translate by google.*

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

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|type|The type of progress bar|`'line' \| 'circle'`|`'line'`|
|size|The size of the progress bar|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|percent|The current percentage of the progress bar|`number`|`0`|
|steps|Turn on the step bar mode and set the number of steps|`number`|`0`|
|animation|Whether to turn on the transition animation|`boolean`|`false`|
|stroke-width|The line width of the progress bar|`number`|`-`|
|width|The width of the progress bar|`number\|string`|`-`|
|color|The color of the progress bar|`string\|object`|`-`|
|track-color|The color of the progress track|`string`|`-`|
|show-text|Whether to display text|`boolean`|`true`|
|status|Progress bar status|`'normal' \| 'success' \| 'warning' \| 'danger'`|`-`|


