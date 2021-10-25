export interface Options {
  language: 'vue' | 'react';
}

export interface I18nData {
  'en-US': string;
  'zh-CN': string;
}

export interface FrontMatterToken {
  type: 'frontMatter';
  raw: string;
  text: string;
  attributes: Record<string, any>;
}

export interface FileImportToken {
  type: 'fileImport';
  raw: string;
  filename: string;
  basename: string;
}

export interface I18nDescriptionToken {
  type: 'i18nDescription';
  raw: string;
  text: string;
  locale: 'zh-CN' | 'en-US';
  content: string;
}
