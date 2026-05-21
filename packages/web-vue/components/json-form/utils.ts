import type { Component } from 'vue';

import { camelCase, omitBy } from 'es-toolkit';
import { isPlainObject } from 'es-toolkit';

import AutoComplete from '../auto-complete';
import Cascader from '../cascader';
import Checkbox, { CheckboxGroup } from '../checkbox';
import DatePicker, { RangePicker } from '../date-picker';
import { Row } from '../grid';
import Input, { InputPassword, InputSearch } from '../input';
import InputNumber from '../input-number';
import InputTag from '../input-tag';
import Mention from '../mention';
import Radio, { RadioGroup } from '../radio';
import Rate from '../rate';
import Select from '../select';
import Slider from '../slider';
import Switch from '../switch';
import Textarea from '../textarea';
import TimePicker from '../time-picker';
import Transfer from '../transfer';
import TreeSelect from '../tree-select';
import VerificationCode from '../verification-code';
import {
  JSON_FORM_COMPONENT_TYPES,
  A2UI_0_8,
  type JsonFormA2UIBoundValue,
  type JsonFormA2UIChildren,
  type JsonFormA2UIChoiceComponent,
  type JsonFormA2UIChoiceOption,
  type JsonFormA2UIComponentName,
  type JsonFormA2UI_0_8ComponentNode,
  type JsonFormComponentRegistry,
  type JsonFormExternalComponentMap,
  type JsonFormModel,
  type JsonFormSchema,
} from './types';

const JSON_FORM_STANDARD_A2UI_0_8_COMPONENTS = new Set<string>([
  'Row',
  'Column',
  'TextField',
  'CheckBox',
  'Slider',
  'DateTimeInput',
  'MultipleChoice',
  'ChoicePicker',
]);

const JSON_FORM_A2UI_0_8_COMPONENT_ALIASES: Record<string, string> = {
  AutoComplete: JSON_FORM_COMPONENT_TYPES.autoComplete,
  Cascader: JSON_FORM_COMPONENT_TYPES.cascader,
  CheckBox: JSON_FORM_COMPONENT_TYPES.checkbox,
  Checkbox: JSON_FORM_COMPONENT_TYPES.checkbox,
  CheckboxGroup: JSON_FORM_COMPONENT_TYPES.checkboxGroup,
  DatePicker: JSON_FORM_COMPONENT_TYPES.datePicker,
  Input: JSON_FORM_COMPONENT_TYPES.input,
  InputNumber: JSON_FORM_COMPONENT_TYPES.inputNumber,
  InputPassword: JSON_FORM_COMPONENT_TYPES.inputPassword,
  InputSearch: JSON_FORM_COMPONENT_TYPES.inputSearch,
  InputTag: JSON_FORM_COMPONENT_TYPES.inputTag,
  Mention: JSON_FORM_COMPONENT_TYPES.mention,
  NoFormItem: JSON_FORM_COMPONENT_TYPES.noFormItem,
  Radio: JSON_FORM_COMPONENT_TYPES.radio,
  RadioGroup: JSON_FORM_COMPONENT_TYPES.radioGroup,
  RangePicker: JSON_FORM_COMPONENT_TYPES.rangePicker,
  Rate: JSON_FORM_COMPONENT_TYPES.rate,
  Row: JSON_FORM_COMPONENT_TYPES.row,
  Select: JSON_FORM_COMPONENT_TYPES.select,
  Slider: JSON_FORM_COMPONENT_TYPES.slider,
  Switch: JSON_FORM_COMPONENT_TYPES.switch,
  TextArea: JSON_FORM_COMPONENT_TYPES.textarea,
  Textarea: JSON_FORM_COMPONENT_TYPES.textarea,
  TimePicker: JSON_FORM_COMPONENT_TYPES.timePicker,
  Transfer: JSON_FORM_COMPONENT_TYPES.transfer,
  TreeSelect: JSON_FORM_COMPONENT_TYPES.treeSelect,
  VerificationCode: JSON_FORM_COMPONENT_TYPES.verificationCode,
};

const JSON_FORM_A2UI_0_8_RESERVED_PROPS = new Set([
  'label',
  'text',
  'value',
  'selections',
  'children',
  'maxAllowedSelections',
]);

