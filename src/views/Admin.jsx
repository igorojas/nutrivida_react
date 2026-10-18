import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import FormularioProducto from '../components/FormularioProducto';

import { productos } from '../data/productos';
import { formatoPrecio } from '../utils/formatoPrecio';
// Imagen genérica para los productos nuevos (no se suben archivos). Se puede cambiar por otra de assets/img.
import imagenGenerica from '../assets/img/supplements.jpg';

// 'cantidad' es el total del carrito (viene de App) y se lo pasamos al Header para el contador.
// Esta página solo se muestra al administrador: App.jsx la envuelve con <RutaPrivada>.
function Admin({ cantidad }) {
  // Copia del catálogo para que React redibuje la tabla cuando se agregue o elimine un producto.
  const [lista, setLista] = useState([...productos]);

  useEffect(() => {
    document.title = 'Panel de Control - Nutrivida';
  }, []);

  // Los cambios se hacen también sobre 'productos' (el arreglo de data/productos.js) para que el catálogo
  // los muestre al navegar. Todo vive en memoria: al recargar la página se vuelve al catálogo original.
  const agregarProducto = (nuevo) => {
    const id = Math.max(0, ...productos.map((p) => p.id)) + 1;
    productos.push({ id, ...nuevo, imagenes: [imagenGenerica] });
    setLista([...productos]);
    alert('Producto agregado al catálogo.');
  };

  const eliminarProducto = (id) => {
    if (productos.length === 1) return alert('Debe quedar al menos un producto en el catálogo.');
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    productos.splice(productos.findIndex((p) => p.id === id), 1);
    setLista([...productos]);
  };

  // Estadísticas simples del catálogo.
  const categorias = new Set(lista.map((p) => p.categoria)).size;
  const promedio = Math.round(lista.reduce((suma, p) => suma + p.precio, 0) / lista.length);

  return (
    <>
      <Header cantidad={cantidad} />

      <main id="contenido">
        <Seccion id="admin" titulo="Panel de Control">
          <div className="admin-resumen">
            <div className="admin-stat">
              <span className="admin-stat-valor">{lista.length}</span>
              <span className="admin-stat-etiqueta">Productos</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-valor">{categorias}</span>
              <span className="admin-stat-etiqueta">Categorías</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-valor">{formatoPrecio(promedio)}</span>
              <span className="admin-stat-etiqueta">Precio promedio</span>
            </div>
          </div>
        </Seccion>

        <Seccion titulo="Agregar producto">
          <FormularioProducto onAgregar={agregarProducto} />
        </Seccion>

        <Seccion titulo="Productos del catálogo">
          <div className="admin-tabla-contenedor">
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{formatoPrecio(p.precio)}</td>
                    <td>
                      <button type="button" className="btn-admin-eliminar" onClick={() => eliminarProducto(p.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Seccion>
      </main>

      <Footer />
    </>
  );
}

export default Admin;
