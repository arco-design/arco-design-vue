```yaml
title:
  zh-CN: 上传前校验
  en-US: beforeUpload
```

## zh-CN

`beforeUpload` 会在每一个文件上传之前执行。如果返回 `false` 或者` Promise.reject`， 那么将会取消当前文件的上传。

---

## en-US

The function will be executed before each file upload. Uploading will be aborted when the return value is false or a Promise which resolve(false) or reject.

---

```vue
<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload action="/" @before-upload="beforeUpload" />
  </a-space>
</template>
<script>
export default {
  methods: {
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        this.$modal.confirm({
          title: 'beforeUpload',
          content: `确认上传 ${file.name}`,
          onOk: () => resolve(true),
          onCancel: () => reject('cancel'),
        });
      });
    },
  },
};
</script>
```
