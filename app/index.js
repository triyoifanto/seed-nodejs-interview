const hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const good = require('good');
const config = require('../config');
const contacts = require('./api/contact');
const version = require('hapi-api-version');
const logger = require('./connectors/logger');
const healthcheck = require('./api/healthcheck');

// create the server
const server = new hapi.Server();

// set connection host/port and enable CORS
server.connection({
  host: '0.0.0.0',
  port: config.api.port,
  routes: { cors: true },
  labels: ['api']
},
  {
    host: '0.0.0.0',
    port: config.docs.port,
    labels: ['docs']
  });

// register plugins and start the server on the callback if all is good
const plugins = [
  inert,
  vision,
  {
    register: good,
    options: {
      reporters: {
        bunyan: [{
          module: 'good-bunyan',
          args: [
            {
              response: '*',
              log: '*',
              error: '*',
              request: '*'
            },
            {
              logger,
              levels: {
                ops: 'debug'
              }
            }
          ]
        }]
      }
    }
  },
  {
    register: swagger,
    cache: {
      expiresIn: 24 * 60 * 60 * 1000
    },
    options: {
      info: {
        title: config.api.description,
        version: config.api.version
      },
      documentationPath: config.docs.path
    }
  },
  { register: version,
    select: ['api'],
    options: {
      validVersions: [1],
      defaultVersion: 1,
      vendorName: `j2-${config.name}-service`
    }
  },
  {
    register: healthcheck,
    options: { config }
  },
  /* required plugins end */

  /* microservice specific plugins start */
  {
    register: contacts,
    options: { config }
  }
  /* microservice specific plugins end*/
];

// register plugins and start the server on the callback if all is good
server.register(plugins, (err) => {
  if (err) throw err;

  server.start((startError) => {
    if (startError) { throw startError; }

    server.connections.forEach((conn) => {
      const label = conn.settings.labels[0];
      const { protocol, host, port } = conn.info;

      console.log(`${label} running at: ${protocol}://${host}:${port}`);
    });
  });
});

module.exports = server;
