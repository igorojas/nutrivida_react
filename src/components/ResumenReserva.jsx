// Caja "Resumen de tu reserva" del paso 3. Si falta un dato muestra "-".
function ResumenReserva({ nutricionista, fecha, hora }) {
  const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };

  return (
    <div className="resumen-caja">
      <h4>Resumen de tu reserva</h4>
      <div className="resumen-linea">
        <span>Nutricionista</span>
        <span>{nutricionista ? `${nutricionista.nombre} · ${nutricionista.especialidad}` : '-'}</span>
      </div>
      <div className="resumen-linea">
        <span>Fecha</span>
        <span>{fecha ? fecha.toLocaleDateString('es-CL', opcionesFecha) : '-'}</span>
      </div>
      <div className="resumen-linea">
        <span>Hora</span>
        <span>{hora ? `${hora} hrs` : '-'}</span>
      </div>
    </div>
  );
}

export default ResumenReserva;
