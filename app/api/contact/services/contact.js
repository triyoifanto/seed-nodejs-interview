const utils = require('../../../utils');

/*
 *  Contact Service
 *
 *  The Class constructor provides you with instances properties to:
 *
 *  'logger' - this.logger.info('making request', correlationId...);
 *
 */

var contactList = [
      {
        "name": "Rheza",
        "tel": "12345678"
      }
]; 

class Contact {
  constructor(opts) {
    Object.assign(this, opts);
    if (!this.logger) { utils.throwIfMissing('logger'); }

  }  

  getAll() {
    this.logger.info('call get all contacts');

    return (contactList);
  }

  addItem(param) {
    this.logger.info('call post new contact');
    contactList.push(param);

    return (contactList);    
  }

  updateItem(index, param) {
    this.logger.info('call put contact');

    contactList[index-1] = param;
   	   
    return (contactList);
  }

  deleteItem(index) {
    this.logger.info('call delete contact');

    delete contactList[index-1];
  }
}

module.exports = Contact;
