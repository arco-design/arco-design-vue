```yaml
title:
  zh-CN: 日历内容定制
  en-US: Custom Date Content
```

## zh-CN

通过 `date-inner-content` 可以将自定义元素追加到日历单元格中，用于展示待办等信息。

---

## en-US

Use `date-inner-content` to append custom content into date cells.

---

```vue
<template>
  <div style="width: 100%; overflow: auto">
    <a-calendar :default-value="new Date('2020-03-04')" :date-inner-content="dateInnerContent" />
  </div>
</template>

<script>
import { h, resolveComponent } from 'vue';

const badgeStyle = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function renderItems(items) {
  const Badge = resolveComponent('a-badge');
  return h(
    'div',
    { style: { padding: '0 10px' } },
    items.flatMap((item) => [
      h(Badge, { style: badgeStyle, status: item.status, text: item.text }),
      h('br'),
    ])
  );
}

export default {
  setup() {
    const dateInnerContent = (currentDate) => {
      const date = currentDate.format('YYYY-MM-DD');
      if (date === '2020-03-07') {
        return renderItems([
          { status: 'processing', text: 'Cooking' },
          { status: 'success', text: 'Reading' },
          { status: 'warning', text: 'Sleeping' },
        ]);
      }
      if (date === '2020-03-17') {
        return renderItems([
          { status: 'processing', text: 'Coding' },
          { status: 'processing', text: 'Running' },
          { status: 'success', text: 'Eating' },
          { status: 'warning', text: 'Play games' },
          { status: 'error', text: 'Sleeping' },
        ]);
      }
      return null;
    };

    return {
      dateInnerContent,
    };
  },
};
</script>
```
