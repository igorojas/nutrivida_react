// Tarjeta del paso 1 de Agendar: portada, foto redonda, especialidad, biografía y experiencia.
// 'seleccionada' agrega la clase del CSS que resalta la tarjeta; onSeleccionar recibe el id al hacer clic.
function TarjetaNutricionista({ nutricionista, seleccionada, onSeleccionar }) {
  return (
    <article
      className={`nutri-tarjeta${seleccionada ? ' seleccionada' : ''}`}
      onClick={() => onSeleccionar(nutricionista.id)}
    >
      <div className="nutri-tarjeta-imagen">
        <img src={nutricionista.imagen} alt={nutricionista.especialidad} />
        <img className="nutri-foto" src={nutricionista.foto} alt={nutricionista.nombre} />
      </div>
      <div className="nutri-tarjeta-info">
        <h3>{nutricionista.nombre}</h3>
        <p className="nutri-especialidad">{nutricionista.especialidad}</p>
        <p className="nutri-bio">{nutricionista.bio}</p>
        <p className="nutri-experiencia">
          <i className="fa fa-check-circle"></i> {nutricionista.experiencia}
        </p>
      </div>
    </article>
  );
}

export default TarjetaNutricionista;
