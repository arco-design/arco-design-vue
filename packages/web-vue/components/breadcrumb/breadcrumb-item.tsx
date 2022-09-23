import { computed, defineComponent, inject, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconMore from '../icon/icon-more';
import IconDown from '../icon/icon-down';
import IconObliqueLine from '../icon/icon-oblique-line';
import { breadcrumbInjectKey } from './context';
import { BreadcrumbRoute } from './interface';
import Dropdown, { Doption, DropDownProps } from '../dropdown';

export default defineComponent({
  name: 'BreadcrumbItem',
  inheritAttrs: false,
  props: {
    /**
     * @zh 分隔符文字
     * @en Delimiter text
     * @version 2.36.0
     */
    separator: {
      type: [String, Number],
    },
    /**
     * @zh 下拉菜单内容
     * @en Dropdown content
     * @version 2.36.0
     */
    droplist: {
      type: Array as PropType<BreadcrumbRoute['children']>,
    },
    /**
     * @zh 下拉菜单属性
     * @en Dropdown props
     * @version 2.36.0
     */
    dropdownProps: {
      type: Object as PropType<DropDownProps>,
    },
    // private
    index: {
      type: Number,
      default: 0,
    },
  },
  /**
   * @zh 自定义分隔符
   * @en Custom separator
   * @slot separator
   * @version 2.36.0
   */
  /**
   * @zh 自定义下拉菜单
   * @en Custom droplist
   * @slot droplist
   * @version 2.36.0
   */
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('breadcrumb-item');
    const breadcrumbCtx = inject(breadcrumbInjectKey, undefined);
    const dropdownVisible = ref(false);

    const show = computed(() => {
      if (breadcrumbCtx && breadcrumbCtx.needHide) {
        if (
          props.index > 1 &&
          props.index <= breadcrumbCtx.total - breadcrumbCtx.maxCount
        ) {
          return false;
        }
      }
      return true;
    });

    const displayMore = computed(() => {
      if (breadcrumbCtx && breadcrumbCtx.needHide) {
        return props.index === 1;
      }
      return false;
    });

    const showSeparator = computed(() =>
      breadcrumbCtx ? props.index < breadcrumbCtx.total - 1 : true
    );

    const handleVisibleChange = (visible: boolean) => {
      dropdownVisible.value = visible;
    };

    const separatorRender = () => {
      if (!showSeparator.value) return null;
      const separatorElement = slots.separator?.() ??
        props.separator ??
        breadcrumbCtx?.slots.separator?.() ??
        breadcrumbCtx?.separator ?? <IconObliqueLine />;
      return (
        <div aria-hidden="true" class={`${prefixCls}-separator`}>
          {separatorElement}
        </div>
      );
    };

    const renderItem = () => {
      return (
        <div
          role="listitem"
          class={[
            prefixCls,
            {
              [`${prefixCls}-with-dropdown`]: props.droplist || slots.droplist,
            },
          ]}
          {...(displayMore.value
            ? { 'aria-label': 'ellipses of breadcrumb items' }
            : undefined)}
          {...attrs}
        >
          {displayMore.value
            ? breadcrumbCtx?.slots['more-icon']?.() ?? <IconMore />
            : slots.default?.()}
          {(props.droplist || slots.droplist) && (
            <span
              aria-hidden
              class={[
                `${prefixCls}-dropdown-icon`,
                {
                  [`${prefixCls}-dropdown-icon-active`]: dropdownVisible.value,
                },
              ]}
            >
              <IconDown />
            </span>
          )}
        </div>
      );
    };

    const renderDropdownContent = () => {
      return (
        slots.droplist?.() ??
        props.droplist?.map((item) => (
          <Doption value={item.path}>{item.label}</Doption>
        ))
      );
    };

    const renderDropdown = () => {
      return (
        <Dropdown
          v-slots={{ content: renderDropdownContent }}
          popupVisible={dropdownVisible.value}
          onPopupVisibleChange={handleVisibleChange}
          {...props.dropdownProps}
        >
          {renderItem()}
        </Dropdown>
      );
    };

    return () => {
      if (show.value) {
        return (
          <>
            {slots.droplist || props.droplist ? renderDropdown() : renderItem()}
            {separatorRender()}
          </>
        );
      }
      return null;
    };
  },
});
