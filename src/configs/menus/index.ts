import { t } from '@lingui/macro'

/*
 * Note:
 * Menu items with children need to set a key starting with "/"
 * @see https://github.com/umijs/route-utils/blob/master/src/transformRoute/transformRoute.ts#L219
 */

const menus = [
  {
    path: '/',
    name: t`主页`,
    icon: 'home',
  },
  {
    name: t`其他`,
    key: '/other',
    icon: 'other',
    children: [
      {
        path: '/hello',
        name: t`你好 (useRedux)`,
      },
      {
        path: '/user',
        name: t`用户 (useRequest)`,
      },
      {
        path: '/i18n',
        name: t`国际化 (useLingui)`,
      },
      {
        path: '/simple',
        name: t`国际化 (Elint插件)`,
      },
      {
        path: '/simple2',
        name: t`未定义页面`,
      },
    ],
  },
]

export default menus
