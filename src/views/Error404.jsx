import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';

// Página que se muestra cuando la dirección no existe (ruta '*' en App.jsx) o cuando el id de
// /producto/:id no corresponde a ningún producto (la view Producto la muestra en ese caso).
// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Error404({ cantidad }) {
  // Título de la pestaña propio de esta página.
  useEffect(() => {
    document.title = 'Página no encontrada - Nutrivida';
  }, []);

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion id="error404">
          <div className="error404-contenido">
            <p className="error404-codigo">404</p>
            <h2>Página no encontrada</h2>
            <p className="error404-texto">
              La página que buscas no existe o fue movida. Revisa la dirección o vuelve al inicio para seguir navegando.
            </p>
            <Link to="/" className="btn-error404">Volver al Inicio</Link>
          </div>
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Error404;
