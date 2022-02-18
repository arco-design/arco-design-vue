const target = typeof window === 'undefined' ? global : window;

export function debounce(callback: (...args: any[]) => void, delay: number) {
  let timer = 0;
  return (...args: any[]) => {
    if (timer) {
      target.clearTimeout(timer);
    }
    timer = target.setTimeout(() => {
      timer = 0;
      callback(...args);
    }, delay) as unknown as number;
  };
}
