import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import Galeria from '../components/Galeria';

import { queBuscas } from '../data/queBuscas';
import { productos } from '../data/productos';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Inicio({ cantidad }) {
  // Best Sellers = los productos marcados con destacado: true en productos.js (ya no hay un archivo aparte).
  // Se calcula aquí dentro (y no fuera del componente) para que, si el Panel elimina un producto destacado,
  // Inicio ya no lo muestre al volver a esta página.
  const bestSellers = productos.filter((producto) => producto.destacado);

  // useEffect con [] se ejecuta una vez al mostrar la página: aquí cambia el título de la pestaña
  // (en el original cada página tenía el suyo; el de index.html de Vite es solo el valor inicial).
  useEffect(() => {
    document.title = 'Nutrivida';
  }, []);

  return (
    <>
      <Header cantidad={cantidad} />

      <div className="bg-img"></div>

      <main id="contenido">
        <Seccion id="Inicio" titulo="Bienvenidos a la Clinica Nutricional Nutrivida">
          <p>NutriVida es una clínica de nutrición y dietética fundada en 2016 en Temuco, Región de La Araucanía.</p>
          <p>Está formada por 4 nutricionistas que atienden pacientes con distintos objetivos: pérdida de peso, control de enfermedades metabólicas, nutrición deportiva y alimentación vegetariana o vegana.</p>
          <p>Ofrecemos servicios y productos de nutrición para mejorar tu salud y bienestar.</p>
        </Seccion>

        <Seccion id="Ofrecemos" titulo="Te ofrecemos">
          <ul className="ofrecemos-contenedor">
            <li className="ofrecemos-item">
              <h3>Productos y Suplementos Naturales</h3>
              <p>Descubre nuestra amplia selección de productos y suplementos naturales para complementar tu dieta y mejorar tu salud.</p>
            </li>
            <li className="ofrecemos-item">
              <h3>Planes Saludables</h3>
              <p>Agenda de forma facil y rapida cita con uno de nuestro nutricionistas.</p>
              <p>Planea tu rutina nutricional con nuestros expertos y ten un seguimiento dia a dia.</p>
            </li>
          </ul>
        </Seccion>

        <Seccion id="album" titulo="¿Qué estas buscando?">
          <Galeria 
            datos={queBuscas} 
            className="tipo" 
            tarjetaClassName="tarjeta" 
          />
        </Seccion>

        <Seccion id="Popular" titulo="Best Sellers">
          <p>Conoce nuestros productos más populares y destaca en tu rutina diaria.</p>
          <Galeria 
            datos={bestSellers} 
            className="bestsellers-grid" 
            tarjetaClassName="tarjeta-bestseller" 
          />
          <div className="ver-todos-container">
            <Link to="/productos" className="btn-ver-todos">VER TODOS</Link>
          </div>
        </Seccion>

        <Seccion id="Nutricionista">
          <div className="nutri-video">
            <video controls autoPlay muted loop preload="metadata">
              <source src="/nutricionista.mp4" type="video/mp4" />
              <source src="/nutricionista.ogg" type="video/ogg" />
              Tu navegador no soporta el video.
            </video>
          </div>

          <div className="nutri-texto">
            <h2>Servicio de Salud</h2>
            <p>No te olvides de cuidar tu salud con nuestra asistencia profesional.</p>
            <p>Contamos con nutricionistas especializados que te guiarán en tu camino hacia una vida más saludable.</p>
            <p>Pide cita ahora mismo.</p>
            <div className="ver-agendar-container">
              <Link to="/agendar" className="btn-agendar">AGENDAR HORA</Link>
            </div>
          </div>
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Inicio;