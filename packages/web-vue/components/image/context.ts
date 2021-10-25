import { InjectionKey } from 'vue';

export type PreviewGroupContext = Readonly<{
  registerImageUrl: (
    id: number,
    url: string,
    canPreview: boolean
  ) => () => void;
  preview: (imageId: number) => void;
}>;

export const PreviewGroupInjectionKey: InjectionKey<PreviewGroupContext> =
  Symbol('PreviewGroupInjectionKey');
