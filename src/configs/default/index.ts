import { IConfig, ISupportedLocales } from '@/typings'
import { LOCALE_LANGUAGE } from '@/configs'
import checkLanguage from '@/utils/checkLanguage'
import {
  detect,
  fromUrl,
  fromStorage,
  fromNavigator,
} from '@lingui/detect-locale'

const language = detect(
  checkLanguage(fromUrl('lang')),
  checkLanguage(fromStorage(LOCALE_LANGUAGE)),
  checkLanguage(fromNavigator()),
  'zh'
)

export const config: IConfig = {
  title: 'React Seed',
  logo: 'logo.svg',
  copyright: 'Ant Design Admin  © 2018 zuiidea',
  language: language as ISupportedLocales,

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/\/login/],
    },
  ],
}
