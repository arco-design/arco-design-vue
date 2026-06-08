import type { InjectionKey, Ref } from 'vue';

/**
 * The calendar state provided/injected across all calendar sub-components.
 * The core is written in JS, so this interface captures the shape used by the Vue templates.
 */
export interface CalendarState {
  uid: string | number;
  prefixCls: string;
  emit: (event: string, ...args: any[]) => void;
  texts: Record<string, any>;
  dateUtils: Record<string, any>;
  now: Date;
  config: Record<string, any>;
  eventsManager: Record<string, any>;
  view: Record<string, any>;
  dnd: Record<string, any>;
  touch: Record<string, any>;
}

export const calendarInjectionKey: InjectionKey<CalendarState> = Symbol('SDCalendar');

export const calendarElInjectionKey: InjectionKey<Ref<HTMLElement | null>> = Symbol('SDCalendarEl');
