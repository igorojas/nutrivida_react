import { horariosPorDia } from '../data/horarios';

// Devuelve los horarios disponibles para una fecha (objeto Date), o null si ese día no hay atención.
export function obtenerHorarios(fecha) {
  const dia = fecha.getDay(); // 0 = domingo ... 6 = sábado
  if (dia === 0) return null; // domingo cerrado
  if (dia === 6) return horariosPorDia.sabado; // sábado solo mañana
  return horariosPorDia.semana;
}
