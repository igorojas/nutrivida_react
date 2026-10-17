import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormularioInicioSesion from '../components/FormularioInicioSesion';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Login({ cantidad }) {
  // Título de la pestaña: el original tenía uno propio para esta página.
  useEffect(() => {
    document.title = 'Inicio de Sesión';
  }, []);

  return (
    <>
      <Header cantidad={cantidad} />

      {/* Igual que el original, el formulario va directo dentro del main, sin <Seccion>. */}
      <main id="contenido">
        <FormularioInicioSesion />
      </main>

      <Footer />
    </>
  );
}

export default Login;
