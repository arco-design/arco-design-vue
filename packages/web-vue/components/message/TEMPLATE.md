## zh-CN
```yaml
meta:
  type: 组件
  category: 反馈
title: 全局提示 Message
description: 由用户的操作触发的轻量级全局反馈。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Feedback
title: Message
description: Lightweight global feedback triggered by user actions.
```
---

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/icon.md

@import ./__demo__/position.md

@import ./__demo__/closeable.md

@import ./__demo__/update.md

## zh-CN
### `Message` 全局方法

Message提供的全局方法，可以通过以下三种方法使用：
1. 通过this.$message调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$message调用
3. 导入Message，通过Message本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Message } from '@arco-design/web-vue';

const app = createApp(App);
Message._context = app._context;
```

---
## en-US
### `Message` Global methods

The global methods provided by Message can be used in the following three ways:
1. Called by this.$message
2. In the Composition API, call getCurrentInstance().appContext.config.globalProperties.$message
3. Import Message and call it through Message itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Message } from '@arco-design/web-vue';

const app = createApp(App);
Message._context = app._context;
````

---

%%INTERFACE(interface.ts)%%
