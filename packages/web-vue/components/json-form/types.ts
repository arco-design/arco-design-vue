import type { Merge, Simplify } from 'type-fest';

import type { Component, HTMLAttributes, VNodeChild } from 'vue';

import type { AutoCompleteInstance } from '../auto-complete';
import type { CascaderInstance } from '../cascader';
import type { CheckboxGroupInstance, CheckboxInstance } from '../checkbox';
import type { DatePickerInstance, RangePickerInstance } from '../date-picker';
import type { FieldRule, FormItemInstance } from '../form';
import type { GridColInstance, GridRowInstance } from '../grid';
import type { InputInstance, InputPasswordInstance, InputSearchInstance } from '../input';
import type { InputNumberInstance } from '../input-number';
import type { InputTagInstance } from '../input-tag';
import type { MentionInstance } from '../mention';
import type { RadioGroupInstance, RadioInstance } from '../radio';
import type { RateInstance } from '../rate';
import type { SelectInstance } from '../select';
import type { SliderInstance } from '../slider';
import type { SwitchInstance } from '../switch';
import type { TextareaInstance } from '../textarea';
import type { TimePickerInstance } from '../time-picker';
import type { TransferInstance } from '../transfer';
import type { TreeSelectInstance } from '../tree-select';
import type { VerificationCodeInstance } from '../verification-code';

export const A2UI_0_8 = 'a2ui-0.8' as const;

export const JSON_FORM_ADAPTERS = {
  default: 'default',
  a2ui_0_8: A2UI_0_8,
} as const;

export const JSON_FORM_COMPONENT_TYPES = {
  autoComplete: 'autoComplete',
  cascader: 'cascader',
  checkbox: 'checkbox',
  checkboxGroup: 'checkboxGroup',
  datePicker: 'datePicker',
  input: 'input',
  inputNumber: 'inputNumber',
  inputPassword: 'inputPassword',
  inputSearch: 'inputSearch',
  inputTag: 'inputTag',
  mention: 'mention',
  radio: 'radio',
  radioGroup: 'radioGroup',
  rangePicker: 'rangePicker',
  rate: 'rate',
  row: 'row',
  select: 'select',
  slider: 'slider',
  switch: 'switch',
  textarea: 'textarea',
  timePicker: 'timePicker',
  transfer: 'transfer',
  treeSelect: 'treeSelect',
  verificationCode: 'verificationCode',
  noFormItem: 'noFormItem',
} as const;

export type JsonFormAdapter = (typeof JSON_FORM_ADAPTERS)[keyof typeof JSON_FORM_ADAPTERS];
export type JsonFormBuiltinComponentType =
  (typeof JSON_FORM_COMPONENT_TYPES)[keyof typeof JSON_FORM_COMPONENT_TYPES];
export type JsonFormExternalComponentMap = Record<string, Component>;

type ComponentPropsOf<T> = T extends new (...args: never[]) => { $props: infer P } ? P : never;
type ComponentEmitOf<T> = T extends new (...args: never[]) => { $emit: infer E } ? E : never;

type JsonFormBuiltInComponentPropsMap = {
  autoComplete: AutoCompleteInstance['$props'];
  cascader: CascaderInstance['$props'];
  checkbox: CheckboxInstance['$props'];
  checkboxGroup: CheckboxGroupInstance['$props'];
  datePicker: DatePickerInstance['$props'];
  input: InputInstance['$props'];
  inputNumber: InputNumberInstance['$props'];
  inputPassword: InputPasswordInstance['$props'];
  inputSearch: InputSearchInstance['$props'];
  inputTag: InputTagInstance['$props'];
  mention: MentionInstance['$props'];
  radio: RadioInstance['$props'];
  radioGroup: RadioGroupInstance['$props'];
  rangePicker: RangePickerInstance['$props'];
  rate: RateInstance['$props'];
  row: GridRowInstance['$props'];
  select: SelectInstance['$props'];
  slider: SliderInstance['$props'];
  switch: SwitchInstance['$props'];
  textarea: TextareaInstance['$props'];
  timePicker: TimePickerInstance['$props'];
  transfer: TransferInstance['$props'];
  treeSelect: TreeSelectInstance['$props'];
  verificationCode: VerificationCodeInstance['$props'];
  noFormItem: Record<string, unknown>;
};

