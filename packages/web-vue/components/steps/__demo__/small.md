```yaml
title:
  zh-CN: 小型步骤条
  en-US: small steps
```

## zh-CN

通过 `small` 可以设置展示小型步骤条


---

## en-US

small steps

---

```vue
<template>
  <div>
    <a-steps :current="2" small>
      <a-step>Succeeded</a-step>
      <a-step>Processing</a-step>
      <a-step>Pending</a-step>
    </a-steps>
    <a-divider/>
    <div style="line-height: 140px; text-align: center; color: #C9CDD4; ">
      Step 2 Content
    </div>
  </div>
</template>
```
