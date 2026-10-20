import CampoFormulario from './CampoFormulario';

// Barra de búsqueda del catálogo: campo de texto con React Bootstrap (vía CampoFormulario).
// valor: texto escrito. onCambio(texto): la define la view (Productos), que guarda el texto en su estado.
function BuscadorProductos({ valor, onCambio }) {
  return (
    <CampoFormulario
      id="buscador-productos"
      etiqueta="Buscar producto"
      claseGrupo="campo-form filtros-campo"
      placeholder="Ej: quinoa"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
    />
  );
}

export default BuscadorProductos;
