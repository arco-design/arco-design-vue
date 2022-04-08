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
    <template #cell="{ date }">
      <div class="arco-picker-date">
        <div class="arco-picker-date-value" :style="getCellStyle(date)">
          {{ date.getDate() }}
        </div>
      </div>
    </template>
  </a-date-picker>
</template>
<script>
export default {
  setup() {
    const highlightDates = [6, 14, 22];
    const highlightStyle = {
      border: '1px solid rgb(var(--arcoblue-6))',
    };
    return {
      getCellStyle(date) {
        return highlightDates.includes(date.getDate()) ? highlightStyle : {}
      }
    }
  }
}
</script>
```
