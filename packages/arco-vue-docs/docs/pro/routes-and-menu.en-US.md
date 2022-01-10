```yaml
meta:
  type: Arco Pro
title: Routes and menu
description: Route and menu generation
```

*Auto translate by google.*

The routing is usually tied to the menu. In order to reduce the amount of maintenance, we directly generate the menu through the routing table.

## Routing

First of all, you need to understand the routing table configuration

 ```ts
import {createRouter, createWebHistory} from'vue-router';

import Login from'./modules/login';
import PageLayout from'@/layout/page-layout.vue';
import appRoutes from'./modules';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    Login,
    {
      path:'/app',
      component: PageLayout,
      children: appRoutes,
    },
  ],
});
```

example

 ```ts
// In this example, the final path of the page is app/dashboard/workplace
export default {
  path:'dashboard',
  name:'dashboard', // route name
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale:'menu.dashboard', // First level menu name (language pack key name)
    requiresAuth: true, // Whether authentication is required
    icon:'icon-dashboard', // menu configuration icon
  },
  children: [
    {
      path:'workplace',
      name:'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale:'menu.dashboard.workplace', // secondary menu name (language pack key name)
        requiresAuth: true, // Whether authentication is required
      },
    },
  ],
};
```

## menu

The menu generation process can be found in the menu component:

- Get the routing tree with routing information through router.getRoutes().

 ```ts
// components/menu/index.vue
import {defineComponent} from'vue';
import {
  useRouter
} from'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const appRoute = router.getRoutes().find((el) => el.path ==='/app');
    return {
      appRoute,
    };
  },
});
```

- Generate a menu through the obtained routing tree.

PS: If you need to automatically generate a deep menu, you can use the jsx or render function to generate it through the configured routing tree.

```vue
  <a-menu>
    <a-sub-menu v-for="route in appRoute.children" :key="route.name">
      <template #title>
        <component :is="route.meta.icon" />
        {{ $t(route.meta.locale) }}
      </template>
      <a-menu-item
        v-for="_route in route.children"
        :key="_route.name"
      >
        {{ $t(_route.meta.locale) }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
```

## Steps to add a new menu item

After understanding the routing and menu generation, you can configure a new menu item. Take a new monitoring page as an example.

- Add a monitor folder in views/dashboard and add index.vue to it

 ```ts
// template template
// <template>
// <div>Monitoring page</div>
// </template>

import {defineComponent} from'vue';
export default defineComponent({})
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
+     },
+   },
  ],
};
```

- Added menu name in language pack

The following is the Chinese language pack, other language packs will not be repeated.

```diff
// src/local/zh-CN.ts
export default {
  'menu.dashboard':'Dashboard',
  'menu.dashboard.workplace':'Workbench',
+ 'menu.dashboard.monitor':'Real-time monitoring',
}
```

Above, the configuration of a menu item is completed. Now refresh the page to see the new menu item.
