import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import nProgress from 'nprogress';

const Start = () => import('./docs/start.zh-CN.md');
const StartEn = () => import('./docs/start.en-US.md');
const Dark = () => import('./docs/dark.zh-CN.md');
const DarkEn = () => import('./docs/dark.en-US.md');
const Theme = () => import('./docs/theme.zh-CN.md');
const ThemeEn = () => import('./docs/theme.en-US.md');
const I18n = () => import('./docs/i18n.zh-CN.md');
const I18nEn = () => import('./docs/i18n.en-US.md');
const Changelog = () => import('./pages/changelog/changelog.vue');
const Button = () => import('@web-vue/components/button/README.zh-CN.md');
const ButtonEn = () => import('@web-vue/components/button/README.en-US.md');
const Icon = () => import('./pages/icon/icon-demo.vue');
const Link = () => import('@web-vue/components/link/README.zh-CN.md');
const LinkEn = () => import('@web-vue/components/link/README.en-US.md');
const Typography = () =>
  import('@web-vue/components/typography/README.zh-CN.md');
const TypographyEn = () =>
  import('@web-vue/components/typography/README.en-US.md');
const Divider = () => import('@web-vue/components/divider/README.zh-CN.md');
const DividerEn = () => import('@web-vue/components/divider/README.en-US.md');
const Grid = () => import('@web-vue/components/grid/README.zh-CN.md');
const GridEn = () => import('@web-vue/components/grid/README.en-US.md');
const Layout = () => import('@web-vue/components/layout/README.zh-CN.md');
const LayoutEn = () => import('@web-vue/components/layout/README.en-US.md');
const Space = () => import('@web-vue/components/space/README.zh-CN.md');
const SpaceEn = () => import('@web-vue/components/space/README.en-US.md');
const Avatar = () => import('@web-vue/components/avatar/README.zh-CN.md');
const AvatarEn = () => import('@web-vue/components/avatar/README.en-US.md');
const Badge = () => import('@web-vue/components/badge/README.zh-CN.md');
const BadgeEn = () => import('@web-vue/components/badge/README.en-US.md');
const Card = () => import('@web-vue/components/card/README.zh-CN.md');
const CardEn = () => import('@web-vue/components/card/README.en-US.md');
const Carousel = () => import('@web-vue/components/carousel/README.zh-CN.md');
const CarouselEn = () => import('@web-vue/components/carousel/README.en-US.md');
const Collapse = () => import('@web-vue/components/collapse/README.zh-CN.md');
const CollapseEn = () => import('@web-vue/components/collapse/README.en-US.md');
const Comment = () => import('@web-vue/components/comment/README.zh-CN.md');
const CommentEn = () => import('@web-vue/components/comment/README.en-US.md');
const Descriptions = () =>
  import('@web-vue/components/descriptions/README.zh-CN.md');
const DescriptionsEn = () =>
  import('@web-vue/components/descriptions/README.en-US.md');
const Empty = () => import('@web-vue/components/empty/README.zh-CN.md');
const EmptyEn = () => import('@web-vue/components/empty/README.en-US.md');
const Image = () => import('@web-vue/components/image/README.zh-CN.md');
const ImageEn = () => import('@web-vue/components/image/README.en-US.md');
const List = () => import('@web-vue/components/list/README.zh-CN.md');
const ListEn = () => import('@web-vue/components/list/README.en-US.md');
const Popover = () => import('@web-vue/components/popover/README.zh-CN.md');
const PopoverEn = () => import('@web-vue/components/popover/README.en-US.md');
const Statistic = () => import('@web-vue/components/statistic/README.zh-CN.md');
const StatisticEn = () =>
  import('@web-vue/components/statistic/README.en-US.md');
