```yaml
title:
  zh-CN: 手动上传
  en-US: manual upload
```

## zh-CN

设置 `auto-upload` 为 `false` 时候，可以通过调用 `submit` 方法进行手动上传。

---

## en-US

When setting `auto-upload` to `false`, you can manually upload by calling the `submit` method.

---

```vue
<template>
  <div>
    <a-upload
      action="/"
      :auto-upload="false"
      ref="uploadRef"
      @change="handleChange"
      multiple
    >
      <template #upload-button>
        <a-space>
          <a-button> select file</a-button>
          <a-button type="primary" @click="handleSubmit">
            start upload</a-button
          >
          <a-button type="primary" @click="handleSubmitOne">
            only upload one
          </a-button>
        </a-space>
      </template>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uploadRef = ref();
const files = ref([]);

const handleSubmitOne = (e) => {
  e.stopPropagation();
  console.log(files.value);
  uploadRef.value.handleSubmit(files.value.find((x) => x.status === 'init'));
};

const handleSubmit = (e) => {
  e.stopPropagation();
  uploadRef.value.handleSubmit();
};

const handleChange = (fileList) => {
  files.value = fileList;
};
</script>
```
