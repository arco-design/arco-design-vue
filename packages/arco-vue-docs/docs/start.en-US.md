```yaml
meta:
  type: Development Guide
title: Started quickly
description: Follow the steps below to quickly get started using the component library.
```

*Auto translate by google.*

## Vue Version

vue >= 3.1.0

**Note**: `Vue3` does not support IE browser environment, you can add `polyfill` if necessary.

## Install

```shell
npm i @arco-design/web-vue
```

## Full import

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```

## Global configuration
When ArcoVue is introduced, a global configuration object can be passed in.

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue, {
  // Used to change the prefix name when using components
  componentPrefix: 'arco'
});
app.mount('#app');
```
