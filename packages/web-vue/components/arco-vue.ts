import type { App, Plugin } from 'vue';
import type { ArcoOptions } from './_utils/types';
import { addI18nMessages, useLocale, getLocale } from './locale';
import Button from './button';
import Link from './link';
import Typography from './typography';
import Divider from './divider';
import Grid from './grid';
import Layout from './layout';
import Space from './space';
import Avatar from './avatar';
import Badge from './badge';
import Card from './card';
import Carousel from './carousel';
import Collapse from './collapse';
import Comment from './comment';
import Descriptions from './descriptions';
import Empty from './empty';
import Image from './image';
import List from './list';
import Popover from './popover';
import Statistic from './statistic';
import Table from './table';
import Tabs from './tabs';
import Tag from './tag';
import Timeline from './timeline';
import Tooltip from './tooltip';
import AutoComplete from './auto-complete';
import Cascader from './cascader';
import Checkbox from './checkbox';
import DatePicker from './date-picker';
import Form from './form';
import Input from './input';
import InputNumber from './input-number';
import InputTag from './input-tag';
import Mention from './mention';
import Radio from './radio';
import Rate from './rate';
import Select from './select';
import Slider from './slider';
import Switch from './switch';
import Textarea from './textarea';
import TimePicker from './time-picker';
import Transfer from './transfer';
import Tree from './tree';
import Upload from './upload';
import TreeSelect from './tree-select';
import Alter from './alert';
import Drawer from './drawer';
import Message from './message';
import Modal from './modal';
import Notification from './notification';
import Popconfirm from './popconfirm';
import Progress from './progress';
import Result from './result';
import Spin from './spin';
import Skeleton from './skeleton';
import Breadcrumb from './breadcrumb';
import Dropdown from './dropdown';
import Menu from './menu';
import PageHeader from './page-header';
import Pagination from './pagination';
import Steps from './steps';
import Affix from './affix';
import Anchor from './anchor';
import BackTop from './back-top';
import ConfigProvider from './config-provider';
import ResizeBox from './resize-box';
import Trigger from './trigger';
import Split from './split';

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
  Card,
  Carousel,
  Collapse,
  Comment,
  Descriptions,
  Empty,
  Image,
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
  Alter,
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
};

const install = (app: App, options?: ArcoOptions) => {
  for (const key of Object.keys(components)) {
    app.use(components[key], options);
  }
};

const ArcoVue = {
  ...components,
  install,
  addI18nMessages,
  useLocale,
  getLocale,
};

export default ArcoVue;
