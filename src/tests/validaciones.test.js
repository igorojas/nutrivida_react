import { describe, it, expect } from 'vitest';
import { validarRut, validarContrasena } from '../utils/validaciones';

describe('validaciones - RUT', () => {
  it('PU-001: debe aceptar RUT con puntos y guion (dígito o k) y rechazar los mal formados', () => {
    // 1 - Preparación (Arrange)
    const validos = ['12.345.678-9', '12.345.678-k', '1.234.567-K'];
    const invalidos = ['12345678-9', '12.345.6789', '12.345.678', 'abc'];

    // 2 - Ejecución (Act)
    const resultadosValidos = validos.map((rut) => validarRut(rut));
    const resultadosInvalidos = invalidos.map((rut) => validarRut(rut));

    // 3 - Verificación (Assert)
    expect(resultadosValidos).toEqual([true, true, true]);
    expect(resultadosInvalidos).toEqual([false, false, false, false]);
  });
});

describe('validaciones - contraseña', () => {
  it('PU-002: debe exigir 8 caracteres, mayúscula, minúscula y número', () => {
    // 1 - Preparación (Arrange)
    const correcta = 'Abcdef12';
    const sinMayuscula = 'abcdef12';
    const sinMinuscula = 'ABCDEF12';
    const sinNumero = 'Abcdefgh';
    const corta = 'Abc12';

    // 2 - Ejecución (Act)
    const resultadoCorrecta = validarContrasena(correcta);
    const resultadosIncorrectas = [sinMayuscula, sinMinuscula, sinNumero, corta].map((c) => validarContrasena(c));

    // 3 - Verificación (Assert)
    expect(resultadoCorrecta).toBe(true);
    expect(resultadosIncorrectas).toEqual([false, false, false, false]);
  });
});
