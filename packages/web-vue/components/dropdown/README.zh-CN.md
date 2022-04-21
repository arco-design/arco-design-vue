```yaml
meta:
  type: 组件
  category: 导航
title: 下拉菜单 Dropdown
description: 页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。
```

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/trigger.md

@import ./__demo__/button.md

@import ./__demo__/group.md

@import ./__demo__/submenu.md

@import ./__demo__/context-menu.md

@import ./__demo__/icon.md

`<dropdown>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<dropdown>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`|
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`|
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bottom'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`|
### `<dropdown>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|-|
|select|用户选择时触发|value: `string \| number \| Record<string, unknown>`|
### `<dropdown>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|content|内容|-||
|footer|页脚|-|2.10.0|




### `<doption>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string\|number\|object`|`-`|
|disabled|是否禁用|`boolean`|`false`|
### `<doption>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|




### `<dgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|分组标题|`string`|`-`|
### `<dgroup>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|分组标题|-|2.10.0|




### `<dsubmenu>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（2.16.0 版本后暂无用处）|`string\|number`|`-`||
|disabled|是否禁用|`boolean`|`false`|2.10.0|
|trigger|触发方式|`'hover' \| 'click'`|`'click'`|2.10.0|
|position|弹出位置|`'rt' \| 'lt'`|`'rt'`|2.10.0|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
### `<dsubmenu>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|-|
### `<dsubmenu>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|content|子菜单内容|-||
|footer|页脚|-|2.10.0|




### `<dropdown-button>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`|
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`|
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'br'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|type|按钮类型|`string`|`-`|
|size|按钮大小|`string`|`-`|
|button-props|按钮属性|`object`|`-`|
### `<dropdown-button>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|-|
|click|点击按钮时触发|event: `Event`|
|select|用户选择时触发|value: `string \| number \| Record<string, unknown>`|
### `<dropdown-button>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|按钮图标|-|
|content|内容|-|


