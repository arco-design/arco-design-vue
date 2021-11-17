```yaml
meta:
  type: Component
  category: Data Entry
title: Upload
description: Users can transfer files or submit corresponding content.
```

*Auto translate by google.*


@import ./__demo__/basic.md

@import ./__demo__/upload-list.md

@import ./__demo__/picture-card.md

@import ./__demo__/draggable.md

@import ./__demo__/request.md


### `<upload>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|file-list **(v-model)**|File List|`FileItem[]`|`-`|
|default-file-list|Default file list (uncontrolled state)|`FileItem[]`|`[]`|
|accept|For the received upload file type, please refer to [HTML standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")|`string`|`-`|
|action|Uploaded URL|`string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|multiple|Whether to support multiple file upload|`boolean`|`false`|
|directory|Whether to support folder upload (requires browser support)|`boolean`|`false`|
|draggable|Whether to support drag and drop upload|`boolean`|`false`|
|tip|Prompt text|`string`|`-`|
|headers|Additional header information for upload request|`object`|`-`|
|data|Upload request additional data|`Record<string, unknown>\| ((fileItem: FileItem) => Record<string, unknown>)`|`-`|
|name|Uploaded file name|`string \| ((fileItem: FileItem) => string)`|`-`|
|with-credentials|Whether the upload request carries cookies|`boolean`|`false`|
|custom-request|Custom upload behavior|`(option: RequestOption) => UploadRequest`|`-`|
|limit|Limit the number of uploaded files. `0` means no limit|`number`|`0`|
|auto-upload|Whether to upload files automatically|`boolean`|`true`|
|show-file-list|Whether to display the file list|`boolean`|`true`|
|list-type|Picture list type|`'text' \| 'picture' \| 'picture-card'`|`'text'`|
|response-url-key|Get the key of the image URL in the Response. After opening, it will replace the pre-load image with the uploaded image|`string`|`-`|
|custom-icon|Custom icon|`CustomIcon`|`-`|
|on-before-upload|Trigger before uploading a picture|`(file: File) => Promise<boolean>`|`-`|
|on-before-remove|Triggered before removing the picture|`(fileItem: FileItem) => Promise<boolean>`|`-`|
|on-button-click|Click the upload button to trigger (if the Promise is returned, the default input upload will be closed)|`(event: Event) => Promise<FileList> \| void`|`-`|
### `<upload>` Events

|Event Name|Description|Parameters|
|---|---|---|
|exceed-limit|Triggered when the uploaded image exceeds the limit|fileList: `FileItem[]`<br>files: `File[]`|
|change|Triggered when the status of the uploaded image changes|fileList: `FileItem[]`<br>fileItem: `fileItem`|
|progress|Triggered when the uploading image progress changes|fileItem: `fileItem`<br>event: `ProgressEvent`|
|preview|Trigger when the image preview is clicked|fileItem: `FileItem`|
|success|Triggered when upload is successful|fileItem: `FileItem`|
|error|Triggered when upload fails|fileItem: `FileItem`|
### `<upload>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|upload-button|Upload button|-|
|upload-item|Upload list item|fileItem: `FileItem`<br>index: `number`|




### FileItem

|Name|Description|Type|Default|
|---|---|---|:---:|
|uid|The unique identifier of the currently uploaded file|`string`|`-`|
|status|The status of the currently uploaded file|`FileStatus`|`-`|
|file|File object|`File`|`-`|
|percent|Upload progress percentage|`number`|`-`|
|response|The response returned by the current file upload request|`any`|`-`|
|url|The image address|`string`|`-`|
|name|Picture file name|`string`|`-`|



### CustomIcon

|Name|Description|Type|Default|
|---|---|---|:---:|
|startIcon|Start icon|`RenderFunction`|`-`|
|cancelIcon|Cancel icon|`RenderFunction`|`-`|
|retryIcon|Retry icon|`RenderFunction`|`-`|
|successIcon|Success icon|`RenderFunction`|`-`|
|errorIcon|Error icon|`RenderFunction`|`-`|
|removeIcon|Remove icon|`RenderFunction`|`-`|
|previewIcon|Preview icon|`RenderFunction`|`-`|
|fileIcon|File icon|`(fileItem: FileItem) => VNode`|`-`|
|fileName|File name|`(fileItem: FileItem) => string \| VNode`|`-`|



### RequestOption

|Name|Description|Type|Default|
|---|---|---|:---:|
|action|Uploaded URL|`string`|`-`|
|headers|Header information of the request message|`Data`|`-`|
|name|File name of the uploaded file|`string \| ((fileItem: FileItem) => string)`|`-`|
|fileItem|upload files|`FileItem`|`-`|
|data|Additional requested information|`Data \| ((fileItem: FileItem) => Data)`|`-`|
|withCredentials|Whether to carry cookie information|`boolean`|`false`|
|onProgress|Update the upload progress of the current file. percent: current upload progress percentage|`(percent: number, event?: ProgressEvent) => void`|`-`|
|onSuccess|After the upload is successful, call the onSuccess method, the incoming response parameter will be appended to the response field of the currently uploaded file|`(response?: any) => void`|`-`|
|onError|After the upload fails, call the onError method, and the response parameter passed in will be appended to the response field of the currently uploaded file|`(response?: any) => void`|`-`|



### UploadRequest

|Name|Description|Type|Default|
|---|---|---|:---:|
|abort|Terminate upload|`() => void`|`-`|


