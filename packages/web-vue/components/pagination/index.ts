import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Pagination from './pagination';

const Pagination = Object.assign(_Pagination, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Pagination.name, _Pagination);
  },
});

export type PaginationInstance = InstanceType<typeof _Pagination>;
export type { PaginationProps } from './interface';

export default Pagination;
