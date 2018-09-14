module.exports = {
  siteName: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  copyright: 'Ant Design Admin  © 2018 zuiidea',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  openPages: ['/login'],
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],
}
