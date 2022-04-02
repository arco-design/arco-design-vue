```yaml
title:
  zh-CN: 移除前校验
  en-US: On Before Remove
```

## zh-CN

`on-before-remove` 会在每一个文件移除之前执行。如果返回 `false` 或者` Promise.reject`， 那么将会取消当前文件的操作。

---

## en-US

The function will be executed before each file remove. Removing will be aborted when the return value is false or a Promise which resolve(false) or reject.

---

```vue
<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload
      action="/"
      :default-file-list="[
        {
          uid: '-2',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]"
      @before-remove="beforeRemove"
    />
  </a-space>
</template>

<script>
import { Modal } from '@arco-design/web-vue';

export default {
  setup() {
    const beforeRemove = (file) => {
      return new Promise((resolve, reject) => {
        Modal.confirm({
          title: 'on-before-remove',
          content: `确认删除 ${file.name}`,
          onOk: () => resolve(true),
          onCancel: () => reject('cancel'),
        });
      });
    };

    return {
      beforeRemove
    }
  },
};
</script>
```
