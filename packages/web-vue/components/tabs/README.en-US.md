```yaml
meta:
  type: Component
  category: Data Display
title: Tabs
description: Organize content in the same view. You can view the content of one view at a time, and you can switch tabs to view other content.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/icon.md

@import ./__demo__/position.md

@import ./__demo__/type.md

@import ./__demo__/lazy.md

@import ./__demo__/extra.md

@import ./__demo__/editable.md

@import ./__demo__/trigger.md

@import ./__demo__/scroll.md

## API


### `<tabs>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|active-key **(v-model)**|The `key` of the currently selected label|`string\|number`|`-`||
|default-active-key|The `key` of the tab selected by default (uncontrolled state, select the first tab page when it is empty)|`string\|number`|`-`||
|position|Position of the tab|`'left' \| 'right' \| 'top' \| 'bottom'`|`'top'`||
|size|The size of the tab|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|type|The type of tab|`'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule'`|`'line'`||
|direction|The direction of tab|`'horizontal' \| 'vertical'`|`'horizontal'`||
|editable|Whether to enable editable mode|`boolean`|`false`||
|show-add-button|Whether to display the add button (only available in editable mode)|`boolean`|`false`||
|destroy-on-hide|Whether to destroy the content when the label is not displayed|`boolean`|`false`|2.27.0|
|lazy-load|Whether to mount the content when the label is first displayed|`boolean`|`false`||
|justify|The height of the container is fully supported, and it only takes effect in horizontal mode.|`boolean`|`false`||
|animation|Whether to enable option content transition animation|`boolean`|`false`||
|header-padding|Whether there is a horizontal margin on the header of the tab. Only valid for tabs with `type` equal to `line` and `text` type|`boolean`|`true`|2.10.0|
|auto-switch|Whether to switch to a new tab after creating a tab (the last one)|`boolean`|`false`|2.18.0|
|hide-content|Whether to hide content|`boolean`|`false`|2.25.0|
|trigger|Trigger method|`'hover' \| 'click'`|`'click'`|2.34.0|
|scroll-position|The scroll position of the selected tab, the default auto will scroll the activeTab to the visible area, but will not adjust the position intentionally|`'start' \| 'end' \| 'center' \| 'auto' \| number`|`'auto'`||
### `<tabs>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the current tag value changes|key: ` string \| number `|
|tab-click|Triggered when the user clicks on the tab|key: ` string \| number `|
|add|Triggered when the user clicks the add button|-|
|delete|Triggered when the user clicks the delete button|key: ` string \| number `|
### `<tabs>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|extra|Additional tab content|-|




### `<tab-pane>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|title|Title of the tab|`string`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|closable|Whether to allow this tab to be closed (only effective in editable mode)|`boolean`|`true`||
|destroy-on-hide|Whether to destroy the content when the label is not displayed|`boolean`|`false`|2.27.0|
### `<tab-pane>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Tab title|-|


