const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db/connection');
const collectionsRouter = require('./routes/collections');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir requests desde el frontend
app.use(express.json()); // Parsear JSON en body

// Logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api', collectionsRouter);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'SkillBuilder DB Manager Backend API',
    endpoints: {
      health: 'GET /health',
      collections: {
        getAll: 'GET /api/:collection',
        count: 'GET /api/:collection/count',
        getById: 'GET /api/:collection/:id',
        create: 'POST /api/:collection',
        update: 'PUT /api/:collection/:id',
        delete: 'DELETE /api/:collection/:id',
        allowed: ['mentors', 'projects', 'tasks', 'users', 'resources']
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Iniciar servidor
async function startServer() {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API docs: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n⏹ Cerrando servidor...');
  const { closeDB } = require('./db/connection');
  await closeDB();
  process.exit(0);
});
