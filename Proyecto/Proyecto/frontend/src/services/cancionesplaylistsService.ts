import type { CancionesPlaylists } from '../interfaces/CancionesPlaylists';

const API_URL = 'http://localhost:3000/api/cancionesPlaylists';

export const cancionesPlaylistsService = {
  async getAll(): Promise<CancionesPlaylists[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching canciones-playlists');
    return response.json();
  },

  async getById(id_cancion: number, id_playlist: number): Promise<CancionesPlaylists> {
    const response = await fetch(`${API_URL}/${id_cancion}/${id_playlist}`);
    if (!response.ok) throw new Error('Error fetching canción-playlist');
    return response.json();
  },

  async create(data: CancionesPlaylists): Promise<CancionesPlaylists> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error creating relación canción-playlist');
    return response.json();
  },

  async delete(id_cancion: number, id_playlist: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id_cancion}/${id_playlist}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting canción-playlist');
  },

  async getByCancion(id_cancion: number): Promise<CancionesPlaylists[]> {
    const response = await fetch(`${API_URL}/cancion/${id_cancion}`);
    if (!response.ok) throw new Error('Error fetching playlists de una canción');
    return response.json();
  },

  async getByPlaylist(id_playlist: number): Promise<CancionesPlaylists[]> {
    const response = await fetch(`${API_URL}/playlist/${id_playlist}`);
    if (!response.ok) throw new Error('Error fetching canciones de una playlist');
    return response.json();
  },
};
