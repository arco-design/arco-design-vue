const target = typeof window === 'undefined' ? global : window;

const raf = target.requestAnimationFrame;
const caf = target.cancelAnimationFrame;

export { raf, caf };
