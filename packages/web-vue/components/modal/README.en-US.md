```yaml
meta:
  type: Component
  category: Feedback
title: Modal
description: Open a floating layer on the current page to carry related operations.
```

*Auto translate by google.*

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

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|visible **(v-model)**|Whether the modal is visible|`boolean`|`-`||
|default-visible|Whether the modal is visible by default (uncontrolled state)|`boolean`|`false`||
|width|The width of the dialog box, if not set, the width value in the style will be used|`number\|string`|`-`|2.12.0|
|top|The height from the top of the dialog box. It does not take effect when the center display is turned on.|`number\|string`|`-`|2.12.0|
|mask|Whether to show the mask|`boolean`|`true`||
|title|Title|`string`|`-`||
|title-align|horizontal alignment of the title|`'start' \| 'center'`|`'center'`|2.17.0|
|align-center|Whether the dialog box is displayed in the center|`boolean`|`true`||
|unmount-on-close|Whether to uninstall the node when close|`boolean`|`false`||
|mask-closable|Whether to close the modal when click the mask|`boolean`|`true`||
|hide-cancel|Whether to hide the cancel button|`boolean`|`false`||
|simple|Whether to enable simple mode|`boolean`|`(props: any) => {  return props.notice;}`||
|closable|Whether to show the close button|`boolean`|`true`||
|ok-text|The content of the confirm button|`string`|`-`||
|cancel-text|The content of the cancel button|`string`|`-`||
|ok-loading|Whether the confirm button is in the loading state|`boolean`|`false`||
|ok-button-props|Props of confirm button|`ButtonProps`|`-`||
|cancel-button-props|Props of cancel button|`ButtonProps`|`-`||
|footer|Whether to show the footer|`boolean`|`true`||
|render-to-body|Whether the modal is mounted under the `body` element|`boolean`|`true`||
|popup-container|Mount container for modal|`string \| HTMLElement`|`'body'`||
|mask-style|Mask style|`CSSProperties`|`-`||
|modal-class|The classname of the modal|`string \| any[]`|`-`||
|modal-style|Modal style|`CSSProperties`|`-`||
|on-before-ok|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(  done: (closed: boolean) => void) => void \| boolean \| Promise<void \| boolean>`|`-`|2.7.0|
|on-before-cancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`|2.7.0|
|esc-to-close|Whether to support the ESC key to close the dialog|`boolean`|`true`|2.15.0|
|draggable|Whether to support drag|`boolean`|`false`|2.19.0|
|fullscreen|Whether to enable full screen|`boolean`|`false`|2.19.0|
|mask-animation-name|Mask layer animation name|`string`|`-`|2.24.0|
|modal-animation-name|Modal animation name|`string`|`-`|2.24.0|
|body-class|The classname of the modal|`string \| any[]`|`-`|2.31.0|
|body-style|Modal style|`StyleValue`|`-`|2.31.0|
### `<modal>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|ok|Triggered when the OK button is clicked|ev: `MouseEvent`||
|cancel|Triggered when the cancel/close button is clicked|ev: `MouseEvent \| KeyboardEvent`||
|open|Triggered after the modal is opened (the animation ends)|-||
|close|Triggered after the modal is closed (the animation ends)|-||
|before-open|Triggered before dialog is opened|-|2.16.0|
|before-close|Triggered before dialog is closed|-|2.16.0|
### `<modal>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Title|-|
|footer|Footer|-|



### `<modal>` Global methods

The global methods provided by Modal can be used in the following three ways:

1. Called by this.$modal
2. In the Composition API, call through getCurrentInstance().appContext.config.globalProperties.$modal
3. Import Modal, call through Modal itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Modal } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
````


### ModalConfig

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|title|Title|`RenderContent`|`-`||
|content|Content|`RenderContent`|`-`||
|footer|Footer|`boolean \| RenderContent`|`true`||
|closable|Whether to show the close button|`boolean`|`true`||
|okText|The content of the confirm button|`string`|`-`||
|cancelText|The content of the cancel button|`string`|`-`||
|okButtonProps|Props of confirm button|`ButtonProps`|`-`||
|cancelButtonProps|Props of cancel button|`ButtonProps`|`-`||
|okLoading|Whether the confirm button is in the loading state|`boolean`|`false`||
|hideCancel|Whether to hide the cancel button|`boolean`|`false`||
|mask|Whether to show the mask|`boolean`|`true`||
|simple|Whether to enable simple mode|`boolean`|`false`||
|maskClosable|Whether to close the modal when click the mask|`boolean`|`true`||
|maskStyle|Mask style|`CSSProperties`|`-`||
|alignCenter|Whether the dialog box is displayed in the center|`boolean`|`true`||
|escToClose|Whether to support the ESC key to close the dialog|`boolean`|`true`|2.15.0|
|draggable|Whether to support drag|`boolean`|`false`|2.19.0|
|fullscreen|Whether to enable full screen|`boolean`|`false`|2.19.0|
|onOk|Callback function for clicking the OK button|`(e?: Event) => void`|`-`||
|onCancel|Callback function for clicking the Cancel button|`(e?: Event) => void`|`-`||
|onBeforeOk|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(    done: (closed: boolean) => void  ) => void \| boolean \| Promise<void \| boolean>`|`-`|2.7.0|
|onBeforeCancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`|2.7.0|
|onOpen|Triggered after the modal is opened (the animation ends)|`() => void`|`-`||
|onClose|Triggered after the modal is closed (the animation ends)|`() => void`|`-`||
|onBeforeOpen|Triggered before dialog is opened|`() => void`|`-`|2.16.0|
|onBeforeClose|Triggered before dialog is closed|`() => void`|`-`|2.16.0|
|width|The width of the dialog box, if not set, the width value in the style will be used|`number \| string`|`-`|2.12.0|
|top|The height from the top of the dialog box. It does not take effect when the center display is turned on.|`number \| string`|`-`|2.12.0|
|titleAlign|horizontal alignment of the title|`'start' \| 'center'`|`'center'`|2.17.0|
|renderToBody|Whether the modal is mounted under the `body` element|`boolean`|`true`||
|popupContainer|Mount container for modal|`string \| HTMLElement`|`'body'`||
|modalClass|The classname of the modal|`string \| any[]`|`-`||
|modalStyle|Modal style|`CSSProperties`|`-`||
|maskAnimationName|Mask layer animation name|`string`|`-`|2.24.0|
|modalAnimationName|Modal animation name|`string`|`-`|2.24.0|



### ModalReturn

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|close|Close Modal|`() => void`|`-`||
|update|Update Modal|`(config: ModalUpdateConfig) => void`|`-`|2.43.2|



### ModalMethod

|Name|Description|Type|Default|
|---|---|---|:---:|
|open|Open modal|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|confirm|Open modal (simple mode)|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|info|Open info modal|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|success|Open success modal|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|warning|Open warning modal|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|error|Open error modal|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|


