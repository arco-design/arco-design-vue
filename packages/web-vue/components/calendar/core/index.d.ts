import type { CalendarState } from '../context';

export function useCalendar(options: {
  props: Record<string, any>;
  emit: (...args: any[]) => void;
  attrs: Record<string, any>;
  calendarEl: any;
  scrollbarRef: any;
  uid: string | number;
  prefixCls: string;
}): CalendarState;
