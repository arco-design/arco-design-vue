import { InjectionKey } from 'vue';

export type RowContextContext = Readonly<{
  gutter?: [number, number];
  div?: boolean;
}>;

export const RowContextInjectionKey: InjectionKey<RowContextContext> = Symbol(
  'RowContextInjectionKey'
);
