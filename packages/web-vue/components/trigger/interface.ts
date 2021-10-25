import { CSSProperties } from 'vue';
import { TriggerEvent, TriggerPosition } from '../_utils/constant';
import { PopupTranslate } from './utils';
import { AnimationDuration } from '../_utils/types';

export interface TriggerProps {
  popupVisible: boolean;
  defaultPopupVisible: boolean;
  trigger: TriggerEvent | TriggerEvent[];
  position: TriggerPosition;
  disabled: boolean;
  popupOffset: number;
  popupTranslate: PopupTranslate;
  showArrow: boolean;
  alignPoint: boolean;
  popupHoverStay: boolean;
  blurToClose: boolean;
  clickToClose: boolean;
  clickOutsideToClose: boolean;
  unmountOnClose: boolean;
  popupStyle: CSSProperties;
  arrowStyle: CSSProperties;
  animationName: string;
  duration: AnimationDuration;
  mouseEnterDelay: number;
  mouseLeaveDelay: number;
  focusDelay: number;
  autoFitPopupWidth: boolean;
  autoFitPopupMinWidth: boolean;
  autoFixPosition: boolean;
}
