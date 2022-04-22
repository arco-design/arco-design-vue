```yaml
meta:
  type: Component
  category: Common
title: ConfigProvider
description: Configure in the outermost layer of the application, set once, and take effect globally. Generally used to set functions such as internationalized languages.
```

*Auto translate by google.*

@import ./__demo__/basic.md

## API


### `<config-provider>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|is-global|Is global effect|`string`|`boolean`||
|prefix-cls|Component classname prefix|`string`|`'arco'`||
|locale|Configure language pack|`ArcoLang`|`-`||
|size|Size|`Size`|`-`|2.14.0|

When the `is-global` attribute is `true`, the component needs to be installed as a plugin for it to take effect. This is generally used to solve the problem that globalization does not take effect when called by importing Modal using Modal itself.

```ts
import { createApp } from 'vue'
import ArcoVue, { Modal, ConfigProvider } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
app.use(ConfigProvider) // or app.use(ArcoVue)
````