const Table = () => import('@web-vue/components/table/README.zh-CN.md');
const TableEn = () => import('@web-vue/components/table/README.en-US.md');
const Tabs = () => import('@web-vue/components/tabs/README.zh-CN.md');
const TabsEn = () => import('@web-vue/components/tabs/README.en-US.md');
const Tag = () => import('@web-vue/components/tag/README.zh-CN.md');
const TagEn = () => import('@web-vue/components/tag/README.en-US.md');
const Timeline = () => import('@web-vue/components/timeline/README.zh-CN.md');
const TimelineEn = () => import('@web-vue/components/timeline/README.en-US.md');
const Tooltip = () => import('@web-vue/components/tooltip/README.zh-CN.md');
const TooltipEn = () => import('@web-vue/components/tooltip/README.en-US.md');
const Tree = () => import('@web-vue/components/tree/README.zh-CN.md');
const TreeEn = () => import('@web-vue/components/tree/README.en-US.md');
const AutoComplete = () =>
  import('@web-vue/components/auto-complete/README.zh-CN.md');
const AutoCompleteEn = () =>
  import('@web-vue/components/auto-complete/README.en-US.md');
const Cascader = () => import('@web-vue/components/cascader/README.zh-CN.md');
const CascaderEn = () => import('@web-vue/components/cascader/README.en-US.md');
const Checkbox = () => import('@web-vue/components/checkbox/README.zh-CN.md');
const CheckboxEn = () => import('@web-vue/components/checkbox/README.en-US.md');
const DatePicker = () =>
  import('@web-vue/components/date-picker/README.zh-CN.md');
const DatePickerEn = () =>
  import('@web-vue/components/date-picker/README.en-US.md');
const Form = () => import('@web-vue/components/form/README.zh-CN.md');
const FormEn = () => import('@web-vue/components/form/README.en-US.md');
const Input = () => import('@web-vue/components/input/README.zh-CN.md');
const InputEn = () => import('@web-vue/components/input/README.en-US.md');
const InputNumber = () =>
  import('@web-vue/components/input-number/README.zh-CN.md');
const InputNumberEn = () =>
  import('@web-vue/components/input-number/README.en-US.md');
const InputTag = () => import('@web-vue/components/input-tag/README.zh-CN.md');
const InputTagEn = () =>
  import('@web-vue/components/input-tag/README.en-US.md');
const Mention = () => import('@web-vue/components/mention/README.zh-CN.md');
const MentionEn = () => import('@web-vue/components/mention/README.en-US.md');
const Radio = () => import('@web-vue/components/radio/README.zh-CN.md');
const RadioEn = () => import('@web-vue/components/radio/README.en-US.md');
const Rate = () => import('@web-vue/components/rate/README.zh-CN.md');
const RateEn = () => import('@web-vue/components/rate/README.en-US.md');
const Select = () => import('@web-vue/components/select/README.zh-CN.md');
const SelectEn = () => import('@web-vue/components/select/README.en-US.md');
const Slider = () => import('@web-vue/components/slider/README.zh-CN.md');
const SliderEn = () => import('@web-vue/components/slider/README.en-US.md');
const Switch = () => import('@web-vue/components/switch/README.zh-CN.md');
const SwitchEn = () => import('@web-vue/components/switch/README.en-US.md');
const Textarea = () => import('@web-vue/components/textarea/README.zh-CN.md');
const TextareaEn = () => import('@web-vue/components/textarea/README.en-US.md');
const TimePicker = () =>
  import('@web-vue/components/time-picker/README.zh-CN.md');
const TimePickerEn = () =>
  import('@web-vue/components/time-picker/README.en-US.md');
const Transfer = () => import('@web-vue/components/transfer/README.zh-CN.md');
const TransferEn = () => import('@web-vue/components/transfer/README.en-US.md');
const Upload = () => import('@web-vue/components/upload/README.zh-CN.md');
const UploadEn = () => import('@web-vue/components/upload/README.en-US.md');
const TreeSelect = () =>
  import('@web-vue/components/tree-select/README.zh-CN.md');
const TreeSelectEn = () =>
  import('@web-vue/components/tree-select/README.en-US.md');
