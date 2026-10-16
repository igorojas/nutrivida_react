// Convierte un precio numérico al formato chileno: 12990 -> "$12.990".
// toLocaleString('es-CL') agrega los puntos de miles según el idioma/país indicado.
// useGrouping: 'always' fuerza el punto también en 4 cifras (2990 -> "$2.990"), que algunos navegadores omiten.
export function formatoPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL', { useGrouping: 'always' });
}
