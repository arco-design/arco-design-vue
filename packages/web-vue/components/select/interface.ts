import { Size } from '../_utils/constant';
import { Option, OptionInfo } from '../_components/dropdown/interface';
import { VirtualListProps } from '../_components/virtual-list/interface';
import { TriggerProps } from '../trigger';
import { EmitType } from '../_utils/types';

export interface SelectProps {
  multiple: boolean;
  modelValue: string | number | Array<string | number>;
  defaultValue: string | number | Array<string | number>;
  inputValue: string;
  defaultInputValue: string;
  size: Size;
  placeholder: string;
  loading: boolean;
  disabled: boolean;
  error: boolean;
  allowClear: boolean;
  allowSearch: boolean;
  allowCreate: boolean;
  maxTagCount: number;
  popupContainer: string | HTMLElement;
  popupVisible: boolean;
  unmountOnClose: boolean;
  filterOption: boolean;
  options: Option[];
  virtualListProps: VirtualListProps;
  triggerProps: TriggerProps;
  formatLabel: (data: OptionInfo) => string;
  onChange: EmitType<(value: string | number | Array<string | number>) => void>;
  onInputValueChange: EmitType<(inputValue: string) => void>;
  onPopupVisibleChange: EmitType<(popupVisible: boolean) => void>;
  onClear: EmitType<() => void>;
  onRemove: EmitType<(removed: string) => void>;
  onSearch: EmitType<(inputValue: string) => void>;
}
