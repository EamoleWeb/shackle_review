import memoize from 'lodash/memoize';
import * as RNLocalize from 'react-native-localize';

import i18n from 'i18n-js';

const translationGetters = {
  en: () => require('./en.json')
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  const fallback = { languageTag: 'en' };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  translate.cache.clear();

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

export { translate, setI18nConfig };