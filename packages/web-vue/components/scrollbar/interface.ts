export interface ThumbData {
  ratio: number;
  thumbSize: number;
  max: number;
}

export interface ThumbMap {
  size: 'width' | 'height';
  direction: 'left' | 'top';
  offset: 'offsetWidth' | 'offsetHeight';
  client: 'clientX' | 'clientY';
}
