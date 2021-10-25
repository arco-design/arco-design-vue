```yaml
title:
  zh-CN: 无限长列表
  en-US: Infinite List
```

## zh-CN

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

---

## en-US

By specifying `virtualListProps` to turn on the virtual list, high performance can be obtained when a large amount of data is used.

```vue
<template>
  <h3 :style="{ color: 'var(--color-text-2)' }">10000 items</h3>
  <a-list
    :style="{ width: `600px` }"
    :virtualListProps="{
      height: 560,
    }"
    :data="list"
  >
    <template #item="{ item, index }">
      <a-list-item :key="index">
        <a-list-item-meta
          :title="item.title"
          :description="item.description"
        >
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="item.avatar" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
export default {
  data() {
    return {
      list: new Array(10000).fill(null).map((_, index) => {
        const prefix = `0000${index}`.slice(-5);
        return {
          avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee428f1389b4291b1f9bbd82b24105d~tplv-uwbnlip3yd-image.image',
          title: 'Beijing Bytedance Technology Co., Ltd.',
          description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
        };
      })

    }
  }
}
</script>
```
