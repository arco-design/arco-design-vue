declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.less';

declare module '*.svg';

declare module '*.md';

interface Window {
  isLogin: boolean;
  user: any;
  collectEvent: any;
}
