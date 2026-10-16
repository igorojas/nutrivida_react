import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';

// Campo de contraseña con la casilla "Mostrar Contraseña" (la usan Registro e Inicio de Sesión).
// Recibe las mismas props que CampoFormulario (id, etiqueta, value, onChange, error, onFocus, onBlur...).
function CampoContrasena({ ...props }) {
  // mostrar = true -> la entrada es de tipo texto y se ve la contraseña; false -> queda oculta.
  const [mostrar, setMostrar] = useState(false);

  return (
    <>
      <CampoFormulario {...props} tipo={mostrar ? 'text' : 'password'} />
      {/* Form.Check es la casilla de React Bootstrap; la clase .mostrar-pass conserva el estilo original */}
      <Form.Check
        type="checkbox"
        id={`${props.id}-mostrar`}
        className="mostrar-pass"
        label="Mostrar Contraseña"
        checked={mostrar}
        onChange={() => setMostrar(!mostrar)}
      />
    </>
  );
}

export default CampoContrasena;
