import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormularioRegistro() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Nombre Completo:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese su nombre completo" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCorreo">
        <Form.Label>Correo Electrónico:</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContrasena">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Cree una contraseña" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmarContrasena">
        <Form.Label>Confirmar Contraseña:</Form.Label>
        <Form.Control type="password" placeholder="Repita su contraseña" />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="success" type="submit">
          Registrarse
        </Button>
        <Button variant="secondary" type="reset">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}

export default FormularioRegistro;