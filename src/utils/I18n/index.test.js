import { i18nSetLocale } from './index';
import i18n from 'i18n-js';

test('test setLocale', () => {
  i18nSetLocale('test');
  expect(i18n.locale).toBe('test');
});
