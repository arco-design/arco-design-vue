import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
  inject,
} from 'vue';
import { getTabListStyle, updateScrollOffset } from './utils';
import { getPrefixCls } from '../_utils/global-config';
import type { Direction } from '../_utils/constant';
import TabsTab from './tabs-tab.vue';
import TabsButton from './tabs-button';
import TabsNavInk from './tabs-nav-ink.vue';
import type { TabData, TabsType, ScrollPosition } from './interface';
import IconHover from '../_components/icon-hover.vue';
import IconPlus from '../icon/icon-plus';
import ResizeObserver from '../_components/resize-observer';
import { isUndefined, isNumber } from '../_utils/is';
import { configProviderInjectionKey } from '../config-provider/context';

export default defineComponent({
  name: 'TabsNav',
  props: {
    tabs: {
      type: Array as PropType<TabData[]>,
      required: true,
    },
    direction: {
      type: String as PropType<Direction>,
      required: true,
    },
    type: {
      type: String as PropType<TabsType>,
      required: true,
    },
    activeKey: {
      type: [String, Number],
    },
    activeIndex: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    showAddButton: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      required: true,
    },
    headerPadding: {
      type: Boolean,
      default: true,
    },
    scrollPosition: {
      type: String as PropType<ScrollPosition>,
      default: 'auto',
    },
  },
  emits: ['click', 'add', 'delete'],
  setup(props, { emit, slots }) {
    const { tabs, activeKey, activeIndex, direction, scrollPosition } =
      toRefs(props);
    const prefixCls = getPrefixCls('tabs-nav');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => {
      return configCtx?.rtl ?? false;
    });

    const wrapperRef = ref<HTMLElement>();
    const listRef = ref<HTMLElement>();
    const tabsRef = ref<Record<string | number, HTMLElement>>({});
    const activeTabRef = computed(() => {
      if (!isUndefined(activeKey.value)) {
        return tabsRef.value[activeKey.value];
      }
      return undefined;
    });
    const inkRef = ref<ComponentPublicInstance>();
    const tabKeys = computed(() => props.tabs.map((tab) => tab.key));

    const isPreviousButtonDisabled = computed(() => {
      if (rtl.value) {
        return (
          Math.abs(offset.value) >= maxOffset.value ||
          activeIndex.value === tabKeys.value.length - 1
        );
      }
      return offset.value <= 0;
    });
    const isNextButtonDisabled = computed(() => {
      return rtl.value
        ? Math.abs(offset.value) <= 0
        : offset.value >= maxOffset.value;
    });

    const mergedEditable = computed(
      () =>
        props.editable && ['line', 'card', 'card-gutter'].includes(props.type)
    );
    const isScroll = ref(false);
    const wrapperLength = ref(0);
    const maxOffset = ref(0);
    const offset = ref(0);

    const getWrapperLength = () => {
      return (
        (direction.value === 'vertical'
          ? wrapperRef.value?.offsetHeight
          : wrapperRef.value?.offsetWidth) ?? 0
      );
    };

    const getMaxOffset = () => {
      if (!listRef.value || !wrapperRef.value) {
        return 0;
      }

      if (direction.value === 'vertical') {
        return listRef.value.offsetHeight - wrapperRef.value.offsetHeight;
      }
      return listRef.value.offsetWidth - wrapperRef.value.offsetWidth;
    };

    const getSize = () => {
      isScroll.value = isOverflow();
      if (isScroll.value) {
        wrapperLength.value = getWrapperLength();
        maxOffset.value = getMaxOffset();
        if (offset.value > maxOffset.value) {
          offset.value = maxOffset.value;
        }
      } else {
        offset.value = 0;
      }
    };

    const isOverflow = () => {
      if (wrapperRef.value && listRef.value) {
        return props.direction === 'vertical'
          ? listRef.value.offsetHeight > wrapperRef.value.offsetHeight
          : listRef.value.offsetWidth > wrapperRef.value.offsetWidth;
      }
      return false;
    };

    const setOffset = (newOffset: number) => {
      if (!wrapperRef.value || !listRef.value) {
        newOffset = 0;
      } else if (rtl.value) {
        newOffset = Math.min(0, Math.max(-maxOffset.value, newOffset));
      } else {
        newOffset = Math.max(0, Math.min(maxOffset.value, newOffset));
      }
      offset.value = newOffset;
    };

    const checkInkVisibility = () => {
      if (!activeTabRef.value || !wrapperRef.value) return;

      const inkEl = activeTabRef.value;
      const inkRect = inkEl.getBoundingClientRect();
      const wrapperRect = wrapperRef.value!.getBoundingClientRect();

      if (inkRect.left < wrapperRect.left) {
        setOffset(offset.value - (wrapperRect.left - inkRect.left));
      } else if (inkRect.right > wrapperRect.right) {
        setOffset(offset.value + (inkRect.right - wrapperRect.right));
      }
    };

    const setActiveTabOffset = () => {
      if (!activeTabRef.value || !wrapperRef.value || !isScroll.value) return;

      // 纠正浏览器默认行为导致的滚动偏移， 比如 Tab 聚焦
      updateScrollOffset(wrapperRef.value, direction.value);

      const isHorizontal = direction.value === 'horizontal';
      const offsetProperty = isHorizontal ? 'offsetLeft' : 'offsetTop';
      const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';
      const tabOffset = activeTabRef.value[offsetProperty];
      const tabSize = activeTabRef.value[sizeProperty];
      const wrapperSize = wrapperRef.value[sizeProperty];

      // 纠正偏移缺少 margin
      const tabStyle = window.getComputedStyle(activeTabRef.value);
      const marginProperty = isHorizontal
        ? scrollPosition.value === 'end'
          ? 'marginRight'
          : 'marginLeft'
        : scrollPosition.value === 'end'
        ? 'marginBottom'
        : 'marginTop';
      const tabMargin = parseFloat(tabStyle[marginProperty]) || 0;

      if (rtl.value) {
        nextTick(() => {
          checkInkVisibility();
        });
      } else if (scrollPosition.value === 'auto') {
        if (tabOffset < offset.value) {
          setOffset(tabOffset - tabMargin);
        } else if (tabOffset + tabSize > offset.value + wrapperSize) {
          setOffset(tabOffset + tabSize - wrapperSize + tabMargin);
        }
      } else if (scrollPosition.value === 'center') {
        setOffset(tabOffset + (tabSize - wrapperSize + tabMargin) / 2);
      } else if (scrollPosition.value === 'start') {
        setOffset(tabOffset - tabMargin);
      } else if (scrollPosition.value === 'end') {
        setOffset(tabOffset + tabSize - wrapperSize + tabMargin);
      } else if (isNumber(scrollPosition.value)) {
        setOffset(tabOffset - scrollPosition.value);
      }
    };

    const handleWheel = (ev: WheelEvent) => {
      if (!isScroll.value) return;
      ev.preventDefault();

      const { deltaX, deltaY } = ev;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setOffset(offset.value + deltaX);
      } else {
        setOffset(offset.value + deltaY);
      }
    };

    const handleClick = (key: string | number, ev: Event) => {
      emit('click', key, ev);
    };

    const handleDelete = (key: string | number, ev: Event) => {
      emit('delete', key, ev);
    };

    const handleButtonClick = (type: string) => {
      const nextOffset =
        type === 'previous'
          ? offset.value - wrapperLength.value
          : offset.value + wrapperLength.value;

      setOffset(nextOffset);
    };

    const handleResize = () => {
      getSize();
      if (inkRef.value) {
        inkRef.value.$forceUpdate();
      }
    };

    watch(tabs, () => {
      nextTick(() => {
        getSize();
      });
    });

    watch([activeIndex, scrollPosition], () => {
      setTimeout(() => {
        setActiveTabOffset();
      }, 0);
    });

    watch(rtl, () => {
      setTimeout(() => {
        setActiveTabOffset();
      }, 0);
    });

    onMounted(() => {
      getSize();
    });

    const renderAddBtn = () => {
      if (!mergedEditable.value || !props.showAddButton) {
        return null;
      }
      return (
        <div
          class={`${prefixCls}-add-btn`}
          onClick={(ev: Event) => emit('add', ev)}
        >
          <IconHover>
            <IconPlus />
          </IconHover>
        </div>
      );
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.direction}`,
      `${prefixCls}-${props.position}`,
      `${prefixCls}-size-${props.size}`,
      `${prefixCls}-type-${props.type}`,
    ]);

    const listCls = computed(() => [
      `${prefixCls}-tab-list`,
      {
        [`${prefixCls}-tab-list-no-padding`]:
          !props.headerPadding &&
          ['line', 'text'].includes(props.type) &&
          props.direction === 'horizontal',
      },
    ]);

    const listStyle = computed(() =>
      getTabListStyle({
        direction: props.direction,
        type: props.type,
        offset: offset.value,
      })
    );

    const tabCls = computed(() => [
      `${prefixCls}-tab`,
      {
        [`${prefixCls}-tab-scroll`]: isScroll.value,
      },
    ]);

    return () => (
      <div class={cls.value}>
        {isScroll.value && (
          <TabsButton
            type="previous"
            direction={props.direction}
            disabled={isPreviousButtonDisabled.value}
            onClick={handleButtonClick}
          />
        )}
        <ResizeObserver onResize={() => getSize()}>
          <div class={tabCls.value} ref={wrapperRef} onWheel={handleWheel}>
            <ResizeObserver onResize={handleResize}>
              <div ref={listRef} class={listCls.value} style={listStyle.value}>
                {props.tabs.map((tab) => (
                  <TabsTab
                    key={tab.key}
                    ref={(component: any) => {
                      if (component?.$el) {
                        tabsRef.value[tab.key] = component.$el;
                      }
                    }}
                    active={tab.key === activeKey.value}
                    tab={tab}
                    editable={props.editable}
                    onClick={handleClick}
                    onDelete={handleDelete}
                  >
                    {tab.slots.title?.() ?? tab.title}
                  </TabsTab>
                ))}
                {props.type === 'line' && activeTabRef.value && (
                  <TabsNavInk
                    ref={inkRef}
                    activeTabRef={activeTabRef.value}
                    direction={props.direction}
                    disabled={false}
                    animation={props.animation}
                  />
                )}
              </div>
            </ResizeObserver>
            {!isScroll.value && renderAddBtn()}
          </div>
        </ResizeObserver>
        {isScroll.value && (
          <TabsButton
            type="next"
            direction={props.direction}
            disabled={isNextButtonDisabled.value}
            onClick={handleButtonClick}
          />
        )}
        <div class={`${prefixCls}-extra`}>
          {isScroll.value && renderAddBtn()}
          {slots.extra?.()}
        </div>
      </div>
    );
  },
});
