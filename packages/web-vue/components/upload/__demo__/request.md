```yaml
title:
  zh-CN: 自定义上传请求
  en-US: Custom Upload Request
```

## zh-CN

可以通过 `custom-request` 实现自定义上传请求。

---

## en-US

Custom upload request can be realized through `custom-request`.

---

```vue
<template>
  <a-upload :custom-request="customRequest" />
</template>

<script>
export default {
  setup() {
    const customRequest = (option) => {
      const {onProgress, onError, onSuccess, fileItem, name} = option
      const xhr = new XMLHttpRequest();
      if (xhr.upload) {
        xhr.upload.onprogress = function (event) {
          let percent;
          if (event.total > 0) {
            // 0 ~ 1
            percent = event.loaded / event.total;
          }
          onProgress(percent, event);
        };
      }
      xhr.onerror = function error(e) {
        onError(e);
      };
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          return onError(xhr.responseText);
        }
        onSuccess(xhr.response);
      };

      const formData = new FormData();
      formData.append(name || 'file', fileItem.file);
      xhr.open('post', '//upload-z2.qbox.me/', true);
      xhr.send(formData);

      return {
        abort() {
          xhr.abort()
        }
      }
    };

    return {
      customRequest
    }
  },
}
</script>
```
