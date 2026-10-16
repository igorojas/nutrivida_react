import { useState } from 'react';

const NOMBRES_MES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_SEMANA = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

// Calendario del paso 2. fechaSeleccionada es el día elegido (Date o null) y onSeleccionar recibe la fecha tocada.
// El mes que se está viendo es un estado propio de este componente: nace en el mes actual.
function Calendario({ fechaSeleccionada, onSeleccionar }) {
  // Siempre el día 1 del mes que se muestra.
  const [mes, setMes] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });

  // delta = -1 (mes anterior) o 1 (mes siguiente). Date acomoda solo el cambio de año.
  const cambiarMes = (delta) => setMes(new Date(mes.getFullYear(), mes.getMonth() + delta, 1));

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const diasEnMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  // Casillas vacías antes del día 1 para alinearlo con su día de la semana (0 = domingo).
  const vacios = mes.getDay();

  // Un arreglo con los números de día del mes: [1, 2, ..., diasEnMes]
  const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  return (
    <div className="calendario-columna">
      <div className="calendario-cabecera">
        <button type="button" className="btn-mes" onClick={() => cambiarMes(-1)}><i className="fa fa-chevron-left"></i></button>
        <h4>{NOMBRES_MES[mes.getMonth()]} {mes.getFullYear()}</h4>
        <button type="button" className="btn-mes" onClick={() => cambiarMes(1)}><i className="fa fa-chevron-right"></i></button>
      </div>

      <div className="calendario-dias-semana">
        {DIAS_SEMANA.map((letra, i) => <span key={i}>{letra}</span>)}
      </div>

      <div className="calendario-grid">
        {Array.from({ length: vacios }, (_, i) => <span key={`v${i}`} className="dia-vacio"></span>)}

        {dias.map((dia) => {
          const fecha = new Date(mes.getFullYear(), mes.getMonth(), dia);
          // No se puede agendar en domingo ni en días pasados.
          const deshabilitado = fecha.getDay() === 0 || fecha < hoy;
          const seleccionado = fechaSeleccionada && fecha.getTime() === fechaSeleccionada.getTime();

          return (
            <button
              key={dia}
              type="button"
              className={`dia-boton${deshabilitado ? ' deshabilitado' : ''}${seleccionado ? ' seleccionado' : ''}`}
              disabled={deshabilitado}
              onClick={() => onSeleccionar(fecha)}
            >
              {dia}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendario;
