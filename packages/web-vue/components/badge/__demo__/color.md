```yaml
title:
  zh-CN: 颜色
  en-US: Color
```

## zh-CN

我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

---

## en-US

We provide a variety of preset colors for the badge. And you can also set a custom color by the color property.

---

```vue
<template>
  <div>
    <a-badge
      v-for="color in colors"
      :key="color"
      :color="color"
      :text="color"
      :style="{ marginRight: '24px' }"
    />
  </div>
  <br />
  <div>
    <a-badge
      v-for="color in customColors"
      :key="color"
      :color="color"
      :text="color"
      :style="{ marginRight: '24px' }"
    />
  </div>
</template>

<script>
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const COLORS_CUSTOM = [
  '#F53F3F',
  '#7816FF',
  '#00B42A',
  '#165DFF',
  '#FF7D00',
  '#EB0AA4',
  '#7BC616',
  '#86909C',
  '#B71DE8',
  '#0FC6C2',
  '#FFB400',
  '#168CFF',
  '#FF5722',
];
export default {
  data() {
    return {
      colors: COLORS,
      customColors: COLORS_CUSTOM,
    };
  },
};
</script>
```
