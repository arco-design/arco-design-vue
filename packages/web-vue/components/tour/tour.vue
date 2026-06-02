<template>
  <slot />

  <Teleport to="body">
    <template v-if="mounted && isActive && activeRect && activeStep">
      <svg
        :class="[overlayClass, { [overlayAnimatedClass]: mergedConfig.animate !== false }]"
        :style="overlayStyle"
        :viewBox="`0 0 ${viewport.width} ${viewport.height}`"
        fill-rule="evenodd"
        clip-rule="evenodd"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin slice"
        version="1.1"
      >
        <path
          :d="overlayPath"
          :fill="mergedConfig.overlayColor ?? '#000'"
          :opacity="`${mergedConfig.overlayOpacity ?? 0.7}`"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>

      <dialog
        open
        :class="popoverShellClass"
        :style="popoverShellStyle"
        :aria-labelledby="popoverTitleId"
        :aria-describedby="popoverDescriptionId"
      >
        <Motion
          ref="popoverRef"
          :class="popoverClasses"
          :style="popoverStyle"
          :layout="true"
          :initial="motionState.initial"
          :animate="motionState.animate"
          :transition="motionState.transition"
        >
          <Button
            v-if="showCloseButton"
            ref="closeButtonVmRef"
            v-bind="closeButtonProps"
            :class="`${prefixCls}-popover-close-btn`"
            :disabled="isButtonDisabled('close')"
            @click="handleCloseButtonClick"
          >
            <slot
              name="close-button"
              :step="activeStep"
              :current="activeIndex"
              :controller="controllerRef"
              :state="tourState"
            >
              ×
            </slot>
          </Button>

          <div ref="arrowRef" :class="[`${prefixCls}-popover-arrow`, arrowClasses]"></div>

          <div
            :class="`${prefixCls}-content`"
            v-bind="resolvedPopover.contentProps"
            :style="resolvedPopover.contentStyle"
          >
            <header
              v-if="hasTitle"
              :id="popoverTitleId"
              ref="titleRef"
              :class="`${prefixCls}-popover-title`"
              v-bind="resolvedPopover.titleProps"
            >
              <slot
                name="title"
                :step="activeStep"
                :current="activeIndex"
                :title="resolvedPopover.title"
                :controller="controllerRef"
                :state="tourState"
              >
                {{ resolvedPopover.title }}
              </slot>
            </header>

            <div
              v-if="hasDescription"
              :id="popoverDescriptionId"
              ref="descriptionRef"
              :class="`${prefixCls}-popover-description`"
              v-bind="resolvedPopover.descriptionProps"
            >
              <slot
                name="description"
                :step="activeStep"
                :current="activeIndex"
                :description="resolvedPopover.description"
                :controller="controllerRef"
                :state="tourState"
              >
                {{ resolvedPopover.description }}
              </slot>
            </div>
          </div>

          <footer
            v-if="showFooter"
            ref="footerRef"
            :class="`${prefixCls}-popover-footer`"
            v-bind="resolvedPopover.footerProps"
          >
            <div
              ref="progressRef"
              :class="`${prefixCls}-popover-progress-text`"
              :style="progressVisibilityStyle"
            >
              <slot
                name="progress"
                :step="activeStep"
                :current="displayCurrent"
                :total="displayTotal"
                :text="progressText"
                :controller="controllerRef"
                :state="tourState"
              >
                {{ progressText }}
              </slot>
            </div>

            <div ref="footerButtonsRef" :class="`${prefixCls}-popover-navigation-btns`">
              <slot
                name="footer"
                :step="activeStep"
                :current="activeIndex"
                :is-first="isFirstStep"
                :is-last="isLastStep"
                :move-next="moveNext"
                :move-previous="movePrevious"
                :close="closeTour"
                :controller="controllerRef"
                :state="tourState"
              >
                <Button
                  v-if="showPreviousButton"
                  ref="previousButtonVmRef"
                  v-bind="previousButtonProps"
                  :class="`${prefixCls}-popover-prev-btn`"
                  :disabled="isButtonDisabled('previous')"
                  @click="handlePreviousButtonClick"
                >
                  <slot
                    name="previous-button"
                    :step="activeStep"
                    :current="activeIndex"
                    :text="previousButtonText"
                    :controller="controllerRef"
                    :state="tourState"
                  >
                    {{ previousButtonText }}
                  </slot>
                </Button>

                <Button
                  v-if="showNextButton"
                  ref="nextButtonVmRef"
                  v-bind="nextButtonProps"
                  :class="`${prefixCls}-popover-next-btn`"
                  :disabled="isButtonDisabled('next')"
                  @click="handleNextButtonClick"
                >
                  <slot
                    name="next-button"
                    :step="activeStep"
                    :current="activeIndex"
                    :is-last="isLastStep"
                    :text="nextButtonText"
                    :controller="controllerRef"
                    :state="tourState"
                  >
                    {{ nextButtonText }}
                  </slot>
                </Button>
              </slot>
            </div>
          </footer>
        </Motion>
      </dialog>
    </template>
  </Teleport>
</template>

