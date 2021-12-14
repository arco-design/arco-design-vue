```yaml
meta:
  type: 组件
  category: 反馈
title: Modal 对话框
description: 在当前页面打开一个浮层，承载相关操作。
```

@import ./__demo__/basic.md

@import ./__demo__/function.md

@import ./__demo__/notice.md

@import ./__demo__/custom.md


### `<modal>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visible **(v-model)**|对话框是否可见|`boolean`|`-`|
|default-visible|对话框默认是否可见（非受控状态）|`boolean`|`false`|
|mask|是否显示遮罩层|`boolean`|`true`|
|title|标题|`string`|`-`|
|align-center|对话框是否居中显示|`boolean`|`false`|
|unmount-on-close|关闭时是否卸载节点|`boolean`|`false`|
|mask-closable|是否点击遮罩层可以关闭对话框|`boolean`|`true`|
|hide-cancel|是否隐藏取消按钮|`boolean`|`false`|
|simple|是否开启简单模式|`boolean`|`(props: any) => {  return props.notice;}`|
|closable|是否显示关闭按钮|`boolean`|`true`|
|ok-text|确认按钮的内容|`string`|`-`|
|cancel-text|取消按钮的内容|`string`|`-`|
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`|
|ok-button-props|确认按钮的Props|`object`|`-`|
|cancel-button-props|取消按钮的Props|`object`|`-`|
|footer|是否展示页脚部分|`boolean`|`true`|
|render-to-body|对话框是否挂载在 `body` 元素下|`boolean`|`true`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`'body'`|
|mask-style|蒙层的样式|`CSSProperties`|`-`|
|modal-class|对话框的类名|`string \| any[]`|`-`|
|modal-style|对话框的样式|`CSSProperties`|`-`|
|on-before-ok|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(done: (closed: boolean) => void) => void \| boolean`|`-`|
|on-before-cancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`|
### `<modal>` Events

|事件名|描述|参数|
|---|---|---|
|ok|点击确定按钮时触发|-|
|cancel|点击取消、关闭按钮时触发|-|
|open|对话框打开后（动画结束）触发|-|
|close|对话框关闭后（动画结束）触发|-|
### `<modal>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|footer|页脚|-|



### `<modal>` 全局方法

Modal提供的全局方法，可以通过一下三种方法使用：

1. 通过this.$modal调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用
3. 导入Modal，通过Modal本身调用


### ModalConfig

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|标题|`RenderContent`|`-`|
|content|内容|`RenderContent`|`-`|
|footer|页脚|`RenderContent`|`-`|
|closable|是否显示关闭按钮|`boolean`|`false`|
|okText|确认按钮的内容|`string`|`-`|
|cancelText|取消按钮的内容|`string`|`-`|
|okButtonProps|确认按钮的Props|`any`|`-`|
|cancelButtonProps|取消按钮的Props|`any`|`-`|
|okLoading|确认按钮是否为加载中状态|`boolean`|`false`|
|hideCancel|是否隐藏取消按钮|`boolean`|`false`|
|mask|是否显示遮罩层|`boolean`|`false`|
|simple|是否开启简单模式|`boolean`|`false`|
|maskClosable|是否点击遮罩层可以关闭对话框|`boolean`|`false`|
|maskStyle|蒙层的样式|`CSSProperties`|`-`|
|alignCenter|对话框是否居中显示|`boolean`|`false`|
|onOk|点击确定按钮的回调函数|`() => void`|`-`|
|onCancel|点击取消按钮的回调函数|`() => void`|`-`|



### ModalReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭对话框|`() => void`|`-`|



### ModalMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|open|打开对话框|`(config: ModalConfig) => ModalReturn`|`-`|
|confirm|打开对话框（简单模式）|`(config: ModalConfig) => ModalReturn`|`-`|
|info|打开信息对话框|`(config: ModalConfig) => ModalReturn`|`-`|
|success|打开成功对话框|`(config: ModalConfig) => ModalReturn`|`-`|
|warning|打开警告对话框|`(config: ModalConfig) => ModalReturn`|`-`|
|error|打开错误对话框|`(config: ModalConfig) => ModalReturn`|`-`|


