```yaml
title:
  zh-CN: 自定义标签
  en-US: Custom Label
```

## zh-CN

可以通过 `label` 插槽自定义标签

---

## en-US

You can customize labels through the 'label' slot

---

```vue
<template>
  <a-timeline>
    <a-timeline-item>
      Code Review
      <template #label>
        <a-tag>
          <template #icon>
            <icon-check-circle-fill />
          </template>
          Passed
        </a-tag>
      </template>
    </a-timeline-item>
  </a-timeline>
</template>
```
