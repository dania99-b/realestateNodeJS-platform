const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();

const multipart = require('@fastify/multipart');
const cors = require('@fastify/cors');


const port = process.env.PORT || 3000;
const route = require('./controllers/route');

// Register multipart
fastify.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB حد أقصى
  }
});

// Register plugins
fastify.register(cors, { 
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] 
});

// ❌ لا داعي للـ fastify.options('*') هنا

// Routes
fastify.register(route, { prefix: '/api' });

fastify.get('/', async () => 'Welcome to session management...');
fastify.setErrorHandler((err, req, reply) => {
    // لو err.statusCode موجود، نستخدمه، وإلا 500
    const status = err.statusCode || 500;
    reply.status(status).send({
      error: true,
      message: err.message 
    });
  });
// Start server
const start = async () => {
  try {
    const address = await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server listening at ${address}`);
    // ✅ شغل جميع الـ schedules المفعلة
    fastify.log.info("welcome to the Real Estate");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
