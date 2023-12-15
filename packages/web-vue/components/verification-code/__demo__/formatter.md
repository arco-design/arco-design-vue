```yaml
title:
  zh-CN: 格式化输入
  en-US: Formatter input
```

## zh-CN

通过 `formatter` 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

---

## en-US

Validate input using `formatter`. Additionally, it can return non-boolean types to format the user-entered string into a specific format.

---

```vue
<template>
  <a-space direction="vertical">
    <a-verification-code
      defaultValue='123456'
      style="width: 300px"
      :formatter="(inputValue) =>  /^\d*$/.test(inputValue) ? inputValue : false"
    />
    <a-verification-code
      defaultValue='abcdef'
      style="width: 300px"
      :formatter="(inputValue) => /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : ''"
    />
  </a-space>
</template>
```
