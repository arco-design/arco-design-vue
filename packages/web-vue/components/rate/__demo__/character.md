```yaml
title:
  zh-CN: 自定义评分字符
  en-US: Custom Character
```

## zh-CN

可以将星星替换为其他字符，比如表情、字母，数字，字体图标甚至中文。

---

## en-US

You can replace the stars with other characters, such as emoticons, letters, numbers, font icons and even Chinese.

---

```vue
<template>
  <a-rate :default-value="2">
    <template #character="{ index }">
      <icon-check v-if="index < 3"/>
      <icon-close v-else/>
    </template>
  </a-rate>
</template>
```
