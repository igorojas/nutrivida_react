// Botones Anterior y Siguiente que se repiten en los 3 pasos de Agendar.
// Cada botón aparece solo si recibe su función: el paso 1 solo tiene Siguiente y el paso 3 solo Anterior.
// siguienteDeshabilitado bloquea Siguiente hasta que el usuario haya elegido lo necesario en ese paso.
function BotonesPaso({ onAnterior, onSiguiente, siguienteDeshabilitado = false }) {
  return (
    // Sin botón Anterior (paso 1), Siguiente va a la derecha: mismo style en línea del HTML original.
    <div className="paso-botones" style={onAnterior ? undefined : { justifyContent: 'flex-end' }}>
      {onAnterior && (
        <button type="button" className="btn-anterior" onClick={onAnterior}>
          Anterior
        </button>
      )}
      {onSiguiente && (
        <button type="button" className="btn-siguiente" onClick={onSiguiente} disabled={siguienteDeshabilitado}>
          Siguiente
        </button>
      )}
    </div>
  );
}

export default BotonesPaso;
