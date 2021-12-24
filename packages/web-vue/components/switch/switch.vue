<template>
  <button
    type="button"
    :class="cls"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span :class="`${prefixCls}-handle`">
      <span :class="`${prefixCls}-handle-icon`">
        <icon-loading v-if="loading" />
        <template v-else>
          <slot v-if="computedCheck" name="checked-icon" />
          <slot v-else name="unchecked-icon" />
        </template>
      </span>
    </span>
    <!--  prettier-ignore  -->
    <template v-if="type !== 'line' && size !== 'small' && ($slots.checked || $slots.unchecked)">
      <span :class="`${prefixCls}-text-holder`">
        <slot v-if="computedCheck" name="checked" />
        <slot v-else name="unchecked" />
      </span>
      <span :class="`${prefixCls}-text`">
        <slot v-if="computedCheck" name="checked" />
        <slot v-else name="unchecked" />
      </span>
    </template>
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconLoading from '../icon/icon-loading';
import { EmitType } from '../_utils/types';

const SWITCH_SIZES = ['small', 'medium'] as const;
type SwitchSize = typeof SWITCH_SIZES[number];
const SWITCH_TYPES = ['circle', 'round', 'line'] as const;
type SwitchType = typeof SWITCH_TYPES[number];

export default defineComponent({
  name: 'Switch',
  components: {
    IconLoading,
  },
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    /**
     * @zh 默认选中状态（非受控状态）
     * @en Default selected state (uncontrolled state)
     */
    defaultChecked: {
      type: Boolean,
      default: false,
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
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 开关的类型
     * @en Type of switch
     * @values 'circle', 'round', 'line'
     */
    type: {
      type: String as PropType<SwitchType>,
      default: 'circle',
    },
    /**
     * @zh 开关的大小
     * @en Size of switch
     * @values 'small', 'medium'
     */
    size: {
      type: String as PropType<SwitchSize>,
      default: 'medium',
    },
    /**
     * @zh 选中时的值
     * @en Value when checked
     * @version 2.12.0
     */
    checkedValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    /**
     * @zh 未选中时的值
     * @en Value when unchecked
     * @version 2.12.0
     */
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
     * @zh 选中时的开关颜色
     * @en The color of the switch when checked
     * @version 2.12.0
     */
    checkedColor: {
      type: String,
    },
    /**
     * @zh 选中时的开关颜色
     * @en The color of the switch when unchecked
     * @version 2.12.0
     */
    uncheckedColor: {
      type: String,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: boolean | string | number) => void>
      >,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {boolean|string|number} value
     */
    'change',
  ],
  /**
   * @zh 打开状态时的文案（`type='line'`和`size='small'`时不生效）
   * @en Copywriting when opened (not effective when `type='line'` and `size='small'`)
   * @slot checked
   */
  /**
   * @zh 关闭状态时的文案（`type='line'`和`size='small'`时不生效）
   * @en Copywriting when closed (not effective when `type='line'` and `size='small'`)
   * @slot unchecked
   */
  /**
   * @zh 打开状态时，按钮上的图标
   * @en The icon on the button when opened
   * @slot checked-icon
   */
  /**
   * @zh 关闭状态时，按钮上的图标
   * @en The icon on the button when closed
   * @slot unchecked-icon
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('switch');

    const _checked = ref(
      props.defaultChecked ? props.checkedValue : props.uncheckedValue
    );
    const computedCheck = computed(
      () => (props.modelValue ?? _checked.value) === props.checkedValue
    );

    const handleClick = (ev: Event) => {
      const checked = !computedCheck.value;
      _checked.value = checked ? props.checkedValue : props.uncheckedValue;
      emit('update:modelValue', _checked.value);
      emit('change', _checked.value, ev);
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-type-${props.type}`,
      {
        [`${prefixCls}-small`]: props.size === 'small',
        [`${prefixCls}-checked`]: computedCheck.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-loading`]: props.loading,
      },
    ]);

    const buttonStyle = computed(() => {
      if (computedCheck.value && props.checkedColor) {
        return {
          backgroundColor: props.checkedColor,
        };
      }
      if (!computedCheck.value && props.uncheckedColor) {
        return {
          backgroundColor: props.uncheckedColor,
        };
      }
      return undefined;
    });

    return {
      prefixCls,
      cls,
      buttonStyle,
      computedCheck,
      handleClick,
    };
  },
});
</script>
