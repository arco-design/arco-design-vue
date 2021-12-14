```yaml
meta:
  type: 组件
  category: 数据输入
title: 选择器 Select
description: 当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。
```


@import ./__demo__/basic.md

@import ./__demo__/clear.md

@import ./__demo__/multiple.md

@import ./__demo__/size.md

@import ./__demo__/loading.md

@import ./__demo__/footer.md

@import ./__demo__/border.md

@import ./__demo__/create.md

@import ./__demo__/search.md

@import ./__demo__/scroll.md

@import ./__demo__/fallback.md

@import ./__demo__/group.md

@import ./__demo__/label.md

@import ./__demo__/linkage.md

@import ./__demo__/virtual-list.md


### `<select>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string \| number \| (string \| number)[]`|`-`||
|default-value|默认值（非受控模式）|`string \| number \| (string \| number)[]`|`'' | []`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控模式）|`string`|`''`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|placeholder|占位符|`string`|`-`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|allow-clear|是否允许清空|`boolean`|`false`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) | true (multiple)`||
|allow-create|是否允许创建|`boolean`|`false`||
|max-tag-count|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|bordered|是否显示输入框的边框|`boolean`|`true`||
|popup-visible **(v-model)**|是否显示下拉菜单|`boolean`|`-`||
|unmount-on-close|是否在下拉菜单关闭时销毁元素|`boolean`|`true`||
|filter-option|是否过滤选项|`boolean \| ((inputValue: string, optionInfo: OptionInfo) => boolean)`|`true`||
|options|选项数据|`Option[]`|`[]`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`||
|trigger-props|下拉菜单的触发器属性|`TriggerProps`|`-`||
|format-label|格式化显示内容|`(data: OptionInfo) => string`|`-`||
|fallback-option|自定义值中不存在的选项|`boolean \| ((value: string \| number) => OptionData)`|`false`|2.10.0|
|show-extra-options|是否在下拉菜单中显示额外选项|`boolean`|`true`|2.10.0|
### `<select>` Events

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|-|
|input-value-change|输入框的值发生改变时触发|-|
|popup-visible-change|下拉框的显示状态改变时触发|-|
|clear|点击清除按钮时触发|-|
|remove|点击标签的删除按钮时触发|-|
|search|用户搜索时触发|-|
|dropdown-scroll|下拉菜单发生滚动时触发|-|
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|-|
### `<select>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|footer|下拉框的页脚|-|
|label|选择框的显示内容|data: `OptionInfo`|
|option|选项内容|data: `OptionInfo`|
|empty|选项为空时的显示内容|-|




### `<option>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（如不填，会从内容中获取）|`string\|number`|`-`||
|label|选项标签（如不填，会从内容中获取）|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tag-props|展示的标签属性|`TagProps`|`-`|2.8.0|
|extra|额外数据|`object`|`-`|2.10.0|
### `<option>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|suffix|后缀|-|2.10.0|
|icon|图标|-|2.10.0|




### `<optgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项组的标题|`string`|`-`|
### `<optgroup>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选项组的标题|-|2.10.0|




### OptionData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string \| number`|`-`|
|label|选项内容|`string`|`-`|
|render|自定义渲染|`RenderFunction`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|tagProps|选项标签的Props|`any`|`-`|



### GroupOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|isGroup|是否为选项组|`true`|`-`|
|label|选项组标题|`string`|`-`|
|options|选项组中的选项|`Option[]`|`-`|



### OptionInfo

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|index|选项的 index|`number`|`-`|
|key|选项的 key|`string`|`-`|
|origin|选项的来源|`'options' \| 'extraOptions'`|`-`|


