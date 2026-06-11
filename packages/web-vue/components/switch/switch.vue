<template>
  <button
    type="button"
    role="switch"
    :aria-checked="computedCheck"
    :class="cls"
    :style="buttonStyle"
    :disabled="mergedDisabled"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span :class="`${prefixCls}-handle`">
      <span :class="`${prefixCls}-handle-icon`">
        <icon-loading v-if="computedLoading" />
        <template v-else>
          <slot v-if="computedCheck" name="checked-icon" />
          <slot v-else name="unchecked-icon" />
        </template>
      </span>
    </span>
    <!--  prettier-ignore  -->
    <template
      v-if="
        type !== 'line' &&
        size !== 'small' &&
        ($slots.checked || checkedText || $slots.unchecked || uncheckedText)
      "
    >
      <span :class="`${prefixCls}-text-holder`">
        <slot v-if="computedCheck" name="checked">{{ checkedText }}</slot>
        <slot v-else name="unchecked">{{ uncheckedText }}</slot>
      </span>
      <span :class="`${prefixCls}-text`">
        <slot v-if="computedCheck" name="checked">{{ checkedText }}</slot>
        <slot v-else name="unchecked">{{ uncheckedText }}</slot>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, getCurrentInstance, ref, toRefs, watch } from 'vue';

  import { useFormItem } from '../_hooks/use-form-item';
  import { useSize } from '../_hooks/use-size';
  import { getPrefixCls } from '../_utils/global-config';
  import { isFunction, isNull, isUndefined } from '../_utils/is';
  import IconLoading from '../icon/icon-loading';

  defineOptions({ name: 'Switch' });

  const props = defineProps({
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
     * @zh 是否在切换后自动进入加载中状态，并在外部 `v-model` 回写后结束
     * @en Whether to automatically enter the loading state after switching and stop after the external `v-model` value is updated
     */
    autoLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 开关的类型
     * @en Type of switch
     * @values 'circle', 'round', 'line'
     */
    type: {
      type: String as PropType<'circle' | 'round' | 'line'>,
      default: 'circle',
    },
    /**
     * @zh 开关的大小
     * @en Size of switch
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<'small' | 'medium'>,
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
     * @zh 未选中时的开关颜色
     * @en The color of the switch when unchecked
     * @version 2.12.0
     */
    uncheckedColor: {
      type: String,
    },
    /**
     * @zh switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。
     * @en before-change hook before the switch state changes. If false is returned or a Promise is returned and then is rejected, will stop switching
     * @version 2.37.0
     */
    beforeChange: {
      type: Function as PropType<
        (newValue: string | number | boolean) => Promise<boolean | void> | boolean | void
      >,
    },
    /**
     * @zh 打开状态时的文案（`type='line'`和`size='small'`时不生效）
     * @en Copywriting when opened (not effective when `type='line'` and `size='small'`)
     * @version 2.45.0
     */
    checkedText: {
      type: String,
    },
    /**
     * @zh 关闭状态时的文案（`type='line'`和`size='small'`时不生效）
     * @en Copywriting when closed (not effective when `type='line'` and `size='small'`)
     * @version 2.45.0
     */
    uncheckedText: {
      type: String,
    },
  });

  const emit = defineEmits<{
    'update:modelValue': [_value: boolean | string | number];
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @param { boolean | string | number } value
     * @param {Event} ev
     */
    'change': [_value: boolean | string | number, _ev: Event];
    /**
     * @zh 组件获得焦点时触发
     * @en Triggered when the component gets focus
     * @property {FocusEvent} ev
     */
    'focus': [_ev: FocusEvent];
    /**
     * @zh 组件失去焦点时触发
     * @en Fired when the component loses focus
     * @property {FocusEvent} ev
     */
    'blur': [_ev: FocusEvent];
  }>();

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

  const instance = getCurrentInstance();
  const { disabled, size, modelValue } = toRefs(props);
  const prefixCls = getPrefixCls('switch');
  const { mergedSize: configSize } = useSize(size);
  const { mergedDisabled, mergedSize, eventHandlers } = useFormItem({
    disabled,
    size: configSize,
  });

  const _checked = ref(props.defaultChecked ? props.checkedValue : props.uncheckedValue);
  const computedCheck = computed<boolean>(
    () => (props.modelValue ?? _checked.value) === props.checkedValue,
  );
  const beforeChangeLoading = ref(false);
  const autoChangeLoading = ref(false);
  const hasLoadingProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return Object.hasOwn(rawProps, 'loading');
  });
  const hasModelValueProp = computed(() => {
    const rawProps = instance?.vnode.props;

    if (!rawProps) {
      return false;
    }

    return Object.hasOwn(rawProps, 'modelValue');
  });
  const computedLoading = computed(
    () => beforeChangeLoading.value || props.loading || autoChangeLoading.value,
  );

  watch(
    modelValue!,
    () => {
      if (!hasModelValueProp.value) {
        return;
      }

      autoChangeLoading.value = false;
    },
    {
      flush: 'post',
    },
  );

  const handleChange = (checked: boolean, ev: Event) => {
    _checked.value = checked ? props.checkedValue : props.uncheckedValue;

    if (props.autoLoading && !hasLoadingProp.value && hasModelValueProp.value) {
      autoChangeLoading.value = true;
    }

    emit('update:modelValue', _checked.value);
    emit('change', _checked.value, ev);
    eventHandlers.value?.onChange?.(ev);
  };

  const handleClick = async (ev: Event) => {
    if (computedLoading.value || mergedDisabled.value) {
      return;
    }
    const checked = !computedCheck.value;
    const checkedValue = checked ? props.checkedValue : props.uncheckedValue;
    const shouldChange = props.beforeChange;

    if (isFunction(shouldChange)) {
      beforeChangeLoading.value = true;
      try {
        const result = await shouldChange(checkedValue);
        if (result ?? true) {
          handleChange(checked, ev);
        }
      } finally {
        beforeChangeLoading.value = false;
      }
    } else {
      handleChange(checked, ev);
    }
  };

  const handleFocus = (ev: FocusEvent) => {
    emit('focus', ev);
    eventHandlers.value?.onFocus?.(ev);
  };

  const handleBlur = (ev: FocusEvent) => {
    emit('blur', ev);
    eventHandlers.value?.onBlur?.(ev);
  };

  watch(modelValue!, (value) => {
    if (isUndefined(value) || isNull(value)) {
      _checked.value = props.uncheckedValue;
    }
  });

  const cls = computed(() => [
    prefixCls,
    `${prefixCls}-type-${props.type}`,
    {
      [`${prefixCls}-small`]: mergedSize.value === 'small' || mergedSize.value === 'mini',
      [`${prefixCls}-checked`]: computedCheck.value,
      [`${prefixCls}-disabled`]: mergedDisabled.value,
      [`${prefixCls}-loading`]: computedLoading.value,
      [`${prefixCls}-custom-color`]:
        props.type === 'line' && (props.checkedColor || props.uncheckedColor),
    },
  ]);

  const buttonStyle = computed(() => {
    if (computedCheck.value && props.checkedColor) {
      return props.type === 'line'
        ? { '--custom-color': props.checkedColor }
        : { backgroundColor: props.checkedColor };
    }
    if (!computedCheck.value && props.uncheckedColor) {
      return props.type === 'line'
        ? { '--custom-color': props.uncheckedColor }
        : { backgroundColor: props.uncheckedColor };
    }
    return undefined;
  });
</script>
