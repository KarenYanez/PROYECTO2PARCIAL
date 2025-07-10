const express = require('express');
const router = express.Router();
const PlaylistsController = require('../controllers/playlistsController');

router.get('/', PlaylistsController.getAll);
router.get('/:id', PlaylistsController.getById);
router.post('/', PlaylistsController.create);
router.put('/:id', PlaylistsController.update);
router.delete('/:id', PlaylistsController.delete);

module.exports = router;
