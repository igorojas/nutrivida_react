// Deja un texto listo para comparar: sin espacios al inicio ni al final, en minúscula y sin tildes.
// Así "Té" y "te", o "Proteína" y "proteina", se consideran iguales al buscar.
// normalize('NFD') separa cada letra de su tilde y el replace borra solo las tildes (rango \u0300-\u036f).
export function normalizarTexto(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
