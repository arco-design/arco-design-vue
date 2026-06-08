<template>
  <div
    v-on="eventListeners"
    ref="eventEl"
    :class="[`${prefixCls}__event`, classes]"
    :style="styles"
    :draggable="isDraggable ? 'true' : undefined"
    @dragstart="isDraggable && dnd.eventDragStart($event, event)"
    @dragend="isDraggable && dnd.eventDragEnd($event, event)"
  >
    <div :class="`${prefixCls}__event-details`">
      <slot v-if="$slots['event.all-day']" name="event.all-day" :event="event"></slot>
      <slot v-else-if="$slots[`event.${view.id}`]" :name="`event.${view.id}`" :event="event"></slot>
      <slot v-else name="event" :event="event">
        <PerformantEllipsis :class="`${prefixCls}__event-title`">{{
          event.title
        }}</PerformantEllipsis>
        <div
          v-if="config.time && !inAllDayBar && !(event._.multiday && !eventStartsInThisCell)"
          :class="`${prefixCls}__event-time`"
        >
          <span v-if="view.isMonth" :class="`${prefixCls}__event-comma`">,&nbsp;</span>
          <PerformantEllipsis :class="`${prefixCls}__event-time-text`"
            ><span :class="`${prefixCls}__event-start`">{{
              event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`]
            }}</span>
            <span v-if="!view.isMonth" :class="`${prefixCls}__event-end`">
              &nbsp;-&nbsp;{{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
              <span v-if="event._.multiday && eventStartsInThisCell"
                >+{{ plusDaysIndicator }}d</span
              >
            </span></PerformantEllipsis
          >
        </div>
        <div v-if="!inAllDayBar" :class="`${prefixCls}__event-content`">
          <slot name="event-content" :event="event">{{ event.content }}</slot>
        </div>
      </slot>
    </div>
    <div v-if="isResizable" @dragstart.prevent.stop :class="`${prefixCls}__event-resizer`"></div>
    <transition :name="`${prefixCls}-delete-btn`">
      <div
        v-if="event._.deleting"
        @click.stop="event.delete(3)"
        :class="`${prefixCls}__event-delete`"
      >
        Delete
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  /**
   * This component renders an event in full in a cell if the event is not multi-day.
   * If the event is multi-day, it renders a fragment of the event only.
   */

  import {
    computed,
    inject,
    onMounted,
    reactive,
    ref,
    shallowRef,
    watch,
    onBeforeUnmount,
  } from 'vue';

  import { PerformantEllipsis } from '../../ellipsis';
  import { calendarInjectionKey } from '../context';
  import { minutesToPercentage, percentageToMinutes } from '../utils/conversions';

  const props = defineProps({
    event: { type: Object, required: true },
    inAllDayBar: { type: Boolean, default: false },
    cellStart: { type: Date, required: true },
    cellEnd: { type: Date, required: true },
  });

  const emit = defineEmits([
    'event-drag-start',
    'event-drag-end',
    'event-resize-start',
    'event-resize-end',
  ]);

  const calendar = inject(calendarInjectionKey)!;
  const { config, view, dnd, touch: globalTouchState, dateUtils, eventsManager } = calendar;
  const prefixCls = calendar.prefixCls;
  const { handleEventResize } = eventsManager;
  const eventEl = ref<HTMLElement | null>(null);
  const event = reactive(props.event);
  // Kept outside the eventListeners computed so recomputes don't orphan a pending timeout.
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;

  const touch = reactive<{
    dragging: boolean;
    fromResizer: boolean;
    holding: boolean;
    holdTimer: ReturnType<typeof setTimeout> | null;
    canTouchAndDrag: boolean | null;
    touchAndDragTimer: ReturnType<typeof setTimeout> | null;
    startX: number;
    startY: number;
    startPercentageX: number;
    startPercentageY: number;
    moveX: number;
    moveY: number;
    movePercentageX: number;
    movePercentageY: number;
    documentMouseX: number;
    documentMouseY: number;
    resizeStartDate: Date | null;
    resizingOriginalEvent: any;
    resizingLastAcceptedEvent: any;
    cellEl: HTMLElement | null;
    schedule: string | number | null;
  }>({
    dragging: false,
    fromResizer: false, // If the drag originates from the resizer element.
    holding: false, // When the event is clicked and hold for a certain amount of time.
    holdTimer: null, // event click and hold detection.
    canTouchAndDrag: null, // Wait for 500ms before allowing an event to be dragged after touchstart.
    touchAndDragTimer: null, // Timer for canTouchAndDrag.
    startX: 0, // The X coords at the start of the drag.
    startY: 0, // The Y coords at the start of the drag.
    startPercentageX: 0, // The X coords in percentage at the start of the drag.
    startPercentageY: 0, // The Y coords in percentage at the start of the drag.
    moveX: 0, // The X coords while dragging.
    moveY: 0, // The Y coords while dragging.
    movePercentageX: 0, // The X coords in percentage while dragging.
    movePercentageY: 0, // The Y coords in percentage while dragging.
    documentMouseX: 0, // Document mouse X position for horizontal resizing
    documentMouseY: 0, // Document mouse Y position for horizontal resizing
    resizeStartDate: null, // When resizing and going above the start date (end before start) update the start instead of the end.
    resizingOriginalEvent: null, // Store the original event details while resizing.
    resizingLastAcceptedEvent: null, // Store the last accepted event details while resizing.
    cellEl: null, // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
    schedule: null,
  });

  const isDraggable = computed(() => {
    return (
      config.editableEvents.drag &&
      event.draggable !== false &&
      !event.background &&
      touch.canTouchAndDrag !== false
    );
  });

  const isResizable = computed(() => {
    if (view.isMonth || view.isYear || view.isYears || props.inAllDayBar) return false;
    if (event._.multiday && !eventEndsInThisCell.value) return false;
    return (
      config.time && config.editableEvents.resize && event.resizable !== false && !event.background
    );
  });

  const isDeletable = computed(
    () => config.editableEvents.delete && event.deletable !== false && !event.background,
  );

  const classes = computed(() => {
    const isMultiday = !!event._?.multiday;
    const isHzl = config.horizontal;
    const isCutStart =
      !props.inAllDayBar &&
      (event._?.startMinutes < config.timeFrom || (isMultiday && !eventStartsInThisCell.value));

    const isCutEnd =
      !props.inAllDayBar &&
      (event._?.endMinutes > config.timeTo || (isMultiday && !eventEndsInThisCell.value));

    return {
      [`${prefixCls}__event--${event._.id}`]: true,
      [event.class]: !!event.class,
      [`${prefixCls}__event--recurring`]: !!event.recurring,
      [`${prefixCls}__event--background`]: !!event.background,
      [`${prefixCls}__event--all-day`]:
        event.allDay || (event._?.startMinutes === 0 && event._?.duration === 24 * 60),
      [`${prefixCls}__event--multiday`]: isMultiday,
      // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
      [`${prefixCls}__event--cut-top`]: !isHzl && isCutStart,
      [`${prefixCls}__event--cut-bottom`]: !isHzl && isCutEnd,
      [`${prefixCls}__event--cut-left`]: isHzl && isCutStart,
      [`${prefixCls}__event--cut-right`]: isHzl && isCutEnd,
      // Only apply the dragging class on the event copy that is being dragged.
      [`${prefixCls}__event--dragging`]: !event._.draggingGhost && event._.dragging,
      // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
      // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
      // invisible, so if dragging is false, disable the dragging-ghost class as well.
      // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
      // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
      // deletion.
      [`${prefixCls}__event--dragging-ghost`]: event._.draggingGhost,
      [`${prefixCls}__event--resizing`]: globalTouchState.isResizingEvent,
    };
  });

  const eventStartsInThisCell = computed(() => {
    if (event._.multiday) {
      return new Date(event.start).setHours(0, 0, 0, 0) === props.cellStart.getTime();
    }
    return true;
  });

  const eventEndsInThisCell = computed(() => {
    if (event._.multiday) {
      return dateUtils.isSameDate(new Date(new Date(event.end).setMilliseconds(-1)), props.cellEnd);
    }
    return true;
  });

  const plusDaysIndicator = computed(() => {
    const start = new Date(event.start).setHours(0, 0, 0, 0);
    const end = new Date(event.end).setHours(0, 0, 0, 0);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  });

  const styles = computed(() => {
    const hasPosition =
      (view.isDay || view.isDays || view.isWeek) && config.time && !props.inAllDayBar;
    const isHzl = config.horizontal;

    if (!hasPosition && !event.backgroundColor && !event.color) return false;

    const styles: { backgroundColor: any; color: any; [key: string]: any } = {
      backgroundColor: event.backgroundColor || null,
      color: event.color || null,
    };

    if (hasPosition) {
      let startMinutes = event._.startMinutes;
      let endMinutes = event._.endMinutes;

      if (event._.multiday) {
        if (!eventStartsInThisCell.value) startMinutes = 0;
        if (!eventEndsInThisCell.value) endMinutes = 24 * 60;
      }

      // Ensure that the event start and end stay in range.
      const from = Math.max(config.timeFrom, startMinutes);
      const to =
        Math.min(config.timeTo, endMinutes) + (event._.duration && !endMinutes ? 24 * 60 : 0);
      const top = minutesToPercentage(from, config);
      const height = minutesToPercentage(to, config) - top;

      styles[isHzl ? 'left' : 'top'] = `${top}%`;
      styles[isHzl ? 'width' : 'height'] = `${height}%`;
    }

    return styles;
  });

  // Automatically forwards any event listener attached to calendar starting with @event- to the
  // (calendar) event.
  // Uses shallowRef + watch instead of computed so the listeners object reference stays stable
  // unless the set of external event listeners actually changes — preventing unnecessary
  // remove/re-add of DOM event listeners via v-on on every render.
  const eventListeners = shallowRef<Record<string, any>>({});

  watch(
    () => config.eventListeners.event,
    (extListeners) => {
      const listeners: Record<string, any> = {};

      // Inject the event details in each eventListener handler call as 2nd param.
      for (const [eventListener, handler] of Object.entries(extListeners) as [
        string,
        (...args: any[]) => void,
      ][]) {
        // `event-resize-end` is handled in `onDocMouseup` in this file.
        if (!['resize-end'].includes(eventListener)) {
          listeners[eventListener] = (e: any) => {
            // SHOULD NOT PREVENT BUBBLING UP TO THE CELL WHEN INTERACTING WITH THE EVENT:
            // if we stop bubbling, we will not receive the onMouseup listened from document if
            // releasing on the event. Instead, in the cell don't call the mouseup handler if
            // releasing on the event.
            // e.stopPropagation()

            // Check if e.type to not rewrap the DOM event in an object if already done.
            // `event-drop` is handled in the drag-and-drop composable.
            if (e.type !== 'drop') handler(e.type ? { e, event } : e);
          };
        }
      }

      // Store a copy of any potential external handler to combine with internal handlers like
      // click, touchstart, mousedown.
      const externalHandlers: Record<string, any> = { ...listeners };

      listeners.touchstart = (e: any) => {
        e.stopPropagation();
        touch.touchAndDragTimer = setTimeout(() => {
          touch.canTouchAndDrag = true;
        }, 500);
        onMousedown(e);

        externalHandlers.touchstart?.({ e, event });
      };
      listeners.mousedown = (e: any) => {
        e.stopPropagation();
        onMousedown(e);

        externalHandlers.mousedown?.({ e, event });
      };

      // `event-delayed-click` is only fired after 400ms if there was no dblclick.
      listeners.click = (e: any) => {
        externalHandlers.click?.({ e, event }); // Handle single click.

        // Handle double click in eventListeners.dblclick.
        if (clickTimeout) clickTimeout = clearTimeout(clickTimeout) as unknown as null;
        else {
          clickTimeout = setTimeout(() => {
            clickTimeout = null;
            externalHandlers['delayed-click']?.({ e, event }); // Handle delayed single click.
          }, 400);
        }
      };
      listeners.dblclick = (e: any) => {
        if (externalHandlers.dblclick) externalHandlers.dblclick({ e, event });
        // Show delete button on event on double click by default except if dblclick is used
        // externally.
        else event.delete(1);
      };

      eventListeners.value = listeners;
    },
    { immediate: true },
  );

  // Cache DOM queries to avoid repeated getBoundingClientRect calls.
  let cachedRect: DOMRect | null = null;
  let rectCacheTime = 0;
  const RECT_CACHE_DURATION = 16; // ~60fps

  // On mousedown OR TOUCHSTART on the event.
  const onMousedown = (e: MouseEvent | TouchEvent) => {
    const domEvent = (e as TouchEvent).touches?.[0] || e; // Handle click or touch event.

    // If the event target is the resizer, set the resizing flag.
    touch.fromResizer = !!(domEvent as any).target?.closest(`.${prefixCls}__event-resizer`);

    // Cache getBoundingClientRect calls for better performance.
    const now = Date.now();
    if (!cachedRect || now - rectCacheTime > RECT_CACHE_DURATION) {
      cachedRect = eventEl.value!.getBoundingClientRect();
      rectCacheTime = now;
    }

    const rect = cachedRect;
    touch.startX = ((e as TouchEvent).touches?.[0] || e).clientX - rect.left; // Handle click or touch event coords.
    touch.startY = ((e as TouchEvent).touches?.[0] || e).clientY - rect.top; // Handle click or touch event coords.
    touch.startPercentageX = (touch.startX * 100) / rect.width;
    touch.startPercentageY = (touch.startY * 100) / rect.height;
    // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
    touch.cellEl = eventEl.value!.closest(`.${prefixCls}__cell`);
    // Store the event start to apply on event end when resizing and end < start.
    touch.resizeStartDate = event.start;

    if (touch.fromResizer) handleEventResize(e, event, eventEl.value!);

    touch.holdTimer = setTimeout(() => {
      touch.holding = true;
      // If there's an @event-hold external listener, call it after holding 1s.
      eventListeners.value.hold?.({ e, event });
    }, 1000);
  };

  // Register the DOM node within the event in order to emit `event-deleted` to the cell.
  onMounted(() => event._.register(eventEl.value));

  onBeforeUnmount(() => {
    // Clean up timers to prevent memory leaks.
    if (touch.holdTimer) touch.holdTimer = clearTimeout(touch.holdTimer) as unknown as null;
    if (touch.touchAndDragTimer)
      touch.touchAndDragTimer = clearTimeout(touch.touchAndDragTimer) as unknown as null;
    if (clickTimeout) clickTimeout = clearTimeout(clickTimeout) as unknown as null;

    event._.unregister();
  });
</script>
