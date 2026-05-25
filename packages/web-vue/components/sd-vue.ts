import type { App, Plugin } from 'vue';

import type { SDOptions } from './_utils/types';

import { useFormItem } from './_hooks/use-form-item';
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
import ColorPicker from './color-picker';
import Comment from './comment';
import ConfigProvider from './config-provider';
import Copy from './copy';
import Cropper from './cropper';
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
import Dropdown, { Doption, Dgroup, Dsubmenu, DropdownButton } from './dropdown';
import Ellipsis, { PerformantEllipsis } from './ellipsis';
import Empty from './empty';
import Form, { FormItem } from './form';
import Grid, { Row, Col, GridItem } from './grid';
import Icon from './icon-component';
import Image, { ImagePreview, ImagePreviewAction, ImagePreviewGroup } from './image';
import Input, { InputGroup, InputSearch, InputPassword } from './input';
import InputNumber from './input-number';
import InputTag from './input-tag';
import JsonForm from './json-form';
import Layout, { LayoutHeader, LayoutContent, LayoutFooter, LayoutSider } from './layout';
import Link from './link';
import List, { ListItem, ListItemMeta } from './list';
import { addI18nMessages, useLocale, getLocale } from './locale';
import Mention from './mention';
import Menu, { MenuItem, MenuItemGroup, SubMenu } from './menu';
import Message from './message';
import Modal from './modal';
import Notification from './notification';
import OverflowList from './overflow-list';
import PageHeader from './page-header';
import Pagination from './pagination';
import Popconfirm from './popconfirm';
import Popover from './popover';
import Progress from './progress';
import QrCode from './qr-code';
import Radio, { RadioGroup } from './radio';
import Rate from './rate';
import ResizeBox from './resize-box';
import Result from './result';
import Scrollbar from './scrollbar';
import Secret from './secret';
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
import TagGroup from './tag-group';
import Textarea from './textarea';
import ThemeProvider from './theme-provider';
import TimePicker from './time-picker';
import Timeline, { TimelineItem } from './timeline';
import Tooltip from './tooltip';
import Transfer from './transfer';
import Tree from './tree';
import TreeSelect from './tree-select';
import Trigger from './trigger';
import Typography, { TypographyParagraph, TypographyTitle, TypographyText } from './typography';
import Upload from './upload';
import VerificationCode from './verification-code';
import Watermark from './watermark';

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
  ColorPicker,
  Descriptions,
  Copy,
  Cropper,
  Empty,
  Image,
  Scrollbar,
  List,
  Popover,
  Statistic,
  Table,
  Tabs,
  Tag,
  TagGroup,
  Timeline,
  Tooltip,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  JsonForm,
  Input,
  InputNumber,
  InputTag,
  Mention,
  Radio,
  Rate,
  Select,
  Secret,
  Slider,
  Switch,
  Textarea,
  TimePicker,
  Transfer,
  Tree,
  Upload,
  TreeSelect,
  Alert,
  Drawer,
  Message,
  Modal,
  Notification,
  Popconfirm,
  Progress,
  QrCode,
  Result,
  Spin,
  Skeleton,
  Breadcrumb,
  Dropdown,
  Ellipsis,
  PerformantEllipsis,
  Menu,
  PageHeader,
  Pagination,
  Steps,
  Affix,
  Anchor,
  BackTop,
  ConfigProvider,
  ThemeProvider,
  ResizeBox,
  Trigger,
  Split,
  Icon,
  OverflowList,
  Watermark,
  VerificationCode,
};

const install = (app: App, options?: SDOptions) => {
  for (const key of Object.keys(components)) {
    app.use(components[key], options);
  }
};

const SDVue: Record<string, unknown> & {
  install: typeof install;
  addI18nMessages: typeof addI18nMessages;
  useLocale: typeof useLocale;
  getLocale: typeof getLocale;
  useFormItem: typeof useFormItem;
} = {
  ...components,
  // Historical reason
  Alter: Alert,
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
  PerformantEllipsis,
  FormItem,
  JsonForm,
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

export default SDVue;
