<template>
  <form :id="id" ref="formRef" :class="cls" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  toRefs,
  ref,
} from 'vue';
import scrollIntoView, {
  Options as ScrollIntoViewOptions,
} from 'scroll-into-view-if-needed';
import { FormItemInfo, formInjectionKey } from './context';
import { getPrefixCls } from '../_utils/global-config';
import { Size } from '../_utils/constant';
import { isArray, isFunction, isBoolean } from '../_utils/is';
import { FieldData, FieldRule, ValidatedError } from './interface';
import { useSize } from '../_hooks/use-size';
import { getFormElementId } from './utils';

const FORM_LAYOUTS = ['horizontal', 'vertical', 'inline'] as const;
type FormLayout = (typeof FORM_LAYOUTS)[number];
const FORM_LABEL_ALIGNS = ['left', 'right'] as const;
type FormLabelAlign = (typeof FORM_LABEL_ALIGNS)[number];

export default defineComponent({
  name: 'Form',
  props: {
    /**
     * @zh 表单数据对象
     * @en Form data object
     */
    model: {
      type: Object,
      required: true,
    },
    /**
     * @zh 表单的布局方式，包括水平、垂直、多列
     * @en The layout of the form, including horizontal, vertical, and multi-column
     * @values 'horizontal', 'vertical', 'inline'
     */
    layout: {
      type: String as PropType<FormLayout>,
      default: 'horizontal',
    },
    /**
     * @zh 表单控件的尺寸
     * @en The size of the form
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 标签元素布局选项。参数同 `<col>` 组件一致
     * @en Label element layout options. The parameters are the same as the `<col>` component
     */
    labelColProps: {
      type: Object,
      default: () => ({ span: 5, offset: 0 }),
    },
    /**
     * @zh 表单控件布局选项。参数同 `<col>` 组件一致
     * @en Form control layout options. The parameters are the same as the `<col>` component
     */
    wrapperColProps: {
      type: Object,
      default: () => ({ span: 19, offset: 0 }),
    },
    labelColStyle: Object,
    wrapperColStyle: Object,
    /**
     * @zh 标签的对齐方向
     * @en Alignment direction of the label
     * @values 'left', 'right'
     */
    labelAlign: {
      type: String as PropType<FormLabelAlign>,
      default: 'right',
    },
    /**
     * @zh 是否禁用表单
     * @en Whether to disable the form
     */
    disabled: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 表单项校验规则
     * @en Form item validation rules
     */
    rules: {
      type: Object as PropType<Record<string, FieldRule | FieldRule[]>>,
    },
    /**
     * @zh 是否开启自动标签宽度，仅在 `layout="horizontal"` 下生效。
     * @en Whether to enable automatic label width, it only takes effect under `layout="horizontal"`.
     * @version 2.13.0
     */
    autoLabelWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表单 `id` 属性和表单控件 `id` 前缀
     * @en Form `id` attribute and form control `id` prefix
     */
    id: {
      type: String,
    },
    /**
     * @zh 验证失败后滚动到第一个错误字段
     * @en Scroll to the first error field after verification fails
     * @version 2.51.0
     */
    scrollToFirstError: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * @zh 表单提交时触发
     * @en Triggered when the form is submitted
     * @param {{values: Record<string, any>; errors: Record<string, ValidatedError> | undefined}} data
     * @param {Event} ev
     */
    submit: (
      data: {
        values: Record<string, any>;
        errors: Record<string, ValidatedError> | undefined;
      },
      ev: Event
    ) => true,
    /**
     * @zh 验证成功时触发
     * @en Triggered when verification is successful
     * @param {Record<string, any>} values
     * @param {Event} ev
     */
    submitSuccess: (values: Record<string, any>, ev: Event) => true,
    /**
     * @zh 验证失败时触发
     * @en Triggered when verification failed
     * @param {{values: Record<string, any>; errors: Record<string, ValidatedError>}} data
     * @param {Event} ev
     */
    submitFailed: (
      data: {
        values: Record<string, any>;
        errors: Record<string, ValidatedError>;
      },
      ev: Event
    ) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('form');
    const formRef = ref<HTMLFormElement>();
    const {
      id,
      model,
      layout,
      disabled,
      labelAlign,
      labelColProps,
      wrapperColProps,
      labelColStyle,
      wrapperColStyle,
      size,
      rules,
    } = toRefs(props);
    const { mergedSize } = useSize(size);

    const autoLabelWidth = computed(
      () => props.layout === 'horizontal' && props.autoLabelWidth
    );

    const fields: FormItemInfo[] = [];
    const touchedFields: FormItemInfo[] = [];

    const labelWidth = reactive<Record<string, number>>({});
    const maxLabelWidth = computed(() =>
      Math.max(...Object.values(labelWidth))
    );

    const addField = (formItemInfo: FormItemInfo) => {
      if (formItemInfo && formItemInfo.field) {
        fields.push(formItemInfo);
      }
    };

    const removeField = (formItemInfo: FormItemInfo) => {
      if (formItemInfo && formItemInfo.field) {
        fields.splice(fields.indexOf(formItemInfo), 1);
      }
    };

    const setFields = (data: Record<string, FieldData>) => {
      fields.forEach((field) => {
        if (data[field.field]) {
          field.setField(data[field.field]);
        }
      });
    };

    const setLabelWidth = (width: number, uid?: number) => {
      if (uid && labelWidth[uid] !== width) {
        labelWidth[uid] = width;
      }
    };

    const removeLabelWidth = (uid?: number) => {
      if (uid) {
        delete labelWidth[uid];
      }
    };

    const resetFields = (field?: string | string[]) => {
      const _fields = field ? ([] as string[]).concat(field) : [];
      fields.forEach((field) => {
        if (_fields.length === 0 || _fields.includes(field.field)) {
          field.resetField();
        }
      });
    };

    const clearValidate = (field?: string | string[]) => {
      const _fields = field ? ([] as string[]).concat(field) : [];
      fields.forEach((field) => {
        if (_fields.length === 0 || _fields.includes(field.field)) {
          field.clearValidate();
        }
      });
    };

    const scrollToField = (field: string, options?: ScrollIntoViewOptions) => {
      const node = formRef.value || document.body;
      const fieldNode = node.querySelector(
        `#${getFormElementId(props.id, field as string)}`
      );

      if (fieldNode) {
        scrollIntoView(fieldNode as HTMLDivElement, {
          behavior: 'smooth',
          block: 'nearest',
          scrollMode: 'if-needed',
          ...options,
        });
      }
    };

    const scrollToFirstError = (field: string) => {
      const options = !isBoolean(props.scrollToFirstError)
        ? props.scrollToFirstError
        : undefined;
      scrollToField(field, options);
    };

    const validate = (
      callback?: (errors: undefined | Record<string, ValidatedError>) => void
    ): Promise<undefined | Record<string, ValidatedError>> => {
      const list: Promise<any>[] = [];

      fields.forEach((field) => {
        list.push(field.validate());
      });

      return Promise.all(list).then((result) => {
        const errors: Record<string, ValidatedError> = {};
        let hasError = false;
        result.forEach((item) => {
          if (item) {
            hasError = true;
            errors[item.field] = item;
          }
        });

        if (hasError && props.scrollToFirstError) {
          scrollToFirstError(Object.keys(errors)[0]);
        }

        if (isFunction(callback)) {
          callback(hasError ? errors : undefined);
        }

        return hasError ? errors : undefined;
      });
    };

    const validateField = (
      field: string | string[],
      callback?: (errors: undefined | Record<string, ValidatedError>) => void
    ) => {
      const list: Promise<any>[] = [];

      for (const ctx of fields) {
        if (
          (isArray(field) && field.includes(ctx.field)) ||
          field === ctx.field
        ) {
          list.push(ctx.validate());
        }
      }

      return Promise.all(list).then((result) => {
        const errors: Record<string, ValidatedError> = {};
        let hasError = false;
        result.forEach((item) => {
          if (item) {
            hasError = true;
            errors[item.field] = item;
          }
        });

        if (hasError && props.scrollToFirstError) {
          scrollToFirstError(Object.keys(errors)[0]);
        }

        if (isFunction(callback)) {
          callback(hasError ? errors : undefined);
        }

        return hasError ? errors : undefined;
      });
    };

    const handleSubmit = (e: Event) => {
      const list: Promise<any>[] = [];
      fields.forEach((field) => {
        list.push(field.validate());
      });

      Promise.all(list).then((result) => {
        const errors: Record<string, ValidatedError> = {};
        let hasError = false;
        result.forEach((item) => {
          if (item) {
            hasError = true;
            errors[item.field] = item;
          }
        });
        if (hasError) {
          props.scrollToFirstError &&
            scrollToFirstError(Object.keys(errors)[0]);
          emit('submitFailed', { values: model.value, errors }, e);
        } else {
          emit('submitSuccess', model.value, e);
        }
        emit(
          'submit',
          { values: model.value, errors: hasError ? errors : undefined },
          e
        );
      });
    };

    provide(
      formInjectionKey,
      reactive({
        id,
        layout,
        disabled,
        labelAlign,
        labelColProps,
        wrapperColProps,
        labelColStyle,
        wrapperColStyle,
        model,
        size: mergedSize,
        rules,
        fields,
        touchedFields,
        addField,
        removeField,
        validateField,
        setLabelWidth,
        removeLabelWidth,
        maxLabelWidth,
        autoLabelWidth,
      })
    );

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-layout-${props.layout}`,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-auto-label-width`]: props.autoLabelWidth,
      },
    ]);

    return {
      cls,
      formRef,
      handleSubmit,
      innerValidate: validate,
      innerValidateField: validateField,
      innerResetFields: resetFields,
      innerClearValidate: clearValidate,
      innerSetFields: setFields,
      innerScrollToField: scrollToField,
    };
  },
  methods: {
    /**
     * @zh 校验全部表单数据
     * @en Verify all form data
     * @public
     * @param {(errors: undefined | Record<string, ValidatedError>) => void} callback
     * @returns {Promise<undefined | Record<string, ValidatedError>>}
     */
    validate(
      callback?: (errors: undefined | Record<string, ValidatedError>) => void
    ): Promise<undefined | Record<string, ValidatedError>> {
      return this.innerValidate(callback);
    },
    /**
     * @zh 校验部分表单数据
     * @en Validate part of the form data
     * @public
     * @param {string | string[]} field
     * @param {(errors: undefined | Record<string, ValidatedError>) => void} callback
     * @returns {Promise<undefined | Record<string, ValidatedError>>}
     */
    validateField(
      field: string | string[],
      callback?: (errors: undefined | Record<string, ValidatedError>) => void
    ): Promise<undefined | Record<string, ValidatedError>> {
      return this.innerValidateField(field, callback);
    },
    /**
     * @zh 重置表单数据
     * @en Reset form data
     * @public
     * @param {string | string[]} field
     */
    resetFields(field?: string | string[]) {
      return this.innerResetFields(field);
    },
    /**
     * @zh 清除校验状态
     * @en Clear verification status
     * @public
     * @param {string | string[]} field
     */
    clearValidate(field?: string | string[]) {
      return this.innerClearValidate(field);
    },
    /**
     * @zh 设置表单项的值和状态
     * @en Set the value and status of the form item
     * @param {Record<string, FieldData>} data
     * @public
     */
    setFields(data: Record<string, FieldData>) {
      return this.innerSetFields(data);
    },
    /**
     * @zh 滚动到指定表单项
     * @en Scroll to the specified form item
     * @param {string} field
     * @public
     * @version 2.51.0
     */
    scrollToField(field: string) {
      return this.innerScrollToField(field);
    },
  },
});
</script>
