import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Hari ini',
  view: {
    month: 'Bulan',
    year: 'Tahun',
    week: 'Minggu',
    day: 'Hari',
  },
  month: {
    long: {
      January: 'Januari',
      February: 'Februari',
      March: 'Maret',
      April: 'April',
      May: 'Mungkin',
      June: 'Juni',
      July: 'Juli',
      August: 'Agustus',
      September: 'September',
      October: 'Oktober',
      November: 'November',
      December: 'Desember',
    },
    short: {
      January: 'Jan',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'Mungkin',
      June: 'Jun',
      July: 'Jul',
      August: 'Agu',
      September: 'Sept',
      October: 'Okt',
      November: 'Nov',
      December: 'Des',
    },
  },
  week: {
    long: {
      self: 'Minggu',
      monday: 'Senin',
      tuesday: 'Selasa',
      wednesday: 'Rabu',
      thursday: 'Kamis',
      friday: 'Jumat',
      saturday: 'Sabtu',
      sunday: 'Minggu',
    },
    short: {
      self: 'Minggu',
      monday: 'Sen',
      tuesday: 'Sel',
      wednesday: 'Rab',
      thursday: 'Kam',
      friday: 'Jum',
      saturday: 'Sab',
      sunday: 'Min',
    },
  },
};

const lang: ArcoLang = {
  locale: 'id-ID',
  empty: {
    description: 'Tidak ada data',
  },
  drawer: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  popconfirm: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  modal: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  pagination: {
    goto: 'Pergi ke',
    page: 'Halaman',
    countPerPage: ' / Halaman',
    total: 'Total: {0}',
  },
  table: {
    okText: 'Baik',
    resetText: 'Setel ulang',
  },
  upload: {
    start: 'Mulailah',
    cancel: 'Membatalkan',
    delete: 'Menghapus',
    retry: 'Klik untuk mencoba lagi',
    buttonText: 'Unggah',
    preview: 'Pratinjau',
    drag: 'Klik atau seret file ke area ini untuk diunggah',
    dragHover: 'Lepaskan untuk mengupload',
    error: 'Kesalahan Unggahan',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'Silakan pilih tanggal',
      week: 'Silakan pilih minggu',
      month: 'Silakan pilih bulan',
      year: 'Silakan pilih tahun',
      quarter: 'Silakan pilih perempat',
      time: 'Pilih waktu',
    },
    rangePlaceholder: {
      date: ['Mulai tanggal', 'Tanggal berakhir'],
      week: ['Mulailah minggu', 'Akhir minggu'],
      month: ['Mulai bulan', 'Akhir bulan'],
      year: ['Awal tahun', 'Akhir tahun'],
      quarter: ['Mulai kuartal', 'Seperempat akhir'],
      time: ['Waktu mulai', 'Akhir waktu'],
    },

    selectTime: 'Pilih waktu',
    today: 'Hari ini',
    now: 'Sekarang',
    ok: 'Baik',
  },
  image: {
    loading: 'Memuat',
  },
  imagePreview: {
    fullScreen: 'Layar penuh',
    rotateRight: 'Putar ke kanan',
    rotateLeft: 'Putar ke kiri',
    zoomIn: 'Perbesar',
    zoomOut: 'Perkecil',
    originalSize: 'Ukuran asli',
  },
  typography: {
    copy: 'Salinan',
    copied: 'Disalin',
    edit: 'Sunting',
    collapse: 'Melipat',
    expand: 'Membuka',
  },
  colorPicker: {
    history: 'Warna sejarah',
    preset: 'Sistem preset warna',
    empty: 'Tidak ada data',
  },
};

export default lang;
