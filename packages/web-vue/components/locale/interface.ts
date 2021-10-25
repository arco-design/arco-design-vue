export interface ArcoCalendarLang {
  formatYear: string;
  formatMonth: string;
  today: string;
  view: {
    month: string;
    year: string;
    week: string;
    day: string;
  };
  month: {
    long: {
      January: string;
      February: string;
      March: string;
      April: string;
      May: string;
      June: string;
      July: string;
      August: string;
      September: string;
      October: string;
      November: string;
      December: string;
    };
    short: {
      January: string;
      February: string;
      March: string;
      April: string;
      May: string;
      June: string;
      July: string;
      August: string;
      September: string;
      October: string;
      November: string;
      December: string;
    };
  };
  week: {
    long: {
      self: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    short: {
      self: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  };
}

export interface ArcoLang {
  locale: string;
  empty: {
    description: string;
  };
  drawer: {
    okText: string;
    cancelText: string;
  };
  popconfirm: {
    okText: string;
    cancelText: string;
  };
  modal: {
    okText: string;
    cancelText: string;
  };
  pagination: {
    goto: string;
    page: string;
    countPerPage: string;
    total: string;
  };
  table: {
    okText: string;
    resetText: string;
  };
  upload: {
    start: string;
    cancel: string;
    delete: string;
    retry: string;
    buttonText: string;
    preview: string;
    drag: string;
    dragHover: string;
    error: string;
  };
  datePicker: {
    view: ArcoCalendarLang['view'];
    month: ArcoCalendarLang['month'];
    week: ArcoCalendarLang['week'];
    placeholder: {
      date: string;
      week: string;
      month: string;
      year: string;
      quarter: string;
      time: string;
    };
    rangePlaceholder: {
      date: [string, string];
      week: [string, string];
      month: [string, string];
      year: [string, string];
      quarter: [string, string];
      time: [string, string];
    };
    selectTime: string;
    today: string;
    now: string;
    ok: string;
  };
  image: {
    loading: string;
  };
  imagePreview: {
    fullScreen: string;
    rotateRight: string;
    rotateLeft: string;
    zoomIn: string;
    zoomOut: string;
    originalSize: string;
  };
  typography: {
    copied: string;
    copy: string;
    expand: string;
    collapse: string;
    edit: string;
  };
}

export type ArcoI18nMessages = Record<string, ArcoLang>;
