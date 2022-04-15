```yaml
title:
  zh-CN: 组合按钮
  en-US: Button Group
```

## zh-CN

通过 `<a-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。

---

## en-US

Use the `<a-button-group>` component to make the buttons appear as a group. Can be used in multiple operations at the same level.

---

```vue
<template>
  <a-space direction="vertical">
    <a-button-group>
      <a-button>Publish</a-button>
      <a-button>
        <template #icon>
          <icon-down />
        </template>
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button>Publish</a-button>
      <a-button>
        <template #icon>
          <icon-more />
        </template>
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary">
        <icon-left />
        Prev
      </a-button>
      <a-button type="primary">
        Next
        <icon-right />
      </a-button>
    </a-button-group>
    <a-space size="large">
      <a-button-group type="primary">
        <a-button> copy </a-button>
        <a-button> cut </a-button>
        <a-button> find </a-button>
      </a-button-group>
      <a-button-group type="primary" status="warning">
        <a-button> <template #icon><icon-heart-fill /></template> </a-button>
        <a-button> <template #icon><icon-star-fill /></template> </a-button>
        <a-button> <template #icon><icon-thumb-up-fill /></template> </a-button>
      </a-button-group>
      <a-button-group size="small" disabled>
        <a-button> prev </a-button>
        <a-button> next </a-button>
      </a-button-group>
    </a-space>
  </a-space>
</template>
```
