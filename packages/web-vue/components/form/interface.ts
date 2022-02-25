import { Ref } from 'vue';
import { Size } from '../_utils/constant';

export const VALIDATE_STATUSES = [
  'success',
  'warning',
  'error',
  'validating',
] as const;
export type ValidateStatus = typeof VALIDATE_STATUSES[number];

export const VALIDATE_TRIGGERS = ['change', 'input', 'focus', 'blur'] as const;
export type ValidateTrigger = typeof VALIDATE_TRIGGERS[number];

export interface FieldRule<FieldValue = any> {
  /**
   * @zh 校验的值的类型，默认为 `'string'`
   * @en The type of the value to be checked, the default is `'string'`
   */
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'array'
    | 'object'
    | 'email'
    | 'url'
    | 'ip';
  /**
   * @zh 是否必填
   * @en Is it required
   */
  required?: boolean;
  /**
   * @zh 校验失败时展示的信息
   * @en Information displayed when verification fails
   */
  message?: string;
  /**
   * @zh 校验长度（string, array）
   * @en Check length (string, array)
   */
  length?: number;
  /**
   * @zh 最大长度（string）
   * @en Maximum length (string)
   */
  maxLength?: number;
  /**
   * @zh 最小长度（string）
   * @en Minimum length (string)
   */
  minLength?: number;
  /**
   * @zh 匹配校验（string）
   * @en Match check (string)
   */
  match?: RegExp;
  /**
   * @zh 大写（string）
   * @en Uppercase (string)
   */
  uppercase?: boolean;
  /**
   * @zh 小写（string）
   * @en Lowercase (string)
   */
  lowercase?: boolean;
  /**
   * @zh 最小值（number）
   * @en Minimum (number)
   */
  min?: number;
  /**
   * @zh 最大值（number）
   * @en Maximum (number)
   */
  max?: number;
  /**
   * @zh 校验数值（number）
   * @en Check value (number)
   */
  equal?: number;
  /**
   * @zh 正数（number）
   * @en Positive number (number)
   */
  positive?: boolean;
  /**
   * @zh 负数（number）
   * @en Negative number (number)
   */
  negative?: boolean;
  /**
   * @zh 是否为 `true`（boolean）
   * @en Whether it is `true` (boolean)
   */
  true?: boolean;
  /**
   * @zh 是否为 `false`（boolean）
   * @en Whether it is `false` (boolean)
   */
  false?: boolean;
  /**
   * @zh 数组中是否包含给定值（array）
   * @en Does the array contain the given value (array)
   */
  includes?: any[];
  /**
   * @zh 数组元素是否相等（array）
   * @en Are array elements equal (array)
   */
  deepEqual?: any;
  /**
   * @zh 是否为空（object）
   * @en Is it empty (object)
   */
  empty?: boolean;
  /**
   * @zh 对象是否包含给定属性（object）
   * @en Does the object contain the given attribute (object)
   */
  hasKeys?: string[];
  /**
   * @zh 自定义校验规则
   * @en Custom verification rules
   * @param value
   * @param callback
   */
  validator?: (
    value: FieldValue | undefined,
    callback: (error?: string) => void
  ) => void;
}

export interface FieldData {
  /**
   * @zh 字段的值
   * @en Field value
   */
  value?: any;
  /**
   * @zh 字段的状态
   * @en Field status
   */
  status?: ValidateStatus;
  /**
   * @zh 字段的错误信息
   * @en Field error message
   */
  message?: string;
}

export interface ValidatedError {
  /**
   * @zh 标签的文本
   * @en Label text
   * @version 2.18.0
   */
  label: string;
  /**
   * @zh 字段名
   * @en Field name
   */
  field: string;
  /**
   * @zh 字段值
   * @en Field value
   */
  value: any;
  /**
   * @zh 字段类型
   * @en Field Type
   */
  type: string;
  /**
   * @zh 是否为 `required` 错误
   * @en Is it a `required` error
   */
  isRequiredError: boolean;
  /**
   * @zh 错误信息
   * @en Error message
   */
  message: string;
}

export interface FormItemEventHandler {
  /**
   * @zh onChange
   * @en onChange
   */
  onChange?: (ev?: Event) => void;
  /**
   * @zh onInput
   * @en onInput
   */
  onInput?: (ev?: Event) => void;
  /**
   * @zh onFocus
   * @en onFocus
   */
  onFocus?: (ev?: Event) => void;
  /**
   * @zh onBlur
   * @en onBlur
   */
  onBlur?: (ev?: Event) => void;
}
