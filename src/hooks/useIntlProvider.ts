import { useEffect, useContext, useState } from 'react';
import { setupI18n } from '@lingui/core';
import { LOCALE_LANGUAGE } from '@/configs/constants';
import { ConfigContext } from '@/utils/context';
import { useLocalStorage } from '@/hooks';
import { antdI18nMap } from '@/configs';
import { SupportedLocales } from '@/typings';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import { en, zh } from 'make-plural/plurals';

export const i18n = setupI18n({
  localeData: {
    en: { plurals: en },
    zh: { plurals: zh },
  },
});

const useIntlProvider = () => {
  const { language: defaultLocale } = useContext(ConfigContext);
  const [language, setLanguage] = useLocalStorage<SupportedLocales>(
    LOCALE_LANGUAGE,
    defaultLocale
  );

  const [locale, setLocale] = useState<ConfigProviderProps['locale']>();

  useEffect(() => {
    import(`@/locales/${language}/messages.json`).then(data => {
      i18n.load(language, data.default);
      i18n.activate(language);
    });

    const path = antdI18nMap[language];
    import(`antd/lib/locale/${path}.js`).then(data => {
      setLocale(data.default);
    });
  }, [language]);

  return {
    language,
    setLanguage,
    locale,
    i18n,
  };
};

export default useIntlProvider;
