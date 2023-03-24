```yaml
meta:
  type: Developer Guide
title: Getting Started
description: Follow the steps below to quickly get started using the component library.
```

*Auto translate by google.*

## Vue Version

vue >= 3.2.0

**Note**: `Vue3` does not support IE browser environment, so ArcoVue does not support IE browser environment.

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

If you use the template method for development, you can use the [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) plugin to enable on-demand import and automatic import support.
The plug-in will automatically parse the components used in the template, and import the components and corresponding style files.
Requires component library `version >= 2.11.0`.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
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
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
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

## import component
In order to be compatible with the nuxt3 environment in the `2.44.3` version of the component library, the `exports` configuration is added. This configuration will have a certain impact on the import of component libraries. It is recommended to import component libraries and icons from `@arco-design/web-vue` and `@arco-design/web-vue/es/icon`.


## Supported platforms

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ≥ 79                                                                                                                                                                                                                          | ≥ 78                                                                                                                                                                                                                                | ≥ 64                                                                                                                                                                                                                              | ≥ 12                                                                                                                                                                                                                              | ≥ 53                                                                                                                                                                                                                            |
