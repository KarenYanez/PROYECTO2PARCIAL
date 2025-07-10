const CancionesPlaylists = require('../models/CancionesPlaylists');

exports.getAll = async (req, res) => {
  try {
    const relaciones = await CancionesPlaylists.getAll();
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const relacion = await CancionesPlaylists.getById(req.params.id);
    if (!relacion) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.status(200).json(relacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { id_cancion, id_playlist } = req.body;

    // Verificar si ya existe la relación
    const existe = await CancionesPlaylists.exists(id_cancion, id_playlist);
    if (existe) {
      return res.status(400).json({ error: 'La canción ya está en la playlist' });
    }

    const nuevaRelacion = await CancionesPlaylists.create(req.body);
    res.status(201).json(nuevaRelacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizada = await CancionesPlaylists.update(req.params.id, req.body);
    if (!actualizada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const eliminada = await CancionesPlaylists.delete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.status(200).json({ message: 'Relación eliminada', relacion: eliminada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByCancion = async (req, res) => {
  try {
    const relaciones = await CancionesPlaylists.getByCancion(req.params.id_cancion);
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByPlaylist = async (req, res) => {
  try {
    const relaciones = await CancionesPlaylists.getByPlaylist(req.params.id_playlist);
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkRelation = async (req, res) => {
  try {
    const existe = await CancionesPlaylists.exists(req.params.id_cancion, req.params.id_playlist);
    res.status(200).json({ existe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
