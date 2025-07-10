const Playlists = require('../models/Playlists');

exports.getAll = async (req, res) => {
  try {
    const playlists = await Playlists.getAll();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const playlist = await Playlists.getById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevaPlaylist = await Playlists.create(req.body);
    res.status(201).json(nuevaPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizada = await Playlists.update(req.params.id, req.body);
    if (!actualizada) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const eliminada = await Playlists.delete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    res.status(200).json({ message: 'Playlist eliminada', playlist: eliminada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
