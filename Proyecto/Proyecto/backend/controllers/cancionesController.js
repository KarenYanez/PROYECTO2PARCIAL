const Canciones = require('../models/Canciones');

exports.getAll = async (req, res) => {
  try {
    const canciones = await Canciones.getAll();
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const cancion = await Canciones.getById(req.params.id);
    if (!cancion) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    res.status(200).json(cancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevaCancion = await Canciones.create(req.body);
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const cancionActualizada = await Canciones.update(req.params.id, req.body);
    if (!cancionActualizada) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    res.status(200).json(cancionActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const cancionEliminada = await Canciones.delete(req.params.id);
    if (!cancionEliminada) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    res.status(200).json({ message: 'Canción eliminada', cancion: cancionEliminada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
