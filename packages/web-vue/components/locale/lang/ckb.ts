// @ts-ignore
import { DefaultValidateMessage } from 'b-validate';
import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'ئەمڕۆ',
  view: {
    month: 'مانگ',
    year: 'ساڵ',
    week: 'هەفتە',
    day: 'ڕۆژ',
  },
  month: {
      long: {
      January: 'ڕێبەندان',
      February: 'ڕەشەمێ',
      March: 'نەورۆز',
      April: 'گوڵان',
      May: 'جۆزەردان',
      June: 'پووشپەڕ',
      July: 'گەلاوێژ',
      August: 'خەرمانان',
      September: 'ڕەزبەر',
      October: 'گەڵاڕێزان',
      November: 'سەرماوەز',
      December: 'بەفرانبار',
    },
    short: {
      January: 'ڕێ',
      February: 'ڕەش',
      March: 'نەورۆز',
      April: 'گوڵ',
      May: 'جۆ',
      June: 'پووش',
      July: 'گەل',
      August: 'خەرمان',
      September: 'ڕەز',
      October: 'گەڵا',
      November: 'سەرما',
      December: 'بەفر',
    },
  },
  week: {
    long: {
      self: 'هەفتە',
      monday: 'دووشەممە',
      tuesday: 'سێشەممە',
      wednesday: 'چوارشەممە',
      thursday: 'پێنجشەممە',
      friday: 'هەینی',
      saturday: 'شەممە',
      sunday: 'یەکشەممە',
    },
    short: {
      self: 'هەفتە',
      monday: 'دوو',
      tuesday: 'سێ',
      wednesday: 'چوار',
      thursday: 'پێنج',
      friday: 'هەینی',
      saturday: 'شەممە',
      sunday: 'یەک',
    },
  },
};

const lang: ArcoLang = {
  locale: 'ckb',
  empty: {
    description: 'هیچ زانیارییەک نییە',
  },
  drawer: {
    okText: 'باشە',
    cancelText: 'پاشگەزبوونەوە',
  },
  popconfirm: {
    okText: 'باشە',
    cancelText: 'پاشگەزبوونەوە',
  },
  modal: {
    okText: 'باشە',
    cancelText: 'پاشگەزبوونەوە',
  },
  pagination: {
    goto: 'بڕۆ بۆ',
    page: 'پەڕە',
    countPerPage: ' / پەڕە',
    total: 'کۆی گشتی: {0}',
  },
  table: {
    okText: 'باشە',
    resetText: 'ڕێکخستنەوە',
  },
  upload: {
    start: 'دەستپێکردن',
    cancel: 'پاشگەزبوونەوە',
    delete: 'سڕینەوە',
    retry: 'کرتە بکە بۆ دووبارە هەوڵدانەوە',
    buttonText: 'بارکردن',
    preview: 'پێشبینین',
    drag: 'کرتە بکە یان پەڕگەەکە ڕابکێشە بۆ ئێرە بۆ بارکردن',
    dragHover: 'بەری بدە بۆ بارکردن',
    error: 'هەڵە لە بارکردن',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'تکایە بەروار هەڵبژێرە',
      week: 'تکایە هەفتە هەڵبژێرە',
      month: 'تکایە مانگ هەڵبژێرە',
      year: 'تکایە ساڵ هەڵبژێرە',
      quarter: 'تکایە چارەک هەڵبژێرە',
      time: 'تکایە کات هەڵبژێرە',
    },
    rangePlaceholder: {
      date: ['بەرواری دەستپێکردن', 'بەرواری کۆتایی'],
      week: ['هەفتەی دەستپێکردن', 'هەفتەی کۆتایی'],
      month: ['مانگی دەستپێکردن', 'مانگی کۆتایی'],
      year: ['ساڵی دەستپێکردن', 'ساڵی کۆتایی'],
      quarter: ['چارەکی دەستپێکردن', 'چارەکی کۆتایی'],
      time: ['کاتی دەستپێکردن', 'کاتی کۆتایی'],
    },
    selectTime: 'کات هەڵبژێرە',
    today: 'ئەمڕۆ',
    now: 'ئێستا',
    ok: 'باشە',
  },
  image: {
    loading: 'بار دەکرێت',
  },
  imagePreview: {
    fullScreen: 'پڕاوپڕی شاشە',
    rotateRight: 'سوڕاندن بۆ ڕاست',
    rotateLeft: 'سوڕاندن بۆ چەپ',
    zoomIn: 'گەورەکردن',
    zoomOut: 'بچووککردنەوە',
    originalSize: 'قەبارەی ڕەسەن',
  },
  typography: {
    copied: 'لەبەرگیرایەوە',
    copy: 'لەبەریبگرەوە',
    expand: 'فراوانکردن',
    collapse: 'کۆکردنەوە',
    edit: 'دەستکاری',
  },
  form: {
    validateMessages: DefaultValidateMessage,
  },
  colorPicker: {
    history: 'ڕەنگەکانی پێشوو',
    preset: 'ڕەنگە ئامادەکراوەکان',
    empty: 'بەتاڵ',
  },
};

export default lang;