const Alert = () => import('@web-vue/components/alert/README.zh-CN.md');
const AlertEn = () => import('@web-vue/components/alert/README.en-US.md');
const Drawer = () => import('@web-vue/components/drawer/README.zh-CN.md');
const DrawerEn = () => import('@web-vue/components/drawer/README.en-US.md');
const Message = () => import('@web-vue/components/message/README.zh-CN.md');
const MessageEn = () => import('@web-vue/components/message/README.en-US.md');
const Modal = () => import('@web-vue/components/modal/README.zh-CN.md');
const ModalEn = () => import('@web-vue/components/modal/README.en-US.md');
const Notification = () =>
  import('@web-vue/components/notification/README.zh-CN.md');
const NotificationEn = () =>
  import('@web-vue/components/notification/README.en-US.md');
const Popconfirm = () =>
  import('@web-vue/components/popconfirm/README.zh-CN.md');
const PopconfirmEn = () =>
  import('@web-vue/components/popconfirm/README.en-US.md');
const Progress = () => import('@web-vue/components/progress/README.zh-CN.md');
const ProgressEn = () => import('@web-vue/components/progress/README.en-US.md');
const Result = () => import('@web-vue/components/result/README.zh-CN.md');
const ResultEn = () => import('@web-vue/components/result/README.en-US.md');
const Spin = () => import('@web-vue/components/spin/README.zh-CN.md');
const SpinEn = () => import('@web-vue/components/spin/README.en-US.md');
const Skeleton = () => import('@web-vue/components/skeleton/README.zh-CN.md');
const SkeletonEn = () => import('@web-vue/components/skeleton/README.en-US.md');
const Breadcrumb = () =>
  import('@web-vue/components/breadcrumb/README.zh-CN.md');
const BreadcrumbEn = () =>
  import('@web-vue/components/breadcrumb/README.en-US.md');
const Dropdown = () => import('@web-vue/components/dropdown/README.zh-CN.md');
const DropdownEn = () => import('@web-vue/components/dropdown/README.en-US.md');
const Menu = () => import('@web-vue/components/menu/README.zh-CN.md');
const MenuEn = () => import('@web-vue/components/menu/README.en-US.md');
const PageHeader = () =>
  import('@web-vue/components/page-header/README.zh-CN.md');
const PageHeaderEn = () =>
  import('@web-vue/components/page-header/README.en-US.md');
const Pagination = () =>
  import('@web-vue/components/pagination/README.zh-CN.md');
const PaginationEn = () =>
  import('@web-vue/components/pagination/README.en-US.md');
const Steps = () => import('@web-vue/components/steps/README.zh-CN.md');
const StepsEn = () => import('@web-vue/components/steps/README.en-US.md');
const Affix = () => import('@web-vue/components/affix/README.zh-CN.md');
const AffixEn = () => import('@web-vue/components/affix/README.en-US.md');
const Anchor = () => import('@web-vue/components/anchor/README.zh-CN.md');
const AnchorEn = () => import('@web-vue/components/anchor/README.en-US.md');
const BackTop = () => import('@web-vue/components/back-top/README.zh-CN.md');
const BackTopEn = () => import('@web-vue/components/back-top/README.en-US.md');
const ConfigProvider = () =>
  import('@web-vue/components/config-provider/README.zh-CN.md');
const ConfigProviderEn = () =>
  import('@web-vue/components/config-provider/README.en-US.md');
const ResizeBox = () =>
  import('@web-vue/components/resize-box/README.zh-CN.md');
const ResizeBoxEn = () =>
  import('@web-vue/components/resize-box/README.en-US.md');
const Trigger = () => import('@web-vue/components/trigger/README.zh-CN.md');
const TriggerEn = () => import('@web-vue/components/trigger/README.en-US.md');
const Split = () => import('@web-vue/components/split/README.zh-CN.md');
const SplitEn = () => import('@web-vue/components/split/README.en-US.md');
const OverflowList = () =>
  import('@web-vue/components/overflow-list/README.zh-CN.md');
const OverflowListEn = () =>
  import('@web-vue/components/overflow-list/README.en-US.md');

