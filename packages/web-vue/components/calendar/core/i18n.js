/**
 * Calendar i18n helpers.
 *
 * After `initializeDateLocale()` has been called (from config.js), the active
 * dayjs locale contains month names, weekday names, AM/PM labels, etc.
 * This module extracts that data into the shape the calendar runtime expects,
 * merging it with UI text from the library's SDLang `calendar` section.
 */

import { dayjs } from '../../_utils/date';

/**
 * Reorders a dayjs weekday array from Sun-first [Sun, Mon, …, Sat]
 * to the calendar's Mon-first [Mon, …, Sun].
 */
const reorderSunToMon = (arr) => [arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[0]];

/**
 * Builds the calendar `texts` object from the currently active dayjs locale
 * and the library's SDLang calendar section.
 *
 * Must be called **after** `initializeDateLocale()` so that the dayjs locale
 * data is loaded and set.
 *
 * @param {object} [calendarLang] — The `calendar` section from SDLang (from `useI18n().i18nMessage.value.calendar`).
 * @returns {object} Calendar texts ready to merge into `calendar.texts`.
 */
export const createCalendarTexts = (calendarLang) => {
  const localeData = dayjs.Ls[dayjs.locale()] || dayjs.Ls.en;

  // Weekday names — reordered from dayjs Sun-first to calendar Mon-first.
  const weekDays = reorderSunToMon(localeData.weekdays || []);
  const weekDaysShort = reorderSunToMon(localeData.weekdaysShort || []);
  const weekDaysMin = reorderSunToMon(
    localeData.weekdaysMin || localeData.weekdaysShort?.map((d) => d.slice(0, 2)) || [],
  );

  // Month names (already 0-indexed Jan–Dec in dayjs).
  const months = localeData.months || [];

  // AM / PM from dayjs locale.
  let am = 'am';
  let pm = 'pm';
  if (typeof localeData.meridiem === 'function') {
    am = localeData.meridiem(0, 0, false);
    pm = localeData.meridiem(12, 0, false);
  }

  return {
    weekDays,
    weekDaysShort,
    weekDaysMin,
    months,
    am,
    pm,
    // UI text from library locale, with English fallbacks.
    today: calendarLang?.today || 'Today',
    allDay: calendarLang?.allDay || 'All Day',
    noEvent: calendarLang?.noEvent || 'No Event',
    deleteEvent: calendarLang?.deleteEvent || 'Delete',
    createEvent: calendarLang?.createEvent || 'Create an event',
    years: calendarLang?.view?.years || 'Years',
    year: calendarLang?.view?.year || 'Year',
    month: calendarLang?.view?.month || 'Month',
    week: calendarLang?.view?.week || 'Week',
    day: calendarLang?.view?.day || 'Day',
    days: calendarLang?.view?.days || 'Days',
    // Used by view.js to determine month-before-day ordering.
    dateFormat: 'dddd MMMM D, YYYY',
    truncations: true,
  };
};
