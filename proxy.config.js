const mock = {}

require('fs').readdirSync(require('path').join(`${__dirname}/mock`)).forEach((file) => {
  Object.assign(mock, require('./mock/' + file))
})

module.exports = mock
