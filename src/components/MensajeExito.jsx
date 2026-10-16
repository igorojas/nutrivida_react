// Confirmación que reemplaza al formulario cuando la cita se agenda con éxito.
// nombre: persona que agendó. onNuevaCita: reinicia el agendamiento desde el paso 1.
function MensajeExito({ nombre, onNuevaCita }) {
  return (
    <div className="mensaje-exito">
      <i className="fa fa-check-circle"></i>
      <h3>¡Cita agendada con éxito!</h3>
      <p>
        Gracias <span>{nombre}</span>, hemos registrado tu hora. Te contactaremos para confirmar los detalles antes de tu cita.
      </p>
      <button type="button" className="btn-nueva-cita" onClick={onNuevaCita}>
        Agendar otra cita
      </button>
    </div>
  );
}

export default MensajeExito;
