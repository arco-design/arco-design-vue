```yaml
meta:
  type: Developer Guide
title: Custom theme
description: ArcoVue provides a set of blue themes (ArcoBlue), users can customize new themes according to their own needs to meet the diverse needs of business and brand.
```

*Auto translate by google.*

ArcoDesign defines a set of default particle variables, and the theme can be customized by modifying and covering the particle variables.

## Less variable substitution

ArcoDesign uses [Less](http://lesscss.org/ "_blank") as a pre-compiled language. Through the **modifyVars** function of Less, you can easily customize the style particle variables.

Global variables can be found in `global.less (@arco-design/web-vue/es/style/theme/global.less)`.

In the component library, we have made a very detailed extraction of component style variables, which can meet the fine-grained customization of components. For example, the style variable `token.less (@arco-design/web-vue/es/button/style/token.less)` list corresponding to the `Button` component.

### Vite Configuration
Vite itself supports [Less syntax](https://vitejs.dev/guide/features.html#css-pre-processors "_blank"), users only need to pass in the Less configuration in the configuration file:

```diff
// vite.config.js
export default {
  css: {
+   preprocessorOptions: {
+     less: {
+       modifyVars: {
+         'arcoblue-6': '#f85959',
+       },
+       javascriptEnabled: true,
+     }
+   }
  },
  ...
}
```

### Webpack Configuration
When Webpack is packaged, through modifyVars of [less-loader](https://github.com/webpack-contrib/less-loader), all variables can be replaced:

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       lessOptions: {
+         modifyVars: {
+           'arcoblue-6': '#f85959',
+         },
+         javascriptEnabled: true,
+       },
+     },
    }],
    ...
  }],
  ...
}
```

## Design System Lab theme package usage

Design System Lab Vue's theme package function is under development and will be available for use after completion.

At present, you can temporarily use the less file of React's theme package to customize the theme of Vue, and there may be some problems that the style does not take effect.

### Usage

`less` needs the support of the compiler tool, please enable support for `less` according to the tool used.

Check the original `index.less` file in the theme package, located at `node_modules/{theme-package}/index.less`. as follows:

```less
@import "../../@arco-design/web-react/dist/css/index.less";

@import "./theme.less";

@import "./variables.less";

@import "./component.less";
```

Create a new `theme.less` file in the project, and replace the React style file with the Vue style file according to the content in the theme package. Please adjust the file path according to the actual project.

```less
@import "../node_modules/@arco-design/web-vue/es/index.less";

@import "../node_modules/{theme-package}/theme.less";

@import "../node_modules/{theme-package}/variables.less";

@import "../node_modules/{theme-package}/component.less";
```

Then import this `theme.less` file separately in `main.ts` to introduce theme styles

```ts
import {createApp} from'vue'
import App from'./App.vue'
import ArcoVue from'@arco-design/web-vue';
import'./theme.less';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app')
```
