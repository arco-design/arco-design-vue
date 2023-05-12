```yaml
meta:
  type: 组件
  category: 数据展示
title: 图片 Image
description: 展示和预览图片。
```

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

## API


### `<image>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|src|图片获取地址|`string`|`-`||
|width|图片显示宽度|`string \| number`|`-`||
|height|图片显示高度|`string \| number`|`-`||
|title|标题|`string`|`-`||
|description|描述，将显示在底部，如果 alt 没有值，则会将其设置给 alt|`string`|`-`||
|fit|确定图片如何适应容器框|`'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'`|`-`||
|alt|图片的文字描述|`string`|`-`||
|hide-footer|是否隐藏 footer（2.36.0 版本支持 'never' 参数，支持在加载错误时显示底部内容）|`boolean \| 'never'`|`false`||
|footer-position|底部显示的位置|`'inner' \| 'outer'`|`'inner'`||
|show-loader|是否显示加载中效果|`boolean`|`false`||
|preview|是否开启预览|`boolean`|`true`||
|preview-visible **(v-model)**|控制预览的打开状态，可与 previewVisibleChange 配合使用|`boolean`|`-`||
|default-preview-visible|预览的默认打开状态|`boolean`|`false`||
|preview-props|预览的配置项（所有选项都是可选的） [ImagePreviewProps](#image-preview%20Props)|`ImagePreviewProps`|`-`||
|footer-class|底部显示区域的类名|`string\|array\|object`|`-`|2.23.0|
### `<image>` Events

|事件名|描述|参数|
|---|---|---|
|preview-visible-change|预览的打开和关闭事件|visible: `boolean`|
### `<image>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|error|自定义错误状态内容|-|
|error-icon|自定义错误状态的图标|-|
|loader|自定义加载状态效果|-|
|extra|底部额外内容|-|




### `<image-preview>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|src|图片获取地址|`string`|`-`|
|visible **(v-model)**|是否可见|`boolean`|`-`|
|default-visible|默认是否可见，非受控|`boolean`|`false`|
|mask-closable|点击 mask 是否触发关闭|`boolean`|`true`|
|closable|是否显示关闭按钮|`boolean`|`true`|
|actions-layout|操作项的布局|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|设置弹出框的挂载点，同 `teleport` 的 `to`，缺省值是 document.body|`HTMLElement`|`-`|
### `<image-preview>` Events

|事件名|描述|参数|
|---|---|---|
|close|关闭事件|-|
### `<image-preview>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|actions|自定义额外的操作项|-|2.17.0|




### `<image-preview-group>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|src-list|图片列表（设置了本属性之后，将不再收集 a-image 子组件的图片信息）|`string[]`|`-`|
|current **(v-model)**|当前展示的图片的下标|`number`|`-`|
|default-current|第一张展示的图片的下标|`number`|`0`|
|infinite|是否无限循环|`boolean`|`false`|
|visible **(v-model)**|是否可见，受控属性|`boolean`|`-`|
|default-visible|默认是否可见，非受控|`boolean`|`false`|
|mask-closable|点击 mask 是否触发关闭|`boolean`|`true`|
|closable|是否显示关闭按钮|`boolean`|`true`|
|actions-layout|控制条的布局|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|设置弹出框的挂载点，同 `teleport` 的 `to`，缺省值是 document.body|`HTMLElement \| string`|`-`|
### `<image-preview-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|切换图片|-|
|visible-change|预览的打开和关闭|-|
### `<image-preview-group>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|actions|自定义额外的操作项|-|2.46.0|




### `<image-preview-action>` Props (2.17.0)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|name|名称|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|


