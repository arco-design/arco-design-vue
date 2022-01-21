```yaml
meta:
  type: Arco Pro
title: State management - Pinia
description: Site-wide status management
```
*Auto translate by google.*
## Arco Pro Version

Arco Pro >= 2.1.0

**Note**： Arco Pro Version 2.1.0 has replaced the state management library with Pinia.

## Pinia description

Replacing Vuex with Pinia is based on technological forward-looking considerations.

At the same time, Evan You has announced on Twitter on November 24, 2021 that Pinia has officially become the official state library of vuejs, which means that Pinia is Vuex 5.

Regarding the many new features and usages brought by Pinia, you can learn about them on [Pinia](https://pinia.vuejs.org/)'s official website. This article will not go into too much detail.

## Foreword

Global state management is an inevitable existence in a large-scale system, because there are often some information that needs to be shared globally, such as user information, so Pinia is built into PRO for information sharing.

With Pinia, the table of contents is more concise and clear. At the same time, the support for Typescript is more friendly and has unparalleled advantages.

```
├── modulers
│ ├── user (specific module, subject to actual project)
│ │ └── index.ts (module entry)
│ │ └── types.ts (store type declaration)
├── index.ts (export store)
```

## Add new module

1.  Add state type declaration

```ts
// store/modulers/user/types.ts
export interface UserState {
  name: string;
  avatar: string;
}
```

2.  Defining a store is as easy as defining a component

```ts
// store/modulers/user/index.ts
import { defineStore } from 'pinia';
import {
  login as userLogin,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken } from '@/utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    avatar: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      const res = await userLogin(loginForm);
      setToken(res.data.token);
    },
  },
});

```

## Specific use

```ts
import { defineComponent } from 'vue';
import { useUserStore } from '@/store';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const login = () => {
      const userInfo ={
        username: 'admin',
        password: 'admin',
      };
      await userStore.login(values);
    }
    return {
      login,
    }
  }
})
```