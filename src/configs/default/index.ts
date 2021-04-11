import { IConfig, ISupportedLocales } from '@/typings'
import { LOCALE_LANGUAGE } from '@/configs/constants'
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
  'en'
)

export const config: IConfig = {
  title: 'Antd Admin',
  logo: 'logo.svg',
  copyright: 'Ant Design Admin  © 2021 zuiidea',
  language: language as ISupportedLocales,
  apiPrefix: '/api/v1',

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/\/login/],
    },
  ],
}