type JsonFormBuiltInComponentEventsMap = {
  autoComplete: AutoCompleteInstance['$emit'];
  cascader: CascaderInstance['$emit'];
  checkbox: CheckboxInstance['$emit'];
  checkboxGroup: CheckboxGroupInstance['$emit'];
  datePicker: DatePickerInstance['$emit'];
  input: InputInstance['$emit'];
  inputNumber: InputNumberInstance['$emit'];
  inputPassword: InputPasswordInstance['$emit'];
  inputSearch: InputSearchInstance['$emit'];
  inputTag: InputTagInstance['$emit'];
  mention: MentionInstance['$emit'];
  radio: RadioInstance['$emit'];
  radioGroup: RadioGroupInstance['$emit'];
  rangePicker: RangePickerInstance['$emit'];
  rate: RateInstance['$emit'];
  row: GridRowInstance['$emit'];
  select: SelectInstance['$emit'];
  slider: SliderInstance['$emit'];
  switch: SwitchInstance['$emit'];
  textarea: TextareaInstance['$emit'];
  timePicker: TimePickerInstance['$emit'];
  transfer: TransferInstance['$emit'];
  treeSelect: TreeSelectInstance['$emit'];
  verificationCode: VerificationCodeInstance['$emit'];
  noFormItem: Record<string, (...args: unknown[]) => unknown>;
};

type JsonFormBuiltInComponentMap = {
  [K in JsonFormBuiltinComponentType]: K extends keyof JsonFormBuiltInComponentPropsMap
    ? Component
    : never;
};

type JsonFormKnownComponentMap<TExternal extends JsonFormExternalComponentMap> =
  JsonFormBuiltInComponentMap & TExternal;

type JsonFormKnownComponentType<TExternal extends JsonFormExternalComponentMap> = Extract<
  keyof JsonFormKnownComponentMap<TExternal>,
  string
>;

type JsonFormResolvedComponentProps<
  TType extends string,
  TExternal extends JsonFormExternalComponentMap,
> = TType extends keyof JsonFormBuiltInComponentPropsMap
  ? JsonFormBuiltInComponentPropsMap[TType]
  : TType extends keyof TExternal
    ? ComponentPropsOf<TExternal[TType]>
    : Record<string, unknown>;

type JsonFormResolvedComponentEvents<
  TType extends string,
  TExternal extends JsonFormExternalComponentMap,
> = TType extends keyof JsonFormBuiltInComponentEventsMap
  ? JsonFormBuiltInComponentEventsMap[TType]
  : TType extends keyof TExternal
    ? ComponentEmitOf<TExternal[TType]>
    : Record<string, (...args: unknown[]) => unknown>;

export type JsonFormComponentType<TExternal extends JsonFormExternalComponentMap = {}> =
  | JsonFormKnownComponentType<TExternal>
  | (string & {});

export type JsonFormComponentProps<
  TType extends string,
  TExternal extends JsonFormExternalComponentMap = {},
> = Simplify<Merge<HTMLAttributes, JsonFormResolvedComponentProps<TType, TExternal>>>;

export type JsonFormComponentEvents<
  TType extends string,
  TExternal extends JsonFormExternalComponentMap = {},
> = JsonFormResolvedComponentEvents<TType, TExternal>;

export type JsonFormComponentSlotRenderer = Component | ((...args: never[]) => VNodeChild);

export type JsonFormItemSlotProps<TExternal extends JsonFormExternalComponentMap = {}> = {
  record?: JsonFormSchema<JsonFormComponentType<TExternal>, TExternal>;
  value?: unknown;
} & Record<string, unknown>;

