const Joi = require('joi');

const schema = Joi.object({
  status: Joi.string().description('Service status').example('ok'),
  version: Joi.string().description('Service version').example('0.1.0')
});

module.exports = schema;
