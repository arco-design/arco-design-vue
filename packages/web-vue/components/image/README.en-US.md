```yaml
meta:
  type: Component
  category: Data Display
title: Image
description: Used to show and preview pictures.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/caption.md

@import ./__demo__/extra.md

@import ./__demo__/error.md

@import ./__demo__/loader.md

@import ./__demo__/progressive-loader.md

@import ./__demo__/custom-preview-actions.md

@import ./__demo__/preview-group.md

@import ./__demo__/component-preview.md

@import ./__demo__/component-preview-group.md

@import ./__demo__/preview-popup-container.md


### `<image>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|src|Image src|`string`|`-`|
|width|Image width|`string \| number`|`-`|
|height|Image height|`string \| number`|`-`|
|title|Title|`string`|`-`|
|description|Description, will be displayed at the bottom. if alt has no value, it will be set to alt|`string`|`-`|
|alt|Text description of the image|`string`|`-`|
|hide-footer|Whether to hide footer|`boolean`|`false`|
|footer-position|The position shown at the bottom|`'inner' \| 'outer'`|`'inner'`|
|show-loader|Whether to show the loading effect|`boolean`|`false`|
|preview|Whether to enable preview|`boolean`|`true`|
|preview-visible **(v-model)**|Control the open state of the preview, can be used in conjunction with previewVisibleChange|`boolean`|`-`|
|default-preview-visible|The default open state of the preview|`boolean`|`false`|
|preview-props|Preview configuration items (all options are optional) [ImagePreviewProps](#imagepreview)|`ImagePreviewProps`|`-`|
### `<image>` Events

|Event Name|Description|Parameters|
|---|---|---|
|preview-visible-change|Preview opening and closing events|visible: `boolean`|
### `<image>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|error|Customize error content.|-|
|error-icon|Customize the icon of error content.|-|
|loader|Customize loading effect.|-|




### `<image-preview>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|src|Image src|`string`|`-`|
|visible **(v-model)**|Whether is visible|`boolean`|`-`|
|default-visible|Default visiblity|`boolean`|`false`|
|mask-closable|Whether to close the modal when mask is clicked|`boolean`|`true`|
|closable|Whether to show close button|`boolean`|`true`|
|actions-layout|Layout of action list|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|Set the mount point of the pop-up box, the same as the `to` of `teleport`, the default value is document.body|`HTMLElement`|`-`|
### `<image-preview>` Events

|Event Name|Description|Parameters|
|---|---|---|
|close|Close event|-|




### `<image-preview-group>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|src-list|Picture list (after setting this property, the picture information of a-image subcomponent will no longer be collected)|`string[]`|`-`|
|current **(v-model)**|The index of the currently displayed image|`number`|`-`|
|default-current|The index of the first image shown|`number`|`0`|
|infinite|Whether to loop infinitely|`boolean`|`false`|
|visible **(v-model)**|Whether is visible|`boolean`|`-`|
|default-visible|Default visiblity|`boolean`|`false`|
|mask-closable|Whether to close the modal when mask is clicked|`boolean`|`true`|
|closable|Whether to show close button|`boolean`|`true`|
|actions-layout|Layout of action list|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|Set the mount point of the pop-up box, the same as the `to` of `teleport`, the default value is document.body|`HTMLElement \| string`|`-`|
### `<image-preview-group>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Image switch|-|
|visible-change|Preview visibility change|-|


