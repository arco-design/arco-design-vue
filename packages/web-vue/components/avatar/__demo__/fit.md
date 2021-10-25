```yaml
title:
  zh-CN: 自动调整字体大小
  en-US: Auto Fix Font Size
```

## zh-CN

如果头像是文字的话，会自动调节字体大小，来适应头像框。

---
## en-US

If the avatar content is text, the font size will be automatically adjusted to fit the content in the avatar.

---

```vue
<template>
  <a-avatar
    :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: '#14a9f8',
    }"
  >
    {{ text }}
  </a-avatar>
  <a-button
    type="secondary"
    @click="onClick"
    :style="{ verticalAlign: 'middle' }"
  >
    Change
  </a-button>
</template>

<script>
const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    onClick() {
      this.index = this.index >= list.length - 1 ? 0 : this.index + 1;
    },
  },
  computed: {
    text() {
      return list[this.index];
    },
  },
};
</script>
```
