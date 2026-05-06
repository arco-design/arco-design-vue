```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
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
    <a-steps :current="2">
      <a-step>Succeeded</a-step>
      <a-step>Processing</a-step>
      <a-step>Pending</a-step>
    </a-steps>
    <a-divider />
    <div style="line-height: 140px; text-align: center; color: #C9CDD4; ">
      Step 2 Content
    </div>
  </div>
</template>
```
