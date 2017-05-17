// The route declaration
const contacts = [
  {
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
    },
    {
      method: 'POST',
      path: '/contacts',
      config: {
        tags: ['api'],
        description: 'Contacts API',
        notes: 'Performs basic post new contacts',
        plugins: {
          // Swagger model definition
          'hapi-swagger': {
            responses: {
              200: { description: 'Success' },
              400: { description: 'Bad Request' },
              500: { description: 'Internal Error' },
              201: { description: 'Item Created' }
            }
          }
        }
      },
      handler(req, reply) {
        var newContact = {"name":req.payload.name, "tel":req.payload.tel};           
        const { server: { contact } } = req;
        reply(contact.addItem(newContact)).code(201);
      }
    },
    {
      method: 'PUT',
      path: '/contacts/{index}',
      config: {
        tags: ['api'],
        description: 'Contacts API',
        notes: 'Performs basic post new contacts',
        plugins: {
          // Swagger model definition
          'hapi-swagger': {
            responses: {
              200: { description: 'Success' },
              400: { description: 'Bad Request' },
              500: { description: 'Internal Error' },
              204: { description: 'data deleted' }
            }
          }
        }
      },
      handler(req, reply) {
        var updateContact = {"name":req.payload.name, "tel":req.payload.tel}; 
        const { server: { contact } } = req;
        reply(contact.updateItem(req.params.index,updateContact));
      }
    },
    {
      method: 'DELETE',
      path: '/contacts/{index}',
      config: {
        tags: ['api'],
        description: 'Contacts API',
        notes: 'Performs basic post new contacts',
        plugins: {
          // Swagger model definition
          'hapi-swagger': {
            responses: {
              200: { description: 'Success' },
              400: { description: 'Bad Request' },
              500: { description: 'Internal Error' },
              204: { description: 'data deleted' }
            }
          }
        }
      },
      handler(req, reply) {
        const { server: { contact } } = req;
        contact.deleteItem(req.params.index-1)
        reply().code(204);
      }
    }
  ];

module.exports = { contacts };
