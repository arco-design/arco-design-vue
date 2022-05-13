import { RenderContent } from '../_utils/types';

export interface RadioOption {
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
}
