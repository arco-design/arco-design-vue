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

### Import component library style files

If you want to customize the theme, you need to import less style files. The component library less style files can be found in `@arco-design/web-vue/dist/arco.less` or `@arco-design/web-vue/es/index.less`.
If you use the on-demand loading method to import components, make sure to enable the import of less style files in the on-demand loading plugin.

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

The theme package for the style configuration platform Vue is already available.

For specific usage, please refer to [Style Configuration Platform Documentation](https://arco.design/docs/designlab/guideline)
