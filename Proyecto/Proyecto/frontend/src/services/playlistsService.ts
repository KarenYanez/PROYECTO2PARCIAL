// services/playlistService.ts
import type { Playlists } from '../interfaces/Playlists';

const API_URL = 'http://localhost:3000/api/playlists';

export const playlistsService = {
  async getAll(): Promise<Playlists[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching playlists');
    return response.json();
  },

  async getById(id: number): Promise<Playlists> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error fetching playlist');
    return response.json();
  },

  async create(data: Omit<Playlists, 'id_playlist'>): Promise<Playlists> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error creating playlist');
    return response.json();
  },

  async update(id: number, data: Partial<Playlists>): Promise<Playlists> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error updating playlist');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting playlist');
  },
};
