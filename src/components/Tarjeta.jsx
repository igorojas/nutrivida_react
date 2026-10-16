import { Link } from 'react-router-dom';
import { formatoPrecio } from '../utils/formatoPrecio';

// Tarjeta genérica: sirve para categorías, Best Sellers y productos relacionados.
// El tipo de tarjeta lo define tarjetaClassName: 'tarjeta', 'tarjeta-bestseller' o 'relacionado-tarjeta'.
function Tarjeta({ item, tarjetaClassName = 'tarjeta' }) {
  const esBestseller = tarjetaClassName === 'tarjeta-bestseller';
  const esRelacionado = tarjetaClassName === 'relacionado-tarjeta';

  // Acepta los dos formatos de datos: queBuscas.js (titulo, imagen) y productos.js (nombre, imagenes).
  const titulo = item.titulo ?? item.nombre;
  const imagen = item.imagen ?? item.imagenes?.[0];
  // En productos.js el precio es un número y se formatea; si ya viene como texto se deja igual.
  const precio = typeof item.precio === 'number' ? formatoPrecio(item.precio) : item.precio;

  // Relacionados: toda la tarjeta es un enlace al detalle del producto (ruta /producto/:id).
  if (esRelacionado) {
    return (
      <Link to={`/producto/${item.id}`} className={tarjetaClassName}>
        <img src={imagen} alt={titulo} />
        <h4>{titulo}</h4>
        <p>{precio}</p>
      </Link>
    );
  }

  return (
    <article className={tarjetaClassName}>
      <div className={esBestseller ? 'espacio-imagen-bestseller' : 'espacio-imagen'}>
        {/* estiloImagen es opcional: reproduce el style en línea del HTML original (ej. Despensa con borderRadius 4px) */}
        <img src={imagen} alt={titulo} style={item.estiloImagen} />
      </div>
      <h3 className={esBestseller ? 'bestseller-titulo' : ''}>{titulo}</h3>

      {/* Muestra la descripción solo si existe en los datos y la tarjeta no es de Best Sellers
          (en el original esas tarjetas solo llevan imagen, título y precio, aunque el producto tenga descripción) */}
      {!esBestseller && item.descripcion && <p>{item.descripcion}</p>}

      {/* Muestra el precio solo si existe en los datos */}
      {precio && <p className="bestseller-precio">{precio}</p>}
    </article>
  );
}

export default Tarjeta;
