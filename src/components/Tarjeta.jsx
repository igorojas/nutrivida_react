// Renderiza un cuadro individual para categorías o productos
function Tarjeta({ item, tarjetaClassName = 'tarjeta' }) {
  // Define si la tarjeta es de tipo bestseller para ajustar las clases del CSS
  const esBestseller = tarjetaClassName === 'tarjeta-bestseller';

  return (
    <article className={tarjetaClassName}>
      <div className={esBestseller ? 'espacio-imagen-bestseller' : 'espacio-imagen'}>
        <img src={item.imagen} alt={item.titulo} />
      </div>
      <h3 className={esBestseller ? 'bestseller-titulo' : ''}>{item.titulo}</h3>

      {/* Muestra la descripción solo si existe en los datos */}
      {item.descripcion && <p>{item.descripcion}</p>}

      {/* Muestra el precio solo si existe en los datos */}
      {item.precio && <p className="bestseller-precio">{item.precio}</p>}
    </article>
  );
}

export default Tarjeta;