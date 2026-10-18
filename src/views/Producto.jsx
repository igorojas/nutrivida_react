import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import Galeria from '../components/Galeria';
import DetalleProducto from '../components/DetalleProducto';
import Error404 from './Error404';

import { productos } from '../data/productos';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
// 'onAnadir' es la función de App que suma al carrito; DetalleProducto la usa con la cantidad elegida.
function Producto({ cantidad, onAnadir }) {
  // useParams lee el parámetro ':id' de la ruta /producto/:id (llega como texto, ej. "3").
  const { id } = useParams();

  // Number('3') da 3 y Number('3abc') da NaN, así que un id mal escrito no coincide con ningún producto.
  // Si el id no existe (producto queda undefined) más abajo se muestra la página 404.
  const producto = productos.find((p) => p.id === Number(id));

  // Título de la pestaña según el producto ("Nombre - NutriVida"); se actualiza al cambiar de producto.
  // Va antes del 'return' condicional porque los hooks siempre deben ejecutarse en el mismo orden;
  // si no hay producto, el título lo pone la página 404.
  useEffect(() => {
    if (producto) document.title = `${producto.nombre} - NutriVida`;
  }, [producto]);

  // Id inválido: página 404 (la dirección de la barra no cambia).
  if (!producto) {
    return <Error404 cantidad={cantidad} />;
  }

  // Relacionados: los primeros 4 productos distintos al actual.
  const relacionados = productos.filter((p) => p.id !== producto.id).slice(0, 4);

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <p className="migas"> <span id="categoria-producto">{producto.categoria}</span></p>

        {/* key={producto.id} reinicia cantidad, aviso e imagen activa al pasar a otro producto desde los relacionados */}
        <Seccion className="seccion producto-detalle">
          <DetalleProducto key={producto.id} producto={producto} onAnadir={onAnadir} />
        </Seccion>

        <Seccion>
          <h3>Productos relacionados</h3>
          <Galeria
            datos={relacionados}
            className="relacionados-grid"
            tarjetaClassName="relacionado-tarjeta"
          />
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Producto;