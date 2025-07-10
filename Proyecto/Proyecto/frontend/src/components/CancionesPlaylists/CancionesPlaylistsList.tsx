import { useState, useEffect } from 'react';
import type { CancionesPlaylists } from '../../interfaces/CancionesPlaylists';
import { cancionesPlaylistsService } from '../../services/cancionesplaylistsService';
import CancionesPlaylistsForm from './CancionesPlaylistsForm';

const CancionesPlaylistsList = () => {
  const [relaciones, setRelaciones] = useState<CancionesPlaylists[]>([]);
  const [editingRelacion, setEditingRelacion] = useState<CancionesPlaylists | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRelaciones();
  }, []);

  const loadRelaciones = async () => {
    try {
      setLoading(true);
      const data = await cancionesPlaylistsService.getAll();
      setRelaciones(data);
    } catch (err) {
      setError('Error al cargar relaciones canciones-playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (relacion: CancionesPlaylists) => {
    setEditingRelacion(relacion);
    setShowForm(true);
  };

  const handleDelete = async (id_cancion: number, id_playlist: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta relación?')) {
      try {
        await cancionesPlaylistsService.delete(id_cancion, id_playlist);
        loadRelaciones();
      } catch (err) {
        setError('Error al eliminar la relación');
      }
    }
  };

  const handleFormSubmit = async (relacion: CancionesPlaylists) => {
    try {
      await cancionesPlaylistsService.create(relacion); // Crea o reintenta la relación
      setShowForm(false);
      setEditingRelacion(null);
      loadRelaciones();
    } catch (err) {
      setError('Error al guardar la relación');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingRelacion(null);
  };

  if (loading) return <div className="loading">Cargando relaciones...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="relaciones-container">
      <h2>Relaciones Canciones - Playlists</h2>

      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Nueva Relación
        </button>
      )}

      {showForm && (
        <CancionesPlaylistsForm
          relacion={editingRelacion}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Canción</th>
              <th>ID Playlist</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {relaciones.map(rel => (
              <tr key={`${rel.id_cancion}-${rel.id_playlist}`}>
                <td>{rel.id_cancion}</td>
                <td>{rel.id_playlist}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(rel)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(rel.id_cancion, rel.id_playlist)}
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

export default CancionesPlaylistsList;
