const express = require('express');
const router = express.Router();
const CancionesController = require('../controllers/cancionesController');

// Rutas de canciones
router.get('/', CancionesController.getAll);           // ✅ CORRECTO
router.get('/:id', CancionesController.getById);       // ✅
router.post('/', CancionesController.create);          // ✅
router.put('/:id', CancionesController.update);        // ✅
router.delete('/:id', CancionesController.delete);     // ✅

module.exports = router;
