```yaml
meta:
  type: Arco Pro 最佳实践
title: 路由与菜单
description: 路由和菜单的生成
```

路由通常都和菜单绑定在一起，为了减少维护的量，我们直接通过路由表生成了菜单。

## 路由

首先，需要先了解一下路由表的配置。基本的路由配置请参阅 [Vue-Router](https://router.vuejs.org/) 官方文档

 ```ts
// 在本例子中，页面最终路径为 /dashboard/workplace
export default {
  path: 'dashboard',
  name: 'dashboard', // 路由名称
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: false,
      },
    },
  ],
};
```

路由 `Meta` 元信息


| 参数名	 | 说明 | 类型 | 默认值|
| ------------- | ------------- | -------------- | -------------- |
roles | 配置能访问该页面的角色，如果不匹配，则会被禁止访问该路由页面	 | string[]| - |
requiresAuth | 是否需要登录鉴权 | boolean| false |
icon | 菜单配置icon | string| - |
locale | 一级菜单名（语言包键名） | string| - |
hideInMenu | 是否在左侧菜单中隐藏该项 | boolean| - |
hideChildrenInMenu | 强制在左侧菜单中显示单项 | boolean| - |
activeMenu | 高亮设置的菜单项 | string| - |
order | 排序路由菜单项。如果设置该值，值越高，越靠前 | number| - |
noAffix | 如果设置为true，标签将不会添加到tab-bar中 | boolean| - |
ignoreCache | 如果设置为true页面将不会被缓存 | boolean| - |

## 菜单

前端菜单生成过程：

- 通过 [appRoute](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L10) 计算属性，得到带有路由信息的路由树。

- 使用上一步获取的路由信息进行权限过滤，生成用于渲染的 [菜单树](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L23)。

- 通过 [渲染](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/index.vue#L48) 菜单树，递归生成菜单。

服务端菜单生成过程：

- 在Store中增加api请求的 [action](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/store/modules/app/index.ts#L47)，用于获取服务端的路由配置。

- 发起请求，将服务端的路由配置结果存储在Store中。
  
- 通过 [appRoute](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L10) 计算属性，得到带有路由信息的路由树。

- 使用上一步获取的路由信息进行权限过滤，生成用于渲染的 [菜单树](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L23)。

- 通过 [渲染](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/index.vue#L48) 菜单树，递归生成菜单。

**说明：服务端菜单相对于本地菜单生成过程，仅仅是多了接口请求以及服务端路由配置信息存储的步骤。**
**个别公司可能会有相应的权限管理系统，以生成相应的服务端路由配置信息，并进行储存，以供前端进行接口调取。但总体大同小异，只要后端接口返回的路由配置信息，符合上述路由配置规范，并能被前端正确解析即可**

## 新增一个菜单项的步骤

了解完路由和菜单的生成，就可以上手配置一个新的菜单项了，以新增一个监控页面为例。

- 在 views/dashboard 中新增一个 monitor 文件夹，并在其中新增 index.vue

 ```ts
<script lang="ts" setup><script>
```

- 在路由表中新增监控页的路由配置

```diff
export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
      },
    },
+   {
+     path: 'monitor',
+     name: 'monitor',
+     component: () => import('@/views/dashboard/monitor/index.vue'),
+     meta: {
+       locale: 'menu.dashboard.monitor',
+       requiresAuth: true,
+       roles: ['admin'],
+     },
+   },
  ],
};
```

- 在语言包中新增菜单名

以下是中文语言包，其他语言包不赘述。

```diff
// src/locale/zh-CN.ts
export default {
  'menu.dashboard': '仪表盘',
  'menu.dashboard.workplace': '工作台',
+ 'menu.dashboard.monitor': '实时监控',
}
```

以上，就完成了一个菜单项的配置。现在刷新一下页面，就能看到新的菜单项。




