import { TagProps } from '../tag';
import { FieldString } from '../_utils/types';

export interface TagData {
  /**
   * @zh 标签值
   * @en Tag value
   */
  value?: string | number;
  /**
   * @zh 标签内容
   * @en Tag content
   */
  label?: string;
  /**
   * @zh 是否可关闭
   * @en Whether to close
   */
  closable?: boolean;
  /**
   * @zh 标签属性
   * @en Tag props
   */
  tagProps?: TagProps;

  [other: string]: any;
}

export type InputTagFieldNames = FieldString<TagData>;

export interface TagDataInfo extends TagData {
  raw: Record<string, unknown>;
  value: string | number;
  label: string;
  closable: boolean;
}
