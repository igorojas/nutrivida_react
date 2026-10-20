// Favoritos del catálogo: lista de ids de producto guardada en localStorage (clave 'favoritosIds'),
// así se conservan al recargar la página.
const CLAVE = 'favoritosIds';

// Devuelve la lista de ids favoritos ([] si no hay nada guardado o el contenido está dañado).
export function obtenerFavoritos() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

// Agrega el id si no estaba y lo quita si ya estaba. Guarda y devuelve la lista nueva.
export function alternarFavorito(id) {
  const actuales = obtenerFavoritos();
  const nuevos = actuales.includes(id) ? actuales.filter((favorito) => favorito !== id) : [...actuales, id];
  localStorage.setItem(CLAVE, JSON.stringify(nuevos));
  return nuevos;
}
