import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import CampoContrasena from './CampoContrasena';
import { validarCorreo, contrasenaNoVacia, mensajes } from '../utils/validaciones';
import { usuarios } from '../data/usuarios';
import { guardarSesion } from '../utils/sesion';

// Formulario de inicio de sesión. Valida el formato igual que validainicio.js y luego compara el correo y la
// contraseña con los usuarios estáticos de data/usuarios.js; si coinciden, guarda la sesión en localStorage.
function FormularioInicioSesion() {
  const [datos, setDatos] = useState({ correo: '', contrasenia: '' });
  // navigate permite cambiar de página desde el código (aquí, al iniciar sesión).
  const navigate = useNavigate();

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como el original) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    // El formulario nunca se envía al navegador: se valida y se resuelve aquí.
    e.preventDefault();

    if (!validarCorreo(datos.correo)) return rechazar(mensajes.correo, 'correo');
    if (!contrasenaNoVacia(datos.contrasenia)) return rechazar(mensajes.contrasenaVacia, 'contrasenia');

    // Busca un usuario estático con ese correo y contraseña; si no existe, se rechaza el ingreso.
    const usuario = usuarios.find(
      (u) => u.correo === datos.correo.trim().toLowerCase() && u.contrasenia === datos.contrasenia
    );
    if (!usuario) return rechazar(mensajes.credenciales, 'contrasenia');

    guardarSesion(usuario);
    alert('¡Inicio de sesión exitoso!');
    // Va a Inicio: ahí el Header ya muestra "Mi Perfil" en lugar de "Iniciar Sesión".
    navigate('/');
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
