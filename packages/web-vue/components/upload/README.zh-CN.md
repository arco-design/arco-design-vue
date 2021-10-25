```yaml
meta:
  type: 组件
  category: 数据输入
title: 上传 Upload
description: 用户可传输文件或提交相应的内容。
```


@import ./__demo__/basic.md

@import ./__demo__/upload-list.md

@import ./__demo__/picture-card.md

@import ./__demo__/draggable.md


### `<upload>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|file-list **(v-model)**|文件列表|`FileItem[]`|`-`|
|default-file-list|默认的文件列表（非受控状态）|`FileItem[]`|`[]`|
|accept|接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")|`string`|`-`|
|action|上传的URL|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|draggable|是否支持拖拽上传|`boolean`|`false`|
|multiple|是否支持多文件上传|`boolean`|`false`|
|tip|提示文字|`string`|`-`|
|headers|上传请求附加的头信息|`object`|`-`|
|data|上传请求附加的数据|`Data \| ((fileItem: FileItem) => Data)`|`-`|
|name|上传的文件名|`string \| ((fileItem: FileItem) => string)`|`-`|
|custom-request|自定义上传行为|`(option: RequestOption) => UploadRequest`|`-`|
|limit|限制上传文件的数量。`0`表示不限制|`number`|`0`|
|auto-upload|是否自动上传文件|`boolean`|`true`|
|show-file-list|是否显示文件列表|`boolean`|`true`|
|list-type|图片列表类型|`'text' \| 'picture' \| 'picture-card'`|`'text'`|
|on-before-upload|上传图片前触发|`(file: File) => Promise<boolean>`|`-`|
|on-before-remove|移除图片前触发|`(fileItem: FileItem) => Promise<boolean>`|`-`|
### `<upload>` Events

|事件名|描述|参数|
|---|---|---|
|exceed-limit|上传的图片超出限制后触发|-|
|change|上传的图片状态发生改变时触发|-|
|progress|上传中的图片进度改变时触发|-|
|preview|点击图片预览时的触发|-|




### FileItem

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|uid|当前上传文件的唯一标示|`string`|`-`|
|status|当前上传文件的状态|`FileStatus`|`-`|
|file|文件对象|`File`|`-`|
|percent|上传进度百分比|`number`|`-`|
|response|当前文件上传请求返回的响应|`any`|`-`|
|url|图片地址|`string`|`-`|
|name|图片文件名|`string`|`-`|



### RequestOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action|上传的URL|`string`|`-`|
|headers|请求报文的头信息|`Data`|`-`|
|name|上传文件的文件名|`string \| ((fileItem: FileItem) => string)`|`-`|
|fileItem|上传文件|`FileItem`|`-`|
|data|附加的请求信息|`Data \| ((fileItem: FileItem) => Data)`|`-`|
|withCredentials|是否携带cookie信息|`boolean`|`false`|
|onProgress|更新当前文件的上传进度。percent: 当前上传进度百分比|`(percent: number, event?: ProgressEvent) => void`|`-`|
|onSuccess|上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|
|onError|上传失败后，调用onError方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|



### UploadRequest

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|abort|终止上传|`() => void`|`-`|


