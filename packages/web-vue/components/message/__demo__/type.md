```yaml
title:
  zh-CN: 消息类型
  en-US: Message Type
```

## zh-CN

全局提示有 6 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `loading`。2.41.0 版本增加 `normal` 类型，此类型下默认没有图标。

---

## en-US

There are 6 different types of global prompts, namely: `info`, `success`, `warning`, `error`, `loading`. Version 2.41.0 adds the `normal` type, which has no icon by default.

---

```vue

<template>
  <div>
    <a-space>
      <a-button @click="()=>this.$message.info('This is an info message!')">Info Message</a-button>
      <a-button @click="()=>this.$message.success('This is a success message!')" status="success">Success Message
      </a-button>
      <a-button @click="()=>this.$message.warning('This is a warning message!')" status="warning">Warning Message
      </a-button>
      <a-button @click="()=>this.$message.error('This is an error message!')" status="danger">Error Message</a-button>
    </a-space>
  </div>
  <div style="margin-top: 20px">
    <a-space>
      <a-button @click="()=>this.$message.normal('This is a normal message!')">Normal Message</a-button>
      <a-button @click="()=>this.$message.normal({
    content:'This is a normal message!',
    icon:renderIcon
    })">Normal Message With Icon
      </a-button>
      <a-button @click="()=>this.$message.loading('This is a loading message!')" status="primary">Loading Message
      </a-button>
    </a-space>
  </div>
</template>

<script>
import { h } from 'vue';
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

export default {
  setup() {
    const renderIcon = () => h(IconExclamationCircleFill);
    return {
      renderIcon
    }
  }
};
</script>
```
