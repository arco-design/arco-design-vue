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
} from 'vue';
import { getTabListStyle } from './utils';
import { getPrefixCls } from '../_utils/global-config';
import type { Direction } from '../_utils/constant';
import TabsTab from './tabs-tab.vue';
import TabsButton from './tabs-button';
import TabsNavInk from './tabs-nav-ink.vue';
import type { TabData, TabsType } from './interface';
import IconHover from '../_components/icon-hover.vue';
import IconPlus from '../icon/icon-plus';
import ResizeObserver from '../_components/resize-observer';
import { isUndefined } from '../_utils/is';

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
  },
  emits: ['click', 'add', 'delete'],
  setup(props, { emit, slots }) {
    const { tabs, activeKey, activeIndex, direction } = toRefs(props);
    const prefixCls = getPrefixCls('tabs-nav');

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

    const mergedEditable = computed(
      () =>
        props.editable && ['line', 'card', 'card-gutter'].includes(props.type)
    );
    const isScroll = ref(false);
    const wrapperLength = ref(0);
    const maxOffset = ref(0);
    const tabEndOffsets = ref<number[]>([]);
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

    const getTabEndOffsets = () => {
      return tabs.value.map((item) => {
        const ele = tabsRef.value[item.key];
        if (direction.value === 'vertical') {
          return ele.offsetTop + ele.offsetHeight;
        }
        return ele.offsetLeft + ele.offsetWidth;
      });
    };

    const getSize = () => {
      isScroll.value = isOverflow();
      if (isScroll.value) {
        wrapperLength.value = getWrapperLength();
        maxOffset.value = getMaxOffset();
        tabEndOffsets.value = getTabEndOffsets();
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

    const isInView = (index: number) => {
      return (
        (tabEndOffsets.value[index - 1] ?? 0) >= offset.value &&
        tabEndOffsets.value[index] <= offset.value + wrapperLength.value
      );
    };

    const getNextOffset = (type: string) => {
      if (!wrapperRef.value) {
        return 0;
      }

      if (props.type === 'capsule') {
        return type === 'previous'
          ? offset.value + wrapperLength.value
          : offset.value - wrapperLength.value;
      }
      return type === 'previous'
        ? offset.value - wrapperLength.value
        : offset.value + wrapperLength.value;
    };

    const getValidOffset = (offset: number) => {
      if (!wrapperRef.value || !listRef.value || offset < 0) {
        return 0;
      }
      if (offset > maxOffset.value) {
        return maxOffset.value;
      }
      return offset;
    };

    const handleClick = (key: string | number, ev: Event) => {
      emit('click', key, ev);
    };

    const handleDelete = (key: string | number, ev: Event) => {
      emit('delete', key, ev);
    };

    const handleButtonClick = (type: string) => {
      offset.value = getValidOffset(getNextOffset(type));
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

    watch(activeIndex, (current, pre) => {
      nextTick(() => {
        if (isScroll.value) {
          if (current >= pre) {
            const offsetIndex =
              current < tabEndOffsets.value.length - 1 ? current + 1 : current;
            if (!isInView(offsetIndex)) {
              offset.value =
                tabEndOffsets.value[offsetIndex] - wrapperLength.value;
            }
          } else {
            const offsetIndex = current > 0 ? current - 1 : current;
            if (!isInView(offsetIndex)) {
              offset.value = tabEndOffsets.value[offsetIndex - 1] ?? 0;
            }
          }
        }
      });
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

    return () => (
      <div class={cls.value}>
        {isScroll.value && (
          <TabsButton
            type="previous"
            direction={props.direction}
            disabled={offset.value <= 0}
            onClick={handleButtonClick}
          />
        )}
        <ResizeObserver onResize={() => getSize()}>
          <div class={`${prefixCls}-tab`} ref={wrapperRef}>
            <ResizeObserver onResize={handleResize}>
              <div ref={listRef} class={listCls.value} style={listStyle.value}>
                {props.tabs.map((tab, index) => (
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
                    {tab.title()}
                  </TabsTab>
                ))}
                {props.type === 'line' && (
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
