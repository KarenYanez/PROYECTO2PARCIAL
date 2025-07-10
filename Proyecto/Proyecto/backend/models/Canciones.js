const pool = require('../config/db');

class Cancion {
    constructor(id_cancion, titulo, artista, duracion) {
        this.id_cancion = id_cancion;
        this.titulo = titulo;
        this.artista = artista;
        this.duracion = duracion;
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM canciones ORDER BY titulo');
        return result.rows.map(row => new Cancion(row.id_cancion, row.titulo, row.artista, row.duracion));
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM canciones WHERE id_cancion = $1', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Cancion(row.id_cancion, row.titulo, row.artista, row.duracion);
        } else {
            throw new Error('Canción no encontrada');
        }
    }

    static async create(cancion) {
        const result = await pool.query(
            `INSERT INTO canciones (titulo, artista, duracion) 
             VALUES ($1, $2, $3) RETURNING *`,
            [cancion.titulo, cancion.artista, cancion.duracion]
        );
        const row = result.rows[0];
        return new Cancion(row.id_cancion, row.titulo, row.artista, row.duracion);
    }

    static async update(id, cancion) {
        const result = await pool.query(
            `UPDATE canciones 
             SET titulo = $1, artista = $2, duracion = $3
             WHERE id_cancion = $4 RETURNING *`,
            [cancion.titulo, cancion.artista, cancion.duracion, id]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Cancion(row.id_cancion, row.titulo, row.artista, row.duracion);
        } else {
            throw new Error('Canción no encontrada');
        }
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM canciones WHERE id_cancion = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Cancion(row.id_cancion, row.titulo, row.artista, row.duracion);
        } else {
            throw new Error('Canción no encontrada');
        }
    }
}

module.exports = Cancion;
