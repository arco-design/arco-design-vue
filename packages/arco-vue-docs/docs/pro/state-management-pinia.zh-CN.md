```yaml
meta:
  type: Arco Pro 最佳实践
title: 状态管理 - Pinia
description: 全站状态管理
```

## Arco Pro Version

Arco Pro >= 2.1.0

**注意**： `Arco Pro` 2.1.0 版本已经将状态管理库替换为 `Pinia`。

## Pinia 说明

使用Pinia替换Vuex，有基于技术前瞻性的考虑。

同时 Evan You 已经于 2021年11月24日 在推特宣布 Pinia 正式成为 vuejs 官方的状态库，意味着 Pinia 就是 Vuex 5 。

关于 Pinia 带来的众多新特性及用法，大家可以在 [Pinia](https://pinia.vuejs.org/) 官网进行学习了解。本文不做过多赘述。


## 前言

全局状态管理是一个大型系统不可避免的存在，因为经常有一些需要全局共享的信息需要存储，比如用户信息，所以 PRO 中内置了 Pinia 用于信息共享。

使用 Pinia ，目录更加简洁明了。 同时对Typescript的支持更加友好，具有无可比拟的优越性。

```
├── modulers
│ ├── user (具体模块，以实际项目为准)
│ │ └── index.ts (store定义)
│ │ └── types.ts (store类型)
├── index.ts （用于导出store）
```

## 添加新模块

1.  添加 state 类型声明

```ts
// store/modulers/user/types.ts
export interface UserState {
  name: string;
  avatar: string;
}
```

2.  定义store，就像定义一个组件一样简单

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

## 具体使用

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
