import { formatoPrecio } from '../utils/formatoPrecio';

// Una fila del carrito: imagen, datos del producto, subtotal y botón para quitarlo.
// onQuitar(id) la define la view (Carrito).
function ItemCarrito({ producto, cantidad, onQuitar }) {
  return (
    <article className="carrito-item">
      <img src={producto.imagenes[0]} alt={producto.nombre} />
      <div className="carrito-info">
        <p>{producto.categoria}</p>
        <h3>{producto.nombre}</h3>
        <p>{formatoPrecio(producto.precio)} c/u · Cantidad: {cantidad}</p>
      </div>
      <div className="carrito-lado">
        <p className="carrito-subtotal">{formatoPrecio(producto.precio * cantidad)}</p>
        <button type="button" className="btn-carrito-quitar" onClick={() => onQuitar(producto.id)}>
          Quitar
        </button>
      </div>
    </article>
  );
}

export default ItemCarrito;
