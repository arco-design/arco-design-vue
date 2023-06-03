import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconCheck from './icon-check';
import { isArray, isNull, isUndefined } from '../_utils/is';
import { checkboxGroupKey } from './context';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'Checkbox',
  components: {
    IconCheck,
    IconHover,
  },
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: [Boolean, Array] as PropType<
        boolean | Array<string | number | boolean>
      >,
      default: undefined,
    },
    /**
     * @zh 默认是否选中（非受控状态）
     * @en Whether checked by default (uncontrolled state)
     */
    defaultChecked: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 选项的 `value`
     * @en The `value` of the option
     */
    value: {
      type: [String, Number, Boolean],
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
     * @zh 是否为半选状态
     * @en Whether it is half-selected
     */
    indeterminate: {
      type: Boolean,
      default: false,
    },
    // private
    uninjectGroupContext: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: boolean | (string | number | boolean)[]) =>
      true,
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @param { boolean | (string | number | boolean)[] } value
     * @param {Event} ev
     */
    'change': (value: boolean | (string | number | boolean)[], ev: Event) =>
      true,
  },
  /**
   * @zh 自定义复选框
   * @en Custom checkbox
   * @slot checkbox
   * @binding {boolean} checked
   * @binding {boolean} disabled
   * @version 2.18.0
   */
  setup(props, { emit, slots }) {
    const { disabled, modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('checkbox');
    const checkboxRef = ref<HTMLInputElement>();
    const checkboxGroupCtx = !props.uninjectGroupContext
      ? inject(checkboxGroupKey, undefined)
      : undefined;
    const isGroup = checkboxGroupCtx?.name === 'ArcoCheckboxGroup';
    const { mergedDisabled: _mergedDisabled, eventHandlers } = useFormItem({
      disabled,
    });

    const _checked = ref(props.defaultChecked);
    const computedValue = computed(() =>
      isGroup
        ? checkboxGroupCtx?.computedValue
        : props.modelValue ?? _checked.value
    );
    const computedChecked = computed<boolean>(() => {
      return isArray(computedValue.value)
        ? computedValue.value.includes(props.value ?? true)
        : computedValue.value;
    });
    const mergedDisabled = computed(
      () =>
        checkboxGroupCtx?.disabled ||
        _mergedDisabled?.value ||
        (!computedChecked.value && checkboxGroupCtx?.isMaxed)
    );

    const handleClick = (ev: Event) => {
      ev.stopPropagation();
    };

    const handleChange = (e: Event) => {
      const { checked } = e.target as HTMLInputElement;

      let newValue: boolean | Array<string | number | boolean> = checked;
      if (isArray(computedValue.value)) {
        const set = new Set(computedValue.value);
        if (checked) {
          set.add(props.value ?? true);
        } else {
          set.delete(props.value ?? true);
        }
        newValue = Array.from(set);
      }

      _checked.value = checked;
      if (isGroup && isArray(newValue)) {
        checkboxGroupCtx?.handleChange(newValue, e);
      } else {
        emit('update:modelValue', newValue);
        emit('change', newValue, e);
        eventHandlers.value?.onChange?.(e);
      }

      nextTick(() => {
        if (
          checkboxRef.value &&
          checkboxRef.value.checked !== computedChecked.value
        ) {
          checkboxRef.value.checked = computedChecked.value;
        }
      });
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-indeterminate`]: props.indeterminate,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    // const handleClick = (ev: MouseEvent) => {
    //   if (
    //     !props.disabled &&
    //     checkboxRef.value &&
    //     ev.target !== checkboxRef.value
    //   ) {
    //     ev.preventDefault();
    //     checkboxRef.value.click();
    //   }
    // };

    const handleFocus = (ev: FocusEvent) => {
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      eventHandlers.value?.onBlur?.(ev);
    };

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _checked.value = false;
      }
    });

    watch(computedValue, (value) => {
      let checked;
      if (isArray(value)) {
        checked = value.includes(props.value ?? true);
      } else {
        checked = value;
      }
      if (_checked.value !== checked) {
        _checked.value = checked;
      }
      if (checkboxRef.value && checkboxRef.value.checked !== checked) {
        checkboxRef.value.checked = checked;
      }
    });

    return () => (
      <label aria-disabled={mergedDisabled.value} class={cls.value}>
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={computedChecked.value}
          value={props.value}
          class={`${prefixCls}-target`}
          disabled={mergedDisabled.value}
          onClick={handleClick}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {(slots.checkbox ?? checkboxGroupCtx?.slots?.checkbox)?.({
          checked: computedChecked.value,
          disabled: mergedDisabled.value,
        }) ?? (
          <IconHover
            class={`${prefixCls}-icon-hover`}
            disabled={mergedDisabled.value || computedChecked.value}
          >
            <div class={`${prefixCls}-icon`}>
              {computedChecked.value && (
                <IconCheck class={`${prefixCls}-icon-check`} />
              )}
            </div>
          </IconHover>
        )}
        {slots.default && (
          <span class={`${prefixCls}-label`}>{slots.default()}</span>
        )}
      </label>
    );
  },
});
