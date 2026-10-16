// Barra de pasos de Agendar. pasoActual es 1, 2 o 3.
// El paso actual lleva la clase 'activo' y los anteriores 'completado' (clases del CSS original).
const PASOS = ['Nutricionista', 'Fecha y Hora', 'Confirmación'];

function IndicadorPasos({ pasoActual, pasos = PASOS }) {
  return (
    <div className="pasos-indicador">
      {pasos.map((nombre, index) => {
        const numero = index + 1;
        let clase = 'paso-indicador';
        if (numero === pasoActual) clase += ' activo';
        else if (numero < pasoActual) clase += ' completado';

        return (
          <div key={nombre} className={clase}>
            <span className="paso-numero">{numero}</span> {nombre}
          </div>
        );
      })}
    </div>
  );
}

export default IndicadorPasos;
