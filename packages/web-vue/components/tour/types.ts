import type { HTMLAttributes } from 'vue';

import type { ButtonProps } from '../button/interface';

export type TourAllowedButton = 'next' | 'previous' | 'close';
export type TourSide = 'left' | 'right' | 'top' | 'bottom' | 'over';
export type TourAlignment = 'start' | 'center' | 'end';

export type TourButtonKind = 'previous' | 'next' | 'done' | 'close';

export type TourButtonProps = Partial<Record<TourButtonKind, ButtonProps>>;

export type TourPopoverDom = {
  wrapper: HTMLElement | null;
  arrow: HTMLElement | null;
  title: HTMLElement | null;
  description: HTMLElement | null;
  footer: HTMLElement | null;
  previousButton: HTMLElement | null;
  nextButton: HTMLElement | null;
  closeButton: HTMLElement | null;
  footerButtons: HTMLElement | null;
  progress: HTMLElement | null;
};

export type TourStepHookOptions = {
  config: TourConfig;
  state: TourState;
  controller: TourController;
};

export type TourStepHook = (
  element: Element | undefined,
  step: TourStep | undefined,
  options: TourStepHookOptions,
) => void;

export type TourPopoverRenderHook = (popover: TourPopoverDom, options: TourStepHookOptions) => void;

export type TourOverlayClickBehavior = 'close' | 'nextStep' | TourStepHook;

export type TourPopover = {
  title?: string;
  description?: string;
  side?: TourSide;
  align?: TourAlignment;
  showButtons?: TourAllowedButton[];
  disableButtons?: TourAllowedButton[];
  showProgress?: boolean;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
  progressText?: string;
  popoverClass?: string;
  onNextClick?: TourStepHook;
  onPrevClick?: TourStepHook;
  onCloseClick?: TourStepHook;
  onPopoverRender?: TourPopoverRenderHook;
  buttonProps?: TourButtonProps;
  contentClass?: HTMLAttributes['class'];
  contentStyle?: HTMLAttributes['style'];
  titleProps?: HTMLAttributes;
  descriptionProps?: HTMLAttributes;
  footerProps?: HTMLAttributes;
};

export type TourStep = {
  element?: string | Element | (() => Element | null | undefined) | null;
  popover?: TourPopover;
  disableActiveInteraction?: boolean;
  onHighlightStarted?: TourStepHook;
  onHighlighted?: TourStepHook;
  onDeselected?: TourStepHook;
};

export type TourState = {
  isInitialized?: boolean;
  activeIndex?: number;
  activeStep?: TourStep;
  activeElement?: Element | null;
  previousStep?: TourStep;
  previousElement?: Element | null;
  popover?: TourPopoverDom;
};

export type TourConfig = {
  animate?: boolean;
  allowClose?: boolean;
  allowKeyboardControl?: boolean;
  overlayClickBehavior?: TourOverlayClickBehavior;
  overlayOpacity?: number;
  overlayColor?: string;
  smoothScroll?: boolean;
  disableActiveInteraction?: boolean;
  showProgress?: boolean;
  stagePadding?: number;
  stageRadius?: number;
  popoverOffset?: number;
  showButtons?: TourAllowedButton[];
  disableButtons?: TourAllowedButton[];
  prevBtnText?: string;
  nextBtnText?: string;
  doneBtnText?: string;
  progressText?: string;
  popoverClass?: string;
  buttonProps?: TourButtonProps;
  onHighlightStarted?: TourStepHook;
  onHighlighted?: TourStepHook;
  onDeselected?: TourStepHook;
  onDestroyed?: TourStepHook;
  onDestroyStarted?: TourStepHook;
  onPopoverRender?: TourPopoverRenderHook;
  onNextClick?: TourStepHook;
  onPrevClick?: TourStepHook;
  onCloseClick?: TourStepHook;
};

export type TourController = {
  isActive: () => boolean;
  refresh: () => void;
  drive: (stepIndex?: number) => void;
  setConfig: (config: TourConfig) => void;
  setSteps: (steps: TourStep[]) => void;
  getConfig: () => TourConfig;
  getState: () => TourState;
  getActiveIndex: () => number | undefined;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  getActiveStep: () => TourStep | undefined;
  getActiveElement: () => Element | null;
  getPreviousElement: () => Element | null;
  getPreviousStep: () => TourStep | undefined;
  moveNext: () => void;
  movePrevious: () => void;
  moveTo: (stepIndex: number) => void;
  hasNextStep: () => boolean;
  hasPreviousStep: () => boolean;
  highlight: (step: TourStep) => void;
  destroy: () => void;
};

export type TourExpose = {
  drive: (stepIndex?: number) => Promise<void>;
  moveNext: () => void;
  movePrevious: () => void;
  moveTo: (stepIndex: number) => void;
  highlight: (step: TourStep) => void;
  destroy: () => void;
  refresh: () => void;
  isActive: () => boolean;
  getController: () => TourController | null;
  getState: () => TourState | undefined;
};

export type TourBaseProps = {
  visible?: boolean;
  defaultVisible?: boolean;
  current?: number;
  defaultCurrent?: number;
  steps?: TourStep[];
  zIndex?: number;
};

export type TourProps = TourBaseProps & TourConfig;
