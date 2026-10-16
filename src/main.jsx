import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// React Bootstrap se usa en los formularios (estructura de los componentes: Form, Form.Group, Form.Control...),
// pero NO se importa su CSS: bootstrap.min.css trae un reset global (interlineado, títulos, párrafos, imágenes,
// botones, casillas y foco azul) que chocaría con los CSS originales de Login, Registro y Agendar y cambiaría
// el aspecto de todas las páginas.
// Por eso las dos librerías se instalan siempre (npm install react-bootstrap bootstrap): react-bootstrap aporta la
// estructura de los formularios, y el estilo lo dan los CSS originales (Login_Style.css, Registro_Style.css y
// Agendar_Style.css). Si algún día se activara su CSS, se importaría aquí, antes de App, para que App.css quede
// después y tenga prioridad.
// import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
// BrowserRouter habilita la navegación entre páginas sin recargar; debe envolver a toda la App.
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
