```yaml
title:
  zh-CN: 汉字间空格
  en-US: Space between Chinese characters
```

## zh-CN

在按钮内(文本按钮和链接按钮)当只有两个汉字时自动添加空格，可以设置 [ConfigProvider](/vue/component/config-provider "_blank") 的属性 `autoInsertSpaceInButton` 为 `true`。

---

## en-US

Automatically add spaces within the button (text button and link button) when there are only two Chinese characters, you can set the [ConfigProvider](/vue/component/config-provider "_blank") wrapper component props `autoInsertSpaceInButton` value `true`。

---

```vue
<template>
  <a-config-provider auto-insert-space-in-button>
    <a-space>
      <a-button type="primary">提交</a-button>
      <a-button type="primary">发送消息</a-button>
    </a-space>
  </a-config-provider>
</template>
```
