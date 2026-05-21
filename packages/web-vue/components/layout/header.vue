<template>
  <div :class="wrapperClassNames" :style="wrapperStyles">
    <header ref="headerRef" :class="classNames" :style="headerStyles">
      <div v-if="hasImage" :class="`${prefixCls}-image`">
        <slot name="image">
          <img v-if="image" :class="`${prefixCls}-image-inner`" :src="image" alt="" />
        </slot>
      </div>
      <div :class="`${prefixCls}-bar`">
        <div v-if="$slots.prepend" :class="`${prefixCls}-prepend`">
          <slot name="prepend" />
        </div>
        <div v-if="hasTitle" :class="`${prefixCls}-title`">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="$slots.default" :class="`${prefixCls}-content`">
          <slot />
        </div>
        <div v-if="$slots.append" :class="`${prefixCls}-append`">
          <slot name="append" />
        </div>
      </div>
      <div v-if="showExtension" :class="`${prefixCls}-extension`">
        <slot name="extension" />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import {
    computed,
    getCurrentInstance,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    toRef,
    useSlots,
    watch,
  } from 'vue';

  import type {
    LayoutHeaderDensity,
    LayoutHeaderProps,
    LayoutHeaderScrollBehavior,
  } from './interface';

  import { getElement, on, off } from '../_utils/dom';
  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({
    name: 'LayoutHeader',
  });

  const props = withDefaults(defineProps<LayoutHeaderProps>(), {
    defaultVisible: true,
    height: 64,
    extensionHeight: 48,
    density: 'default',
    flat: false,
    floating: false,
    fixed: false,
    sticky: false,
    absolute: false,
    location: 'top',
    scrollThreshold: 300,
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void;
  }>();

  const slots = useSlots();
  const instance = getCurrentInstance();
  const prefixCls = getPrefixCls('layout-header');
  const scrollbarPrefixCls = getPrefixCls('scrollbar');
  const scrollbarViewportSelector = '[data-overlayscrollbars-viewport]';
  const headerRef = ref<HTMLElement>();
  const modelValue = toRef(props, 'modelValue');
  const localVisible = ref(props.defaultVisible);
  const currentScroll = ref(0);
  const isScrollingUp = ref(false);
  const isAtBottom = ref(false);
  const reachedBottomWhileScrollingDown = ref(false);
  const hasEnoughScrollableSpace = ref(true);
  const scrollTargetRef = ref<HTMLElement | Window | null>(null);
  const isMounted = ref(false);

  let previousScroll = 0;
  let previousScrollHeight = 0;

  const hasModelValueProp = computed(() =>
    Object.hasOwn(instance?.vnode.props ?? {}, 'modelValue'),
  );
  const hasExtendedProp = computed(() => Object.hasOwn(instance?.vnode.props ?? {}, 'extended'));
  const mergedVisible = computed(() =>
    hasModelValueProp.value ? Boolean(modelValue.value) : localVisible.value,
  );

  const setVisible = (nextVisible: boolean) => {
    if (nextVisible !== mergedVisible.value) {
      emit('update:modelValue', nextVisible);
      localVisible.value = nextVisible;
    }
  };

  watch(modelValue, (nextVisible) => {
    if (hasModelValueProp.value) {
      localVisible.value = nextVisible;
    }
  });

  const parseSize = (value: number | string | undefined, fallback: number) => {
    if (typeof value === 'number') {
      return value;
    }

    if (!value) {
      return fallback;
    }

    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const resolveDensityOffset = (density: LayoutHeaderDensity, baseHeight: number) => {
    if (density === 'prominent') {
      return baseHeight;
    }

    if (density === 'comfortable') {
      return -8;
    }

    if (density === 'compact') {
      return -16;
    }

    return 0;
  };

  const getScrollMetrics = (target: HTMLElement | Window) => {
    if (target === window) {
      return {
        clientHeight: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
      };
    }

    return {
      clientHeight: target.clientHeight,
      scrollHeight: target.scrollHeight,
    };
  };

  const resolveScrollTop = (target: HTMLElement | Window) =>
    target === window ? window.pageYOffset : target.scrollTop;

  const resolveScopedElement = (selector: string) => {
    let scope = headerRef.value?.parentElement;

    while (scope) {
      if (scope.matches(selector)) {
        return scope;
      }

      const scopedTarget = getElement(selector, scope);
      if (scopedTarget) {
        return scopedTarget;
      }

      scope = scope.parentElement;
    }

    return getElement(selector);
  };

  const resolveScrollableElement = (target: HTMLElement) => {
    if (target.matches(scrollbarViewportSelector)) {
      return target;
    }

    const viewport = getElement(scrollbarViewportSelector, target);

    if (viewport) {
      return viewport;
    }

    if (target.classList.contains(scrollbarPrefixCls)) {
      return null;
    }

    return target;
  };

  const resolveScrollTarget = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (!props.scrollTarget) {
      return window;
    }

    const resolvedTarget = resolveScopedElement(props.scrollTarget);

    if (!resolvedTarget) {
      return null;
    }

    return resolveScrollableElement(resolvedTarget);
  };

  const behavior = computed(() => {
    const items = new Set<LayoutHeaderScrollBehavior>(
      props.scrollBehavior?.split(' ').filter(Boolean) as LayoutHeaderScrollBehavior[] | undefined,
    );

    return {
      hide: items.has('hide'),
      fullyHide: items.has('fully-hide'),
      inverted: items.has('inverted'),
      collapse: items.has('collapse'),
      elevate: items.has('elevate'),
      fadeImage: items.has('fade-image'),
    };
  });

  const scrollThreshold = computed(() => parseSize(props.scrollThreshold, 300));
  const baseContentHeight = computed(() => parseSize(props.height, 64));
  const contentHeight = computed(
    () => baseContentHeight.value + resolveDensityOffset(props.density, baseContentHeight.value),
  );
  const baseExtensionHeight = computed(() => parseSize(props.extensionHeight, 48));
  const extensionEnabled = computed(() =>
    hasExtendedProp.value ? Boolean(props.extended) : Boolean(slots.extension),
  );
  const measuredExtensionHeight = computed(() => {
    if (!extensionEnabled.value) {
      return 0;
    }

    return Math.max(
      0,
      baseExtensionHeight.value +
        resolveDensityOffset(props.density, baseExtensionHeight.value) / 2,
    );
  });
  const fullHeight = computed(() => contentHeight.value + measuredExtensionHeight.value);
  const scrollRatio = computed(() => {
    if (scrollThreshold.value <= 0) {
      return currentScroll.value === 0 ? 1 : 0;
    }

    const ratio = (scrollThreshold.value - currentScroll.value) / scrollThreshold.value;
    return Math.min(1, Math.max(0, ratio));
  });
  const controlsVisibilityByScroll = computed(
    () => behavior.value.hide || behavior.value.fullyHide,
  );
  const isCollapsed = computed(
    () =>
      !!props.collapse ||
      (behavior.value.collapse &&
        (behavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)),
  );
  const showExtension = computed(
    () => extensionEnabled.value && mergedVisible.value && !isCollapsed.value,
  );
  const renderedHeight = computed(() => {
    if (!mergedVisible.value) {
      return 0;
    }

    return contentHeight.value + (showExtension.value ? measuredExtensionHeight.value : 0);
  });
  const imageOpacity = computed(() => {
    if (!behavior.value.fadeImage) {
      return 1;
    }

    return behavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value;
  });
  const isFlat = computed(
    () =>
      props.flat ||
      (behavior.value.fullyHide && !mergedVisible.value) ||
      (behavior.value.elevate &&
        (behavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)),
  );
  const hasImage = computed(() => Boolean(props.image || slots.image));
  const hasTitle = computed(() => Boolean(props.title || slots.title));
  const wrapperClassNames = computed(() => [`${prefixCls}-wrapper`]);
  const classNames = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-bottom`]: props.location === 'bottom',
      [`${prefixCls}-fixed`]: props.fixed,
      [`${prefixCls}-sticky`]: props.sticky,
      [`${prefixCls}-absolute`]: props.absolute,
      [`${prefixCls}-flat`]: isFlat.value,
      [`${prefixCls}-floating`]: props.floating,
      [`${prefixCls}-hidden`]: !mergedVisible.value,
      [`${prefixCls}-collapsed`]: isCollapsed.value,
      [`${prefixCls}-with-image`]: hasImage.value,
      [`${prefixCls}-with-extension`]: showExtension.value,
      [`${prefixCls}-with-title`]: hasTitle.value,
    },
  ]);
  const wrapperStyles = computed<CSSProperties | undefined>(() => {
    if (!props.fixed || props.absolute) {
      return undefined;
    }

    return {
      height: `${renderedHeight.value}px`,
    };
  });
  const headerStyles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {
      '--sd-layout-header-content-height': `${contentHeight.value}px`,
      '--sd-layout-header-extension-height': `${measuredExtensionHeight.value}px`,
      '--sd-layout-header-image-opacity': String(imageOpacity.value),
      'height': `${renderedHeight.value}px`,
    } as CSSProperties;

    if (!mergedVisible.value && (props.fixed || props.sticky || props.absolute)) {
      styles.transform = `translateY(${props.location === 'bottom' ? fullHeight.value : -fullHeight.value}px)`;
    }

    if (props.fixed) {
      styles.position = 'fixed';
      styles.left = '0';
      styles.right = '0';
      styles[props.location] = '0';
      styles.zIndex = 10;
    } else if (props.sticky) {
      styles.position = 'sticky';
      styles[props.location] = '0';
      styles.zIndex = 10;
    } else if (props.absolute) {
      styles.position = 'absolute';
      styles.left = '0';
      styles.right = '0';
      styles[props.location] = '0';
      styles.zIndex = 10;
    }

    return styles;
  });

  const updateScrollableSpace = () => {
    const target = scrollTargetRef.value;
    if (!target) {
      return;
    }

    const { clientHeight, scrollHeight } = getScrollMetrics(target);
    const maxScrollableDistance = scrollHeight - clientHeight;
    hasEnoughScrollableSpace.value =
      maxScrollableDistance > scrollThreshold.value + fullHeight.value;
  };

  const handleScroll = () => {
    const target = scrollTargetRef.value;
    if (!target) {
      return;
    }

    previousScroll = currentScroll.value;
    currentScroll.value = resolveScrollTop(target);

    const currentHeight =
      target === window ? document.documentElement.scrollHeight : target.scrollHeight;
    if (currentHeight > previousScrollHeight) {
      updateScrollableSpace();
    }
    previousScrollHeight = currentHeight;

    isScrollingUp.value = currentScroll.value < previousScroll;

    const { clientHeight, scrollHeight } = getScrollMetrics(target);
    const atBottom = currentScroll.value + clientHeight >= scrollHeight - 5;

    if (
      !isScrollingUp.value &&
      atBottom &&
      currentScroll.value >= scrollThreshold.value &&
      hasEnoughScrollableSpace.value
    ) {
      reachedBottomWhileScrollingDown.value = true;
    }

    const scrollJumped = Math.abs(currentScroll.value - previousScroll) > 100;
    const atTop = currentScroll.value <= 5;
    const scrolledUpSignificantly = isScrollingUp.value && previousScroll - currentScroll.value > 1;
    if (
      (scrolledUpSignificantly && !atBottom) ||
      (scrollJumped && currentScroll.value < scrollThreshold.value) ||
      atTop
    ) {
      reachedBottomWhileScrollingDown.value = false;
    }

    isAtBottom.value = atBottom;

    if (!controlsVisibilityByScroll.value) {
      return;
    }

    if (behavior.value.inverted) {
      setVisible(currentScroll.value > scrollThreshold.value);
      return;
    }

    if (!hasEnoughScrollableSpace.value) {
      setVisible(true);
      return;
    }

    if (reachedBottomWhileScrollingDown.value) {
      setVisible(false);
      return;
    }

    setVisible(
      (isScrollingUp.value && !isAtBottom.value) || currentScroll.value < scrollThreshold.value,
    );
  };

  const bindScrollTarget = (target: HTMLElement | Window | null) => {
    if (scrollTargetRef.value) {
      off(scrollTargetRef.value, 'scroll', handleScroll);
    }

    scrollTargetRef.value = target;

    previousScroll = target ? resolveScrollTop(target) : 0;
    currentScroll.value = previousScroll;
    previousScrollHeight = target ? getScrollMetrics(target).scrollHeight : 0;
    isScrollingUp.value = false;
    isAtBottom.value = false;
    reachedBottomWhileScrollingDown.value = false;

    if (!scrollTargetRef.value) {
      return;
    }

    on(scrollTargetRef.value, 'scroll', handleScroll, { passive: true });
    updateScrollableSpace();
    handleScroll();
  };

  const syncScrollTarget = () => {
    bindScrollTarget(resolveScrollTarget());
  };

  watch(
    () => props.scrollTarget,
    () => {
      if (typeof window === 'undefined') {
        return;
      }

      if (!isMounted.value && props.scrollTarget) {
        return;
      }

      syncScrollTarget();
    },
    { immediate: true },
  );

  watch(scrollThreshold, () => {
    updateScrollableSpace();
    handleScroll();
  });

  onMounted(() => {
    if (typeof window === 'undefined') {
      return;
    }

    isMounted.value = true;
    syncScrollTarget();
    on(window, 'resize', updateScrollableSpace, { passive: true });
    updateScrollableSpace();
    handleScroll();

    nextTick(() => {
      syncScrollTarget();
      updateScrollableSpace();
      handleScroll();
    });
  });

  onBeforeUnmount(() => {
    if (scrollTargetRef.value) {
      off(scrollTargetRef.value, 'scroll', handleScroll);
    }

    if (typeof window !== 'undefined') {
      off(window, 'resize', updateScrollableSpace);
    }
  });
</script>
