const utils = require('../../../utils');

/*
 *  Contact Service
 *
 *  The Class constructor provides you with instances properties to:
 *
 *  'logger' - this.logger.info('making request', correlationId...);
 *
 */
class Contact {
  constructor(opts) {
    Object.assign(this, opts);
    if (!this.logger) { utils.throwIfMissing('logger'); }

  }

  getAll() {
    this.logger.info('call get all contacts');

    return Promise.resolve([{
      name: 'Rheza',
      tel: '12345678'
    }]);
  }
}

module.exports = Contact;
