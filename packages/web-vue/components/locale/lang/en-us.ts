// @ts-ignore
import { DefaultValidateMessage } from 'b-validate';
import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Today',
  view: {
    month: 'Month',
    year: 'Year',
    week: 'Week',
    day: 'Day',
  },
  month: {
    long: {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December',
    },
    short: {
      January: 'Jan',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'May',
      June: 'Jun',
      July: 'Jul',
      August: 'Aug',
      September: 'Sept',
      October: 'Oct',
      November: 'Nov',
      December: 'Dec',
    },
  },
  week: {
    long: {
      self: 'Week',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    short: {
      self: 'Week',
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    },
  },
};

const lang: ArcoLang = {
  locale: 'en-US',
  empty: {
    description: 'No Data',
  },
  drawer: {
    okText: 'Ok',
    cancelText: 'Cancel',
  },
  popconfirm: {
    okText: 'Ok',
    cancelText: 'Cancel',
  },
  modal: {
    okText: 'Ok',
    cancelText: 'Cancel',
  },
  pagination: {
    goto: 'Goto',
    page: 'Page',
    countPerPage: ' / Page',
    total: 'Total: {0}',
  },
  table: {
    okText: 'Ok',
    resetText: 'Reset',
  },
  upload: {
    start: 'Start',
    cancel: 'Cancel',
    delete: 'Delete',
    retry: 'Click to retry',
    buttonText: 'Upload',
    preview: 'Preview',
    drag: 'Click or drag file to this area to upload',
    dragHover: 'Release to upload',
    error: 'Upload Error',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'Please select date',
      week: 'Please select week',
      month: 'Please select month',
      year: 'Please select year',
      quarter: 'Please select quarter',
      time: 'Please select time',
    },
    rangePlaceholder: {
      date: ['Start date', 'End date'],
      week: ['Start week', 'End week'],
      month: ['Start month', 'End month'],
      year: ['Start year', 'End year'],
      quarter: ['Start quarter', 'End quarter'],
      time: ['Start time', 'End time'],
    },
    selectTime: 'Select time',
    today: 'Today',
    now: 'Now',
    ok: 'Ok',
  },
  image: {
    loading: 'loading',
  },
  imagePreview: {
    fullScreen: 'Full Screen',
    rotateRight: 'Rotate Right',
    rotateLeft: 'Rotate Left',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    originalSize: 'Original Size',
  },
  typography: {
    copied: 'Copied',
    copy: 'Copy',
    expand: 'Expand',
    collapse: 'Collapse',
    edit: 'Edit',
  },
  form: {
    validateMessages: DefaultValidateMessage,
  },
  colorPicker: {
    history: 'History Colors',
    preset: 'Preset Colors',
    empty: 'Empty',
  },
};

export default lang;
