```yaml
meta:
  type: 组件
  category: 反馈
title: Modal 对话框
description: 在当前页面打开一个浮层，承载相关操作。
```

@import ./__demo__/basic.md

@import ./__demo__/async.md

@import ./__demo__/function.md

@import ./__demo__/notice.md

@import ./__demo__/width.md

@import ./__demo__/custom.md

@import ./__demo__/form.md

@import ./__demo__/draggable.md

@import ./__demo__/fullscreen.md

## API


### `<modal>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|visible **(v-model)**|对话框是否可见|`boolean`|`-`||
|default-visible|对话框默认是否可见（非受控状态）|`boolean`|`false`||
|width|对话框的宽度，不设置的情况下会使用样式中的宽度值|`number\|string`|`-`|2.12.0|
|top|对话框的距离顶部的高度，居中显示开启的情况下不生效|`number\|string`|`-`|2.12.0|
|mask|是否显示遮罩层|`boolean`|`true`||
|title|标题|`string`|`-`||
|title-align|标题的水平对齐方向|`'start' \| 'center'`|`'center'`|2.17.0|
|align-center|对话框是否居中显示|`boolean`|`true`||
|unmount-on-close|关闭时是否卸载节点|`boolean`|`false`||
|mask-closable|是否点击遮罩层可以关闭对话框|`boolean`|`true`||
|hide-cancel|是否隐藏取消按钮|`boolean`|`false`||
|simple|是否开启简单模式|`boolean`|`(props: any) => {  return props.notice;}`||
|closable|是否显示关闭按钮|`boolean`|`true`||
|ok-text|确认按钮的内容|`string`|`-`||
|cancel-text|取消按钮的内容|`string`|`-`||
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`||
|ok-button-props|确认按钮的Props|`ButtonProps`|`-`||
|cancel-button-props|取消按钮的Props|`ButtonProps`|`-`||
|footer|是否展示页脚部分|`boolean`|`true`||
|render-to-body|对话框是否挂载在 `body` 元素下|`boolean`|`true`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`'body'`||
|mask-style|蒙层的样式|`CSSProperties`|`-`||
|modal-class|对话框的类名|`string \| any[]`|`-`||
|modal-style|对话框的样式|`CSSProperties`|`-`||
|on-before-ok|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(  done: (closed: boolean) => void) => void \| boolean \| Promise<void \| boolean>`|`-`|2.7.0|
|on-before-cancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`|2.7.0|
|esc-to-close|是否支持 ESC 键关闭对话框|`boolean`|`true`|2.15.0|
|draggable|是否支持拖动|`boolean`|`false`|2.19.0|
|fullscreen|是否开启全屏|`boolean`|`false`|2.19.0|
|mask-animation-name|遮罩层动画名字|`string`|`-`|2.24.0|
|modal-animation-name|对话框动画名字|`string`|`-`|2.24.0|
|body-class|对话框内容部分的类名|`string \| any[]`|`-`|2.31.0|
|body-style|对话框内容部分的样式|`StyleValue`|`-`|2.31.0|
### `<modal>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|ok|点击确定按钮时触发|ev: `MouseEvent`||
|cancel|点击取消、关闭按钮时触发|ev: `MouseEvent \| KeyboardEvent`||
|open|对话框打开后（动画结束）触发|-||
|close|对话框关闭后（动画结束）触发|-||
|before-open|对话框打开前触发|-|2.16.0|
|before-close|对话框关闭前触发|-|2.16.0|
### `<modal>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|footer|页脚|-|



### `<modal>` 全局方法

Modal提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$modal调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用
3. 导入Modal，通过Modal本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Modal } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
```


### ModalConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|标题|`RenderContent`|`-`||
|content|内容|`RenderContent`|`-`||
|footer|页脚|`boolean \| RenderContent`|`true`||
|closable|是否显示关闭按钮|`boolean`|`true`||
|okText|确认按钮的内容|`string`|`-`||
|cancelText|取消按钮的内容|`string`|`-`||
|okButtonProps|确认按钮的Props|`ButtonProps`|`-`||
|cancelButtonProps|取消按钮的Props|`ButtonProps`|`-`||
|okLoading|确认按钮是否为加载中状态|`boolean`|`false`||
|hideCancel|是否隐藏取消按钮|`boolean`|`false`||
|mask|是否显示遮罩层|`boolean`|`true`||
|simple|是否开启简单模式|`boolean`|`false`||
|maskClosable|是否点击遮罩层可以关闭对话框|`boolean`|`true`||
|maskStyle|蒙层的样式|`CSSProperties`|`-`||
|alignCenter|对话框是否居中显示|`boolean`|`true`||
|escToClose|是否支持 ESC 键关闭对话框|`boolean`|`true`|2.15.0|
|draggable|是否支持拖动|`boolean`|`false`|2.19.0|
|fullscreen|是否开启全屏|`boolean`|`false`|2.19.0|
|onOk|点击确定按钮的回调函数|`(e?: Event) => void`|`-`||
|onCancel|点击取消按钮的回调函数|`(e?: Event) => void`|`-`||
|onBeforeOk|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(    done: (closed: boolean) => void  ) => void \| boolean \| Promise<void \| boolean>`|`-`|2.7.0|
|onBeforeCancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`|2.7.0|
|onOpen|对话框打开后（动画结束）触发|`() => void`|`-`||
|onClose|对话框关闭后（动画结束）触发|`() => void`|`-`||
|onBeforeOpen|对话框打开前触发|`() => void`|`-`|2.16.0|
|onBeforeClose|对话框关闭前触发|`() => void`|`-`|2.16.0|
|width|对话框的宽度，不设置的情况下会使用样式中的宽度值|`number \| string`|`-`|2.12.0|
|top|对话框的距离顶部的高度，居中显示开启的情况下不生效|`number \| string`|`-`|2.12.0|
|titleAlign|标题的水平对齐方向|`'start' \| 'center'`|`'center'`|2.17.0|
|renderToBody|对话框是否挂载在 `body` 元素下|`boolean`|`true`||
|popupContainer|弹出框的挂载容器|`string \| HTMLElement`|`'body'`||
|modalClass|对话框的类名|`string \| any[]`|`-`||
|modalStyle|对话框的样式|`CSSProperties`|`-`||
|maskAnimationName|遮罩层动画名字|`string`|`-`|2.24.0|
|modalAnimationName|对话框动画名字|`string`|`-`|2.24.0|



### ModalReturn

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|close|关闭对话框|`() => void`|`-`||
|update|更新对话框|`(config: ModalUpdateConfig) => void`|`-`|2.43.2|



### ModalMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|open|打开对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|confirm|打开对话框（简单模式）|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|info|打开信息对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|success|打开成功对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|warning|打开警告对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|error|打开错误对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|


