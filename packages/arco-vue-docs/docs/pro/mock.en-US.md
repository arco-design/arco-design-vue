```yaml
meta:
  type: Arco Pro
title: Interface and Mock
description: Network request, interceptor and simulation data
```

*Auto translate by google.*

## Network request

Use axios to make remote interface requests.

It is recommended to improve the type definition of the returned and requested data.

 ```ts
import axios from'axios';

export interface UserToken {
  token: string;
}

export interface UserStateTypes {
  name: string;
  location: string;
}
export function getUserInfo(data: UserToken) {
  // Get complete type hints by passing generics.
  return axios.post<UserStateTypes>('/api/user/info', data);
}
```

## Interceptor

Multi-layer interceptors can be added according to the needs of your own system.

 ```ts
import axios, {AxiosRequestConfig, AxiosResponse} from'axios';
// Users can modify according to their own background system
export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Configure the request here
    return config;
  },
  (error) => {
    // What to do with request errors
    return Promise.reject(error);
  }
);
// Add response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      // remind users

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code)
      ) {
        // do something
      }
      return Promise.reject(new Error(res.msg ||'Error'));
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

Intercept ajax and return simulated data

## mock solution

Parallel development of the front and back ends means that the front end needs to be developed without interface data. In this case, if the function of simulating data requests can be provided, our data request code can be written normally. Pro uses Mock.js to achieve This feature.

Mock.js will intercept the ajax request. If there is a matching mock rule, the ajax will not be sent out, but the mock data will be returned. Mock.js has a wealth of simulation data generation methods, it is recommended to read the document first, the document is very clear and easy to understand [MockJs document](http://mockjs.com/)

 ```ts
import Mock from'mockjs';
import {
  successResponseWrap,
} From'@/utils/setup-mock';

Mock.mock(new RegExp('/api/chatList'), () => {
    const data = Mock.mock(successResponseWrap({
        'data|4-6': [
            {
                'id|+1': 1,
                username:'User 7352772',
                content:'It will start soon, so excited! ',
                time: '13:09:12',
                'isCollect|2': true,
            },
        ],
    }));

    return data.data;
});
```

When the request url sent by the client is matched by `new RegExp('/api/chatList')`, Mock.js will intercept the request, execute the corresponding callback function, and return the data returned in the callback function.

> Note: Requests that are matched and intercepted by Mock.js will not appear in the network panel of the developer tools.

## Close Mock

In order to facilitate the opening and closing of the data simulation function, each `Mock` will be wrapped by `setupMock.setup`, the setupMock is as follows:

 ```ts
import {debug} from'./env';
export default ({ mock, setup }: {mock?: boolean; setup: () => void; }) => {
  if (mock !== false && debug) setup();
};
```

Data simulation is started by default in a non-production environment. When we need to debug the interface, we only need to set the mock parameter of setupMock to false, as follows:

 ```ts
import Mock from'mockjs';
import setupMock from'../utils/setupMock';

setupMock({
  mock: false
  setup() {
  // User Info
    Mock.mock(new RegExp('/api/userInfo'), () => {
        return {
          name:'name',
        };
    });
  },
});
```
