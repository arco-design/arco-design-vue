import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY 年',
  formatMonth: 'YYYY 年 MM 月',
  today: '今天',
  view: {
    month: '月',
    year: '年',
    week: '周',
    day: '日',
  },
  month: {
    long: {
      January: '一月',
      February: '二月',
      March: '三月',
      April: '四月',
      May: '五月',
      June: '六月',
      July: '七月',
      August: '八月',
      September: '九月',
      October: '十月',
      November: '十一月',
      December: '十二月',
    },
    short: {
      January: '一月',
      February: '二月',
      March: '三月',
      April: '四月',
      May: '五月',
      June: '六月',
      July: '七月',
      August: '八月',
      September: '九月',
      October: '十月',
      November: '十一月',
      December: '十二月',
    },
  },
  week: {
    long: {
      self: '周',
      monday: '周一',
      tuesday: '周二',
      wednesday: '周三',
      thursday: '周四',
      friday: '周五',
      saturday: '周六',
      sunday: '周日',
    },
    short: {
      self: '周',
      monday: '一',
      tuesday: '二',
      wednesday: '三',
      thursday: '四',
      friday: '五',
      saturday: '六',
      sunday: '日',
    },
  },
};

const lang: ArcoLang = {
  locale: 'zh-TW',
  empty: {
    description: '無資料',
  },
  drawer: {
    okText: '確認',
    cancelText: '取消',
  },
  popconfirm: {
    okText: '確認',
    cancelText: '取消',
  },
  modal: {
    okText: '確認',
    cancelText: '取消',
  },
  pagination: {
    goto: '前往',
    page: '頁',
    countPerPage: '項/頁',
    total: '共 {0} 項',
  },
  table: {
    okText: '確認',
    resetText: '重置',
  },
  upload: {
    start: '開始',
    cancel: '取消',
    delete: '删除',
    retry: '點擊重試',
    buttonText: '點擊上傳',
    preview: '預覽',
    drag: '點擊或拖拽文件到此處上傳',
    dragHover: '釋放文件並開始上傳',
    error: '上傳失敗',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: '請選擇日期',
      week: '請選擇周',
      month: '請選擇月份',
      year: '請選擇年份',
      quarter: '請選擇季度',
      time: '請選擇時間',
    },
    rangePlaceholder: {
      date: ['開始日期', '結束日期'],
      week: ['開始周', '結束周'],
      month: ['開始月份', '結束月份'],
      year: ['開始年份', '結束年份'],
      quarter: ['開始季度', '結束季度'],
      time: ['開始時間', '結束時間'],
    },
    selectTime: '選擇時間',
    today: '今天',
    now: '此刻',
    ok: '確認',
  },
  image: {
    loading: '載入中',
  },
  imagePreview: {
    fullScreen: '全屏',
    rotateRight: '向右旋轉',
    rotateLeft: '向左旋轉',
    zoomIn: '放大',
    zoomOut: '縮小',
    originalSize: '原始尺寸',
  },
  typography: {
    copied: '已複製',
    copy: '複製',
    expand: '展開',
    collapse: '折疊',
    edit: '編輯',
  },
};

export default lang;
