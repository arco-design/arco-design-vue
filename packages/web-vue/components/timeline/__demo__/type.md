```yaml
title:
  zh-CN: 自定义轴线样式
  en-US: Type
```

## zh-CN

自定义轴线的示例。

---

## en-US

Example of custom axis.

---

```vue
<template>
  <a-timeline>
    <a-timeline-item label="2017-03-10" lineType="dashed">
      The first milestone
      <br />
      <a-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </a-typography-text>
    </a-timeline-item>
    <a-timeline-item label="2018-05-12" lineType="dashed">
      The second milestone
      <br />
      <a-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </a-typography-text>
    </a-timeline-item>
    <a-timeline-item label="2020-09-30" lineType="dashed">
      The third milestone
      <br />
      <a-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </a-typography-text>
    </a-timeline-item>
  </a-timeline>
</template>
```