const STRETCH_COMPONENT_TYPES = new Set<string>([
  JSON_FORM_COMPONENT_TYPES.autoComplete,
  JSON_FORM_COMPONENT_TYPES.cascader,
  JSON_FORM_COMPONENT_TYPES.datePicker,
  JSON_FORM_COMPONENT_TYPES.input,
  JSON_FORM_COMPONENT_TYPES.inputNumber,
  JSON_FORM_COMPONENT_TYPES.inputPassword,
  JSON_FORM_COMPONENT_TYPES.inputSearch,
  JSON_FORM_COMPONENT_TYPES.inputTag,
  JSON_FORM_COMPONENT_TYPES.mention,
  JSON_FORM_COMPONENT_TYPES.rangePicker,
  JSON_FORM_COMPONENT_TYPES.select,
  JSON_FORM_COMPONENT_TYPES.textarea,
  JSON_FORM_COMPONENT_TYPES.timePicker,
  JSON_FORM_COMPONENT_TYPES.treeSelect,
  JSON_FORM_COMPONENT_TYPES.verificationCode,
]);

export const jsonFormBuiltInComponents: JsonFormComponentRegistry = {
  autoComplete: AutoComplete,
  cascader: Cascader,
  checkbox: Checkbox,
  checkboxGroup: CheckboxGroup,
  datePicker: DatePicker,
  input: Input,
  inputNumber: InputNumber,
  inputPassword: InputPassword,
  inputSearch: InputSearch,
  inputTag: InputTag,
  mention: Mention,
  radio: Radio,
  radioGroup: RadioGroup,
  rangePicker: RangePicker,
  rate: Rate,
  row: Row,
  select: Select,
  slider: Slider,
  switch: Switch,
  textarea: Textarea,
  timePicker: TimePicker,
  transfer: Transfer,
  treeSelect: TreeSelect,
  verificationCode: VerificationCode,
};

export function resolveJsonFormComponents<TExternal extends JsonFormExternalComponentMap>(
  customComponents?: JsonFormComponentRegistry<TExternal>,
) {
  return {
    ...jsonFormBuiltInComponents,
    ...customComponents,
  } as Record<string, Component>;
}

export function shouldStretchJsonFormControl(type?: string) {
  return type ? STRETCH_COMPONENT_TYPES.has(type) : true;
}

export function parseJsonFormPath(path: string, adapter: 'default' | typeof A2UI_0_8 = 'default') {
  if (!path) {
    return [] as string[];
  }

  if (adapter === A2UI_0_8) {
    return path
      .split('/')
      .slice(1)
      .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
  }

  return path.split('.').filter(Boolean);
}

