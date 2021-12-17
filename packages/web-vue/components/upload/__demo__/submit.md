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
          <a-button> select file </a-button>
          <a-button type="primary" @click="submit"> start upload </a-button>
          <a-button type="primary" @click="submitOne">
            only upload one
          </a-button>
        </a-space>
      </template>
    </a-upload>
  </div>
</template>
<script>

export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    submitOne(e) {
      e.stopPropagation();
      console.log(this.files)
      this.$refs.uploadRef.submit(
        this.files.find((x) => x.status === 'init')
      );
    },

    submit(e) {
      e.stopPropagation();
      this.$refs.uploadRef.submit();
    },

    onChange(fileList) {
      this.files = fileList;
    },
  },
};
</script>
```
