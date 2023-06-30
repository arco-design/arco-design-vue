```yaml
meta:
  type: 组件
  category: 数据展示
title: 树 Tree
description: 对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。
```

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

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|size|尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|block-node|节点是否占据一行|`boolean`|`false`||
|default-expand-all|是否默认展开父节点|`boolean`|`true`||
|multiple|是否支持多选|`boolean`|`false`||
|checkable|是否在节点前添加复选框，从 `2.27.0` 开始支持函数格式|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`false`||
|selectable|是否支持选择，从 `2.27.0` 开始支持函数格式|`boolean\| ((    node: TreeNodeData,    info: {      level: number;      isLeaf: boolean;    }  ) => boolean)`|`true`||
|check-strictly|是否取消父子节点关联|`boolean`|`false`||
|checked-strategy|定制回填方式 <br/> all: 返回所有选中的节点  <br/> parent: 父子节点都选中时只返回父节点 <br/> child: 只返回子节点|`'all' \| 'parent' \| 'child'`|`'all'`||
|default-selected-keys|默认选中的树节点|`Array<string \| number>`|`-`||
|selected-keys **(v-model)**|选中的树节点|`Array<string \| number>`|`-`||
|default-checked-keys|默认选中复选框的树节点|`Array<string \| number>`|`-`||
|checked-keys **(v-model)**|选中复选框的树节点|`Array<string \| number>`|`-`||
|default-expanded-keys|默认展开的节点|`Array<string \| number>`|`-`||
|expanded-keys **(v-model)**|展开的节点|`Array<string \| number>`|`-`||
|data|传入`data`,生成对应的树结构|`TreeNodeData[]`|`[]`||
|field-names|指定节点数据中的字段名|`TreeFieldNames`|`-`||
|show-line|是否展示连接线|`boolean`|`false`||
|load-more|异步加载数据的回调，返回一个 `Promise`|`(node: TreeNodeData) => Promise<void>`|`-`||
|draggable|是否可以拖拽|`boolean`|`false`||
|allow-drop|拖拽时是否允许在某节点上释放|`(options: {  dropNode: TreeNodeData;  dropPosition: -1 \| 0 \| 1;}) => boolean`|`-`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动，[VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|default-expand-selected|是否默认展开已选中节点的父节点|`boolean`|`false`|2.9.0|
|default-expand-checked|是否默认展开已选中复选框节点的父节点|`boolean`|`false`|2.9.0|
|auto-expand-parent|是否自动展开已展开节点的父节点|`boolean`|`true`|2.9.0|
|half-checked-keys **(v-model)**|半选状态的节点.仅在 checkable 且 checkStrictly 时生效|`Array<string \| number>`|`-`|2.19.0|
|only-check-leaf|开启后 checkedKeys 只处理叶子节点，父节点状态由子节点决定（仅在 checkable 且 checkStrictly 为 false 时生效）|`boolean`|`false`|2.21.0|
|animation|是否开启展开时的过渡动效|`boolean`|`true`|2.21.0|
|action-on-node-click|点击节点的时候触发的动作|`'expand'`|`-`|2.27.0|
### `<tree>` Events

|事件名|描述|参数|
|---|---|---|
|select|点击树节点时触发|selectedKeys: `Array<string \| number>`<br>data: `{ selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|check|点击树节点复选框时触发。`halfCheckedKeys` 和 `halfCheckedNodes` 从 `2.19.0` 开始支持。|checkedKeys: `Array<string \| number>`<br>data: `{ checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }`|
|expand|展开/关闭|expandKeys: `Array<string \| number>`<br>data: `{ expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }`|
|drag-start|节点开始拖拽|-|
|drag-end|节点结束拖拽|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-over|节点被拖拽至可释放目标|ev: `DragEvent`<br>node: `TreeNodeData`|
|drag-leave|节点离开可释放目标|ev: `DragEvent`<br>node: `TreeNodeData`|
|drop|节点在可释放目标上释放|data: `{ e: DragEvent; dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: number; }`|
### `<tree>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|scrollIntoView|虚拟列表滚动某个元素|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-||
|getSelectedNodes|获取选中的节点|-|TreeNodeData[]|2.19.0|
|getCheckedNodes|获取选中复选框的节点。支持传入 `checkedStrategy`，没有传则取组件的配置。|options: ` checkedStrategy?: 'all' \| 'parent' \| 'child'; includeHalfChecked?: boolean; `|TreeNodeData[]|2.19.0|
|getHalfCheckedNodes|获取复选框半选的节点|-|TreeNodeData[]|2.19.0|
|getExpandedNodes|获取展开的节点|-|TreeNodeData[]|2.19.0|
|checkAll|设置全部节点的复选框状态|checked: ` boolean `|-|2.20.0|
|checkNode|设置指定节点的复选框状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>checked: ` boolean `<br>onlyCheckLeaf: ` boolean `|-|2.20.0，onlyCheckLeaf from 2.21.0|
|selectAll|设置全部节点的选中状态|selected: ` boolean `|-|2.20.0|
|selectNode|设置指定节点的选中状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>selected: ` boolean `|-|2.20.0|
|expandAll|设置全部节点的展开状态|expanded: ` boolean `|-|2.20.0|
|expandNode|设置指定节点的展开状态|key: ` TreeNodeKey \| TreeNodeKey[] `<br>expanded: ` boolean `|-|2.20.0|
### `<tree>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|标题|-||
|extra|渲染额外的节点内容|-||
|drag-icon|定制 drag 图标|node: `TreeNodeData`||
|loading-icon|定制 loading 图标|-||
|switcher-icon|定制 switcher 图标|-||
|icon|定制节点图标|node: `TreeNodeData`|2.18.0|




### TreeNodeData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|唯一标示|`string \| number`|`-`|
|title|该节点显示的标题|`string`|`-`|
|selectable|是否允许选中|`boolean`|`false`|
|disabled|是否禁用节点|`boolean`|`false`|
|disableCheckbox|是否禁用复选框|`boolean`|`false`|
|checkable|是否显示多选框|`boolean`|`false`|
|draggable|是否可以拖拽|`boolean`|`false`|
|isLeaf|是否是叶子节点。动态加载时有效|`boolean`|`false`|
|icon|节点的图标|`() => VNode`|`-`|
|switcherIcon|定制 switcher 图标，优先级大于 tree|`() => VNode`|`-`|
|loadingIcon|定制 loading 图标，优先级大于 tree|`() => VNode`|`-`|
|dragIcon|定制 drag 图标，优先级大于 tree|`() => VNode`|`-`|
|children|子节点|`TreeNodeData[]`|`-`|



### TreeFieldNames

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|指定 key 在 TreeNodeData 中的字段名|`string`|`key`|
|title|指定 title 在 TreeNodeData 中的字段名|`string`|`title`|
|disabled|指定 disabled 在 TreeNodeData 中的字段名|`string`|`disabled`|
|children|指定 children 在 TreeNodeData 中的字段名|`string`|`children`|
|isLeaf|指定 isLeaf 在 TreeNodeData 中的字段名|`string`|`isLeaf`|
|disableCheckbox|指定 disableCheckbox 在 TreeNodeData 中的字段名|`string`|`disableCheckbox`|
|checkable|指定 checkable 在 TreeNodeData 中的字段名|`string`|`checkable`|
|icon|指定 icon 在 TreeNodeData 中的字段名|`string`|`checkable`|




### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|2.34.1|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|2.34.1|


