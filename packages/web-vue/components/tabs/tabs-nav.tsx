import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  toRefs,
  watch,
  inject,
} from 'vue';
import { updateScrollOffset } from './utils';
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
import { off, on } from '../_utils/dom';
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
    const rtl = computed(() => configCtx?.rtl ?? false);

    const wrapperRef = ref<HTMLElement>();
    const listRef = ref<HTMLElement>();
    const tabsRef = ref<Record<string | number, HTMLElement>>({});
    const activeTabRef = computed(() => {
      if (!isUndefined(activeKey.value)) {
        return tabsRef.value[activeKey.value];
      }
      return undefined;
    });
    const isRtlHorizontal = computed(
      () => rtl.value && direction.value === 'horizontal'
    );
    const inkRef = ref<ComponentPublicInstance>();

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
      if (!wrapperRef.value || !listRef.value || newOffset < 0) {
        newOffset = 0;
      }
      offset.value = Math.min(newOffset, maxOffset.value);
    };

    const setActiveTabOffset = () => {
      if (!activeTabRef.value || !wrapperRef.value || !isScroll.value) return;

      // 纠正浏览器默认行为导致的滚动偏移， 比如 Tab 聚焦
      updateScrollOffset(wrapperRef.value, direction.value);

      const isHorizontal = direction.value === 'horizontal';
      const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';
      const wrapperSize = wrapperRef.value[sizeProperty];
      const tabSize = activeTabRef.value[sizeProperty];

      // 计算标签位置（考虑 RTL 模式）
      let tabPosition = 0;
      if (isRtlHorizontal.value) {
        const listWidth = listRef.value?.offsetWidth || 0;
        const { offsetLeft } = activeTabRef.value;
        // 对于 RTL 模式，计算从右侧开始的位置
        tabPosition = listWidth - offsetLeft - tabSize;
      } else {
        // 对于 LTR 模式或垂直方向，直接使用标准偏移
        tabPosition = isHorizontal
          ? activeTabRef.value.offsetLeft
          : activeTabRef.value.offsetTop;
      }

      const marginSide = isHorizontal
        ? isRtlHorizontal.value
          ? scrollPosition.value === 'end'
            ? 'marginLeft'
            : 'marginRight'
          : scrollPosition.value === 'end'
          ? 'marginRight'
          : 'marginLeft'
        : scrollPosition.value === 'end'
        ? 'marginBottom'
        : 'marginTop';

      const tabStyle = window.getComputedStyle(activeTabRef.value);
      const tabMargin = parseFloat(tabStyle[marginSide]) || 0;

      let targetOffset = 0;
      switch (scrollPosition.value) {
        case 'auto':
          if (tabPosition < offset.value) {
            targetOffset = tabPosition - tabMargin;
          } else if (tabPosition + tabSize > offset.value + wrapperSize) {
            targetOffset = tabPosition + tabSize - wrapperSize + tabMargin;
          }
          break;
        case 'center':
          targetOffset = tabPosition + (tabSize - wrapperSize + tabMargin) / 2;
          break;
        case 'start':
          targetOffset = tabPosition - tabMargin;
          break;
        case 'end':
          targetOffset = tabPosition + tabSize - wrapperSize + tabMargin;
          break;
        default:
          if (isNumber(scrollPosition.value)) {
            targetOffset = tabPosition - scrollPosition.value;
          }
      }

      setOffset(targetOffset);
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
      nextTick(() => {
        delete tabsRef.value[key];
      });
    };

    const handleButtonClick = (type: string) => {
      const scrollDirection =
        (type === 'previous') !== isRtlHorizontal.value ? -1 : 1;
      const nextOffset = offset.value + scrollDirection * wrapperLength.value;

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

    watch([activeIndex, scrollPosition, rtl], () => {
      setTimeout(() => {
        setActiveTabOffset();
      }, 0);
    });

    onMounted(() => {
      getSize();
      if (wrapperRef.value) {
        on(wrapperRef.value, 'wheel', handleWheel, { passive: false });
      }
    });

    onUnmounted(() => {
      if (wrapperRef.value) {
        off(wrapperRef.value, 'wheel', handleWheel);
      }
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

    const listStyle = computed(() => ({
      transform:
        direction.value === 'vertical'
          ? `translateY(${-offset.value}px)`
          : `translateX(${rtl.value ? offset.value : -offset.value}px)`,
    }));

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
            type={isRtlHorizontal.value ? 'next' : 'previous'}
            direction={props.direction}
            disabled={offset.value <= 0}
            onClick={handleButtonClick}
          />
        )}
        <ResizeObserver onResize={() => getSize()}>
          <div class={tabCls.value} ref={wrapperRef}>
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
            type={isRtlHorizontal.value ? 'previous' : 'next'}
            direction={props.direction}
            disabled={offset.value >= maxOffset.value}
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
