import type { SpinProps } from '../spin';

export type QrCodeType = 'canvas' | 'svg';
export type QrCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';
export type QrCodeStatusType = 'active' | 'expired' | 'loading' | 'scanned';
export type QrCodeInactiveStatus = Exclude<QrCodeStatusType, 'active'>;
export type QrCodeIconSize = number | { width: number; height: number };
export type QrCodeValue = string | string[];

export type QrCodeStatusRenderInfo = {
  status: QrCodeInactiveStatus;
  onRefresh: () => void;
};

export type QrCodeStatusProps = {
  prefixCls: string;
  status: QrCodeInactiveStatus;
  spinProps?: SpinProps;
};
