```yaml
title:
  zh-CN: 渐进加载
  en-US: Progressive Loading
```

## zh-CN

大图可通过给 `loader` 传递一个小一些的图片，让其在原图未被加载成功时显示，以此来模拟渐进加载。

---

## en-US

When you need to display a large image, you can pass a smaller image to `loader` to display it when the original image is not successfully loaded to simulate progressive loading.

---

```vue
<template>
  <div>
    <a-button
      type="primary"
      @click="() => {timestamp = Date.now()}"
      style="margin-bottom: 20px;"
    >
      reload
    </a-button>
  </div>
  <a-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`"
  >
    <template #loader>
      <img
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        style="filter: blur(5px);"
      />
    </template>
  </a-image>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const timestamp = ref('');
    return {
      timestamp,
    }
  }
}
</script>
```
