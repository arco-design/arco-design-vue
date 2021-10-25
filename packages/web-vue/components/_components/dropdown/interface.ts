export interface OptionData {
  value: string | number;
  label: string;
  disabled?: boolean;

  [other: string]: any;
}

export interface GroupOption {
  isGroup: true;
  label: string;
  options: Option[];

  [other: string]: any;
}

export type Option = string | number | OptionData | GroupOption;

export interface OptionInfo extends OptionData {
  index: number;
  key: string;
  origin: 'children' | 'options' | 'extraOptions';
}

export interface OptionNode {
  type: 'option' | 'optGroup';
  key: string;
  value?: string | number;
  label: string;
  disabled?: boolean;
}

export type FilterOption =
  | boolean
  | ((inputValue: string, optionInfo: OptionInfo) => boolean);
