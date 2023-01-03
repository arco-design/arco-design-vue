```yaml
title:
  zh-CN: 基础使用
  en-US: Basic Usage
```

## zh-CN

Arco图标是一个独立的库，需要额外引入并注册使用。

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');
```

注册后可以通过 `<icon-xx />` 的形式即可使用Icon。
图标使用 `<svg/>` 方式渲染，可以直接设置 `style`, `class` 以及 `<svg/>` 属性。

### `<icon-xx>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|strokeWidth|线宽|`number`|`4`|
|strokeLinecap|端点类型|`'butt' \| 'round' \| 'square'`|`'butt'`|
|strokeLinejoin|拐角类型|`'arcs' \| 'bevel' \| 'miter' \| 'miter-clip' \| 'round'`|`'miter'`|
|rotate|旋转角度|`number`|`-`|
|spin|是否旋转|`boolean`|`false`|
|size|尺寸|`number` \| `string`|`-`|

---

## en-US

The Arco icon is an independent library and needs to be introduced and registered for use.

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
// import additional icon library
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');
```

After registration, you can use the Icon in the form of `<icon-xx />`.
Icon use `<svg/>` render，can settings `style`, `class` and `<svg/>` attributes.

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|strokeWidth|Stroke width|`number`|`4`|
|strokeLinecap|Stroke linecap|`'butt' \| 'round' \| 'square'`|`'butt'`|
|strokeLinejoin|Stroke linejoin|`'arcs' \| 'bevel' \| 'miter' \| 'miter-clip' \| 'round'`|`'miter'`|
|rotate|Rotate angle|`number`|`-`|
|spin|Whether to spin|`boolean`|`false`|
|size|Size|`number` \| `string`|`-`|

---

```vue
<template>
  <a-space size="large">
    <icon-check-circle :style="{fontSize:'32px'}" />
    <icon-check-circle :style="{fontSize:'32px'}" :stroke-width="2" />
    <icon-check-circle :style="{fontSize:'32px'}" stroke-linecap="round" />
    <icon-check-circle :style="{fontSize:'32px'}" stroke-linejoin="arcs" />
  </a-space>
</template>
```
