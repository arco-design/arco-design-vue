```yaml
order: 4
title:
  zh-CN: 加载状态
  en-US: Loading
```

## zh-CN

默认情况下，加载效果是不显示的，可通过设置 `showLoader` 为 `true` 显示默认加载效果。如果默认加载效果不符合需求, 还可以通过 具名插槽 `loader` 自行设置加载样式。

---

## en-US

By default, the loading effect is not displayed, and the default loading effect can be displayed by setting `showLoader` to `true`. If the default loading effect does not meet the requirements, you can also set the loading style yourself through the named slot `loader`.

Loading

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
    show-loader
  />
  <a-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`"
    style="marginLeft: 67px"
  >
    <template #loader>
      <div class="loader-animate"/>
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
<style scoped>
  .loader-animate {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -60deg,
      var(--color-fill-2) 25%,
      var(--color-neutral-3) 40%,
      var(--color-fill-3) 55%
    );
    background-size: 400% 100%;
    animation: loop-circle 1.5s cubic-bezier(0.34, 0.69, 0.1, 1) infinite;
  }

  @keyframes loop-circle {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
```
