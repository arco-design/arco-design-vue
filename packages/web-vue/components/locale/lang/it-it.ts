import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Oggi',
  view: {
    month: 'Mese',
    year: 'Anno',
    week: 'Settimana',
    day: 'Giorno',
  },
  month: {
    long: {
      January: 'Gennaio',
      February: 'Febbraio',
      March: 'Marzo',
      April: 'Aprile',
      May: 'Maggio',
      June: 'Giugno',
      July: 'Luglio',
      August: 'Agosto',
      September: 'Settembre',
      October: 'Ottobre',
      November: 'Novembre',
      December: 'Dicembre',
    },
    short: {
      January: 'Gen',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'Mag',
      June: 'Giu',
      July: 'Lug',
      August: 'Ago',
      September: 'Set',
      October: 'Ott',
      November: 'Nov',
      December: 'Dic',
    },
  },
  week: {
    long: {
      self: 'Settimana',
      monday: 'Lunedì',
      tuesday: 'Martedì',
      wednesday: 'Mercoledì',
      thursday: 'Giovedì',
      friday: 'Venerdì',
      saturday: 'Sabato',
      sunday: 'Domenica',
    },
    short: {
      self: 'Settimana',
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mer',
      thursday: 'Gio',
      friday: 'Ven',
      saturday: 'Sab',
      sunday: 'Dom',
    },
  },
};

const lang: ArcoLang = {
  locale: 'it-IT',
  empty: {
    description: 'Nessun dato',
  },
  drawer: {
    okText: 'OK',
    cancelText: 'Annulla',
  },
  popconfirm: {
    okText: 'OK',
    cancelText: 'Annulla',
  },
  modal: {
    okText: 'OK',
    cancelText: 'Annulla',
  },
  pagination: {
    goto: 'vai a',
    page: '',
    countPerPage: '/ pagina',
    total: 'Totale {0}',
  },
  table: {
    okText: 'OK',
    resetText: 'Ripristina',
  },
  upload: {
    start: 'Inizio',
    cancel: 'Annulla',
    delete: 'Elimina',
    retry: 'Fare clic per riprovare',
    buttonText: 'Fare clic per caricare',
    preview: 'Anteprima',
    drag: 'Fare clic o trascinare i file da caricare qui',
    dragHover: 'Libera il file e inizia a caricare',
    error: 'Caricamento non riuscito',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'Seleziona una data',
      week: 'Seleziona la settimana',
      month: 'Seleziona un mese',
      year: 'Seleziona un anno',
      quarter: 'Selezionare il trimestre',
      time: 'Seleziona un orario',
    },
    rangePlaceholder: {
      date: ['Data di inizio', 'Data di fine'],
      week: ['Settimana di inizio', 'Settimana di fine'],
      month: ['Mese di inizio', 'Mese di fine'],
      year: ['Anno di inizio', 'Anno di fine'],
      quarter: ['Trimestre di inizio', 'Trimestre di fine'],

      time: ['Orario di inizio', 'Orario di chiusura'],
    },
    selectTime: 'Seleziona un orario',
    today: 'Oggi',
    now: 'Ora',
    ok: 'OK',
  },
  image: {
    loading: 'Caricamento in corso',
  },
  imagePreview: {
    fullScreen: 'A schermo intero',
    rotateRight: 'Ruota a destra',
    rotateLeft: 'Ruotare a sinistra',
    zoomIn: 'Ingrandire',
    zoomOut: 'Rimpicciolire',
    originalSize: 'Misura originale',
  },
  typography: {
    copy: 'Copia',
    copied: 'Copia effettuata',
    edit: 'Modifica',
    collapse: 'Piega',
    expand: 'Espandi',
  },
  colorPicker: {
    history: 'Colori storici',
    preset: 'Colori preimpostati dal sistema',
    empty: 'Nessun dato',
  },
};

export default lang;
