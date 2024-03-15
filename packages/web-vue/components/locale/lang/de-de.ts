import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Heute',
  view: {
    month: 'Monat',
    year: 'Jahr',
    week: 'Woche',
    day: 'Tag',
  },
  month: {
    long: {
      January: 'Januar',
      February: 'Februar',
      March: 'März',
      April: 'April',
      May: 'Mai',
      June: 'Juni',
      July: 'Juli',
      August: 'August',
      September: 'September',
      October: 'Oktober',
      November: 'November',
      December: 'Dezember',
    },
    short: {
      January: 'Jan',
      February: 'Feb',
      March: 'Mär',
      April: 'Apr',
      May: 'Mai',
      June: 'Jun',
      July: 'Jul',
      August: 'Aug',
      September: 'Sep',
      October: 'Okt',
      November: 'Nov',
      December: 'Dez',
    },
  },
  week: {
    long: {
      self: 'Woche',
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag',
    },
    short: {
      self: 'Woche',
      monday: 'Mo.',
      tuesday: 'Di.',
      wednesday: 'Mi.',
      thursday: 'Do.',
      friday: 'Fr.',
      saturday: 'Sa.',
      sunday: 'So.',
    },
  },
};

const lang: ArcoLang = {
  locale: 'de-DE',
  empty: {
    description: 'Keine Daten',
  },
  drawer: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  popconfirm: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  pagination: {
    goto: 'Gehe zu',
    page: '',
    countPerPage: '/ Seite',
    total: 'Gesamt {0}',
  },
  table: {
    okText: 'OK',
    resetText: 'Zurücksetzen',
  },
  upload: {
    start: 'Anfang',
    cancel: 'Abbrechen',
    delete: 'löschen',
    retry: 'Klicken Sie hier, um es erneut zu versuchen',
    buttonText: 'Zum Hochladen klicken',
    preview: 'Vorschau',
    drag: 'Klicken oder ziehen Sie Dateien, um sie hier hochzuladen',
    dragHover: 'Geben Sie die Datei frei und starten Sie den Upload',
    error: 'Upload fehlgeschlagen',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'Bitte wählen Sie ein Datum',
      week: 'Bitte wählen Sie eine Woche',
      month: 'Bitte wählen Sie einen Monat',
      year: 'Bitte wählen Sie ein Jahr aus',
      quarter: 'Bitte wählen Sie ein Quartal',

      time: 'Zeit auswählen',
    },
    rangePlaceholder: {
      date: ['Startdatum', 'Endtermin'],
      week: ['Woche starten', 'Ende der Woche'],
      month: ['Startmonat', 'Ende Monat'],
      year: ['Startjahr', 'Ende Jahr'],
      quarter: ['Anfangsquartal', 'Ende des Quartals'],
      time: ['Startzeit', 'Endzeit'],
    },
    selectTime: 'Zeit auswählen',
    today: 'Heute',
    now: 'Jetzt',
    ok: 'OK',
  },
  image: {
    loading: 'Wird geladen',
  },
  imagePreview: {
    fullScreen: 'Vollbild',
    rotateRight: 'Nach rechts drehen',
    rotateLeft: 'Nach links drehen',
    zoomIn: 'Vergrößern',
    zoomOut: 'Rauszoomen',
    originalSize: 'Originalgröße',
  },
  typography: {
    copy: 'Kopieren',
    copied: 'Kopiert',
    edit: 'Bearbeiten',
    collapse: 'Falten',
    expand: 'Erweitern',
  },
  colorPicker: {
    history: 'Historische Farben',
    preset: 'Standardfarbe des Systems',
    empty: 'Noch keine',
  },
};

export default lang;
