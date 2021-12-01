import { TagProps } from '../tag';

export interface TagData {
  value: string | number;
  label: string;
  closable?: boolean;
  tagProps?: TagProps;

  [other: string]: any;
}
