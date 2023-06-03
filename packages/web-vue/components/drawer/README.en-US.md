```yaml
meta:
  type: Component
  category: Feedback
title: Drawer
description: A drawer-like panel that slides out from the side of the screen after the command is triggered.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/custom.md

@import ./__demo__/nested.md

@import ./__demo__/popup-container.md

@import ./__demo__/function.md

## API


### `<drawer>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|visible **(v-model)**|Whether the drawer is visible|`boolean`|`false`||
|default-visible|Whether the drawer is visible by default (uncontrolled mode)|`boolean`|`false`||
|placement|Where the drawer is placed|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|Title|`string`|`-`||
|mask|Whether to show the mask|`boolean`|`true`||
|mask-closable|Click on the mask layer to be able to close|`boolean`|`true`||
|closable|Whether to show the close button|`boolean`|`true`||
|ok-text|The content of the ok button|`string`|`-`||
|cancel-text|The content of the cancel button|`string`|`-`||
|ok-loading|Whether the ok button is in the loading state|`boolean`|`false`||
|ok-button-props|Props of confirm button|`ButtonProps`|`-`|2.9.0|
|cancel-button-props|Props of cancel button|`ButtonProps`|`-`|2.9.0|
|unmount-on-close|Whether to uninstall the node when close|`boolean`|`false`|2.12.0|
|width|The width of the drawer (only available when placement is right, left)|`number\|string`|`250`||
|height|The height of the drawer (only available when placement is top, bottom)|`number\|string`|`250`||
|popup-container|Mount container for popup|`string \| HTMLElement`|`'body'`||
|drawer-style|Drawer style|`CSSProperties`|`-`||
|on-before-ok|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(  done: (closed: boolean) => void) => void \| boolean \| Promise<void \| boolean>`|`-`||
|on-before-cancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`||
|esc-to-close|Whether to support the ESC key to close the dialog|`boolean`|`true`|2.15.0|
|render-to-body|Whether the drawer is mounted under the `body` element|`boolean`|`true`||
|header|Whether to display high-quality content|`boolean`|`true`|2.33.0|
|footer|Whether to display the bottom content|`boolean`|`true`|2.11.0|
|hide-cancel|Whether to hide the cancel button|`boolean`|`false`|2.19.0|
### `<drawer>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|ok|Triggered when the OK button is clicked|ev: `MouseEvent`||
|cancel|Triggered when the cancel or close button is clicked|ev: `MouseEvent \| KeyboardEvent`||
|open|Triggered after the drawer is opened (the animation ends)|-||
|close|Triggered when the drawer is closed (the animation ends)|-||
|before-open|Triggered before drawer is opened|-|2.43.0|
|before-close|Triggered before drawer is closed|-|2.43.0|
### `<drawer>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|header|Header|-|2.33.0|
|title|Title|-||
|footer|Footer|-||



### `<drawer>` Global methods

The global methods provided by Drawer can be used in the following three ways:

1. Called by `this.$drawer`
2. In the Composition API, call through `getCurrentInstance().appContext.config.globalProperties.$drawer`
3. Import Drawer, call through Drawer itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Drawer } from '@arco-design/web-vue';

const app = createApp(App);
Drawer._context = app._context;
````


### DrawerConfig

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|placement|Where the drawer is placed|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|Title|`RenderContent`|`-`||
|content|Content|`RenderContent`|`-`||
|mask|Whether to show the mask|`boolean`|`true`||
|maskClosable|Click on the mask layer to be able to close|`boolean`|`true`||
|closable|Whether to show the close button|`boolean`|`true`||
|okText|The content of the ok button|`string`|`-`||
|cancelText|The content of the cancel button|`string`|`-`||
|okLoading|Whether the ok button is in the loading state|`boolean`|`false`||
|okButtonProps|Props of confirm button|`ButtonProps`|`-`|2.9.0|
|cancelButtonProps|Props of cancel button|`ButtonProps`|`-`|2.9.0|
|width|The width of the drawer (only available when placement is right, left)|`number \| string`|`250`||
|height|The height of the drawer (only available when placement is top, bottom)|`number \| string`|`250`||
|popupContainer|Mount container for popup|`string \| HTMLElement`|`'body'`||
|drawerStyle|Drawer style|`CSSProperties`|`-`||
|onOk|Triggered when the OK button is clicked|`(e?: Event) => void`|`-`||
|onCancel|Triggered when the cancel or close button is clicked|`(e?: Event) => void`|`-`||
|onBeforeOk|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(    done: (closed: boolean) => void  ) => void \| boolean \| Promise<void \| boolean>`|`-`||
|onBeforeCancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`||
|onOpen|Triggered after the drawer is opened (the animation ends)|`() => void`|`-`||
|onClose|Triggered when the drawer is closed (the animation ends)|`() => void`|`-`||
|onBeforeOpen|Triggered before drawer is opened|`() => void`|`-`|2.43.0|
|onBeforeClose|Triggered before drawer is closed|`() => void`|`-`|2.43.0|
|escToClose|Whether to support the ESC key to close the drawer|`boolean`|`true`|2.15.0|
|header|Whether to display high-quality content|`boolean \| RenderContent`|`true`|2.33.0|
|footer|Whether to display the bottom content|`boolean \| RenderContent`|`true`|2.11.0|
|hideCancel|Whether to hide the cancel button|`boolean`|`false`|2.19.0|



### DrawerReturn

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|close|Close Drawer|`() => void`|`-`||
|update|Update Drawer|`(config: DrawerUpdateConfig) => void`|`-`|2.43.2|



### DrawerMethod

|Name|Description|Type|Default|
|---|---|---|:---:|
|open|Open drawer|`(config: DrawerConfig, appContext?: AppContext) => DrawerReturn`|`-`|


