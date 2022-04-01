import { VNode } from 'vue';

export interface EllipsisConfig {
  /**
   * @zh 显示省略的行数
   * @en The number of omitted lines
   * @defaultValue 1
   */
  rows?: number;
  /**
   * @zh 是否支持展开/折叠
   * @en Whether expandable
   */
  expandable?: boolean;
  /**
   * @zh 省略号
   * @en Ellipsis string
   * @defaultValue '...'
   */
  ellipsisStr?: string;
  /**
   * @zh 后缀
   * @en Suffix
   */
  suffix?: string;
  /**
   * @zh 配置省略时的弹出框
   * @en Pop-up box when configuration is omitted
   * @defaultValue false
   * */
  showTooltip?:
    | boolean
    | { type: 'tooltip' | 'popover'; props: Record<string, any> };
}
export interface EllipsisInternalConfig extends Required<EllipsisConfig> {
  showTooltip: boolean;
  TooltipComponent: any;
  tooltipProps: { [key: string]: any };
}

export interface EllipsisProps {
  ellipsis: boolean | EllipsisConfig;
}

export interface CopyProps {
  copyable: boolean;
  copyDelay: number;
  copyText: string | undefined;
}

export interface EditProps {
  editable: boolean;
  editing: boolean | undefined;
  defaultEditing: boolean;
  editText: string | undefined;
}

export type OperationsProps = CopyProps & EditProps & EllipsisProps;

export interface BaseProps extends OperationsProps {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | undefined;
  bold: boolean;
  mark: boolean | { color: string };
  underline: boolean;
  delete: boolean;
  code: boolean;
  disabled: boolean;
}

export interface TitleProps extends BaseProps {
  heading: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphProps extends BaseProps {
  blockquote: boolean;
  spacing: 'default' | 'close';
}

export interface TextProps extends BaseProps {
  icon?: VNode;
}
