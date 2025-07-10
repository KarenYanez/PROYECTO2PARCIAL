import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CancionesList from './components/Canciones/CancionesList';
import PlaylistsList from './components/Playlists/PlaylistsList';
import CancionesPlaylistsList from './components/CancionesPlaylists/CancionesPlaylistsList';
import './App.css';

const Home = () => (
  <div className="home-container">
    <h1>Plataforma de Música</h1>
    <div className="home-content">
      <h2>Bienvenido al Sistema de Gestión Musical</h2>
      <p>Esta plataforma te permite gestionar canciones, playlists y sus asociaciones.</p>
      
      <div className="features">
        <div className="feature">
          <h3>Canciones</h3>
          <p>Administra las canciones disponibles en la plataforma.</p>
        </div>
        <div className="feature">
          <h3>Playlists</h3>
          <p>Crea y gestiona tus listas de reproducción.</p>
        </div>
        <div className="feature">
          <h3>Canciones en Playlists</h3>
          <p>Asocia canciones a playlists fácilmente y visualiza su organización.</p>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="about-container">
    <h2>Acerca de</h2>
    <div className="about-content">
      <h3>Información del Desarrollador</h3>
      <p><strong>Nombre:</strong> [GRUPO 4: Karen Yanez, Elian Collaguazo]</p>
      <p><strong>Correo:</strong> [kayanez2@espe.edu.ec, lecollaguazo@espe.edu.ec]</p>
      <p><strong>Descripción:</strong> Estudiante de desarrollo web especializado en React y TypeScript.</p>
      <p><strong>Proyecto:</strong> Plataforma de música desarrollada como proyecto integrador del segundo parcial.</p>
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
