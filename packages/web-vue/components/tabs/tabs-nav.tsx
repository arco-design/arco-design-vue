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
import { Direction } from '../_utils/constant';
import Tab from './tabs-tab.vue';
import TabsButton from './tabs-button';
import TabsNavInk from './tabs-nav-ink.vue';
import { TabList, Types } from './interface';
import IconHover from '../_components/icon-hover.vue';
import IconPlus from '../icon/icon-plus';
import ResizeObserver from '../_components/resize-observer';

export default defineComponent({
  name: 'TabsNav',
  props: {
    direction: {
      type: String as PropType<Direction>,
      required: true,
    },
    type: {
      type: String as PropType<Types>,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
    tabs: {
      type: Array as PropType<TabList>,
      required: true,
    },
    tabKeys: {
      type: Array as PropType<string[]>,
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
    const prefixCls = getPrefixCls('tabs-nav');

    const { tabs, tabKeys, activeIndex, direction } = toRefs(props);

    const wrapperRef = ref<HTMLElement>();
    const listRef = ref<HTMLElement>();
    const tabsRef = ref<Record<string, HTMLElement>>({});

    const wrapperLength = ref(0);
    const maxOffset = ref(0);

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

    const activeTabRef = computed(() => tabsRef.value[props.activeTab]);

    const isOverflow = () => {
      if (wrapperRef.value && listRef.value) {
        return props.direction === 'vertical'
          ? listRef.value.offsetHeight > wrapperRef.value.offsetHeight
          : listRef.value.offsetWidth > wrapperRef.value.offsetWidth;
      }
      return false;
    };

    const isScroll = ref(false);

    onMounted(() => {
      getSize();
    });

    const tabEndOffsets = ref<number[]>([]);

    const offset = ref(0);

    const isInView = (index: number) => {
      return (
        (tabEndOffsets.value[index - 1] ?? 0) >= offset.value &&
        tabEndOffsets.value[index] <= offset.value + wrapperLength.value
      );
    };

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

    const mergedEditable = computed(
      () =>
        props.editable && ['line', 'card', 'card-gutter'].includes(props.type)
    );

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

    const handleButtonClick = (type: string) => {
      offset.value = getValidOffset(getNextOffset(type));
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

    watch(tabs, () => {
      nextTick(() => {
        getSize();
      });
    });

    const handleResize = () => {
      getSize();
    };

    const renderAddBtn = () => {
      if (!mergedEditable.value || !props.showAddButton) {
        return null;
      }
      return (
        <div class={`${prefixCls}-add-btn`} onClick={() => emit('add')}>
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
        <div class={`${prefixCls}-tab`} ref={wrapperRef}>
          <ResizeObserver onResize={handleResize}>
            <div
              class={[
                `${prefixCls}-tab-list`,
                {
                  [`${prefixCls}-tab-list-no-padding`]:
                    !props.headerPadding &&
                    props.direction === 'horizontal' &&
                    ['line', 'text'].includes(props.type),
                },
              ]}
              style={getTabListStyle({
                direction: props.direction,
                type: props.type,
                offset: offset.value,
              })}
              ref={listRef}
            >
              {props.tabs.map((tab, index) => (
                <Tab
                  ref={(component: ComponentPublicInstance) => {
                    if (component?.$el) {
                      tabsRef.value[tab.key] = component.$el;
                    }
                  }}
                  v-slots={{ title: () => tab.title() }}
                  isActive={props.activeIndex === index}
                  key={tab.key}
                  tab={tab}
                  editable={props.editable}
                  onClick={(key: string, e: Event) => emit('click', key, e)}
                  onDelete={(key: string) => emit('delete', key)}
                />
              ))}
              {props.type === 'line' && activeTabRef.value && (
                <TabsNavInk
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
