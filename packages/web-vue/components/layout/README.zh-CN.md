```yaml
meta:
  type: 组件
  category: 布局
title: 布局 Layout
description: 页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。
```

@import ./__demo__/basic.md

@import ./__demo__/custom-icon.md

@import ./__demo__/collapsed.md

@import ./__demo__/breakpoint.md

@import ./__demo__/resize.md

## API


### `<layout>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|has-sider|表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动|`boolean`|`false`|




### `<layout-header>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-content>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-footer>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-sider>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|theme|主题颜色|`'dark' \| 'light'`|`'light'`|
|collapsed|当前收起状态|`boolean`|`-`|
|default-collapsed|默认的收起状态|`boolean`|`false`|
|collapsible|是否可收起|`boolean`|`false`|
|width|宽度|`number`|`200`|
|collapsed-width|收缩宽度|`number`|`48`|
|reverse-arrow|翻转折叠提示箭头的方向，当 Sider 在右边时可以使用|`boolean`|`false`|
|breakpoint|触发响应式布局的断点, 详见[响应式栅格](/vue/component/grid)|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|
|resize-directions|可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。详情请看 [ResizeBox](/vue/component/resize-box)。|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`-`|
|hide-trigger|隐藏底部折叠触发器|`boolean`|`false`|
### `<layout-sider>` Events

|事件名|描述|参数|
|---|---|---|
|collapse|展开-收起时的事件，有点击 trigger 以及响应式反馈两种方式可以触发|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|breakpoint|触发响应式布局断点时的事件|collapsed: `boolean`|
### `<layout-sider>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|trigger|自定义底部折叠触发器|collapsed: `boolean`|


