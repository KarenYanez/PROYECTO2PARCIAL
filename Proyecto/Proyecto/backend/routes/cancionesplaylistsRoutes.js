const express = require('express');
const router = express.Router();
const CancionesPlaylistsController = require('../controllers/cancionesplaylistsController');

// Rutas
router.get('/', CancionesPlaylistsController.getAll);
router.get('/:id', CancionesPlaylistsController.getById);
router.post('/', CancionesPlaylistsController.create);
router.put('/:id', CancionesPlaylistsController.update);
router.delete('/:id', CancionesPlaylistsController.delete);

// Rutas adicionales (si las tienes)
router.get('/playlist/:id_playlist', CancionesPlaylistsController.getByPlaylist);
router.get('/cancion/:id_cancion', CancionesPlaylistsController.getByCancion);

module.exports = router;
