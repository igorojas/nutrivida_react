// Routes: contenedor de todas las rutas de la aplicación.
// Route: vincula una ruta especifica (path) con su vista (element).
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './assets/styles/Inicio.css'
import 'font-awesome/css/font-awesome.min.css'
import Inicio from './views/Inicio.jsx'

// Componente principal para definir las rutas y vistas de la aplicación
function App() {
  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
    </Routes>
  )
}

export default App