const env = process.env.NODE_ENV

const envConfig = {
  development: {
    DELICATE_API: 'http://localhost:7000',
    DELICATE_WEB: 'http://localhost:7000',
  },
  test: {
    DELICATE_API: 'http://52.78.161.159:8090',
    DELICATE_WEB: 'http://localhost:3001',
  },
  production: {
    DELICATE_API: 'http://52.78.161.159:8090',
    DELICATE_WEB: 'http://localhost:3001',
  },
}
export default (key) => envConfig[env][key]
