const pkg = require('../package.json');

const config = {
  name: pkg.name,
  description: pkg.description,
  logLevel: 'trace',
  api: {
    version: pkg.version,
    port: process.env.SERVICE_PORT || 3000,
    token: {
      secret: 'secret',
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  },
  docs: {
    port: process.env.SERVICE_DOCS_PORT || 4000,
    path: process.env.SERVICE_DOCS_PATH || '/docs'
  }
};

module.exports = config;
