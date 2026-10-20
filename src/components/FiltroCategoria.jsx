import CampoFormulario from './CampoFormulario';

// Select para filtrar el catálogo por categoría, con React Bootstrap (vía CampoFormulario).
// categorias: lista de nombres de categoría. valor: la elegida ('' = todas). onCambio(categoria): la define la view.
function FiltroCategoria({ categorias, valor, onCambio }) {
  return (
    <CampoFormulario
      id="filtro-categoria"
      etiqueta="Categoría"
      as="select"
      claseGrupo="campo-form filtros-campo"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      {categorias.map((categoria) => (
        <option key={categoria} value={categoria}>{categoria}</option>
      ))}
    </CampoFormulario>
  );
}

export default FiltroCategoria;
