```yaml
title:
  zh-CN: 右键菜单
  en-US: Context Menu
```

## zh-CN

移入区域后，可点击鼠标右键触发。

---

## en-US

After moving into the area, you can click the right mouse button to trigger.

---

```vue
<template>
  <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
    <div :style="{display:'flex',alignItems:'center',justifyContent:'center', height:'300px',backgroundColor:'var(--color-fill-2)'}">
      <div>Click Me</div>
    </div>
    <template #content>
      <a-doption>Option 1</a-doption>
      <a-doption>Option 2</a-doption>
      <a-doption>Option 3</a-doption>
    </template>
  </a-dropdown>
</template>
```
