```yaml
meta:
  type: 组件
  category: 其他
title: 滚动条 Scrollbar
description: 用于替换浏览器默认滚动条样式。
```

@import ./__demo__/basic.md

@import ./__demo__/type.md


### `<scrollbar>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|类型|`'track' \| 'embed'`|`'embed'`|
|outer-class|外层的类名|`string\|object\|array`|`-`|
|outer-style|外层的样式|`StyleValue`|`-`|
### `<scrollbar>` Events

|事件名|描述|参数|
|---|---|---|
|scroll|滚动时触发|-|
### `<scrollbar>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|scrollTo|滚动|options: `number \| {left?: number;top?: number}`<br>y: `number`|-||
|scrollTop|纵向滚动|top: `number`|-|2.40.0|
|scrollLeft|横向滚动|left: `number`|-|2.40.0|


