import { type Ref, ref, watch } from 'vue';

import { useMutationObserver } from '../../watermark/hooks/use-mutation-observer';

const THEME_ATTR = 'sd-theme';

/**
 * Detects the current theme mode from the nearest ancestor with `[sd-theme]` attribute.
 * Reactively updates when ThemeProvider changes the attribute.
 */
export function useCalendarTheme(calendarEl: Ref<HTMLElement | null>) {
  const isDark = ref(false);

  const resolveTheme = () => {
    if (typeof document === 'undefined') return;
    const el = calendarEl.value;
    if (!el) return;
    const ancestor = el.closest<HTMLElement>(`[${THEME_ATTR}]`);
    isDark.value = ancestor?.getAttribute(THEME_ATTR) === 'dark';
  };

  // Resolve when the element mounts / changes.
  watch(() => calendarEl.value, resolveTheme, { immediate: true });

  // Observe any sd-theme attribute change in the subtree so both local
  // and ancestor ThemeProvider mutations are caught.
  useMutationObserver(
    typeof document !== 'undefined' ? document.body : undefined,
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === THEME_ATTR) {
          resolveTheme();
          break;
        }
      }
    },
    { attributes: true, attributeFilter: [THEME_ATTR], subtree: true },
  );

  return { isDark };
}
