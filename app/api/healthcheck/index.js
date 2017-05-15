/* eslint no-useless-computed-key: 0 */
const schema = require('./schema');

const internals = {};
internals.applyRoutes = (server, next) => {
  const { config } = server.realm.pluginOptions;
  server.route({
    method: 'GET',
    path: '/healthcheck',
    config: {
      tags: ['api'],
      auth: false,
      description: 'Healthcheck API',
      notes: 'Performs a basic healthcheck',
      plugins: {
        'hapi-swagger': {
          responses: {
            [200]: { description: 'Success', schema },
            [400]: { description: 'Bad Request' },
            [500]: { description: 'Internal Error' }
          }
        }
      }
    },
    handler: (req, reply) => {
      reply({
        status: 'ok',
        version: config.api.version
      });
    }
  });
  next();
};
exports.register = (server, options, next) => {
  server.dependency([
    'hapi-swagger'
  ], internals.applyRoutes);
  next();
};
exports.register.attributes = {
  name: 'healthcheck'
};
