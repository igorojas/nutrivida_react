// Contador del carrito. Funciona igual que carrito.js del HTML original:
// guarda en localStorage un solo número con el total de unidades añadidas.
// localStorage guarda datos en el navegador y se conservan aunque se recargue o se cambie de página.
const CLAVE = 'carritoCantidad';

// Devuelve cuántas unidades hay en el carrito (0 si aún no se ha guardado nada).
export function obtenerCantidadCarrito() {
  return parseInt(localStorage.getItem(CLAVE)) || 0;
}

// Suma 'cantidad' al total guardado y devuelve el nuevo total,
// para que quien la llame pueda actualizar el contador que se muestra en pantalla.
export function agregarAlCarrito(cantidad) {
  const nuevaCantidad = obtenerCantidadCarrito() + cantidad;
  localStorage.setItem(CLAVE, nuevaCantidad);
  return nuevaCantidad;
}