const docs = [
  {
    name: 'start',
    component: Start,
    componentEn: StartEn,
  },
  {
    name: 'dark',
    component: Dark,
    componentEn: DarkEn,
  },
  {
    name: 'theme',
    component: Theme,
    componentEn: ThemeEn,
  },
  {
    name: 'i18n',
    component: I18n,
    componentEn: I18nEn,
  },
  {
    name: 'changelog',
    component: Changelog,
  },
];

const proDocs = [
  {
    name: 'start',
    component: () => import('./docs/pro/start.zh-CN.md'),
    componentEn: () => import('./docs/pro/start.en-US.md'),
  },
  {
    name: 'npmScripts',
    component: () => import('./docs/pro/npm-scripts.zh-CN.md'),
    componentEn: () => import('./docs/pro/npm-scripts.en-US.md'),
  },
  {
    name: 'directory',
    component: () => import('./docs/pro/directory.zh-CN.md'),
    componentEn: () => import('./docs/pro/directory.en-US.md'),
  },
  {
    name: 'layout',
    component: () => import('./docs/pro/layout.zh-CN.md'),
    componentEn: () => import('./docs/pro/layout.en-US.md'),
  },
  {
    name: 'routesAndMenu',
    component: () => import('./docs/pro/routes-and-menu.zh-CN.md'),
    componentEn: () => import('./docs/pro/routes-and-menu.en-US.md'),
  },
  {
    name: 'permission',
    component: () => import('./docs/pro/permission.zh-CN.md'),
    componentEn: () => import('./docs/pro/permission.en-US.md'),
  },
  {
    name: 'stateManagementPinia',
    component: () => import('./docs/pro/state-management-pinia.zh-CN.md'),
    componentEn: () => import('./docs/pro/state-management-pinia.en-US.md'),
  },
  {
    name: 'stateManagement',
    component: () => import('./docs/pro/state-management.zh-CN.md'),
    componentEn: () => import('./docs/pro/state-management.en-US.md'),
  },
  {
    name: 'i18n',
    component: () => import('./docs/pro/i18n.zh-CN.md'),
    componentEn: () => import('./docs/pro/i18n.en-US.md'),
  },
  {
    name: 'mock',
    component: () => import('./docs/pro/mock.zh-CN.md'),
    componentEn: () => import('./docs/pro/mock.en-US.md'),
  },
  {
    name: 'build',
    component: () => import('./docs/pro/build.zh-CN.md'),
    componentEn: () => import('./docs/pro/build.en-US.md'),
  },
  {
    name: 'faq',
    component: () => import('./docs/pro/faq.zh-CN.md'),
    componentEn: () => import('./docs/pro/faq.en-US.md'),
  },
];

