<template>
  <div
    ref="calendar-el"
    :data-locale="locale"
    :class="[prefixCls, wrapperClasses]"
    :style="wrapperStyles"
  >
    <slot v-if="$slots.diy" name="diy" :calendar="calendar"></slot>
    <template v-else>
      <VueCalHeader>
        <template v-if="$slots.header" #header="params">
          <slot name="header" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['previous-button']" #previous-button="params">
          <slot name="previous-button" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['next-button']" #next-button="params">
          <slot name="next-button" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['today-button']" #today-button="params">
          <slot name="today-button" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots.title" #title="params">
          <slot name="title" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.day']" #title.day="params">
          <slot name="title.day" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.days']" #title.days="params">
          <slot name="title.days" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.week']" #title.week="params">
          <slot name="title.week" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.month']" #title.month="params">
          <slot name="title.month" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.year']" #title.year="params">
          <slot name="title.year" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['title.years']" #title.years="params">
          <slot name="title.years" v-bind="params"></slot>
        </template>
        <template v-if="!$slots.header && $slots['schedule-heading']" #schedule-heading="params">
          <slot name="schedule-heading" v-bind="params"></slot>
        </template>
      </VueCalHeader>

      <div :class="`${prefixCls}__scrollable-wrap`">
        <transition :name="`${prefixCls}-slide-fade--${view.transitionDirection}`">
          <Scrollbar
            :key="view.id + view.start.getTime()"
            :outer-class="[`${prefixCls}__scrollable`, scrollableElClasses]"
            :class="`${prefixCls}__scrollable-content`"
            ref="scrollbarRef"
            @scroll="onScrollableScroll"
          >
            <TimeColumn v-if="hasTimeColumn">
              <template v-if="$slots['time-cell']" #time-cell="params">
                <slot name="time-cell" v-bind="params"></slot>
              </template>
              <template v-if="$slots['current-time-label']" #current-time-label="params">
                <slot name="current-time-label" v-bind="params"></slot>
              </template>
            </TimeColumn>
            <div v-if="config.weekNumbers && view.isMonth" :class="`${prefixCls}__week-numbers`">
              <div v-for="i in weekNumbers" :class="`${prefixCls}__week-number`">
                <slot name="week-number">
                  <small>{{ i }}</small>
                </slot>
              </div>
            </div>
            <div :class="`${prefixCls}__body-wrap`">
              <HeadingsBar>
                <template v-if="$slots['weekday-heading']" #weekday-heading="params">
                  <slot name="weekday-heading" v-bind="params"></slot>
                </template>
                <template v-if="$slots['schedule-heading']" #schedule-heading="params">
                  <slot name="schedule-heading" v-bind="params"></slot>
                </template>
                <template v-if="$slots['event.all-day']" #event.all-day="params">
                  <slot name="event.all-day" v-bind="params"></slot>
                </template>
                <template v-if="$slots.event" #event="params">
                  <slot name="event" v-bind="params"></slot>
                </template>
              </HeadingsBar>

              <VueCalBody>
                <template v-if="$slots.cell" #cell="params">
                  <slot name="cell" v-bind="params"></slot>
                </template>
                <template v-if="!$slots.cell && $slots['cell-date']" #cell-date="params">
                  <slot name="cell-date" v-bind="params"></slot>
                </template>
                <template v-if="!$slots.cell && $slots['cell-content']" #cell-content="params">
                  <slot name="cell-content" v-bind="params"></slot>
                </template>
                <template v-if="!$slots.cell && $slots['cell-events']" #cell-events="params">
                  <slot name="cell-events" v-bind="params"></slot>
                </template>
                <template
                  v-if="!$slots.cell && !$slots['cell-events'] && $slots['event.all-day']"
                  #event.all-day="params"
                >
                  <slot name="event.all-day" v-bind="params"></slot>
                </template>
                <template
                  v-if="!$slots.cell && !$slots['cell-events'] && $slots[`event.${view.id}`]"
                  #[`event.${view.id}`]="params"
                >
                  <slot :name="`event.${view.id}`" v-bind="params"></slot>
                </template>
                <template
                  v-if="!$slots.cell && !$slots['cell-events'] && $slots.event"
                  #event="params"
                >
                  <slot name="event" v-bind="params"></slot>
                </template>
                <template v-if="!$slots.cell && $slots['event-count']" #event-count="params">
                  <slot name="event-count" v-bind="params"></slot>
                </template>
                <template v-if="$slots['special-hours-label']" #special-hours-label="params">
                  <slot name="special-hours-label" v-bind="params"></slot>
                </template>
                <template v-if="$slots['now-line']" #now-line="params">
                  <slot name="now-line" v-bind="params"></slot>
                </template>
              </VueCalBody>
            </div>
          </Scrollbar>
        </transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    useAttrs,
    useId,
    useTemplateRef,
  } from 'vue';

  import { getPrefixCls } from '../../_utils/global-config';
  import Scrollbar from '../../scrollbar';
  import { calendarInjectionKey, calendarElInjectionKey } from '../context';
  import { useCalendar } from '../core/index';
  import { props as propsDefinitions } from '../core/props-definitions';
  import { useCalendarTheme } from '../hooks/use-calendar-theme';
  import VueCalBody from './body.vue';
  import VueCalHeader from './header.vue';
  import HeadingsBar from './headings-bar.vue';
  import TimeColumn from './time-column.vue';

  defineOptions({ name: 'Calendar' });

  const props = defineProps(propsDefinitions);
  const prefixCls = getPrefixCls('calendar');

  // In addition to the following emitted events, there are other manually-handled events that are forwarded
  // to specific components, allowing the user to have full flexibility and control on their own events:
  // cell-click, cell-xxxx, where xxxx is an existing DOM event name given by the end user;
  // event-click, event-xxxx, where xxxx is an existing DOM event name given by the end user.
  const emit = defineEmits([
    'ready',
    'view-change',
    'update:view',
    'update:selectedDate',
    'update:viewDate',
    'update:events',
    'event-delete',
    'event-created',
    'event-dropped',
    'event-drag-start',
    'event-drag-end',
  ]);

  const calendarEl = useTemplateRef('calendar-el');
  const scrollbarRef = useTemplateRef('scrollbarRef');
  const calendar = useCalendar({
    props,
    emit,
    attrs: useAttrs(),
    calendarEl,
    scrollbarRef,
    uid: useId(),
    prefixCls,
  });
  const { config, view, dateUtils, touch: touchState } = calendar;
  const { isDark } = useCalendarTheme(calendarEl);

  const syncCalendarPrefixedClasses = (rootEl: HTMLElement | null) => {
    if (!rootEl) return;

    const matchCalendarPrefix = (cls: string) => {
      const matched = cls.match(/^(.+?-calendar)(?=--|__)/);
      return matched ? matched[1] : null;
    };

    const syncElement = (el: Element) => {
      if (!(el instanceof Element) || !el.classList?.length) return;

      for (const cls of el.classList) {
        const classPrefix = matchCalendarPrefix(cls);
        if (!classPrefix || classPrefix === prefixCls) continue;

        const prefixed = `${prefixCls}${cls.slice(classPrefix.length)}`;
        if (prefixed && !el.classList.contains(prefixed)) el.classList.add(prefixed);
      }
    };

    syncElement(rootEl);
    rootEl.querySelectorAll('[class]').forEach(syncElement);
  };
  const hasTimeColumn = computed(() => config.time && (view.isDay || view.isDays || view.isWeek));

  const weekNumbers = computed(() => {
    return Array(view.rows)
      .fill(0)
      .map((v, i) => {
        return dateUtils.getWeek(dateUtils.addDays(view.firstCellDate, 7 * i));
      });
  });

  const wrapperClasses = computed(() => ({
    [`${prefixCls}--ready`]: config.ready,
    [`${prefixCls}--${config.theme}-theme`]: config.theme,
    [`${prefixCls}--${config.size}`]: true,
    [`${prefixCls}--date-picker`]: config.datePicker,
    [`${prefixCls}--dark`]: isDark.value,
    [`${prefixCls}--light`]: !isDark.value,
    [`${prefixCls}--${view.id}-view`]: true,
    [`${prefixCls}--view-has-time`]: hasTimeColumn.value,
    [`${prefixCls}--timeless`]: !config.time,
    [`${prefixCls}--dragging-cell`]: touchState.isDraggingCell,
    [`${prefixCls}--dragging-event`]: touchState.isDraggingEvent,
    [`${prefixCls}--resizing-event`]: touchState.isResizingEvent,
    [`${prefixCls}--has-schedules`]: config.schedules?.length,
    [`${prefixCls}--horizontal`]: config.horizontal,
  }));

  const wrapperStyles = computed(() => ({
    [`--${prefixCls}-time-cell-size`]: config.timeCellHeight && `${config.timeCellHeight}px`,
    [`--${prefixCls}-schedules-count`]: config.schedules?.length ?? 0,
  }));

  const scrollableElClasses = computed(() => ({
    [`${prefixCls}__scrollable--row`]: hasTimeColumn.value || (config.weekNumbers && view.isMonth),
    // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
    [`${prefixCls}__scrollable--${view.id}-view`]: true,
    [`${prefixCls}__scrollable--has-schedules`]: config.schedules?.length,
    [`${prefixCls}__scrollable--no-schedules`]: !config.schedules?.length,
    [`${prefixCls}__scrollable--horizontal`]: config.horizontal,
    [`${prefixCls}__scrollable--no-all-day-bar`]: !config.allDayEvents,
    [`${prefixCls}__scrollable--has-all-day-bar`]: config.allDayEvents,
  }));

  const contextMenuHandler = (e: Event) => {
    if ((e.target as HTMLElement)?.closest(`.${prefixCls}__cell, [class$="__cell"]`))
      e.preventDefault();
  };

  const onScrollableScroll = (_ev: Event) => {
    // Scroll events are handled internally by overlayscrollbars.
    // This handler is exposed for potential custom scroll behavior.
  };

  onMounted(async () => {
    // If touch device, prevent contextmenu on the cell so we can scroll on the cell on touch devices
    // or create an event on long press.
    if (typeof window !== 'undefined' && window.hasOwnProperty('ontouchstart')) {
      calendarEl.value?.addEventListener('contextmenu', contextMenuHandler);
    }

    await nextTick();
    syncCalendarPrefixedClasses(calendarEl.value);

    config.ready = true;
    emit('ready', { config, view });
  });

  onBeforeUnmount(() => {
    calendarEl?.value?.removeEventListener('contextmenu', contextMenuHandler);
  });

  // Share the calendar object across all the Vue components.
  provide(calendarInjectionKey, calendar);
  provide(calendarElInjectionKey, calendarEl);

  defineExpose({ view: calendar.view });
</script>
