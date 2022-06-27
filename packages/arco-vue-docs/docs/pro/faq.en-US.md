```yaml
meta:
  type: Arco Pro
title: FAQ
description: Arco Design Pro Vue FAQ Collection
```

*Auto translate by google.*

## Initialization

### 1. Initialization of arco-cli failed

![](http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/iShot_2022-05-26_16.12.14.png~tplv-49unhts6dw-image.image)

If the dependency installation fails, go to the directory of the initialization project and execute the npm install or yarn install installation operation again.

## Development

### 1. How to set highlight for menu items?
See [Routes and menu](/vue/docs/pro/routes-and-menu) for details

### 2.Menu hides children
See [Routes and menu](/vue/docs/pro/routes-and-menu) for details

### 3.Configure first-level menu items

Due to the architecture, configuring a single first-level menu item requires the cooperation of multiple menu configuration items. See [#85]([/vue/docs/pro/routes-and-menu](https://github.com/arco-design/arco-design-pro-vue/issues/85#issuecomment-1142289501)) for details 

### 4.Using jsx in Vue3

详见 [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)

### 5.Cross-domain proxy
See [vite configuration](https://cn.vitejs.dev/config/#server-open) for details

### 6.Code cannot be pushed

Because of the use of [husky](https://github.com/typicode/husky), the hook [normalizes](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0) the uploaded commit information check.

Please follow the documentation for git commit information normalization.

If you do not need this function, you can delete husky related files and corresponding scripts. (**Not recommended**)

## Build

### 1. Rollup failed to resolve import "XXXXXX/node_modules/@arco-design/web-vue/es/xxx-xxx/style/css.js”

The error comes from loading the build plugin (config/plugin/styleImport.ts) on demand. There are several reasons for this problem.

- The new version of the component library has added components.

- The component itself is missing and not added.

- The unplugin-vue-components dependency library version is too low.

Solution please [move](https://github.com/arco-design/arco-design-pro-vue/issues/71).

### 2. Executing build TS type error

![](http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/iShot_2022-05-26_17.36.59.png~tplv-49unhts6dw-image.image)

Reason for error:

- There is a problem with the spelling itself.

- The new version of the component library has made changes to the type declaration.

Solution:

- Follow the type hints to make changes.

- Turn off vue-tsc checks. (**Not recommended**)

```ts
// package.json

  "build": "vue-tsc --noEmit && vite build --config ./config/vite.config.prod.ts"  // before fixing

  "build": "vite build --config ./config/vite.config.prod.ts" // 修改后
```

### 3. Vue-tsc builds slowly

- Reinstall vue-tsc to the latest version.

```shell
# npm
npm install vue-tsc@latest
# yarn
yarn add vue-tsc@latest
```

- Turn off vue-tsc checks. (**Not recommended**)



### 4. Preview the packaged project

```shell
# npm
npm run preview
# yarn
yarn preview
```
**PS: The preview command will execute the build operation first in Pro.**

## Deployment

### 1. After the page is deployed successfully, refresh the 404 page

[Moving to Vue Router](https://router.vuejs.org/guide/essentials/history-mode.html)

## Other

### 1. Can the developed projects be upgraded to the latest version?

Arco Pro, as a project template, does not have the ability to smoothly upgrade to the latest version.

If you need a new version capability, you can initialize a project and copy your business code into it, and then make the corresponding changes.
