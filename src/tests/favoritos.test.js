import { describe, it, expect, beforeEach } from 'vitest';
import { obtenerFavoritos, alternarFavorito } from '../utils/favoritos';

describe('favoritos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('PU-004: alternarFavorito debe agregar y quitar un id, y obtenerFavoritos debe devolver [] si el contenido está dañado', () => {
    // 1 - Preparación (Arrange)
    const idProducto = 5;

    // 2 - Ejecución (Act)
    const alAgregar = alternarFavorito(idProducto);
    const alQuitar = alternarFavorito(idProducto);
    localStorage.setItem('favoritosIds', '{contenido dañado');
    const conContenidoDanado = obtenerFavoritos();

    // 3 - Verificación (Assert)
    expect(alAgregar).toEqual([5]);
    expect(alQuitar).toEqual([]);
    expect(conContenidoDanado).toEqual([]);
  });
});
