import { CSSProperties } from 'vue';
import { TriggerEvent, TriggerPosition } from '../_utils/constant';

export type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };

export interface TriggerProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerEvent;
  position?: TriggerPosition;
  disabled?: boolean;
  popupOffset?: number;
  popupTranslate?: TriggerPopupTranslate;
  showArrow?: boolean;
  alignPoint?: boolean;
  popupHoverStay?: boolean;
  blurToClose?: boolean;
  clickToClose?: boolean;
  clickOutsideToClose?: boolean;
  unmountOnClose?: boolean;
  contentClass?: any;
  contentStyle?: CSSProperties;
  arrowClass?: any;
  arrowStyle?: CSSProperties;
  popupStyle?: CSSProperties;
  animationName?: string;
  duration?:
    | number
    | {
        enter: number;
        leave: number;
      };
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  autoFitPopupWidth?: boolean;
  autoFitPopupMinWidth?: boolean;
  autoFixPosition?: boolean;
  popupContainer?: string | HTMLElement;
  updateAtScroll?: boolean;
  autoFitPosition?: boolean;
}
