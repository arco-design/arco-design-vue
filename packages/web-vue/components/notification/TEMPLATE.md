## zh-CN
```yaml
meta:
  type: 组件
  category: 反馈
title: 通知提醒框 Notification
description: 全局展示通知提醒，将信息及时有效的传达给用户。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Feedback
title: Notification
description: Globally display notification reminders to convey information to users in a timely and effective manner.
```
---

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/position.md

%%API(notification.vue)%%

## zh-CN
### `Notification` 全局方法

Notification提供的全局方法，可以通过以下三种方法使用：
1. 通过this.$notification调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$notification调用
3. 导入Notification，通过Notification本身调用
---
## en-US
### `Notification` Global methods

The global methods provided by Notification can be used in the following three ways:
1. Called by this.$notification
2. In the Composition API, call getCurrentInstance().appContext.config.globalProperties.$notification
3. Import Notification, call through Notification itself
---

%%INTERFACE(interface.ts)%%
