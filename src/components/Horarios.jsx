import { obtenerHorarios } from '../utils/obtenerHorarios';

// Columna de horarios del paso 2. 'fecha' es el día elegido (Date o null) y 'horaSeleccionada' la hora elegida.
// onSeleccionar recibe la hora ("09:00") que el usuario toca.
function Horarios({ fecha, horaSeleccionada, onSeleccionar }) {
  // Sin fecha no hay nada que calcular; con fecha, obtenerHorarios devuelve las horas o null (domingo).
  const horarios = fecha ? obtenerHorarios(fecha) : [];

  let texto = 'Selecciona primero un día en el calendario.';
  if (fecha && !horarios) {
    texto = 'Los domingos la clínica permanece cerrada. Elige otro día.';
  } else if (fecha) {
    texto = fecha.getDay() === 6
      ? 'Los sábados la atención es solo en horario de mañana.'
      : 'Horarios disponibles para el día seleccionado:';
  }

  return (
    <div className="horarios-columna">
      <h4>Horarios disponibles</h4>
      <p id="texto-horarios">{texto}</p>
      <div className="horarios-grid">
        {horarios && horarios.map((hora) => (
          <button
            key={hora}
            type="button"
            className={`hora-boton${horaSeleccionada === hora ? ' seleccionada' : ''}`}
            onClick={() => onSeleccionar(hora)}
          >
            {hora}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Horarios;
