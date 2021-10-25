import { InjectionKey } from 'vue';

export type VItem = { uid: number };

export interface CarouselContext {
  addItem: (item: VItem) => void;
  removeItem: (uid: number) => void;
  slideTo: (info: {
    targetIndex: number;
    isNegative: boolean;
    isManual: boolean;
  }) => void;
  mergedIndexes: {
    mergedIndex: number;
    mergedPrevIndex: number;
    mergedNextIndex: number;
  };
  previousIndex: number | null;
  animationName: string;
  slideDirection: string | null;
  items: VItem[];
  transitionTimingFunction: string;
  moveSpeed: number;
}

export const carouselInjectionKey: InjectionKey<CarouselContext> =
  Symbol('ArcoCarousel');
