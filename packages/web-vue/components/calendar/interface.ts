import type { Dayjs } from 'dayjs';

/**
 * @zh 日历组件的日期类型，等价于 dayjs 的 Dayjs
 * @en Date type of calendar components, same as `Dayjs` of dayjs
 *
 * 单独导出成具名类型：公共 props 直接引用 dayjs 的类型会让消费侧的声明生成
 * 报 TS2742（cannot be named without a reference to .../dayjs），
 * 因为 dayjs 是传递依赖，使用方不一定能在自己的模块图里命名它。
 */
export type CalendarDayjs = Dayjs;

/**
 * @zh `headerRender` 的渲染参数
 * @en Render props of `headerRender`
 */
export interface CalendarHeaderRenderProps {
  value?: CalendarDayjs;
  pageShowDate?: CalendarDayjs;
  mode?: string;
  onChange: (date: CalendarDayjs) => void;
  onChangePageDate: (date: CalendarDayjs) => void;
  onChangeMode: (mode: 'day' | 'week' | 'month' | 'year') => void;
}
