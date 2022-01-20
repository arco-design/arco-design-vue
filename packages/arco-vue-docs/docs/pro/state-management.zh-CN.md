```yaml
meta:
  type: Arco Pro 最佳实践
title: 状态管理 - Vuex
description: 全站状态管理
```

## Arco Pro Version

Arco Pro < 2.1.0

**注意**： `Arco Pro` 2.1.0 版本已经将状态管理库替换为 `Pinia`。


## 前言

全局状态管理是一个大型系统不可避免的存在，因为经常有一些需要全局共享的信息需要存储，比如用户信息，所以 PRO 中内置了 vuex 用于信息共享。

关于vuex + TS的使用，建议先查阅[官方文档](https://next.vuex.vuejs.org/guide/typescript-support.html)。

vuex官方例子，能够满足最基本的需求。但欠缺了更加详实的代码提示，以及类型推断。同时在vuex官方案例中使用过程中容易出现TS类型报错问题。

本例子在官方文档基础上改进而来，使用更加完善的类型注解和声明，以符合实际应用场景。代码量相对之前会有一个量级的提升，这是TS带来的一点点“副作用”，不过带来的收益还是比较可观的，代码会更加严谨，问题定位和排查也更加便捷。

```
├── modulers
│ ├── user (具体模块，以实际项目为准)
│ │ └── action-types.ts (action枚举类型)
│ │ └── actions.ts (action具体实现)
│ │ └── getters.ts (getter具体实现)
│ │ └── index.ts (模块入口)
│ │ └── mutations-types.ts (mutation枚举类型)
│ │ └── mutations.ts (mutation具体实现)
│ │ └── state.ts (state定义)
│ │ └── types.ts (模块类型汇总)
│ ├── interface.ts （导出模块汇总）
├── index.ts （用于导出store）
├── interface.ts （root的定义）
├── vuex.d.ts （声明 Vue 的自定义类型）
```

## 添加新模块

PS：在Pro中没有明显的根节点，或者建议摒弃根节点，以模块为单位进行统筹处理。模块间 不使用 namespace。所以自行增加新模块时，需要自行对getter、action、mutation进行命名空间隔离。否则会被覆盖。

在Pro中，对于state、getter、action、mutation先进行类型定义，再进行声明赋值。

1.  添加state

```ts
// store/modulers/user/state.ts
export interface UserStateTypes {
  name?: string;
  location?: string;
}
export const state: UserStateTypes = {
    name: 'arco',
    location:'beijing',
};
```

2.  添加getter

```ts
// store/modulers/user/getters.ts
import { GetterTree } from 'vuex';
import { UserStateTypes } from './state';
import { RootState } from '@/store/interface';

export interface UserGettersTypes {
  userInfo(state: UserStateTypes): UserStateTypes;
}

export const getters: GetterTree<UserStateTypes, RootState> & UserGettersTypes =
  {
    userInfo: (state: UserStateTypes) => {
      return { ...state };
    },
  };
```

3.  添加mutation-types

```ts
// store/modulers/user/mutation-types.ts
// 建议枚举值自行添加命名空间，以防止被覆盖。
export enum MutationTypes {
  USER_RESET_INFO = 'USER/RESET_INFO',
}
```

4.  添加mutation

```ts
// store/modulers/user/mutations.ts
import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { UserStateTypes } from './state';

export type UserMutationsTypes<S = UserStateTypes> = {
  [MutationTypes.USER_RESET_INFO](state: S): void;
};

export const mutations: MutationTree<UserStateTypes> & UserMutationsTypes = {
  [MutationTypes.USER_RESET_INFO](state: UserStateTypes) {},
};
```

5.  添加action-types

```ts
// store/modulers/user/action-types.ts
// 建议枚举值自行添加命名空间，以防止被覆盖。
export enum ActionTypes {
  USER_LOGIN = 'USER/USER_LOGIN',
}
```

6.  添加action

```ts
// store/modulers/user/action.ts
import { ActionTree } from 'vuex';
import { UserStateTypes } from './state';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { UserMutationsTypes } from './mutations';
import { RootState } from '@/store/interface';

export type UserAugmentedActionContext = {
  commit<K extends keyof UserMutationsTypes>(
    key: K,
    payload: Parameters<UserMutationsTypes[K]>[1]
  ): ReturnType<UserMutationsTypes[K]>;
} & Omit<ActionContext<UserStateTypes, RootState>, 'commit'>;

export interface UserActionsTypes {
  [ActionTypes.USER_LOGIN](
    { commit }: UserAugmentedActionContext,
    payload: LoginData
  ): Promise<unknown>;
}

export const actions: ActionTree<UserStateTypes, RootState> & UserActionsTypes =
  {
    [ActionTypes.USER_LOGIN](ctx) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 1000)
      });
    },
  };
```

7.  模块声明

```ts
// store/modulers/user/type.ts
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';

import { UserStateTypes } from './state';
import { UserMutationsTypes } from './mutations';
import { UserGettersTypes } from './getters';
import { UserActionsTypes } from './actions';

export type UserStoreModuleTypes<S = UserStateTypes> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof UserMutationsTypes,
    P extends Parameters<UserMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UserMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof UserGettersTypes]: ReturnType<UserGettersTypes[K]>;
  };
} & {
  // overwrite state
  // 注意!!! 注意!!! 注意!!! 此处如果不进行合并，在实际代码提示中会多出一个state层。
  // store.state.user.state.name
  // 为了能够有更加完善的提示，把state放到此处进行重写。
  // store.state.user.name (具体实现，依旧会保留有多一个state提示，如果无法保障正确使用，建议使用getter)
  [K in keyof UserStateTypes]: UserStateTypes[K];
} & {
  dispatch<K extends keyof UserActionsTypes>(
    key: K,
    payload?: Parameters<UserActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActionsTypes[K]>;
};
```

8.  模块拼装

 ```ts
import { Module } from 'vuex';
import { UserStateTypes, RootState } from '@/store/interface';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state } from './state';

// Module
const user: Module<UserStateTypes, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default user;
```

9.  引用模块

 ```ts
// store/modulers/index.ts
import { ModuleTree } from 'vuex';
import { RootState } from '@/store/interface';

import user from './user';
// Modules
const modules: ModuleTree<RootState> = {
  user,
};

export default modules;
```

10. 导入模块

```ts
// store/index.ts
//此处示例，只保留关键语句。具体参见pro项目。
import {
  createStore,
  useStore as VuexUseStore,
  Store as VuexStore,
} from 'vuex';
import { RootState, UserStateTypes } from './interface';
import { UserStoreModuleTypes } from './modules/interface';

import modules from './modules/index';

export type StoreModules = {
  user: UserStoreModuleTypes;
};
export interface StateModuler {
  user: UserStateTypes;
}
export type Store = UserStoreModuleTypes<Pick<StoreModules, 'user'>>
```

具体实操过程中会存在一些尚未定义的属性或者类型，用户可以在此基础上，根据需要进行拓展，举一反三以满足自身的需要。

对于本例子而言，依旧存在需要健全以及改进的地方。欢迎反馈交流。

## 具体使用

```ts
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { MutationTypes } from '@/store/modules/user/mutation-types';
import { ActionTypes } from '@/store/modules/user/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const resetUserInfo = () => {
        store.commit(MutationTypes.USER_RESET_INFO)
    }
    const login = () => {
      const userInfo ={
        username: 'admin',
        password: 'admin',
      };
      await store.dispatch(ActionTypes.USER_LOGIN, userInfo);
    }
    return {
      login,
      resetUserInfo
    }
  }
})
```
