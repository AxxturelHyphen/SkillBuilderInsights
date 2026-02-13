const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');

// Lista de colecciones permitidas
const ALLOWED_COLLECTIONS = ['mentors', 'projects', 'tasks', 'users', 'resources'];

// Middleware para validar nombre de colección
function validateCollection(req, res, next) {
  const { collection } = req.params;
  if (!ALLOWED_COLLECTIONS.includes(collection)) {
    return res.status(400).json({
      error: 'Colección no válida',
      allowed: ALLOWED_COLLECTIONS
    });
  }
  next();
}

// GET /:collection/count - Obtener el conteo de documentos
// IMPORTANTE: Esta ruta debe ir ANTES de /:collection/:id para evitar conflictos
router.get('/:collection/count', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection } = req.params;

    const count = await db
      .collection(collection)
      .countDocuments();

    res.json({ count });
  } catch (error) {
    console.error(`Error contando documentos de ${req.params.collection}:`, error);
    res.status(500).json({
      error: 'Error al contar documentos',
      message: error.message
    });
  }
});

// GET /:collection - Obtener todos los documentos de una colección
router.get('/:collection', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection } = req.params;
    const { limit = 100, skip = 0, sort = 'createdAt', order = 'desc' } = req.query;

    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const documents = await db
      .collection(collection)
      .find({})
      .sort(sortObj)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    res.json({ documents });
  } catch (error) {
    console.error(`Error obteniendo documentos de ${req.params.collection}:`, error);
    res.status(500).json({
      error: 'Error al obtener documentos',
      message: error.message
    });
  }
});

// GET /:collection/:id - Obtener un documento por ID
router.get('/:collection/:id', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection, id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const document = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });

    if (!document) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    res.json(document);
  } catch (error) {
    console.error(`Error obteniendo documento:`, error);
    res.status(500).json({
      error: 'Error al obtener documento',
      message: error.message
    });
  }
});

// POST /:collection - Crear un nuevo documento
router.post('/:collection', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection } = req.params;
    const documento = req.body;

    // Agregar timestamp de creación
    documento.createdAt = new Date().toISOString();

    const result = await db
      .collection(collection)
      .insertOne(documento);

    res.status(201).json({
      insertedId: result.insertedId,
      acknowledged: result.acknowledged
    });
  } catch (error) {
    console.error(`Error creando documento:`, error);
    res.status(500).json({
      error: 'Error al crear documento',
      message: error.message
    });
  }
});

// PUT /:collection/:id - Actualizar un documento
router.put('/:collection/:id', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection, id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Agregar timestamp de actualización
    updates.updatedAt = new Date().toISOString();

    const result = await db
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    res.json({
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error(`Error actualizando documento:`, error);
    res.status(500).json({
      error: 'Error al actualizar documento',
      message: error.message
    });
  }
});

// DELETE /:collection/:id - Eliminar un documento
router.delete('/:collection/:id', validateCollection, async (req, res) => {
  try {
    const db = getDB();
    const { collection, id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const result = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    res.json({
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged
    });
  } catch (error) {
    console.error(`Error eliminando documento:`, error);
    res.status(500).json({
      error: 'Error al eliminar documento',
      message: error.message
    });
  }
});

module.exports = router;
