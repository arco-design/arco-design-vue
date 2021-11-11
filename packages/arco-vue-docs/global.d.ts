/// <reference types="vite/types/importMeta" />

declare module '*.less';

declare module '*.svg';

declare module '*.md';

interface Window {
  isLogin: boolean;
  user: any;
  collectEvent: any;
}
