```yaml
meta:
  type: Component
  category: Common
title: Typography
description: Used to display titles, paragraphs, and text content.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/title.md

@import ./__demo__/text.md

@import ./__demo__/paragraph.md

@import ./__demo__/operations.md

@import ./__demo__/ellipsis.md

## API






### `Common` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|type|Text type|`'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'`|`-`||
|bold|Whether enable bold style|`boolean`|`false`||
|mark|Mark style|`boolean \| { color: string }`|`false`||
|underline|Whether enable underline style|`boolean`|`false`||
|delete|Whether enable delete style|`boolean`|`false`||
|code|Whether enable code style|`boolean`|`false`||
|disabled|Whether disabled|`boolean`|`false`||
|editable|Whether it's editable|`boolean`|`false`||
|editing **(v-model)**|Whether it's editing|`boolean`|`-`||
|default-editing|Default editing state|`boolean`|`false`||
|edit-text **(v-model)**|Edit text|`string`|`-`||
|copyable|Whether turn on copy functionality|`boolean`|`false`||
|copy-text|Copied text|`string`|`-`||
|copy-delay|After the copy is successful, the delay time for the copy button to return to the clickable state, in milliseconds|`number`|`3000`|2.16.0|
|ellipsis|Automatic overflow omission, refer to [EllipsisConfig](#EllipsisConfig) for more information.|`boolean \| EllipsisConfig`|`false`||
|edit-tooltip-props|Edit button question prompt configuration|`object`|`-`|2.32.0|
|copy-tooltip-props|Copy button question prompt configuration|`object`|`-`|2.32.0|
### `Common` Events

|Event Name|Description|Parameters|
|---|---|---|
|edit-start|Edit start|-|
|change|Edit content change|text: `string`|
|edit-end|Edit end|-|
|copy|Copy|text: `string`|
|ellipsis|Ellipsis change|isEllipsis: `boolean`|
|expand|Expand collapse event|expanded: `boolean`|
### `Common` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|expand-node|Custom expand button|expanded: `boolean`|
|copy-icon|Custom copy button icon|copied: `boolean`|
|copy-tooltip|Customize the tooltip content of the copy button|copied: `boolean`|




### `<typography-title>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|heading|Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`|`'1' \| '2' \| '3' \| '4' \| '5' \| '6'`|`1`|




### `<typography-paragraph>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|blockquote|Whether enable blockquote|`boolean`|`false`|
|spacing|The line height of the paragraph, the default line height is recommended for long text (more than 5 lines). `close` line height is recommended for short text (less than or equal to 3 lines).|`'default' \| 'close'`|`'default'`|








### EllipsisConfig

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|rows|The number of omitted lines|`number`|`1`||
|expandable|Whether expandable|`boolean`|`false`||
|ellipsisStr|Ellipsis string|`string`|`'...'`||
|suffix|Suffix|`string`|`-`||
|showTooltip|Pop-up box when configuration is omitted|`boolean    \| { type: 'tooltip' \| 'popover'; props: Record<string, any> }`|`false`||
|css|Whether to use CSS ellipsis (expansion, custom ellipsis and suffix are not supported in this mode)|`boolean`|`false`|2.37.0|


