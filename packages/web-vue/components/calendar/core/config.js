import { computed, reactive, toRefs, watch } from 'vue';

import { initializeDateLocale } from '../../_utils/date';
import { useI18n } from '../../locale';
import { createCalendarTexts } from './i18n';

export const defaults = {
  texts: {
    weekDays: Array(7).fill(''),
    weekDaysShort: [],
    weekDaysMin: [],
    months: Array(12).fill(''),
    years: '',
    year: '',
    month: '',
    week: '',
    day: '',
    days: '',
    today: '',
    noEvent: '',
    allDay: '',
    deleteEvent: '',
    createEvent: '',
    dateFormat: 'dddd MMMM D, YYYY',
    am: 'am',
    pm: 'pm',
    truncations: true,
  },

  availableViews: {
    day: { cols: 1, rows: 1 },
    days: { cols: 10, rows: 1 },
    week: { cols: 7, rows: 1 },
    month: { cols: 7, rows: 6 },
    year: { cols: 4, rows: 3 },
    years: { cols: 5, rows: 5 }, // Arbitrary range of quarters of century (25y).
  },
};

// Short labels for CSS classes.
export const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
export const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const isSpecialHoursRange = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const hasCoords = 'from' in value || 'to' in value;
  return hasCoords && ('class' in value || 'label' in value || 'allowEvents' in value);
};

const normalizeSpecialHoursRanges = (ranges) => {
  if (!ranges) return [];
  const list = Array.isArray(ranges) ? ranges : [ranges];
  const valid = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (isSpecialHoursRange(item)) valid.push({ ...item });
  }
  return valid;
};

const normalizeSpecialHoursDay = (dayConfig) => {
  if (!dayConfig) return null;

  if (Array.isArray(dayConfig) || isSpecialHoursRange(dayConfig)) {
    return {
      default: normalizeSpecialHoursRanges(dayConfig),
      schedules: {},
    };
  }

  if (typeof dayConfig !== 'object') return null;

  const normalized = {
    default: normalizeSpecialHoursRanges(dayConfig.default),
    schedules: {},
  };

  let scheduleKeyCount = 0;
  const schedulesSrc = dayConfig.schedules;
  if (schedulesSrc && typeof schedulesSrc === 'object') {
    const scheduleKeys = Object.keys(schedulesSrc);
    scheduleKeyCount = scheduleKeys.length;
    for (let i = 0; i < scheduleKeys.length; i++) {
      const scheduleId = scheduleKeys[i];
      normalized.schedules[scheduleId] = normalizeSpecialHoursRanges(schedulesSrc[scheduleId]);
    }
  }

  if (!normalized.default.length && !scheduleKeyCount) return null;
  return normalized;
};

/**
 * Plain `{ from, to }` segments where `allowEvents === false`, keyed like normalized specialHours.
 * Used for fast overlap checks (see `specialHoursDisallowed` computed).
 * Tuned for few weekdays / ranges: avoid Object.keys arrays and empty per-day shells.
 */
const buildSpecialHoursDisallowed = (normalizedByWeekday) => {
  const byWeekday = {};
  let hasAny = false;
  for (const weekday in normalizedByWeekday) {
    if (!Object.prototype.hasOwnProperty.call(normalizedByWeekday, weekday)) continue;
    const day = normalizedByWeekday[weekday];
    if (!day) continue;

    let defOut = null;
    let schedulesOut = null;

    const def = day.default;
    if (def && def.length) {
      for (let ri = 0; ri < def.length; ri++) {
        const r = def[ri];
        if (
          r &&
          r.allowEvents === false &&
          typeof r.from === 'number' &&
          typeof r.to === 'number'
        ) {
          if (!defOut) defOut = [];
          defOut.push({ from: r.from, to: r.to });
          hasAny = true;
        }
      }
    }

    const schedSrc = day.schedules;
    if (schedSrc && typeof schedSrc === 'object') {
      for (const scheduleId in schedSrc) {
        if (!Object.prototype.hasOwnProperty.call(schedSrc, scheduleId)) continue;
        const ranges = schedSrc[scheduleId];
        if (!ranges || !ranges.length) continue;
        const arr = [];
        for (let ri = 0; ri < ranges.length; ri++) {
          const r = ranges[ri];
          if (
            r &&
            r.allowEvents === false &&
            typeof r.from === 'number' &&
            typeof r.to === 'number'
          ) {
            arr.push({ from: r.from, to: r.to });
            hasAny = true;
          }
        }
        if (arr.length) {
          if (!schedulesOut) schedulesOut = {};
          schedulesOut[scheduleId] = arr;
        }
      }
    }

    if (defOut || schedulesOut) {
      const outDay = {};
      if (defOut) outDay.default = defOut;
      if (schedulesOut) outDay.schedules = schedulesOut;
      byWeekday[weekday] = outDay;
    }
  }
  return { hasAny, byWeekday };
};

