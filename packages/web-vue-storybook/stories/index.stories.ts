import StoryButton from './components/button.vue';
import StoryDropdown from './components/dropdown';
import StoryTypography from './components/typography.vue';
import StoryTree from './components/tree.vue';
import StoryTreeDraggable from './components/tree-draggable.vue';
import StoryVirtual from './components/virtual-list.vue';
import StorySpace from './components/space.vue';
import StoryMenu from './components/menu.vue';
import StorySelect from './components/select';

export default {
  title: 'Components',
};

export const Button = () => StoryButton;
export const Dropdown = () => StoryDropdown;
export const Typography = () => StoryTypography;
export const Tree = () => StoryTree;
export const TreeDraggable = () => StoryTreeDraggable;
export const Virtual = () => StoryVirtual;
export const Space = () => StorySpace;
export const Menu = () => StoryMenu;
export const Select = () => StorySelect;
