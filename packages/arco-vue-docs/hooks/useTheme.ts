import { ref } from 'vue';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

export const useTheme = () => {
  const localTheme = getLocalStorage('vue-site::theme');
  const theme = ref(localTheme ?? 'light');

  const handleThemeChange = (_theme: string) => {
    if (_theme !== theme.value) {
      theme.value = _theme;
      if (_theme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        document.body.removeAttribute('arco-theme');
      }
      setLocalStorage('vue-site::theme', _theme);
    }
  };

  return {
    theme,
    handleThemeChange,
  };
};
