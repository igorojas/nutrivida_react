import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import CampoContrasena from './CampoContrasena';
import { validarCorreo, contrasenaNoVacia, mensajes } from '../utils/validaciones';

// Formulario de inicio de sesión. Por ahora solo valida el formato, igual que validainicio.js;
// las credenciales estáticas y la sesión con localStorage se agregan en una etapa posterior.
function FormularioInicioSesion() {
  const [datos, setDatos] = useState({ correo: '', contrasenia: '' });

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como el original) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    // Igual que el original: nunca se envía el formulario, solo se valida.
    e.preventDefault();

    if (!validarCorreo(datos.correo)) return rechazar(mensajes.correo, 'correo');
    if (!contrasenaNoVacia(datos.contrasenia)) return rechazar(mensajes.contrasenaVacia, 'contrasenia');

    alert('¡Inicio de sesión exitoso!');
  };

  return (
    <Form id="inicio" onSubmit={enviar}>
      <fieldset>
        <legend>Iniciar Sesión</legend>

        <div className="user-brand">
          <i className="fa fa-user user-icono" aria-hidden="true"></i>
        </div>

        <CampoFormulario id="correo" name="correo" tipo="email" etiqueta="Correo Electrónico:" className="ini" placeholder="usuario@gmail.com" required value={datos.correo} onChange={cambiar} />
        <CampoContrasena id="contrasenia" name="contrasenia" etiqueta="Contraseña:" className="ini" required value={datos.contrasenia} onChange={cambiar} />

        <button className="btn-inicio" type="submit">Iniciar Sesión</button>

        <p className="texto-registro">
          ¿No tiene cuenta? <Link to="/registro">Regístrese ahora</Link>
        </p>
      </fieldset>
    </Form>
  );
}

export default FormularioInicioSesion;
