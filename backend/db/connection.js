const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');

    // Verificar conexión con ping
    await client.db('admin').command({ ping: 1 });

    db = client.db(process.env.MONGODB_DATABASE);
    return db;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database no inicializada. Llama a connectDB() primero.');
  }
  return db;
}

async function closeDB() {
  await client.close();
  console.log('Conexión a MongoDB cerrada');
}

module.exports = { connectDB, getDB, closeDB };
