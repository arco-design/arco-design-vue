```yaml
meta:
  type: 开发指南
title: 快速上手
description: 跟随以下的步骤，快速上手组件库的使用。
```

## Vue 版本

vue >= 3.2.0

**注意**： `Vue3` 不支持IE浏览器环境，如果需要可以增加 `polyfill`。

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

如果使用模板方式进行开发，可以使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件来开启按需加载的支持。
插件会自动解析模板中的使用到的组件，并导入组件和对应的样式文件。
需要组件库 `version >= 2.11.0`。

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

注意：这种方法并不会处理用户在 script 中手动导入的组件，比如 Message 组件，用户仍需要手动导入组件对应的样式文件，例如 `@arco-design/web-vue/es/message/style/css.js`。

## 按需加载

也可以使用手动导入的方式按需加载组件，组件库已经默认支持 Tree Shaking。可以配合 [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import) 插件自动加载组件样式。

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
