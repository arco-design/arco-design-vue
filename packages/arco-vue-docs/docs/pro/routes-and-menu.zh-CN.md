```yaml
meta:
  type: Arco Pro 最佳实践
title: 路由与菜单
description: 路由和菜单的生成
```

路由通常都和菜单绑定在一起，为了减少维护的量，我们直接通过路由表生成了菜单。

## 路由

首先，需要先了解一下路由表的配置

 ```ts
import { createRouter, createWebHistory } from 'vue-router';

import Login from './modules/login';
import PageLayout from '@/layout/page-layout.vue';
import appRoutes from './modules';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    Login,
    {
      path: '/app',
      component: PageLayout,
      children: appRoutes,
    },
  ],
});
```

示例

 ```ts
// 在本例子中，页面最终路径为 app/dashboard/workplace
export default {
  path: 'dashboard',
  name: 'dashboard', // 路由名称
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: 'menu.dashboard', // 一级菜单名（语言包键名）
    requiresAuth: true, // 是否需要鉴权
    icon: 'icon-dashboard', // 菜单配置icon
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace', // 二级菜单名（语言包键名）
        requiresAuth: true, // 是否需要鉴权
        roles: ['admin'], // 权限角色
        hideInMenu: false, // 是否隐藏菜单项
      },
    },
  ],
};
```

## 菜单

菜单组件中可以找到菜单生成过程：

- 通过 router.getRoutes()，得到带有路由信息的路由树。

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

- 使用上一步获取的业务路由树进行权限过滤，生成用于渲染的菜单树。

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

- 通过渲染菜单树，递归生成菜单。(本例子使用jsx语法)

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
  return travel(menuTree.value); // 递归menuTree
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

## 新增一个菜单项的步骤

了解完路由和菜单的生成，就可以上手配置一个新的菜单项了，以新增一个监控页面为例。

- 在 views/dashboard 中新增一个 monitor 文件夹，并在其中新增 index.vue

 ```ts
import { defineComponent } from 'vue';
export default defineComponent({})
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
// src/local/zh-CN.ts
export default {
  'menu.dashboard': '仪表盘',
  'menu.dashboard.workplace': '工作台',
+ 'menu.dashboard.monitor': '实时监控',
}
```

以上，就完成了一个菜单项的配置。现在刷新一下页面，就能看到新的菜单项。




