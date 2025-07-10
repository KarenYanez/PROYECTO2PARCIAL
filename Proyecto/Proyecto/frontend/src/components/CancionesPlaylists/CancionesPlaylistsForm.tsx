import { useState, useEffect } from 'react';
import type { CancionesPlaylists } from '../../interfaces/CancionesPlaylists';
import type { Canciones } from '../../interfaces/Canciones';
import type { Playlists } from '../../interfaces/Playlists';
import { cancionesService } from '../../services/cancionesService';
import { playlistsService} from '../../services/playlistsService';

interface CancionesPlaylistsFormProps {
  relacion?: CancionesPlaylists | null;
  onSubmit: (relacion: CancionesPlaylists) => void;
  onCancel: () => void;
}

const CancionesPlaylistsForm = ({
  relacion,
  onSubmit,
  onCancel
}: CancionesPlaylistsFormProps) => {
  const [formData, setFormData] = useState({
    id_cancion: 0,
    id_playlist: 0
  });
  const [canciones, setCanciones] = useState<Canciones[]>([]);
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (relacion) {
      setFormData({
        id_cancion: relacion.id_cancion,
        id_playlist: relacion.id_playlist
      });
    }
  }, [relacion]);

  const loadData = async () => {
    try {
      const [cancionesData, playlistsData] = await Promise.all([
        cancionesService.getAll(),
        playlistsService.getAll()
      ]);
      setCanciones(cancionesData);
      setPlaylists(playlistsData);
    } catch (err) {
      setErrors(['Error al cargar canciones o playlists']);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (formData.id_cancion === 0) {
      newErrors.push('Debe seleccionar una canción');
    }

    if (formData.id_playlist === 0) {
      newErrors.push('Debe seleccionar una playlist');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        id_cancion: formData.id_cancion,
        id_playlist: formData.id_playlist
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  if (loading) return <div className="loading">Cargando formulario...</div>;

  return (
    <div className="form-container">
      <h3>{relacion ? 'Editar Relación' : 'Nueva Relación'}</h3>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((error, index) => (
            <div key={index} className="error">{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_cancion">Canción:</label>
          <select
            id="id_cancion"
            name="id_cancion"
            value={formData.id_cancion}
            onChange={handleChange}
            className="form-input"
          >
            <option value={0}>Selecciona una canción</option>
            {canciones.map(cancion => (
              <option key={cancion.id_cancion} value={cancion.id_cancion}>
                {cancion.titulo} - {cancion.artista}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_playlist">Playlist:</label>
          <select
            id="id_playlist"
            name="id_playlist"
            value={formData.id_playlist}
            onChange={handleChange}
            className="form-input"
          >
            <option value={0}>Selecciona una playlist</option>
            {playlists.map(playlist => (
              <option key={playlist.id_playlist} value={playlist.id_playlist}>
                {playlist.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {relacion ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancionesPlaylistsForm;
