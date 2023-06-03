```yaml
meta:
  type: 组件
  category: 反馈
title: 抽屉 Drawer
description: 触发命令后，从屏幕一侧滑出的抽屉式的面板。
```

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/custom.md

@import ./__demo__/nested.md

@import ./__demo__/popup-container.md

@import ./__demo__/function.md

## API


### `<drawer>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|visible **(v-model)**|抽屉是否可见|`boolean`|`false`||
|default-visible|抽屉默认是否可见（非受控模式）|`boolean`|`false`||
|placement|抽屉放置的位置|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|标题|`string`|`-`||
|mask|是否显示遮罩层|`boolean`|`true`||
|mask-closable|点击遮罩层是否可以关闭|`boolean`|`true`||
|closable|是否展示关闭按钮|`boolean`|`true`||
|ok-text|确认按钮的内容|`string`|`-`||
|cancel-text|取消按钮的内容|`string`|`-`||
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`||
|ok-button-props|确认按钮的Props|`ButtonProps`|`-`|2.9.0|
|cancel-button-props|取消按钮的Props|`ButtonProps`|`-`|2.9.0|
|unmount-on-close|关闭时是否卸载节点|`boolean`|`false`|2.12.0|
|width|抽屉的宽度（仅在placement为right,left时可用）|`number\|string`|`250`||
|height|抽屉的高度（仅在placement为top,bottom时可用）|`number\|string`|`250`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`'body'`||
|drawer-style|抽屉的样式|`CSSProperties`|`-`||
|on-before-ok|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(  done: (closed: boolean) => void) => void \| boolean \| Promise<void \| boolean>`|`-`||
|on-before-cancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`||
|esc-to-close|是否支持 ESC 键关闭抽屉|`boolean`|`true`|2.15.0|
|render-to-body|抽屉是否挂载在 `body` 元素下|`boolean`|`true`||
|header|是否展示头部内容|`boolean`|`true`|2.33.0|
|footer|是否展示底部内容|`boolean`|`true`|2.11.0|
|hide-cancel|是否隐藏取消按钮|`boolean`|`false`|2.19.0|
### `<drawer>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|ok|点击确定按钮时触发|ev: `MouseEvent`||
|cancel|点击取消、关闭按钮时触发|ev: `MouseEvent \| KeyboardEvent`||
|open|抽屉打开后（动画结束）触发|-||
|close|抽屉关闭后（动画结束）触发|-||
|before-open|对话框打开前触发|-|2.43.0|
|before-close|对话框关闭前触发|-|2.43.0|
### `<drawer>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|header|页眉|-|2.33.0|
|title|标题|-||
|footer|页脚|-||



### `<drawer>` 全局方法

Drawer 提供的全局方法，可以通过以下三种方法使用：

1. 通过 `this.$drawer` 调用
2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$drawer` 调用
3. 导入 Drawer，通过 Drawer 本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Drawer } from '@arco-design/web-vue';

const app = createApp(App);
Drawer._context = app._context;
```


### DrawerConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|placement|抽屉放置的位置|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|标题|`RenderContent`|`-`||
|content|内容|`RenderContent`|`-`||
|mask|是否显示遮罩层|`boolean`|`true`||
|maskClosable|点击遮罩层是否可以关闭|`boolean`|`true`||
|closable|是否展示关闭按钮|`boolean`|`true`||
|okText|确认按钮的内容|`string`|`-`||
|cancelText|取消按钮的内容|`string`|`-`||
|okLoading|确认按钮是否为加载中状态|`boolean`|`false`||
|okButtonProps|确认按钮的Props|`ButtonProps`|`-`|2.9.0|
|cancelButtonProps|取消按钮的Props|`ButtonProps`|`-`|2.9.0|
|width|抽屉的宽度（仅在placement为right,left时可用）|`number \| string`|`250`||
|height|抽屉的高度（仅在placement为top,bottom时可用）|`number \| string`|`250`||
|popupContainer|弹出框的挂载容器|`string \| HTMLElement`|`'body'`||
|drawerStyle|抽屉的样式|`CSSProperties`|`-`||
|onOk|点击确定按钮时触发|`(e?: Event) => void`|`-`||
|onCancel|点击取消、关闭按钮时触发|`(e?: Event) => void`|`-`||
|onBeforeOk|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(    done: (closed: boolean) => void  ) => void \| boolean \| Promise<void \| boolean>`|`-`||
|onBeforeCancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`||
|onOpen|抽屉打开后（动画结束）触发|`() => void`|`-`||
|onClose|抽屉关闭后（动画结束）触发|`() => void`|`-`||
|onBeforeOpen|抽屉打开前触发|`() => void`|`-`|2.43.0|
|onBeforeClose|抽屉关闭前触发|`() => void`|`-`|2.43.0|
|escToClose|是否支持 ESC 键关闭抽屉|`boolean`|`true`|2.15.0|
|header|是否展示头部内容|`boolean \| RenderContent`|`true`|2.33.0|
|footer|是否展示底部内容|`boolean \| RenderContent`|`true`|2.11.0|
|hideCancel|是否隐藏取消按钮|`boolean`|`false`|2.19.0|



### DrawerReturn

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|close|关闭抽屉|`() => void`|`-`||
|update|更新抽屉|`(config: DrawerUpdateConfig) => void`|`-`|2.43.2|



### DrawerMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|open|打开抽屉|`(config: DrawerConfig, appContext?: AppContext) => DrawerReturn`|`-`|


