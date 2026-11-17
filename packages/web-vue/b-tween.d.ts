// b-tween 没有提供类型声明，这里补充最小可用声明。
// 注意：本文件必须是「脚本」而不是「模块」（不能有顶层 import/export），
// 否则 declare module 会变成模块增强而被忽略。
declare module 'b-tween' {
  export interface BTweenOptions {
    from: Record<string, number>;
    to: Record<string, number>;
    duration?: number;
    delay?: number;
    easing?: string;
    // keys 的具体形状由调用方决定（如 { scrollTop: number }），这里不强约束
    onUpdate?: (keys: any) => void;
    onFinish?: () => void;
    onEnd?: () => void;
  }

  export default class BTween {
    constructor(options: BTweenOptions);

    start(): void;

    stop(): void;
  }
}
