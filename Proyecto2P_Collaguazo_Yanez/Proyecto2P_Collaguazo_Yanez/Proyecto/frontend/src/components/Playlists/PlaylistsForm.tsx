import { useState, useEffect } from 'react';
import type { Playlists } from '../../interfaces/Playlists';

interface PlaylistsFormProps {
  playlist?: Playlists | null;
  onSubmit: (playlist: Omit<Playlists, 'id_playlist'>) => void;
  onCancel: () => void;
}

const PlaylistsForm = ({ playlist, onSubmit, onCancel }: PlaylistsFormProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario_creador: 0,
    fecha_creacion: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (playlist) {
      setFormData({
        nombre: playlist.nombre,
        usuario_creador: playlist.usuario_creador,
        fecha_creacion: playlist.fecha_creacion.slice(0, 10), // formato YYYY-MM-DD
      });
    }
  }, [playlist]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (formData.nombre.trim() === '') {
      newErrors.push('El nombre de la playlist es obligatorio');
    }

    if (formData.usuario_creador === 0) {
      newErrors.push('El ID del usuario creador es obligatorio');
    }

    if (formData.fecha_creacion.trim() === '') {
      newErrors.push('Debe ingresar la fecha de creación');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        nombre: formData.nombre,
        usuario_creador: formData.usuario_creador,
        fecha_creacion: formData.fecha_creacion,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'usuario_creador' ? parseInt(value) : value,
    }));

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <div className="form-container">
      <h3>{playlist ? 'Editar Playlist' : 'Nueva Playlist'}</h3>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((error, index) => (
            <div key={index} className="error">{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuario_creador">ID Usuario Creador:</label>
          <input
            type="number"
            id="usuario_creador"
            name="usuario_creador"
            value={formData.usuario_creador}
            onChange={handleChange}
            className="form-input"
            min={1}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_creacion">Fecha de Creación:</label>
          <input
            type="date"
            id="fecha_creacion"
            name="fecha_creacion"
            value={formData.fecha_creacion}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {playlist ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaylistsForm;
