import MessageFormat from '@messageformat/core';

import en from './translations/en.json';
import vi from './translations/vi.json';

export type TranslationString = keyof typeof en;
export type Language = 'en' | 'vi';

const res = {
  en,
  vi,
};
export type InterPolateString = {
  [name: string]: string;
};

const formatMess = new MessageFormat('en');

const formatMessage = (message: string, interpolateStr: InterPolateString) => {
  try {
    const compiledMsg = formatMess.compile(message);
    return compiledMsg(interpolateStr);
  } catch {
    return message;
  }
};

export const getTranslate = (
  language: Language,
  key: TranslationString,
  interpolateStr?: InterPolateString
) => {
  // @ts-ignore
  if (!res[language][key]) {
    return key;
  }

  if (!interpolateStr) {
    // @ts-ignore
    return res[language][key];
  }

  // @ts-ignore
  return formatMessage(res[language][key], interpolateStr);
};
