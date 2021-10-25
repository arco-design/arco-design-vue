```yaml
title:
  zh-CN: 时间轴展示类型
  en-US: Mode
```

## zh-CN

设置 `mode=alternate`时将会交替展示内容。同时可以通过设置 `TimelineItem` 的 `positon`属性控制时间轴节点的位置.

---

## en-US

The content will be displayed alternately when `mode=alternate` is set. At the same time, you can control the position of the timeline node by setting the positon property of TimelineItem.

---

```vue
<template>
  <a-row justify="space-between">
    <a-timeline mode="alternate" :style="{ flex: 1 }">
      <a-timeline-item label="2017-03-10">The first milestone</a-timeline-item>
      <a-timeline-item label="2018-05-12">The second milestone</a-timeline-item>
      <a-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </a-timeline-item>
    </a-timeline>
    <a-timeline mode="right" :style="{ flex: 1 }">
      <a-timeline-item label="2017-03-10">The first milestone</a-timeline-item>
      <a-timeline-item label="2018-05-12">The second milestone</a-timeline-item>
      <a-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </a-timeline-item>
    </a-timeline>
  </a-row>
</template>
```
