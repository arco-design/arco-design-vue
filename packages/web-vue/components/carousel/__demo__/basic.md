```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

基本用法

---

## en-US

Basic usage

---

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :default-current="2"
    @change="handleChange"
  >
    <a-carousel-item v-for="image in images">
      <img
        :src="image"
        :style="{
          width: '100%',
        }"
      />
    </a-carousel-item>
  </a-carousel>
</template>

<script>
export default {
  setup() {
    const images = [
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    ];
    const handleChange=(value)=>{
      console.log(value)
    }
    return {
      images,
      handleChange
    }
  },
};
</script>
```
