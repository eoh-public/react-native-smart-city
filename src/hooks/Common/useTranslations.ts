import {
  getTranslate,
  InterPolateString,
  Language,
  TranslationString,
} from '../../utils/I18n';
import { useCallback } from 'react';
import { useSCContextSelector } from '../../context';
import { getConfigGlobalState } from '../../iot/states.js';

export const useTranslations = () => {
  const lang = useSCContextSelector((state) => state.language);

  const language: Language = lang as Language;

  const t = useCallback(
    (translations: TranslationString, interpolateStr?: InterPolateString) =>
      getTranslate(language, translations, interpolateStr),
    [language]
  );

  return t;
};

const t = (
  translations: TranslationString,
  interpolateStr?: InterPolateString
) => {
  const lang = getConfigGlobalState('lang');
  const language: Language = lang as Language;
  return getTranslate(language, translations, interpolateStr);
};

export default t;
