import CampoFormulario from './CampoFormulario';
import CampoSeleccion from './CampoSeleccion';

// Pregunta Sí/No con un detalle que aparece solo si la respuesta es "Sí" (alergias, enfermedad, medicamentos).
// id y name: de la pregunta; el detalle usa `${id}-detalle` como id y `${name}Detalle` como name.
// etiqueta: la pregunta. etiquetaDetalle y placeholderDetalle: del campo de texto que aparece con "Sí".
// respuesta ('', 'Sí' o 'No') y detalle: valores guardados por quien lo usa. onChange recibe el evento de cualquiera de los dos campos.
// className, claseGrupo y disabled pasan a los dos campos (la clase la pone quien lo usa: 'form' en Registro, 'campo-form' en Agendar).
function CampoCondicional({ id, name, etiqueta, etiquetaDetalle, placeholderDetalle, respuesta, detalle, onChange, className, claseGrupo, disabled }) {
  return (
    <>
      <CampoSeleccion
        id={id}
        name={name}
        etiqueta={etiqueta}
        opciones={['Sí', 'No']}
        className={className}
        claseGrupo={claseGrupo}
        disabled={disabled}
        required
        value={respuesta}
        onChange={onChange}
      />
      {respuesta === 'Sí' && (
        <CampoFormulario
          id={`${id}-detalle`}
          name={`${name}Detalle`}
          as="textarea"
          rows={3}
          etiqueta={etiquetaDetalle}
          placeholder={placeholderDetalle}
          className={className}
          claseGrupo={claseGrupo}
          disabled={disabled}
          required
          value={detalle}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default CampoCondicional;
