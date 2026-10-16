import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import Galeria from '../components/Galeria';

import { productos } from '../data/productos';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
// 'onAnadir' es la función de App que suma un producto al carrito; la Galería se la entrega a cada tarjeta.
function Productos({ cantidad, onAnadir }) {
  // Título de la pestaña: el original tenía uno propio para esta página.
  useEffect(() => {
    document.title = 'Catálogo de Compras';
  }, []);

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion>
          <h2>Catálogo de Compras</h2>
          <p>Conoce nuestros productos naturales para complementar tu alimentación diaria.</p>
        </Seccion>

        {/* Igual que el original, la grilla va fuera de la sección. Dibuja una TarjetaCatalogo por producto. */}
        <Galeria
          datos={productos}
          className="productos-grid"
          tarjetaClassName="producto-tarjeta"
          onAnadir={onAnadir}
        />
      </main>

      <Footer />
    </>
  );
}

export default Productos;