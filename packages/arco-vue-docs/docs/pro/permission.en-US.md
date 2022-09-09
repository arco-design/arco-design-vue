```yaml
meta:
  type: Arco Pro
title: Permission control
description: Permission control is a very common basic function in middle and background scenarios. In v2.2.0, the permission control function was integrated into Arco Design Pro
```
*Auto translate by google.*

## Applicable scene

The common front-end permission control in the middle and background can be roughly summarized as the following scenarios:

1. Menu permission control, manage permissions for a certain menu/page , you can see this page, otherwise it will show no permission.

[//]: # (![]&#40;http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/116622141d7b228ad2259c81cd32d095.gif~tplv-uwbnlip3yd-3.awebp&#41;)

2. Menu permission control, manage permissions for a certain menu/page , you can see this page, otherwise it will show no permission.


[//]: # (![]&#40;http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7b410fa5dad6e47665c264fae910c0c8.gif~tplv-uwbnlip3yd-3.awebp&#41;)


## Usage

### Menu permission management

For menu and routing permission control, you can add `roles` parameters . (If not added, the default is to have permission)

`roles` can be defined according to their own business.


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
        roles: ['*'], // * Indicates wildcard permissions. Tip: In order to write less code, you can also not define this field.
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

### A button permission management

Arco Design Pro encapsulates the `v-permission` directives . Can be used on components or native elements.
As follows, place the authorized role types in the array.

```vue
<button v-permission="['admin']">Delete</button>

<a-button v-permission="['user']">Delete</a-button>
```

The above is the specific method of using the front-end page for permission control, but it needs to combine the back-end interface to return the specific permissions owned by the user to the front-end.

At the same time, in the middle and back-end systems, it is far from enough to have simple front-end permission control, and the back-end is also required to perform interface permission control. In particular, some interfaces involving write operations need to strictly control permissions.

## Accomplish

### Routing authority management

Pro provides corresponding permission management hooks. The permission requirements of the business can be customized.

```ts
#src/hooks/permission.ts

import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) { // Determine whether the current user has permission to the route
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

Set up a route guard, and manage the user's page entry and exit in the route guard. For example, whether the current user has logged in and whether the current user has page permissions.

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
      }; // Go to the first authorized page or 404.
      await next(destination);
    }
  }
  if (isLogin()) { // Check if the user is logged in
    if (userStore.role) { // If there is role information, it means that the current user has logged in and obtained user information.
      crossroads();
    } else {
      try {
        await userStore.info(); // Obtain user role information and then perform subsequent jump processing
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
    // Redirect to login page if not logged in
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

Custom permission directive

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
      // Compare the role permission of the current user with the permission type of the incoming command. If the current user does not have permission, the node deletion operation will be performed.
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
