declare module 'b-tween' {
  interface BTweenOptions {
    from: Record<string, number>;
    to: Record<string, number>;
    duration?: number;
    easing?: string;
    onUpdate?: (keys: Record<string, number>) => void;
    onFinish?: () => void;
  }

  class BTween {
    constructor(opts: BTweenOptions);
    start(): void;
  }

  export default BTween;
}
