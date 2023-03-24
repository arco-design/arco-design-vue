```yaml
meta:
  type: 组件
  category: 数据输入
title: 上传 Upload
description: 用户可传输文件或提交相应的内容。
```


@import ./__demo__/basic.md

@import ./__demo__/avatar.md

@import ./__demo__/upload-list.md

@import ./__demo__/picture-card.md

@import ./__demo__/draggable.md

@import ./__demo__/picture-list.md

@import ./__demo__/submit.md

@import ./__demo__/before-upload.md

@import ./__demo__/before-remove.md

@import ./__demo__/limit.md

@import ./__demo__/custom-button.md

@import ./__demo__/custom-icon.md

@import ./__demo__/request.md

@import ./__demo__/directory.md

## API


### `<upload>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|file-list **(v-model)**|文件列表|`FileItem[]`|`-`||
|default-file-list|默认的文件列表（非受控状态）|`FileItem[]`|`[]`||
|accept|接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")|`string`|`-`||
|action|上传的URL|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|multiple|是否支持多文件上传|`boolean`|`false`||
|directory|是否支持文件夹上传（需要浏览器支持）|`boolean`|`false`||
|draggable|是否支持拖拽上传|`boolean`|`false`||
|tip|提示文字|`string`|`-`||
|headers|上传请求附加的头信息|`Record<string, string>`|`-`||
|data|上传请求附加的数据|`Record<string, string \| Blob>\| ((fileItem: FileItem) => Record<string, string \| Blob>)`|`-`||
|name|上传的文件名|`string \| ((fileItem: FileItem) => string)`|`-`||
|with-credentials|上传请求是否携带 cookie|`boolean`|`false`||
|custom-request|自定义上传行为|`(option: RequestOption) => UploadRequest`|`-`||
|limit|限制上传文件的数量。`0`表示不限制|`number`|`0`||
|auto-upload|是否自动上传文件|`boolean`|`true`||
|show-file-list|是否显示文件列表|`boolean`|`true`||
|show-remove-button|是否显示删除按钮|`boolean`|`true`|2.11.0|
|show-retry-button|是否显示重试按钮|`boolean`|`true`|2.11.0|
|show-cancel-button|是否显示取消按钮|`boolean`|`true`|2.11.0|
|show-upload-button|是否显示上传按钮。2.14.0 版本新增 `showOnExceedLimit` 支持|`boolean \| { showOnExceedLimit: boolean }`|`true`|2.11.0|
|show-preview-button|照片墙是否显示预览按钮|`boolean`|`true`|2.42.0|
|download|是否在 `<a>` 链接上添加 download 属性|`boolean`|`false`|2.11.0|
|show-link|在列表模式下，如果上传的文件存在 URL 则展示链接。如果关闭仅展示文字并且点击可以触发 `preview` 事件。|`boolean`|`true`|2.13.0|
|image-loading|`<img>` 的原生 HTML 属性，需要浏览器支持|`'eager' \| 'lazy'`|`-`|2.11.0|
|list-type|图片列表类型|`'text' \| 'picture' \| 'picture-card'`|`'text'`||
|response-url-key|Response中获取图片URL的key，开启后会用上传的图片替换预加载的图片|`string \| ((fileItem: FileItem) => string)`|`-`||
|custom-icon|自定义图标|`CustomIcon`|`-`||
|image-preview|是否使用 ImagePreview 组件进行预览|`boolean`|`false`|2.14.0|
|on-before-upload|上传文件前触发|`(file: File) => boolean \| Promise<boolean \| File>`|`-`||
|on-before-remove|移除文件前触发|`(fileItem: FileItem) => Promise<boolean>`|`-`||
|on-button-click|点击上传按钮触发（如果返回 Promise 则会关闭默认 input 上传）|`(event: Event) => Promise<FileList> \| void`|`-`||
### `<upload>` Events

|事件名|描述|参数|
|---|---|---|
|exceed-limit|上传的文件超出限制后触发|fileList: `FileItem[]`<br>files: `File[]`|
|change|上传的文件状态发生改变时触发|fileList: `FileItem[]`<br>fileItem: `fileItem`|
|progress|上传中的文件进度改变时触发|fileItem: `fileItem`<br>ev: `ProgressEvent`|
|preview|点击图片预览时的触发|fileItem: `FileItem`|
|success|上传成功时触发|fileItem: `FileItem`|
|error|上传失败时触发|fileItem: `FileItem`|
### `<upload>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|submit|上传文件（已经初始化完成的文件）|fileItem: `FileItem`|-||
|abort|中止上传|fileItem: `FileItem`|-||
|updateFile|更新文件|id: `string`<br>file: `File`|-||
|upload|上传文件|files: `File[]`|-|2.41.0|
### `<upload>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|extra-button|上传列表额外按钮|fileItem: `FileItem`|2.43.0|
|image|自定义图片|fileItem: `FileItem`|2.23.0|
|file-name|文件名称|-|2.23.0|
|file-icon|文件图标|-|2.23.0|
|remove-icon|删除图标|-|2.23.0|
|preview-icon|预览图标|-|2.23.0|
|cancel-icon|取消图标|-|2.23.0|
|start-icon|开始图标|-|2.23.0|
|error-icon|失败图标|-|2.23.0|
|success-icon|成功图标|-|2.23.0|
|retry-icon|重试图标|-|2.23.0|
|upload-button|上传按钮|-||
|upload-item|上传列表的项目|fileItem: `FileItem`<br>index: `number`||




### FileItem

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|uid|当前上传文件的唯一标示|`string`|`-`|
|status|当前上传文件的状态|`FileStatus`|`-`|
|file|文件对象|`File`|`-`|
|percent|上传进度百分比|`number`|`-`|
|response|当前文件上传请求返回的响应|`any`|`-`|
|url|文件地址|`string`|`-`|
|name|文件名|`string`|`-`|



### CustomIcon

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|startIcon|开始图标|`RenderFunction`|`-`|
|cancelIcon|取消图标|`RenderFunction`|`-`|
|retryIcon|重试图标|`RenderFunction`|`-`|
|successIcon|成功图标|`RenderFunction`|`-`|
|errorIcon|失败图标|`RenderFunction`|`-`|
|removeIcon|移除图标|`RenderFunction`|`-`|
|previewIcon|预览图标|`RenderFunction`|`-`|
|fileIcon|文件图标|`(fileItem: FileItem) => VNode`|`-`|
|fileName|文件名|`(fileItem: FileItem) => string \| VNode`|`-`|



### RequestOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action|上传的URL|`string`|`-`|
|headers|请求报文的头信息|`Record<string, string>`|`-`|
|name|上传文件的文件名|`string \| ((fileItem: FileItem) => string)`|`-`|
|fileItem|上传文件|`FileItem`|`-`|
|data|附加的请求信息|`Record<string, string \| Blob>    \| ((fileItem: FileItem) => Record<string, string \| Blob>)`|`-`|
|withCredentials|是否携带cookie信息|`boolean`|`false`|
|onProgress|更新当前文件的上传进度。percent: 当前上传进度百分比|`(percent: number, event?: ProgressEvent) => void`|`-`|
|onSuccess|上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|
|onError|上传失败后，调用onError方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|



### UploadRequest

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|abort|终止上传|`() => void`|`-`|


