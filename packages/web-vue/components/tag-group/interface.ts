import type { Merge } from 'type-fest';

import type { TagProps } from '../tag';

export type TagGroupOptionLabel = string | number | (() => string | number);

export type TagGroupObjectOption = Merge<
  Partial<TagProps>,
  {
    label: TagGroupOptionLabel;
    value: string | number;
    itemProps?: Record<string, unknown>;
  }
> &
  Record<string, unknown>;

export type TagGroupOption = string | number | TagGroupObjectOption;

export interface TagGroupFieldNames {
  /**
   * @zh 自定义标签字段名
   * @en Custom field name for label
   */
  label?: string;
  /**
   * @zh 自定义值字段名
   * @en Custom field name for value
   */
  value?: string;
}

export interface TagGroupProps {
  /**
   * @zh 最多展示的标签个数，`responsive` 会根据容器宽度自动折叠。
   * @en Maximum number of visible items. Use `responsive` to collapse by container width.
   * @defaultValue 'responsive'
   */
  maxCount?: number | 'responsive';
  /**
   * @zh 标签组选项列表
   * @en Options for the tag group
   */
  options?: TagGroupOption[];
  /**
   * @zh 自定义字段名称
   * @en Custom field names
   */
  fieldNames?: TagGroupFieldNames;
}
