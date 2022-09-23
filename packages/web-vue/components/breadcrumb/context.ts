import { InjectionKey, Slots } from 'vue';

export interface BreadcrumbContext {
  total: number;
  maxCount: number;
  separator: string | number;
  needHide: boolean;
  slots: Slots;
}

export const breadcrumbInjectKey: InjectionKey<BreadcrumbContext> =
  Symbol('ArcoBreadcrumb');
