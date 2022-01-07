```yaml
title:
  zh-CN: 自定义节点
  en-US: Custom node
```

## zh-CN

步骤条的基本用法。

---

## en-US

Basic usage of the step bar.

---

```vue
<template>
  <div>
    <a-steps
      changeable
      label-placement="vertical"
      :current="current"
      @change="setCurrent"
    >
      <a-step description="This is a description">
        Succeeded
        <template v-slot:node="slotProps">
          <a-popover content="step tip" :popup-visible="current === 1">
            <span>{{ slotProps.step }}</span>
          </a-popover>
        </template>
      </a-step>
      <a-step description="This is a description">
        Processing Succeeded
        <template v-slot:node="slotProps">
          <a-popover content="step tip" :popup-visible="current === 2">
            <span>{{ slotProps.step }}</span>
          </a-popover>
        </template>
      </a-step>
      <a-step description="This is a description"
        >Pending
        <template v-slot:node="slotProps">
          <a-popover content="step tip" :popup-visible="current === 3">
            <span>{{ slotProps.step }}</span>
          </a-popover>
        </template>
      </a-step>
    </a-steps>
    <div style="margin-top: 20px; text-align: center;">
      <a-space size="large">
        <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft /> Back
        </a-button>
        <a-button type="primary" :disabled="current >= 3" @click="onNext">
          Next <IconRight />
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
      this.current = Math.max(1, this.current - 1);
    },

    onNext() {
      this.current = Math.min(3, this.current + 1);
    },

    setCurrent(current) {
      this.current = current;
    },
  },
};
</script>
```
