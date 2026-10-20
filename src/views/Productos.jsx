import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import Galeria from '../components/Galeria';
import BuscadorProductos from '../components/BuscadorProductos';
import FiltroCategoria from '../components/FiltroCategoria';
import FiltroFavoritos from '../components/FiltroFavoritos';

import { productos } from '../data/productos';
import { normalizarTexto } from '../utils/normalizarTexto';
import { obtenerFavoritos, alternarFavorito } from '../utils/favoritos';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
// 'onAnadir' es la función de App que suma un producto al carrito; la Galería se la entrega a cada tarjeta.
function Productos({ cantidad, onAnadir }) {
  // Título de la pestaña: el original tenía uno propio para esta página.
  useEffect(() => {
    document.title = 'Catálogo de Compras';
  }, []);

  // texto = lo escrito en el buscador. categoria = la elegida en el select ('' = todas).
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('');
  // favoritos = ids de los productos marcados con el corazón (parte de lo guardado en localStorage).
  // soloFavoritos = true cuando la casilla "Solo favoritos" está marcada.
  const [favoritos, setFavoritos] = useState(obtenerFavoritos);
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  // Marca o desmarca el producto y guarda en el estado la lista nueva que devuelve alternarFavorito.
  const alternar = (producto) => setFavoritos(alternarFavorito(producto.id));

  // Las categorías se sacan de los productos en cada render (Set quita las repetidas),
  // así, si el Panel agrega o elimina productos, el select siempre refleja el catálogo actual.
  const categorias = [...new Set(productos.map((producto) => producto.categoria))];

  // Un producto se muestra si su nombre contiene el texto buscado y, si hay categoría elegida, es de esa categoría.
  const busqueda = normalizarTexto(texto);
  const filtrados = productos.filter(
    (producto) =>
      normalizarTexto(producto.nombre).includes(busqueda) &&
      (categoria === '' || producto.categoria === categoria) &&
      (!soloFavoritos || favoritos.includes(producto.id))
  );

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion>
          <h2>Catálogo de Compras</h2>
          <p>Conoce nuestros productos naturales para complementar tu alimentación diaria.</p>
          <div className="filtros-barra">
            <BuscadorProductos valor={texto} onCambio={setTexto} />
            <FiltroCategoria categorias={categorias} valor={categoria} onCambio={setCategoria} />
            <FiltroFavoritos valor={soloFavoritos} onCambio={setSoloFavoritos} />
          </div>
        </Seccion>

        {/* Igual que el original, la grilla va fuera de la sección. Dibuja una TarjetaCatalogo por producto. */}
        {filtrados.length > 0 ? (
          <Galeria
            datos={filtrados}
            className="productos-grid"
            tarjetaClassName="producto-tarjeta"
            onAnadir={onAnadir}
            favoritos={favoritos}
            onFavorito={alternar}
          />
        ) : (
          <p className="filtros-vacio">No se encontraron productos.</p>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Productos;