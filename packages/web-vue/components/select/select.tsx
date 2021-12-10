import { FunctionalComponent } from 'vue';
import BaseSelect from './base-select';
import { travelSelectChildren } from './utils';
import { omit } from '../_utils/omit';

export type SelectProps = InstanceType<typeof BaseSelect>['$props'];

const Select: FunctionalComponent<SelectProps> = (props, { slots }) => {
  if (slots.default) {
    props.options = travelSelectChildren(slots.default());
  }
  const omitSlots = omit(slots, ['default']);

  return <BaseSelect v-slots={omitSlots} {...props} />;
};

Select.displayName = 'Select';

export default Select;
