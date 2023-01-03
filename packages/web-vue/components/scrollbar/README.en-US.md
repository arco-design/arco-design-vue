```yaml
meta:
  type: Component
  category: Other
title: Scrollbar
description: Used to replace the browser default scroll bar style.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md


### `<scrollbar>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|type|Type|`'track' \| 'embed'`|`'embed'`|
|outer-class|Outer class|`string\|object\|array`|`-`|
|outer-style|Outer style|`StyleValue`|`-`|
### `<scrollbar>` Events

|Event Name|Description|Parameters|
|---|---|---|
|scroll|Triggered when scroll|-|
### `<scrollbar>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|scrollTo|scrollTo|options: `number \| {left?: number;top?: number}`<br>y: `number`|-||
|scrollTop|scroll vertically|top: `number`|-|2.40.0|
|scrollLeft|scroll horizontal|left: `number`|-|2.40.0|


