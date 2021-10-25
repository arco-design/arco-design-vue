export function debounce(callback: (...args: any[]) => void, delay: number) {
  let timer = 0;
  return (...args: any[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      timer = 0;
      callback(...args);
    }, delay);
  };
}
