```yaml
title:
  zh-CN: 箭头步骤条
  en-US: Arrow Steps
```

## zh-CN

通过设置 `type="arrow"`，可以使用箭头类型的步骤条。**注意**：仅支持水平步骤条。

---

## en-US

By setting `type="arrow"`, you can use the arrow type step bar. **Note**: Only horizontal step bars are supported.

---

```vue
<template>
  <a-steps type="arrow" :current="2">
    <a-step description="This is a description">Succeeded</a-step>
    <a-step description="This is a description">Processing</a-step>
    <a-step description="This is a description">Pending</a-step>
  </a-steps>
</template>
```