<script lang="ts" setup>
  import type {
    CSSProperties,
    ComponentPublicInstance,
    HTMLAttributes,
    PropType,
    VNodeChild,
  } from 'vue';
  import {
    Teleport,
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    shallowRef,
    useSlots,
    watch,
  } from 'vue';

  import {
    unrefElement,
    useElementBounding,
    useEventListener,
    useResizeObserver,
    useWindowSize,
  } from '@vueuse/core';
  import { Motion } from 'motion-v';

  import type { ButtonProps } from '../button/interface';
  import type {
    TourAllowedButton,
    TourButtonKind,
    TourButtonProps,
    TourConfig,
    TourController,
    TourExpose,
    TourOverlayClickBehavior,
    TourPopover,
    TourPopoverDom,
    TourState,
    TourStep,
    TourStepHook,
  } from './types';

  import usePopupManager from '../_hooks/use-popup-manager';
  import { getPrefixCls } from '../_utils/global-config';
  import Button from '../button';

  defineOptions({
    name: 'Tour',
    inheritAttrs: false,
  });

  const DEFAULT_SHOW_BUTTONS: TourAllowedButton[] = ['next', 'previous', 'close'];
  const DEFAULT_PREVIOUS_TEXT = '上一步';
  const DEFAULT_NEXT_TEXT = '下一步';
  const DEFAULT_DONE_TEXT = '完成';
  const DEFAULT_PROGRESS_TEXT = '{{current}} / {{total}}';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    current: {
      type: Number,
      default: undefined,
    },
    defaultCurrent: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array as PropType<TourStep[]>,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: undefined,
    },
    animate: {
      type: Boolean,
      default: undefined,
    },
    allowClose: {
      type: Boolean,
      default: undefined,
    },
    allowKeyboardControl: {
      type: Boolean,
      default: undefined,
    },
    overlayClickBehavior: {
      type: [String, Function] as PropType<TourOverlayClickBehavior>,
      default: undefined,
    },
    overlayOpacity: {
      type: Number,
      default: undefined,
    },
    overlayColor: {
      type: String,
      default: undefined,
    },
    smoothScroll: {
      type: Boolean,
      default: undefined,
    },
    disableActiveInteraction: {
      type: Boolean,
      default: undefined,
    },
    showProgress: {
      type: Boolean,
      default: undefined,
    },
    stagePadding: {
      type: Number,
      default: undefined,
    },
    stageRadius: {
      type: Number,
      default: undefined,
    },
    popoverOffset: {
      type: Number,
      default: undefined,
    },
    showButtons: {
      type: Array as PropType<TourAllowedButton[]>,
      default: undefined,
    },
    disableButtons: {
      type: Array as PropType<TourAllowedButton[]>,
      default: undefined,
    },
    prevBtnText: {
      type: String,
      default: undefined,
    },
    nextBtnText: {
      type: String,
      default: undefined,
    },
    doneBtnText: {
      type: String,
      default: undefined,
    },
    progressText: {
      type: String,
      default: undefined,
    },
    popoverClass: {
      type: String,
      default: undefined,
    },
    buttonProps: {
      type: Object as PropType<TourButtonProps>,
      default: undefined,
    },
    onHighlightStarted: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onHighlighted: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onDeselected: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onDestroyed: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onDestroyStarted: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onPopoverRender: {
      type: Function as PropType<
        (
          popover: TourPopoverDom,
          options: { config: TourConfig; state: TourState; controller: TourController },
        ) => void
      >,
      default: undefined,
    },
    onNextClick: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onPrevClick: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
    onCloseClick: {
      type: Function as PropType<TourStepHook>,
      default: undefined,
    },
  });

  const emit = defineEmits<{
    'update:visible': [visible: boolean];
    'visibleChange': [visible: boolean];
    'update:current': [current: number];
    'change': [current: number, previous: number];
    'close': [current: number | undefined];
  }>();

  defineSlots<{
    'default'?: () => VNodeChild;
    'title'?: (props: {
      step: TourStep;
      current: number | undefined;
      title: string | undefined;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'description'?: (props: {
      step: TourStep;
      current: number | undefined;
      description: string | undefined;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'progress'?: (props: {
      step: TourStep;
      current: number;
      total: number;
      text: string;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'footer'?: (props: {
      step: TourStep;
      current: number | undefined;
      isFirst: boolean;
      isLast: boolean;
      moveNext: () => void;
      movePrevious: () => void;
      close: () => void;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'previous-button'?: (props: {
      step: TourStep;
      current: number | undefined;
      text: string;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'next-button'?: (props: {
      step: TourStep;
      current: number | undefined;
      isLast: boolean;
      text: string;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
    'close-button'?: (props: {
      step: TourStep;
      current: number | undefined;
      controller: TourController;
      state: TourState;
    }) => VNodeChild;
  }>();

  const slots = useSlots();
  const prefixCls = getPrefixCls('tour');
  const overlayClass = `${prefixCls}-overlay`;
  const overlayAnimatedClass = `${prefixCls}-overlay-animated`;
  const popoverShellClass = `${prefixCls}-popover-shell`;
  const popoverTitleId = `${prefixCls}-popover-title`;
  const popoverDescriptionId = `${prefixCls}-popover-description`;
  const popoverContentId = `${prefixCls}-popover-content`;
  const activeElementClass = `${prefixCls}-active-element`;
  const noInteractionClass = `${prefixCls}-no-interaction`;
  const activeBodyClass = `${prefixCls}-active`;
  const fadeBodyClass = `${prefixCls}-fade`;
  const staticBodyClass = `${prefixCls}-static`;
  const dummyElementId = `${prefixCls}-dummy-element`;
  const internalVisible = shallowRef(props.defaultVisible);
  const internalCurrent = shallowRef(props.defaultCurrent);
  const configOverride = shallowRef<TourConfig>({});
  const stepOverride = shallowRef<TourStep[] | null>(null);
  const highlightedStep = shallowRef<TourStep | null>(null);
  const activeIndex = shallowRef<number | undefined>(undefined);
  const activeStep = shallowRef<TourStep | undefined>(undefined);
  const activeElement = shallowRef<HTMLElement | null>(null);
  const previousStep = shallowRef<TourStep | undefined>(undefined);
  const previousElement = shallowRef<HTMLElement | null>(null);
  const activeRect = shallowRef<DOMRect | null>(null);
  const mounted = shallowRef(false);
  const isInitialized = shallowRef(false);
  const activeOnDestroyed = shallowRef<HTMLElement | null>(null);
  const popoverRef = shallowRef<HTMLElement | ComponentPublicInstance | null>(null);
  const arrowRef = shallowRef<HTMLElement | null>(null);
  const titleRef = shallowRef<HTMLElement | null>(null);
  const descriptionRef = shallowRef<HTMLElement | null>(null);
  const footerRef = shallowRef<HTMLElement | null>(null);
  const previousButtonVmRef = shallowRef<ComponentPublicInstance | null>(null);
  const nextButtonVmRef = shallowRef<ComponentPublicInstance | null>(null);
  const closeButtonVmRef = shallowRef<ComponentPublicInstance | null>(null);
  const footerButtonsRef = shallowRef<HTMLElement | null>(null);
  const progressRef = shallowRef<HTMLElement | null>(null);
  const { width: viewportWidth, height: viewportHeight } = useWindowSize();
  const viewport = computed(() => ({
    width: viewportWidth.value,
    height: viewportHeight.value,
  }));

  const mergedVisible = computed(() => props.visible ?? internalVisible.value);
  const { zIndex: dialogZIndex, close: releaseDialogLayer } = usePopupManager('dialog', {
    visible: mergedVisible,
  });
  const mergedZIndex = computed(() => {
    if (typeof props.zIndex === 'number' && !Number.isNaN(props.zIndex)) {
      return props.zIndex;
    }

    return dialogZIndex.value > 0 ? dialogZIndex.value - 1 : 1000;
  });
  const mergedSteps = computed(() => stepOverride.value ?? props.steps);
  const userConfig = computed<TourConfig>(() => {
    return Object.fromEntries(
      Object.entries({
        animate: props.animate,
        allowClose: props.allowClose,
        allowKeyboardControl: props.allowKeyboardControl,
        overlayClickBehavior: props.overlayClickBehavior,
        overlayOpacity: props.overlayOpacity,
        overlayColor: props.overlayColor,
        smoothScroll: props.smoothScroll,
        disableActiveInteraction: props.disableActiveInteraction,
        showProgress: props.showProgress,
        stagePadding: props.stagePadding,
        stageRadius: props.stageRadius,
        popoverOffset: props.popoverOffset,
        showButtons: props.showButtons,
        disableButtons: props.disableButtons,
        prevBtnText: props.prevBtnText,
        nextBtnText: props.nextBtnText,
        doneBtnText: props.doneBtnText,
        progressText: props.progressText,
        popoverClass: props.popoverClass,
        buttonProps: props.buttonProps,
        onHighlightStarted: props.onHighlightStarted,
        onHighlighted: props.onHighlighted,
        onDeselected: props.onDeselected,
        onDestroyed: props.onDestroyed,
        onDestroyStarted: props.onDestroyStarted,
        onPopoverRender: props.onPopoverRender,
        onNextClick: props.onNextClick,
        onPrevClick: props.onPrevClick,
        onCloseClick: props.onCloseClick,
      }).filter(([, value]) => value !== undefined),
    ) as TourConfig;
  });
  const mergedConfig = computed<TourConfig>(() => {
    const override = configOverride.value;

    return {
      animate: true,
      allowClose: true,
      allowKeyboardControl: true,
      overlayClickBehavior: 'close',
      overlayOpacity: 0.7,
      smoothScroll: false,
      disableActiveInteraction: false,
      showProgress: false,
      stagePadding: 10,
      stageRadius: 5,
      popoverOffset: 10,
      showButtons: DEFAULT_SHOW_BUTTONS,
      disableButtons: [],
      overlayColor: '#000',
      prevBtnText: DEFAULT_PREVIOUS_TEXT,
      nextBtnText: DEFAULT_NEXT_TEXT,
      doneBtnText: DEFAULT_DONE_TEXT,
      progressText: DEFAULT_PROGRESS_TEXT,
      ...userConfig.value,
      ...override,
    };
  });
  const isActive = computed(
    () => isInitialized.value && Boolean(activeStep.value && activeRect.value),
  );
  const isFirstStep = computed(() => activeIndex.value === 0);
  const isLastStep = computed(() => {
    if (highlightedStep.value) {
      return true;
    }

    const steps = mergedSteps.value;
    return typeof activeIndex.value === 'number' && activeIndex.value === steps.length - 1;
  });
  const displayCurrent = computed(() =>
    typeof activeIndex.value === 'number' ? activeIndex.value + 1 : 1,
  );
  const displayTotal = computed(() =>
    highlightedStep.value ? 1 : Math.max(mergedSteps.value.length, 1),
  );
  const popoverElement = computed(() => getElementFromRef(popoverRef.value));
  const {
    x: activeX,
    y: activeY,
    width: activeWidth,
    height: activeHeight,
    update: updateActiveBounding,
  } = useElementBounding(activeElement, {
    immediate: true,
    windowResize: true,
    windowScroll: true,
    updateTiming: 'next-frame',
  });

  const getComponentElement = (instance: ComponentPublicInstance | null) => {
    if (!instance) {
      return null;
    }

    const element = instance.$el;
    return element instanceof HTMLElement ? element : null;
  };

  const getElementFromRef = (value: HTMLElement | ComponentPublicInstance | null) => {
    const element = unrefElement(value);
    return element instanceof HTMLElement ? element : null;
  };

  const popoverDom = computed<TourPopoverDom>(() => ({
    wrapper: getElementFromRef(popoverRef.value),
    arrow: arrowRef.value,
    title: titleRef.value,
    description: descriptionRef.value,
    footer: footerRef.value,
    previousButton: getComponentElement(previousButtonVmRef.value),
    nextButton: getComponentElement(nextButtonVmRef.value),
    closeButton: getComponentElement(closeButtonVmRef.value),
    footerButtons: footerButtonsRef.value,
    progress: progressRef.value,
  }));

  const tourState = computed<TourState>(() => ({
    isInitialized: isInitialized.value,
    activeIndex: activeIndex.value,
    activeStep: activeStep.value,
    activeElement: activeElement.value,
    previousStep: previousStep.value,
    previousElement: previousElement.value,
    popover: popoverDom.value,
  }));

  const resolvedPopover = computed(() => {
    const popover = activeStep.value?.popover ?? {};
    const contentProps = normalizeElementProps(popover.contentClass, popover.contentStyle);
    const titleProps = normalizeHtmlProps(popover.titleProps);
    const descriptionProps = normalizeHtmlProps(popover.descriptionProps);
    const footerProps = normalizeHtmlProps(popover.footerProps);

    return {
      ...popover,
      contentProps,
      contentStyle: contentProps.style,
      titleProps,
      descriptionProps,
      footerProps,
    };
  });
  const hasTitle = computed(() => Boolean(resolvedPopover.value.title || slots.title));
  const hasDescription = computed(() =>
    Boolean(resolvedPopover.value.description || slots.description),
  );

  const resolvedShowButtons = computed<TourAllowedButton[]>(() => {
    const popoverButtons = resolvedPopover.value.showButtons;
    const configButtons = mergedConfig.value.showButtons ?? DEFAULT_SHOW_BUTTONS;
    const sourceButtons = popoverButtons?.length ? popoverButtons : configButtons;
    const allowClose = mergedConfig.value.allowClose !== false;

    return ['previous', 'next', ...(allowClose ? ['close'] : [])].filter((button) => {
      return !sourceButtons?.length || sourceButtons.includes(button as TourAllowedButton);
    }) as TourAllowedButton[];
  });

  const resolvedDisableButtons = computed<TourAllowedButton[]>(() => {
    const disabledButtons = [
      ...(mergedConfig.value.disableButtons ?? []),
      ...(resolvedPopover.value.disableButtons ?? []),
    ];

    if (isFirstStep.value) {
      disabledButtons.push('previous');
    }

    return Array.from(new Set(disabledButtons));
  });

  const showProgress = computed(() => {
    return resolvedPopover.value.showProgress ?? mergedConfig.value.showProgress ?? false;
  });
  const showCloseButton = computed(() => resolvedShowButtons.value.includes('close'));
  const showPreviousButton = computed(() => resolvedShowButtons.value.includes('previous'));
  const showNextButton = computed(() => resolvedShowButtons.value.includes('next'));
  const showFooter = computed(() => {
    if (slots.footer) {
      return true;
    }

    return (
      showProgress.value ||
      showCloseButton.value ||
      showPreviousButton.value ||
      showNextButton.value
    );
  });
  const progressVisibilityStyle = computed<CSSProperties>(() => ({
    display: showProgress.value ? 'block' : 'none',
  }));
  const previousButtonText = computed(() => {
    return (
      resolvedPopover.value.prevBtnText ?? mergedConfig.value.prevBtnText ?? DEFAULT_PREVIOUS_TEXT
    );
  });
  const nextButtonText = computed(() => {
    if (isLastStep.value) {
      return (
        resolvedPopover.value.doneBtnText ?? mergedConfig.value.doneBtnText ?? DEFAULT_DONE_TEXT
      );
    }

    return resolvedPopover.value.nextBtnText ?? mergedConfig.value.nextBtnText ?? DEFAULT_NEXT_TEXT;
  });
  const progressText = computed(() => {
    const template =
      resolvedPopover.value.progressText ??
      mergedConfig.value.progressText ??
      DEFAULT_PROGRESS_TEXT;
    return template
      .replaceAll('{{current}}', `${displayCurrent.value}`)
      .replaceAll('{{total}}', `${displayTotal.value}`)
      .replaceAll('{current}', `${displayCurrent.value}`)
      .replaceAll('{total}', `${displayTotal.value}`);
  });
  const previousButtonProps = computed(() => mergeButtonProps('previous', { type: 'secondary' }));
  const nextButtonProps = computed(() =>
    mergeButtonProps(isLastStep.value ? 'done' : 'next', { type: 'primary' }),
  );
  const closeButtonProps = computed(() =>
    mergeButtonProps('close', { type: 'text', htmlType: 'button' }),
  );
  const popoverClasses = computed(() => {
    return [
      `${prefixCls}-popover`,
      mergedConfig.value.popoverClass,
      resolvedPopover.value.popoverClass,
    ]
      .filter(Boolean)
      .join(' ');
  });
  const overlayStyle = computed<CSSProperties>(() => ({
    zIndex: `${mergedZIndex.value}`,
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    strokeLinejoin: 'round',
    strokeMiterlimit: '2',
  }));
  const overlayPath = computed(() => {
    if (!activeRect.value) {
      return '';
    }

    return buildOverlayPath(
      activeRect.value,
      viewport.value,
      mergedConfig.value.stagePadding ?? 0,
      mergedConfig.value.stageRadius ?? 0,
    );
  });
  const popoverPlacement = shallowRef<{ side: TourPopover['side']; align: TourPopover['align'] }>({
    side: 'bottom',
    align: 'start',
  });
  const popoverShellStyle = shallowRef<CSSProperties>({ zIndex: `${mergedZIndex.value + 1}` });
  const popoverStyle = shallowRef<CSSProperties>({ zIndex: `${mergedZIndex.value + 1}` });
  const motionState = {
    initial: { opacity: 0, scale: 0.92, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 28,
      mass: 0.9,
      layout: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.85,
      },
    },
  } as const;
  const arrowClasses = computed(() => {
    return [
      popoverPlacement.value.side
        ? `${prefixCls}-popover-arrow-side-${popoverPlacement.value.side}`
        : '',
      popoverPlacement.value.align
        ? `${prefixCls}-popover-arrow-align-${popoverPlacement.value.align}`
        : '',
      popoverPlacement.value.side ? '' : `${prefixCls}-popover-arrow-none`,
    ];
  });

  const normalizeIndex = (value: number | undefined) => {
    const steps = mergedSteps.value;
    if (!steps.length) {
      return 0;
    }

    if (typeof value !== 'number' || Number.isNaN(value)) {
      return 0;
    }

    return Math.min(Math.max(value, 0), steps.length - 1);
  };

  const syncVisible = (value: boolean) => {
    if (internalVisible.value !== value) {
      internalVisible.value = value;
    }

    emit('update:visible', value);
    emit('visibleChange', value);
  };

  const syncCurrent = (value: number | undefined) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return;
    }

    const normalized = normalizeIndex(value);
    const previous = internalCurrent.value;
    internalCurrent.value = normalized;

    if (previous !== normalized) {
      emit('update:current', normalized);
      emit('change', normalized, previous);
    }
  };

  function normalizeHtmlProps(propsValue?: HTMLAttributes) {
    return propsValue ?? {};
  }

  function normalizeElementProps(
    className?: HTMLAttributes['class'],
    style?: HTMLAttributes['style'],
  ) {
    const normalized: HTMLAttributes = {};

    if (className) {
      normalized.class = className;
    }

    if (style) {
      normalized.style = style;
    }

    return normalized;
  }

  function mergeButtonProps(
    kind: TourButtonKind,
    fallback: Partial<ButtonProps>,
  ): Partial<ButtonProps> {
    return {
      size: 'small',
      ...(kind === 'close' ? { type: 'text' } : {}),
      ...fallback,
      ...mergedConfig.value.buttonProps?.[kind],
      ...resolvedPopover.value.buttonProps?.[kind],
    };
  }

  function getActiveHookOptions(): {
    config: TourConfig;
    state: TourState;
    controller: TourController;
  } {
    return {
      config: mergedConfig.value,
      state: tourState.value,
      controller: controllerRef.value,
    };
  }

  function invokeHook(
    hook: TourStepHook | undefined,
    element: Element | undefined,
    step: TourStep | undefined,
  ) {
    hook?.(element, step, getActiveHookOptions());
  }

  function invokePopoverRender() {
    const hook = resolvedPopover.value.onPopoverRender ?? mergedConfig.value.onPopoverRender;
    hook?.(popoverDom.value, getActiveHookOptions());
  }

  function ensureDummyElement() {
    if (typeof document === 'undefined') {
      return null;
    }

    const existing = document.getElementById(dummyElementId);
    if (existing instanceof HTMLElement) {
      return existing;
    }

    const element = document.createElement('div');
    element.id = dummyElementId;
    element.style.width = '0';
    element.style.height = '0';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0';
    element.style.position = 'fixed';
    element.style.top = '50%';
    element.style.left = '50%';
    document.body.appendChild(element);
    return element;
  }

  function resolveStepElement(step: TourStep) {
    if (typeof document === 'undefined') {
      return null;
    }

    const rawElement = step.element;

    if (typeof rawElement === 'function') {
      const resolved = rawElement();
      return resolved instanceof HTMLElement ? resolved : ensureDummyElement();
    }

    if (typeof rawElement === 'string') {
      const resolved = document.querySelector(rawElement);
      return resolved instanceof HTMLElement ? resolved : ensureDummyElement();
    }

    if (rawElement instanceof HTMLElement) {
      return rawElement;
    }

    return ensureDummyElement();
  }

  function focusFirstInteractive() {
    const candidates = [
      getComponentElement(previousButtonVmRef.value),
      getComponentElement(nextButtonVmRef.value),
      getComponentElement(closeButtonVmRef.value),
      activeElement.value,
    ].filter((item): item is HTMLElement => Boolean(item && !item.hasAttribute('disabled')));

    candidates[0]?.focus();
  }

  function clearElementState(element: HTMLElement | null) {
    if (!element) {
      return;
    }

    element.classList.remove(activeElementClass, noInteractionClass);
    element.style.removeProperty('--sd-tour-active-z-index');
    element.removeAttribute('aria-haspopup');
    element.removeAttribute('aria-expanded');
    element.removeAttribute('aria-controls');
  }

  function applyElementState(element: HTMLElement, step: TourStep) {
    clearElementState(element);
    const disableInteraction =
      step.disableActiveInteraction ?? mergedConfig.value.disableActiveInteraction;
    element.classList.add(activeElementClass);
    if (disableInteraction) {
      element.classList.add(noInteractionClass);
    }
    element.style.setProperty('--sd-tour-active-z-index', `${mergedZIndex.value + 1}`);
    element.setAttribute('aria-haspopup', 'dialog');
    element.setAttribute('aria-expanded', 'true');
    element.setAttribute('aria-controls', popoverContentId);
  }

  async function updateLayout() {
    if (!activeElement.value) {
      return;
    }

    await nextTick();
    activeRect.value = activeElement.value.getBoundingClientRect();
    updateActiveBounding();
    await nextTick();
    placePopover();
  }

  function teardown(
    triggerCloseEvent: boolean,
    currentStepIndex: number | undefined,
    previousActiveStep = activeStep.value,
  ) {
    const element = activeElement.value;

    clearElementState(element);
    previousElement.value = element;
    previousStep.value = previousActiveStep;
    activeElement.value = null;
    activeStep.value = undefined;
    activeRect.value = null;
    activeIndex.value = undefined;
    highlightedStep.value = null;
    isInitialized.value = false;

    syncVisible(false);
    mergedConfig.value.onDestroyed?.(
      element ?? undefined,
      previousActiveStep,
      getActiveHookOptions(),
    );

    if (triggerCloseEvent) {
      emit('close', currentStepIndex);
    }

    activeOnDestroyed.value?.focus();
    activeOnDestroyed.value = null;
  }

  function requestDestroy(allowGuard = true) {
    const currentStepIndex = activeIndex.value;
    const step = activeStep.value;
    const element = activeElement.value;

    if (allowGuard && mergedConfig.value.onDestroyStarted) {
      mergedConfig.value.onDestroyStarted(element ?? undefined, step, getActiveHookOptions());
      return;
    }

    if (step) {
      invokeHook(step.onDeselected ?? mergedConfig.value.onDeselected, element ?? undefined, step);
    }

    teardown(true, currentStepIndex, step);
  }

  async function activateStep(step: TourStep, stepIndex?: number) {
    const element = resolveStepElement(step);
    if (!element) {
      return;
    }

    const previousActiveStep = activeStep.value;
    const previousActiveElement = activeElement.value;

    if (previousActiveStep && previousActiveElement && previousActiveElement !== element) {
      invokeHook(
        previousActiveStep.onDeselected ?? mergedConfig.value.onDeselected,
        previousActiveElement,
        previousActiveStep,
      );
      clearElementState(previousActiveElement);
    }

    activeOnDestroyed.value ??=
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousStep.value = previousActiveStep;
    previousElement.value = previousActiveElement;
    activeStep.value = step;
    activeElement.value = element;
    activeIndex.value = stepIndex;
    isInitialized.value = true;
    syncVisible(true);
    if (typeof stepIndex === 'number') {
      syncCurrent(stepIndex);
    }

    invokeHook(step.onHighlightStarted ?? mergedConfig.value.onHighlightStarted, element, step);

    if (mergedConfig.value.smoothScroll) {
      element.scrollIntoView?.({ behavior: 'smooth', block: 'center', inline: 'center' });
    } else {
      element.scrollIntoView?.({ behavior: 'auto', block: 'center', inline: 'center' });
    }

    applyElementState(element, step);
    await updateLayout();
    await nextTick();
    invokeHook(step.onHighlighted ?? mergedConfig.value.onHighlighted, element, step);
    invokePopoverRender();
    focusFirstInteractive();
  }

  async function driveTo(stepIndex = props.current ?? internalCurrent.value) {
    if (!mergedSteps.value.length) {
      return;
    }

    highlightedStep.value = null;
    const targetIndex = normalizeIndex(stepIndex);
    await activateStep(mergedSteps.value[targetIndex], targetIndex);
  }

  function isButtonDisabled(button: TourAllowedButton) {
    return resolvedDisableButtons.value.includes(button);
  }

  function moveTo(stepIndex: number) {
    if (!mergedSteps.value.length) {
      return;
    }

    void driveTo(stepIndex);
  }

  function movePrevious() {
    if (typeof activeIndex.value !== 'number') {
      return;
    }

    const nextIndex = activeIndex.value - 1;
    if (nextIndex < 0) {
      requestDestroy();
      return;
    }

    moveTo(nextIndex);
  }

  function moveNext() {
    if (highlightedStep.value) {
      requestDestroy();
      return;
    }

    if (typeof activeIndex.value !== 'number') {
      return;
    }

    const nextIndex = activeIndex.value + 1;
    if (mergedSteps.value[nextIndex]) {
      moveTo(nextIndex);
      return;
    }

    requestDestroy();
  }

  async function highlight(step: TourStep) {
    highlightedStep.value = step;
    await activateStep(
      {
        ...step,
        popover: {
          ...step.popover,
          showButtons: [],
          showProgress: false,
          progressText: '',
        },
      },
      undefined,
    );
  }

  function closeTour() {
    requestDestroy();
  }

  function closeTourForce() {
    requestDestroy(false);
  }

  function resolveHook(hook: TourStepHook | undefined) {
    return hook;
  }

  function handlePreviousButtonClick() {
    if (isButtonDisabled('previous')) {
      return;
    }

    const hook = resolveHook(resolvedPopover.value.onPrevClick ?? mergedConfig.value.onPrevClick);
    if (hook) {
      hook(activeElement.value ?? undefined, activeStep.value, getActiveHookOptions());
      return;
    }

    movePrevious();
  }

  function handleNextButtonClick() {
    if (isButtonDisabled('next')) {
      return;
    }

    const hook = resolveHook(resolvedPopover.value.onNextClick ?? mergedConfig.value.onNextClick);
    if (hook) {
      hook(activeElement.value ?? undefined, activeStep.value, getActiveHookOptions());
      return;
    }

    moveNext();
  }

  function handleCloseButtonClick() {
    if (isButtonDisabled('close')) {
      return;
    }

    const hook = resolveHook(resolvedPopover.value.onCloseClick ?? mergedConfig.value.onCloseClick);
    if (hook) {
      hook(activeElement.value ?? undefined, activeStep.value, getActiveHookOptions());
      return;
    }

    closeTour();
  }

  function handleOverlayClick() {
    const behavior = mergedConfig.value.overlayClickBehavior;
    if (behavior === 'close') {
      if (mergedConfig.value.allowClose !== false) {
        closeTour();
      }
      return;
    }

    if (behavior === 'nextStep') {
      moveNext();
      return;
    }

    if (typeof behavior === 'function') {
      behavior(activeElement.value ?? undefined, activeStep.value, getActiveHookOptions());
    }
  }

  function syncTourActivityClasses(active: boolean) {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle(activeBodyClass, active);
    document.body.classList.toggle(fadeBodyClass, active && mergedConfig.value.animate !== false);
    document.body.classList.toggle(staticBodyClass, active && mergedConfig.value.animate === false);
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!isActive.value) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (activeElement.value?.contains(target) || popoverElement.value?.contains(target)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    handleOverlayClick();
  }

  function handleKeyup(event: KeyboardEvent) {
    if (!isActive.value || mergedConfig.value.allowKeyboardControl === false) {
      return;
    }

    if (event.key === 'Escape') {
      closeTour();
      return;
    }

    if (event.key === 'ArrowRight') {
      handleNextButtonClick();
      return;
    }

    if (event.key === 'ArrowLeft') {
      handlePreviousButtonClick();
    }
  }

  function placePopover() {
    if (!activeRect.value || !popoverElement.value || !activeElement.value) {
      return;
    }

    const rect = activeRect.value;
    const popover = popoverElement.value.getBoundingClientRect();
    const arrowSize = 10;
    const padding = mergedConfig.value.stagePadding ?? 0;
    const offset = mergedConfig.value.popoverOffset ?? 10;
    const preferredSide =
      activeElement.value.id === dummyElementId ? 'over' : (resolvedPopover.value.side ?? 'bottom');
    const preferredAlign = resolvedPopover.value.align ?? 'start';
    const positions = calculatePopoverPosition({
      rect,
      popover,
      size: viewport.value,
      side: preferredSide,
      align: preferredAlign,
      offset,
      padding,
      arrowSize,
    });
    popoverPlacement.value = positions.placement;
    popoverShellStyle.value = {
      left: positions.style.left,
      top: positions.style.top,
      right: positions.style.right,
      bottom: positions.style.bottom,
      zIndex: `${mergedZIndex.value + 1}`,
    };
    popoverStyle.value = {
      zIndex: `${mergedZIndex.value + 1}`,
    };
  }

  useResizeObserver(activeElement, () => {
    if (!mounted.value || !activeElement.value) {
      return;
    }

    void updateLayout();
  });

  useResizeObserver(popoverElement, () => {
    if (!mounted.value || !isActive.value) {
      return;
    }

    placePopover();
  });

  useEventListener('keyup', handleKeyup);
  useEventListener(document, 'click', handleDocumentClick, { capture: true });

  const controllerRef = shallowRef<TourController>({
    isActive: () => isActive.value,
    refresh: () => {
      void updateLayout();
    },
    drive: (stepIndex = 0) => {
      void driveTo(stepIndex);
    },
    setConfig: (config) => {
      configOverride.value = { ...configOverride.value, ...config };
    },
    setSteps: (steps) => {
      stepOverride.value = steps;
    },
    getConfig: () => mergedConfig.value,
    getState: () => tourState.value,
    getActiveIndex: () => activeIndex.value,
    isFirstStep: () => isFirstStep.value,
    isLastStep: () => isLastStep.value,
    getActiveStep: () => activeStep.value,
    getActiveElement: () => activeElement.value,
    getPreviousElement: () => previousElement.value,
    getPreviousStep: () => previousStep.value,
    moveNext,
    movePrevious,
    moveTo,
    hasNextStep: () => {
      return (
        typeof activeIndex.value === 'number' && Boolean(mergedSteps.value[activeIndex.value + 1])
      );
    },
    hasPreviousStep: () => {
      return typeof activeIndex.value === 'number' && Boolean(activeIndex.value > 0);
    },
    highlight: (step) => {
      void highlight(step);
    },
    destroy: () => {
      closeTourForce();
    },
  });

  function buildOverlayPath(
    rect: DOMRect,
    size: { width: number; height: number },
    stagePadding: number,
    stageRadius: number,
  ) {
    const width = rect.width + stagePadding * 2;
    const height = rect.height + stagePadding * 2;
    const radius = Math.floor(Math.max(Math.min(stageRadius, width / 2, height / 2), 0));
    const x = rect.x - stagePadding + radius;
    const y = rect.y - stagePadding;
    const horizontal = width - radius * 2;
    const vertical = height - radius * 2;

    return `M${size.width},0L0,0L0,${size.height}L${size.width},${size.height}L${size.width},0Z M${x},${y} h${horizontal} a${radius},${radius} 0 0 1 ${radius},${radius} v${vertical} a${radius},${radius} 0 0 1 -${radius},${radius} h-${horizontal} a${radius},${radius} 0 0 1 -${radius},-${radius} v-${vertical} a${radius},${radius} 0 0 1 ${radius},-${radius} z`;
  }

  function calculateAxisPosition(
    align: TourPopover['align'],
    rectStart: number,
    rectSize: number,
    popoverSize: number,
    viewportSize: number,
    arrowSize: number,
  ) {
    if (align === 'center') {
      return Math.max(
        Math.min(
          rectStart + rectSize / 2 - popoverSize / 2,
          viewportSize - popoverSize - arrowSize,
        ),
        arrowSize,
      );
    }

    if (align === 'end') {
      return Math.max(
        Math.min(rectStart + rectSize - popoverSize, viewportSize - popoverSize - arrowSize),
        arrowSize,
      );
    }

    return Math.max(Math.min(rectStart, viewportSize - popoverSize - arrowSize), arrowSize);
  }

  function calculatePopoverPosition(options: {
    rect: DOMRect;
    popover: DOMRect;
    size: { width: number; height: number };
    side: TourPopover['side'];
    align: TourPopover['align'];
    offset: number;
    padding: number;
    arrowSize: number;
  }) {
    const { rect, popover, size, side, align, offset, padding, arrowSize } = options;
    const topSpace = rect.top - (popover.height + offset + padding);
    const bottomSpace = size.height - (rect.bottom + popover.height + offset + padding);
    const leftSpace = rect.left - (popover.width + offset + padding);
    const rightSpace = size.width - (rect.right + popover.width + offset + padding);

    const style: CSSProperties = {
      left: 'auto',
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
    };
    const placement = {
      side: side ?? 'bottom',
      align: align ?? 'start',
    };

    const applyTop = () => {
      style.top = `${Math.max(topSpace, arrowSize)}px`;
      style.left = `${calculateAxisPosition(align, rect.left, rect.width, popover.width, size.width, arrowSize)}px`;
      placement.side = 'top';
    };
    const applyBottom = () => {
      style.top = `${Math.min(rect.bottom + offset, size.height - popover.height - arrowSize)}px`;
      style.left = `${calculateAxisPosition(align, rect.left, rect.width, popover.width, size.width, arrowSize)}px`;
      placement.side = 'bottom';
    };
    const applyLeft = () => {
      style.left = `${Math.max(leftSpace, arrowSize)}px`;
      style.top = `${calculateAxisPosition(align, rect.top, rect.height, popover.height, size.height, arrowSize)}px`;
      placement.side = 'left';
    };
    const applyRight = () => {
      style.left = `${Math.min(rect.right + offset, size.width - popover.width - arrowSize)}px`;
      style.top = `${calculateAxisPosition(align, rect.top, rect.height, popover.height, size.height, arrowSize)}px`;
      placement.side = 'right';
    };
    const applyCenter = () => {
      style.left = `${Math.max((size.width - popover.width) / 2, arrowSize)}px`;
      style.top = `${Math.max((size.height - popover.height) / 2, arrowSize)}px`;
      placement.side = 'over';
      placement.align = 'center';
    };

    if (side === 'over') {
      applyCenter();
      return { style, placement };
    }

    if (side === 'top' && topSpace >= 0) {
      applyTop();
      return { style, placement };
    }

    if (side === 'bottom' && bottomSpace >= 0) {
      applyBottom();
      return { style, placement };
    }

    if (side === 'left' && leftSpace >= 0) {
      applyLeft();
      return { style, placement };
    }

    if (side === 'right' && rightSpace >= 0) {
      applyRight();
      return { style, placement };
    }

    if (bottomSpace >= 0) {
      applyBottom();
    } else if (topSpace >= 0) {
      applyTop();
    } else if (rightSpace >= 0) {
      applyRight();
    } else if (leftSpace >= 0) {
      applyLeft();
    } else {
      applyCenter();
    }

    return { style, placement };
  }

  onMounted(() => {
    mounted.value = true;
    syncTourActivityClasses(isActive.value);

    if (mergedVisible.value) {
      void driveTo();
    }
  });

  onBeforeUnmount(() => {
    syncTourActivityClasses(false);
    closeTourForce();
    releaseDialogLayer();
  });

  watch(mergedVisible, (visible) => {
    if (!mounted.value) {
      return;
    }

    if (visible) {
      void driveTo();
      return;
    }

    closeTourForce();
  });

  watch(
    () => props.current,
    (value) => {
      if (!mounted.value || !mergedVisible.value || typeof value !== 'number') {
        return;
      }

      moveTo(value);
    },
  );

  watch(
    () => [props.steps, userConfig.value] as const,
    () => {
      if (!mounted.value || !mergedVisible.value) {
        return;
      }

      if (highlightedStep.value) {
        void highlight(highlightedStep.value);
        return;
      }

      void driveTo(activeIndex.value ?? internalCurrent.value);
    },
    { deep: true },
  );

  watch(mergedZIndex, () => {
    if (!isActive.value) {
      return;
    }

    placePopover();
  });

  watch(isActive, (active) => {
    syncTourActivityClasses(active);
  });

  watch([activeX, activeY, activeWidth, activeHeight, viewportWidth, viewportHeight], () => {
    if (!mounted.value || !activeElement.value) {
      return;
    }

    activeRect.value = new DOMRect(
      activeX.value,
      activeY.value,
      activeWidth.value,
      activeHeight.value,
    );

    if (!isActive.value) {
      return;
    }

    placePopover();
  });

  defineExpose<TourExpose>({
    drive: driveTo,
    moveNext,
    movePrevious,
    moveTo,
    highlight,
    destroy: closeTourForce,
    refresh: () => controllerRef.value.refresh(),
    isActive: () => controllerRef.value.isActive(),
    getController: () => controllerRef.value,
    getState: () => controllerRef.value.getState(),
  });
</script>
