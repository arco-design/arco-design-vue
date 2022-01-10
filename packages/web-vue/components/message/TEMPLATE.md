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
---
## en-US
### `Message` Global methods

The global methods provided by Message can be used in the following three ways:
1. Called by this.$message
2. In the Composition API, call getCurrentInstance().appContext.config.globalProperties.$message
3. Import Message and call it through Message itself
---

%%INTERFACE(interface.ts)%%
