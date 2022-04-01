import { isNumber, isObject } from '../_utils/is';
import { InputTagFieldNames, TagData, TagDataInfo } from './interface';

export const getValueData = (
  value: Array<string | number | TagData>,
  fieldNames: Required<InputTagFieldNames>
): TagDataInfo[] => {
  const result: TagDataInfo[] = [];
  for (const item of value) {
    if (isObject(item)) {
      result.push({
        raw: item,
        value: item[fieldNames.value],
        label: item[fieldNames.label],
        closable: item[fieldNames.closable],
        tagProps: item[fieldNames.tagProps],
      });
    } else if (value || isNumber(value)) {
      const raw = {
        value: item,
        label: String(item),
        closable: true,
      };
      result.push({
        raw,
        ...raw,
      });
    }
  }
  return result;
};
