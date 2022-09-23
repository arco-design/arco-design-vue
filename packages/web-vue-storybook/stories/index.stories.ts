import StoryButton from './components/button.vue';
import StoryDropdown from './components/dropdown';
import StoryTypography from './components/typography.vue';
import StoryTree from './components/tree.vue';
import StoryForm from './components/form.vue';
import StoryTreeDraggable from './components/tree-draggable.vue';
import StoryVirtual from './components/virtual-list.vue';
import StorySpace from './components/space.vue';
import StoryMenu from './components/menu.vue';
import StorySelect from './components/select';
import StoryNumberInput from './components/number-input.vue';
import StorTreeSelect from './components/tree-select.vue';
import StoryDatePicker from './components/date-picker.vue';

export default {
  title: 'Components',
};

export const Button = () => StoryButton;
export const Dropdown = () => StoryDropdown;
export const Typography = () => StoryTypography;
export const Tree = () => StoryTree;
export const Form = () => StoryForm;
export const TreeDraggable = () => StoryTreeDraggable;
export const Virtual = () => StoryVirtual;
export const Space = () => StorySpace;
export const Menu = () => StoryMenu;
export const Select = () => StorySelect;
export const NumberInput = () => StoryNumberInput;
export const TreeSelect = () => StorTreeSelect;
export const DatePicker = () => StoryDatePicker;
