```yaml
title:
  zh-CN: 渐变进度条
  en-US: linear-gradient
```

## zh-CN

`color` 传入对象时， 会作为 `linear-gradient` 的属性值设置渐变色。

---

## en-US

linear-gradient progress bar.


---

```vue
<template>
  <div>
    <a-progress
      :percent="0.8"
      :style="{ width: '50%' }"
      :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }"
    />
    <br/>
    <br/>

    <a-progress
      :percent="1"
      :style="{ width: '50%' }"
      :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }"
    />
    <br/>
    <br/>
    <a-space size="large">
      <a-progress
        type="circle"
        :percent="0.8"
        :style="{ width: '50%' }"
        :color="{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }"
      />

      <a-progress
        type="circle"
        :percent="1"
        :style="{ width: '50%' }"
        :color="{
          '0%': 'rgb(var(--primary-6))',
          '100%': 'rgb(var(--success-6))',
        }"
      />
    </a-space>
  </div>
</template>
```
