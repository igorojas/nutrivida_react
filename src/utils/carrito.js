// Carrito de compras. Guarda en localStorage una lista de { id, cantidad }:
// el id del producto y cuántas unidades se añadieron. Así la página Carrito puede mostrar cada producto.
// localStorage guarda datos en el navegador y se conservan aunque se recargue o se cambie de página.
const CLAVE = 'carritoItems';

// Devuelve la lista del carrito (vacía si aún no hay nada o si lo guardado está dañado).
export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

// Total de unidades del carrito (es el número que muestra el Header).
export function obtenerCantidadCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

// Suma 'cantidad' unidades del producto 'id' (si ya estaba, aumenta su cantidad) y devuelve el nuevo total de unidades.
export function agregarAlCarrito(id, cantidad) {
  const items = obtenerCarrito();
  const unidades = cantidad < 1 ? 1 : cantidad;
  const existente = items.find((item) => item.id === id);

  if (existente) {
    existente.cantidad += unidades;
  } else {
    items.push({ id, cantidad: unidades });
  }

  localStorage.setItem(CLAVE, JSON.stringify(items));
  return obtenerCantidadCarrito();
}

// Quita un producto completo del carrito y devuelve la lista que queda.
export function quitarDelCarrito(id) {
  const items = obtenerCarrito().filter((item) => item.id !== id);
  localStorage.setItem(CLAVE, JSON.stringify(items));
  return items;
}

// Deja el carrito vacío (se usa al comprar).
export function vaciarCarrito() {
  localStorage.removeItem(CLAVE);
}
