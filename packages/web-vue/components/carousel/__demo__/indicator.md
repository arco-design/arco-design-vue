```yaml
title:
  zh-CN: 指示器
  en-US: Indicator
```

## zh-CN

可以指定指示器类型：`dot` | `line` | `slider` 和位置 `left` | `right` | `top` | `bottom` | `outer`。

---

## en-US

You can specify the indicator type: `dot` | `line` | `slider` and position `left` | `right` | `top` | `bottom` | `outer`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group
      type="button"
      @change="updateType"
      style="{ marginBottom: '10px' }"
      :modelValue="indicatorType"
    >
      <a-radio value="dot">dot</a-radio>
      <a-radio value="line">line</a-radio>
      <a-radio value="slider">slider</a-radio>
    </a-radio-group>
    <a-radio-group
      type="button"
      @change="updatePosition"
      :style="{ marginBottom: '20px' }"
      :modelValue="indicatorPosition"
    >
      <a-radio value="left">left</a-radio>
      <a-radio value="right">right</a-radio>
      <a-radio value="top">top</a-radio>
      <a-radio value="bottom">bottom</a-radio>
      <a-radio value="outer">outer</a-radio>
    </a-radio-group>
    <a-carousel
      :indicator-type="indicatorType"
      :indicator-position="indicatorPosition"
      show-arrow="never"
      :style="{
      width: '600px',
      height: '240px',
    }"
    >
      <a-carousel-item v-for="image in images">
        <img
          :src="image"
          :style="{
          width: '100%',
          transform: 'translateY(-60px)',
        }"
        />
      </a-carousel-item>
    </a-carousel>
  </a-space>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5eb077f42834139ad7ac17563056664~tplv-uwbnlip3yd-image.image',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5c030fe27c0e467a9a7d62c36ae4805b~tplv-uwbnlip3yd-image.image',
      ],
      indicatorType: 'dot',
      indicatorPosition: 'bottom',
    };
  },
  methods: {
    updateType(type) {
      this.indicatorType = type;
    },
    updatePosition(position) {
      this.indicatorPosition = position;
    },
  },
};
</script>
```
