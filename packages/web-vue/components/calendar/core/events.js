import { computed, reactive, shallowReactive, watch } from 'vue';

import { percentageToMinutes } from '../utils/conversions';
import {
  clampResizeProposedRange,
  eventRangeViolatesAllowEvents,
} from '../utils/special-hours-allow-events';

/**
 * useEvents is a composable function that manages events for the Calendar component.
 * It provides methods to create, delete, and retrieve events, as well as normalize event dates.
 *
 * @param {Object} calendar - The Calendar instance.
 * @returns {Object} An object containing methods and computed properties for managing events.
 */
export const useEvents = (calendar) => {
  const { dateUtils, config } = calendar;
  const prefixCls = calendar.prefixCls;
  let uid = 0; // Internal unique ID events counter.

  // Use shallowReactive for the events index so that mutations to individual event
  // properties (start/end during drag/resize) do NOT trigger a full re-index cascade.
  // The index is only rebuilt when events are added or removed.
  const eventsIndex = shallowReactive({
    byYear: {},
    byDate: {},
    recurring: [],
    multiday: [],
    byId: {},
  });

  // Build/rebuild the events index from the config.events source of truth.
  // Called initially and whenever events are added or removed.
  const buildEventsIndex = () => {
    const newByYear = {};
    const newByDate = {};
    const newRecurring = [];
    const newMultiday = [];
    const newById = {};

    // First sort the events by start date so the latest comes last in the DOM and has a natural
    // higher z-index for readability when overlapping.
    // Use stable sort to avoid unnecessary reordering when dates haven't changed.
    const sortedEvents = config.events.slice().sort((a, b) => (a.start - b.start < 0 ? -1 : 1));

    for (let event of sortedEvents) {
      // Check if event needs processing.
      // --------------------------------------------------
      // First check if dates are strings (need normalization) or methods are missing.
      const hasStringDates = typeof event.start === 'string' || typeof event.end === 'string';
      const missingMethods = !event._?.register || !event.isOverlapping || !event.delete;

      // Only check cached timestamps if we have Date objects and cached values.
      let datesChanged = false;
      if (!hasStringDates && event._?.cachedStart && event._?.cachedEnd) {
        datesChanged =
          event.start.getTime() !== event._?.cachedStart ||
          event.end.getTime() !== event._?.cachedEnd;
      }
      // --------------------------------------------------

      // If any of the conditions are true, we need to process the event.
      if (hasStringDates || missingMethods || datesChanged) {
        // Make sure the dates are valid Date objects, and add formatted start date in `event._`.
        if (!normalizeEventDates(event)) continue; // Skip if invalid.

        injectMetaData(event); // Inject core logic and utilities in each event.

        // Cache the timestamps to detect future changes.
        event._.cachedStart = event.start.getTime();
        event._.cachedEnd = event.end.getTime();
      }

      newById[event._.id] = event; // Save and index the event in the byId map.

      if (event.recurring) {
        newRecurring.push(event._.id);
        // @todo: Possibly do other things here.
      }
      // Remove 1ms in case the event ends at next midnight 00:00:00.
      else if (!dateUtils.isSameDate(event.start, new Date(event.end.getTime() - 1))) {
        event._.multiday = config.multidayEvents;
        if (!config.multidayEvents) {
          console.info(
            'Calendar: Multi-day events provided without being enabled. Truncating event end to next midnight.',
          );
          event.end = new Date(new Date(event.start).setHours(23, 59, 59, 999));
          injectMetaData(event); // Re-inject the event metadata for the new end date.
        } else newMultiday.push(event._.id);

        // @todo: handle multiday events. For now, index the event by its start date.
        if (!newByDate[event._.startFormatted]) newByDate[event._.startFormatted] = [];
        newByDate[event._.startFormatted].push(event._.id);
      } else {
        // Index this event by its start date.
        if (!newByDate[event._.startFormatted]) newByDate[event._.startFormatted] = [];
        newByDate[event._.startFormatted].push(event._.id);

        // Index this event by its start year and month.
        const year = event._.startFormatted.substring(0, 4);
        const month = event._.startFormatted.substring(5, 7);
        const day = event._.startFormatted.substring(8, 10);
        if (!newByYear[year]) newByYear[year] = {};
        if (!newByYear[year][month]) newByYear[year][month] = {};
        if (!newByYear[year][month][day]) newByYear[year][month][day] = [];
        newByYear[year][month][day].push(event._.id);
      }
    }

    // Atomic batch replacement: trigger downstream computeds only once.
    eventsIndex.byYear = newByYear;
    eventsIndex.byDate = newByDate;
    eventsIndex.recurring = newRecurring;
    eventsIndex.multiday = newMultiday;
    eventsIndex.byId = newById;
  };

  // Normalize event dates to ensure they are valid Date objects and add formatted dates.
  const normalizeEventDates = (event) => {
    // Skip processing if event is invalid (will be fixed by normalizeEventDates).
    if (!event.start || !event.end) {
      console.error('Calendar: Event is missing start or end date', event);
      return false;
    }

    // Convert string dates to Date objects if needed.
    if (typeof event.start === 'string') event.start = dateUtils.stringToDate(event.start);
    if (typeof event.end === 'string') event.end = dateUtils.stringToDate(event.end);

    // Ensure seconds are normalized for consistent comparison.
    event.start.setSeconds(0, 0);

    // Set the event end to the next minute if the seconds count is 59.
    if (event.end.getSeconds() === 59) event.end.setMinutes(event.end.getMinutes() + 1, 0, 0);
    else event.end.setSeconds(0, 0); // For more accurate range and overlap comparison.

    if (isNaN(event.start) || isNaN(event.end) || event.end.getTime() < event.start.getTime()) {
      if (isNaN(event.start))
        console.error(`Calendar: invalid start date for event "${event.title}".`, event.start);
      else if (isNaN(event.end))
        console.error(`Calendar: invalid end date for event "${event.title}".`, event.end);
      else
        console.error(
          `Calendar: invalid event dates for event "${event.title}". The event ends before it starts.`,
          event.start,
          event.end,
        );
      return false;
    }

    return true;
  };

  // Inject core logic and utilities in each event.
  const injectMetaData = (event) => {
    if (!event._) event._ = {};

    // Always update these core properties as they depend on dates.
    event._.id = event._.id || ++uid;
    event._.multiday = !dateUtils.isSameDate(event.start, new Date(event.end.getTime() - 1)); // Remove 1ms if end is equal to next midnight.
    event._.startFormatted = dateUtils.formatDate(event.start); // yyyy-mm-dd formatted date string.
    event._.endFormatted = dateUtils.formatDate(event.end); // yyyy-mm-dd formatted date string.
    event._.startMinutes = ~~dateUtils.dateToMinutes(event.start); // Integer (minutes).
    event._.endMinutes = ~~dateUtils.dateToMinutes(event.end); // Integer (minutes).
    const startHours = event.start.getHours();
    const startMinutes = event.start.getMinutes().toString().padStart(2, 0);
    const endHours = event.end.getHours();
    const endMinutes = event.end.getMinutes().toString().padStart(2, 0);
    event._.startTimeFormatted24 = `${startHours.toString().padStart(2, 0)}:${startMinutes}`;
    event._.startTimeFormatted12 = `${startHours % 12 || 12}${startMinutes ? `:${startMinutes}` : ''} ${startHours < 12 ? 'AM' : 'PM'}`;
    event._.endTimeFormatted24 = `${endHours.toString().padStart(2, 0)}:${endMinutes}`;
    event._.endTimeFormatted12 = `${endHours % 12 || 12}${endMinutes ? `:${endMinutes}` : ''} ${endHours < 12 ? 'AM' : 'PM'}`;
    event._.duration = Math.abs(~~((event.end - event.start) / 60000)); // Integer (minutes).

    // Inject a delete function in each event and set the deleting flag to false.
    if (!event.delete) {
      // Use a shared function ref to avoid creating a new closure for each event.
      event.delete = function (forcedStage) {
        return deleteEvent(this._.id, forcedStage);
      };
    }

    if (event._.deleting === undefined) event._.deleting = false;
    if (event._.deleted === undefined) event._.deleted = false;

    // Only inject overlap methods if they don't exist
    if (!event.isOverlapping) {
      /**
       * Inject a function to check if the event is overlapping with any another event.
       * Using shared method ref to reduce memory usage.
       *
       * @param {Object} at - An optional object with start and end dates to check the overlap at.
       *                      If not provided, the event's own start and end dates will be used.
       * @returns {Boolean} - True if the event is overlapping with another event.
       */
      event.isOverlapping = function (at = null) {
        return this.getOverlappingEvents(at).length;
      };
    }

    if (!event.getOverlappingEvents) {
      event.getOverlappingEvents = function (at = null) {
        const eventStart = at?.start || this.start;
        const eventEnd = at?.end || this.end;
        const rawSchedule =
          at?.schedule !== undefined && at?.schedule !== null ? at.schedule : this.schedule;
        const eventSchedule = config.schedules?.length ? rawSchedule : null;

        return getEventsInRange(eventStart, eventEnd, {
          excludeIds: [this._.id],
          schedule: eventSchedule,
          exactTime: true,
        });
      };
    }

    // Only inject register/unregister methods if they don't exist
    if (!event._.register) {
      // Register the event DOM node in the event in order to emit DOM events.
      // Can't use `this` and avoid new closure for each event: here it would refer to `event._`.
      event._.register = (domNode) => {
        event._.$el = domNode;
        if (event._.fireCreated) {
          calendar.emit('event-created', event);
          delete event._.fireCreated;
        }
      };
    }

    if (!event._.unregister) {
      // Unregister the event DOM node and cleanup preventing potential memory leaks.
      // Can't use `this` and avoid new closure for each event: here it would refer to `event._`.
      event._.unregister = () => {
        // Only clear the DOM node reference — the event object itself may be reused
        // in a different cell (e.g. after drag-and-drop), so utility methods like
        // register, delete, isOverlapping, and getOverlappingEvents must remain intact.
        event._.$el = null;
      };
    }
  };

  // Rebuild the index initially and when events are added or removed (length change).
  // Individual event property mutations (start/end during drag/resize) do NOT trigger a rebuild —
  // the event references in the index remain valid and the event component's own reactivity
  // handles re-rendering at the individual event level.
  // NOTE: watches must be placed AFTER normalizeEventDates/injectMetaData definitions
  // to avoid temporal dead zone errors when immediate:true fires synchronously.
  watch(
    () => config.events.length,
    () => buildEventsIndex(),
    { immediate: true },
  );

  // Also handle full array reference replacement (e.g., props.events replaced entirely).
  watch(
    () => config.events,
    () => buildEventsIndex(),
    { deep: false },
  );

  // Retrieve an event by its ID.
  const getEvent = (id) => eventsIndex.byId[id];

  // Get events for the view based on cell dates.
  // Returns an object of cell events arrays indexed by the cell string date.
  const getViewEvents = (cellDates) => {
    const events = [];
    for (const { start, end } of cellDates) {
      const eventsByDate = getEventsInRange(start, end);
      if (eventsByDate.length) events.push(...eventsByDate);
    }
    return events;
  };

  // Create a new event and add it to the events list.
  const createEvent = (newEvent) => {
    if (!newEvent.start || !newEvent.end) {
      console.error('Calendar: Cannot create an event without valid start and end dates.');
      return;
    }

    // If `snapToInterval` is enabled in the configuration, adjust the `start` and `end` times to the
    // nearest interval specified by `config.snapToInterval`.
    if (config.snapToInterval) {
      dateUtils.snapToInterval(newEvent.start, config.snapToInterval);
      dateUtils.snapToInterval(newEvent.end, config.snapToInterval);
    }

    // Create a clean deep copy of the event to prevent reference issues.
    newEvent = { ...newEvent };

    const start =
      typeof newEvent.start === 'string'
        ? dateUtils.stringToDate(newEvent.start)
        : new Date(newEvent.start);
    const end =
      typeof newEvent.end === 'string'
        ? dateUtils.stringToDate(newEvent.end)
        : new Date(newEvent.end);
    if (
      !newEvent.allDay &&
      config.time &&
      config.specialHoursDisallowed?.hasAny &&
      eventRangeViolatesAllowEvents({
        start,
        end,
        schedule: newEvent.schedule,
        disallowed: config.specialHoursDisallowed,
        hasSchedules: !!(config.schedules && config.schedules.length),
      })
    ) {
      console.warn(
        'Calendar: Cannot create an event overlapping a time range where allowEvents is false.',
      );
      return;
    }
    newEvent.start = start;
    newEvent.end = end;

    // Always override any existing ID when created: it could come from an external source
    // with an existing _.id, but we need to ensure it's unique for internal management.
    if (!newEvent._) newEvent._ = {};
    newEvent._.id = ++uid;

    newEvent._.fireCreated = true; // Flag to fire the 'event-created' event on first mounted.
    config.events.push(newEvent); // Add the new event to the source of truth.
    return newEvent;
  };

  /**
   * Deletes an event based on the provided eventId or criteria and forcedStage.
   *
   * @param {string|number|Object} eventIdOrCriteria - The ID of the event to delete or an object with criteria to find the event.
   * @param {number} [forcedStage=0] - The stage of deletion to force.
   *    0: Initial deletion stage, toggles deleting and deleted flags.
   *    1: Sets the deleting flag to true.
   *    2: Sets the deleted flag to true and dispatches 'event-deleted' event.
   *    3: Removes the event from the source of truth, emits 'update:events' and 'event-delete' events, and dispatches 'event-deleted' event.
   * @returns {boolean} - Returns true for chaining.
   */
  const deleteEvent = async (eventIdOrCriteria, forcedStage = 0) => {
    if (!eventIdOrCriteria)
      return console.warn('Calendar: Cannot delete event without its ID or criteria.');
    let eventId =
      typeof eventIdOrCriteria === 'string' || !isNaN(eventIdOrCriteria) ? eventIdOrCriteria : null;
    const eventCriteria =
      typeof eventIdOrCriteria === 'object' ? Object.entries(eventIdOrCriteria) : null;
    if (eventCriteria) {
      const [criteriaKey, criteriaValue] = eventCriteria[0];
      eventId = config.events.find((event) => event[criteriaKey] === criteriaValue)?._.id;
    }

    if (!config.editableEvents.delete) {
      return console.info(
        'Calendar: Event deletion is disabled. Enable it with the `editable-events` props.',
      );
    }
    if (!eventId) return console.warn('Calendar: Cannot delete event without its ID.');

    const index = config.events.findIndex((item) => item._.id === eventId);
    if (index === -1) return console.warn(`Calendar: Cannot delete unknown event \`${eventId}\`.`);

    const event = config.events[index];
    if (event.deletable === false)
      return console.warn(
        `Calendar: Can't delete event \`${eventId}\` since it was explicitely set to \`delete: false\`.`,
      );

    switch (forcedStage) {
      case 0:
        if (!event._.deleting) event._.deleting = true;
        // If the event is already marked as deleting, delete completely from the source of truth
        // by default, and skip the stage 2. Stage 2 (for visual deletion) will stay on specific demand.
        else config.events.splice(index, 1); // Remove the event from the source of truth.
        break;
      // Display the delete button.
      case 1:
        event._.deleting = true;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        event._.deleted = true;
        config.events[index]._.deleted = true;
        // Internal emit to the cell (`detail` is the native expected object wrapper).
        event._.$el?.dispatchEvent(new CustomEvent('event-deleted', { detail: event._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        // Removing the event from the source of truth causes a reactivity update cascade that rerenders
        // all the cells and sub-components. This is not a bug, but in most cases, not the ideal behavior.
        config.events.splice(index, 1); // Remove the event from the source of truth.
        calendar.emit('update:events', config.events);
        calendar.emit('event-delete', event);
        break;
    }

    return true; // For chaining.
  };

  // Will recalculate all the overlaps of the current cell OR schedule.
  // cellEvents will contain only the current schedule events if in a schedule.
  const getCellOverlappingEvents = (cellStart, cellEnd, allDay) => {
    const allDayFilter = config.allDayEvents ? { allDay } : {};
    const cellEvents = getEventsInRange(cellStart, cellEnd, { background: false, ...allDayFilter });
    if (!cellEvents.length) return { cellOverlaps: {}, longestStreak: 0 };

    const cellOverlaps = {};
    let activeEvents = [];
    // Overlaps streak is the longest horizontal set of simultaneous events.
    // This is determining the width of events in a streak.
    // e.g. 3 overlapping events in a cell:
    //  ___   ___
    // | 1 | |_2_|  1 overlaps 2 & 3; 2 & 3 don't overlap;
    // |   |  ___   => streak = 2; each width = 50% not 33%.
    // |___| |_3_|
    let maxConcurrent = 0;

    // Sort events by start time, then by duration (shorter first).
    cellEvents.sort((a, b) => a.start - b.start || a.end - a.start - (b.end - b.start));

    for (const e of cellEvents) {
      const id = e._.id;

      if (!cellOverlaps[id])
        cellOverlaps[id] = { overlaps: new Set(), maxConcurrent: 1, position: 0 };

      // Remove expired events from active tracking list.
      activeEvents = activeEvents.filter((active) => active.end > e.start);

      // Find all current overlaps in the current cell or schedule.
      const currentOverlaps = activeEvents.filter((active) => {
        const sameSchedule = !config.schedules?.length || e.schedule === active.schedule;
        return sameSchedule && active.start < e.end;
      });
      const takenPositions = new Set(
        currentOverlaps.map((ev) => cellOverlaps[ev._.id]?.position ?? 0),
      );

      // Assign the lowest available column position.
      let position = 0;
      while (takenPositions.has(position)) position++;

      cellOverlaps[id].position = position;
      activeEvents.push(e);

      // Calculate inherited maxConcurrent from overlaps.
      const inheritedMax = Math.max(
        1,
        ...currentOverlaps.map((ev) => cellOverlaps[ev._.id]?.maxConcurrent ?? 1),
      );

      // Set maxConcurrent for this event.
      cellOverlaps[id].maxConcurrent = Math.max(currentOverlaps.length + 1, inheritedMax);

      // Update all overlapping events to match the new maxConcurrent.
      for (const activeEvent of currentOverlaps) {
        cellOverlaps[activeEvent._.id].overlaps.add(id);
        cellOverlaps[id].overlaps.add(activeEvent._.id);
        cellOverlaps[activeEvent._.id].maxConcurrent = cellOverlaps[id].maxConcurrent;
      }

      // Track the longest streak of overlapping events.
      maxConcurrent = Math.max(maxConcurrent, cellOverlaps[id].maxConcurrent);
    }

    // Convert Sets to Arrays.
    for (const id in cellOverlaps) cellOverlaps[id].overlaps = [...cellOverlaps[id].overlaps];

    return { cellOverlaps, longestStreak: maxConcurrent };
  };

  /**
   * Returns a list of events that are in the provided date range.
   * Optionally exclude some events by their IDs and optionally filter by schedule.
   * Optimized implementation that avoids unnecessary computations.
   *
   * @param {Date} start Start date of the range
   * @param {Date} end End date of the range
   * @param {Object} options Additional options for filtering
   *                         options.excludeIds An array of event IDs to exclude from the results.
   *                         options.schedule The schedule to filter events by.
   *                         options.background Whether to include background events.
   *                         options.allDay Whether to include all-day events.
   *                         options.exactTime Whether to use precise timestamps for overlap checks.
   * @returns {Array} Array of events in the range
   */
  const getEventsInRange = (
    start,
    end,
    { excludeIds = [], schedule = null, background = true, allDay = false, exactTime = false } = {},
  ) => {
    const { byId, byYear } = eventsIndex;
    const totalEvents = Object.keys(byId).length;

    // Fast path: if there are no events, return empty array immediately.
    if (!totalEvents) return [];

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = start.getMonth() + 1;
    const endMonth = end.getMonth() + 1;
    const startDay = start.getDate();
    const endDay = end.getDate();
    // exactTime: use precise timestamps (for overlap checks); otherwise normalize to day boundaries
    // (for view/cell range queries where any event on the date should be included).
    const rangeStartTimestamp = exactTime ? start.getTime() : new Date(start).setHours(0, 0, 0, 0);
    const rangeEndTimestamp = exactTime ? end.getTime() : new Date(end).setHours(23, 59, 59, 999);

    const excludeSet = new Set(excludeIds);
    const eventsArray = [];

    // If there are less than 100 events, we can use a simple loop to find events in the range.
    if (totalEvents <= 100) {
      for (const event of Object.values(byId)) {
        if (!event || excludeSet.has(event._.id)) continue;
        if (schedule !== null && schedule !== event.schedule) continue;
        if (background === false && event.background) continue;
        if (config.allDayEvents && ((allDay && !event.allDay) || (!allDay && event.allDay)))
          continue;
        // Accept events that overlap the range.
        if (event.start.getTime() < rangeEndTimestamp && event.end.getTime() > rangeStartTimestamp)
          eventsArray.push(event);
      }
      return eventsArray;
    }

    // If there are more than 100 events, we need to use a more efficient approach.
    // We'll use the byYear index to find events in the range.
    for (let year = startYear; year <= endYear; year++) {
      const yearStr = `${year}`;
      const months = byYear[yearStr];
      if (!months) continue;

      const monthFrom = year === startYear ? startMonth : 1;
      const monthTo = year === endYear ? endMonth : 12;

      for (let month = monthFrom; month <= monthTo; month++) {
        const monthStr = String(month).padStart(2, '0');
        const days = months[monthStr];
        if (!days) continue;

        for (const dayStr in days) {
          const day = +dayStr;
          // Only skip days outside the range at the boundary months/years to avoid false
          // positives when the range crosses month or year boundaries.
          if (year === startYear && month === startMonth && day < startDay) continue;
          if (year === endYear && month === endMonth && day > endDay) continue;

          const dayEventIds = days[dayStr];
          if (!dayEventIds?.length) continue;

          // Process events in this day in bulk.
          for (let i = 0; i < dayEventIds.length; i++) {
            const e = byId[dayEventIds[i]];
            if (!e || excludeSet.has(e._.id)) continue;
            if (schedule !== null && schedule !== e.schedule) continue;
            if (background === false && e.background) continue;
            if (config.allDayEvents && ((allDay && !e.allDay) || (!allDay && e.allDay))) continue;
            // Accept events that overlap the range.
            if (e.start.getTime() < rangeEndTimestamp && e.end.getTime() > rangeStartTimestamp)
              eventsArray.push(e);
          }
        }
      }
    }

    return eventsArray;
  };

  /**
   * Returns true if an event is in a given date range, even partially, or false otherwise.
   *
   * @param {Object} event The event to test.
   * @param {Date} start The start of range date object.
   * @param {Date} end The end of range date object.
   * @return {Boolean} true if in range, even partially.
   */
  const isEventInRange = (event, start, end) => {
    // Check if all-day or timeless event (if date but no time there won't be a `:` in event.start),
    // and discard the time from the date if any,
    const allDayOrTimeless = event.allDay || !config.time;

    const startTimestamp = allDayOrTimeless
      ? new Date(event.start).setHours(0, 0, 0, 0)
      : event.start.getTime();
    const endTimestamp = allDayOrTimeless
      ? new Date(event.end).setHours(23, 59, 59, 999)
      : event.end.getTime();
    const rangeStart = allDayOrTimeless ? new Date(start).setHours(0, 0, 0, 0) : start.getTime();
    const rangeEnd = allDayOrTimeless ? new Date(end).setHours(23, 59, 59, 999) : end.getTime();
    // Check the event is within the range, considering at least one second overlap.
    return endTimestamp > rangeStart && startTimestamp < rangeEnd;
  };

  // Resizing state management.
  const resizeState = reactive({
    isResizing: false,
    fromResizer: false,
    resizingEvent: null,
    resizingOriginalEvent: null,
    resizingLastAcceptedEvent: null,
    startX: 0,
    startY: 0,
    startPercentageX: 0,
    startPercentageY: 0,
    moveX: 0,
    moveY: 0,
    movePercentageX: 0,
    movePercentageY: 0,
    documentMouseX: 0,
    documentMouseY: 0,
    resizeStartDate: null,
    resizeBaselineEndMs: null,
    cellEl: null,
    schedule: null,
    resizeAnchorClientX: 0,
    resizeAnchorClientY: 0,
    resizeSlopExceeded: false,
  });

  /**
   * Compute the new start and end of the event based on the touch move percentage while resizing.
   * @param {Object} event - The event object.
   * @param {Object} cellStart - The cell start date.
   * @returns {Object} - The new start and end of the event.
   */
  const computeEventStartEnd = (event, cellStart) => {
    // Use X percentage for horizontal layout, Y for vertical.
    const movePercentage = resizeState[config.horizontal ? 'movePercentageX' : 'movePercentageY'];
    let minutes = percentageToMinutes(movePercentage, config);

    // While resizing, cap the newEnd between the previous midnight and next midnight.
    minutes = Math.max(0, Math.min(minutes, 24 * 60));

    // On drop, snap to time every X minutes if the option is on.
    if (config.snapToInterval) {
      const plusHalfSnapTime = minutes + config.snapToInterval / 2;
      minutes = plusHalfSnapTime - (plusHalfSnapTime % config.snapToInterval);
    }

    let newStart = event.start;
    let newEnd = new Date(cellStart.getTime() + minutes * 60000);

    // If the event is resizing horizontally by the user dragging and crossing a cell,
    // Set the end date to the hovered cell's start date while preserving the time at cursor position.
    if (resizeState.moveX && calendar.touch?.currentHoveredCell && resizeState.cellEl) {
      // Get the current hovered cell date from global touch state.
      const currentCellDate = new Date(parseInt(calendar.touch.currentHoveredCell.dataset.start));

      // Set the event end date to the hovered cell's date.
      // newEnd.setDate(currentCellDate.getDate())
      // newEnd.setMonth(currentCellDate.getMonth())
      // newEnd.setYear(currentCellDate.getFullYear())
    }

    // While resizing and event end is before event start.
    if (newEnd < resizeState.resizeStartDate) {
      newStart = newEnd;
      newEnd = resizeState.resizeStartDate;
    }

    return { newStart, newEnd };
  };

  const RESIZE_SLOP_SQ = 4; // 2px; ignore jitter until pointer moves farther than this from mousedown.

  const syncResizePointerFromClient = (clientX, clientY) => {
    if (!resizeState.cellEl) return;
    const { top, left, width, height } = resizeState.cellEl.getBoundingClientRect();
    resizeState.moveX = clientX - left;
    resizeState.moveY = clientY - top;
    resizeState.movePercentageX = (resizeState.moveX * 100) / width;
    resizeState.movePercentageY = (resizeState.moveY * 100) / height;
    resizeState.documentMouseX = clientX;
    resizeState.documentMouseY = clientY;
  };

  const getClampedResizeProposal = (ev, cellStart) => {
    const prevStart = new Date(ev.start);
    const prevEnd = new Date(ev.end);
    let { newStart, newEnd } = computeEventStartEnd(ev, cellStart);

    if (config.time && !ev.allDay && config.specialHoursDisallowed?.hasAny) {
      const clamped = clampResizeProposedRange({
        proposedStart: newStart,
        proposedEnd: newEnd,
        prevStart,
        prevEnd,
        schedule: ev.schedule,
        disallowed: config.specialHoursDisallowed,
        hasSchedules: !!(config.schedules && config.schedules.length),
      });
      newStart = clamped.start;
      newEnd = clamped.end;
    }

    const internalOk =
      !config.time ||
      ev.allDay ||
      !config.specialHoursDisallowed?.hasAny ||
      !eventRangeViolatesAllowEvents({
        start: newStart,
        end: newEnd,
        schedule: ev.schedule,
        disallowed: config.specialHoursDisallowed,
        hasSchedules: !!(config.schedules && config.schedules.length),
      });

    return { newStart, newEnd, internalOk };
  };

  // Document event handlers for event resizing.
  const onDocumentMousemove = async (e) => {
    const { clientX, clientY } = e.touches?.[0] || e; // Handle click or touch event.

    const adx = clientX - resizeState.resizeAnchorClientX;
    const ady = clientY - resizeState.resizeAnchorClientY;
    if (!resizeState.resizeSlopExceeded) {
      if (adx * adx + ady * ady <= RESIZE_SLOP_SQ) return;
      resizeState.resizeSlopExceeded = true;
    }
    syncResizePointerFromClient(clientX, clientY);

    // Only the first committed move stores original event and fires resize-start.
    if (resizeState.fromResizer && !resizeState.resizingOriginalEvent) {
      resizeState.resizingOriginalEvent = {
        ...resizeState.resizingEvent,
        _: { ...resizeState.resizingEvent._ },
      };

      // If there's an @event-resize-start external listener, call it.
      const eventListeners = config.eventListeners?.event || {};
      eventListeners['resize-start']?.({ e, event: resizeState.resizingEvent });
    }

    if (resizeState.fromResizer && resizeState.resizingEvent) {
      const cellStart = new Date(parseInt(resizeState.cellEl.dataset.start));
      const { newStart, newEnd, internalOk } = getClampedResizeProposal(
        resizeState.resizingEvent,
        cellStart,
      );

      // If there's an @event-resize external listener, call it and ask for resizing approval.
      let acceptResize = internalOk;
      const { resize: resizeEventHandler } = config.eventListeners?.event || {};
      // Call external validation of event resizing. If successful, update the event details.
      if (internalOk && resizeEventHandler) {
        acceptResize = await resizeEventHandler({
          e,
          event: { ...resizeState.resizingEvent, start: newStart, end: newEnd },
          overlaps: resizeState.resizingEvent.getOverlappingEvents({
            start: newStart,
            end: newEnd,
          }),
        });
      }
      // If the event resizing is accepted, apply to new time range to the event.
      if (acceptResize !== false) {
        resizeState.resizingEvent.start = newStart;
        resizeState.resizingEvent.end = newEnd;
        // Update event metadata in-place so the event component renders with correct position.
        injectMetaData(resizeState.resizingEvent);
        // Reset last accepted event details if existing and accepting again.
        if (resizeState.resizingLastAcceptedEvent) resizeState.resizingLastAcceptedEvent = null;

        // Prevent scrolling while resizing.
        // Can only be done when event handler is not passive.
        e.preventDefault();
      } else {
        // If the event resizing is refused, store the last accepted original event details
        // so it can be used to revert to this stage on event-resize-end (in `onDocumentMouseup`).
        if (resizeEventHandler)
          resizeState.resizingLastAcceptedEvent = {
            ...resizeState.resizingEvent,
            _: { ...resizeState.resizingEvent._ },
          };
      }
    }
  };

  const onDocumentMouseup = async (e) => {
    if (calendar.touch?.isResizingEvent && resizeState.resizingEvent) {
      const { clientX, clientY } = e.changedTouches?.[0] || e;
      if (!resizeState.resizeSlopExceeded) {
        resizeState.resizingEvent.start = new Date(resizeState.resizeStartDate);
        resizeState.resizingEvent.end = new Date(resizeState.resizeBaselineEndMs);
      } else {
        syncResizePointerFromClient(clientX, clientY);
        const cellStart = new Date(parseInt(resizeState.cellEl.dataset.start));
        const { newStart, newEnd, internalOk } = getClampedResizeProposal(
          resizeState.resizingEvent,
          cellStart,
        );

        // If there's an @event-resize-end external listener, call it.
        let acceptResize = internalOk;
        const eventListeners = config.eventListeners?.event || {};
        const resizeEndHandler = eventListeners['resize-end'];
        // Call external validation of event resize-end. If successful, update the event details.
        if (internalOk && resizeEndHandler) {
          acceptResize = await resizeEndHandler({
            e,
            event: resizeState.resizingEvent,
            original: resizeState.resizingOriginalEvent, // Original event details before resizing.
            overlaps: resizeState.resizingEvent.getOverlappingEvents({
              start: newStart,
              end: newEnd,
            }),
          });
        }

        // If the event resize is accepted apply new range, if refused (SPECIFICALLY FALSE) revert to original.
        resizeState.resizingEvent.start =
          acceptResize === false
            ? (resizeState.resizingLastAcceptedEvent || resizeState.resizingOriginalEvent).start
            : resizeState.resizingLastAcceptedEvent?.start || newStart;
        resizeState.resizingEvent.end =
          acceptResize === false
            ? (resizeState.resizingLastAcceptedEvent || resizeState.resizingOriginalEvent).end
            : resizeState.resizingLastAcceptedEvent?.end || newEnd;
        // If resizing to less than 1 minute, revert to original.
        if (resizeState.resizingEvent._.duration < 1 && resizeState.resizingOriginalEvent) {
          resizeState.resizingEvent.start = resizeState.resizingOriginalEvent.start;
          resizeState.resizingEvent.end = resizeState.resizingOriginalEvent.end;
        }
      }
      // Refresh event metadata so the index and display reflect the final position.
      injectMetaData(resizeState.resizingEvent);
      calendar.touch.isResizingEvent = false; // Add a CSS class on wrapper while resizing.
      calendar.touch.currentHoveredCell = null; // Reset current hovered cell.
    }

    // Clean up document event listeners.
    document.removeEventListener(
      e.type === 'touchend' ? 'touchmove' : 'mousemove',
      onDocumentMousemove,
      { passive: !resizeState.fromResizer },
    );

    // Reset resizing state.
    calendar.touch.isResizingEvent = false;
    resizeState.fromResizer = false;
    resizeState.resizingEvent = null;
    resizeState.resizingOriginalEvent = null;
    resizeState.resizingLastAcceptedEvent = null;
    resizeState.startX = 0;
    resizeState.startY = 0;
    resizeState.moveX = 0;
    resizeState.moveY = 0;
    resizeState.startPercentageX = 0;
    resizeState.startPercentageY = 0;
    resizeState.movePercentageX = 0;
    resizeState.movePercentageY = 0;
    resizeState.documentMouseX = 0;
    resizeState.documentMouseY = 0;
    resizeState.cellEl = null;
    resizeState.resizeStartDate = null;
    resizeState.resizeBaselineEndMs = null;
    resizeState.schedule = null;
    resizeState.resizeAnchorClientX = 0;
    resizeState.resizeAnchorClientY = 0;
    resizeState.resizeSlopExceeded = false;
  };

  // Handle mousedown/touchstart on event elements
  const handleEventResize = (e, event, eventEl) => {
    const domEvent = e.touches?.[0] || e; // Handle click or touch event.
    // If the event target is the resizer, set the resizing flag.
    resizeState.fromResizer = !!domEvent.target.closest(`.${prefixCls}__event-resizer`);

    if (resizeState.fromResizer) {
      // Set the resizing flag immediately to prevent drag from starting.
      calendar.touch.isResizingEvent = true;

      const rect = eventEl.getBoundingClientRect();
      resizeState.startX = domEvent.clientX - rect.left; // Handle click or touch event coords.
      resizeState.startY = domEvent.clientY - rect.top; // Handle click or touch event coords.
      resizeState.startPercentageX = (resizeState.startX * 100) / rect.width;
      resizeState.startPercentageY = (resizeState.startY * 100) / rect.height;
      // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
      resizeState.cellEl = eventEl.closest(`.${prefixCls}__cell`);
      // Immutable gesture start (swap logic + cancel if no real drag).
      resizeState.resizeStartDate = new Date(event.start.getTime());
      resizeState.resizeBaselineEndMs = event.end.getTime();
      // Store the event being resized.
      resizeState.resizingEvent = event;
      resizeState.resizeAnchorClientX = domEvent.clientX;
      resizeState.resizeAnchorClientY = domEvent.clientY;
      resizeState.resizeSlopExceeded = false;

      // Make the event listener non-passive if resizing so we can prevent default scrolling.
      document.addEventListener(
        e.type === 'touchstart' ? 'touchmove' : 'mousemove',
        onDocumentMousemove,
        { passive: !resizeState.fromResizer },
      );
      document.addEventListener(
        e.type === 'touchstart' ? 'touchend' : 'mouseup',
        onDocumentMouseup,
        { once: true },
      );
    }
  };

  return {
    eventsIndex,
    resizeState,
    getEvent,
    getViewEvents,
    getCellOverlappingEvents,
    getEventsInRange,
    createEvent,
    deleteEvent,
    isEventInRange,
    handleEventResize,
    // Refresh an event's metadata after its dates change (drag/resize).
    refreshEventMeta: (event) => injectMetaData(event),
  };
};
