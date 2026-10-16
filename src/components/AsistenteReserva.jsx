import { useState } from 'react';
import IndicadorPasos from './IndicadorPasos';
import TarjetaNutricionista from './TarjetaNutricionista';
import Calendario from './Calendario';
import Horarios from './Horarios';
import FormularioCita from './FormularioCita';
import MensajeExito from './MensajeExito';
import BotonesPaso from './BotonesPaso';
import { nutricionistas } from '../data/nutricionistas';

// Asistente de 3 pasos para agendar una cita. Aquí vive todo el estado de la reserva;
// los componentes hijos solo muestran datos y avisan lo que el usuario elige.
// Devuelve el indicador y los 3 paneles: la view lo pone dentro de <Seccion>.
function AsistenteReserva() {
  const [paso, setPaso] = useState(1);
  const [nutricionista, setNutricionista] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  // Nombre de quien agendó; null = aún no se confirma (se muestra el formulario).
  const [nombreExito, setNombreExito] = useState(null);

  // Al cambiar de nutricionista se pierde la fecha y hora elegidas, como en el original.
  const seleccionarNutricionista = (id) => {
    setNutricionista(nutricionistas.find((n) => n.id === id));
    setFecha(null);
    setHora(null);
  };

  // Al elegir otro día se borra la hora.
  const seleccionarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setHora(null);
  };

  const reiniciar = () => {
    setPaso(1);
    setNutricionista(null);
    setFecha(null);
    setHora(null);
    setNombreExito(null);
  };

  // Los 3 paneles siempre existen; solo el del paso actual lleva la clase 'activo' (el CSS oculta los demás).
  // Así el calendario y el formulario conservan lo escrito al volver atrás, como el original.
  const clasePanel = (numero) => `paso-panel${paso === numero ? ' activo' : ''}`;

  return (
    <>
      <IndicadorPasos pasoActual={paso} />

      {/* PASO 1: nutricionista. Siguiente se habilita al elegir una */}
      <div className={clasePanel(1)}>
        <h3 className="paso-titulo">Elige a tu nutricionista</h3>
        <p className="paso-nota">Cada especialista atiende un área distinta de la nutrición. Selecciona una tarjeta para continuar.</p>

        <div className="nutri-lista">
          {nutricionistas.map((n) => (
            <TarjetaNutricionista
              key={n.id}
              nutricionista={n}
              seleccionada={nutricionista?.id === n.id}
              onSeleccionar={seleccionarNutricionista}
            />
          ))}
        </div>

        <BotonesPaso onSiguiente={() => setPaso(2)} siguienteDeshabilitado={!nutricionista} />
      </div>

      {/* PASO 2: fecha y hora. Siguiente se habilita solo cuando hay hora elegida */}
      <div className={clasePanel(2)}>
        <h3 className="paso-titulo">Elige fecha y horario</h3>
        <p className="paso-nota">La clínica no atiende los domingos. Los sábados la atención es solo en horario de mañana.</p>

        <div className="paso2-layout">
          <Calendario fechaSeleccionada={fecha} onSeleccionar={seleccionarFecha} />
          <Horarios fecha={fecha} horaSeleccionada={hora} onSeleccionar={setHora} />
        </div>

        <BotonesPaso onAnterior={() => setPaso(1)} onSiguiente={() => setPaso(3)} siguienteDeshabilitado={!hora} />
      </div>

      {/* PASO 3: datos y confirmación. Al confirmar, el formulario se reemplaza por el mensaje de éxito */}
      <div className={clasePanel(3)}>
        <h3 className="paso-titulo">Confirma tu cita</h3>
        <p className="paso-nota">Completa tus datos para que el equipo de NutriVida pueda contactarte antes de tu cita.</p>

        {nombreExito === null ? (
          <FormularioCita nutricionista={nutricionista} fecha={fecha} hora={hora} onConfirmar={setNombreExito} />
        ) : (
          <MensajeExito nombre={nombreExito} onNuevaCita={reiniciar} />
        )}

        <BotonesPaso onAnterior={() => setPaso(2)} />
      </div>
    </>
  );
}

export default AsistenteReserva;
