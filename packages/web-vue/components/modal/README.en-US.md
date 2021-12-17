```yaml
meta:
  type: Component
  category: Feedback
title: Modal
description: Open a floating layer on the current page to carry related operations.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/function.md

@import ./__demo__/notice.md

@import ./__demo__/custom.md


### `<modal>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|visible **(v-model)**|Whether the modal is visible|`boolean`|`-`|
|default-visible|Whether the modal is visible by default (uncontrolled state)|`boolean`|`false`|
|mask|Whether to show the mask|`boolean`|`true`|
|title|Title|`string`|`-`|
|align-center|Whether the dialog box is displayed in the center|`boolean`|`false`|
|unmount-on-close|Whether to uninstall the node when close|`boolean`|`false`|
|mask-closable|Whether to close the modal when click the mask|`boolean`|`true`|
|hide-cancel|Whether to hide the cancel button|`boolean`|`false`|
|simple|Whether to enable simple mode|`boolean`|`(props: any) => {  return props.notice;}`|
|closable|Whether to show the close button|`boolean`|`true`|
|ok-text|The content of the confirm button|`string`|`-`|
|cancel-text|The content of the cancel button|`string`|`-`|
|ok-loading|Whether the confirm button is in the loading state|`boolean`|`false`|
|ok-button-props|Props of confirm button|`object`|`-`|
|cancel-button-props|Props of cancel button|`object`|`-`|
|footer|Whether to show the footer|`boolean`|`true`|
|render-to-body|Whether the modal is mounted under the `body` element|`boolean`|`true`|
|popup-container|Mount container for modal|`string \| HTMLElement \| null \| undefined`|`'body'`|
|mask-style|Mask style|`CSSProperties`|`-`|
|modal-class|The classname of the modal|`string \| any[]`|`-`|
|modal-style|Modal style|`CSSProperties`|`-`|
|on-before-ok|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(done: (closed: boolean) => void) => void \| boolean`|`-`|
|on-before-cancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`|
### `<modal>` Events

|Event Name|Description|Parameters|
|---|---|---|
|ok|Triggered when the OK button is clicked|-|
|cancel|Triggered when the cancel/close button is clicked|-|
|open|Triggered after the modal is opened (the animation ends)|-|
|close|Triggered after the modal is closed (the animation ends)|-|
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


### ModalConfig

|Name|Description|Type|Default|
|---|---|---|:---:|
|title|Title|`RenderContent`|`-`|
|content|Content|`RenderContent`|`-`|
|footer|Footer|`RenderContent`|`-`|
|closable|Whether to show the close button|`boolean`|`false`|
|okText|The content of the confirm button|`string`|`-`|
|cancelText|The content of the cancel button|`string`|`-`|
|okButtonProps|Props of confirm button|`any`|`-`|
|cancelButtonProps|Props of cancel button|`any`|`-`|
|okLoading|Whether the confirm button is in the loading state|`boolean`|`false`|
|hideCancel|Whether to hide the cancel button|`boolean`|`false`|
|mask|Whether to show the mask|`boolean`|`false`|
|simple|Whether to enable simple mode|`boolean`|`false`|
|maskClosable|Whether to close the modal when click the mask|`boolean`|`false`|
|maskStyle|Mask style|`CSSProperties`|`-`|
|alignCenter|Whether the dialog box is displayed in the center|`boolean`|`false`|
|onOk|Callback function for clicking the OK button|`() => void`|`-`|
|onCancel|Callback function for clicking the Cancel button|`() => void`|`-`|



### ModalReturn

|Name|Description|Type|Default|
|---|---|---|:---:|
|close|Close Modal|`() => void`|`-`|



### ModalMethod

|Name|Description|Type|Default|
|---|---|---|:---:|
|open|Open modal|`(config: ModalConfig) => ModalReturn`|`-`|
|confirm|Open modal (simple mode)|`(config: ModalConfig) => ModalReturn`|`-`|
|info|Open info modal|`(config: ModalConfig) => ModalReturn`|`-`|
|success|Open success modal|`(config: ModalConfig) => ModalReturn`|`-`|
|warning|Open warning modal|`(config: ModalConfig) => ModalReturn`|`-`|
|error|Open error modal|`(config: ModalConfig) => ModalReturn`|`-`|


