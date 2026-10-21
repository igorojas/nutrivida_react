import { describe, it, expect, beforeEach } from 'vitest';
import { guardarSesion, obtenerSesion, cerrarSesion } from '../utils/sesion';

describe('sesion', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('PU-003: debe guardar la sesión sin la contraseña y borrarla al cerrar sesión', () => {
    // 1 - Preparación (Arrange)
    const usuario = {
      id: 2,
      nombre: 'Ana Pérez González',
      correo: 'paciente@gmail.com',
      contrasenia: 'Paciente1234',
      rol: 'paciente'
    };

    // 2 - Ejecución (Act)
    guardarSesion(usuario);
    const sesionGuardada = obtenerSesion();
    const textoEnStorage = localStorage.getItem('sesionUsuario');
    cerrarSesion();
    const sesionDespuesDeCerrar = obtenerSesion();

    // 3 - Verificación (Assert)
    expect(sesionGuardada.correo).toBe('paciente@gmail.com');
    expect(sesionGuardada.rol).toBe('paciente');
    expect(sesionGuardada.contrasenia).toBeUndefined();
    expect(textoEnStorage).not.toContain('Paciente1234');
    expect(sesionDespuesDeCerrar).toBeNull();
  });
});
