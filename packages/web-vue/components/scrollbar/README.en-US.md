```yaml
meta:
  type: Component
  category: Other
title: Scrollbar
description: Used to replace the browser default scroll bar style.
```

_Auto translate by google._

@import ./\_\_demo\_\_/basic.md

@import ./\_\_demo\_\_/type.md

### `<scrollbar>` Props

| Attribute   | Description | Type                    |  Default  |
| ----------- | ----------- | ----------------------- | :-------: |
| type        | Type        | `'track' \| 'embed'`    | `'embed'` |
| outer-class | Outer class | `string\|object\|array` |    `-`    |
| outer-style | Outer style | `StyleValue`            |    `-`    |

### `<scrollbar>` Events

| Event Name | Description           | Parameters |
| ---------- | --------------------- | ---------- |
| scroll     | Triggered when scroll | -          |

### `<scrollbar>` Methods

| Method Name | Description                                | Parameters                                                 |
| ----------- | ------------------------------------------ | ---------------------------------------------------------- |
| scrollTo    | Scrolls to a particular set of coordinates | `(options: ScrollToOptions \| number, y?: number) => void` |
| scrollTop   | Set distance to scroll top                 | `(top: number) => void`                                    |
| scrollLeft  | Set distance to scroll left                | `(left: number) => void `                                  |
