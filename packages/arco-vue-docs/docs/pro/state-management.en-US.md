```yaml
meta:
  type: Arco Pro
title: State management - Vuex
description: Site-wide status management
```

*Auto translate by google.*

## Arco Pro Version

Arco Pro < 2.1.0

**Note**： Arco Pro version 2.1.0 has replaced the state management library with Pinia.

## Foreword

Global state management is an inevitable existence of a large system, because there are often some information that needs to be shared globally, such as user information, which needs to be stored, so vuex is built into PRO for information sharing.

Regarding the use of vuex + TS, it is recommended to consult the [official document](https://next.vuex.vuejs.org/guide/typescript-support.html).

The official example of vuex can meet the most basic needs. But it lacks more detailed code hints and type inference. At the same time, TS type errors are prone to occur during the use of vuex official cases.

This example is improved on the basis of official documents and uses more complete type annotations and declarations to meet actual application scenarios. The amount of code will increase by an order of magnitude compared to before. This is a little "side effect" brought by TS, but the benefits it brings are still considerable, the code will be more rigorous, and problem location and troubleshooting will be more convenient.

```
├── modulers
│ ├── user (specific module, subject to actual project)
│ │ └── action-types.ts (action enumeration type)
│ │ └── actions.ts (action implementation)
│ │ └── getters.ts (specific implementation of getter)
│ │ └── index.ts (module entry)
│ │ └── mutations-types.ts (mutation enumeration type)
│ │ └── mutations.ts (specific implementation of mutations)
│ │ └── state.ts (state definition)
│ │ └── types.ts (Summary of module types)
│ ├── interface.ts (Summary of export modules)
├── index.ts (used to export store)
├── interface.ts (the definition of root)
├── vuex.d.ts (Declare Vue's custom type)
```

## Add new module

PS: There is no obvious root node in Pro, or it is recommended to abandon the root node and take the module as a unit for overall processing. No namespace is used between modules. Therefore, when adding a new module by yourself, you need to isolate the namespace of getter, action, and mutation by yourself. Otherwise it will be overwritten.

In Pro, for state, getter, action, and mutation, type definitions are performed first, and then declarations and assignments are performed.

1. Add state

 ```ts
// store/modulers/user/state.ts
export interface UserStateTypes {
   name?: string;
   location?: string;
}
export const state: UserStateTypes = {
     name:'arco',
     location:'beijing',
};
```

2. Add a getter

 ```ts
// store/modulers/user/getters.ts
import {GetterTree} from'vuex';
import {UserStateTypes} from'./state';
import {RootState} from'@/store/interface';

export interface UserGettersTypes {
   userInfo(state: UserStateTypes): UserStateTypes;
}

export const getters: GetterTree<UserStateTypes, RootState> & UserGettersTypes =
   {
     userInfo: (state: UserStateTypes) => {
       return {...state };
     },
   };
```

3. Add mutation-types

 ```ts
// store/modulers/user/mutation-types.ts
// It is recommended to add a namespace to the enumeration value to prevent it from being overwritten.
export enum MutationTypes {
   USER_RESET_INFO ='USER/RESET_INFO',
}
```

4. Add mutation

 ```ts
// store/modulers/user/mutations.ts
import {MutationTree} from'vuex';
import {MutationTypes} from'./mutation-types';
import {UserStateTypes} from'./state';

export type UserMutationsTypes<S = UserStateTypes> = {
  [MutationTypes.USER_RESET_INFO](state: S): void;
};

export const mutations: MutationTree<UserStateTypes> & UserMutationsTypes = {
  [MutationTypes.USER_RESET_INFO](state: UserStateTypes) {},
};
```

5. Add action-types

 ```ts
// store/modulers/user/action-types.ts
// It is recommended to add a namespace to the enumeration value to prevent it from being overwritten.
export enum ActionTypes {
  USER_LOGIN ='USER/USER_LOGIN',
}
```

6. Add action

 ```ts
// store/modulers/user/action.ts
import {ActionTree} from'vuex';
import {UserStateTypes} from'./state';
import {ActionTypes} from'./action-types';
import {MutationTypes} from'./mutation-types';
import {UserMutationsTypes} from'./mutations';
import {RootState} from'@/store/interface';

export type UserAugmentedActionContext = {
  commit<K extends keyof UserMutationsTypes>(
    key: K,
    payload: Parameters<UserMutationsTypes[K]>[1]
  ): ReturnType<UserMutationsTypes[K]>;
} & Omit<ActionContext<UserStateTypes, RootState>,'commit'>;

export interface UserActionsTypes {
  [ActionTypes.USER_LOGIN](
    {commit }: UserAugmentedActionContext,
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

7. Module declaration

 ```ts
// store/modulers/user/type.ts
import {Store as VuexStore, CommitOptions, DispatchOptions} from'vuex';

import {UserStateTypes} from'./state';
import {UserMutationsTypes} from'./mutations';
import {UserGettersTypes} from'./getters';
import {UserActionsTypes} from'./actions';

export type UserStoreModuleTypes<S = UserStateTypes> = Omit<
  VuexStore<S>,
  'commit' |'getters' |'dispatch'
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
  // Note!!! Note!!! Note!!! If you do not merge here, there will be an extra state layer in the actual code prompt.
  // store.state.user.state.name
  // In order to have a more complete prompt, put the state here for rewriting.
  // store.state.user.name (For the specific implementation, there will still be one more state prompt, if the correct use is not guaranteed, it is recommended to use a getter)
  [K in keyof UserStateTypes]: UserStateTypes[K];
} & {
  dispatch<K extends keyof UserActionsTypes>(
    key: K,
    payload?: Parameters<UserActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActionsTypes[K]>;
};
```

8. Module assembly

```ts
import {Module} from'vuex';
import {UserStateTypes, RootState} from'@/store/interface';
import {getters} from'./getters';
import {actions} from'./actions';
import {mutations} from'./mutations';
import {state} from'./state';

// Module
const user: Module<UserStateTypes, RootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default user;
```

9. Reference Module

```ts
// store/modulers/index.ts
import {ModuleTree} from'vuex';
import {RootState} from'@/store/interface';

import user from'./user';
// Modules
const modules: ModuleTree<RootState> = {
  user,
};

export default modules;
```

10. Import modules

```ts
// store/index.ts
//In the example here, only key statements are kept. See the pro project for details.
import {
  createStore,
  useStore as VuexUseStore,
  Store as VuexStore,
} from'vuex';
import {RootState, UserStateTypes} from'./interface';
import {UserStoreModuleTypes} from'./modules/interface';

import modules from'./modules/index';

export type StoreModules = {
  user: UserStoreModuleTypes;
};
export interface StateModuler {
  user: UserStateTypes;
}
export type Store = UserStoreModuleTypes<Pick<StoreModules,'user'>>
```

There will be some undefined attributes or types in the actual operation process, and users can expand on this basis according to their needs and draw inferences about them to meet their own needs.

For this example, there is still room for improvement and improvement. Feedback and exchanges are welcome.

## Specific use

```ts
import {defineComponent} from 'vue';
import {useStore} from '@/store';
import {MutationTypes} from'@/store/modules/user/mutation-types';
import {ActionTypes} from'@/store/modules/user/action-types';

export default defineComponent({
  setup() {
    const store = useStore();
    const resetUserInfo = () => {
        store.commit(MutationTypes.USER_RESET_INFO)
    }
    const login = () => {
      const userInfo = {
        username:'admin',
        password:'admin',
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
