```yaml
meta:
  type: Component
  category: Feedback
title: Message
description: Lightweight global feedback triggered by user actions.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/icon.md

@import ./__demo__/position.md

@import ./__demo__/closeable.md

@import ./__demo__/update.md

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


### MessageMethod

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|info|Show info message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|success|Show success message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|warning|Show warning message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|error|Show error message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|loading|Show loading message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|normal|Show message|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`|2.41.0|
|clear|Clear all messages|`(position?: MessagePosition) => void`|`-`||



### MessageConfig

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|content|Content|`RenderContent`|`-`||
|id|Unique id|`string`|`-`||
|icon|Message icon|`RenderFunction`|`-`||
|position|Location of the message|`'top'\|'bottom'`|`-`||
|showIcon|Whether to show icon|`boolean`|`false`||
|closable|Whether to show the close button|`boolean`|`false`||
|duration|The duration of the message display|`number`|`-`||
|onClose|Callback function when closing|`(id: number \| string) => void`|`-`||
|resetOnHover|The mouse to move into the component will not automatically close|`boolean`|`false`|2.39.0|



### MessageReturn

|Name|Description|Type|Default|
|---|---|---|:---:|
|close|Close current message|`() => void`|`-`|


