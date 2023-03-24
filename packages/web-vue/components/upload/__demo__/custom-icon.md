```yaml
title:
  zh-CN: 自定义图标
  en-US: custom icon
```

## zh-CN

自定义图标

---

## en-US

custom icon

---

```vue

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <a-space>
        <span>Type: </span>
        <a-radio-group v-model="type">
          <a-radio value="text">text</a-radio>
          <a-radio value="picture">picture</a-radio>
          <a-radio value="picture-card">picture-card</a-radio>
        </a-radio-group>
      </a-space>
    </div>
    <a-upload
      action="/"
      :list-type="type"
      :default-file-list="[
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-3',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]"
      :custom-icon="getCustomIcon()"
    />
  </div>
</template>

<script>
import { h, ref } from 'vue';
import { IconUpload, IconFileAudio, IconClose, IconFaceFrownFill } from '@arco-design/web-vue/es/icon';

export default {
  setup() {
    const type = ref('text');
    const getCustomIcon = () => {
      return {
        retryIcon: () => h(IconUpload),
        cancelIcon: () => h(IconClose),
        fileIcon: () => h(IconFileAudio),
        removeIcon: () => h(IconClose),
        errorIcon: () => h(IconFaceFrownFill),
        fileName: (file) => {
          return `文件名： ${file.name}`
        },
      };
    };

    return {
      type,
      getCustomIcon
    }
  },
};
</script>
```
