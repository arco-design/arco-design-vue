import { computed, createVNode, defineComponent, inject, PropType, toRefs } from 'vue';

import AutoTooltip from '../_components/auto-tooltip/auto-tooltip';
import IconHover from '../_components/icon-hover.vue';
import { getPrefixCls } from '../_utils/global-config';
import { isBoolean, isFunction, isObject } from '../_utils/is';
import Button from '../button';
import Checkbox from '../checkbox';
import IconCaretDown from '../icon/icon-caret-down';
import IconCaretUp from '../icon/icon-caret-up';
import IconFilter from '../icon/icon-filter';
import { useI18n } from '../locale';
import Radio from '../radio';
import Trigger from '../trigger';
import { TableContext, tableInjectionKey } from './context';
import { useColumnFilter } from './hooks/use-column-filter';
import { useColumnSorter } from './hooks/use-column-sorter';
import { TableColumnData, TableOperationColumn } from './interface';
import { getFixedCls, getStyle } from './utils';

export default defineComponent({
  name: 'Th',
  props: {
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({}),
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      default: () => [],
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    resizable: Boolean,
  },
  setup(props, { slots }) {
    const { column } = toRefs(props);
    const prefixCls = getPrefixCls('table');
    const { t } = useI18n();

    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});

    const resizing = computed(
      () => props.column?.dataIndex && tableCtx.resizingColumn === props.column.dataIndex,
    );

    const tooltipProps = computed(() => {
      if (isObject(props.column?.tooltip)) {
        return props.column.tooltip;
      }
      return undefined;
    });

    const filterIconAlignLeft = computed(() => {
      if (props.column?.filterable && isBoolean(props.column.filterable.alignLeft)) {
        return props.column.filterable.alignLeft;
      }
      return tableCtx.filterIconAlignLeft;
    });

    const { sortOrder, hasSorter, hasAscendBtn, hasDescendBtn, nextSortOrder, handleClickSorter } =
      useColumnSorter({
        column,
        tableCtx,
      });

    const {
      filterPopupVisible,
      isFilterActive,
      isMultipleFilter,
      columnFilterValue,
      handleFilterPopupVisibleChange,
      setFilterValue,
      handleCheckboxFilterChange,
      handleRadioFilterChange,
      handleFilterConfirm,
      handleFilterReset,
    } = useColumnFilter({
      column,
      tableCtx,
    });

    const renderFilterContent = () => {
      const { filterable } = props.column;

      if (props.column.slots?.['filter-content']) {
        return props.column.slots?.['filter-content']({
          filterValue: columnFilterValue.value,
          setFilterValue,
          handleFilterConfirm,
          handleFilterReset,
        });
      }

      if (filterable?.slotName) {
        return tableCtx?.slots?.[filterable?.slotName]?.({
          filterValue: columnFilterValue.value,
          setFilterValue,
          handleFilterConfirm,
          handleFilterReset,
        });
      }

      if (filterable?.renderContent) {
        return filterable.renderContent({
          filterValue: columnFilterValue.value,
          setFilterValue,
          handleFilterConfirm,
          handleFilterReset,
        });
      }

      return (
        <div class={`${prefixCls}-filters-content`}>
          <ul class={`${prefixCls}-filters-list`}>
            {filterable?.filters?.map((item, index) => {
              return (
                <li class={`${prefixCls}-filters-item`} key={`${item.value}-${index}`}>
                  {isMultipleFilter.value ? (
                    <Checkbox
                      value={item.value}
                      modelValue={columnFilterValue.value}
                      uninjectGroupContext
                      onChange={handleCheckboxFilterChange}
                    >
                      {item.text}
                    </Checkbox>
                  ) : (
                    <Radio
                      value={item.value}
                      modelValue={columnFilterValue.value[0] ?? ''}
                      uninjectGroupContext
                      onChange={handleRadioFilterChange}
                    >
                      {item.text}
                    </Radio>
                  )}
                </li>
              );
            })}
          </ul>
          <div class={`${prefixCls}-filters-bottom`}>
            <Button size="mini" onClick={handleFilterReset}>
              {t('table.resetText')}
            </Button>
            <Button type="primary" size="mini" onClick={handleFilterConfirm}>
              {t('table.okText')}
            </Button>
          </div>
        </div>
      );
    };

    const renderFilter = () => {
      const { filterable } = props.column;

      if (!filterable) {
        return null;
      }

      return (
        <Trigger
          v-slots={{ content: renderFilterContent }}
          popupVisible={filterPopupVisible.value}
          trigger="click"
          autoFitPosition
          popupOffset={filterIconAlignLeft.value ? 4 : 0}
          onPopupVisibleChange={handleFilterPopupVisibleChange}
          {...filterable.triggerProps}
        >
          <IconHover
            class={[
              `${prefixCls}-filters`,
              {
                [`${prefixCls}-filters-active`]: isFilterActive.value,
                [`${prefixCls}-filters-open`]: filterPopupVisible.value,
                [`${prefixCls}-filters-align-left`]: filterIconAlignLeft.value,
              },
            ]}
            disabled={!filterIconAlignLeft.value}
            {...{ onClick: (ev: Event) => ev.stopPropagation() }}
          >
            {props.column.slots?.['filter-icon']?.() ?? filterable.icon?.() ?? <IconFilter />}
          </IconHover>
        </Trigger>
      );
    };

    const cellCls = computed(() => {
      const cls: any[] = [
        `${prefixCls}-cell`,
        `${prefixCls}-cell-align-${
          props.column?.align ?? (props.column.children ? 'center' : 'left')
        }`,
      ];

      if (hasSorter.value) {
        cls.push(`${prefixCls}-cell-with-sorter`, {
          [`${prefixCls}-cell-next-ascend`]: nextSortOrder.value === 'ascend',
          [`${prefixCls}-cell-next-descend`]: nextSortOrder.value === 'descend',
        });
      }

      if (filterIconAlignLeft.value) {
        cls.push(`${prefixCls}-cell-with-filter`);
      }

      return cls;
    });

    const renderTitle = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props.column?.titleSlotName && tableCtx.slots?.[props.column.titleSlotName]) {
        return tableCtx.slots[props.column.titleSlotName]?.({
          column: props.column,
        });
      }
      if (props.column?.slots?.title) {
        return props.column.slots.title();
      }
      if (isFunction(props.column.title)) {
        return props.column.title();
      }
      return props.column.title;
    };

    const renderCellContent = () => (
      <>
        {props.column?.ellipsis && props.column?.tooltip ? (
          <AutoTooltip class={`${prefixCls}-th-title`} tooltipProps={tooltipProps.value}>
            {renderTitle()}
          </AutoTooltip>
        ) : (
          <span
            class={[
              `${prefixCls}-th-title`,
              { [`${prefixCls}-text-ellipsis`]: props.column?.ellipsis },
            ]}
          >
            {renderTitle()}
          </span>
        )}
        {hasSorter.value && (
          <span class={`${prefixCls}-sorter`}>
            {hasAscendBtn.value && (
              <div
                class={[
                  `${prefixCls}-sorter-icon`,
                  {
                    [`${prefixCls}-sorter-icon-active`]: sortOrder.value === 'ascend',
                  },
                ]}
              >
                <IconCaretUp />
              </div>
            )}
            {hasDescendBtn.value && (
              <div
                class={[
                  `${prefixCls}-sorter-icon`,
                  {
                    [`${prefixCls}-sorter-icon-active`]: sortOrder.value === 'descend',
                  },
                ]}
              >
                <IconCaretDown />
              </div>
            )}
          </span>
        )}
        {filterIconAlignLeft.value && renderFilter()}
      </>
    );

    const renderCell = () => {
      if (hasSorter.value) {
        return (
          <button type="button" class={cellCls.value} onClick={handleClickSorter}>
            {renderCellContent()}
          </button>
        );
      }

      return <span class={cellCls.value}>{renderCellContent()}</span>;
    };

    const style = computed(() => {
      const colSpan = props.column.colSpan ?? 1;
      const rowSpan = props.column.rowSpan ?? 1;

      return {
        ...getStyle(props.column, {
          dataColumns: props.dataColumns,
          operations: props.operations,
        }),
        ...(colSpan > 1 ? { gridColumn: `span ${colSpan}` } : undefined),
        ...(rowSpan > 1 ? { gridRow: `span ${rowSpan}` } : undefined),
        ...props.column?.cellStyle,
        ...props.column?.headerCellStyle,
      };
    });

    const cls = computed(() => [
      `${prefixCls}-th`,
      {
        [`${prefixCls}-col-sorted`]: Boolean(sortOrder.value),
        [`${prefixCls}-th-resizing`]: resizing.value,
      },
      ...getFixedCls(prefixCls, props.column),
      props.column?.cellClass,
      props.column?.headerCellClass,
    ]);

    const handleResizeMouseDown = (ev: PointerEvent) => {
      if (!props.column?.dataIndex) {
        return;
      }
      tableCtx.onThMouseDown?.(props.column.dataIndex, ev);
    };

    return () => {
      return createVNode(
        slots.th?.({
          column: props.column,
        })[0] ?? 'div',
        {
          class: cls.value,
          style: style.value,
        },
        {
          default: () => [
            renderCell(),
            !filterIconAlignLeft.value && renderFilter(),
            props.resizable && (
              <span class={`${prefixCls}-column-handle`} onPointerdown={handleResizeMouseDown} />
            ),
          ],
        },
      );
    };
  },
});
