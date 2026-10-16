import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import AsistenteReserva from '../components/AsistenteReserva';
import InfoGeneral from '../components/InfoGeneral';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
function Agendar({ cantidad }) {
  // Título de la pestaña: el original tenía uno propio para esta página.
  useEffect(() => {
    document.title = 'Agendar Cita - Nutrivida';
  }, []);

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion id="agendar-intro" titulo="Reserva tu Cita Nutricional">
          <p>Agenda en pocos pasos una hora con el especialista más adecuado para tu objetivo. Elige a tu nutricionista, escoge el día y horario que más te acomode, y confirma tus datos.</p>
        </Seccion>

        {/* El asistente trae el indicador de pasos y los 3 paneles; aquí solo se envuelve en su sección. */}
        <Seccion>
          <AsistenteReserva />
        </Seccion>

        <Seccion titulo="¿Cómo funciona tu cita?">
          <InfoGeneral />
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Agendar;