export function getJsonFormValue(
  model: JsonFormModel | undefined,
  path: string,
  adapter: 'default' | typeof A2UI_0_8 = 'default',
) {
  const segments = parseJsonFormPath(path, adapter);
  let current: unknown = model;

  for (const segment of segments) {
    if (!isPlainObject(current) && !Array.isArray(current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

export function setJsonFormValue(
  model: JsonFormModel | undefined,
  path: string,
  value: unknown,
  adapter: 'default' | typeof A2UI_0_8 = 'default',
) {
  if (!model) {
    return;
  }

  const segments = parseJsonFormPath(path, adapter);

  if (segments.length === 0) {
    return;
  }

  let current: Record<string, unknown> = model;

  for (const segment of segments.slice(0, -1)) {
    const nextValue = current[segment];

    if (!isPlainObject(nextValue) && !Array.isArray(nextValue)) {
      current[segment] = {};
    }

    current = current[segment] as Record<string, unknown>;
  }

  current[segments.at(-1)!] = value;
}

function resolveA2UIBoundText(value?: JsonFormA2UIBoundValue) {
  if (typeof value === 'string') {
    return value;
  }

  return value?.literalString;
}

function resolveA2UIBoundPath(value?: JsonFormA2UIBoundValue) {
  if (typeof value === 'string') {
    return undefined;
  }

  return value?.path;
}

function getA2UIChildren(children?: JsonFormA2UIChildren) {
  if (Array.isArray(children)) {
    return children;
  }

  return children?.explicitList ?? [];
}

function resolveA2UIComponent(node: JsonFormA2UI_0_8ComponentNode) {
  if (typeof node.component === 'string') {
    return {
      name: node.component,
      props: node,
    };
  }

  const component = node.component as Record<string, Record<string, unknown>>;
  const [name] = Object.keys(component) as JsonFormA2UIComponentName[];

  return {
    name,
    props: component[name] ?? {},
  };
}

function resolveA2UIBoundValue(value?: unknown): unknown {
  if (typeof value === 'string') {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  if ('literalString' in value && typeof value.literalString === 'string') {
    return value.literalString;
  }

  if (Array.isArray(value)) {
    return value.map((item): unknown => resolveA2UIBoundValue(item));
  }

  return value;
}

function normalizeA2UI_0_8ComponentType(componentName: string) {
  if (JSON_FORM_A2UI_0_8_COMPONENT_ALIASES[componentName]) {
    return JSON_FORM_A2UI_0_8_COMPONENT_ALIASES[componentName];
  }

  const normalizedName = camelCase(componentName);

  if (normalizedName in JSON_FORM_COMPONENT_TYPES) {
    return normalizedName;
  }

  return normalizedName;
}

function resolveA2UI_0_8FieldPath(props: Record<string, unknown>) {
  const candidates = [props.value, props.text, props.selections];

  for (const candidate of candidates) {
    const path = resolveA2UIBoundPath(candidate as JsonFormA2UIBoundValue | undefined);

    if (path) {
      return path;
    }
  }

  return undefined;
}

function resolveA2UI_0_8Label(props: Record<string, unknown>) {
  return resolveA2UIBoundText(props.label as JsonFormA2UIBoundValue | undefined);
}

function translateA2UI_0_8CommonComponentProps(props: Record<string, unknown>) {
  const baseProps = omitBy(props, (_, key) => JSON_FORM_A2UI_0_8_RESERVED_PROPS.has(key)) as Record<
    string,
    unknown
  >;

  if (Array.isArray(baseProps.options)) {
    baseProps.options = translateA2UIChoiceOptions(baseProps.options as JsonFormA2UIChoiceOption[]);
  }

  for (const key of Object.keys(baseProps)) {
    baseProps[key] = resolveA2UIBoundValue(baseProps[key]);
  }

  if (typeof props.maxAllowedSelections === 'number') {
    const maxAllowedSelections = props.maxAllowedSelections;
    baseProps.multiple = maxAllowedSelections !== 1;
  }

  return baseProps;
}

function translateA2UI_0_8GenericField(node: JsonFormA2UI_0_8ComponentNode) {
  const { name, props } = resolveA2UIComponent(node);
  const normalizedType = normalizeA2UI_0_8ComponentType(name);
  const resolvedProps = props as Record<string, unknown>;

  if (normalizedType === JSON_FORM_COMPONENT_TYPES.row || normalizedType === 'column') {
    return [] as JsonFormSchema<string>[];
  }

  const field = resolveA2UI_0_8FieldPath(resolvedProps) ?? node.id;

  return [
    {
      field,
      label: resolveA2UI_0_8Label(resolvedProps),
      type: normalizedType,
      componentProps: translateA2UI_0_8CommonComponentProps(resolvedProps),
    },
  ];
}

function translateA2UIChoiceOptions(options: JsonFormA2UIChoiceOption[] = []) {
  return options.map((option) => ({
    label: resolveA2UIBoundText(option.label) ?? String(option.value),
    value: option.value,
  }));
}

function translateA2UI_0_8Field(node: JsonFormA2UI_0_8ComponentNode): JsonFormSchema<string>[] {
  const { name, props } = resolveA2UIComponent(node);

  switch (name) {
    case 'TextField': {
      const field =
        resolveA2UIBoundPath((props as { value?: JsonFormA2UIBoundValue }).value) ??
        resolveA2UIBoundPath((props as { text?: JsonFormA2UIBoundValue }).text);

      if (!field) {
        return [];
      }

      const textFieldType = (props as { textFieldType?: string }).textFieldType;

      const mappedType =
        textFieldType === 'longText'
          ? JSON_FORM_COMPONENT_TYPES.textarea
          : textFieldType === 'number'
            ? JSON_FORM_COMPONENT_TYPES.inputNumber
            : textFieldType === 'obscured'
              ? JSON_FORM_COMPONENT_TYPES.inputPassword
              : textFieldType === 'date'
                ? JSON_FORM_COMPONENT_TYPES.datePicker
                : JSON_FORM_COMPONENT_TYPES.input;

      return [
        {
          field,
          label: resolveA2UIBoundText((props as { label?: JsonFormA2UIBoundValue }).label),
          type: mappedType,
          componentProps: {
            ...translateA2UI_0_8CommonComponentProps(props as Record<string, unknown>),
            placeholder: resolveA2UIBoundText(
              (props as { placeholder?: JsonFormA2UIBoundValue }).placeholder,
            ),
          },
        },
      ];
    }

    case 'CheckBox': {
      const field = resolveA2UIBoundPath((props as { value?: JsonFormA2UIBoundValue }).value);

      if (!field) {
        return [];
      }

      return [
        {
          field,
          label: resolveA2UIBoundText((props as { label?: JsonFormA2UIBoundValue }).label),
          type: JSON_FORM_COMPONENT_TYPES.checkbox,
          componentProps: translateA2UI_0_8CommonComponentProps(props as Record<string, unknown>),
        },
      ];
    }

    case 'Slider': {
      const field = resolveA2UIBoundPath((props as { value?: JsonFormA2UIBoundValue }).value);

      if (!field) {
        return [];
      }

      return [
        {
          field,
          type: JSON_FORM_COMPONENT_TYPES.slider,
          componentProps: {
            ...translateA2UI_0_8CommonComponentProps(props as Record<string, unknown>),
            min: (props as { minValue?: number }).minValue,
            max: (props as { maxValue?: number }).maxValue,
          },
        },
      ];
    }

    case 'DateTimeInput': {
      const field = resolveA2UIBoundPath((props as { value?: JsonFormA2UIBoundValue }).value);

      if (!field) {
        return [];
      }

      const enableDate = (props as { enableDate?: boolean }).enableDate ?? true;
      const enableTime = (props as { enableTime?: boolean }).enableTime ?? false;
      const type = enableDate
        ? JSON_FORM_COMPONENT_TYPES.datePicker
        : JSON_FORM_COMPONENT_TYPES.timePicker;

      return [
        {
          field,
          label: resolveA2UIBoundText((props as { label?: JsonFormA2UIBoundValue }).label),
          type,
          componentProps: {
            ...translateA2UI_0_8CommonComponentProps(props as Record<string, unknown>),
            ...(enableDate && enableTime ? { showTime: true } : {}),
          },
        },
      ];
    }

    case 'MultipleChoice':
    case 'ChoicePicker': {
      const choiceProps = props as JsonFormA2UIChoiceComponent;
      const field = resolveA2UIBoundPath(choiceProps.selections);

      if (!field) {
        return [];
      }

      return [
        {
          field,
          label: resolveA2UIBoundText(choiceProps.label),
          type: JSON_FORM_COMPONENT_TYPES.select,
          componentProps: {
            ...translateA2UI_0_8CommonComponentProps(props as Record<string, unknown>),
            options: translateA2UIChoiceOptions(choiceProps.options),
            multiple: choiceProps.maxAllowedSelections !== 1,
          },
        },
      ];
    }

    default:
      return translateA2UI_0_8GenericField(node);
  }
}

export function translateA2UI_0_8ToJsonFormSchemas(nodes: JsonFormA2UI_0_8ComponentNode[]) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const referencedIds = new Set<string>();
  const visitedIds = new Set<string>();

  for (const node of nodes) {
    const { name, props } = resolveA2UIComponent(node);

    if (name === 'Row' || name === 'Column') {
      for (const childId of getA2UIChildren(
        (props as { children?: JsonFormA2UIChildren }).children,
      )) {
        referencedIds.add(childId);
      }
    }
  }

  const expandNode = (node: JsonFormA2UI_0_8ComponentNode): JsonFormSchema<string>[] => {
    if (visitedIds.has(node.id)) {
      return [];
    }

    visitedIds.add(node.id);

    const { name, props } = resolveA2UIComponent(node);

    if (name === 'Column') {
      return getA2UIChildren((props as { children?: JsonFormA2UIChildren }).children).flatMap(
        (childId) => {
          const childNode = nodeMap.get(childId);
          return childNode ? expandNode(childNode) : [];
        },
      );
    }

    if (name === 'Row') {
      const children = getA2UIChildren((props as { children?: JsonFormA2UIChildren }).children)
        .map((childId) => nodeMap.get(childId))
        .flatMap((childNode) => (childNode ? expandNode(childNode) : []));

      return [
        {
          field: node.id,
          type: JSON_FORM_COMPONENT_TYPES.row,
          children,
        },
      ];
    }

    if (JSON_FORM_STANDARD_A2UI_0_8_COMPONENTS.has(name)) {
      return translateA2UI_0_8Field(node);
    }

    return translateA2UI_0_8GenericField(node);
  };

  const roots = nodes.filter((node) => !referencedIds.has(node.id));

  return roots.flatMap((node) => expandNode(node));
}

export const translateA2UIToJsonFormSchemas = translateA2UI_0_8ToJsonFormSchemas;

export function mergeJsonFormClassName(...classNames: unknown[]) {
  return classNames.filter(Boolean);
}
