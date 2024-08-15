import { ArcoCalendarLang, ArcoLang } from '../interface';

const calendarLang: ArcoCalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MM/YYYY',
  today: "Aujourd'hui",
  view: {
    month: 'Mois',
    year: 'Année',
    week: 'Semaine',
    day: 'Date',
  },
  month: {
    long: {
      January: 'Janvier',
      February: 'Février',
      March: 'Mars',
      April: 'Avril',
      May: 'Mai',
      June: 'Juin',
      July: 'Juillet',
      August: 'Août',
      September: 'Septembre',
      October: 'Octobre',
      November: 'Novembre',
      December: 'Décembre',
    },
    short: {
      January: 'Jan',
      February: 'Fév',
      March: 'Mar',
      April: 'Avr',
      May: 'Mai',
      June: 'Jun',
      July: 'Jul',
      August: 'Aoû',
      September: 'Sep',
      October: 'Oct',
      November: 'Nov',
      December: 'Déc',
    },
  },
  week: {
    long: {
      self: 'Week',
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
    },
    short: {
      self: 'Week',
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mer',
      thursday: 'Jeu',
      friday: 'Ven',
      saturday: 'Sam',
      sunday: 'Dim',
    },
  },
};

const lang: ArcoLang = {
  locale: 'fr-FR',
  empty: {
    description: 'Aucune donnée',
  },
  drawer: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  modal: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  pagination: {
    goto: 'Aller à',
    page: 'Page',
    countPerPage: '/ page',
    total: 'Total {0}',
  },
  table: {
    okText: 'OK',
    resetText: 'Réinitialiser',
  },
  upload: {
    start: 'Démarrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    retry: 'Cliquez pour réessayer',
    buttonText: 'Cliquez pour télécharger',
    preview: 'Aperçu',
    drag: 'Cliquez ou faites glisser les fichiers à télécharger ici',
    dragHover: 'Libérez le fichier et commencez à télécharger',
    error: 'le téléchargement a échoué',
  },
  calendar: calendarLang,
  datePicker: {
    view: calendarLang.view,
    month: calendarLang.month,
    week: calendarLang.week,
    placeholder: {
      date: 'Sélectionner une date',
      week: 'Sélectionner une semaine',
      month: 'Sélectionner un mois',
      year: 'Sélectionner une année',
      quarter: 'Sélectionner un trimestre',

      time: "Sélectionner l'heure",
    },
    rangePlaceholder: {
      date: ['Date de début', 'Date de fin'],
      week: ['Semaine de début', 'Semaine de fin'],
      month: ['Mois de début', 'Mois de fin'],
      year: ['Année de début', 'Année de fin'],
      quarter: ['Trimestre de début', 'Trimestre de fin'],

      time: ['Heure de début', 'Heure de fin'],
    },
    selectTime: "Sélectionner l'heure",
    today: "Aujourd'hui",
    now: 'Maintenant',
    ok: 'OK',
  },
  image: {
    loading: 'Chargement en cours',
  },
  imagePreview: {
    fullScreen: 'Plein écran',
    rotateRight: 'Tourner à droite',
    rotateLeft: 'Tourner vers la gauche',
    zoomIn: 'Agrandir',
    zoomOut: 'Dézoomer',
    originalSize: 'Format original',
  },
  typography: {
    copy: 'Copier',
    copied: 'Copie effectuée',
    edit: 'Éditer',
    collapse: 'Plier',
    expand: 'Étendre',
  },
  colorPicker: {
    history: 'Couleurs historiques',
    preset: 'Couleurs prédéfinies par le système',
    empty: 'Aucune donnée',
  },
};

export default lang;
