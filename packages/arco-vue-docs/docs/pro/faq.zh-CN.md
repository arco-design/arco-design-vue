```yaml
meta:
  type: Arco Pro 最佳实践
title: 常见问题
description: Arco Design Pro Vue 常见问题合集
```

## 初始化

### 一、arco-cli初始化失败

![](http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/iShot_2022-05-26_16.12.14.png~tplv-49unhts6dw-image.image)

依赖安装失败的问题，进入到初始化项目的目录，重新执行执行npm install 或 yarn install安装操作即可。

## 开发相关

### 一、菜单项如何设置高亮？
详见 [路由和菜单](/vue/docs/pro/routes-and-menu)

### 二、菜单隐藏子项
详见 [路由和菜单](/vue/docs/pro/routes-and-menu)

### 三、配置一级菜单项

因为架构缘故，配置单独的一级菜单项，需要多个菜单配置项进行配合。详见 [#85]([/vue/docs/pro/routes-and-menu](https://github.com/arco-design/arco-design-pro-vue/issues/85#issuecomment-1142289501))

### 四、Vue3 中使用 jsx 写法

详见 [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)

### 五、跨域代理
详见 [vite配置](https://cn.vitejs.dev/config/#server-open)

### 六、代码无法提交

因为使用了 [husky](https://github.com/typicode/husky) 的缘故，钩子对上传的commit信息进行[规范化](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)校验。

请按照文档进行git commit信息规范化。

如果不需要该功能，可以删除掉husky相关文件和对应脚本。（**不推荐**）


## 构建相关

### 一. Rollup failed to resolve import "XXXXXX/node_modules/@arco-design/web-vue/es/xxx-xxx/style/css.js”

报错源于按需加载构建插件(config/plugin/styleImport.ts)，该问题产生分别有以下几个原因 

- 新版组件库新增了组件。

- 组件本身遗漏未进行添加。

- unplugin-vue-components 依赖库版本过低。

解决方法请 [移步](https://github.com/arco-design/arco-design-pro-vue/issues/71)。

### 二、执行构建TS类型报错

![](http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/iShot_2022-05-26_17.36.59.png~tplv-49unhts6dw-image.image)

报错原因：

- 写法本身存在问题。

- 新版组件库对类型声明进行了变更修改。

解决方法：

- 按照类型提示进行修改。

- 关闭vue-tsc检查。(**不推荐**)

```ts
// package.json

  "build": "vue-tsc --noEmit && vite build --config ./config/vite.config.prod.ts"  // 修改前

  "build": "vite build --config ./config/vite.config.prod.ts" // 修改后
```

### 三、vue-tsc构建缓慢

- 重新安装vue-tsc至最新版本。

```shell
# npm
npm install vue-tsc@latest
# yarn
yarn add vue-tsc@latest
```

- 关闭vue-tsc检查。(**不推荐**)


### 四、预览打包项目

```shell
# npm
npm run preview
# yarn
yarn preview
```
**PS: 该预览命令在Pro中会先执行build操作。**

## 部署相关

### 一、页面部署成功后刷新出现404页面

[移步 Vue Router](https://router.vuejs.org/guide/essentials/history-mode.html)

## 其它

### 一、已经开发的项目是否能够升级到最新版？

Arco Pro作为一个项目模板，不具备平滑升级过渡到最新版本的能力。

如需新版本能力，可以初始化一个项目后将自己的业务代码拷贝进去，在进行相应的更改即可。
