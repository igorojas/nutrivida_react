import { formatoPrecio } from '../utils/formatoPrecio';

// Columna derecha del carrito: detalle de lo que cuesta cada producto, el total y el botón Comprar.
// lineas: [{ producto, cantidad }]. onComprar la define la view (Carrito).
function ResumenCarrito({ lineas, total, onComprar }) {
  return (
    <div className="carrito-resumen">
      <div className="resumen-caja">
        <h4>Resumen de tu compra</h4>
        {lineas.map(({ producto, cantidad }) => (
          <div key={producto.id} className="resumen-linea">
            <span>{producto.nombre} x{cantidad}</span>
            <span>{formatoPrecio(producto.precio * cantidad)}</span>
          </div>
        ))}
        <div className="resumen-linea carrito-total">
          <span>Total</span>
          <span>{formatoPrecio(total)}</span>
        </div>
      </div>
      <button type="button" className="btn-confirmar" onClick={onComprar}>Comprar</button>
    </div>
  );
}

export default ResumenCarrito;
