const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Rutas

const cancionesRoutes = require('./routes/cancionesRoutes');
const playlistsRoutes = require('./routes/playlistsRoutes');
const cancionesPlaylistsRoutes = require('./routes/cancionesplaylistsRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rutas base

app.use('/api/canciones', cancionesRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/cancionesplaylists', cancionesPlaylistsRoutes);

module.exports = app;
