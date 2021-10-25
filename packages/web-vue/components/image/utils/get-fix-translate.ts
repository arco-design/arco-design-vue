export default function getFixTranslate(
  wrapperRect: DOMRect,
  imgRect: DOMRect,
  translateX: number,
  translateY: number,
  scale: number
): [number, number] {
  let fixTranslateX = translateX;
  let fixTranslateY = translateY;
  if (translateX) {
    /** img 的宽度小于 wrapper 的宽度，则不应该有位移 */
    if (wrapperRect.width > imgRect.width) {
      fixTranslateX = 0;
    } else {
      /** img 的宽度大于 wrapper 的宽度 */
      if (imgRect.left > wrapperRect.left) {
        // 左边框跑到 wrapper 范围内，则往左退到 wrapper 左侧：减少位移量
        fixTranslateX -= Math.abs(wrapperRect.left - imgRect.left) / scale;
      }
      if (imgRect.right < wrapperRect.right) {
        // 右边框跑到 wrapper 范围内，则往右退到 wrapper 右侧：增加位移量
        fixTranslateX += Math.abs(wrapperRect.right - imgRect.right) / scale;
      }
    }
  }
  if (translateY) {
    /** img 的高度度小于 wrapper 的高度度，则不应该有位移 */
    if (wrapperRect.height > imgRect.height) {
      fixTranslateY = 0;
    } else {
      /** img 的高度大于 wrapper 的高度 */
      if (imgRect.top > wrapperRect.top) {
        // 上边框跑到 wrapper 范围内，则往上退到 wrapper 上侧：减少位移量
        fixTranslateY -= Math.abs(wrapperRect.top - imgRect.top) / scale;
      }
      if (imgRect.bottom < wrapperRect.bottom) {
        // 下边框跑到 wrapper 范围内，则往下退到 wrapper 下侧：增加位移量
        fixTranslateY += Math.abs(wrapperRect.bottom - imgRect.bottom) / scale;
      }
    }
  }
  return [fixTranslateX, fixTranslateY];
}
