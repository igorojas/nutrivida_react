import { describe, it, expect } from 'vitest';
import { normalizarTexto } from '../utils/normalizarTexto';

describe('normalizarTexto', () => {
  it('PU-005: debe quitar espacios de los bordes, pasar a minúscula y eliminar tildes', () => {
    // 1 - Preparación (Arrange)
    const textoOriginal = '  Té Matcha ';
    const otroTexto = 'PROTEÍNA Vegana';

    // 2 - Ejecución (Act)
    const resultado = normalizarTexto(textoOriginal);
    const otroResultado = normalizarTexto(otroTexto);

    // 3 - Verificación (Assert)
    expect(resultado).toBe('te matcha');
    expect(otroResultado).toBe('proteina vegana');
  });
});
