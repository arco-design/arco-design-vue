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
        roles: ['admin'], // role
        hideInMenu: false, // Hide menu items
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const appRoute = computed(() => {
      return router
        .getRoutes()
        .find((el) => el.name === 'root') as RouteRecordNormalized;
    });
    ......
  },
});
```

- The route tree obtained in the previous step is used for permission filtering to generate the menu tree for rendering.

```tsx
const menuTree = computed(() => {
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));
  function travel(_routes: RouteRecordRaw[], layer: number) {
    if (!_routes) return null;
    const collector: any = _routes.map((element) => {
      // no access
      if (!permission.accessRouter(element)) {
        return null;
      }

      // leaf node
      if (!element.children) {
        return element;
      }

      // Associated child node
      const subItem = travel(element.children, layer);
      if (subItem.length) {
        element.children = subItem;
        return element;
      }
      // the else logic
      if (layer > 1) {
        element.children = subItem;
        return element;
      }
      return null;
    });
    return collector.filter(Boolean);
  }
  return travel(copyRouter, 0);
});
```

- Recursively generate menus by rendering the menu tree. (This example uses jsx syntax)

```tsx
const renderSubMenu = () => {
  function travel(_route: RouteRecordRaw[], nodes = []) {
    if (_route) {
      _route.forEach((element) => {
        // This is demo, modify nodes as needed
        const icon = element?.meta?.icon ? `<${element?.meta?.icon}/>` : ``;
        const subMenuItem = (
          <a-sub-menu
            key={element?.name}
            v-slots={{
              icon: () => h(compile(icon)),
              title: () => h(compile(t(element?.meta?.locale || ''))),
            }}
          >
            {element?.children?.map((elem) => {
              return (
                <a-menu-item key={elem.name} onClick={() => goto(elem)}>
                  {t(elem?.meta?.locale || '')}
                  {travel(elem.children ?? [])}
                </a-menu-item>
              );
            })}
          </a-sub-menu>
        );
        nodes.push(subMenuItem as never);
      });
    }
    return nodes;
  }
  return travel(menuTree.value); // recursion menuTree
};
return () => (
  <a-menu
    v-model:collapsed={collapsed.value}
    show-collapse-button
    auto-open={false}
    selected-keys={selectedKey.value}
    auto-open-selected={true}
    level-indent={34}
    style="height: 100%"
    onCollapse={setCollapse}
  >
    {renderSubMenu()}
  </a-menu>
);
```

## Steps to add a new menu item

After understanding the routing and menu generation, you can configure a new menu item. Take a new monitoring page as an example.

- Add a monitor folder in views/dashboard and add index.vue to it

 ```ts

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
+       roles: ['admin'],
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
