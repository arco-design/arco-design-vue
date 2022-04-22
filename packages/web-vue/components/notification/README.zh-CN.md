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

## API





### `Notification` 全局方法

Notification提供的全局方法，可以通过以下三种方法使用：
1. 通过this.$notification调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$notification调用
3. 导入Notification，通过Notification本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Notification } from '@arco-design/web-vue';

const app = createApp(App);
Notification._context = app._context;
```


### NotificationMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|info|显示信息提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|success|显示成功提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|warning|显示警告提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|error|显示错误提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|clear|清除全部提醒框|`(position?: NotificationPosition) => void`|`-`|



### NotificationConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|content|内容|`RenderContent`|`-`||
|title|标题|`RenderContent`|`-`||
|icon|图标|`RenderFunction`|`-`||
|id|唯一id|`string`|`-`||
|position|位置|`'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight'`|`-`||
|showIcon|是否显示图标|`boolean`|`false`||
|closable|是否可关闭|`boolean`|`false`||
|duration|显示的持续时间|`number`|`-`||
|footer|底部内容|`RenderFunction`|`-`|2.25.0|
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`||



### NotificationReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前通知提醒框|`() => void`|`-`|


