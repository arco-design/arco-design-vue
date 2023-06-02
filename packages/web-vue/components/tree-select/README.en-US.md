```yaml
meta:
  type: Component
  category: Data Entry
title: TreeSelect
description: The tree structure data can be selected.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/label-in-value.md

@import ./__demo__/control.md

@import ./__demo__/load-more.md

@import ./__demo__/search.md

@import ./__demo__/search-remote.md

@import ./__demo__/size.md

@import ./__demo__/dropdown-slots.md

@import ./__demo__/trigger-element.md

@import ./__demo__/multiple.md

@import ./__demo__/checkable.md

@import ./__demo__/checked-strategy.md

@import ./__demo__/popup-visible.md

@import ./__demo__/field-names.md

@import ./__demo__/virtual.md

@import ./__demo__/fallback.md

## API


### `<tree-select>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|disabled|Whether to disable|`boolean`|`false`||
|loading|Whether it is loading state|`boolean`|`false`||
|error|Whether it is an error state|`boolean`|`false`||
|size|The size of the selection box.|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|border|Whether to show the border|`boolean`|`false`||
|allow-search|Whether to allow searching|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||
|allow-clear|Whether to allow clear|`boolean`|`false`||
|placeholder|Prompt copy|`string`|`-`||
|max-tag-count|The maximum number of labels displayed, only valid in multi-select mode|`number`|`-`||
|multiple|Whether to support multiple selection|`boolean`|`false`||
|default-value|Default value|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||
|model-value **(v-model)**|Value|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||
|field-names|Specify the field name in the node data|`TreeFieldNames`|`-`||
|data|Data|`TreeNodeData[]`|`[]`||
|label-in-value|Set the value format. The default is string, when set to true, the value format is: {label: string, value: string}|`boolean`|`false`||
|tree-checkable|Whether to show checkbox|`boolean`|`false`||
|tree-check-strictly|Whether the parent and child nodes are related|`boolean`|`false`||
|tree-checked-strategy|Customized echo method|`'all' \| 'parent' \| 'child'`|`'all'`||
|tree-props|Can accept Props of all [Tree](/vue/component/tree) components|`Partial<TreeProps>`|`-`||
|trigger-props|Can accept Props of all [Trigger](/vue/component/trigger) components|`Partial<TriggerProps>`|`-`||
|popup-visible **(v-model)**|Whether the pop-up box is visible|`boolean`|`-`||
|default-popup-visible|Whether the default pop-up box is visible|`boolean`|`false`||
|dropdown-style|Drop-down box style|`CSSProperties`|`-`||
|dropdown-class-name|Drop-down box style class|`string \| string[]`|`-`||
|filter-tree-node|Custom node filter function|`(searchKey: string, nodeData: TreeNodeData) => boolean`|`-`||
|load-more|Load data dynamically|`(nodeData: TreeNodeData) => Promise<void>`|`-`||
|disable-filter|Disable internal filtering logic|`boolean`|`false`||
|popup-container|Mount container for pop-up box|`string \| HTMLElement \| undefined`|`-`||
|fallback-option|Customize node data for keys that do not match options|`boolean \| ((key: number \| string) => TreeNodeData \| boolean)`|`true`|2.22.0|
|selectable|Set the nodes that can be selected, all can be selected by default|`boolean\| 'leaf'\| ((    node: TreeNodeData,    info: { isLeaf: boolean; level: number }  ) => boolean)`|`true`|2.27.0|
|scrollbar|Whether to enable virtual scroll bar|`boolean \| ScrollbarProps`|`true`|2.39.0|
### `<tree-select>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `string \| number \| LabelValue \| Array<string \| number> \| LabelValue[] \| undefined`|
|popup-visible-change|Triggered when the status of the drop-down box changes|visible: `boolean`|
|search|Triggered when the search value changes|searchKey: `string`|
|clear|Triggered when clear is clicked|-|
### `<tree-select>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|trigger|Custom trigger element|-||
|prefix|Prefix|-||
|label|Custom Label|data: `mixed`||
|header|The header of the drop-down box|-||
|loader|Customizing the content displayed during loading|-||
|empty|Custom empty data display|-||
|footer|The footer of the drop-down box|-||
|tree-slot-extra|Render additional node content of the tree component|-||
|tree-slot-title|Custom the node title of the tree component|-||
|tree-slot-icon|Custom node icon for the tree component|node: `TreeNodeData`|2.18.0|
|tree-slot-switcher-icon|Custom switcher icon for the tree component|-||


