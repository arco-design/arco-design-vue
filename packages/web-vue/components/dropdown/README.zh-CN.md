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

@import ./__demo__/group.md

@import ./__demo__/submenu.md

@import ./__demo__/context-menu.md

@import ./__demo__/icon.md


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
|select|用户选择时触发|-|
### `<dropdown>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|content|内容|-|








### `<dgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|分组标题|`string`|`-`|






