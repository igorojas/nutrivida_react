import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import FichaPerfil from '../components/FichaPerfil';
import { obtenerSesion, cerrarSesion } from '../utils/sesion';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Perfil({ cantidad }) {
  const navigate = useNavigate();

  // Título de la pestaña. Va antes del 'return' condicional de abajo porque los hooks siempre deben ejecutarse en el mismo orden.
  useEffect(() => {
    document.title = 'Mi Perfil - Nutrivida';
  }, []);

  // Los datos salen de la sesión guardada al iniciar sesión (utils/sesion.js), no de un objeto fijo.
  const sesion = obtenerSesion();

  // Sin sesión no hay perfil que mostrar: se manda a /login ('replace' evita que esta página quede en el historial).
  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  // Cierra la sesión (borra lo guardado en localStorage) y manda a /login, donde el Header ya muestra "Iniciar Sesión".
  const salir = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion id="perfil" titulo="Mi Perfil">
          <FichaPerfil usuario={sesion} onCerrarSesion={salir} />
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Perfil;
