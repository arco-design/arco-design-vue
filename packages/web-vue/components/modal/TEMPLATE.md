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

%%API(modal.vue)%%

## zh-CN
### `<modal>` 全局方法

Modal提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$modal调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用
3. 导入Modal，通过Modal本身调用
---
## en-US
### `<modal>` Global methods

The global methods provided by Modal can be used in the following three ways:

1. Called by this.$modal
2. In the Composition API, call through getCurrentInstance().appContext.config.globalProperties.$modal
3. Import Modal, call through Modal itself
---

%%INTERFACE(interface.ts)%%
