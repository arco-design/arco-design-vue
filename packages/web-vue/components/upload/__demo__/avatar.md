```yaml
title:
  zh-CN: 用户头像上传
  en-US: Avatar Upload
```

## zh-CN

点击上传用户头像，可使用 beforeUpload 限制用户上传的图片格式和大小。

---

## en-US

Click to upload user's avatar, and validate size and format of picture with beforeUpload.

---

```vue

<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload
      action="/"
      :fileList="file ? [file] : []"
      :show-file-list="false"
      @change="onChange"
      @progress="onProgress"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
        >
          <div
            class="arco-upload-list-picture custom-upload-avatar"
            v-if="file && file.url"
          >
            <img :src="file.url" />
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
            <a-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
            />
          </div>
          <div class="arco-upload-picture-card" v-else>
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">Upload</div>
            </div>
          </div>
        </div>
      </template>
    </a-upload>
  </a-space>
</template>

<script>
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';

export default {
  components: {IconPlus, IconEdit},
  setup() {
    const file = ref();

    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };
    return {
      file,
      onChange,
      onProgress
    }
  },
};
</script>
```
