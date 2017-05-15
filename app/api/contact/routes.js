// The route declaration
const contacts = {
  method: 'GET',
  path: '/contacts',
  config: {
    tags: ['api'],
    description: 'Contacts API',
    notes: 'Performs basic get all contacts',
    plugins: {
      // Swagger model definition
      'hapi-swagger': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad Request' },
          500: { description: 'Internal Error' }
        }
      }
    }
  },
  handler(req, reply) {
    const { server: { contact } } = req;
    reply(contact.getAll());
  }
};

module.exports = { contacts };
