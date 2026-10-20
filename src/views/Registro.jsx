import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormularioRegistro from '../components/FormularioRegistro';
import { obtenerSesion } from '../utils/sesion';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Registro({ cantidad }) {
  // Título de la pestaña: el original tenía uno propio para esta página.
  useEffect(() => {
    document.title = 'Registro de Usuario';
  }, []);

  // Con sesión iniciada esta página no se puede abrir: se manda a Mi Perfil ('replace' evita dejarla en el historial).
  // Va después del useEffect porque los hooks siempre deben ejecutarse en el mismo orden.
  if (obtenerSesion()) {
    return <Navigate to="/perfil" replace />;
  }

  return (
    <>
      <Header cantidad={cantidad} />

      {/* Igual que el original, el formulario va directo dentro del main, sin <Seccion>. */}
      <main id="contenido">
        <FormularioRegistro />
      </main>

      <Footer />
    </>
  );
}

export default Registro;
