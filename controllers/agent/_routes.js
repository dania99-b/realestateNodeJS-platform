
const agentController  = require('./agent');

/**
 * Fastify plugin-style route registration
 */
async function modelRoutes(fastify, options) {
    
  fastify.get('/', agentController .getAll);
  fastify.post('/', agentController .create);


}

module.exports = modelRoutes;
