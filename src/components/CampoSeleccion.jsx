import CampoFormulario from './CampoFormulario';

// Select genérico con React Bootstrap (vía CampoFormulario): la primera opción es "Seleccione..." con valor vacío,
// que las validaciones no aceptan, así que hay que elegir una de las opciones de la lista.
// opciones: arreglo de textos. El resto de props (id, etiqueta, name, value, onChange, className, claseGrupo, disabled...) pasan al campo.
function CampoSeleccion({ opciones, ...resto }) {
  return (
    <CampoFormulario as="select" {...resto}>
      <option value="">Seleccione...</option>
      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>{opcion}</option>
      ))}
    </CampoFormulario>
  );
}

export default CampoSeleccion;
