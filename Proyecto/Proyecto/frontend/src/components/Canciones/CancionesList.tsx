import { useState, useEffect } from 'react';
import type { Canciones } from '../../interfaces/Canciones';
import { cancionesService } from '../../services/cancionesService';
import CancionesForm from './CancionesForm';

const CancionesList = () => {
  const [canciones, setCanciones] = useState<Canciones[]>([]);
  const [editingCancion, setEditingCancion] = useState<Canciones | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCanciones();
  }, []);

  const loadCanciones = async () => {
    try {
      setLoading(true);
      const data = await cancionesService.getAll();
      setCanciones(data);
    } catch (err) {
      setError('Error al cargar canciones');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cancion: Canciones) => {
    setEditingCancion(cancion);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      try {
        await cancionesService.delete(id);
        loadCanciones();
      } catch (err) {
        setError('Error al eliminar canción');
      }
    }
  };

  const handleFormSubmit = async (data: Omit<Canciones, 'id_cancion'>) => {
    try {
      if (editingCancion) {
        await cancionesService.update(editingCancion.id_cancion, data);
      } else {
        await cancionesService.create(data);
      }
      setShowForm(false);
      setEditingCancion(null);
      loadCanciones();
    } catch (err) {
      setError('Error al guardar canción');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCancion(null);
  };

  if (loading) return <div className="loading">Cargando canciones...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="canciones-container">
      <h2>Gestión de Canciones</h2>

      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Nueva Canción
        </button>
      )}

      {showForm && (
        <CancionesForm
          cancion={editingCancion}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Duración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {canciones.map(cancion => (
              <tr key={cancion.id_cancion}>
                <td>{cancion.id_cancion}</td>
                <td>{cancion.titulo}</td>
                <td>{cancion.artista}</td>
                <td>{cancion.duracion}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(cancion)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(cancion.id_cancion)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancionesList;
