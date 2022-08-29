## zh-CN
```yaml
meta:
  type: 组件
  category: 反馈
title: 抽屉 Drawer
description: 触发命令后，从屏幕一侧滑出的抽屉式的面板。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Feedback
title: Drawer
description: A drawer-like panel that slides out from the side of the screen after the command is triggered.
```
---

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/custom.md

@import ./__demo__/nested.md

@import ./__demo__/popup-container.md

@import ./__demo__/function.md

## API

%%API(drawer.vue)%%

## zh-CN
### `<drawer>` 全局方法

Drawer 提供的全局方法，可以通过以下三种方法使用：

1. 通过 `this.$drawer` 调用
2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$drawer` 调用
3. 导入 Drawer，通过 Drawer 本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Drawer } from '@arco-design/web-vue';

const app = createApp(App);
Drawer._context = app._context;
```

---
## en-US
### `<drawer>` Global methods

The global methods provided by Drawer can be used in the following three ways:

1. Called by `this.$drawer`
2. In the Composition API, call through `getCurrentInstance().appContext.config.globalProperties.$drawer`
3. Import Drawer, call through Drawer itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Drawer } from '@arco-design/web-vue';

const app = createApp(App);
Drawer._context = app._context;
````

---

%%INTERFACE(interface.ts)%%
