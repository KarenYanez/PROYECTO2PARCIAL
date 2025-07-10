const pool = require('../config/db');

class CancionPlaylist {
    constructor(id_cancion, id_playlist) {
        this.id_cancion = id_cancion;
        this.id_playlist = id_playlist;
    }

    static async getAll() {
        const result = await pool.query(`
            SELECT cp.id_cancion, cp.id_playlist, c.titulo, p.nombre
            FROM canciones_playlists cp
            INNER JOIN canciones c ON cp.id_cancion = c.id_cancion
            INNER JOIN playlists p ON cp.id_playlist = p.id_playlist
            ORDER BY p.nombre, c.titulo
        `);
        return result.rows;
    }

    static async getById(id_cancion, id_playlist) {
        const result = await pool.query(
            `SELECT * FROM canciones_playlists WHERE id_cancion = $1 AND id_playlist = $2`,
            [id_cancion, id_playlist]
        );
        if (result.rows.length > 0) {
            return new CancionPlaylist(result.rows[0].id_cancion, result.rows[0].id_playlist);
        } else {
            throw new Error('Relación no encontrada');
        }
    }

    static async create(cancionPlaylist) {
        const result = await pool.query(
            `INSERT INTO canciones_playlists (id_cancion, id_playlist) VALUES ($1, $2) RETURNING *`,
            [cancionPlaylist.id_cancion, cancionPlaylist.id_playlist]
        );
        return new CancionPlaylist(result.rows[0].id_cancion, result.rows[0].id_playlist);
    }

    static async delete(id_cancion, id_playlist) {
        const result = await pool.query(
            `DELETE FROM canciones_playlists WHERE id_cancion = $1 AND id_playlist = $2 RETURNING *`,
            [id_cancion, id_playlist]
        );
        if (result.rows.length > 0) {
            return new CancionPlaylist(result.rows[0].id_cancion, result.rows[0].id_playlist);
        } else {
            throw new Error('Relación no encontrada');
        }
    }

    static async exists(id_cancion, id_playlist) {
        const result = await pool.query(
            `SELECT 1 FROM canciones_playlists WHERE id_cancion = $1 AND id_playlist = $2`,
            [id_cancion, id_playlist]
        );
        return result.rows.length > 0;
    }

    static async getByPlaylist(id_playlist) {
        const result = await pool.query(
            `SELECT c.* 
             FROM canciones_playlists cp
             INNER JOIN canciones c ON cp.id_cancion = c.id_cancion
             WHERE cp.id_playlist = $1`,
            [id_playlist]
        );
        return result.rows;
    }

    static async getByCancion(id_cancion) {
        const result = await pool.query(
            `SELECT p.* 
             FROM canciones_playlists cp
             INNER JOIN playlists p ON cp.id_playlist = p.id_playlist
             WHERE cp.id_cancion = $1`,
            [id_cancion]
        );
        return result.rows;
    }
}

module.exports = CancionPlaylist;
