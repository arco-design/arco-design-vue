```yaml
meta:
  type: Component
  category: Data Display
title: Tree
description: For content with many levels, such as folders, catalogs, and organizational structures, the tree can clearly show their hierarchical relationship, and has interactive functions such as expanding, collapsing, and selecting.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/block-node.md

@import ./__demo__/multiple.md

@import ./__demo__/checkable.md

@import ./__demo__/control.md

@import ./__demo__/load-more.md

@import ./__demo__/draggable.md

@import ./__demo__/checked-strategy.md

@import ./__demo__/show-line.md

@import ./__demo__/size.md

@import ./__demo__/node-icon.md

@import ./__demo__/render-extra.md

@import ./__demo__/icons.md

@import ./__demo__/virtual.md

@import ./__demo__/search.md

@import ./__demo__/field-names.md

## API


### `<tree>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|size|Size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|block-node|Whether the node occupies a row|`boolean`|`false`||
|default-expand-all|Whether to expand the parent node by default|`boolean`|`true`||
|multiple|Whether to support multiple selection|`boolean`|`false`||
|checkable|Whether to add a checkbox before the node, function format is supported since `2.27.0`|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`false`||
|selectable|Whether to support selection, function format is supported since `2.27.0`|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`true`||
|check-strictly|Whether to cancel the parent-child node association|`boolean`|`false`||
|checked-strategy|Customized backfill method <br/> all: return all selected nodes <br/> parent: return only parent node when both parent and child nodes are selected <br/> child: return only child nodes|`'all' \| 'parent' \| 'child'`|`'all'`||
|default-selected-keys|Tree node selected by default|`Array<string \| number>`|`-`||
|selected-keys **(v-model)**|Selected tree node|`Array<string \| number>`|`-`||
|default-checked-keys|Tree node with checkbox selected by default|`Array<string \| number>`|`-`||
|checked-keys **(v-model)**|Tree node with check box selected|`Array<string \| number>`|`-`||
|default-expanded-keys|Nodes expanded by default|`Array<string \| number>`|`-`||
|expanded-keys **(v-model)**|Expanded node|`Array<string \| number>`|`-`||
|data|Pass in `data` to generate the corresponding tree structure|`TreeNodeData[]`|`[]`||
|field-names|Specify the field name in the node data|`TreeFieldNames`|`-`||
|show-line|Whether to display the connection line|`boolean`|`false`||
|load-more|A callback for loading data asynchronously, returning a `Promise`|`(node: TreeNodeData) => Promise<void>`|`-`||
|draggable|Whether it can be dragged|`boolean`|`false`||
|allow-drop|Whether to allow release on a node when dragging|`(options: {  dropNode: TreeNodeData;  dropPosition: -1 \| 0 \| 1;}) => boolean`|`-`||
|virtual-list-props|Pass virtual list properties, pass in this parameter to turn on virtual scrolling, [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|default-expand-selected|Whether to expand the parent node of the selected node by default|`boolean`|`false`|2.9.0|
|default-expand-checked|Whether to expand the parent node of the checked node by default|`boolean`|`false`|2.9.0|
|auto-expand-parent|Whether to automatically expand the parent node of the expanded node|`boolean`|`true`|2.9.0|
|half-checked-keys **(v-model)**|The keys of half checked. Only valid when checkable and checkStrictly|`Array<string \| number>`|`-`|2.19.0|
|only-check-leaf|When enabled, checkedKeys is only for checked leaf nodes, and the status of the parent node is determined by the child node.(Only valid when checkable and checkStrictly is false)|`boolean`|`false`|2.21.0|
|animation|Whether to enable expand transition animation|`boolean`|`true`|2.21.0|
|action-on-node-click|The action triggered when the node is clicked|`'expand'`|`-`|2.27.0|
### `<tree>` Events

|Event Name|Description|Parameters|
|---|---|---|
|select|Triggered when the tree node is clicked|selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|check|Triggered when the tree node checkbox is clicked. `halfCheckedKeys` and `halfCheckedNodes` support from `2.19.0`.|checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }`|
|expand|Expand/close|expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|drag-start|Node starts dragging|-|
|drag-end|Node end drag|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-over|The node is dragged to the releasable target|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-leave|Node leaves to release the target|ev: `DragEvent`<br>node: `TreeNodeData`|
|drop|The node is released on a releasable target|data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`|
### `<tree>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|scrollIntoView|Virtual list scroll to an element|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-||
|getSelectedNodes|Get selected nodes|-|TreeNodeData[]|2.19.0|
|getCheckedNodes|Get checked nodes. Supports passing in `checkedStrategy`, if not passed, the configuration of the component is taken.|options: ` checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean; `|TreeNodeData[]|2.19.0|
|getHalfCheckedNodes|Get half checked nodes|-|TreeNodeData[]|2.19.0|
|getExpandedNodes|Get expanded nodes|-|TreeNodeData[]|2.19.0|
|checkAll|Set the checkbox state of all nodes|checked: ` boolean `|-|2.20.0|
|checkNode|Sets the checkbox state of the specified node|key: ` TreeNodeKey \| TreeNodeKey[] `<br>checked: ` boolean `<br>onlyCheckLeaf: ` boolean `|-|2.20.0，onlyCheckLeaf from 2.21.0|
|selectAll|Set the selected state of all nodes|selected: ` boolean `|-|2.20.0|
|selectNode|Sets the selected state of the specified node|key: ` TreeNodeKey \| TreeNodeKey[] `<br>selected: ` boolean `|-|2.20.0|
|expandAll|Set the expanded state of all nodes|expanded: ` boolean `|-|2.20.0|
|expandNode|Sets the expanded state of the specified node|key: ` TreeNodeKey \| TreeNodeKey[] `<br>expanded: ` boolean `|-|2.20.0|
### `<tree>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|title|Title|-||
|extra|Render additional node content|-||
|drag-icon|Custom drag icon|node: `TreeNodeData`||
|loading-icon|Custom loading icon|-||
|switcher-icon|Custom switcher icon|-||
|icon|Custom node icon|node: `TreeNodeData`|2.18.0|




