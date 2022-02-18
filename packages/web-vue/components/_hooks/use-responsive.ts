import { onUnmounted, Ref, isRef, computed, onMounted } from 'vue';
import ResponsiveObserve, { Breakpoint } from '../_utils/responsive-observe';

export function useResponsive(
  breakpoint: Breakpoint | undefined | Ref<Breakpoint | undefined>,
  callback: (checked: boolean) => void
) {
  const resultBreakpoint = computed(() =>
    isRef(breakpoint) ? breakpoint.value : breakpoint
  );
  // Subscription Responsive
  let subscribeToken = '';
  onMounted(() => {
    subscribeToken = ResponsiveObserve.subscribe(
      (screens, breakpointChecked) => {
        if (!resultBreakpoint.value) return;
        if (
          !breakpointChecked ||
          breakpointChecked === resultBreakpoint.value
        ) {
          callback(!!screens[resultBreakpoint.value]);
        }
      }
    );
  });
  // Unsubscribe
  onUnmounted(() => {
    if (subscribeToken) {
      ResponsiveObserve.unsubscribe(subscribeToken);
    }
  });
}
