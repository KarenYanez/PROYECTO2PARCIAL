import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CancionesList from './components/Canciones/CancionesList';
import PlaylistsList from './components/Playlists/PlaylistsList';
import CancionesPlaylistsList from './components/CancionesPlaylists/CancionesPlaylistsList';
import './App.css';

const Home = () => (
  <div className="home-container">
    <h1>🎧 Plataforma de Música</h1>
    <div className="home-content">
      <h2>Bienvenido al Sistema de Gestión Musical</h2>
      <p>Explora, organiza y personaliza tu experiencia musical.</p>

      <div className="image-banner">
        <img
          src="shttps://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
          alt="Banner musical"
          className="home-banner-img"
        />
      </div>

      <div className="features">
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
            alt="Canciones"
            className="feature-icon"
          />
          <h3>Canciones</h3>
          <p>Administra las canciones disponibles: nombre, artista, duración, género y más.</p>
        </div>
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Playlists"
            className="feature-icon"
          />
          <h3>Playlists</h3>
          <p>Crea tus propias listas de reproducción personalizadas según tu estado de ánimo.</p>
        </div>
        <div className="feature">
          <img
            src="https://cdn-icons-png.flaticon.com/512/858/858956.png"
            alt="Asociar Canciones"
            className="feature-icon"
          />
          <h3>Canciones en Playlists</h3>
          <p>Agrega canciones a tus playlists y visualiza su organización de forma clara y dinámica.</p>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="about-container">
    <h2>🎓 Acerca de</h2>
    <div className="about-content">
      <h3>Información del Desarrollador</h3>
      <p><strong>Integrantes:</strong> Karen Yanez, Elian Collaguazo</p>
      <p><strong>Correos:</strong> kayanez2@espe.edu.ec, lecollaguazo@espe.edu.ec</p>
      <p><strong>Descripción:</strong> Estudiantes de la Universidad de las Fuerzas Armadas - ESPE, apasionados por la tecnología y el desarrollo web moderno.</p>
      <p><strong>Proyecto:</strong> Plataforma de gestión musical desarrollada como proyecto integrador del segundo parcial. Esta aplicación permite la administración integral de canciones y listas de reproducción.</p>
      <p><strong>Tecnologías utilizadas:</strong> React, TypeScript, React Router, CSS moderno (Material + Neumorphism).</p>

      <img
        src="https://png.pngtree.com/png-clipart/20221001/original/pngtree-music-player-icon-png-image_8649163.png"
        alt="Estudio musical"
        className="about-image"
      />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canciones" element={<CancionesList />} />
            <Route path="/playlists" element={<PlaylistsList />} />
            <Route path="/canciones-playlists" element={<CancionesPlaylistsList />} />
            <Route path="/acerca" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
