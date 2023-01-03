```yaml
meta:
  type: Component
  category: Other
title: Anchor
description: Through the anchor point, you can quickly find the position of the information content on the current page.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/line-less.md

@import ./__demo__/affix.md

@import ./__demo__/boundary.md

@import ./__demo__/hash.md

## API


### `<anchor>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|boundary|Scrolling boundary value. After setting the value to a number, it will stop scrolling when the distance is `boundary` from the scrolling container.|`'start' \| 'end' \| 'center' \| 'nearest' \| number`|`'start'`|
|line-less|Whether to show the left axis|`boolean`|`false`|
|scroll-container|Scroll container|`string \| HTMLElement \| Window`|`-`|
|change-hash|Whether to change the hash. When set to `false`, clicking on the anchor will not change the hash of the page|`boolean`|`true`|
|smooth|Whether to use smooth scrolling|`boolean`|`true`|
### `<anchor>` Events

|Event Name|Description|Parameters|
|---|---|---|
|select|Triggered when the user clicks on the link|hash: ` string \| undefined `<br>preHash: `string`|
|change|Triggered when the link changes|hash: `string`|




### `<anchor-link>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|title|The text content of the anchor link|`string`|`-`|
|href|The address of the anchor link|`string`|`-`|


