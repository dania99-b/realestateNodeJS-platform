const listingRoute = require('./listing/_routes');
const agentRoute = require('./agent/_routes');
const mongoRoute = require('./mongoDB/_routes');



async function routes(fastify, options) {
  fastify.register(listingRoute, { prefix: '/listing' });
  fastify.register(agentRoute, { prefix: '/agent' });
  fastify.register(mongoRoute, { prefix: '/mongo' });

}

module.exports = routes;