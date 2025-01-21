import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  provide,
  reactive,
  ref,
  toRefs,
  inject,
  onMounted,
} from 'vue';
import type { Direction, Size } from '../_utils/constant';
import type {
  TabsPosition,
  TabsType,
  TabData,
  TabTriggerEvent,
  ScrollPosition,
} from './interface';
import { getPrefixCls } from '../_utils/global-config';
import TabsNav from './tabs-nav';
import { tabsInjectionKey } from './context';
import { isUndefined } from '../_utils/is';
import { useSize } from '../_hooks/use-size';
import { useChildrenComponents } from '../_hooks/use-children-components';
import { configProviderInjectionKey } from '../config-provider/context';

export default defineComponent({
  name: 'Tabs',
  props: {
    /**
     * @zh 当前选中的标签的 `key`
     * @en The `key` of the currently selected label
     * @vModel
     */
    activeKey: {
      type: [String, Number],
      default: undefined,
    },
    /**
     * @zh 默认选中的标签的`key`（非受控状态，为空时选中第一个标签页）
     * @en The `key` of the tab selected by default (uncontrolled state, select the first tab page when it is empty)
     */
    defaultActiveKey: {
      type: [String, Number],
      default: undefined,
    },
    /**
     * @zh 选项卡的位置
     * @en Position of the tab
     * @values 'left', 'right', 'top', 'bottom'
     */
    position: {
      type: String as PropType<TabsPosition>,
      default: 'top',
    },
    /**
     * @zh 选项卡的大小
     * @en The size of the tab
     * @values 'mini', 'small', 'medium', 'large'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 选项卡的类型
     * @en The type of tab
     * @values 'line', 'card', 'card-gutter', 'text', 'rounded', 'capsule'
     */
    type: {
      type: String as PropType<TabsType>,
      default: 'line',
    },
    /**
     * @zh 选项卡的方向
     * @en The direction of tab
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 是否开启可编辑模式
     * @en Whether to enable editable mode
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示增加按钮（仅在可编辑模式可用）
     * @en Whether to display the add button (only available in editable mode)
     */
    showAddButton: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在不显示标签时销毁内容
     * @en Whether to destroy the content when the label is not displayed
     * @version 2.27.0
     */
    destroyOnHide: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在首次展示标签时挂载内容
     * @en Whether to mount the content when the label is first displayed
     */
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 高度撑满容器，只在水平模式下生效。
     * @en The height of the container is fully supported, and it only takes effect in horizontal mode.
     */
    justify: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启选项内容过渡动画
     * @en Whether to enable option content transition animation
     */
    animation: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 选项卡头部是否存在水平边距。仅对 `type` 等于 `line`、`text` 类型的选项卡生效
     * @en Whether there is a horizontal margin on the header of the tab. Only valid for tabs with `type` equal to `line` and `text` type
     * @version 2.10.0
     */
    headerPadding: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 创建标签后是否切换到新标签（最后一个）
     * @en Whether to switch to a new tab after creating a tab (the last one)
     * @version 2.18.0
     */
    autoSwitch: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否隐藏内容
     * @en Whether to hide content
     * @version 2.25.0
     */
    hideContent: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click'
     * @version 2.34.0
     */
    trigger: {
      type: String as PropType<TabTriggerEvent>,
      default: 'click',
    },
    /**
     * @zh 被选中 tab 的滚动位置，默认 auto 即会将 activeTab 滚动到可见区域，但不会特意做位置调整
     * @en The scroll position of the selected tab, the default auto will scroll the activeTab to the visible area, but will not adjust the position intentionally
     * @values 'start', 'end', 'center', 'auto', number
     */
    scrollPosition: {
      type: [String, Number] as PropType<ScrollPosition>,
      default: 'auto',
    },
  },
  emits: {
    'update:activeKey': (key: string | number) => true,
    /**
     * @zh 当前标签值改变时触发
     * @en Triggered when the current tag value changes
     * @property { string | number } key
     */
    'change': (key: string | number) => true,
    /**
     * @zh 用户点击标签时触发
     * @en Triggered when the user clicks on the tab
     * @property { string | number } key
     */
    'tabClick': (key: string | number, ev: Event) => true,
    /**
     * @zh 用户点击增加按钮时触发
     * @en Triggered when the user clicks the add button
     */
    'add': (ev: Event) => true,
    /**
     * @zh 用户点击删除按钮时触发
     * @en Triggered when the user clicks the delete button
     * @property { string | number } key
     */
    'delete': (key: string | number, ev: Event) => true,
  },
  /**
   * @zh 选项卡额外内容
   * @en Additional tab content
   * @slot extra
   */
  setup(props, { emit, slots }) {
    const { size, lazyLoad, destroyOnHide, trigger } = toRefs(props);
    const prefixCls = getPrefixCls('tabs');
    const { mergedSize } = useSize(size);
    const mergedPosition = computed(() =>
      props.direction === 'vertical' ? 'left' : props.position
    );
    const mergedDirection = computed(() =>
      ['left', 'right'].includes(mergedPosition.value)
        ? 'vertical'
        : 'horizontal'
    );
    const { children, components } = useChildrenComponents('TabPane');

    const tabMap = reactive(new Map<number, TabData>());
    const sortedTabs = computed(() => {
      const tabData: TabData[] = [];
      components.value.forEach((id) => {
        const tab = tabMap.get(id);
        if (tab) tabData.push(tab);
      });
      return tabData;
    });
    const tabKeys = computed(() => sortedTabs.value.map((item) => item.key));

    const addItem = (id: number, data: any) => {
      tabMap.set(id, data);
    };

    const removeItem = (id: number) => {
      tabMap.delete(id);
    };

    const _activeKey = ref(props.defaultActiveKey);

    const computedActiveKey = computed(() => {
      const activeKey = props.activeKey ?? _activeKey.value;
      if (isUndefined(activeKey)) {
        return tabKeys.value[0];
      }
      return activeKey;
    });

    const activeIndex = computed(() => {
      const index = tabKeys.value.indexOf(computedActiveKey.value);
      if (index === -1) {
        return 0;
      }
      return index;
    });

    provide(
      tabsInjectionKey,
      reactive({
        lazyLoad,
        destroyOnHide,
        activeKey: computedActiveKey,
        addItem,
        removeItem,
        trigger,
      })
    );

    const handleChange = (key: string | number) => {
      if (key !== computedActiveKey.value) {
        _activeKey.value = key;
        emit('update:activeKey', key);
        emit('change', key);
      }
    };

    const handleClick = (key: string | number, e: Event) => {
      handleChange(key);
      emit('tabClick', key, e);
    };

    const handleAdd = (ev: Event) => {
      emit('add', ev);
      if (props.autoSwitch) {
        nextTick(() => {
          const lastKey = tabKeys.value[tabKeys.value.length - 1];
          handleChange(lastKey);
        });
      }
    };

    const handleDelete = (key: string | number, ev: Event) => {
      emit('delete', key, ev);
    };

    const configCtx = inject(configProviderInjectionKey, undefined);
    const rtl = computed(() => configCtx?.rtl ?? false);

    onMounted(() => {
      nextTick(() => {
        handleClick(Number(computedActiveKey.value), new MouseEvent('init'));
      });
    });

    const renderContent = () => {
      return (
        <div
          class={[
            `${prefixCls}-content`,
            {
              [`${prefixCls}-content-hide`]: props.hideContent,
            },
          ]}
        >
          <div
            class={[
              `${prefixCls}-content-list`,
              {
                [`${prefixCls}-content-animation`]: props.animation,
              },
            ]}
            style={{
              marginLeft: rtl.value ? 'auto' : `-${activeIndex.value * 100}%`,
              marginRight: rtl.value ? `-${activeIndex.value * 100}%` : 'auto',
            }}
          >
            {children.value}
          </div>
        </div>
      );
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${mergedDirection.value}`,
      `${prefixCls}-${mergedPosition.value}`,
      `${prefixCls}-type-${props.type}`,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-justify`]: props.justify,
      },
      rtl.value ? `${prefixCls}-rtl` : '',
    ]);

    return () => {
      children.value = slots.default?.();

      return (
        <div class={cls.value}>
          {mergedPosition.value === 'bottom' && renderContent()}
          <TabsNav
            v-slots={{ extra: slots.extra }}
            tabs={sortedTabs.value}
            activeKey={computedActiveKey.value}
            activeIndex={activeIndex.value}
            direction={mergedDirection.value}
            position={mergedPosition.value}
            editable={props.editable}
            animation={props.animation}
            showAddButton={props.showAddButton}
            headerPadding={props.headerPadding}
            scrollPosition={props.scrollPosition}
            size={mergedSize.value}
            type={props.type}
            onClick={handleClick}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
          {mergedPosition.value !== 'bottom' && renderContent()}
        </div>
      );
    };
  },
});
