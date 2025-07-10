const pool = require('../config/db');

class Playlist {
    constructor(id_playlist, nombre, usuario_creador, fecha_creacion) {
        this.id_playlist = id_playlist;
        this.nombre = nombre;
        this.usuario_creador = usuario_creador;
        this.fecha_creacion = fecha_creacion;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM playlists ORDER BY nombre');
        return result.rows.map(row => new Playlist(row.id_playlist, row.nombre, row.usuario_creador, row.fecha_creacion));
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM playlists WHERE id_playlist = $1', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Playlist(row.id_playlist, row.nombre, row.usuario_creador, row.fecha_creacion);
        } else {
            throw new Error('Playlist no encontrada');
        }
    }

    static async create(playlist) {
        const result = await pool.query(
            `INSERT INTO playlists (nombre, usuario_creador, fecha_creacion)
             VALUES ($1, $2, $3) RETURNING *`,
            [playlist.nombre, playlist.usuario_creador, playlist.fecha_creacion || new Date()]
        );
        const row = result.rows[0];
        return new Playlist(row.id_playlist, row.nombre, row.usuario_creador, row.fecha_creacion);
    }

    static async update(id, playlist) {
        const result = await pool.query(
            `UPDATE playlists
             SET nombre = $1, usuario_creador = $2, fecha_creacion = $3
             WHERE id_playlist = $4 RETURNING *`,
            [playlist.nombre, playlist.usuario_creador, playlist.fecha_creacion, id]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Playlist(row.id_playlist, row.nombre, row.usuario_creador, row.fecha_creacion);
        } else {
            throw new Error('Playlist no encontrada');
        }
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM playlists WHERE id_playlist = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Playlist(row.id_playlist, row.nombre, row.usuario_creador, row.fecha_creacion);
        } else {
            throw new Error('Playlist no encontrada');
        }
    }
}

module.exports = Playlist;
