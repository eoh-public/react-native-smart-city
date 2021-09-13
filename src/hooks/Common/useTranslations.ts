import {
  getTranslate,
  InterPolateString,
  Language,
  TranslationString,
} from '../../utils/I18n';
import { useCallback } from 'react';

const language: Language = 'en'; //can get from the app setting, currently for POC only

export const useTranslations = () => {
  const t = useCallback(
    (translations: TranslationString, interpolateStr?: InterPolateString) =>
      getTranslate(language, translations, interpolateStr),
    []
  );

  return t;
};

const t = (text) => getTranslate(language, text);

export default t;
