```yaml
meta:
  type: 组件
  category: 反馈
title: 全局提示 Message
description: 由用户的操作触发的轻量级全局反馈。
```

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/icon.md

@import ./__demo__/position.md

@import ./__demo__/closeable.md

@import ./__demo__/update.md

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


### MessageMethod

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|info|显示信息提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|success|显示成功提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|warning|显示警告提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|error|显示错误提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|loading|显示加载中提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|normal|显示提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`|2.41.0|
|clear|清空全部提示|`(position?: MessagePosition) => void`|`-`||



### MessageConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|content|内容|`RenderContent`|`-`||
|id|唯一id|`string`|`-`||
|icon|消息的图标|`RenderFunction`|`-`||
|position|消息的位置|`'top'\|'bottom'`|`-`||
|showIcon|是否显示图标|`boolean`|`false`||
|closable|是否显示关闭按钮|`boolean`|`false`||
|duration|消息显示的持续时间|`number`|`-`||
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`||
|resetOnHover|设置鼠标移入后不会自动关闭|`boolean`|`false`|2.39.0|



### MessageReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前消息|`() => void`|`-`|