type JsonFormBaseSchema<TType extends string, TExternal extends JsonFormExternalComponentMap> = {
  field: string;
  label?: string;
  type?: TType;
  required?: boolean;
  hidden?: boolean;
  slotName?: string;
  render?: () => VNodeChild;
  span?: number;
  colProps?: GridColInstance['$props'];
  formItemProps?: Omit<FormItemInstance['$props'], 'field' | 'label' | 'rules'>;
  formItemRules?: FieldRule | FieldRule[];
  formItemEvents?: ComponentEmitOf<FormItemInstance>;
  componentProps?: JsonFormComponentProps<TType, TExternal>;
  componentEvents?: JsonFormComponentEvents<TType, TExternal>;
  componentSlots?: Record<string, JsonFormComponentSlotRenderer>;
  children?: JsonFormSchema<JsonFormComponentType<TExternal>, TExternal>[];
};

export type JsonFormSchema<
  TType extends string = JsonFormBuiltinComponentType,
  TExternal extends JsonFormExternalComponentMap = {},
> = JsonFormBaseSchema<TType, TExternal>;

export type JsonFormComponentRegistry<TExternal extends JsonFormExternalComponentMap = {}> =
  Partial<Record<JsonFormComponentType<TExternal>, Component>>;

export type JsonFormProviderConfig<TExternal extends JsonFormExternalComponentMap = {}> = {
  adapter?: JsonFormAdapter;
  components?: JsonFormComponentRegistry<TExternal>;
};

export type JsonFormModel = Record<string, unknown>;

export type JsonFormProps<TExternal extends JsonFormExternalComponentMap = {}> = {
  schemas:
    | JsonFormSchema<JsonFormComponentType<TExternal>, TExternal>[]
    | JsonFormA2UI_0_8ComponentNode[];
  adapter?: JsonFormAdapter;
  model?: JsonFormModel;
  hideLabel?: boolean;
  hideAsterisk?: boolean;
  showColon?: boolean;
  component?: string | Component;
};

export type JsonFormA2UIBoundValue =
  | string
  | {
      literalString?: string;
      path?: string;
    };

export type JsonFormA2UI_0_8BoundValue = JsonFormA2UIBoundValue;

export type JsonFormA2UIChoiceOption = {
  label?: JsonFormA2UIBoundValue;
  value: string | number | boolean;
};

export type JsonFormA2UI_0_8ChoiceOption = JsonFormA2UIChoiceOption;

export type JsonFormA2UIChildren =
  | string[]
  | {
      explicitList?: string[];
    };

export type JsonFormA2UI_0_8Children = JsonFormA2UIChildren;

export type JsonFormA2UI_0_8StandardComponentName =
  | 'Row'
  | 'Column'
  | 'TextField'
  | 'CheckBox'
  | 'Slider'
  | 'DateTimeInput'
  | 'MultipleChoice'
  | 'ChoicePicker';

export type JsonFormA2UIComponentName = JsonFormA2UI_0_8StandardComponentName | (string & {});

type JsonFormA2UISharedNode = {
  id: string;
};

export type JsonFormA2UIRowComponent = JsonFormA2UISharedNode & {
  component: { Row: { children?: JsonFormA2UIChildren } } | 'Row';
  children?: string[];
};

export type JsonFormA2UI_0_8RowComponent = JsonFormA2UIRowComponent;

export type JsonFormA2UIColumnComponent = JsonFormA2UISharedNode & {
  component: { Column: { children?: JsonFormA2UIChildren } } | 'Column';
  children?: string[];
};

export type JsonFormA2UI_0_8ColumnComponent = JsonFormA2UIColumnComponent;

export type JsonFormA2UITextFieldComponent = JsonFormA2UISharedNode & {
  component:
    | {
        TextField: {
          label?: JsonFormA2UIBoundValue;
          text?: JsonFormA2UIBoundValue;
          value?: JsonFormA2UIBoundValue;
          textFieldType?: 'shortText' | 'longText' | 'number' | 'obscured' | 'date';
          validationRegexp?: string;
          placeholder?: JsonFormA2UIBoundValue;
        };
      }
    | 'TextField';
  label?: JsonFormA2UIBoundValue;
  text?: JsonFormA2UIBoundValue;
  value?: JsonFormA2UIBoundValue;
  textFieldType?: 'shortText' | 'longText' | 'number' | 'obscured' | 'date';
  validationRegexp?: string;
  placeholder?: JsonFormA2UIBoundValue;
};

