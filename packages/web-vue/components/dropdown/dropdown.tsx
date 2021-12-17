import type { PropType } from 'vue';
import { defineComponent, reactive } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TriggerEvent } from '../_utils/constant';
import Trigger from '../trigger';
import {
  DropdownPanel,
  DropDownOptGroup as OptGroup,
  DropDownOption as Option,
} from '../_components/dropdown';
import { isGroup, isSubmenu, travelDropDownChildren } from './utils';
import { DropdownOption } from './interface';
import { useTrigger } from '../_hooks/use-trigger';
import IconRight from '../icon/icon-right';

const DROPDOWN_POSITIONS = ['top', 'tl', 'tr', 'bottom', 'bl', 'br'] as const;
type DropdownPosition = typeof DROPDOWN_POSITIONS[number];

export default defineComponent({
  name: 'Dropdown',
  props: {
    /**
     * @zh 弹出框是否可见
     * @en Whether the popup is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 弹出框默认是否可见（非受控模式）
     * @en Whether the popup is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click','focus','contextMenu'
     */
    trigger: {
      type: String as PropType<TriggerEvent>,
      default: 'click',
    },
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'top','tl','tr','bottom','bl','br'
     */
    position: {
      type: String as PropType<DropdownPosition>,
      default: 'bottom',
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
  },
  emits: [
    'update:popupVisible',
    /**
     * @zh 下拉框显示状态发生改变时触发
     * @en Triggered when the display status of the drop-down box changes
     */
    'popupVisibleChange',
    /**
     * @zh 用户选择时触发
     * @en Triggered when the user selects
     */
    'select',
  ],
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  /**
   * @zh 页脚
   * @en Footer
   * @slot footer
   * @version 2.10.0
   */
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('dropdown');

    const { _popupVisible, computedPopupVisible, handlePopupVisibleChange } =
      useTrigger(props, { emit });

    const handleClickOption = (value: string | number) => {
      emit('select', value);
      handlePopupVisibleChange(false);
    };

    const path = reactive<Array<string | number>>([]);

    const handleSubmenuChange = (
      visible: boolean,
      value: string | number,
      level: number
    ) => {
      if (visible) {
        path[level - 1] = value;
      } else {
        path.splice(level - 1);
      }
    };

    const renderOption = (item: DropdownOption, level = 1) => {
      if (isGroup(item)) {
        return (
          <OptGroup
            v-slots={{
              label: item._slots?.title,
              default: () =>
                item.options.map((item) => renderOption(item, level)),
            }}
            {...item._props}
            label={item.title}
          />
        );
      }
      if (isSubmenu(item)) {
        return (
          <Trigger
            v-slots={{
              content: () => (
                <DropdownPanel
                  v-slots={{
                    empty: slots.empty,
                    footer: item.footer,
                    default: () =>
                      item.children?.map((item) =>
                        renderOption(item, level + 1)
                      ),
                  }}
                  class={`${prefixCls}-submenu`}
                  isEmpty={item.children?.length === 0}
                />
              ),
            }}
            disabled={item.disabled}
            trigger={item.trigger ?? 'click'}
            position={item.position ?? 'rt'}
            popupOffset={4}
            popupVisible={path.includes(item.value)}
            onPopupVisibleChange={(visible: boolean) =>
              handleSubmenuChange(visible, item.value, level)
            }
          >
            <Option
              v-slots={{
                default: item.render,
                suffix: () => <IconRight />,
              }}
              {...item._props}
              value={item.value}
              disabled={item.disabled}
              isActive={path.includes(item.value)}
            />
          </Trigger>
        );
      }

      return (
        <Option
          v-slots={item._slots}
          {...item._props}
          value={item.value}
          disabled={item.disabled}
          onClick={handleClickOption}
        />
      );
    };

    return () => {
      const options = travelDropDownChildren(slots.content?.() ?? []);

      return (
        <Trigger
          v-slots={{
            content: () => (
              <DropdownPanel
                v-slots={{
                  empty: slots.empty,
                  footer: slots.footer,
                }}
                isEmpty={options.length === 0}
              >
                {options.map((item) => renderOption(item))}
              </DropdownPanel>
            ),
          }}
          popupVisible={computedPopupVisible.value}
          animationName={'slide-dynamic-origin'}
          autoFitTransformOrigin
          trigger={props.trigger}
          position={props.position}
          popupOffset={4}
          popupContainer={props.popupContainer}
          onPopupVisibleChange={handlePopupVisibleChange}
        >
          {slots.default?.()}
        </Trigger>
      );
    };
  },
});
