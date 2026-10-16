// Datos de "¿Cómo funciona tu cita?". El título de la sección lo pone <Seccion> en la view.
const items = [
  {
    icono: 'fa fa-clock-o',
    titulo: 'Duración',
    texto: 'Cada sesión dura aproximadamente 45 minutos e incluye evaluación y plan de seguimiento.'
  },
  {
    icono: 'fa fa-map-marker',
    titulo: 'Atención',
    texto: 'Las citas son presenciales en nuestra clínica ubicada en Temuco, Región de La Araucanía.'
  },
  {
    icono: 'fa fa-calendar-check-o',
    titulo: 'Horario de atención',
    texto: 'Lunes a viernes de 09:00 a 18:00 hrs. Sábados solo en la mañana. Domingos no hay atención.'
  },
  {
    icono: 'fa fa-bell',
    titulo: 'Recordatorio',
    texto: 'Te contactaremos por teléfono para confirmar tu hora y resolver cualquier duda antes de tu cita.'
  }
];

function InfoGeneral() {
  return (
    <div className="info-general">
      {items.map((item) => (
        <div key={item.titulo} className="info-item">
          <i className={item.icono}></i>
          <h4>{item.titulo}</h4>
          <p>{item.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default InfoGeneral;