export type JsonFormA2UI_0_8TextFieldComponent = JsonFormA2UITextFieldComponent;

export type JsonFormA2UICheckBoxComponent = JsonFormA2UISharedNode & {
  component:
    | {
        CheckBox: {
          label?: JsonFormA2UIBoundValue;
          value?: JsonFormA2UIBoundValue;
        };
      }
    | 'CheckBox';
  label?: JsonFormA2UIBoundValue;
  value?: JsonFormA2UIBoundValue;
};

export type JsonFormA2UI_0_8CheckBoxComponent = JsonFormA2UICheckBoxComponent;

export type JsonFormA2UISliderComponent = JsonFormA2UISharedNode & {
  component:
    | {
        Slider: {
          value?: JsonFormA2UIBoundValue;
          minValue?: number;
          maxValue?: number;
        };
      }
    | 'Slider';
  value?: JsonFormA2UIBoundValue;
  minValue?: number;
  maxValue?: number;
};

export type JsonFormA2UI_0_8SliderComponent = JsonFormA2UISliderComponent;

export type JsonFormA2UIDateTimeInputComponent = JsonFormA2UISharedNode & {
  component:
    | {
        DateTimeInput: {
          value?: JsonFormA2UIBoundValue;
          enableDate?: boolean;
          enableTime?: boolean;
          label?: JsonFormA2UIBoundValue;
        };
      }
    | 'DateTimeInput';
  value?: JsonFormA2UIBoundValue;
  enableDate?: boolean;
  enableTime?: boolean;
  label?: JsonFormA2UIBoundValue;
};

export type JsonFormA2UI_0_8DateTimeInputComponent = JsonFormA2UIDateTimeInputComponent;

export type JsonFormA2UIChoiceComponent = JsonFormA2UISharedNode & {
  component:
    | {
        MultipleChoice: {
          options?: JsonFormA2UIChoiceOption[];
          selections?: JsonFormA2UIBoundValue;
          maxAllowedSelections?: number;
          label?: JsonFormA2UIBoundValue;
        };
      }
    | {
        ChoicePicker: {
          options?: JsonFormA2UIChoiceOption[];
          selections?: JsonFormA2UIBoundValue;
          maxAllowedSelections?: number;
          label?: JsonFormA2UIBoundValue;
        };
      }
    | 'MultipleChoice'
    | 'ChoicePicker';
  options?: JsonFormA2UIChoiceOption[];
  selections?: JsonFormA2UIBoundValue;
  maxAllowedSelections?: number;
  label?: JsonFormA2UIBoundValue;
};

export type JsonFormA2UI_0_8ChoiceComponent = JsonFormA2UIChoiceComponent;

export type JsonFormA2UI_0_8CustomComponentNode = JsonFormA2UISharedNode & {
  component: string | Record<string, Record<string, unknown>>;
  [key: string]: unknown;
};

export type JsonFormA2UI_0_8ComponentNode =
  | JsonFormA2UIRowComponent
  | JsonFormA2UIColumnComponent
  | JsonFormA2UITextFieldComponent
  | JsonFormA2UICheckBoxComponent
  | JsonFormA2UISliderComponent
  | JsonFormA2UIDateTimeInputComponent
  | JsonFormA2UIChoiceComponent
  | JsonFormA2UI_0_8CustomComponentNode;

export type JsonFormA2UIComponentNode = JsonFormA2UI_0_8ComponentNode;

export const defineJsonFormComponents = <const TExternal extends JsonFormExternalComponentMap>(
  components: TExternal,
) => {
  return components;
};

export const defineJsonFormSchemas = <const TExternal extends JsonFormExternalComponentMap>() => {
  return <const TSchemas extends JsonFormSchema<JsonFormComponentType<TExternal>, TExternal>[]>(
    schemas: TSchemas,
  ) => {
    return schemas;
  };
};
