```yaml
meta:
  type: 组件
  category: 数据输入
title: 级联选择 Cascader
description: 指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。
```

@import ./__demo__/basic.md

@import ./__demo__/clear.md

@import ./__demo__/disabled.md

@import ./__demo__/format.md

@import ./__demo__/multiple.md

@import ./__demo__/check-strictly.md

@import ./__demo__/loading.md

@import ./__demo__/lazy-load.md

@import ./__demo__/search.md

@import ./__demo__/path.md

@import ./__demo__/field-names.md

@import ./__demo__/panel.md

## API


### `<cascader>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|path-mode|绑定值是否为路径|`boolean`|`false`||
|multiple|是否为多选状态（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| Array<string \| number>\| undefined\| (string \| number \| Array<string \| number>)[]`|`-`||
|default-value|默认值（非受控状态）|`string\| number\| Array<string \| number>\| undefined\| (string \| number \| Array<string \| number>)[]`|`'' \| undefined \| []`||
|options|级联选择器的选项|`CascaderOption[]`|`[]`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-search|是否允许搜索|`boolean`|`false (single) \| true (multiple)`||
|allow-clear|是否允许清除|`boolean`|`false`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控状态）|`string`|`''`||
|popup-visible **(v-model)**|是否显示下拉框|`boolean`|`-`||
|expand-trigger|展开下一级的触发方式|`string`|`'click'`||
|default-popup-visible|是否默认显示下拉框（非受控状态）|`boolean`|`false`||
|placeholder|占位符|`string`|`-`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`||
|max-tag-count|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`||
|format-label|格式化展示内容|`(options: CascaderOptionInfo[]) => string`|`-`||
|trigger-props|下拉菜单的触发器属性|`TriggerProps`|`-`||
|check-strictly|是否开启严格选择模式|`boolean`|`false`||
|load-more|数据懒加载函数，传入时开启懒加载功能|`(  option: CascaderOptionInfo,  done: (children?: CascaderOption[]) => void) => void`|`-`|2.13.0|
|loading|是否为加载中状态|`boolean`|`false`|2.15.0|
|search-option-only-label|搜索下拉菜单中的选项是否仅展示标签|`boolean`|`false`|2.18.0|
|search-delay|触发搜索事件的延迟时间|`number`|`500`|2.18.0|
|field-names|自定义 `CascaderOption` 中的字段|`CascaderFieldNames`|`-`|2.22.0|
### `<cascader>` Events

|事件名|描述|参数|
|---|---|---|
|change|选中值改变时触发|value: `string \| string[] \| undefined \| (string \| string[])[]`|
|input-value-change|输入值改变时触发|value: `string`|
|clear|点击清除按钮时触发|-|
|search|用户搜索时触发|value: `string`|
|popup-visible-change|下拉框的显示状态改变时触发|visible: `boolean`|
|focus|获得焦点时触发|-|
|blur|失去焦点时触发|-|
### `<cascader>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选择框的显示内容|data: `CascaderOption`|2.18.0|
|prefix|前缀元素|-|2.23.0|
|arrow-icon|选择框的箭头图标|-|2.16.0|
|loading-icon|选择框的加载中图标|-|2.16.0|
|search-icon|选择框的搜索图标|-|2.16.0|
|empty|选项为空时的显示内容|-|2.23.0|
|option|选项内容|data: `CascaderOption`|2.18.0|




### `<cascader-panel>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|path-mode|绑定值是否为路径|`boolean`|`false`||
|multiple|是否为多选状态（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| Array<string \| number>\| undefined\| (string \| number \| Array<string \| number>)[]`|`-`||
|default-value|默认值（非受控状态）|`string\| number\| Array<string \| number>\| undefined\| (string \| number \| Array<string \| number>)[]`|`'' \| undefined \| []`||
|options|级联选择器的选项|`CascaderOption[]`|`[]`||
|expand-trigger|展开下一级的触发方式|`string`|`'click'`||
|check-strictly|是否开启严格选择模式|`boolean`|`false`||
|load-more|数据懒加载函数，传入时开启懒加载功能|`(  option: CascaderOptionInfo,  done: (children?: CascaderOption[]) => void) => void`|`-`|2.13.0|
|field-names|自定义 `CascaderOption` 中的字段|`CascaderFieldNames`|`-`|2.22.0|
### `<cascader-panel>` Events

|事件名|描述|参数|
|---|---|---|
|change|选中值改变时触发|value: `string \| string[] \| undefined \| (string \| string[])[]`|
### `<cascader-panel>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|empty|选项为空时的显示内容|-|2.23.0|




### CascaderOption

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值|`string \| number`|`-`||
|label|选项文本|`string`|`-`||
|render|自定义渲染|`RenderFunction`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tagProps|展示的标签属性|`TagProps`|`-`|2.8.0|
|children|下一级选项|`CascaderOption[]`|`-`||
|isLeaf|是否是叶子节点|`boolean`|`false`||


