<template>
  <sd-upload :custom-request="customRequest" />
</template>

<script setup lang="ts">
  const customRequest = (option) => {
    const { onProgress, onError, onSuccess, fileItem, name } = option;
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
        xhr.abort();
      },
    };
  };
</script>
