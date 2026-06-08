<template>
  <div ref="bodyEl" :style="bodyStyles" :class="`${prefixCls}__body`">
    <transition :name="`${prefixCls}-shrink`">
      <div
        v-if="config.timeAtCursor && (cursorXPercent !== null || cursorYPercent !== null)"
        :style="timeAtCursor.style"
        :class="`${prefixCls}__time-at-cursor`"
      >
        <label>{{ timeAtCursor.time }}</label>
      </div>
    </transition>
    <VueCalCell
      v-for="(date, i) in view.cellDates"
      :key="i"
      :start="date.start"
      :end="date.end"
      :index="Number(i)"
    >
      <template v-if="$slots.cell" #cell="params">
        <slot name="cell" v-bind="params"></slot>
      </template>
      <template v-if="$slots['cell-date']" #cell-date="params">
        <slot name="cell-date" v-bind="params"></slot>
      </template>
      <template v-if="$slots['cell-content']" #cell-content="params">
        <slot name="cell-content" v-bind="params"></slot>
      </template>
      <template v-if="$slots['cell-events']" #cell-events="params">
        <slot name="cell-events" v-bind="params"></slot>
      </template>
      <template v-if="$slots[`event.${view.id}`]" #[`event.${view.id}`]="params">
        <slot :name="`event.${view.id}`" v-bind="params"></slot>
      </template>
      <template v-if="$slots['event.all-day']" #event.all-day="params">
        <slot name="event.all-day" v-bind="params"></slot>
      </template>
      <template v-if="$slots.event" #event="params">
        <slot name="event" v-bind="params"></slot>
      </template>
      <template v-if="$slots['event-count']" #event-count="params">
        <slot name="event-count" v-bind="params"></slot>
      </template>
      <template v-if="$slots['special-hours-label']" #special-hours-label="params">
        <slot name="special-hours-label" v-bind="params"></slot>
      </template>
      <template v-if="$slots['now-line']" #now-line="params">
        <slot name="now-line" v-bind="params"></slot>
      </template>
    </VueCalCell>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, onBeforeUnmount, onMounted, ref, reactive } from 'vue';

  import { calendarInjectionKey } from '../context';
  import { percentageToMinutes, pxToPercentage } from '../utils/conversions';
  import VueCalCell from './cell.vue';

  const calendar = inject(calendarInjectionKey)!;
  const { view, config, dateUtils, touch: globalTouchState, eventsManager } = calendar;
  const prefixCls = calendar.prefixCls;

  const bodyEl = ref<HTMLElement | null>(null);
  const cursorXPercent = ref<number | null>(null);
  const cursorYPercent = ref<number | null>(null);

  // Use resizing state from events composable.
  const { resizeState } = eventsManager;

  // These CSS variables must stay at this level and not at the root, because they need to be "dead"
  // and frozen with the animated container when leaving in a vue transition, for a successful smooth
  // transition. In other terms, there can be 2 sd-calendar__scrollable elements that are animated with
  // different values of these CSS variables at the same time. Beautiful :)
  const bodyStyles = computed(() => ({
    [`--${prefixCls}-grid-columns`]: view.cols,
    [`--${prefixCls}-grid-rows`]: view.rows,
    [`--${prefixCls}-body-max-height`]: config.time
      ? `${(config.timeCellHeight * (config.timeTo - config.timeFrom)) / config.timeStep}px`
      : null,
  }));

  // Computes the time at the current cursor position.
  const timeAtCursor = computed(() => {
    const isHzl = config.horizontal;
    const cursorPercent = isHzl ? cursorXPercent.value : cursorYPercent.value;
    if (cursorPercent === null) return { style: {}, time: '' };
    const time = dateUtils.formatTime(
      percentageToMinutes(cursorPercent, config),
      config.twelveHour ? 'h:mm{am}' : 'HH:mm',
    );
    return {
      style: { [isHzl ? 'left' : 'top']: `${cursorPercent}%` },
      time,
    };
  });

  const onBodyMousemove = (e: MouseEvent | TouchEvent) => {
    if (view.isMonth || view.isYear || view.isYears) return;

    // When resizing an event horizontally, update the current hovered cell from the body element,
    // so there is only one event listener and no need for cell coordinates calculation.
    const needsResizeCellUpdate = globalTouchState.isResizingEvent && config.editableEvents.resizeX;

    // Skip all DOM work when nothing needs updating (common case when timeAtCursor is off).
    if (!config.timeAtCursor && !needsResizeCellUpdate) return;

    const domEvent = (e as TouchEvent).touches?.[0] || e; // Handle click or touch event.
    const { clientX, clientY } = domEvent;

    if (needsResizeCellUpdate) resizeState.cellEl = getCellUnderMouse(clientX, clientY);

    if (config.timeAtCursor && bodyEl.value) {
      const { top, left } = bodyEl.value.getBoundingClientRect();
      if (config.horizontal)
        cursorXPercent.value = ((clientX - left) * 100) / bodyEl.value.clientWidth;
      else cursorYPercent.value = pxToPercentage(clientY - top, bodyEl.value);
    }
  };

  const onBodyMouseleave = () => {
    cursorXPercent.value = null;
    cursorYPercent.value = null;
  };

  /**
   * Get the cell element that the mouse is currently over.
   *
   * @param {number} mouseX - The mouse X position in document coordinates
   * @param {number} mouseY - The mouse Y position in document coordinates
   * @returns {HTMLElement|null} - The cell element or null if not over a cell
   */
  const getCellUnderMouse = (mouseX: number, mouseY: number) => {
    // Use elementFromPoint for better performance as it's optimized by the browser.
    const element = document.elementFromPoint(mouseX, mouseY);
    // Check if the element or its parent is a cell.
    return element?.closest(`.${prefixCls}__cell`) || null;
  };

  onMounted(() => {
    if (bodyEl.value) {
      bodyEl.value.addEventListener('mousemove', onBodyMousemove);
      bodyEl.value.addEventListener('touchmove', onBodyMousemove);
      bodyEl.value.addEventListener('mouseleave', onBodyMouseleave);
      bodyEl.value.addEventListener('touchend', onBodyMouseleave);
    }
  });

  onBeforeUnmount(() => {
    if (bodyEl.value) {
      bodyEl.value.removeEventListener('mousemove', onBodyMousemove);
      bodyEl.value.removeEventListener('touchmove', onBodyMousemove);
      bodyEl.value.removeEventListener('mouseleave', onBodyMouseleave);
      bodyEl.value.removeEventListener('touchend', onBodyMouseleave);
    }
  });
</script>