### TreeNodeData

|Name|Description|Type|Default|
|---|---|---|:---:|
|key|Unique key|`string \| number`|`-`|
|title|The title of the node|`string`|`-`|
|selectable|Whether to allow selection|`boolean`|`false`|
|disabled|Whether to disable the node|`boolean`|`false`|
|disableCheckbox|Whether to disable the checkbox|`boolean`|`false`|
|checkable|Whether to show checkbox|`boolean`|`false`|
|draggable|Whether it can be dragged|`boolean`|`false`|
|isLeaf|Whether it is a leaf node. Effective when loading dynamically|`boolean`|`false`|
|icon|Node icon|`() => VNode`|`-`|
|switcherIcon|Custom switcher icon, priority is greater than tree|`() => VNode`|`-`|
|loadingIcon|Customize loading icon, priority is greater than tree|`() => VNode`|`-`|
|dragIcon|Custom drag icon, priority is greater than tree|`() => VNode`|`-`|
|children|Child node|`TreeNodeData[]`|`-`|



### TreeFieldNames

|Name|Description|Type|Default|
|---|---|---|:---:|
|key|Specify the field name of key in TreeNodeData|`string`|`key`|
|title|Specify the field name of title in TreeNodeData|`string`|`title`|
|disabled|Specify the field name of disabled in TreeNodeData|`string`|`disabled`|
|children|Specify the field name of children in TreeNodeData|`string`|`children`|
|isLeaf|Specify the field name of isLeaf in TreeNodeData|`string`|`isLeaf`|
|disableCheckbox|Specify the field name of disableCheckbox in TreeNodeData|`string`|`disableCheckbox`|
|checkable|Specify the field name of checkable in TreeNodeData|`string`|`checkable`|
|icon|Specify the field name of icon in TreeNodeData|`string`|`checkable`|




### VirtualListProps

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|height|Viewable area height|`number \| string`|`-`||
|threshold|The threshold of the number of elements to enable virtual scrolling. When the number of data is less than the threshold, virtual scrolling will not be enabled.|`number`|`-`||
|isStaticItemHeight|(Repealed) Is the element height fixed. Version 2.18.0 deprecated, please use `fixedSize`|`boolean`|`false`||
|fixedSize|Is the element height fixed.|`boolean`|`false`|2.34.1|
|estimatedSize|Is the element height fixed.|`number`|`-`|2.34.1|
|buffer|The number of elements mounted in advance outside the boundary of the viewport.|`number`|`10`|2.34.1|


