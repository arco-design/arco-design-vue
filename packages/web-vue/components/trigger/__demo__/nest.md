```yaml
title:
  zh-CN: 多层嵌套
  en-US: Nest
```

## zh-CN

弹出层可以嵌套在另一个弹出层内。

---

## en-US


---

```vue
<template>
  <a-trigger trigger="click" class="trigger-demo-nest">
    <a-button>Click Me</a-button>
    <template #content>
      <div>
        <a-empty />
        <a-trigger class="trigger-demo-nest" position="right">
          <a-button>Hover Me</a-button>
          <template #content>
            <a-empty />
            <a-trigger trigger="click" class="trigger-demo-nest" position="right">
              <a-button>Click Me</a-button>
              <template #content>
                <a-empty />
                <a-trigger class="trigger-demo-nest" position="right">
                  <a-button>Hover Me</a-button>
                  <template #content>
                    <a-empty />
                  </template>
                </a-trigger>
              </template>
            </a-trigger>
          </template>
        </a-trigger>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">
.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

  &-popup-content {
    text-align: right;
  }
}
</style>
```
