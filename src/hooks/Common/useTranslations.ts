import {
  getTranslate,
  InterPolateString,
  Language,
  TranslationString,
} from '../../utils/I18n';
import { useCallback } from 'react';
import { useSCContextSelector } from '../../context';

// eslint-disable-next-line react-hooks/rules-of-hooks
const lang = useSCContextSelector((state) => state.language);

const language: Language = lang as Language;

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
