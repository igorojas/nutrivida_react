// Usuarios estáticos para el inicio de sesión (la pauta pide credenciales fijas, sin base de datos).
// Son datos ficticios de prueba. 'rol' decide a qué puede entrar cada uno: 'admin' accede al Panel de Control
// y 'paciente' no. Cada contraseña cumple las reglas del registro (8 o más caracteres, mayúscula, minúscula y número).
export const usuarios = [
  {
    id: 1,
    nombre: 'Administrador NutriVida',
    rut: '11.111.111-1',
    correo: 'admin@duocuc.cl',
    telefono: '+56911111111',
    fenac: '1990-05-15',
    contrasenia: 'Admin1234',
    rol: 'admin'
  },
  {
    id: 2,
    nombre: 'Ana Pérez González',
    rut: '12.345.678-9',
    correo: 'paciente@gmail.com',
    telefono: '+56912345678',
    fenac: '1995-08-20',
    contrasenia: 'Paciente1234',
    rol: 'paciente'
  }
];
