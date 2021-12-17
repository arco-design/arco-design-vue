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


### `<tree>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|size|Size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|block-node|Whether the node occupies a row|`boolean`|`false`||
|default-expand-all|Whether to expand the parent node by default|`boolean`|`true`||
|multiple|Whether to support multiple selection|`boolean`|`false`||
|checkable|Whether to add a checkbox before the node|`boolean`|`false`||
|selectable|Whether to support selection|`boolean`|`true`||
|check-strictly|Whether to cancel the parent-child node association|`boolean`|`false`||
|checked-strategy|Customized backfill method <br/> all: return all selected nodes <br/> parent: return only parent node when both parent and child nodes are selected <br/> child: return only child nodes|`'all' \| 'parent' \| 'child'`|`'all'`||
|default-selected-keys|Tree node selected by default|`Array<string \| number>`|`-`||
|selected-keys **(v-model)**|Selected tree node|`Array<string \| number>`|`-`||
|default-checked-keys|Tree node with checkbox selected by default|`Array<string \| number>`|`-`||
|checked-keys **(v-model)**|Tree node with check box selected|`Array<string \| number>`|`-`||
|default-expanded-keys|Nodes expanded by default|`Array<string \| number>`|`-`||
|expanded-keys **(v-model)**|Expanded node|`Array<string \| number>`|`-`||
|data|Pass in `data` to generate the corresponding tree structure|`TreeNodeData[]`|`[]`||
|field-names|Specify the field name in the node data|`FieldNames`|`-`||
|show-line|Whether to display the connection line|`boolean`|`false`||
|load-more|A callback for loading data asynchronously, returning a `Promise`|`(node: TreeNodeData) => Promise<void>`|`-`||
|draggable|Whether it can be dragged|`boolean`|`false`||
|allow-drop|Whether to allow release on a node when dragging|`(options: {  dropNode: TreeNodeData;  dropPosition: -1 \| 0 \| 1;}) => boolean`|`-`||
|virtual-list-props|Pass virtual list properties, pass in this parameter to turn on virtual scrolling, [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`||
|default-expand-selected|Whether to expand the parent node of the selected node by default|`boolean`|`false`|2.9.0|
|default-expand-checked|Whether to expand the parent node of the checked node by default|`boolean`|`false`|2.9.0|
|auto-expand-parent|Whether to automatically expand the parent node of the expanded node|`boolean`|`true`|2.9.0|
### `<tree>` Events

|Event Name|Description|Parameters|
|---|---|---|
|select|Triggered when the tree node is clicked|selectedKeys: `Array<string \| number>`<br>event: `{ selected: boolean; selectedNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }`|
|check|Triggered when the tree node checkbox is clicked|checkedKeys: `Array<string \| number>`<br>event: `{ checked: boolean; checkedNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }`|
|expand|Expand/close|expandKeys: `Array<string \| number>`<br>event: `{ expand: boolean; expandNodes: TreeNodeData[]; node: TreeNodeData; e: Event; }`|
|drag-start|Node starts dragging|-|
|drag-end|Node end drag|event: `DragEvent`<br>node: `TreeNodeData`|
|drag-over|The node is dragged to the releasable target|event: `DragEvent`<br>node: `TreeNodeData`|
|drag-leave|Node leaves to release the target|event: `DragEvent`<br>node: `TreeNodeData`|
|drop|The node is released on a releasable target|info: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: -1 ｜ 0 ｜ 1; }`|
### `<tree>` Methods

|Method|Description|Parameters|Return|
|---|---|---|:---:|
|scrollIntoView|Virtual list scroll to an element|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-|
### `<tree>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|switcher-icon|Custom switcher icon|-|
|loading-icon|Custom loading icon|-|
|drag-icon|Custom drag icon|-|
|extra|Render additional node content|-|
|title|Title|-|




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
|icon|Node icon|`() => VNode[]`|`-`|
|switcherIcon|Custom switcher icon, priority is greater than tree|`() => VNode[]`|`-`|
|loadingIcon|Customize loading icon, priority is greater than tree|`() => VNode[]`|`-`|
|dragIcon|Custom drag icon, priority is greater than tree|`() => VNode[]`|`-`|
|children|Child node|`TreeNodeData[]`|`-`|



### FieldNames

|Name|Description|Type|Default|
|---|---|---|:---:|
|disabled|是否禁用|`string`|`-`|



### FieldNames

```ts
interface FieldNames {
  // Specify the key corresponding to the field in TreeNodeData
  key?: string;
  // Specify the corresponding field of title in TreeNodeData
  title?: string;
  disabled?: string;
  children?: string;
  isLeaf?: string;
  disableCheckbox?: string;
  checkable?: string;
};
```


### VirtualListProps

|Name|Description|Type|Default|
|---|---|---|:---:|
|height|Viewable area height|`number \| string`|`-`|
|threshold|Threshold for the number of elements that automatically turn on virtual scrolling, passing in null means that virtual scrolling is prohibited|`number \| null`|`-`|
|isStaticItemHeight|Is the element height fixed|`boolean`|`false`|


