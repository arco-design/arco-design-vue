import { RenderContent } from '../_utils/types';

export interface CheckboxOption {
  /**
   * @zh 文案
   * @en label content
   */
  label?: RenderContent;
  /**
   * @zh 选项的 `value`
   * @en The `value` of the option
   */
  value: string | number;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 是否为半选状态
   * @en Whether it is half-selected
   */
  indeterminate?: boolean;
  /**
   * @zh 值改变时触发
   * @en Trigger when the value changes
   */
  onChange?: (
    value: boolean | Array<string | number | boolean>,
    ev: Event
  ) => void;
}
