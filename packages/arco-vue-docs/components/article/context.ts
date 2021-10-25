import { InjectionKey } from 'vue';
import { AnchorData } from '../aside-anchor/interface';

interface ArticleContext {
  anchors: AnchorData[];
  addAnchor: (data: AnchorData) => void;
  removeAnchor: (href: string) => void;
}

export const articleInjectionKey: InjectionKey<ArticleContext> =
  Symbol('ArcoArticle');
