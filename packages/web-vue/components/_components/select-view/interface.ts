import { TagData } from '../../input-tag/interface';

export interface SelectViewValue extends TagData {
  value: string | number;
  label: string;
  closable: boolean;
}
