```yaml
meta:
  type: Arco Pro
title: State management - Pinia
description: Site-wide status management
```

## Arco Pro Version

Arco Pro >= 2.1.0

**Note**： Arco Pro version 2.1.0 has replaced the state management library with Pinia.

## Pinia instructions

The use of Pinia to replace Vuex is based on forward-looking technology considerations.

Meanwhile, Evan You announced on Twitter on November 24, 2021 that Pinia has become the official vuejs status library, meaning Pinia is Vuex 5.

You can learn about Pinia's many new features and usage on the [Pinia](https://pinia.vuejs.org/) website. This article will not go into too much detail.

## Foreword

Global state management is an inevitable existence of a large system, because there are often some information that needs to be shared globally, such as user information, which needs to be stored, so vuex is built into PRO for information sharing.

With Pinia, the catalog is much more concise. The support for Typescript is also more friendly and has unparalleled advantages.

```
├── modulers
│ ├── user (specific module, subject to actual project)
│ │ └── index.ts (module entry)
│ │ └── types.ts (store type declaration)
├── index.ts (export store)
```

## Add new module

1.  Add the state type declaration

```ts
// store/modulers/user/types.ts
export interface UserState {
  name: string;
  avatar: string;
}
```

2.  Defining a Store is as simple as defining a component

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