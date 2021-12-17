import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
// @ts-ignore
import { Schema } from 'b-validate';
import { FormItemInfo, formItemKey, formKey } from './context';
import {
  FieldData,
  FieldRule,
  ValidateStatus,
  ValidateTrigger,
} from './interface';
import Grid from '../grid';
import FormItemLabel from './form-item-label.vue';
import FormItemMessage from './form-item-message.vue';
import { getPrefixCls } from '../_utils/global-config';
import { getValueByPath } from '../_utils/get-value-by-path';
import { Data } from '../_utils/types';
import usePickSlots from '../_hooks/use-pick-slots';
import { mergeFirstChild } from '../_utils/vue-utils';
import { getFinalValidateMessage, getFinalValidateStatus } from './utils';

const { Row: ArcoRow, Col: ArcoCol } = Grid;

export default defineComponent({
  name: 'FormItem',
  components: {
    ArcoRow,
    ArcoCol,
    FormItemLabel,
    FormItemMessage,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 表单元素在数据对象中的path（数据项必填）
     * @en The path of the form element in the data object (required for the data item)
     */
    field: {
      type: String,
      default: '',
    },
    /**
     * @zh 标签的文本
     * @en Label text
     */
    label: String,
    /**
     * @zh 是否显示冒号
     * @en Whether to show a colon
     */
    showColon: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否去除样式
     * @en Whether to remove the style
     */
    noStyle: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 帮助文案
     * @en Help copywriting
     */
    help: String,
    /**
     * @zh 额外显示的文案
     * @en Additional display copy
     */
    extra: String,
    /**
     * @zh 是否必须填写
     * @en Is it required
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表单项校验规则（优先级高于 form 的 rules）
     * @en Form item validation rules (The priority is higher than the rules of form)
     */
    rules: {
      type: [Object, Array] as PropType<FieldRule | FieldRule[]>,
    },
    /**
     * @zh 校验状态
     * @en Validate status
     * @values 'success', 'warning', 'error', 'validating'
     */
    validateStatus: {
      type: String as PropType<ValidateStatus>,
    },
    /**
     * @zh 触发校验的事件
     * @en The event that triggers the verification
     * @values 'change', 'input', 'focus', 'blur'
     */
    validateTrigger: {
      type: [String, Array] as PropType<ValidateTrigger | ValidateTrigger[]>,
      default: 'change',
    },
    /**
     * @zh 标签元素布局选项。参数同 `<col>` 组件一致
     * @en Label element layout options. The parameters are the same as the `<col>` component
     */
    labelColProps: Object,
    /**
     * @zh 表单控件布局选项。参数同 `<col>` 组件一致
     * @en Form control layout options. The parameters are the same as the `<col>` component
     */
    wrapperColProps: Object,
    /**
     * @zh 是否隐藏标签
     * @en Whether to hide the label
     */
    hideLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否隐藏星号
     * @en Whether to hide the asterisk
     */
    hideAsterisk: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 标签元素布局组件的 style
     * @en The style of the label element layout component
     * @version 2.10.0
     */
    labelColStyle: Object,
    /**
     * @zh 表单控件布局组件的 style
     * @en The style of the form control layout component
     * @version 2.10.0
     */
    wrapperColStyle: Object,
    /**
     * @zh 表单项布局选项。参数同 `<row>` 组件一致
     * @en Form item layout options. The parameters are the same as the `<row>` component
     * @version 2.10.0
     */
    rowProps: Object,
    /**
     * @zh 表单项布局组件的 class
     * @en The class of the form item layout component
     * @version 2.10.0
     */
    rowClass: [String, Array, Object],
    /**
     * @zh 表单控件包裹层的 class
     * @en The class of the form control wrapping layer
     * @version 2.10.0
     */
    contentClass: [String, Array, Object],
  },
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('form-item');
    const { field } = toRefs(props);
    const formCtx = inject(formKey, undefined);
    const mergedLabelCol = computed(
      () => props.labelColProps ?? formCtx?.labelColProps
    );
    const mergedWrapperCol = computed(
      () => props.wrapperColProps ?? formCtx?.wrapperColProps
    );
    const mergedLabelStyle = computed(
      () => props.labelColStyle ?? formCtx?.labelColStyle
    );
    const mergedWrapperStyle = computed(
      () => props.wrapperColStyle ?? formCtx?.wrapperColStyle
    );
    // 记录初始值，用于重置表单
    const initialValue = getValueByPath(formCtx?.model, props.field);

    const validateStatus = reactive<Record<string, ValidateStatus | ''>>({});
    const validateMessage = reactive<Record<string, string>>({});
    const finalStatus = computed(() => getFinalValidateStatus(validateStatus));
    const finalMessage = computed(() =>
      getFinalValidateMessage(validateMessage)
    );
    // 用于重置表单时，不触发校验
    const validateDisabled = ref(false);

    const fieldValue = computed(() =>
      getValueByPath(formCtx?.model, props.field)
    );

    const computedDisabled = computed(() =>
      Boolean(props.disabled ?? formCtx?.disabled)
    );
    const computedValidateStatus = computed(
      () => props.validateStatus ?? finalStatus.value
    );
    const isError = computed(() => finalStatus.value === 'error');

    const mergedRules = computed(() => {
      const baseRules = ([] as FieldRule[]).concat(
        props.rules ?? formCtx?.rules?.[props.field] ?? []
      );
      const hasRequiredRule = baseRules.some((item) => item.required);

      if (props.required && !hasRequiredRule) {
        return ([{ required: true }] as FieldRule[]).concat(baseRules);
      }
      return baseRules;
    });

    const isRequired = computed(() =>
      mergedRules.value.some((item) => item.required)
    );

    const helpSlot = usePickSlots(slots, 'help');

    const showMessage = computed(
      () => helpSlot.value || props.help || isError.value
    );

    const formItemCtx = props.noStyle
      ? inject(formItemKey, undefined)
      : undefined;

    const updateValidateState = (
      field: string,
      { status, message }: { status: ValidateStatus | ''; message: string }
    ) => {
      validateStatus[field] = status;
      validateMessage[field] = message;

      if (props.noStyle) {
        formItemCtx?.updateValidateState(field, { status, message });
      }
    };

    provide(
      formItemKey,
      reactive({
        updateValidateState,
      })
    );

    const validateField = (): Promise<any> => {
      if (validateDisabled.value) {
        return Promise.resolve();
      }

      const rules = mergedRules.value;
      if (!field.value || rules.length === 0) {
        if (finalStatus.value) {
          clearValidate();
        }
        return Promise.resolve();
      }

      const _field = field.value;
      const _value = fieldValue.value;
      updateValidateState(_field, {
        status: 'validating',
        message: '',
      });

      const schema = new Schema(
        {
          [_field]: rules.map((rule) => {
            if (!rule.type && !rule.validator) {
              rule.type = 'string';
            }
            return rule;
          }),
        },
        { ignoreEmptyString: true }
      );

      return new Promise((resolve) => {
        schema.validate({ [_field]: _value }, (err: Data) => {
          const isError = Boolean(err?.[_field]);
          updateValidateState(_field, {
            status: isError ? 'error' : 'success',
            message: err?.[_field].message ?? '',
          });

          const error = isError
            ? {
                field: field.value,
                value: err[_field].value,
                type: err[_field].type,
                isRequiredError: Boolean(err[_field].requiredError),
                message: err[_field].message,
              }
            : undefined;

          resolve(error);
        });
      });
    };

    const validateTriggers = ([] as ValidateTrigger[]).concat(
      props.validateTrigger
    );
    const event = validateTriggers.reduce((event, trigger) => {
      switch (trigger) {
        case 'change':
          event.onChange = () => {
            validateField();
          };
          return event;
        case 'input':
          event.onInput = () => {
            nextTick(() => {
              validateField();
            });
          };
          return event;
        case 'focus':
          event.onFocus = () => {
            validateField();
          };
          return event;
        case 'blur':
          event.onBlur = () => {
            validateField();
          };
          return event;
        default:
          return event;
      }
    }, {} as Record<string, () => void>);

    const clearValidate = () => {
      if (field.value) {
        updateValidateState(field.value, {
          status: '',
          message: '',
        });
      }
    };

    const setField = (data: FieldData) => {
      if (field.value) {
        validateDisabled.value = true;
        if ('value' in data && formCtx?.model && field.value in formCtx.model) {
          formCtx.model[field.value] = data.value;
        }

        if (data.status || data.message) {
          updateValidateState(field.value, {
            status: data.status ?? '',
            message: data.message ?? '',
          });
        }

        nextTick(() => {
          validateDisabled.value = false;
        });
      }
    };

    const resetField = () => {
      clearValidate();
      validateDisabled.value = true;
      if (formCtx?.model[field.value]) {
        formCtx.model[field.value] = initialValue;
      }

      nextTick(() => {
        validateDisabled.value = false;
      });
    };

    const formItemInfo: FormItemInfo = reactive({
      field,
      disabled: computedDisabled,
      error: isError,
      validate: validateField,
      clearValidate,
      resetField,
      setField,
    });

    onMounted(() => {
      if (formItemInfo.field) {
        formCtx?.addField(formItemInfo);
      }
    });

    onBeforeUnmount(() => {
      if (formItemInfo.field) {
        formCtx?.removeField(formItemInfo);
      }
    });

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-layout-${formCtx?.layout}`,
      {
        [`${prefixCls}-error`]: isError.value,
        [`${prefixCls}-status-${computedValidateStatus.value}`]: Boolean(
          computedValidateStatus.value
        ),
        [`${prefixCls}-has-help`]: Boolean(props.help),
        // [`${prefixCls}-has-feedback`]: itemStatus && props.hasFeedback,
      },
      props.rowClass,
    ]);

    const labelColCls = computed(() => [
      `${prefixCls}-label-col`,
      {
        [`${prefixCls}-label-col-left`]: formCtx?.labelAlign === 'left',
        [`${prefixCls}-label-col-flex`]: !mergedLabelCol.value,
      },
    ]);

    const wrapperColCls = computed(() => [
      `${prefixCls}-wrapper-col`,
      {
        [`${prefixCls}-wrapper-col-flex`]: !mergedWrapperCol.value,
      },
    ]);

    const defaultSlot = usePickSlots(slots, 'default');

    const isHelpMessage = computed(() => Boolean(helpSlot.value ?? props.help));

    const children = computed(() => {
      const children = defaultSlot.value?.() ?? [];
      mergeFirstChild(children, (vn) => ({
        ...attrs,
        disabled: vn.props?.disabled ?? computedDisabled.value,
        error: vn.props?.error ?? isError.value,
        size: vn.props?.size ?? formCtx?.size,
        ...event,
      }));
      return children;
    });

    return () => {
      if (props.noStyle) {
        return children.value;
      }

      return (
        <ArcoRow
          {...props.rowProps}
          class={cls.value}
          div={formCtx?.layout !== 'horizontal'}
        >
          {!props.hideLabel && (
            <ArcoCol
              class={labelColCls.value}
              style={mergedLabelStyle.value}
              {...mergedLabelCol.value}
            >
              <FormItemLabel
                required={props.hideAsterisk ? false : isRequired.value}
                showColon={props.showColon}
              >
                {slots.label?.() ?? props.label}
              </FormItemLabel>
            </ArcoCol>
          )}
          <ArcoCol
            class={wrapperColCls.value}
            style={mergedWrapperStyle.value}
            {...mergedWrapperCol.value}
          >
            <div class={[`${prefixCls}-content`, props.contentClass]}>
              {children.value}
            </div>
            {showMessage.value && (
              <FormItemMessage
                error={finalMessage.value}
                isHelp={isHelpMessage.value}
              >
                {helpSlot.value?.() ?? props.help}
              </FormItemMessage>
            )}
            {(props.extra || slots.extra) && (
              <div class={`${prefixCls}-extra`}>
                {slots.extra?.() ?? props.extra}
              </div>
            )}
          </ArcoCol>
        </ArcoRow>
      );
    };
  },
});
