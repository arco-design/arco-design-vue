import type { Options as ClipboardOptions } from 'copy-to-clipboard';

import type { ButtonProps } from '../button';
import type { LinkProps } from '../link';
import type { TooltipInstance } from '../tooltip';

export type CopyComponentType = 'link' | 'button';

type CopyBaseProps = {
  /**
   * @zh 要复制的内容
   * @en Content to copy
   */
  content?: string;
  /**
   * @zh Tooltip 文案
   * @en Tooltip text
   */
  tooltip?: string;
  /**
   * @zh Tooltip 组件属性
   * @en Tooltip props
   */
  tooltipProps?: TooltipInstance['$props'];
  /**
   * @zh 透传给 copy-to-clipboard 的配置
   * @en Options passed through to copy-to-clipboard
   */
  clipboardProps?: ClipboardOptions;
  /**
   * @zh 是否继承当前文本颜色
   * @en Whether to inherit the current text color
   */
  textInherit?: boolean;
  /**
   * @zh 复制成功提示文案
   * @en Success message after copy
   */
  successMessage?: string;
};

export type CopyLinkProps = CopyBaseProps &
  LinkProps & {
    /**
     * @zh 触发复制的组件类型
     * @en Trigger component type
     */
    component?: 'link';
  };

export type CopyButtonProps = CopyBaseProps &
  ButtonProps & {
    /**
     * @zh 触发复制的组件类型
     * @en Trigger component type
     */
    component: 'button';
  };

export type CopyProps = CopyLinkProps | CopyButtonProps;
