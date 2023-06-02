```yaml
meta:
  type: 组件
  category: 数据输入
title: 树选择 TreeSelect
description: 可以对树形结构数据进行选择。
```

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

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|disabled|是否禁用|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|border|是否显示边框|`boolean`|`false`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||
|allow-clear|是否允许清除|`boolean`|`false`||
|placeholder|提示文案|`string`|`-`||
|max-tag-count|最多显示的标签数量，仅在多选模式有效|`number`|`-`||
|multiple|是否支持多选|`boolean`|`false`||
|default-value|默认值|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||
|model-value **(v-model)**|绑定值|`string \| number \| Array<string \| number> \| LabelValue \| LabelValue[]`|`-`||
|field-names|指定节点数据中的字段名|`TreeFieldNames`|`-`||
|data|数据|`TreeNodeData[]`|`[]`||
|label-in-value|设置value格式。默认是string，设置为true时候，value格式为： { label: string, value: string }|`boolean`|`false`||
|tree-checkable|是否展示复选框|`boolean`|`false`||
|tree-check-strictly|父子节点是否关联|`boolean`|`false`||
|tree-checked-strategy|定制回显方式|`'all' \| 'parent' \| 'child'`|`'all'`||
|tree-props|可以接受所有 [Tree](/vue/component/tree) 组件的Props|`Partial<TreeProps>`|`-`||
|trigger-props|可以接受所有 [Trigger](/vue/component/trigger) 组件的Props|`Partial<TriggerProps>`|`-`||
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|默认弹出框是否可见|`boolean`|`false`||
|dropdown-style|下拉框样式|`CSSProperties`|`-`||
|dropdown-class-name|下拉框样式 class|`string \| string[]`|`-`||
|filter-tree-node|自定义节点过滤函数|`(searchKey: string, nodeData: TreeNodeData) => boolean`|`-`||
|load-more|动态加载数据|`(nodeData: TreeNodeData) => Promise<void>`|`-`||
|disable-filter|禁用内部过滤逻辑|`boolean`|`false`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| undefined`|`-`||
|fallback-option|为 value 中找不到匹配项的 key 定义节点数据|`boolean \| ((key: number \| string) => TreeNodeData \| boolean)`|`true`|2.22.0|
|selectable|设置可选择的节点，默认全部可选|`boolean\| 'leaf'\| ((    node: TreeNodeData,    info: { isLeaf: boolean; level: number }  ) => boolean)`|`true`|2.27.0|
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|2.39.0|
### `<tree-select>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `string \| number \| LabelValue \| Array<string \| number> \| LabelValue[] \| undefined`|
|popup-visible-change|下拉框显示状态改变时触发|visible: `boolean`|
|search|搜索值变化时触发|searchKey: `string`|
|clear|点击清除时触发|-|
### `<tree-select>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|trigger|自定义触发元素|-||
|prefix|前缀|-||
|label|自定义选择框显示|data: `mixed`||
|header|自定义下拉框页头|-||
|loader|定制加载中显示的内容|-||
|empty|定制空数据展示|-||
|footer|自定义下拉框页脚|-||
|tree-slot-extra|定制 tree 组件的渲染额外节点内容|-||
|tree-slot-title|定制 tree 组件的节点标题|-||
|tree-slot-icon|定制 tree 组件的节点图标|node: `TreeNodeData`|2.18.0|
|tree-slot-switcher-icon|定制 tree 组件的 switcher 图标|-||


