import type { App, Plugin } from 'vue';
import type { ArcoOptions } from './_utils/types';
import { addI18nMessages, useLocale, getLocale } from './locale';
import Affix from './affix';
import Alert from './alert';
import Anchor, { AnchorLink } from './anchor';
import AutoComplete from './auto-complete';
import Avatar, { AvatarGroup } from './avatar';
import BackTop from './back-top';
import Badge from './badge';
import Breadcrumb, { BreadcrumbItem } from './breadcrumb';
import Button, { ButtonGroup } from './button';
import Calendar from './calendar';
import Card, { CardMeta, CardGrid } from './card';
import Carousel, { CarouselItem } from './carousel';
import Cascader, { CascaderPanel } from './cascader';
import Checkbox, { CheckboxGroup } from './checkbox';
import Collapse, { CollapseItem } from './collapse';
import Comment from './comment';
import ConfigProvider from './config-provider';
import DatePicker, {
  WeekPicker,
  MonthPicker,
  YearPicker,
  QuarterPicker,
  RangePicker,
} from './date-picker';
import Descriptions, { DescriptionsItem } from './descriptions';
import Divider from './divider';
import Drawer from './drawer';
import Dropdown, {
  Doption,
  Dgroup,
  Dsubmenu,
  DropdownButton,
} from './dropdown';
import Empty from './empty';
import Form, { FormItem } from './form';
import Grid, { Row, Col, GridItem } from './grid';
import Icon from './icon-component';
import Image, {
  ImagePreview,
  ImagePreviewAction,
  ImagePreviewGroup,
} from './image';
import Input, { InputGroup, InputSearch, InputPassword } from './input';
import InputNumber from './input-number';
import InputTag from './input-tag';
import Layout, {
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
} from './layout';
import Link from './link';
import List, { ListItem, ListItemMeta } from './list';
import Mention from './mention';
import Menu, { MenuItem, MenuItemGroup, SubMenu } from './menu';
import Message from './message';
import Modal from './modal';
import Notification from './notification';
import PageHeader from './page-header';
import Pagination from './pagination';
import Popconfirm from './popconfirm';
import Popover from './popover';
import Progress from './progress';
import Radio, { RadioGroup } from './radio';
import Rate from './rate';
import ResizeBox from './resize-box';
import Result from './result';
import Scrollbar from './scrollbar';
import Select, { Option, Optgroup } from './select';
import Skeleton, { SkeletonLine, SkeletonShape } from './skeleton';
import Slider from './slider';
import Space from './space';
import Spin from './spin';
import Split from './split';
import Statistic, { Countdown } from './statistic';
import Steps, { Step } from './steps';
import Switch from './switch';
import Table, { Thead, Td, Th, Tr, Tbody, TableColumn } from './table';
import Tabs, { TabPane } from './tabs';
import Tag from './tag';
import Textarea from './textarea';
import TimePicker from './time-picker';
import Timeline, { TimelineItem } from './timeline';
import Tooltip from './tooltip';
import Transfer from './transfer';
import Tree from './tree';
import TreeSelect from './tree-select';
import Trigger from './trigger';
import Typography, {
  TypographyParagraph,
  TypographyTitle,
  TypographyText,
} from './typography';
import Upload from './upload';
import OverflowList from './overflow-list';

import { useFormItem } from './_hooks/use-form-item';

const components: Record<string, Plugin> = {
  Button,
  Link,
  Typography,
  Divider,
  Grid,
  Layout,
  Space,
  Avatar,
  Badge,
  Calendar,
  Card,
  Carousel,
  Collapse,
  Comment,
  Descriptions,
  Empty,
  Image,
  Scrollbar,
  List,
  Popover,
  Statistic,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputTag,
  Mention,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Textarea,
  TimePicker,
  Transfer,
  Tree,
  Upload,
  TreeSelect,
  // Historical reason
  Alter: Alert,
  Alert,
  Drawer,
  Message,
  Modal,
  Notification,
  Popconfirm,
  Progress,
  Result,
  Spin,
  Skeleton,
  Breadcrumb,
  Dropdown,
  Menu,
  PageHeader,
  Pagination,
  Steps,
  Affix,
  Anchor,
  BackTop,
  ConfigProvider,
  ResizeBox,
  Trigger,
  Split,
  Icon,
  OverflowList,
};

const install = (app: App, options?: ArcoOptions) => {
  for (const key of Object.keys(components)) {
    app.use(components[key], options);
  }
};

const ArcoVue = {
  ...components,
  AnchorLink,
  AvatarGroup,
  BreadcrumbItem,
  ButtonGroup,
  Calendar,
  CardMeta,
  CardGrid,
  CarouselItem,
  CascaderPanel,
  CheckboxGroup,
  CollapseItem,
  DescriptionsItem,
  WeekPicker,
  MonthPicker,
  YearPicker,
  QuarterPicker,
  RangePicker,
  Doption,
  Dgroup,
  Dsubmenu,
  DropdownButton,
  FormItem,
  Row,
  Col,
  GridItem,
  ImagePreview,
  ImagePreviewAction,
  ImagePreviewGroup,
  InputGroup,
  InputSearch,
  InputPassword,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
  ListItem,
  ListItemMeta,
  MenuItem,
  MenuItemGroup,
  SubMenu,
  RadioGroup,
  Option,
  Optgroup,
  SkeletonLine,
  SkeletonShape,
  Countdown,
  Step,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  TableColumn,
  TabPane,
  TimelineItem,
  TypographyParagraph,
  TypographyTitle,
  TypographyText,
  install,
  addI18nMessages,
  useLocale,
  getLocale,
  useFormItem,
};

export default ArcoVue;
