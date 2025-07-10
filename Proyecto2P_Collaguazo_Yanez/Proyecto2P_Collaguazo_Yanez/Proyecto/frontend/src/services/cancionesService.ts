import type { Canciones } from '../interfaces/Canciones';

const API_URL = 'http://localhost:3000/api/canciones';

export const cancionesService = {
  async getAll(): Promise<Canciones[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching canciones');
    return response.json();
  },

  async getById(id: number): Promise<Canciones> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error fetching canción');
    return response.json();
  },

  async create(cancion: Omit<Canciones, 'id_cancion'>): Promise<Canciones> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cancion),
    });
    if (!response.ok) throw new Error('Error creating canción');
    return response.json();
  },

  async update(id: number, cancion: Partial<Canciones>): Promise<Canciones> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cancion),
    });
    if (!response.ok) throw new Error('Error updating canción');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting canción');
  },
};
