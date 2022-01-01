```yaml
meta:
  type: 组件
  category: 反馈
title: 通知提醒框 Notification
description: 全局展示通知提醒，将信息及时有效的传达给用户。
```

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/position.md





### `Notification` 全局方法

Notification提供的全局方法，可以通过以下三种方法使用：
1. 通过this.$notification调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$notification调用
3. 导入Notification，通过Notification本身调用


### NotificationMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|info|显示信息提醒框|`(config: string \| NotificationConfig) => NotificationReturn`|`-`|
|success|显示成功提醒框|`(config: string \| NotificationConfig) => NotificationReturn`|`-`|
|warning|显示警告提醒框|`(config: string \| NotificationConfig) => NotificationReturn`|`-`|
|error|显示错误提醒框|`(config: string \| NotificationConfig) => NotificationReturn`|`-`|
|clear|清除全部提醒框|`(position?: NotificationPosition) => void`|`-`|



### NotificationConfig

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|content|内容|`RenderContent`|`-`|
|title|标题|`RenderContent`|`-`|
|icon|图标|`RenderFunction`|`-`|
|id|唯一id|`string`|`-`|
|position|位置|`'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight'`|`-`|
|showIcon|是否显示图标|`boolean`|`false`|
|closable|是否可关闭|`boolean`|`false`|
|duration|显示的持续时间|`number`|`-`|
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`|



### NotificationReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前通知提醒框|`() => void`|`-`|


