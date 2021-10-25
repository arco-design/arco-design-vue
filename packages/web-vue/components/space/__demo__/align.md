```yaml
title:
  zh-CN: 对齐
  en-US: Align
```

## zh-CN

内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

---

## en-US

There are 4 built-in alignment methods, namely `start` `center` `end` `baseline`, and the default is `center` in horizontal mode.

---

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <a-radio-group v-model="align" type='button'>
        <a-radio value="start">start</a-radio>
        <a-radio value="center">center</a-radio>
        <a-radio value="end">end</a-radio>
        <a-radio value="baseline">baseline</a-radio>
      </a-radio-group>
    </div>
    <a-space :align="align" style="backgroundColor: var(--color-fill-2);padding: 10px;">
      <a-typography-text>Space:</a-typography-text>
      <a-button type="primary">Item2</a-button>
      <a-card title='Card'>
        Card content
      </a-card>
    </a-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      align: 'center',
    }
  }
};
</script>
```
