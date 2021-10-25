import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { getDiffRect, getTabListStyle } from './utils';
import { getPrefixCls } from '../_utils/global-config';
import { Direction } from '../_utils/constant';
import Tab from './tabs-tab.vue';
import TabsButton from './tabs-button';
import TabsNavInk from './tabs-nav-ink.vue';
import { TabList, Types } from './interface';
import IconHover from '../_components/icon-hover.vue';
import IconPlus from '../icon/icon-plus';

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
    tabs: {
      type: Array as PropType<TabList>,
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
    editable: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['click', 'add', 'delete'],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('tabs-nav');

    const wrapperRef = ref<HTMLElement>();
    const listRef = ref<HTMLElement>();
    const tabsRef = ref<Record<string, HTMLElement>>({});

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
      isScroll.value = isOverflow();
    });

    const offset = ref(0);

    const mergedEditable = computed(
      () =>
        props.editable && ['line', 'card', 'card-gutter'].includes(props.type)
    );

    const getNextOffset = (type: string) => {
      if (!wrapperRef.value) {
        return 0;
      }

      if (props.direction === 'horizontal') {
        if (props.type === 'capsule') {
          return type === 'previous'
            ? offset.value + wrapperRef.value.offsetWidth
            : offset.value - wrapperRef.value.offsetWidth;
        }
        return type === 'previous'
          ? offset.value - wrapperRef.value.offsetWidth
          : offset.value + wrapperRef.value.offsetWidth;
      }
      if (type === 'previous') {
        return offset.value - wrapperRef.value.offsetHeight;
      }
      return offset.value + wrapperRef.value.offsetHeight;
    };

    const handleButtonClick = (type: string) => {
      offset.value = getValidOffset(getNextOffset(type));
    };

    const getValidOffset = (offset: number) => {
      if (offset < 0) {
        return 0;
      }
      if (!listRef.value || !wrapperRef.value) {
        return offset;
      }

      const maxOffset =
        props.direction === 'vertical'
          ? listRef.value.offsetHeight - wrapperRef.value.offsetHeight
          : listRef.value.offsetWidth - wrapperRef.value.offsetWidth;

      if (offset > maxOffset) {
        return maxOffset;
      }
      return offset;
    };

    const getActiveTabOffset = () => {
      if (!listRef.value || !wrapperRef.value) {
        return 0;
      }
      const activeTabNode = tabsRef.value[props.activeTab];
      if (!activeTabNode) {
        return 0;
      }

      const diffRect = getDiffRect(activeTabNode, wrapperRef.value);

      // 垂直方向的 offset 计算，不分type
      if (props.direction === 'vertical') {
        if (diffRect.top < 0) {
          // 不完全在可见区
          return offset.value + diffRect.top;
        }
        if (diffRect.bottom > 0) {
          // 不完全在可见区
          return offset.value + diffRect.bottom;
        }
      } else if (props.type === 'capsule') {
        // 水平方向的 offset 计算，分为 capsule 和其他，因为 capsule 是右对齐
        if (diffRect.left < 0) {
          // 不完全在可见区
          return offset.value - diffRect.left;
        }
        if (diffRect.right > 0) {
          // 不完全在可见区
          return offset.value - diffRect.right;
        }
      } else {
        if (diffRect.left < 0) {
          // 不完全在可见区
          return offset.value + diffRect.left;
        }
        if (diffRect.right > 0) {
          // 不完全在可见区
          return offset.value + diffRect.right;
        }
      }
      return undefined;
    };

    watch(
      () => props.tabs,
      () => {
        nextTick(() => {
          isScroll.value = isOverflow();
          if (!isScroll.value) {
            offset.value = 0;
          }
        });
      }
    );

    watch(
      () => [props.activeTab, props.tabs],
      () => {
        const nextOffset = getActiveTabOffset();

        if (nextOffset && nextOffset !== offset.value) {
          offset.value = nextOffset;
        }
      }
    );

    const renderAddBtn = () => (
      <div class={`${prefixCls}-add-btn`} onClick={() => emit('add')}>
        <IconHover>
          <IconPlus />
        </IconHover>
      </div>
    );

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
            onClick={handleButtonClick}
          />
        )}
        <div class={`${prefixCls}-tab`} ref={wrapperRef}>
          <div
            class={[
              `${prefixCls}-tab-list`,
              {
                [`${prefixCls}-tab-list-no-padding`]:
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
                isActive={props.activeTab === tab.key}
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
          {!isScroll.value && mergedEditable.value && renderAddBtn()}
        </div>
        {isScroll.value && (
          <TabsButton
            type="next"
            direction={props.direction}
            onClick={handleButtonClick}
          />
        )}
        <div class={`${prefixCls}-extra`}>
          {isScroll.value && mergedEditable.value && renderAddBtn()}
          {slots.extra?.()}
        </div>
      </div>
    );
  },
});
