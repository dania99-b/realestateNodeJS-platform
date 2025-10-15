
const listingController  = require('./listing');

/**
 * Fastify plugin-style route registration
 */
async function modelRoutes(fastify, options) {
    
  fastify.get('/', listingController .getAll);
  fastify.get('/:id', listingController .getById);
  fastify.post('/', listingController .create);
  fastify.put('/', listingController .update);
  fastify.delete('/', listingController .delete);



}

module.exports = modelRoutes;
