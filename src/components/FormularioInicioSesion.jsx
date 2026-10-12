import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormularioInicioSesion() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formCorreo">
        <Form.Label>Correo Electrónico:</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContrasena">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Ingrese su contraseña" />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
        <Button variant="secondary" type="reset">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}

export default FormularioInicioSesion;