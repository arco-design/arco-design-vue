export type CarouselTriggerEvent = 'click' | 'hover';

export type CarouselArrowType = 'always' | 'hover' | 'never';

export type CarouselIndicatorType = 'line' | 'dot' | 'slider' | 'never';

export type CarouselIndicatorPosition =
  | 'bottom'
  | 'top'
  | 'left'
  | 'right'
  | 'outer';

export type CarouselAutoPlayConfig = {
  interval?: number;
  hoverToPause?: boolean;
};
