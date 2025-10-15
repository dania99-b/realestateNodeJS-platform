// routes/stats.js
const statsController = require('../mongoDB/mongoDB');

async function statsRoutes(fastify, options) {
  fastify.get('/active-agents', statsController.getActiveAgents);
}

module.exports = statsRoutes;



