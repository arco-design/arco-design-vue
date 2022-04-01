```yaml
title:
  zh-CN: 自定义颜色
  en-US: Custom Color
```

## zh-CN

通过 color 可以自定义颜色。另外可以通过对象形式自定义不同分值时的颜色。

---

## en-US

Color can be customized through color. In addition, you can customize the color of different score values through object form.

---

```vue
<template>
  <a-space direction="vertical">
    <a-rate color="red" />
    <a-rate :color="color" />
  </a-space>
</template>

<script>
export default {
  setup() {
    const color = {
      2: 'red',
      4: 'green',
      5: 'blue'
    }
    return {
      color
    }
  },
}
</script>
```
