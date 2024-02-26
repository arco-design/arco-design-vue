<template>
  <div :class="cls">
    <transfer-view
      type="source"
      :class="`${prefixCls}-view-source`"
      :title="sourceTitle"
      :data-info="dataInfo.sourceInfo"
      :data="dataInfo.sourceInfo.data"
      :disabled="mergedDisabled"
      :selected="computedSelected"
      :show-search="showSearch"
      :show-select-all="showSelectAll"
      :simple="simple"
      :input-search-props="sourceInputSearchProps"
      @search="handleSearch"
    >
      <template v-if="$slots.source" #default="slotData">
        <slot name="source" v-bind="slotData" />
      </template>
      <template v-if="$slots['source-title']" #title="titleProps">
        <slot name="source-title" v-bind="titleProps" />
      </template>
    </transfer-view>
    <div v-if="!simple" :class="[`${prefixCls}-operations`]">
      <arco-button
        tabindex="-1"
        aria-label="Move selected right"
        size="small"
        shape="round"
        :disabled="dataInfo.sourceInfo.validSelected.length === 0"
        @click="handleClick('target')"
      >
        <template #icon>
          <slot name="to-target-icon"> <icon-right /> </slot>
        </template>
      </arco-button>
      <arco-button
        v-if="!oneWay"
        tabindex="-1"
        aria-label="Move selected left"
        size="small"
        shape="round"
        :disabled="dataInfo.targetInfo.validSelected.length === 0"
        @click="handleClick('source')"
      >
        <template #icon>
          <slot name="to-source-icon"><icon-left /></slot>
        </template>
      </arco-button>
    </div>
    <transfer-view
      type="target"
      :class="`${prefixCls}-view-target`"
      :title="targetTitle"
      :data-info="dataInfo.targetInfo"
      :data="dataInfo.targetInfo.data"
      :disabled="mergedDisabled"
      :selected="computedSelected"
      :allow-clear="oneWay"
      :show-search="showSearch"
      :show-select-all="showSelectAll"
      :simple="simple"
      :input-search-props="targetInputSearchProps"
      @search="handleSearch"
    >
      <template v-if="$slots.target" #default="slotData">
        <slot name="target" v-bind="slotData" />
      </template>
      <template v-if="$slots['target-title']" #title="titleProps">
        <slot name="target-title" v-bind="titleProps" />
      </template>
    </transfer-view>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  toRef,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import ArcoButton from '../button';
