<template>
  <div v-if="showHeadings" :class="`${prefixCls}__headings`">
    <div v-if="!view.isDay" :class="`${prefixCls}__weekdays-headings`">
      <div
        v-for="(day, i) in weekDays"
        :key="i"
        @click="domEvents.click(day.date)"
        :class="[`${prefixCls}__weekday`, { [`${prefixCls}__weekday--today`]: day.isToday }]"
      >
        <slot
          name="weekday-heading"
          :label="day[dayLabelSize]"
          :id="day.id"
          :date="day.date"
          :view="view"
        >
          <span :class="`${prefixCls}__weekday-day`">{{ day[dayLabelSize] }}</span>
          <strong v-if="!view.isMonth" :class="`${prefixCls}__weekday-date`">{{
            day.dateNumber
          }}</strong>
        </slot>
      </div>
    </div>
    <div v-if="config.schedules" :class="`${prefixCls}__schedules-headings`">
      <template v-for="(day, i) in weekDays" :key="i">
        <template v-for="(schedule, j) in config.schedules" :key="j">
          <div
            v-if="$slots['schedule-heading']"
            :class="[`${prefixCls}__schedule`, `${prefixCls}__schedule--heading`, schedule.class]"
          >
            <slot
              name="schedule-heading"
              :schedule="schedule"
              :view="view"
              :cell="headingCell(day)"
            ></slot>
          </div>
          <div
            v-else
            :class="[`${prefixCls}__schedule`, `${prefixCls}__schedule--heading`, schedule.class]"
          >
            <PerformantEllipsis>{{ schedule.label }}</PerformantEllipsis>
          </div>
        </template>
      </template>
    </div>
    <div v-if="config.allDayEvents" :class="`${prefixCls}__all-day`">
      <cell
        v-for="(day, i) in weekDays"
        :key="i"
        :class="[`${prefixCls}__all-day-cell`, { [`${prefixCls}__weekday--today`]: day.isToday }]"
        :start="day.date"
        :end="new Date(day.date.getTime() + 24 * 60 * 60 * 1000 - 1)"
        :index="Number(i)"
        all-day
      >
        <template v-if="$slots['event.all-day']" #event.all-day="params">
          <slot name="event.all-day" v-bind="params"></slot>
        </template>
        <template v-else #event="params">
          <slot name="event" v-bind="params"></slot>
        </template>
      </cell>
      <div
        @mousedown="allDayResizer.handleMouseDown"
        @touchstart="allDayResizer.handleTouchStart"
        :class="`${prefixCls}__all-day-resizer`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, ref, onBeforeUnmount } from 'vue';

  import { PerformantEllipsis } from '../../ellipsis';
  import { calendarInjectionKey, calendarElInjectionKey } from '../context';
  import { weekdays } from '../core/config';
  import Cell from './cell.vue';

  const calendar = inject(calendarInjectionKey)!;
  const $calendarEl = inject(calendarElInjectionKey)!;
  const { view, config, dateUtils } = calendar;
  const prefixCls = calendar.prefixCls;

  const dayLabelSize = computed(() => {
    if (config.xs) return 'day-xs';
    if (config.sm || view.isDays || view.isMonth) return 'day-sm';
    return 'day';
  });

  const showHeadings = computed(() => {
    const isDayDaysWeekOrMonthView = view.isDay || view.isDays || view.isWeek || view.isMonth;
    return isDayDaysWeekOrMonthView && !(view.isDay && !config.schedules && !config.allDayEvents);
  });

  // Only for days, week and month views.
  // The props sm and xs are not used in the computed so switching doesn't recompute.
  const weekDays = computed(() => {
    // Regardless of how many view rows, we always want to display a maximum of view cols headings,
    // hence the slice(0, view.cols).
    const {
      weekDays: dayNames,
      weekDaysShort: dayNamesShort,
      weekDaysMin: dayNamesMin,
    } = calendar.texts;
    return view.cellDates
      .slice(0, config.horizontal ? view.rows : view.cols)
      .map(({ start }: { start: Date }) => {
        // Map JS getDay() (Sun=0) to Mon-first index (Mon=0, Sun=6).
        const dayIdx = (start.getDay() + 6) % 7;
        return {
          'id': weekdays[start.getDay()],
          'date': start,
          'dateNumber': start.getDate(),
          'day': dayNames[dayIdx],
          'day-sm': dayNamesShort[dayIdx],
          'day-xs': dayNamesMin[dayIdx],
          'isToday': dateUtils.isToday(start),
        };
      });
  });

  const headingCell = (day: any) => ({
    start: day.date,
    end: new Date(day.date.getTime() + 24 * 60 * 60 * 1000 - 1),
    isToday: day.isToday,
    goNarrower: () => view.narrower(),
    goBroader: () => view.broader(),
    broader: view.broaderView,
    narrower: view.narrowerView,
  });

  const domEvents = {
    click: (date: Date) => {
      if (view.isDays || view.isWeek) view.updateSelectedDate(date);
    },
  };

  const allDayResizer = {
    isResizing: ref(false),
    startY: ref(0),
    initialHeight: ref(0),
    defaultHeight: 25, // Default height in pixels.

    // Or in the case of horizontal layout.
    startX: ref(0),
    initialWidth: ref(0),
    defaultWidth: 25, // Default width in pixels.

    // Cleanup event listeners.
    cleanup() {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', allDayResizer.handleMouseMove);
        document.removeEventListener('mouseup', allDayResizer.cleanup);
        document.removeEventListener('touchmove', allDayResizer.handleTouchMove);
        document.removeEventListener('touchend', allDayResizer.cleanup);
      }
      allDayResizer.isResizing.value = false;
    },

    startResize(clientX: number, clientY: number) {
      this.isResizing.value = true;
      const isHzl = config.horizontal;
      this[isHzl ? 'startX' : 'startY'].value = isHzl ? clientX : clientY;

      // Get the current CSS variable value in pixels. Using a temp element to properly
      // convert units like rem/em to pixels, preventing jumps when resizing starts.
      const cssValue = getComputedStyle($calendarEl.value!).getPropertyValue(
        `--${prefixCls}-all-day-bar-size`,
      );
      const tempEl = document.createElement('div');
      tempEl.style.position = 'absolute';
      tempEl.style.visibility = 'hidden';
      tempEl.style[isHzl ? 'width' : 'height'] = cssValue;
      document.body.appendChild(tempEl);
      const pixelValue = tempEl[isHzl ? 'offsetWidth' : 'offsetHeight'];
      tempEl.remove();

      if (pixelValue > 0) {
        this[isHzl ? 'initialWidth' : 'initialHeight'].value = pixelValue;
      }

      // Add document event listeners.
      document.addEventListener('mousemove', allDayResizer.handleMouseMove);
      document.addEventListener('mouseup', allDayResizer.cleanup);
      document.addEventListener('touchmove', allDayResizer.handleTouchMove, { passive: false });
      document.addEventListener('touchend', allDayResizer.cleanup);
    },

    // Update height/width based on mouse/touch movement.
    updateSize(clientX: number, clientY: number) {
      if (!this.isResizing.value) return;

      const isHzl = config.horizontal;
      const delta = isHzl ? clientX - this.startX.value : clientY - this.startY.value;
      // Minimum height/width of 20px.
      const newSize = Math.max(20, this[isHzl ? 'initialWidth' : 'initialHeight'].value + delta);

      $calendarEl.value?.style.setProperty(`--${prefixCls}-all-day-bar-size`, `${newSize}px`);
    },

    // Mouse event handlers.
    handleMouseDown(e: MouseEvent) {
      this.startResize(e.clientX, e.clientY);
    },

    handleMouseMove(e: MouseEvent) {
      allDayResizer.updateSize(e.clientX, e.clientY);
    },

    // Touch event handlers.
    handleTouchStart(e: TouchEvent) {
      e.touches?.[0] && this.startResize(e.touches[0].clientX, e.touches[0].clientY);
    },

    handleTouchMove(e: TouchEvent) {
      if (e.touches?.[0]) {
        allDayResizer.updateSize(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault(); // Prevent scrolling while resizing.
      }
    },
  };

  // Clean up on component unmount.
  onBeforeUnmount(() => {
    allDayResizer.cleanup();
  });
</script>
