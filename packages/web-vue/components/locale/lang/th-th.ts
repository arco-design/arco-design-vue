import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'วันนี้',
  view: {
    month: 'เดือน',
    year: 'ปี',
    week: 'สัปดาห์',
    day: 'วัน',
  },
  month: {
    long: {
      January: 'มกราคม',
      February: 'กุมภาพันธ์',
      March: 'มีนาคม',
      April: 'เมษายน',
      May: 'อาจ',
      June: 'มิถุนายน',
      July: 'กรกฎาคม',
      August: 'สิงหาคม',
      September: 'กันยายน',
      October: 'ตุลาคม',
      November: 'พฤศจิกายน',
      December: 'ธันวาคม',
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
      self: 'สัปดาห์',
      monday: 'วันจันทร์',
      tuesday: 'วันอังคาร',
      wednesday: 'วันพุธ',
      thursday: 'วันพฤหัสบดี',
      friday: 'วันศุกร์',
      saturday: 'วันเสาร์',
      sunday: 'วันอาทิตย์',
    },
    short: {
      self: 'สัปดาห์',
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
  locale: 'th-TH',
  empty: {
    description: 'ไม่มีข้อมูล',
  },
  drawer: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
  },
  popconfirm: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
  },
  modal: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
  },
  pagination: {
    goto: 'ไปที่',
    page: 'หน้า',
    countPerPage: ' / หน้า',
    total: 'รวม: {0}',
  },
  table: {
    okText: 'ตกลง',
    resetText: 'รีเซ็ต',
  },
  upload: {
    start: 'เริ่ม',
    cancel: 'ยกเลิก',
    delete: 'ลบ',
    retry: 'คลิกเพื่อลองอีกครั้ง',
    buttonText: 'ที่อัพโหลด',
    preview: 'ดูตัวอย่าง',
    drag: 'คลิกหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด',
    dragHover: 'ปล่อยเพื่ออัปโหลด',
    error: 'ข้อผิดพลาดในการอัปโหลด',
  },
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'โปรดเลือกวันที่',
      week: 'โปรดเลือกสัปดาห์',
      month: 'โปรดเลือกเดือน',
      year: 'โปรดเลือกปี',
      quarter: 'โปรดเลือกไตรมาส',
      time: 'เลือกเวลา',
    },
    rangePlaceholder: {
      date: ['วันที่เริ่มต้น', 'วันที่สิ้นสุด'],
      week: ['เริ่มต้นสัปดาห์', 'สิ้นสุดสัปดาห์'],
      month: ['เริ่มเดือน', 'สิ้นเดือน'],
      year: ['เริ่มต้นปี', 'สิ้นปี'],
      quarter: ['เริ่มไตรมาส', 'สิ้นไตรมาส'],
      time: ['เวลาเริ่มต้น', 'เวลาสิ้นสุด'],
    },
    selectTime: 'เลือกเวลา',
    today: 'วันนี้',
    now: 'ตอนนี้',
    ok: 'ตกลง',
  },
  image: {
    loading: 'กำลังโหลด',
  },
  imagePreview: {
    fullScreen: 'เต็มจอ',
    rotateRight: 'หมุนไปทางขวา',
    rotateLeft: 'หมุนซ้าย',
    zoomIn: 'ขยายเข้า',
    zoomOut: 'ซูมออก',
    originalSize: 'ขนาดต้นฉบับ',
  },
  typography: {
    copy: 'สำเนา',
    copied: 'คัดลอกแล้ว',
    edit: 'แก้ไข',
    collapse: 'พับ',
    expand: 'แฉ',
  },
};

export default lang;
