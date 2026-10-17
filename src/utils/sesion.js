// Sesión del usuario. Igual que carrito.js, usa localStorage: guarda datos en el navegador
// y se conservan aunque se recargue o se cambie de página, hasta que se cierre la sesión.
const CLAVE = 'sesionUsuario';

// Guarda la sesión del usuario que inició sesión y devuelve lo guardado.
// Se guardan sus datos de perfil y su rol, pero NUNCA la contraseña.
export function guardarSesion(usuario) {
  const { contrasenia, ...datos } = usuario; // 'datos' es el usuario sin la contraseña
  localStorage.setItem(CLAVE, JSON.stringify(datos));
  return datos;
}

// Devuelve los datos del usuario con sesión iniciada, o null si no hay sesión.
export function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE));
  } catch {
    // Si el texto guardado estuviera dañado, se trata como "sin sesión".
    return null;
  }
}

// Cierra la sesión borrando lo guardado.
export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
}
