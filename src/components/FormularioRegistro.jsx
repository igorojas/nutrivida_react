import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import CampoContrasena from './CampoContrasena';
import RequisitosContrasena from './RequisitosContrasena';
import {
  validarNombre,
  validarRut,
  validarCorreo,
  validarTelefono,
  esMayorDeEdad,
  validarContrasena,
  mensajes
} from '../utils/validaciones';

// Formulario de registro. Los datos escritos se guardan en un solo estado (objeto) y
// cada campo lo actualiza por su 'name'. El teléfono parte con "+56", como en el original.
function FormularioRegistro() {
  const [datos, setDatos] = useState({
    nombre: '',
    rut: '',
    correo: '',
    telefono: '+56',
    fenac: '',
    contrasenia: ''
  });
  // true mientras la contraseña tiene el foco: muestra el cuadro de requisitos.
  const [enfocada, setEnfocada] = useState(false);

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como el original) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    // Evita que el navegador recargue la página; la validación la hacemos nosotros.
    e.preventDefault();

    // Mismo orden de validación que validaform.js; se detiene en el primer error.
    if (!validarNombre(datos.nombre)) return rechazar(mensajes.nombre, 'nombre');
    if (!validarRut(datos.rut)) return rechazar(mensajes.rut, 'rut');
    if (!validarCorreo(datos.correo)) return rechazar(mensajes.correo, 'correo');
    if (!validarTelefono(datos.telefono)) return rechazar(mensajes.telefono, 'telefono');
    if (!esMayorDeEdad(datos.fenac)) return rechazar(mensajes.edad, 'fenac');
    if (!validarContrasena(datos.contrasenia)) return rechazar(mensajes.contrasena, 'contrasenia');
    // El original no hacía nada más al pasar las validaciones: el registro real se agrega en una etapa posterior.
  };

  return (
    <Form id="registro" onSubmit={enviar}>
      <fieldset>
        <legend>Formulario de Registro</legend>

        <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre:" className="form" placeholder="Ingrese su nombre" required value={datos.nombre} onChange={cambiar} />
        <CampoFormulario id="rut" name="rut" etiqueta="Rut:" className="form" placeholder="Formato 12.345.678-k" required value={datos.rut} onChange={cambiar} />
        <CampoFormulario id="correo" name="correo" tipo="email" etiqueta="Correo Electrónico:" className="form" placeholder="usuario@gmail.com" required value={datos.correo} onChange={cambiar} />
        <CampoFormulario id="telefono" name="telefono" tipo="tel" etiqueta="Teléfono:" className="form" value={datos.telefono} onChange={cambiar} />
        <CampoFormulario id="fenac" name="fenac" tipo="date" etiqueta="Fecha de Nacimiento:" className="form" required value={datos.fenac} onChange={cambiar} />
        <CampoContrasena
          id="contrasenia"
          name="contrasenia"
          etiqueta="Contraseña:"
          className="form"
          required
          value={datos.contrasenia}
          onChange={cambiar}
          onFocus={() => setEnfocada(true)}
          onBlur={() => setEnfocada(false)}
        />

        <RequisitosContrasena valor={datos.contrasenia} visible={enfocada} />

        <button className="submit" type="submit">ENVIAR</button>

        <p className="texto-inicio">
          ¿Ya está registrado(a)? <Link to="/login">Solo inicie sesión</Link>
        </p>
      </fieldset>
    </Form>
  );
}

export default FormularioRegistro;
