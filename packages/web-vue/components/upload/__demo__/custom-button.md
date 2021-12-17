```yaml
title:
  zh-CN: 自定义上传节点
  en-US: custom upload button
```

## zh-CN

可以通过插槽 `upload-button` 传入自定义内容作为文件上传的触发节点。

---

## en-US

You can pass in custom content through the slot `upload-button` as the trigger node for file upload.

---

```vue
<template>
  <a-upload action="/">
    <template #upload-button>
      <div
        style="
        background-color: var(--color-fill-2);
        color: var(--color-text-1);
        border: 1px dashed var(--color-fill-4);
        height: 158px;
        width: 380px;
        border-radius: 2;
        line-height: 158px;
        text-align: center;"
      >
        <div>
          Drag the file here or
          <span style="color: #3370FF"> Click to upload</span>
        </div>
      </div>
    </template>
  </a-upload>
</template>
```
