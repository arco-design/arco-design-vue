export interface TagData {
  value: string | number;
  label: string;
  closable?: boolean;

  [other: string]: any;
}
