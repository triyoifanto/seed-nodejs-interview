const logger = require('../../connectors/logger');
const Contact = require('./services/contact');
const { contacts } = require('./routes');

const internals = {};

internals.applyRoutes = (server, next) => {

  server.route(
    contacts     
  );

  next();
};

exports.register = (server, opts, next) => {
  const { config } = opts;

  const contact = new Contact({ logger, config });

  server.ext('onPreHandler', (req, reply) => {
    req.server.contact = contact; // eslint-disable-line
    reply.continue();
  });

  server.dependency([
  ], internals.applyRoutes);

  return next();
};

exports.register.attributes = {
  name: 'contacts'
};
