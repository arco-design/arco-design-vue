<template>
  <div
    ref="cellEl"
    v-on="cellEventListeners"
    :data-start="props.start.getTime()"
    :class="[`${prefixCls}__cell`, classes]"
  >
    <slot v-if="$slots.cell" name="cell" :cell="cellInfo"></slot>

    <template v-if="specialHours?.default?.length && !config.schedules?.length">
      <div
        v-for="(range, i) in specialHours.default"
        :style="range.style"
        :class="[`${prefixCls}__special-hours`, range.class]"
      >
        <slot name="special-hours-label" :range="range">{{ range.label }}</slot>
      </div>
    </template>

    <template v-if="!$slots.cell && config.schedules">
      <div
        v-for="{ schedule, ranges } in schedulesWithCellSpecialHours"
        :key="schedule.id"
        :class="[`${prefixCls}__schedule`, `${prefixCls}__schedule--cell`, schedule.class]"
        :style="schedule.style || null"
        :data-schedule="schedule.id"
      >
        <template v-if="ranges.length">
          <div
            v-for="(range, i) in ranges"
            :key="`${schedule.id}-${i}`"
            :style="range.style"
            :class="[`${prefixCls}__special-hours`, range.class]"
          >
            <slot name="special-hours-label" :range="range" :schedule="schedule">{{
              range.label
            }}</slot>
          </div>
        </template>
        <div v-if="formattedCellDate || $slots['cell-date']" :class="`${prefixCls}__cell-date`">
          <slot
            name="cell-date"
            :cell="cellInfo"
            :view="view"
            :schedule="schedule"
            :events="scheduleEvents(schedule)"
            >{{ formattedCellDate }}</slot
          >
        </div>
        <div v-if="$slots['cell-content']" :class="`${prefixCls}__cell-content`">
          <slot
            name="cell-content"
            :cell="cellInfo"
            :view="view"
            :schedule="schedule"
            :events="scheduleEvents(schedule)"
          ></slot>
        </div>
        <div v-if="$slots['cell-events']" :class="`${prefixCls}__cell-events`">
          <slot
            name="cell-events"
            :cell="cellInfo"
            :view="view"
            :schedule="schedule"
            :events="scheduleEvents(schedule)"
          ></slot>
        </div>
        <!-- Animate event deletions. -->
        <transition-group
          v-else-if="cellEvents.length || transitioning"
          :name="`${prefixCls}-event-delete`"
          @before-leave="transitioning = true"
          @after-leave="afterDelete"
          tag="div"
          :class="`${prefixCls}__cell-events`"
        >
          <event
            v-for="event in cellEventsPerSchedule[schedule.id]"
            :key="event._.id"
            :event="event"
            @event-deleted="onEventDelete"
            :in-all-day-bar="props.allDay"
            :cell-start="props.start"
            :cell-end="props.end"
            :style="eventStyles[event._.id]"
          >
            <template v-if="$slots['event.all-day'] && props.allDay" #event.all-day="params">
              <slot name="event.all-day" v-bind="params"></slot>
            </template>
            <template v-if="$slots[`event.${view.id}`]" #[`event.${view.id}`]="params">
              <slot :name="`event.${view.id}`" v-bind="params"></slot>
            </template>
            <template v-if="$slots.event" #event="params">
              <slot name="event" v-bind="params"></slot>
            </template>
            <template v-if="$slots['event-content']" #event-content="params">
              <slot name="event-content" v-bind="params"></slot>
            </template>
          </event>
        </transition-group>
        <div
          v-if="isCreatingEvent && touch.schedule === schedule.id && !props.allDay"
          :style="eventPlaceholder.style"
          :class="`${prefixCls}__event-placeholder`"
        >
          {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}
        </div>
      </div>
    </template>

    <template v-if="!$slots.cell && !config.schedules">
      <div v-if="formattedCellDate || $slots['cell-date']" :class="`${prefixCls}__cell-date`">
        <slot name="cell-date" :cell="cellInfo" :view="view">{{ formattedCellDate }}</slot>
      </div>
      <div v-if="$slots['cell-content']" :class="`${prefixCls}__cell-content`">
        <slot name="cell-content" :cell="cellInfo" :view="view"></slot>
      </div>
      <div v-if="$slots['cell-events'] && cellEvents.length" :class="`${prefixCls}__cell-events`">
        <slot name="cell-events" :cell="cellInfo" :view="view"></slot>
      </div>
      <!-- Animate event deletions. -->
      <transition-group
        v-else-if="
          !(view.isMonth && !config.eventsOnMonthView) &&
          !view.isYear &&
          !view.isYears &&
          (cellEvents.length || transitioning)
        "
        :name="`${prefixCls}-event-delete`"
        @before-leave="transitioning = true"
        @after-leave="afterDelete"
        tag="div"
        :class="`${prefixCls}__cell-events`"
      >
        <event
          v-for="event in cellEvents"
          :key="event._.id"
          :event="event"
          @event-deleted="onEventDelete"
          :in-all-day-bar="props.allDay"
          :cell-start="props.start"
          :cell-end="props.end"
          :class="eventClasses[event._.id]"
          :style="eventStyles[event._.id]"
        >
          <template v-if="$slots['event.all-day'] && props.allDay" #event.all-day="params">
            <slot name="event.all-day" v-bind="params"></slot>
          </template>
          <template v-if="$slots[`event.${view.id}`]" #[`event.${view.id}`]="params">
            <slot :name="`event.${view.id}`" v-bind="params"></slot>
          </template>
          <template v-if="$slots.event" #event="params">
            <slot name="event" v-bind="params"></slot>
          </template>
          <template v-if="$slots['event-content']" #event-content="params">
            <slot name="event-content" v-bind="params"></slot>
          </template>
        </event>
      </transition-group>
      <div
        v-if="isCreatingEvent"
        :style="eventPlaceholder.style"
        :class="`${prefixCls}__event-placeholder`"
      >
        {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}
      </div>
    </template>

    <slot v-if="$slots['event-count']" name="event-count" :events="cellForegroundEvents"></slot>
    <div v-else-if="showCellEventCount" :class="`${prefixCls}__cell-events-count`">
      {{ cellForegroundEvents.length }}
    </div>

    <div
      v-if="view.nowLine.show && isToday && !allDay"
      :style="view.nowLine.style"
      :title="view.nowLine.currentTime"
      :class="`${prefixCls}__now-line`"
    >
      <slot name="now-line" :now="view.now" :time-formatted="view.nowLine.currentTime">
        <span>{{ view.nowLine.currentTime }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    inject,
    nextTick,
    onBeforeUnmount,
    reactive,
    ref,
    shallowRef,
    watch,
  } from 'vue';

  import { calendarInjectionKey } from '../context';
  import { months, weekdays } from '../core/config';
  import { minutesToPercentage, percentageToMinutes, pxToPercentage } from '../utils/conversions';
  import { clampDragCreateDayMinutes } from '../utils/special-hours-allow-events';
  import Event from './event.vue';

  const props = defineProps({
    // Even with time=false, the date of the cell will still be provided in order to attach
    // events to a specific date.
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    index: { type: Number, required: true },
    allDay: { type: Boolean, default: false }, // True when the cell is an all-day cell.
  });

  const calendar = inject(calendarInjectionKey)!;
  const { view, config, dateUtils, eventsManager, dnd, touch: globalTouchState } = calendar;
  const prefixCls = calendar.prefixCls;
  const isToday = computed(() => dateUtils.isToday(props.start));

  const cellEl = ref<HTMLElement | null>(null);
  // Store deleted events per cell and filter them out in that specific cell.
  // Only delete the events for good when unmounting the cell, in order to avoid re-rendering all the
  // cells in the view when deleting in the source of truth.
  const eventsDeleted = ref<string[]>([]);
  // Wait for the event deletion transition end before unmounting the events container if no event.
  const transitioning = ref(false);
  const onEventDelete = (e: CustomEvent) => {
    eventsDeleted.value.push(e.detail);
    transitioning.value = true;
  };
  const afterDelete = () => setTimeout(() => (transitioning.value = false), 300);

  // The touch/mouse events listeners are always attached to the cell, but if the event.target is a schedule,
  // display the event placeholder in that schedule.
  const touch = reactive<{
    dragging: boolean;
    holding: boolean;
    holdTimer: ReturnType<typeof setTimeout> | null;
    thresholdPassed: boolean;
    canTouchAndDrag: boolean | null;
    touchAndDragTimer: ReturnType<typeof setTimeout> | null;
    startX: number;
    startY: number;
    moveX: number;
    moveY: number;
    startPercentageX: number;
    startPercentageY: number;
    movePercentageX: number;
    movePercentageY: number;
    schedule: string | number | null;
  }>({
    dragging: false,
    holding: false, // When the cell is clicked and hold for a certain amount of time.
    holdTimer: null, // Cell click and hold detection.
    thresholdPassed: false, // If the drag threshold has been passed.
    canTouchAndDrag: null, // Wait for 500ms before allowing an event to be dragged after touchstart.
    touchAndDragTimer: null, // Timer for canTouchAndDrag.
    startX: 0, // The x position at the start of the drag (mousedown or touchstart).
    startY: 0, // The y position at the start of the drag (mousedown or touchstart).
    moveX: 0,
    moveY: 0,
    startPercentageX: 0, // The x position in percentage at the start of the drag (mousedown or touchstart).
    startPercentageY: 0, // The y position in percentage at the start of the drag (mousedown or touchstart).
    movePercentageX: 0,
    movePercentageY: 0,
    schedule: null,
  });
  const awaitingEventCreation = ref(false);
  // Kept outside the cellEventListeners computed so recomputes don't orphan a pending timeout.
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;

  // Overlapping events calculation (only updates when event IDs or date ranges change).
  const overlappingEvents = ref<{ cellOverlaps: Record<string, any>; longestStreak: number }>({
    cellOverlaps: {},
    longestStreak: 0,
  });

  // While dragging in the cell render an event placeholder, before it becomes a normal calendar event.
  // The calendar creation could be canceled for different wanted reasons at the end of dragging.
  const eventPlaceholder = computed(() => {
    const isHzl = config.horizontal;
    const startPercentageVal = isHzl ? touch.startPercentageX : touch.startPercentageY;
    const movePercentageVal = isHzl ? touch.movePercentageX : touch.movePercentageY;

    const anchorDayMinutes = percentageToMinutes(startPercentageVal, config);
    const cursorDayMinutes = percentageToMinutes(movePercentageVal, config);

    let startPercentage = Math.min(startPercentageVal, movePercentageVal);
    let endPercentage = Math.max(startPercentageVal, movePercentageVal);
    let startMinutes = percentageToMinutes(startPercentage, config);
    let endMinutes = percentageToMinutes(endPercentage, config);

    // Snap the event to the nearest interval if set.
    if (config.snapToInterval) {
      startMinutes = dateUtils.snapToInterval(startMinutes, config.snapToInterval);
      endMinutes = dateUtils.snapToInterval(endMinutes, config.snapToInterval);
      startPercentage = minutesToPercentage(startMinutes, config);
      endPercentage = minutesToPercentage(endMinutes, config);
    }

    if (config.time && config.specialHoursDisallowed?.hasAny && !props.allDay) {
      const clamped = clampDragCreateDayMinutes({
        anchorDayMinutes,
        cursorDayMinutes,
        snappedLow: startMinutes,
        snappedHigh: endMinutes,
        cellDate: props.start,
        schedule: touch.schedule,
        disallowed: config.specialHoursDisallowed,
        hasSchedules: !!(config.schedules && config.schedules.length),
      });
      startMinutes = clamped.low;
      endMinutes = clamped.high;
      startPercentage = minutesToPercentage(startMinutes, config);
      endPercentage = minutesToPercentage(endMinutes, config);
    }

    return {
      style: {
        [isHzl ? 'left' : 'top']: `${startPercentage}%`,
        [isHzl ? 'width' : 'height']: `${Math.abs(endPercentage - startPercentage)}%`,
      },
      startMinutes,
      endMinutes,
      start: dateUtils.formatMinutes(startMinutes),
      end: dateUtils.formatMinutes(endMinutes),
      ...(touch.schedule != null ? { schedule: touch.schedule } : {}),
    };
  });

  const isCreatingEvent = computed(() => {
    const isCreating =
      config.editableEvents.create && (touch.dragging || awaitingEventCreation.value);
    const hasPassedMinDrag =
      (config.eventCreateMinDrag && touch.thresholdPassed) || !config.eventCreateMinDrag;
    const canCreateEvent = touch.canTouchAndDrag !== false; // Allow if null (mouse) or true (touch after delay).
    return isCreating && hasPassedMinDrag && canCreateEvent;
  });

  const classes = computed(() => {
    const now = new Date();
    const viewYear = view.start.getFullYear();
    const viewMonth = view.start.getMonth();
    const y = props.start.getFullYear();
    const m = props.start.getMonth();
    const weekday = weekdays[props.start.getDay()];

    return {
      [`${prefixCls}__cell--${weekday}`]: view.isDay || view.isDays || view.isWeek || view.isMonth,
      [`${prefixCls}__cell--${months[m]}`]: view.isYear,
      [`${prefixCls}__cell--${y}`]: view.isYears,
      [`${prefixCls}__cell--today`]: isToday.value,
      [`${prefixCls}__cell--current-month`]:
        view.isYear && y === now.getFullYear() && m === now.getMonth(),
      [`${prefixCls}__cell--current-year`]: view.isYears && y === now.getFullYear(),
      [`${prefixCls}__cell--out-of-range`]: view.isMonth && (y !== viewYear || m !== viewMonth),
      [`${prefixCls}__cell--before-min`]: isDisabled.value && isBeforeMinDate.value,
      [`${prefixCls}__cell--after-max`]: isDisabled.value && isAfterMaxDate.value,
      [`${prefixCls}__cell--disabled`]: isDisabled.value,
      [`${prefixCls}__cell--selected`]:
        view.selectedDate &&
        view.selectedDate.getTime() >= props.start.getTime() &&
        view.selectedDate.getTime() <= props.end.getTime(),
      [`${prefixCls}__cell--has-schedules`]: config.schedules?.length,
      [`${prefixCls}__cell--dragging`]: touch.dragging,
      [`${prefixCls}__cell--has-events`]: cellEvents.value.length,
    };
  });

  const startFormatted = computed(() => dateUtils.formatDate(props.start));

  // Note: This will recompute when the locale changes (from formatDate) or xs prop changes for instance.
  // So it needs to be a distinct computed from the events.
  const formattedCellDate = computed(() => {
    // ! \ IMPORTANT NOTE:
    // If the selectedDate prop would be added to the calendar.view, any click on any cell
    // (triggering an emit of the selectedDate), would trigger a rerendering of all the
    // cells of the view. The following marker is here to monitor that this does not happen
    // with any prop while developing.
    switch (view.id) {
      case 'day':
        return '';
      case 'days':
        if (config.availableViews.days.rows > 1) dateUtils.formatDate(props.start, 'D');
        return '';
      case 'week':
        return '';
      case 'month':
        return dateUtils.formatDate(props.start, 'D');
      case 'year':
        return dateUtils.formatDate(props.start, config.xs ? 'MMM' : 'MMMM');
      case 'years':
        return dateUtils.formatDate(props.start, 'YYYY');
      default:
        return '';
    }
  });

  const cellEvents = computed(() => {
    if (config.datePicker) return [];
    return eventsManager.getEventsInRange(props.start, props.end, {
      excludeIds: eventsDeleted.value,
      ...(config.allDayEvents ? { allDay: props.allDay } : {}),
    });
  });

  const cellForegroundEvents = computed(() =>
    cellEvents.value.filter((event: any) => !event.background),
  );

  /**
   * Generates an object containing events grouped by schedule ID.
   *
   * @returns {Object} An object where keys are schedule IDs, and values are arrays of event IDs
   *                   that correspond to each schedule.
   */
  const cellEventsPerSchedule = computed(() => {
    return config.schedules?.reduce(
      (obj: Record<string, any>, schedule: any) => {
        obj[schedule.id] = cellEvents.value.filter((event: any) => event.schedule === schedule.id);
        return obj;
      },
      {} as Record<string, any>,
    );
  });

  // Compute styles for event width & offset.
  const eventStyles = computed(() => {
    if (view.isMonth || view.isYear || view.isYears || props.allDay || !config.time)
      return {} as Record<string, any>;
    const isRTL =
      typeof document !== 'undefined' && document.documentElement.getAttribute('dir') === 'rtl';
    const isHzl = config.horizontal;
    const styles: Record<string, any> = {};

    for (const event of cellEvents.value) {
      const eventId = event._.id;
      const { maxConcurrent = 1, position = 0 } =
        overlappingEvents.value.cellOverlaps[eventId] || {};

      const rightOrLeft = isRTL ? 'right' : 'left';
      const widthOrHeight = isHzl ? 'height' : 'width';
      styles[eventId] = { [isHzl ? 'top' : rightOrLeft]: `${(100 / maxConcurrent) * position}%` };
      // Stack overlapping events on top of each other if the stackEvents prop is set to true.
      if (config.stackEvents) {
        styles[eventId][widthOrHeight] =
          `${100 / maxConcurrent + (position === maxConcurrent - 1 ? 0 : 15)}%`;
      } else styles[eventId][widthOrHeight] = `${100 / maxConcurrent}%`;
    }
    return styles;
  });

  /**
   * Generates an object containing event classes based on the stack position and length.
   * This lets the user style visually stacked events in full control.
   *
   * @returns {Object} An object where keys are event IDs, and values are strings
   *                   representing the event class.
   */
  const eventClasses = computed(() => {
    const classes: Record<string, any> = {};
    for (const event of cellEvents.value) {
      const eventId = event._.id;
      const { maxConcurrent = 1, position = 0 } =
        overlappingEvents.value.cellOverlaps[eventId] || {};

      classes[eventId] = `${prefixCls}__event--stack-${position + 1}-${maxConcurrent}`;
    }
    return classes;
  });

  const showCellEventCount = computed(() => {
    return config.showCellEventCount && cellForegroundEvents.value.length;
  });

  /**
   * The special hours of the current cell day.
   * returns an array if the view is day, days, week and the specialHours prop is set correctly.
   */
  type SpecialHourRange = {
    from: number;
    to: number;
    class?: string;
    label?: string;
  };

  type PositionedSpecialHour = {
    style: Record<string, string>;
    class?: string;
    label?: string;
  };

  const getPositionedSpecialHours = (ranges: SpecialHourRange[]) => {
    const list = ranges || [];
    const isHzl = config.horizontal;
    const { timeFrom, timeTo } = config;
    const positioned = [];

    for (let i = 0; i < list.length; i++) {
      const range = list[i];
      let { from, to, class: classes, label } = range;

      // Skip incorrect special hours or ranges completely outside the visible timeline.
      if (isNaN(from) || isNaN(to) || timeFrom >= to || timeTo <= from) continue;

      from = Math.max(timeFrom, from);
      to = Math.min(timeTo, to);

      const start = minutesToPercentage(from, config);
      const size = minutesToPercentage(to, config) - start;

      positioned.push({
        style: {
          [isHzl ? 'left' : 'top']: `${start}%`,
          [isHzl ? 'width' : 'height']: `${size}%`,
        },
        label,
        class: classes,
      });
    }

    return positioned;
  };

  const specialHours = computed(() => {
    if (!config.specialHours || view.isMonth || view.isYear || view.isYears || props.allDay)
      return undefined;
    const weekday = weekdays[props.start.getDay()];

    // The special hours ranges for the current cell day.
    let daySpecialHours = config.specialHours?.[weekday];
    if (!daySpecialHours) return undefined;

    return {
      default: getPositionedSpecialHours(daySpecialHours.default),
      schedules: Object.entries(daySpecialHours.schedules || {}).reduce<
        Record<string, PositionedSpecialHour[]>
      >((obj, [scheduleId, ranges]) => {
        obj[scheduleId] = getPositionedSpecialHours(ranges as SpecialHourRange[]);
        return obj;
      }, {}),
    };
  });

  // One lookup per schedule per computed refresh (avoids calling a lookup fn twice per render in the template).
  const schedulesWithCellSpecialHours = computed(() => {
    const schedules = config.schedules;
    if (!schedules?.length) return [];

    const sh = specialHours.value;
    if (!sh)
      return schedules.map((schedule: any) => ({
        schedule,
        ranges: [] as PositionedSpecialHour[],
      }));

    const { default: defaultRanges, schedules: byScheduleId } = sh;

    return schedules.map((schedule: any) => {
      const scheduleKey = String(schedule.id);
      const ranges = Object.prototype.hasOwnProperty.call(byScheduleId, scheduleKey)
        ? byScheduleId[scheduleKey]
        : defaultRanges;

      return { schedule, ranges };
    });
  });

  const isBeforeMinDate = computed(() => {
    return config.minTimestamp !== null && config.minTimestamp > props.end.getTime();
  });

  const isAfterMaxDate = computed(() => {
    return config.maxTimestamp && config.maxTimestamp < props.start.getTime();
  });

  // Is the current cell disabled or not (disabled date or before min date or after max date).
  const isDisabled = computed(() => {
    const { disableDays } = config;
    const isYearsOrYearView = view.isYear || view.isYears;
    if (
      disableDays.length &&
      disableDays.includes(dateUtils.formatDate(props.start)) &&
      !isYearsOrYearView
    )
      return true;
    return isBeforeMinDate.value || isAfterMaxDate.value;
  });

  // Automatically forwards any event listener attached to calendar starting with @cell- to the cell.
  // Uses shallowRef + watch instead of computed so the listeners object reference stays stable
  // unless the set of external event listeners or disabled state actually changes.
  const cellEventListeners = shallowRef<Record<string, any>>({});

  watch(
    () => [isDisabled.value, config.eventListeners.cell],
    () => {
      if (isDisabled.value) {
        cellEventListeners.value = {};
        return;
      }

      const listeners: Record<string, any> = { ...config.eventListeners.cell };

      // Inject the cell details in each eventListener handler call as 2nd param.
      for (const [eventListener, handler] of Object.entries(listeners)) {
        listeners[eventListener] = (e: any) => {
          // When interacting with an event, skip calling the cell DOM event handler.
          // The DOM event bubbles up to the cell from the event but we don't stop it on purpose so
          // we can receive the on mouseup from the document and stop event drag&drop.
          if ((e.target || e.e?.target)?.closest?.(`.${prefixCls}__event`)) return;

          // Check if e.type to not rewrap the DOM event in an object if already done.
          handler(e.type ? { e, cell: cellInfo.value, cursor: cursorInfo.value, view } : e);
        };
      }

      // Store a copy of any potential external handler to combine with internal handlers like
      // click, touchstart, mousedown.
      const externalHandlers: Record<string, any> = { ...listeners };

      // `cell-delayed-click` is only fired after 400ms if there was no dblclick.
      listeners.click = (e: any) => {
        onCellClick();
        const cursor = getTimeAtCursor(e);

        externalHandlers.click?.({ e, cell: cellInfo.value, cursor, view });

        if (clickTimeout) clickTimeout = clearTimeout(clickTimeout) as unknown as null;
        else {
          clickTimeout = setTimeout(() => {
            clickTimeout = null;
            // Handle delayed single click.
            externalHandlers['delayed-click']?.({ e, cell: cellInfo.value, cursor, view });
          }, 400);
        }
      };

      if ((config.time && view.isDay) || view.isDays || view.isWeek) {
        listeners.touchstart = (e: any) => {
          onMousedown(e.e || e);
          externalHandlers.touchstart?.({
            e,
            cell: cellInfo.value,
            cursor: cursorInfo.value,
            view,
          });
        };
        listeners.mousedown = (e: any) => {
          onMousedown(e.e || e);

          externalHandlers.mousedown?.({ e, cell: cellInfo.value, cursor: cursorInfo.value, view });
        };
      }

      if (externalHandlers.dblclick) {
        // If there's a dblclick external listener, recalculate the cursor position and date
        // since the mouse up has already fired and cleared the touch object.
        // Note: increasing the touch object longevity to keep the cursor position and date would
        // not work because the dblclick can have a fast click and a long hold second click and it
        // should still fire.
        listeners.dblclick = (e: any) => {
          externalHandlers.dblclick?.({
            e,
            cell: cellInfo.value,
            cursor: getTimeAtCursor(e),
            view,
          });
        };
      }

      if (config.editableEvents.drag) {
        listeners.dragenter = (e: DragEvent) => dnd.cellDragEnter(e, cellInfo.value);
        listeners.dragover = (e: DragEvent) => {
          e.preventDefault(); // Explicitly prevent default to allow drop in Firefox.
          dnd.cellDragOver(e, cellInfo.value);
        };
        listeners.dragleave = (e: DragEvent) => dnd.cellDragLeave(e, cellInfo.value);
        listeners.drop = (e: DragEvent) => dnd.cellDragDrop(e, cellInfo.value, props.allDay);
      }

      cellEventListeners.value = listeners;
    },
    { immediate: true },
  );

  const cellInfo = computed(() => ({
    start: props.start,
    end: props.end,
    events: cellEvents,
    today: isToday.value,
    content: formattedCellDate.value,
    ...(touch.schedule !== null ? { schedule: touch.schedule } : {}),
    goNarrower: () => view.narrower(),
    goBroader: () => view.broader(),
    broader: view.broaderView,
    narrower: view.narrowerView,
  }));

  const scheduleEvents = (schedule: any) => {
    return cellEventsPerSchedule.value[schedule.id] || [];
  };

  /**
   * Get the time at the cursor position.
   *
   * @param {Event} e - The event object.
   * @returns {Object} An object containing the cursor position in percentage and the associate date.
   */
  const getTimeAtCursor = (e: MouseEvent | TouchEvent) => {
    const isHzl = config.horizontal;
    const { clientX, clientY } = (e as TouchEvent).touches?.[0] || e;
    if (!cellEl.value) return { x: 0, y: 0, date: new Date() };
    const { top, left } = cellEl.value.getBoundingClientRect();

    const cursorPercent = isHzl
      ? ((clientX - left) * 100) / cellEl.value.clientWidth
      : pxToPercentage(clientY - top, cellEl.value);

    const date = new Date(props.start);
    date.setMinutes(percentageToMinutes(cursorPercent, config));

    return { [isHzl ? 'x' : 'y']: cursorPercent, date };
  };

  // Get cursor information including position and date.
  const cursorInfo = computed(() => {
    const isHzl = config.horizontal;
    const percentageVal = isHzl
      ? touch.movePercentageX || touch.startPercentageX
      : touch.movePercentageY || touch.startPercentageY;
    const minutes = percentageToMinutes(percentageVal, config);
    const date = new Date(props.start);
    date.setMinutes(minutes);

    return {
      x: touch.movePercentageX || touch.startPercentageX,
      y: touch.movePercentageY || touch.startPercentageY,
      date,
    };
  });

  // Functions.
  // --------------------------------------------------------
  const onCellClick = () => {
    view.updateSelectedDate(props.start);

    if (config.clickToNavigate) {
      if ((view.isMonth || view.isDays || view.isWeek) && config.availableViews.day)
        view.switch('day');
      else if (view.isYear && config.availableViews.month) view.switch('month');
      else if (view.isYears && config.availableViews.year) view.switch('year');
    }
    view.updateViewDate(props.start);
  };

  // On mousedown OR TOUCHSTART of the cell.
  const onMousedown = (e: MouseEvent | TouchEvent) => {
    const isTouchEvent = e.type === 'touchstart';

    // On touch devices, wait for 500ms then trigger event creation.
    if (isTouchEvent) {
      touch.canTouchAndDrag = false;
      touch.touchAndDragTimer = setTimeout(() => {
        touch.canTouchAndDrag = true;
        // Now we can start the event creation process if still touching
        // Prevent default scrolling behavior from this point.
        if (touch.holding || touch.dragging) e.preventDefault();
      }, 500);
    }
    // For mouse events, allow immediate event creation.
    else touch.canTouchAndDrag = true;

    // dataset.schedule is always a string; match config id (number, 0, or string/UID).
    const rawSchedule = ((e.target as HTMLElement)?.closest('[data-schedule]') as HTMLElement)
      ?.dataset?.schedule;
    if (rawSchedule !== undefined && config.schedules?.length) {
      const match = config.schedules.find((s: any) => String(s.id) === String(rawSchedule));
      touch.schedule = match ? match.id : rawSchedule;
    } else touch.schedule = null;
    if (!cellEl.value) return;
    const rect = cellEl.value.getBoundingClientRect();
    touch.startX = ((e as TouchEvent).touches?.[0] || e).clientX - rect.left; // Handle click or touch event coords.
    touch.startY = ((e as TouchEvent).touches?.[0] || e).clientY - rect.top; // Handle click or touch event coords.
    touch.startPercentageX = (touch.startX * 100) / rect.width;
    touch.startPercentageY = (touch.startY * 100) / rect.height;
    touch.thresholdPassed = false;

    document.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', onDocMousemove, {
      passive: !isTouchEvent,
    });
    document.addEventListener(isTouchEvent ? 'touchend' : 'mouseup', onDocMouseup, { once: true });

    touch.holdTimer = setTimeout(() => {
      touch.holding = true;
      // If there's a @cell-hold external listener, call it.
      cellEventListeners.value.hold?.({ e, cell: cellInfo.value, cursor: cursorInfo.value, view });
    }, 1000);
  };

  const onDocMousemove = (e: MouseEvent | TouchEvent) => {
    const isTouchEvent = e.type === 'touchmove';
    const isHzl = config.horizontal;

    // For touch events, if the 500ms hasn't passed yet, cancel event creation and allow scrolling.
    if (isTouchEvent && !touch.canTouchAndDrag) {
      // Cancel the touch and drag timer.
      if (touch.touchAndDragTimer) {
        clearTimeout(touch.touchAndDragTimer);
        touch.touchAndDragTimer = null;
      }
      // Don't prevent default - allow natural scrolling.
      // Clean up and exit early.
      onDocMouseup(e);
      return;
    }

    if (isTouchEvent) {
      // If we reach here, either it's a mouse event or touch event after 500ms delay.
      // Prevent default scrolling when click/tap and move so we can create events instead.
      e.preventDefault();
    }

    // Internal emit to the root component to add a CSS class on wrapper while dragging.
    if (!touch.dragging) {
      globalTouchState.isDraggingCell = true; // Add a CSS class on wrapper while dragging.

      // If there's a @cell-drag-start external listener, call it.
      cellEventListeners.value['drag-start']?.({
        e,
        cell: cellInfo.value,
        cursor: cursorInfo.value,
        view,
      });
    }
    touch.dragging = true;
    if (touch.holdTimer) {
      touch.holdTimer = clearTimeout(touch.holdTimer) as unknown as null;
    }
    touch.holding = false;

    if (!cellEl.value) return;
    const rect = cellEl.value.getBoundingClientRect();
    touch.moveX = ((e as TouchEvent).touches?.[0] || e).clientX - rect.left; // Handle click or touch event coords.
    touch.moveY = ((e as TouchEvent).touches?.[0] || e).clientY - rect.top; // Handle click or touch event coords.
    touch.movePercentageX = (touch.moveX * 100) / rect.width;
    touch.movePercentageY = (touch.moveY * 100) / rect.height;

    // Check drag threshold based on layout orientation.
    const dragDelta = isHzl
      ? Math.abs(touch.startX - touch.moveX)
      : Math.abs(touch.startY - touch.moveY);
    if (config.eventCreateMinDrag && dragDelta > config.eventCreateMinDrag) {
      touch.thresholdPassed = true;
    }

    // If there's a @cell-drag external listener, call it.
    cellEventListeners.value.drag?.({ e, cell: cellInfo.value, cursor: cursorInfo.value, view });
  };

  const onDocMouseup = async (e: MouseEvent | TouchEvent) => {
    const isTouchEvent = e.type === 'touchend';
    document.removeEventListener(
      isTouchEvent ? 'touchmove' : 'mousemove',
      onDocMousemove as EventListener,
    );

    // Clean up touch and drag timer
    if (touch.touchAndDragTimer) {
      clearTimeout(touch.touchAndDragTimer);
      touch.touchAndDragTimer = null;
    }

    if (touch.dragging) {
      // If there's a @cell-drag-end external listener, call it.
      cellEventListeners.value['drag-end']?.({
        e,
        cell: cellInfo.value,
        cursor: cursorInfo.value,
        view,
      });
      globalTouchState.isDraggingCell = false; // Add a CSS class on wrapper while dragging.

      if (config.editableEvents.create && touch.canTouchAndDrag) {
        awaitingEventCreation.value = true;
        await createEventIfAllowed(e);
        awaitingEventCreation.value = false;
      }
    }

    if (touch.holdTimer) {
      touch.holdTimer = clearTimeout(touch.holdTimer) as unknown as null;
    }
    touch.holding = false;
    touch.dragging = false;
    touch.startX = 0;
    touch.startY = 0;
    touch.moveX = 0;
    touch.moveY = 0;
    touch.startPercentageX = 0;
    touch.startPercentageY = 0;
    touch.movePercentageX = 0;
    touch.movePercentageY = 0;
    touch.thresholdPassed = false;
    touch.schedule = null;
    touch.canTouchAndDrag = null;
  };

  const createEventIfAllowed = async (e: MouseEvent | TouchEvent) => {
    if (!isCreatingEvent.value) return;

    let { start, end, startMinutes, endMinutes } = eventPlaceholder.value;
    start = new Date(props.start);
    start.setMinutes(startMinutes);
    end = new Date(props.start);
    end.setMinutes(endMinutes);

    let eventToCreate = { ...eventPlaceholder.value, start, end };

    // If there's a @event-create listener, call it and check if it returns true to accept the event
    // creation or false to cancel it. If no listener, create the event.
    // The call to the handler is wrapped in a promise so the user may open an event editor and modify
    // the event before sending in back and resolving the promise.
    const { create: createListener } = config.eventListeners.event;

    if (typeof createListener === 'function') {
      const eventCopy = eventToCreate;
      eventToCreate = await new Promise((resolve) =>
        createListener({
          e,
          event: eventToCreate,
          cell: cellInfo.value,
          resolve,
          cursor: cursorInfo.value,
          view,
        }),
      );
      // eventToCreate may be true, false or an updated event object to create.
      if (eventToCreate && typeof eventToCreate === 'object') view.createEvent(eventToCreate);
      if (eventToCreate && typeof eventToCreate === 'boolean') view.createEvent(eventCopy);
    } else view.createEvent(eventToCreate);
    navigator.vibrate?.(200); // Haptic feedback on supported devices and browsers.
  };

  const removeEventListeners = () => {
    for (const event of Object.keys(cellEventListeners.value)) {
      cellEl.value?.removeEventListener(event, cellEventListeners.value[event] as EventListener);
    }
  };

  const recalculateOverlaps = () => {
    overlappingEvents.value = eventsManager.getCellOverlappingEvents(
      props.start,
      props.end,
      props.allDay,
    );
  };

  watch(
    // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
    () =>
      !view.isYears &&
      !view.isYear &&
      cellForegroundEvents.value
        .map((e: any) => `${e._.id}${e.start.getTime()}${e.end.getTime()}`)
        .join(),
    async () => {
      await nextTick(); // Use nextTick to avoid recursive updates.
      // Recalculate overlaps when events change (added, deleted, date change, schedule change).
      recalculateOverlaps();
    },
    { immediate: true, flush: 'post' }, // Use flush: 'post' to prevent infinite updates.
  );

  onBeforeUnmount(async () => {
    // Removing the calendar events will trigger a rerender of all the cells in the view because the array
    // of events is a reactive object. So only remove them from the source of truth when the cell is unmounted.
    for (const eventId of eventsDeleted.value) eventsManager.deleteEvent(eventId, 3);

    removeEventListeners(); // Prevent potential memory leaks.
    if (clickTimeout) clickTimeout = clearTimeout(clickTimeout) as unknown as null;
    await nextTick(); // Batch updates to avoid multiple re-renders.
  });
</script>
