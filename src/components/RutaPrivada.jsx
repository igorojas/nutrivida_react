import { Navigate } from 'react-router-dom';
import { obtenerSesion } from '../utils/sesion';

// Protege una página: solo deja ver su contenido (children) al administrador con sesión iniciada.
// Si no hay sesión o el rol no es admin, redirige a /login. 'replace' evita que la página bloqueada
// quede en el historial del navegador (al volver atrás no se regresa a ella).
// Uso en App.jsx: <Route path='/admin' element={<RutaPrivada><Admin /></RutaPrivada>} />
function RutaPrivada({ children }) {
  const sesion = obtenerSesion();

  if (!sesion || sesion.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivada;
