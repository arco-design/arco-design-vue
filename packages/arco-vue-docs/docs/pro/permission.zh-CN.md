```yaml
meta:
  type: Arco Pro 最佳实践
title: 权限控制
description: 权限控制是中后台场景非常常见的基础功能，在 v2.2.0 将权限控制功能集成至 Arco Design Pro
```

## 适用场景

中后台常见的前端权限控制大概可概括为以下场景：

1. 菜单权限控制，针对**某个菜单/页面**进行权限管理，有则能看到此页面，否则将展示无权限。

[//]: # (![]&#40;http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/116622141d7b228ad2259c81cd32d095.gif~tplv-uwbnlip3yd-3.awebp&#41;)

2. **针对某页面中的某触发器**进行权限管理，例如对列表页的某一条数据进行删除操作。有权限情况下则展示删除按钮。

[//]: # (![]&#40;http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7b410fa5dad6e47665c264fae910c0c8.gif~tplv-uwbnlip3yd-3.awebp&#41;)


## 使用

### 菜单权限管理

针对菜单及路由权限控制，可以在 路由配置项 中，对某项增加 `roles` 参数即可。（如果不加，默认为拥有权限）

`roles` 可以根据自己的业务进行定义。

```ts
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
        roles: ['*'], // * 表示通配权限。提示：为了少写点代码，也可以不定义这个字段。
      },
    },
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
```

### 某按钮权限管理

Arco Design Pro 封装了 `v-permission` 指令。可在组件或者原生元素上使用。
如下，将有权限的角色类型放置在数组中即可。

```vue
<button v-permission="['admin']">删除</button>

<a-button v-permission="['user']">删除</a-button>
```

以上是前端页面进行权限控制的具体使用方法，但是需要结合后端接口将用户所拥有的具体权限返回至前端。

同时，在中后台系统中，仅仅有简单的前端权限控制是远远不够的，还需要后端进行接口权限控制。特别是涉及到写操作的一些接口，需要严格把控权限。

## 实现

### 路由权限管理

Pro提供对应的权限管理钩子。可以自定义业务的权限需求。

```ts
#src/hooks/permission.ts

import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) { // 判断当前用户是否有该路由的权限
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.role)
      );
    },
    // You can add any rules you want
  };
}
```

设置路由守卫，在路由守卫中对用户的页面进出进行管理。例如 当前用户是否已经登录、当前用户是否有页面权限。

``` ts
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  async function crossroads() {
    const Permission = usePermission();
    if (Permission.accessRouter(to)) await next();
    else {
      const destination = Permission.findFirstPermissionRoute(
        appRoutes,
        userStore.role
      ) || {
        name: 'notFound',
      }; // 前往首个有权限的页面或者404。
      await next(destination);
    }
  }
  if (isLogin()) { // 判读用户是否登录
    if (userStore.role) { // 有角色信息表示当前用户已经登录且获取过用户信息
      crossroads();
    } else {
      try {
        await userStore.info(); // 获取用户角色信息后再进行后续跳转处理
        crossroads();
      } catch (error) {
        next({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        });
      }
    }
  } else {
    // 如果未登录则重定向到登录页面
    if (to.name === 'login') {
      next();
      return;
    }
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    });
  }
});
```

自定义权限指令

```ts
import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  const { role } = userStore;

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value;
      // 对当前用户的角色权限和传入指令的权限类型进行比对。如果当前用户无权限则会执行节点删除操作。
      const hasPermission = permissionValues.includes(role);
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','user']"`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
```




