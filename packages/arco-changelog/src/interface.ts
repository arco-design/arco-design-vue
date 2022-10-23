import { AxiosRequestConfig } from 'axios';

export interface ChangelogConfig {
  repo: string;
  merged?: boolean;
  requestConfig?: (config: {
    repo: string;
    version: string;
    merged: boolean;
  }) => AxiosRequestConfig;
  emitFiles?: (changelog: Changelog) => EmitFile[];
  typeDict?: Record<string, string>;
  type?: 'github' | 'gitlab';
  arcoComponent?: 'react' | 'vue';
  keyDict?: Record<string, string>;
  filename?: { zh: string; en: string };
}

export interface PullRequest {
  id: number;
  url: string;
}

export interface ChangelogData {
  type: string;
  pr: PullRequest;
  issues?: string[];

  [key: string]: any;
}

export interface Changelog {
  version: string;
  date: string;
  list: ChangelogData[];
}

export interface EmitFile {
  file: string;
  template: string;
  data: Record<string, any>;
}
