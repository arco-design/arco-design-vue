```yaml
meta:
  type: 组件
  category: 其他
title: 触发器 Trigger
description: 用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。
```

@import ./__demo__/basic.md

@import ./__demo__/nest.md

@import ./__demo__/triggers.md

@import ./__demo__/align-point.md

@import ./__demo__/scroll.md

@import ./__demo__/arrow.md

@import ./__demo__/translate.md

## API


### `<trigger>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'hover'`||
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'bottom'`||
|disabled|触发器是否禁用|`boolean`|`false`||
|popup-offset|弹出框的偏移量（弹出框距离触发器的偏移距离）|`number`|`0`||
|popup-translate|弹出框的移动距离|`TriggerPopupTranslate`|`-`||
|show-arrow|弹出框是否显示箭头|`boolean`|`false`||
|align-point|弹出框是否跟随鼠标|`boolean`|`false`||
|popup-hover-stay|是否在移出触发器，并移入弹出框时保持弹出框显示|`boolean`|`true`||
|blur-to-close|是否在触发器失去焦点时关闭弹出框|`boolean`|`true`||
|click-to-close|是否在点击触发器时关闭弹出框|`boolean`|`true`||
|click-outside-to-close|是否在点击外部区域时关闭弹出框|`boolean`|`true`||
|unmount-on-close|是否在关闭时卸载弹出框节点|`boolean`|`true`||
|content-class|弹出框内容的类名|`string\|array\|object`|`-`||
|content-style|弹出框内容的样式|`CSSProperties`|`-`||
|arrow-class|弹出框箭头的类名|`string\|array\|object`|`-`||
|arrow-style|弹出框箭头的样式|`CSSProperties`|`-`||
|popup-style|弹出框的样式|`CSSProperties`|`-`||
|animation-name|弹出动画的name|`string`|`'fade-in'`||
|duration|弹出动画的持续时间|`number\| {    enter: number;    leave: number;  }`|`-`||
|mouse-enter-delay|mouseenter事件延时触发的时间（毫秒）|`number`|`100`||
|mouse-leave-delay|mouseleave事件延时触发的时间（毫秒）|`number`|`100`||
|focus-delay|focus事件延时触发的时间（毫秒）|`number`|`0`||
|auto-fit-popup-width|是否将弹出框宽度设置为触发器宽度|`boolean`|`false`||
|auto-fit-popup-min-width|是否将弹出框的最小宽度设置为触发器宽度|`boolean`|`false`||
|auto-fix-position|当触发器的尺寸发生变化时，是否重新计算弹出框位置|`boolean`|`true`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|update-at-scroll|是否在容器滚动时更新弹出框的位置|`boolean`|`false`||
|auto-fit-position|是否自动调整弹出框位置，以适应窗口大小|`boolean`|`true`||
|render-to-body|是否挂载在 `body` 元素下|`boolean`|`true`||
|prevent-focus|是否阻止弹出层中的元素点击时获取焦点|`boolean`|`false`||
|scroll-to-close|是否在滚动时关闭弹出框|`boolean`|`false`|2.46.0|
### `<trigger>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|popup-visible-change|弹出框显示状态改变时触发|visible: `boolean`||
|show|弹出框显示后（动画结束）触发|-|2.18.0|
|hide|弹出框隐藏后（动画结束）触发|-|2.18.0|
### `<trigger>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|content|弹出框内容|-|



## Type

```ts
type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };
```

# zh-CN
## FAQ

### 关于弹出框的挂载位置

弹出框默认是挂载到 `body` 元素上的，如果想要修改挂载元素，可以使用 `popup-container` 属性进行指定，同时需要注意保证挂载元素的位置可以被准确定位到，一般可以为挂载元素增加 `position: relative` 样式。

在微前端项目中，需要保证子应用的挂载位置准确，可以将子应用的 `body` 样式添加 `position: relative`

---
