import { useEffect, useState } from 'react';
import type { Playlists } from '../../interfaces/Playlists';
import { playlistsService } from '../../services/playlistsService';
import PlaylistsForm from './PlaylistsForm';

const PlaylistsList = () => {
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlists | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const data = await playlistsService.getAll();
      setPlaylists(data);
    } catch (err) {
      setError('Error al cargar las playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPlaylist(null);
    setShowForm(true);
  };

  const handleEdit = (playlist: Playlists) => {
    setSelectedPlaylist(playlist);
    setShowForm(true);
  };

  const handleDelete = async (id_playlist: number) => {
    if (!confirm('¿Estás seguro de eliminar esta playlist?')) return;

    try {
      await playlistsService.delete(id_playlist);
      setPlaylists(prev => prev.filter(p => p.id_playlist !== id_playlist));
    } catch (err) {
      setError('Error al eliminar la playlist');
    }
  };

  const handleSubmit = async (data: Omit<Playlists, 'id_playlist'>) => {
    try {
      if (selectedPlaylist) {
        // Actualizar
        const updated = await playlistsService.update(selectedPlaylist.id_playlist, data);
        setPlaylists(prev =>
          prev.map(p => (p.id_playlist === selectedPlaylist.id_playlist ? updated : p))
        );
      } else {
        // Crear
        const created = await playlistsService.create(data);
        setPlaylists(prev => [...prev, created]);
      }
      setShowForm(false);
      setSelectedPlaylist(null);
    } catch (err) {
      setError('Error al guardar la playlist');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedPlaylist(null);
  };

  if (loading) return <div className="loading">Cargando playlists...</div>;

  return (
    <div className="list-container">
      <h2>Playlists</h2>
      {error && <div className="error">{error}</div>}

      {!showForm && (
        <div className="list-header">
          <button className="btn btn-primary" onClick={handleCreate}>
            Nueva Playlist
          </button>
        </div>
      )}

      {showForm && (
        <PlaylistsForm
          playlist={selectedPlaylist}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {!showForm && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario Creador</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist) => (
              <tr key={playlist.id_playlist}>
                <td>{playlist.id_playlist}</td>
                <td>{playlist.nombre}</td>
                <td>{playlist.usuario_creador}</td>
                <td>{new Date(playlist.fecha_creacion).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(playlist)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(playlist.id_playlist)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {playlists.length === 0 && (
              <tr>
                <td colSpan={5}>No hay playlists registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlaylistsList;
