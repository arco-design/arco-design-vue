```yaml
title:
  zh-CN: 定制日期单元格
  en-US: Customize cell
```

## zh-CN

利用具名插槽  `cell` 可以定制日期单元格。

---

## en-US

Use the named slot `cell` to customize the date cell.

---

```vue
<template>
  <a-date-picker>
    <template #cell="slotProps">
      <div class="arco-picker-date">
        <div class="arco-picker-date-value" :style="getCellStyle(slotProps?.date)">
          {{ dayjs?.(slotProps?.date)?.date() }}
        </div>
      </div>
    </template>
  </a-date-picker>
</template>
<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      highlightDates: [6, 14, 22],
      highlightStyle: {
        border: '1px solid rgb(var(--arcoblue-6))',
      }
    }
  },
  methods: {
    getCellStyle(date) {
      return this.highlightDates.indexOf(dayjs(date).date()) > -1 ? this.highlightStyle : {}
    },
    dayjs
  }
}
</script>
```
