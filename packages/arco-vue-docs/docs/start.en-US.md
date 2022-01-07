```yaml
meta:
  type: Developer Guide
title: Getting Started
description: Follow the steps below to quickly get started using the component library.
```

*Auto translate by google.*

## Vue Version

vue >= 3.2.0

**Note**: `Vue3` does not support IE browser environment, you can add `polyfill` if necessary.

## Install

```shell
# npm
npm install --save-dev @arco-design/web-vue
# yarn
yarn add --dev @arco-design/web-vue
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

## On-demand Import (template)

If you use the template method for development, you can use the [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) plug-in to enable on-demand import support.
The plug-in will automatically parse the components used in the template, and import the components and corresponding style files.
Requires component library `version >= 2.11.0`.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        ArcoResolver()
      ]
    })
  ]
});
```

Note: This method does not process the components manually imported by the user in the script, such as the Message component. The user still needs to manually import the style file corresponding to the component, such as `@arco-design/web-vue/es/message/style/css.js` .

## On-demand Import

You can also use manual import to load components on demand. The component library already supports Tree Shaking by default. It can be used with [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import) to automatically load component styles.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            // css
            return `@arco-design/web-vue/es/${name}/style/css.js`
            // less
            return `@arco-design/web-vue/es/${name}/style/index.js`
          },
        }
      ]
    })
  ]
})
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
