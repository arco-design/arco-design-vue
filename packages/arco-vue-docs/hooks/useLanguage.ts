import { ref } from 'vue';
// import Locale from '@arco-design/web-vue/es/locale';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

export const useLanguage = () => {
  const localLanguage = getLocalStorage('vue-site::lang');
  const language = ref(localLanguage ?? 'zh-CN');

  const handleLanguageChange = (_language: string) => {
    if (
      ['zh-CN', 'en-US'].includes(_language) &&
      _language !== language.value
    ) {
      language.value = _language;
      // Locale.use(_language);
      // if (language === 'zh-CN') {
      //   router.push(route.path.replace('/en-US', ''));
      // } else {
      //   router.push(`/en-US${route.path}`);
      // }

      setLocalStorage('vue-site::lang', _language);
    }
  };

  return {
    language,
    handleLanguageChange,
  };
};
