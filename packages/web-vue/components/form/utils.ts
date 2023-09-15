import { VALIDATE_STATUSES, ValidateStatus } from './interface';

export function getValueByPath(
  obj: any,
  path: string,
  strict: boolean
): {
  o: unknown;
  k: string;
  v: unknown;
} {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];

    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]],
  };
}

export const getFinalValidateStatus = (
  validateStatus: Record<string, ValidateStatus | ''>
) => {
  let status: ValidateStatus | '' = '';
  for (const key of Object.keys(validateStatus)) {
    const _status = validateStatus[key];
    if (_status) {
      if (
        !status ||
        VALIDATE_STATUSES.indexOf(_status) > VALIDATE_STATUSES.indexOf(status)
      ) {
        status = validateStatus[key];
      }
    }
  }
  return status;
};

export const getFinalValidateMessage = (
  validateMessage: Record<string, string>
) => {
  const messages: string[] = [];
  for (const key of Object.keys(validateMessage)) {
    const _message = validateMessage[key];
    if (_message) {
      messages.push(_message);
    }
  }
  return messages;
};

export const getFormElementId = (prefix: string | undefined, field: string) => {
  const id = (field as string).replace(/[[.]/g, '_').replace(/\]/g, '');
  return prefix ? `${prefix}-${id}` : `${id}`;
};
