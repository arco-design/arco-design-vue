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
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/56362efcb2de4f73bd315c5462cca031~tplv-uwbnlip3yd-image.image?timestamp=${timestamp}`"
  >
    <template #loader>
      <img
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d18824f28b084505a263052965e0b30d~tplv-uwbnlip3yd-image.image"
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
