```yaml
title:
  zh-CN: 可切换步骤条
  en-US: Changeable
```

## zh-CN

设置 `changeable` 开启点击切换步骤。

---

## en-US

Set `changeable` to enable the click switch step.

---

```vue
<template>
  <div>
    <a-steps changeable :current="current" @change="setCurrent">
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
    <div :style="{
          width: '100%',
          height: '200px',
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }">
      <div style="line-height: 160px;">Step{{current}} Content</div>
      <a-space size="large">
        <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft/> Back
        </a-button>
        <a-button type="primary" :disabled="current >= 3" @click="onNext">
          Next <IconRight/>
        </a-button>
      </a-space>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    onPrev() {
      this.current = Math.max(1, this.current - 1)
    },

    onNext() {
      this.current = Math.min(3, this.current + 1)
    },

    setCurrent(current) {
      this.current = current
    }
  }
};
</script>
```
