import { FunctionalComponent } from 'vue';
import SelectBase from './select-base';
import { travelSelectChildren } from './utils';
import { SelectProps } from './interface';

const Select: FunctionalComponent<SelectProps> = (props, { slots }) => {
  if (slots.default) {
    props.options = travelSelectChildren(slots.default());
  }

  return <SelectBase {...props} />;
};
Select.displayName = 'Select';

export default Select;

// export default defineComponent({
//   name: 'Select',
//
//   setup(_, { slots }) {
//     return () => {
//       let options;
//
//       if (slots.default) {
//         options = travelSelectChildren(slots.default());
//       }
//
//       return <Select options={options} />;
//     };
//   },
// });