const components = [
  {
    name: 'common',
    list: [
      {
        name: 'button',
        component: Button,
        componentEn: ButtonEn,
      },
      {
        name: 'icon',
        component: Icon,
      },
      {
        name: 'link',
        component: Link,
        componentEn: LinkEn,
      },
      {
        name: 'typography',
        component: Typography,
        componentEn: TypographyEn,
      },
    ],
  },
  {
    name: 'layout',
    list: [
      {
        name: 'divider',
        component: Divider,
        componentEn: DividerEn,
      },
      {
        name: 'grid',
        component: Grid,
        componentEn: GridEn,
      },
      {
        name: 'layout',
        component: Layout,
        componentEn: LayoutEn,
      },
      {
        name: 'space',
        component: Space,
        componentEn: SpaceEn,
      },
    ],
  },
  {
    name: 'dataDisplay',
    list: [
      {
        name: 'avatar',
        component: Avatar,
        componentEn: AvatarEn,
      },
      {
        name: 'badge',
        component: Badge,
        componentEn: BadgeEn,
      },
      {
        name: 'card',
        component: Card,
        componentEn: CardEn,
      },
      {
        name: 'carousel',
        component: Carousel,
        componentEn: CarouselEn,
      },
      {
        name: 'collapse',
        component: Collapse,
        componentEn: CollapseEn,
      },
      {
        name: 'comment',
        component: Comment,
        componentEn: CommentEn,
      },
      {
        name: 'descriptions',
        component: Descriptions,
        componentEn: DescriptionsEn,
      },
      {
        name: 'empty',
        component: Empty,
        componentEn: EmptyEn,
      },
      {
        name: 'image',
        component: Image,
        componentEn: ImageEn,
      },
      {
        name: 'list',
        component: List,
        componentEn: ListEn,
      },
      {
        name: 'popover',
        component: Popover,
        componentEn: PopoverEn,
      },
      {
        name: 'statistic',
        component: Statistic,
        componentEn: StatisticEn,
      },
      {
        name: 'table',
        component: Table,
        componentEn: TableEn,
      },
      {
        name: 'tabs',
        component: Tabs,
        componentEn: TabsEn,
      },
      {
        name: 'tag',
        component: Tag,
        componentEn: TagEn,
      },
      {
        name: 'timeline',
        component: Timeline,
        componentEn: TimelineEn,
      },
      {
        name: 'tooltip',
        component: Tooltip,
        componentEn: TooltipEn,
      },
      {
        name: 'tree',
        component: Tree,
        componentEn: TreeEn,
      },
    ],
  },
  {
    name: 'dataEntry',
    list: [
      {
        name: 'autoComplete',
        component: AutoComplete,
        componentEn: AutoCompleteEn,
      },
      {
        name: 'cascader',
        component: Cascader,
        componentEn: CascaderEn,
      },
      {
        name: 'checkbox',
        component: Checkbox,
        componentEn: CheckboxEn,
      },
      {
        name: 'datePicker',
        component: DatePicker,
        componentEn: DatePickerEn,
      },
      {
        name: 'form',
        component: Form,
        componentEn: FormEn,
      },
      {
        name: 'input',
        component: Input,
        componentEn: InputEn,
      },
      {
        name: 'inputNumber',
        component: InputNumber,
        componentEn: InputNumberEn,
      },
      {
        name: 'inputTag',
        component: InputTag,
        componentEn: InputTagEn,
      },
      {
        name: 'mention',
        component: Mention,
        componentEn: MentionEn,
      },
      {
        name: 'radio',
        component: Radio,
        componentEn: RadioEn,
      },
      {
        name: 'rate',
        component: Rate,
        componentEn: RateEn,
      },
      {
        name: 'select',
        component: Select,
        componentEn: SelectEn,
      },
      {
        name: 'slider',
        component: Slider,
        componentEn: SliderEn,
      },
      {
        name: 'switch',
        component: Switch,
        componentEn: SwitchEn,
      },
      {
        name: 'textarea',
        component: Textarea,
        componentEn: TextareaEn,
      },
      {
        name: 'timePicker',
        component: TimePicker,
        componentEn: TimePickerEn,
      },
      {
        name: 'transfer',
        component: Transfer,
        componentEn: TransferEn,
      },
      {
        name: 'treeSelect',
        component: TreeSelect,
        componentEn: TreeSelectEn,
      },
      {
        name: 'upload',
        component: Upload,
        componentEn: UploadEn,
      },
    ],
  },
  {
    name: 'feedback',
    list: [
      {
        name: 'alert',
        component: Alert,
        componentEn: AlertEn,
      },
      {
        name: 'drawer',
        component: Drawer,
        componentEn: DrawerEn,
      },
      {
        name: 'message',
        component: Message,
        componentEn: MessageEn,
      },
      {
        name: 'modal',
        component: Modal,
        componentEn: ModalEn,
      },
      {
        name: 'notification',
        component: Notification,
        componentEn: NotificationEn,
      },
      {
        name: 'popconfirm',
        component: Popconfirm,
        componentEn: PopconfirmEn,
      },
      {
        name: 'progress',
        component: Progress,
        componentEn: ProgressEn,
      },
      {
        name: 'result',
        component: Result,
        componentEn: ResultEn,
      },
      {
        name: 'spin',
        component: Spin,
        componentEn: SpinEn,
      },
      {
        name: 'skeleton',
        component: Skeleton,
        componentEn: SkeletonEn,
      },
    ],
  },
  {
    name: 'navigation',
    list: [
      {
        name: 'breadcrumb',
        component: Breadcrumb,
        componentEn: BreadcrumbEn,
      },
      {
        name: 'dropdown',
        component: Dropdown,
        componentEn: DropdownEn,
      },
      {
        name: 'menu',
        component: Menu,
        componentEn: MenuEn,
      },
      {
        name: 'pageHeader',
        component: PageHeader,
        componentEn: PageHeaderEn,
      },
      {
        name: 'pagination',
        component: Pagination,
        componentEn: PaginationEn,
      },
      {
        name: 'steps',
        component: Steps,
        componentEn: StepsEn,
      },
    ],
  },
  {
    name: 'other',
    list: [
      {
        name: 'affix',
        component: Affix,
        componentEn: AffixEn,
      },
      {
        name: 'anchor',
        component: Anchor,
        componentEn: AnchorEn,
      },
      {
        name: 'backTop',
        component: BackTop,
        componentEn: BackTopEn,
      },
      {
        name: 'configProvider',
        component: ConfigProvider,
        componentEn: ConfigProviderEn,
      },
      {
        name: 'resizeBox',
        component: ResizeBox,
        componentEn: ResizeBoxEn,
      },
      {
        name: 'trigger',
        component: Trigger,
        componentEn: TriggerEn,
      },
      {
        name: 'split',
        component: Split,
        componentEn: SplitEn,
      },
      {
        name: 'overflow',
        component: OverflowList,
        componentEn: OverflowListEn,
      },
    ],
  },
];

