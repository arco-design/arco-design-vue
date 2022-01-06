```yaml
meta:
  type: Arco Pro 最佳实践
title: 路由与菜单
description: 路由和菜单的生成
```

路由通常都和菜单绑定在一起，为了减少维护的量，我们直接通过路由表生成了菜单。

## 路由

首先，需要先了解一下路由表的配置

```js
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

```js
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
      },
    },
  ],
};
```

## 菜单

菜单组件中可以找到菜单生成过程：

- 通过 router.getRoutes()，得到带有路由信息的路由树。

```js
// components/menu/index.vue
import { defineComponent } from 'vue';
import {
  useRouter
} from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const appRoute = router.getRoutes().find((el) => el.path === '/app');
    return {
      appRoute,
    };
  },
});
```

- 通过获取的路由树，生成菜单。

PS: 如果需要自动生成深层菜单，可以通过配置后的路由树，使用jsx或者render函数进行生成。

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

## 新增一个菜单项的步骤

了解完路由和菜单的生成，就可以上手配置一个新的菜单项了，以新增一个监控页面为例。

- 在 views/dashboard 中新增一个 monitor 文件夹，并在其中新增 index.vue

```js
// 模板template
// <template>
//  <div>监控页</div>
// </template>

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




