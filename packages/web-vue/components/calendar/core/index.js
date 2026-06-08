import { reactive } from 'vue';

import { useDragAndDrop } from '../modules/drag-and-drop';
import { createDateUtils } from '../utils/date';
import { defaults, useConfig } from './config';
import { useEvents } from './events';
import { useView } from './view';

// Shared global reactive store: common to all the sd-calendar instances.
export const globalState = reactive({
  texts: { ...defaults.texts }, // Make texts reactive before a locale is loaded.
  dateUtils: createDateUtils(), // Date utils using the library's dayjs.
});

/**
 * This is the main composable of the calendar - the heart :)
 * It is used one single time, from the index.vue and it's inject-provided to all the components.
 *
 * GLOBAL IMPORTANT NOTES
 * ----------------------
 * - There is no (and there shouldn't be) any use of Date prototypes in the codebase: even if using them
 *   would simplify things a lot, the user may choose to disable them and nothing would work anymore.
 *
 * - Computed variables should only manage one thing (or a small group of vars) at a time:
 *   Every recomputing can become very expensive when handling a large amount of cells per view
 *   with a large amount of calendar events. So the more a computed is specific, the less it will have
 *   expensive impact.
 *   E.g. we definitely don't want that switching locale, or xs/sm prop would redraw the cells and
 *   recalculate all the events rendering in each cell.
 *
 * @param {object} props The Vue props definition from the root sd-calendar component (index.vue).
 * @param {function} emit The Vue emit function from the root sd-calendar component (index.vue).
 */
export const useCalendar = ({ props, emit, attrs, calendarEl, scrollbarRef, uid, prefixCls }) => {
  // This reactive store is the one and only source of truth.
  const state = reactive({
    uid, // The sd-calendar instance unique ID, used for dnd source-target identification.
    prefixCls,
    emit,
    texts: { ...globalState.texts }, // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Calendar instances on the same page.
    dateUtils: { ...globalState.dateUtils },
    now: new Date(),
    config: {},
    eventsManager: {},
    view: {}, // At any time this object will be filled with current view details and visible events.
    dnd: {}, // Drag and drop module.
    // stores the gesture related states. E.g. dragging event, resizing event, etc.
    touch: {
      isDraggingCell: false,
      isDraggingEvent: false,
      isResizingEvent: false,
      currentHoveredCell: null, // Track the cell currently being hovered during event resizing.
    },
  });

  state.dateUtils = createDateUtils();
  state.config = useConfig(state, props, attrs);
  state.eventsManager = useEvents(state);
  state.view = useView(state, calendarEl, scrollbarRef);
  state.dnd = useDragAndDrop(state);

  return state;
};
