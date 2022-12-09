```yaml
meta:
  type: 组件
  category: 其他
title: 滚动条 Scrollbar
description: 用于替换浏览器默认滚动条样式。
```

@import ./\_\_demo\_\_/basic.md

@import ./\_\_demo\_\_/type.md

### `<scrollbar>` Props

| 参数名      | 描述       | 类型                    |  默认值   |
| ----------- | ---------- | ----------------------- | :-------: |
| type        | 类型       | `'track' \| 'embed'`    | `'embed'` |
| outer-class | 外层的类名 | `string\|object\|array` |    `-`    |
| outer-style | 外层的样式 | `StyleValue`            |    `-`    |

### `<scrollbar>` Events

| 事件名 | 描述       | 参数 |
| ------ | ---------- | ---- |
| scroll | 滚动时触发 | -    |

### `<scrollbar>` Methods

| 方法名     | 描述                   | 参数                                                       |
| ---------- | ---------------------- | ---------------------------------------------------------- |
| scrollTo   | 滚动到一组特定坐标     | `(options: ScrollToOptions \| number, y?: number) => void` |
| scrollTop  | 设置滚动条到顶部的距离 | `(top: number) => void`                                    |
| scrollLeft | 设置滚动条到左边的距离 | `(left: number) => void `                                  |
