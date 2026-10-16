import { useState, useEffect } from 'react';
import VisorImagenes from './VisorImagenes';
import CampoFormulario from './CampoFormulario';
import { formatoPrecio } from '../utils/formatoPrecio';

// Bloque principal del detalle: galería a la izquierda e información a la derecha.
// Devuelve las dos columnas sueltas porque van dentro de <Seccion className="seccion producto-detalle"> en la view.
// onAnadir(producto, cantidad) suma al carrito; la define quien usa el componente (la view).
// Al cambiar de producto sin salir de la página, la view debe pasarle key={producto.id} para reiniciar cantidad y mensaje.
function DetalleProducto({ producto, onAnadir }) {
  // Valor del campo "Cantidad" (texto, porque así lo entrega el <input>).
  const [cantidad, setCantidad] = useState(1);
  // Aviso del último "Añadir": { unidades }; null = sin mensaje. Se guarda como objeto nuevo en cada clic
  // para que el aviso de 2 segundos se reinicie aunque se añada la misma cantidad dos veces seguidas.
  const [aviso, setAviso] = useState(null);

  // Cuando hay un aviso se programa su borrado a los 2 segundos; el return limpia el temporizador si cambia o se desmonta.
  useEffect(() => {
    if (aviso === null) return;
    const temporizador = setTimeout(() => setAviso(null), 2000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  const manejarClic = () => {
    // Igual que el original: si el campo está vacío o no es número, cuenta como 1.
    const unidades = parseInt(cantidad) || 1;
    onAnadir(producto, unidades);
    setAviso({ unidades });
  };

  return (
    <>
      <VisorImagenes imagenes={producto.imagenes} nombre={producto.nombre} hoverSwap={producto.hoverSwap} />

      <div className="info-producto">
        <span className="producto-categoria" id="categoria-badge">{producto.categoria}</span>
        <h2 id="nombre-producto">{producto.nombre}</h2>
        <p className="producto-precio" id="precio-producto">{formatoPrecio(producto.precio)}</p>
        <p id="descripcion-producto">{producto.descripcion}</p>

        {/* Campo con estructura React Bootstrap (Form.Group), igual que los demás formularios; conserva la clase 'cantidad' */}
        <CampoFormulario
          id="cantidad-producto"
          etiqueta="Cantidad:"
          tipo="number"
          className="cantidad"
          min="1"
          max="99"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {/* Un solo <br />: el campo ahora va dentro de un div, que ya corta la línea, y así queda el mismo espacio que el original (dos <br />) */}
        <br />
        {/* Sin clase 'submit': en el original esta página no cargaba el CSS de esa clase (es del registro), así que era el botón normal del navegador */}
        <button id="btn-agregar-carrito" onClick={manejarClic}>Añadir al carrito</button>
        <p id="mensaje-agregado" className="mensaje-agregado">
          {aviso !== null && `Se añadió ${aviso.unidades} producto(s) al carrito.`}
        </p>
      </div>
    </>
  );
}

export default DetalleProducto;
