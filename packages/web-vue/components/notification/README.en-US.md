```yaml
meta:
  type: Component
  category: Feedback
title: Notification
description: Globally display notification reminders to convey information to users in a timely and effective manner.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/position.md

@import ./__demo__/update_notification.md

@import ./__demo__/update_duration.md

@import ./__demo__/btn.md

@import ./__demo__/custom-close.md

@import ./__demo__/style.md

## API





### `Notification` Global methods

The global methods provided by `Notification` can be used in the following three ways:
1. Called by `this.$notification`
2. In the Composition API, call `getCurrentInstance().appContext.config.globalProperties.$notification`
3. Import `Notification`, call through `Notification` itself

When used by import, the component has no way to obtain the current Vue Context. Content injected into the AppContext such as i18n or route cannot be used internally. You need to manually pass in the AppContext when calling, or specify the AppContext globally for the component.

```ts
import { createApp } from 'vue'
import { Notification } from '@arco-design/web-vue';

const app = createApp(App);
Notification._context = app._context;
````


### NotificationMethod

|Name|Description|Type|Default|
|---|---|---|:---:|
|info|Show info notification|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|success|Show success notification|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|warning|Show warning notification|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|error|Show error notification|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|remove|remove the notification for the corresponding `id`|`(id: string) => void`|`-`|
|clear|Clear all notifications|`(position?: NotificationPosition) => void`|`-`|



### NotificationConfig

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|content|Content|`RenderContent`|`-`||
|title|Title|`RenderContent`|`-`||
|icon|Icon|`RenderFunction`|`-`||
|id|Unique id|`string`|`-`||
|style|Style|`CSSProperties`|`-`||
|class|Style class name|`ClassName`|`-`||
|position|Position|`'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight'`|`-`||
|showIcon|Whether to show icon|`boolean`|`true`||
|closable|Whether it can be closed|`boolean`|`false`||
|duration|Display duration, the unit is `ms`|`number`|`3000`||
|footer|Footer Content|`RenderFunction`|`-`|2.25.0|
|closeIcon|Close button icon|`RenderFunction`|`-`||
|closeIconElement|Close button element|`RenderFunction`|`-`||
|onClose|Callback function when closing|`(id: number \| string) => void`|`-`||



### NotificationReturn

|Name|Description|Type|Default|
|---|---|---|:---:|
|close|Close the current notification|`() => void`|`-`|


