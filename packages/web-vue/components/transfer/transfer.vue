<template>
  <div :class="cls">
    <transfer-view
      type="source"
      :class="`${prefixCls}-view-source`"
      :title="sourceTitle"
      :data-info="dataInfo.sourceInfo"
      :data="dataInfo.sourceInfo.data"
      :selected="computedSelected"
      :show-search="showSearch"
      :simple="simple"
      @search="handleSearch"
    />
    <div v-if="!simple" :class="[`${prefixCls}-operations`]">
      <arco-button
        size="small"
        shape="round"
        :disabled="dataInfo.sourceInfo.validSelected.length === 0"
        @click="handleClick('target')"
      >
        <template #icon>
          <icon-right />
        </template>
      </arco-button>
      <arco-button
        v-if="!oneWay"
        size="small"
        shape="round"
        :disabled="dataInfo.targetInfo.validSelected.length === 0"
        @click="handleClick('source')"
      >
        <template #icon>
          <icon-left />
        </template>
      </arco-button>
    </div>
    <transfer-view
      type="target"
      :class="`${prefixCls}-view-target`"
      :title="targetTitle"
      :data-info="dataInfo.targetInfo"
      :data="dataInfo.targetInfo.data"
      :selected="computedSelected"
      :allow-clear="oneWay"
      :show-search="showSearch"
      :simple="simple"
      @search="handleSearch"
    />
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
     * @zh 源选择框和目标选择框的标题
     * @en The title of the source and target selection boxes
     */
    title: {
      type: Array as PropType<string[]>,
      default: () => ['Source', 'Target'],
    },
    // for JSX
    onChange: [Function, Array],
    onSelect: [Function, Array],
    onSearch: [Function, Array],
  },
  emits: [
    'update:modelValue',
    'update:selected',
    /**
     * @zh 目标选择框的值改变时触发
     * @en Triggered when the value of the target selection box changes
     * @property {string[]} value
     */
    'change',
    /**
     * @zh 选中的值改变时触发
     * @en Triggered when the selected value changes
     * @property {string[]} selected
     */
    'select',
    /**
     * @zh 用户搜索时触发
     * @en Triggered when the user searches
     * @property {string} value
     * @property {'target'|'source'} type
     */
    'search',
  ],
  /**
   * @zh 选项
   * @en Option
   * @slot item
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
      sourceTitle,
      targetTitle,
      handleClick,
      handleSearch,
    };
  },
});
</script>