function toKebabCase(string: string) {
  return string.replace(/[A-Z]+/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
  });
}

interface ComponentMenuGroup {
  name: string;
  list: Array<{
    name: string;
    path: string;
  }>;
}

const routes: RouteRecordRaw[] = [];

const docsMenu = [];
for (const item of docs) {
  const path = `/vue/docs/${toKebabCase(item.name)}`;
  routes.push(
    {
      path,
      component: item.component,
    },
    {
      path: `/vue/en-US/docs/${toKebabCase(item.name)}`,
      component: item.componentEn ?? item.component,
    }
  );
  docsMenu.push({
    name: item.name,
    path,
  });
}

const componentMenu: ComponentMenuGroup[] = [];
for (const group of components) {
  const menuGroup: ComponentMenuGroup = {
    name: group.name,
    list: [],
  };
  for (const item of group.list) {
    const path = `/vue/component/${toKebabCase(item.name)}`;
    routes.push(
      {
        path,
        component: item.component,
      },
      {
        path: `/vue/en-US/component/${toKebabCase(item.name)}`,
        component: item.componentEn ?? item.component,
      }
    );
    menuGroup.list.push({
      name: item.name,
      path,
    });
  }
  componentMenu.push(menuGroup);
}

const proDocsMenu: { path: string; name: string }[] = [];
proDocs.forEach((item) => {
  const path = `/vue/docs/pro/${toKebabCase(item.name)}`;
  routes.push(
    {
      path,
      component: item.component,
    },
    {
      path: `/vue/en-US/docs/pro/${toKebabCase(item.name)}`,
      component: item.componentEn ?? item.component,
    }
  );
  proDocsMenu.push({
    name: item.name,
    path,
  });
});

// Add redirects for unmatched routes at the end
routes.push({ path: '/vue/en-US', redirect: '/vue/en-US/docs/start' });
routes.push({ path: '/:pathMatch(.*)*', redirect: '/vue/docs/start' });

nProgress.configure({ minimum: 0.4, showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to the top
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    nProgress.start();
  }
});

router.afterEach(() => {
  nProgress.done();
});

const docsMenuList = [
  {
    name: 'docs',
    menu: docsMenu,
  },
  {
    name: 'proDocs',
    menu: proDocsMenu,
  },
];

export { docsMenu, componentMenu, proDocsMenu, docsMenuList };
export default router;
