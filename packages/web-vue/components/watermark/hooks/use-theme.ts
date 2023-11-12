import { Ref, ref } from 'vue';
import { useMutationObserver } from './use-mutation-observer';

const THEME_TOKEN = 'arco-theme';
const Theme = {
  Dark: 'dark' as const,
  Light: 'light' as const,
};

export const useTheme = (callback?: () => void) => {
  const theme: Ref<typeof Theme[keyof typeof Theme]> = ref(Theme.Light);

  const setTheme = (value: typeof Theme[keyof typeof Theme]) => {
    theme.value = value;
  };

  const getTheme = (element: HTMLElement) => {
    return element.getAttribute(THEME_TOKEN) === Theme.Dark
      ? Theme.Dark
      : Theme.Light;
  };

  useMutationObserver(
    document.body,
    (mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === THEME_TOKEN
        ) {
          setTheme(getTheme(mutation.target as HTMLElement));
          callback?.();
          break;
        }
      }
    },
    {
      attributes: true,
      attributeFilter: [THEME_TOKEN],
      subtree: false,
      childList: false,
      characterData: false,
    }
  );

  setTheme(getTheme(document.body));

  return {
    theme,
    setTheme,
  };
};
