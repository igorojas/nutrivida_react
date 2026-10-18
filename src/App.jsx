import { useState } from 'react'
// Routes: contenedor de todas las rutas de la aplicación.
// Route: vincula una ruta especifica (path) con su vista (element).
import { Routes, Route } from 'react-router-dom'
// Estilos globales: App.css es el style.css original (header, nav, footer, secciones).
import './App.css'
import './assets/styles/Inicio_Style.css'
import 'font-awesome/css/font-awesome.min.css'

// Estilos de cada página. En React, un CSS importado queda activo en TODA la aplicación, no solo en su página.
import './assets/styles/Productos_Style.css'
import './assets/styles/Login_Style.css'
import './assets/styles/Registro_Style.css'
import './assets/styles/Agendar_Style.css'
import './assets/styles/Perfil_Style.css'
import './assets/styles/Carrito_Style.css'
import './assets/styles/Admin_Style.css'
import './assets/styles/Error404_Style.css'

// Vistas (una por página).
import Inicio from './views/Inicio.jsx'
import Productos from './views/Productos.jsx'
import Producto from './views/Producto.jsx'
import Login from './views/Login.jsx'
import Registro from './views/Registro.jsx'
import Agendar from './views/Agendar.jsx'
import Perfil from './views/Perfil.jsx'
import Carrito from './views/Carrito.jsx'
import Admin from './views/Admin.jsx'
import Error404 from './views/Error404.jsx'
import RutaPrivada from './components/RutaPrivada.jsx'

import { obtenerCantidadCarrito, agregarAlCarrito } from './utils/carrito'

// Componente principal para definir las rutas y vistas de la aplicación
function App() {
  // Total de productos del carrito. Vive aquí (en App) porque lo necesitan a la vez el Header,
  // que lo muestra, y los botones "Añadir", que lo suben; y esos dos no son padre e hijo.
  // Parte con el valor guardado en localStorage para que no se pierda al recargar la página.
  const [cantidadCarrito, setCantidadCarrito] = useState(obtenerCantidadCarrito)

  // Función que reciben las tarjetas y el detalle como 'onAnadir'.
  // Suma al carrito (localStorage) y actualiza el estado con el nuevo total, así el Header se redibuja.
  // La tarjeta del catálogo suma 1 (cantidad por defecto); el detalle envía la cantidad elegida.
  // Se guarda el id del producto para que la página Carrito sepa qué se añadió.
  const agregar = (producto, cantidad = 1) => {
    setCantidadCarrito(agregarAlCarrito(producto.id, cantidad))
  }

  // Carrito la llama al quitar un producto o comprar, y Admin al eliminar un producto del catálogo: vuelve a leer el total guardado y actualiza el Header.
  const actualizarCantidad = () => setCantidadCarrito(obtenerCantidadCarrito())

  // Cada vista recibe 'cantidad' y se la pasa a su <Header cantidad={cantidad} />.
  return (
    <Routes>
      <Route path='/' element={<Inicio cantidad={cantidadCarrito} />} />
      {/* Productos y Producto además reciben 'onAnadir' para los botones de añadir al carrito. */}
      <Route path='/productos' element={<Productos cantidad={cantidadCarrito} onAnadir={agregar} />} />
      {/* ':id' es un parámetro dinámico: la vista Producto lo lee con useParams() para saber qué producto mostrar (/producto/3). */}
      <Route path='/producto/:id' element={<Producto cantidad={cantidadCarrito} onAnadir={agregar} />} />
      <Route path='/login' element={<Login cantidad={cantidadCarrito} />} />
      <Route path='/registro' element={<Registro cantidad={cantidadCarrito} />} />
      <Route path='/agendar' element={<Agendar cantidad={cantidadCarrito} />} />
      <Route path='/perfil' element={<Perfil cantidad={cantidadCarrito} />} />
      <Route path='/carrito' element={<Carrito cantidad={cantidadCarrito} onCambio={actualizarCantidad} />} />
      {/* RutaPrivada: solo el administrador con sesión entra; los demás van a /login. */}
      <Route path='/admin' element={<RutaPrivada><Admin cantidad={cantidadCarrito} onCambio={actualizarCantidad} /></RutaPrivada>} />
      {/* '*' atrapa cualquier dirección que no coincida con las rutas de arriba: por eso va al final. */}
      <Route path='*' element={<Error404 cantidad={cantidadCarrito} />} />
    </Routes>
  )
}

export default App