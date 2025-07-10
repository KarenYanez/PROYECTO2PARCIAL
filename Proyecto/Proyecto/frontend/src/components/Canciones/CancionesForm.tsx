import { useState, useEffect } from 'react';
import type { Canciones } from '../../interfaces/Canciones';

interface CancionFormProps {
  cancion?: Canciones | null;
  onSubmit: (cancion: Omit<Canciones, 'id_cancion'>) => void;
  onCancel: () => void;
}

const CancionForm = ({ cancion, onSubmit, onCancel }: CancionFormProps) => {
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    duracion: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (cancion) {
      setFormData({
        titulo: cancion.titulo,
        artista: cancion.artista,
        duracion: cancion.duracion,
      });
    }
  }, [cancion]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.titulo.trim()) newErrors.push('El título es requerido');
    if (!formData.artista.trim()) newErrors.push('El artista es requerido');
    if (!formData.duracion.trim()) newErrors.push('La duración es requerida');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors.length > 0) setErrors([]);
  };

  return (
    <div className="form-container">
      <h3>{cancion ? 'Editar Canción' : 'Nueva Canción'}</h3>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((error, index) => (
            <div key={index} className="error">{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="artista">Artista:</label>
          <input
            type="text"
            id="artista"
            name="artista"
            value={formData.artista}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duracion">Duración:</label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            value={formData.duracion}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: 03:45"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {cancion ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancionForm;
