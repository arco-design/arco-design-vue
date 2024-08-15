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
      @change="onChange"
      multiple
    >
      <template #upload-button>
        <a-space>
          <a-button> select file</a-button>
          <a-button type="primary" @click="submit"> start upload</a-button>
          <a-button type="primary" @click="submitOne">
            only upload one
          </a-button>
        </a-space>
      </template>
    </a-upload>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadRef = ref();
    const files = ref([]);

    const submitOne = (e) => {
      e.stopPropagation();
      console.log(files.value);
      uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
    };

    const submit = (e) => {
      e.stopPropagation();
      uploadRef.value.submit();
    };

    const onChange = (fileList) => {
      files.value = fileList;
    };

    return {
      uploadRef,
      files,
      submitOne,
      submit,
      onChange,
    };
  },
};
</script>
```
