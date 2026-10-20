// Reglas de validación compartidas por Registro, Inicio de Sesión, Agendar Cita y el formulario de productos del Panel.
// Cada función recibe el texto del campo y devuelve true si es válido o false si no.

// Solo letras (con tildes y ñ) y espacios.
export function validarNombre(valor) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim());
}

// Formato chileno con puntos y guion: 12.345.678-9 (el dígito verificador puede ser k).
export function validarRut(valor) {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(valor.trim());
}

// Correo válido y de uno de los 3 dominios permitidos.
export function validarCorreo(valor) {
  return /^[^\s@]+@(gmail\.com|duocuc\.cl|outlook\.com)$/.test(valor.trim());
}

// Celular chileno: +569 seguido de 8 dígitos (ejemplo: +56912345678).
export function validarTelefono(valor) {
  return /^\+569\d{8}$/.test(valor.trim());
}

// Verifica que la persona tenga 18 años o más. Recibe la fecha como la entrega
// <input type="date"> ("2000-05-20"). 'hoy' es opcional y permite probar con otra fecha.
export function esMayorDeEdad(fechaNacimiento, hoy = new Date()) {
  if (!fechaNacimiento) return false;
  const limite = new Date(new Date(hoy).setFullYear(hoy.getFullYear() - 18))
    .toISOString()
    .split('T')[0];
  // Las fechas en formato "AAAA-MM-DD" se pueden comparar directamente como texto.
  return fechaNacimiento <= limite;
}

// Estado de cada requisito de la contraseña: sirve para marcarlos en el cuadro del Registro.
export function requisitosContrasena(valor) {
  return {
    minuscula: /[a-z]/.test(valor),
    mayuscula: /[A-Z]/.test(valor),
    numero: /[0-9]/.test(valor),
    largo: valor.length >= 8
  };
}

// La contraseña es válida solo si cumple los 4 requisitos.
export function validarContrasena(valor) {
  return Object.values(requisitosContrasena(valor)).every(Boolean);
}

// En el Inicio de Sesión solo se exige que no esté vacía ni sea solo espacios.
export function contrasenaNoVacia(valor) {
  return valor.trim() !== '';
}

// Rangos válidos de las medidas de salud (se usan al validar y como min y max de los campos numéricos).
export const rangos = {
  peso: { min: 20, max: 300 }, // kg
  estatura: { min: 100, max: 250 }, // cm
  cintura: { min: 30, max: 200 }, // cm
  sueno: { min: 1, max: 16 } // horas por día
};

// Un select es válido si se eligió una opción (el valor vacío es "Seleccione...").
export function validarSeleccion(valor) {
  return valor !== '';
}

// Número dentro del rango (incluye los extremos). Un campo vacío no es válido.
export function validarRango(valor, minimo, maximo) {
  const numero = Number(valor);
  return valor !== '' && Number.isFinite(numero) && numero >= minimo && numero <= maximo;
}

// Texto de al menos 'minimo' caracteres sin contar los espacios del principio y del final.
export function validarTextoMinimo(valor, minimo = 10) {
  return valor.trim().length >= minimo;
}

// Mensajes de error que se muestran al usuario (los mismos de los alert del original).
export const mensajes = {
  nombre: 'El nombre debe contener solo letras.',
  rut: 'El RUT no tiene un formato válido (ejemplo: 12.345.678-9)',
  correo: 'El correo debe ser válido y pertenecer a @gmail.com, @duocuc.cl o @outlook.com',
  telefono: 'El teléfono debe comenzar con +569 y tener 8 dígitos adicionales (ejemplo: +56912345678)',
  edad: 'Debes tener 18 años o más para registrarte.',
  contrasena: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
  contrasenaVacia: 'Por favor ingrese su contraseña.',
  credenciales: 'Correo o contraseña incorrectos.',
  productoNombre: 'Ingrese el nombre del producto.',
  productoPrecio: 'El precio debe ser un número mayor a 0.',
  productoDescripcion: 'Ingrese una descripción.',
  sexo: 'Seleccione su sexo biológico.',
  genero: 'Seleccione su identidad de género.',
  peso: `El peso debe estar entre ${rangos.peso.min} y ${rangos.peso.max} kg.`,
  estatura: `La estatura debe estar entre ${rangos.estatura.min} y ${rangos.estatura.max} cm.`,
  cintura: `La cintura debe estar entre ${rangos.cintura.min} y ${rangos.cintura.max} cm.`,
  alergias: 'Indique si tiene alergias o restricciones alimentarias.',
  alergiasDetalle: 'Describa sus alergias o restricciones alimentarias (mínimo 10 caracteres).',
  enfermedad: 'Indique si tiene alguna enfermedad.',
  enfermedadDetalle: 'Describa su enfermedad (mínimo 10 caracteres).',
  patron: 'Seleccione su patrón alimenticio.',
  motivo: 'El motivo de consulta debe tener al menos 10 caracteres.',
  objetivo: 'Seleccione su objetivo nutricional.',
  imc: 'Seleccione su categoría de IMC.',
  historial: 'El historial médico debe tener al menos 10 caracteres (si no tiene, escriba "Sin antecedentes médicos").',
  medicamentos: 'Indique si usa medicamentos actualmente.',
  medicamentosDetalle: 'Indique qué medicamentos usa (mínimo 10 caracteres).',
  actividad: 'Seleccione cuánta actividad física realiza.',
  sueno: `Las horas de sueño deben estar entre ${rangos.sueno.min} y ${rangos.sueno.max}.`,
  estres: 'Seleccione su nivel de estrés.',
  sesionRequerida: 'Por favor inicie sesión para agendar su cita.'
};
