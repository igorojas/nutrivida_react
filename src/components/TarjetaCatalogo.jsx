import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatoPrecio } from '../utils/formatoPrecio';

// Tarjeta del catálogo: enlace al detalle, categoría, descripción, precio y botón Añadir.
// onAnadir es la función que suma el producto al carrito; la define quien usa la tarjeta (la view).
function TarjetaCatalogo({ producto, onAnadir }) {
  // anadido = true muestra "Añadido ✓" durante 1 segundo, igual que el original.
  const [anadido, setAnadido] = useState(false);

  // Cuando anadido pasa a true se programa su vuelta a false; el return limpia el temporizador si la tarjeta se desmonta.
  useEffect(() => {
    if (!anadido) return;
    const temporizador = setTimeout(() => setAnadido(false), 1000);
    return () => clearTimeout(temporizador);
  }, [anadido]);

  const manejarClic = () => {
    onAnadir(producto);
    setAnadido(true);
  };

  return (
    <article className="producto-tarjeta">
      <Link to={`/producto/${producto.id}`} className="producto-link">
        <div className="producto-imagen">
          <img src={producto.imagenes[0]} alt={producto.nombre} />
        </div>
        <div className="producto-info">
          <span className="producto-categoria">{producto.categoria}</span>
          <h3>{producto.nombre}</h3>
          <p className="producto-descripcion">{producto.descripcion}</p>
        </div>
      </Link>
      <div className="producto-pie">
        <p className="producto-precio">{formatoPrecio(producto.precio)}</p>
        <button className="btn-agregar" onClick={manejarClic}>
          {anadido ? 'Añadido ✓' : 'Añadir'}
        </button>
      </div>
    </article>
  );
}

export default TarjetaCatalogo;
