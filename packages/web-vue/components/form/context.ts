import { InjectionKey } from 'vue';
import { Data } from '../_utils/types';
import {
  FieldData,
  FieldRule,
  ValidatedError,
  ValidateStatus,
} from './interface';
import { Size } from '../_utils/constant';

export interface FormContext {
  layout: string;
  disabled?: boolean;
  labelAlign: string;
  labelColProps?: any;
  wrapperColProps?: any;
  labelColStyle?: any;
  wrapperColStyle?: any;
  model: Data;
  size: Size;
  rules?: Record<string, FieldRule | FieldRule[]>;
  fields: FormItemInfo[];
  touchedFields: FormItemInfo[];
  addField: (field: FormItemInfo) => void;
  removeField: (field: FormItemInfo) => void;
  validateField: (
    field: string | string[],
    callback?: (errors: undefined | Record<string, ValidatedError>) => void
  ) => Promise<undefined | Record<string, ValidatedError>>;
}

export interface FormItemContext {
  updateValidateState: (
    field: string,
    { status, message }: { status: ValidateStatus | ''; message: string }
  ) => void;
}

export interface FormItemInfo {
  field: string;
  disabled: boolean;
  error: boolean;
  validate: () => Promise<any>;
  clearValidate: () => void;
  resetField: () => void;
  setField: (data: FieldData) => void;
}

export const formItemKey: InjectionKey<FormItemContext> = Symbol('formItemCtx');
export const formKey: InjectionKey<FormContext> = Symbol('formCtx');
