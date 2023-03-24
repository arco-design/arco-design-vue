```yaml
meta:
  type: 开发指南
title: 快速上手
description: 跟随以下的步骤，快速上手组件库的使用。
```

## Vue 版本

vue >= 3.2.0

**注意**：由于 `Vue3` 不再支持 IE 浏览器环境，ArcoVue 也不再支持 IE 浏览器环境。

## 安装

```shell
# npm
npm install --save-dev @arco-design/web-vue
# yarn
yarn add --dev @arco-design/web-vue
```

## 完整引入

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```

## 按需加载（模板）

如果使用模板方式进行开发，可以使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 这两款插件来开启按需加载及自动导入的支持。
插件会自动解析模板中的使用到的组件，并导入组件和对应的样式文件。
需要组件库 `version >= 2.11.0`。

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

注意：这种方法并不会处理用户在 script 中手动导入的组件，比如 Message 组件，用户仍需要手动导入组件对应的样式文件，例如 `@arco-design/web-vue/es/message/style/css.js`。

## 按需加载

也可以使用手动导入的方式按需加载组件，组件库已经默认支持 Tree Shaking。可以配合 [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import) 插件自动加载组件样式。

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

## 全局配置
在引入 ArcoVue 时，可以传入一个全局配置对象。

```ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: 'arco'
});
app.mount('#app');
```

## 导入组件
组件库在 `2.44.3` 版本为了兼容 nuxt3 环境，增加 `exports` 配置。这个配置会对组件库的导入产生一定影响，使用中建议从 `@arco-design/web-vue` 和 `@arco-design/web-vue/es/icon` 导入组件库和图标。


## 浏览器兼容性

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ≥ 79                                                                                                                                                                                                                          | ≥ 78                                                                                                                                                                                                                                | ≥ 64                                                                                                                                                                                                                              | ≥ 12                                                                                                                                                                                                                              | ≥ 53                                                                                                                                                                                                                            |
