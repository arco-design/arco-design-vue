import { Size, Status, BorderShape } from '../_utils/constant';
import { ButtonTypes } from './constants';

export interface ButtonProps {
  type?: ButtonTypes;
  shape?: BorderShape;
  status?: Status;
  size?: Size;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: string;
  autofocus?: boolean;
  href?: string;
}
