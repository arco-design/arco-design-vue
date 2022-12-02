```yaml
meta:
  type: Arco Pro
title: Routes and menu
description: Route and menu generation
```

*Auto translate by google.*

The routing is usually tied to the menu. In order to reduce the amount of maintenance, we directly generate the menu through the routing table.

## Router

First, you need to understand the configuration of the routing table. For basic routing configuration, please refer to the official documentation of [Vue-Router](https://router.vuejs.org/)

 ```ts
// In this example, the final path to the page is /dashboard/workplace
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
        roles: ['admin'],
        hideInMenu: false,
      },
    },
  ],
};
```

Route `Meta` meta information

| Key	 | Description | Type | default|
| ------------- | ------------- | -------------- | -------------- |
roles | Configure the role that can access the page. If it does not match, it will be forbidden to access the routing page	 | string[]| - |
requiresAuth | Whether login authentication is required | boolean| false |
icon | Menu configuration icon | string| - |
locale | First-level menu name (language pack key name) | string| - |
hideInMenu | Whether to hide this item in the left menu | boolean| - |
hideChildrenInMenu | Force single item to be displayed in left menu | boolean| - |
activeMenu | If set name, the menu will be highlighted according to the name you set | string| - |
order | Sort routing menu items. If this value is set, the higher the value, the higher the front. | number| - |
noAffix | If set to true, the tabs will not be added to the tab-bar. | boolean| - |
ignoreCache | If set to true the page will not be cached | boolean| - |

## Menu

Front-end menu generation process:

- Through the computed property of [appRoute](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L10), a routing tree with routing information is obtained.

- Use the routing information obtained in the previous step to filter permissions to generate a menu [tree for rendering](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L23).

- Recursively generate menus by [rendering]((https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/index.vue#L48)) the menu tree.

Server menu generation process:

- Add the [action](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/store/modules/app/index.ts#L47) of the api request to the Store to obtain the routing configuration of the server.
  
- Add the action of the api request to the Store to obtain the routing configuration of the server.

- Through the computed property of [appRoute](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L10), a routing tree with routing information is obtained.

- Use the routing information obtained in the previous step to filter permissions to generate a menu [tree for rendering](https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/useMenuTree.ts#L23).

- Recursively generate menus by [rendering]((https://github.com/arco-design/arco-design-pro-vue/blob/23a21ceb939e1e2334e8c3b0f1f8a8049503ad9d/arco-design-pro-vite/src/components/menu/index.vue#L48)) the menu tree.

**Note: Compared with the local menu generation process, the server menu only has more interface requests and server routing configuration information storage steps.**
**Individual companies may have corresponding authority management systems to generate corresponding server-side routing configuration information and store them for front-end interface retrieval. However, the overall situation is similar, as long as the routing configuration information returned by the back-end interface conforms to the above routing configuration specifications and can be correctly parsed by the front-end**

## Steps to add a new menu item

After understanding the routing and menu generation, you can configure a new menu item. Take a new monitoring page as an example.

- Add a monitor folder in views/dashboard and add index.vue to it

 ```ts
<script lang="ts" setup><script>
```

- Add the routing configuration of the monitoring page in the routing table

```diff
export default {
  path:'dashboard',
  name:'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale:'menu.dashboard',
    requiresAuth: true,
    icon:'icon-dashboard',
  },
  children: [
    {
      path:'workplace',
      name:'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale:'menu.dashboard.workplace',
        requiresAuth: true,
      },
    },
+   {
+     path:'monitor',
+     name:'monitor',
+     component: () => import('@/views/dashboard/monitor/index.vue'),
+     meta: {
+       locale:'menu.dashboard.monitor',
+       requiresAuth: true,
+       roles: ['admin'],
+     },
+   },
  ],
};
```

- Added menu name in language pack

The following is the Chinese language pack, other language packs will not be repeated.

```diff
// src/locale/zh-CN.ts
export default {
  'menu.dashboard':'Dashboard',
  'menu.dashboard.workplace':'Workbench',
+ 'menu.dashboard.monitor':'Real-time monitoring',
}
```

Above, the configuration of a menu item is completed. Now refresh the page to see the new menu item.