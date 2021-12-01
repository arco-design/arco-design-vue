```yaml
meta:
  type: Component
  category: Feedback
title: Result
description: It is used to feed back the processing results of a series of operation tasks. It is used when there are important operations that need to inform the user of the processing results and the feedback content is more complicated.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/success.md

@import ./__demo__/warning.md

@import ./__demo__/error.md

@import ./__demo__/403.md

@import ./__demo__/404.md

@import ./__demo__/500.md


### `<result>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|status|The status displayed on the result page|`'info' \| 'success' \| 'warning' \| 'error' \| '403' \| '404' \| '500'`|`'info'`|
|title|Title|`string`|`-`|
|subtitle|Subtitle|`string`|`-`|
### `<result>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|icon|Icon|-|
|title|Title|-|
|subtitle|Subtitle|-|
|extra|Extra|-|


