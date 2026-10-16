import Form from 'react-bootstrap/Form';

// Campo genérico de formulario (etiqueta + entrada + mensaje de error) con React Bootstrap.
// - id: une la etiqueta con la entrada (controlId). etiqueta: texto de la etiqueta.
// - tipo: 'text', 'email', 'tel', 'date', etc. Para un textarea se pasa as='textarea' y rows.
// - error: texto del error; si viene vacío no se muestra nada.
// - claseGrupo: clase opcional para la envoltura del campo (ej. 'campo-form' en Agendar).
// - El resto de props (value, onChange, placeholder, name, className, onFocus...) pasan directo a la entrada
//   (ej. className='form' en Registro o 'ini' en Inicio de Sesión, las clases del CSS original).
function CampoFormulario({ id, etiqueta, tipo = 'text', error, claseGrupo, ...resto }) {
  return (
    <Form.Group className={claseGrupo} controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control type={resto.as ? undefined : tipo} isInvalid={Boolean(error)} {...resto} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;