const weekdaysMap = weekdays.reduce((obj, day, i) => {
  // 1 - 7, from Mon to Sun.
  obj[day] = i || 7;
  return obj;
}, {});

export const useConfig = (calendar, props, attrs) => {
  const { dateUtils } = calendar;

  // Library locale — reactive, follows ConfigProvider.
  const { i18nMessage, locale: globalLocal } = useI18n();
  const ready = false;
  const view = computed(() => {
    // If user explicitly provided a valid view, use it.
    if (props.view && availableViews.value[props.view]) return props.view;

    // If user explicitly provided an invalid view, warn and use first available.
    if (props.view && !availableViews.value[props.view]) {
      console.warn(
        `Calendar: the provided view \`${props.view}\` is not in the list of available views.` +
          ` The first available view will be chosen: \`${Object.keys(availableViews.value)[0]}\`.`,
      );
      return Object.keys(availableViews.value)[0];
    }

    // User didn't provide a view - use default fallback silently.
    const fallbackView = props.datePicker ? 'month' : 'week';
    if (availableViews.value[fallbackView]) return fallbackView;

    // Default fallback not available, silently use first available.
    return Object.keys(availableViews.value)[0];
  });
  const sm = computed(() => props.sm && !props.xs);
  const xs = computed(() => props.xs || props.datePicker);
  const clickToNavigate = computed(
    () => props.clickToNavigate || (props.datePicker && props.clickToNavigate !== false),
  );

  /**
   * Extract all the Calendar external event listeners for cells and events, and prepare an object to
   * pass to the cell component which will v-on this object of listeners.
   */
  const eventListeners = computed(() => {
    const listeners = {
      cell: {}, // All possible event listeners to attach to cells.
      event: {}, // All possible event listeners to attach to calendar events.
    };

    const kebabize = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    // Forward any cell and calendar-events event listener attached to sd-calendar to the cell and event components.
    // For instance, convert sd-calendar.onCellMouseenter to cell.mouseenter.
    for (const [attr, value] of Object.entries(attrs)) {
      const [m0, m1, m2] = attr.match(/^on(Cell|Event)(.+)$/) || [];
      // Allow both camelCase and kebab-case for event handlers names, but store as kebab-case.
      if (m0) listeners[m1.toLowerCase()][kebabize(m2).replace(/^-+|-+$/g, '')] = value;
    }

    return listeners;
  });

  // An object consisting of only the weekdays to hide, given their index (1-7, Mon - Sun).
  // E.g. { 1: true, 6: true, 7 true } will hide the Mondays and weekends.
  const hideWeekdays = computed(() => {
    const weekDays = {}; // 1-7, Mon - Sun.
    if (props.hideWeekends) (weekDays[6] = true) && (weekDays[7] = true);
    if (props.hideWeekdays?.length)
      props.hideWeekdays.forEach((day) => (weekDays[weekdaysMap[day]] = true));

    return weekDays;
  });
  const hideWeekends = computed(
    () => props.hideWeekends || (hideWeekdays.value[6] && hideWeekdays.value[7]),
  );

  const availableViews = computed(() => {
    const datePicker = props.datePicker;
    let invalidViews = 0;
    let availViews = {}; // The new object to return.
    const views = props.views;

    // Default views for date picker layout: ['month', 'year', 'years'].
    if (datePicker && !views)
      return {
        month: { ...defaults.availableViews.month },
        year: { ...defaults.availableViews.year },
        years: { ...defaults.availableViews.years },
      };

    if (views) {
      if (Array.isArray(views)) {
        availViews = views.reduce((obj, view) => {
          if (typeof view === 'string' && defaults.availableViews[view])
            obj[view] = defaults.availableViews[view];
          else invalidViews++;
          return obj;
        }, {});
      } else if (typeof views === 'object') {
        availViews = Object.entries(views).reduce((obj, [id, size]) => {
          const { cols, rows } = defaults.availableViews[id];
          obj[id] = { cols: size.cols || cols, rows: size.rows || rows };
          return obj;
        }, {});
      }
      // Else case handled by unauthorized Vue props definition error.

      if (invalidViews) {
        console.warn(
          'Calendar: the provided `views` prop contains invalid views that will be ignored.',
        );
      }
      if (!Object.keys(availViews).length) {
        console.warn(
          'Calendar: No valid view in the provided `views` prop. Falling back to default views.',
        );
        availViews = { ...defaults.availableViews };
      }
    }
    // Default views for normal layout: ['day', 'days', 'week', 'month', 'year', 'years'] }.
    else {
      availViews = { ...defaults.availableViews };
      // If horizontal view, flip the default rows and cols for the days and week views.
      if (props.horizontal) {
        const { days, week } = defaults.availableViews;
        availViews.days = { cols: days.rows, rows: days.cols };
        availViews.week = { cols: week.rows, rows: week.cols };
      }
    }

    return availViews;
  });

  const defaultView = computed(() => {
    if (props.datePicker) return 'month';
    if (availableViews.value.week) return 'week';
    return Object.keys(availableViews.value)[0];
  });

  const selectedDate = computed(() => {
    if (typeof props.selectedDate === 'string') return dateUtils.stringToDate(props.selectedDate);
    if (props.selectedDate instanceof Date) return props.selectedDate;
    if (!props.selectedDate)
      console.log('Calendar: Info - The provided selected date is undefined.');
    else console.warn('Calendar: The provided selected date is invalid:', props.selectedDate);
  });

  // An array of specific dates to disable.
  // The dates can be provided as 'YYYY-MM-DD' strings or Date objects and the dates are validated
  // or ignored.
  const disableDays = computed(() => {
    if (!props.disableDays) return [];

    const validDates = [];
    if (Array.isArray(props.disableDays)) {
      for (let date of props.disableDays) {
        let jsDate = date;
        if (typeof date === 'string') jsDate = dateUtils.stringToDate(date);
        else if (date instanceof Date) date = dateUtils.formatDate(date, 'YYYY-MM-DD');

        if (jsDate instanceof Date && !isNaN(jsDate.getTime())) {
          validDates.push(date);
          // Don't return here, we need to process all dates in the array.
        } else {
          console.warn('Calendar: The provided `disableDays` prop contains an invalid date:', date);
        }
      }
    } else console.warn('Calendar: The provided `disableDays` prop is invalid:', props.disableDays);

    return validDates;
  });

  /**
   * Mostly for date pickers, sets a minimum date for cell interactions.
   */
  const minTimestamp = computed(() => {
    let date = null;
    if (props.minDate && typeof props.minDate === 'string')
      date = dateUtils.stringToDate(props.minDate);
    else if (props.minDate && props.minDate instanceof Date) date = props.minDate;
    return date?.getTime() || null;
  });

  /**
   * Mostly for date pickers, sets a maximum date for cell interactions.
   */
  const maxTimestamp = computed(() => {
    let date = null;
    if (props.maxDate && typeof props.maxDate === 'string')
      date = dateUtils.stringToDate(props.maxDate);
    else if (props.maxDate && props.maxDate instanceof Date) date = props.maxDate;
    return date?.getTime() || null;
  });

  const schedules = computed(() => {
    const { view } = calendar;
    const list = props.schedules;
    if (!list?.length || !(view.isDay || view.isDays || view.isWeek)) return undefined;
    const visible = [];
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (s.hide) continue;
      visible.push({ ...s, id: s.id ?? i + 1 });
    }
    return visible.length ? visible : undefined;
  });

  const rawSpecialHours = computed(() => {
    const sh = props.specialHours;
    const bh = props.businessHours;
    if (sh && typeof sh === 'object' && !Array.isArray(sh) && Object.keys(sh).length) return sh;
    if (bh && typeof bh === 'object' && !Array.isArray(bh)) return bh;
    return {};
  });

  const specialHours = computed(() => {
    const raw = rawSpecialHours.value;
    if (!raw || typeof raw !== 'object') return {};

    return Object.entries(raw).reduce((obj, [weekday, dayConfig]) => {
      if (!weekdays.includes(weekday)) return obj;

      const normalized = normalizeSpecialHoursDay(dayConfig);
      if (normalized) obj[weekday] = normalized;
      return obj;
    }, {});
  });

  const specialHoursDisallowed = computed(() => buildSpecialHoursDisallowed(specialHours.value));

  const editableEvents = computed(() => {
    const defaults = {
      drag: true,
      resize: true,
      delete: true,
      create: true,
    };
    if (props.editableEvents === true) return defaults;
    if (props.editableEvents === false)
      return Object.keys(defaults).map((key) => (defaults[key] = false));
    return { ...defaults, ...props.editableEvents };
  });

  const showCellEventCount = computed(() => {
    const { view } = calendar;
    const { eventCount } = props;
    const showEventCount = Array.isArray(eventCount) ? eventCount.includes(view.id) : eventCount;
    return showEventCount && ((view.isMonth && !props.eventsOnMonthView) || view.isYear);
  });

  const allDayEvents = computed(() => {
    const { view } = calendar;
    return props.allDayEvents && props.time && (view.isDay || view.isDays || view.isWeek);
  });

  const horizontal = computed(() => {
    const { view } = calendar;
    return props.horizontal && (view.isDay || view.isDays || view.isWeek);
  });

  const timeAtCursor = computed(() => props.timeAtCursor && props.time);

  /**
   * Initializes dayjs locale and loads calendar texts from both
   * dayjs locale data (month/weekday names) and the library's SDLang
   * calendar section (UI labels).
   */
  const loadTexts = async (locale) => {
    const effectiveLocale = locale || globalLocal.value || 'en-us';
    const weekStart = props.startWeekOnSunday ? 0 : 1;

    // 1. Initialize dayjs locale (loads locale data, sets weekStart).
    await initializeDateLocale(effectiveLocale, weekStart);

    // 2. Get calendar section from the library's locale messages.
    const calendarLang = i18nMessage.value?.calendar;

    // 3. Build texts from dayjs locale data + library UI text.
    const translations = createCalendarTexts(calendarLang);
    Object.assign(calendar.texts, defaults.texts, translations);
  };

  // Keep a local copy of the events so the prop is not mandatory.
  const events = reactive(props.events || []);
  // Watch both reference (full replacement) and length (push/pop/splice) changes.
  // Avoids deep watching which would traverse every event property on each mutation.
  watch(
    () => props.events,
    (evts) => events.splice(0, events.length, ...(evts || [])),
  );
  // Watch events length to catch push/pop/splice mutations.
  watch(
    () => props.events?.length,
    () => {
      const evts = props.events;
      if (evts) events.splice(0, events.length, ...evts);
    },
  );

  // React to locale changes from either the `locale` prop or the library's global locale.
  watch(
    () => props.locale || globalLocal.value,
    (newLocale) => loadTexts(newLocale),
  );

  // When startWeekOnSunday changes, re-initialize dayjs locale with new weekStart.
  watch(
    () => props.startWeekOnSunday,
    () => loadTexts(props.locale || globalLocal.value),
  );

  // Initial load.
  loadTexts(props.locale || globalLocal.value);

  return {
    ...toRefs(props),
    events,
    // All the events listeners for cells and events that the end user may have attached to cal.
    eventListeners,
    defaultView,
    availableViews,
    disableDays,
    ready,
    sm,
    xs,
    clickToNavigate,
    hideWeekdays,
    hideWeekends,
    minTimestamp,
    maxTimestamp,
    schedules,
    specialHours,
    specialHoursDisallowed,
    selectedDate,
    editableEvents,
    showCellEventCount,
    allDayEvents,
    horizontal,
    timeAtCursor,
    view,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(hideWeekdays.value).length;
    },
    get size() {
      return xs.value ? 'xs' : sm.value ? 'sm' : 'lg';
    },
    loadTexts,
  };
};
