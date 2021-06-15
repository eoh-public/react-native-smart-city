import i18n from 'i18n-js';
import { Constants } from '../../configs';

export const initI18n = () => {
  const translations = {
    en: require('./translations/en.json'),
    vi: require('./translations/vi.json'),
  };

  i18n.translations = translations;
  i18n.locale = Constants.LANGUAGE.DEFAULT;
  i18n.fallbacks = true;
};

export const i18nSetLocale = (language) => {
  i18n.locale = language;
};

export default (key, config) => i18n.translate(key, config);
