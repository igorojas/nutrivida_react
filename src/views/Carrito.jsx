import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import ItemCarrito from '../components/ItemCarrito';
import ResumenCarrito from '../components/ResumenCarrito';

import { productos } from '../data/productos';
import { obtenerCarrito, quitarDelCarrito, vaciarCarrito } from '../utils/carrito';
import { obtenerSesion } from '../utils/sesion';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
// 'onCambio' es la función de App que vuelve a leer el total del carrito para actualizar ese contador.
function Carrito({ cantidad, onCambio }) {
  // Lista guardada en localStorage: [{ id, cantidad }].
  const [items, setItems] = useState(obtenerCarrito);

  useEffect(() => {
    document.title = 'Carrito de Compras - Nutrivida';
  }, []);

  // Une cada item con los datos de su producto; si un producto ya no existe (lo borró el admin), se omite.
  const lineas = items
    .map((item) => ({ producto: productos.find((p) => p.id === item.id), cantidad: item.cantidad }))
    .filter((linea) => linea.producto);

  const total = lineas.reduce((suma, { producto, cantidad }) => suma + producto.precio * cantidad, 0);

  const quitar = (id) => {
    setItems(quitarDelCarrito(id));
    onCambio();
  };

  // El botón es solo estético: pide sesión, avisa que la compra se hizo y deja el carrito vacío.
  const comprar = () => {
    if (!obtenerSesion()) return alert('Debes iniciar sesión para poder comprar.');
    if (lineas.length === 0) return alert('Tu carrito está vacío.');

    alert('¡Compra realizada con éxito! Gracias por tu compra.');
    vaciarCarrito();
    setItems([]);
    onCambio();
  };

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion id="carrito" titulo="Carrito de Compras">
          <div className="carrito-layout">
            <div className="carrito-lista">
              {lineas.length === 0 ? (
                <div className="carrito-vacio">
                  <p>Tu carrito está vacío.</p>
                  <Link to="/productos" className="btn-ver-todos">VER CATÁLOGO</Link>
                </div>
              ) : (
                lineas.map(({ producto, cantidad }) => (
                  <ItemCarrito key={producto.id} producto={producto} cantidad={cantidad} onQuitar={quitar} />
                ))
              )}
            </div>

            <ResumenCarrito lineas={lineas} total={total} onComprar={comprar} />
          </div>
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Carrito;
