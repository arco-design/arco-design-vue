```yaml
meta:
  type: Component
  category: Other
title: BackTop
description: A button to return to the top with one click.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/custom.md

## API


### `<back-top>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|visible-height|Display the trigger scroll height of the back to top button|`number`|`200`|
|target-container|Scroll event listener container|`string \| HTMLElement`|`-`|
|easing|Easing mode of scrolling animation, refer to [BTween](https://github.com/PengJiyuan/b-tween) for optional values|`string`|`'quartOut'`|
|duration|Duration of scroll animation|`number`|`200`|


