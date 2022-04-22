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

@import ./__demo__/remote.md

@import ./__demo__/group.md

@import ./__demo__/label.md

@import ./__demo__/linkage.md

@import ./__demo__/field-names.md

@import ./__demo__/virtual-list.md

## API


### `<select>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| Record<string, unknown>\| (string \| number \| Record<string, unknown>)[]`|`-`||
|default-value|默认值（非受控模式）|`string\| number\| Record<string, unknown>\| (string \| number \| Record<string, unknown>)[]`|`'' \| []`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控模式）|`string`|`''`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|placeholder|占位符|`string`|`-`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|allow-clear|是否允许清空|`boolean`|`false`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||
|allow-create|是否允许创建|`boolean`|`false`||
|max-tag-count|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|bordered|是否显示输入框的边框|`boolean`|`true`||
|popup-visible **(v-model)**|是否显示下拉菜单|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|unmount-on-close|是否在下拉菜单关闭时销毁元素|`boolean`|`false`||
|filter-option|是否过滤选项|`boolean \| ((inputValue: string, option: SelectOptionData) => boolean)`|`true`||
|options|选项数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`||
|trigger-props|下拉菜单的触发器属性|`TriggerProps`|`-`||
|format-label|格式化显示内容|`(data: SelectOptionData) => string`|`-`||
|fallback-option|自定义值中不存在的选项|`boolean\| ((    value: string \| number \| Record<string, unknown>  ) => SelectOptionData)`|`true`|2.10.0|
|show-extra-options|是否在下拉菜单中显示额外选项|`boolean`|`true`|2.10.0|
|value-key|用于确定选项键值得属性名|`string`|`'value'`|2.18.0|
|search-delay|触发搜索事件的延迟时间|`number`|`500`|2.18.0|
|limit|多选时最多的选择个数|`number`|`0`|2.18.0|
|field-names|自定义 `SelectOptionData` 中的字段|`SelectFieldNames`|`-`|2.22.0|
### `<select>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|-||
|input-value-change|输入框的值发生改变时触发|-||
|popup-visible-change|下拉框的显示状态改变时触发|-||
|clear|点击清除按钮时触发|popupVisible: `boolean`||
|remove|点击标签的删除按钮时触发|-||
|search|用户搜索时触发|-||
|dropdown-scroll|下拉菜单发生滚动时触发|-||
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|-||
|exceed-limit|多选超出限制时触发|value: `mixed`|2.18.0|
### `<select>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|trigger|自定义触发元素|-|2.22.0|
|prefix|前缀元素|-|2.22.0|
|search-icon|选择框的搜索图标|-|2.16.0|
|loading-icon|选择框的加载中图标|-|2.16.0|
|arrow-icon|选择框的箭头图标|-|2.16.0|
|footer|下拉框的页脚|-||
|label|选择框的显示内容|data: `SelectOptionData`||
|option|选项内容|data: `SelectOptionData`||
|empty|选项为空时的显示内容|-||




### `<option>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（如不填，会从内容中获取）|`string\|number\|object`|`-`||
|label|选项标签（如不填，会从内容中获取）|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tag-props|展示的标签属性|`TagProps`|`-`|2.8.0|
|extra|额外数据。2.18.0 版本废弃，可使用对象形式的 value 扩展数据|`object`|`-`|2.10.0|
|index|用于手动指定选项的 index|`number`|`-`|2.20.0|




### `<optgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项组的标题|`string`|`-`|
### `<optgroup>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选项组的标题|-|2.10.0|



```ts
/**
 * @zh 选项
 * @en Option
 */
type Option = string | number | SelectOptionData | SelectOptionGroup;

/**
 * @zh 筛选
 * @en Filter
 */
type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);
```


### SelectOptionData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string \| number \| Record<string, unknown>`|`-`|
|label|选项内容|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|tagProps|选项对应的多选标签的属性|`any`|`-`|
|render|自定义渲染|`RenderFunction`|`-`|



### SelectOptionGroup

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|isGroup|是否为选项组|`true`|`-`|
|label|选项组标题|`string`|`-`|
|options|选项组中的选项|`SelectOption[]`|`-`|


