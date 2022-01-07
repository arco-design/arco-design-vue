```yaml
title:
  zh-CN: 迷你箭头步骤条
  en-US: Small Arrow Steps
```

## zh-CN

指定 `type: 'arrow', small: true`， 可以使用迷你箭头类型的步骤条。

---

## en-US

By setting `type="arrow" & small=true`, you can use the small arrow type step bar.

---

```vue
<template>
  <div>
    <a-steps type="arrow" :current="2" small style="margin-bottom: 20px;">
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
    <a-steps type="arrow" :current="2" small status="error">
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
  </div>
</template>
```