import TransferView from './transfer-view.vue';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';
import { DataInfo, TransferItem } from './interface';
import { transferInjectionKey } from './context';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'Transfer',
  components: {
    ArcoButton,
    TransferView,
    IconLeft,
    IconRight,
  },
  props: {
    /**
     * @zh 穿梭框的数据
     * @en Data of the transfer
     */
    data: {
      type: Array as PropType<TransferItem[]>,
      default: () => [],
    },
    /**
     * @zh 目标选择框中的值
     * @en Value in the target selection box
     * @vModel
     */
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    /**
     * @zh 目标选择框中默认的值（非受控状态）
     * @en The default value in the target selection box (uncontrolled state)
     */
    defaultValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 选中的选项值
     * @en Selected option value
     * @vModel
     */
    selected: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    /**
     * @zh 默认选中的选项值（非受控状态）
     * @en The option value selected by default (uncontrolled state)
     */
    defaultSelected: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启简单模式（点击选项即移动）
     * @en Whether to open the simple mode (click the option to move)
     */
    simple: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启单向模式（仅可移动到目标选择框）
     * @en Whether to open the one-way mode (only move to the target selection box)
     */
    oneWay: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否显示搜索框
     * @en Whether to show the search input
     */
    showSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否展示全选勾选框
     * @en Whether show select all checkbox on the header
     * @version 2.39.0
     */
    showSelectAll: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 源选择框和目标选择框的标题
     * @en The title of the source and target selection boxes
     */
    title: {
      type: Array as PropType<string[]>,
      default: () => ['Source', 'Target'],
    },
    /**
     * @zh 源选择框的搜索框配置
     * @en Search box configuration for source selection box
     * @version 2.51.1
     */
    sourceInputSearchProps: {
      type: Object,
    },
    /**
     * @zh 目标选择框的搜索框配置
     * @en Search box configuration for target selection box
     * @version 2.51.1
     */
    targetInputSearchProps: {
      type: Object,
    },
  },
  emits: {
    'update:modelValue': (value: string[]) => true,
    'update:selected': (selected: string[]) => true,
    /**
     * @zh 目标选择框的值改变时触发
     * @en Triggered when the value of the target selection box changes
     * @property {string[]} value
     */
    'change': (value: string[]) => true,
    /**
     * @zh 选中的值改变时触发
     * @en Triggered when the selected value changes
     * @property {string[]} selected
     */
    'select': (selected: string[]) => true,
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @property {string} value
     * @property {'target'|'source'} type
     */
    'search': (value: string, type: 'target' | 'source') => true,
  },
  /**
   * @zh 选项
   * @en Option
   * @slot item
   * @binding {string} value
   * @binding {string} label
   */
  /**
   * @zh 源面板
   * @en Source content
   * @slot source
   * @binding {TransferItem[]} data
   * @binding {string[]} selectedKeys
   * @binding {(value: string[]) => void} onSelect
   * @version 2.39.0
   */
  /**
   * @zh 目标面板
   * @en Target content
   * @slot target
   * @binding {TransferItem[]} data
   * @binding {string[]} selectedKeys
   * @binding {(value: string[]) => void} onSelect
   * @version 2.39.0
   */
  /**
   * @zh 源标题插槽
   * @en Source Header
   * @slot source-title
   * @binding {number} countTotal
   * @binding {number} countSelected
   * @binding {string} searchValue
   * @binding {boolean} checked
   * @binding {boolean} indeterminate
   * @binding {(checked:boolean) => void} onSelectAllChange
   * @binding {() => void} onClear
   * @version 2.45.0
   */
  /**
   * @zh 目标标题插槽
   * @en Target Header
   * @slot target-title
   * @binding {number} countTotal
   * @binding {number} countSelected
   * @binding {string} searchValue
   * @binding {boolean} checked
   * @binding {boolean} indeterminate
   * @binding {(checked:boolean) => void} onSelectAllChange
   * @binding {() => void} onClear
   * @version 2.45.0
   */
  /**
   * @zh 移至源图标插槽
   * @en To source icon slot
   * @slot to-source-icon
   * @version 2.52.0
   */
  /**
   * @zh 移至目标图标插槽
   * @en To target icon slot
   * @slot to-target-icon
   * @version 2.52.0
   */
  setup(props, { emit, slots }) {
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });
    const prefixCls = getPrefixCls('transfer');

    const _target = ref(props.defaultValue);
    const computedTarget = computed(() => props.modelValue ?? _target.value);
    const _selected = ref(props.defaultSelected);
    const computedSelected = computed(() => props.selected ?? _selected.value);

    const sourceTitle = computed(() => props.title?.[0]);
    const targetTitle = computed(() => props.title?.[1]);

    const dataInfo = computed(() => {
      const sourceInfo: DataInfo = {
        data: [],
        allValidValues: [],
        selected: [],
        validSelected: [],
      };

      const targetInfo: DataInfo = {
        data: [],
        allValidValues: [],
        selected: [],
        validSelected: [],
      };

      for (const item of props.data) {
        if (computedTarget.value.includes(item.value)) {
          targetInfo.data.push(item);
          if (!item.disabled) {
            targetInfo.allValidValues.push(item.value);
          }
          if (computedSelected.value.includes(item.value)) {
            targetInfo.selected.push(item.value);
            if (!item.disabled) {
              targetInfo.validSelected.push(item.value);
            }
          }
        } else {
          sourceInfo.data.push(item);
          if (!item.disabled) {
            sourceInfo.allValidValues.push(item.value);
          }
          if (computedSelected.value.includes(item.value)) {
            sourceInfo.selected.push(item.value);
            if (!item.disabled) {
              sourceInfo.validSelected.push(item.value);
            }
          }
        }
      }

      return {
        sourceInfo,
        targetInfo,
      };
    });

    const handleSearch = (value: string, type: 'target' | 'source') => {
      emit('search', value, type);
    };

    const moveTo = (values: string[], target: 'target' | 'source') => {
      const newTarget =
        target === 'target'
          ? [...computedTarget.value, ...values]
          : computedTarget.value.filter((value) => !values.includes(value));
      handleSelect(
        dataInfo.value[target === 'target' ? 'targetInfo' : 'sourceInfo']
          .selected
      );
      _target.value = newTarget;
      emit('update:modelValue', newTarget);
      emit('change', newTarget);
      eventHandlers.value?.onChange?.();
    };

    const handleClick = (target: 'target' | 'source') => {
      const values =
        target === 'target'
          ? dataInfo.value.sourceInfo.validSelected
          : dataInfo.value.targetInfo.validSelected;
      moveTo(values, target);
    };

    const handleSelect = (values: string[]) => {
      _selected.value = values;
      emit('update:selected', values);
      emit('select', values);
    };

    provide(
      transferInjectionKey,
      reactive({
        selected: computedSelected,
        slots,
        moveTo,
        onSelect: handleSelect,
      })
    );

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-simple`]: props.simple,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    return {
      prefixCls,
      cls,
      dataInfo,
      computedSelected,
      mergedDisabled,
      sourceTitle,
      targetTitle,
      handleClick,
      handleSearch,
    };
  },
});
</script>
