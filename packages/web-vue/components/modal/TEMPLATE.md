## zh-CN
```yaml
meta:
  type: 组件
  category: 反馈
title: Modal 对话框
description: 在当前页面打开一个浮层，承载相关操作。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Feedback
title: Modal
description: Open a floating layer on the current page to carry related operations.
```
---

@import ./__demo__/basic.md

@import ./__demo__/async.md

@import ./__demo__/function.md

@import ./__demo__/notice.md

@import ./__demo__/width.md

@import ./__demo__/custom.md

@import ./__demo__/form.md

@import ./__demo__/draggable.md

@import ./__demo__/fullscreen.md

## API

%%API(modal.vue)%%

## zh-CN
### `<modal>` 全局方法

Modal提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$modal调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用
3. 导入Modal，通过Modal本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Modal } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
```

---
## en-US
### `<modal>` Global methods

The global methods provided by Modal can be used in the following three ways:

1. Called by this.$modal
2. In the Composition API, call through getCurrentInstance().appContext.config.globalProperties.$modal
3. Import Modal, call through Modal itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Modal } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
````

---

%%INTERFACE(interface.ts)%%
