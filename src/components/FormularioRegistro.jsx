import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import CampoContrasena from './CampoContrasena';
import RequisitosContrasena from './RequisitosContrasena';
import CampoSeleccion from './CampoSeleccion';
import CampoCondicional from './CampoCondicional';
import { sexoBiologico, identidadGenero, patronAlimenticio } from '../data/opcionesSalud';
import {
  validarNombre,
  validarRut,
  validarCorreo,
  validarTelefono,
  esMayorDeEdad,
  validarContrasena,
  validarSeleccion,
  validarRango,
  validarTextoMinimo,
  rangos,
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
    sexo: '',
    genero: '',
    peso: '',
    estatura: '',
    cintura: '',
    alergias: '',
    alergiasDetalle: '',
    enfermedad: '',
    enfermedadDetalle: '',
    patron: '',
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
    // Datos de salud, en el mismo orden en que aparecen en el formulario. Solo se validan: el registro no guarda usuarios.
    if (!validarSeleccion(datos.sexo)) return rechazar(mensajes.sexo, 'sexo');
    if (!validarSeleccion(datos.genero)) return rechazar(mensajes.genero, 'genero');
    if (!validarRango(datos.peso, rangos.peso.min, rangos.peso.max)) return rechazar(mensajes.peso, 'peso');
    if (!validarRango(datos.estatura, rangos.estatura.min, rangos.estatura.max)) return rechazar(mensajes.estatura, 'estatura');
    if (!validarRango(datos.cintura, rangos.cintura.min, rangos.cintura.max)) return rechazar(mensajes.cintura, 'cintura');
    if (!validarSeleccion(datos.alergias)) return rechazar(mensajes.alergias, 'alergias');
    if (datos.alergias === 'Sí' && !validarTextoMinimo(datos.alergiasDetalle)) return rechazar(mensajes.alergiasDetalle, 'alergias-detalle');
    if (!validarSeleccion(datos.enfermedad)) return rechazar(mensajes.enfermedad, 'enfermedad');
    if (datos.enfermedad === 'Sí' && !validarTextoMinimo(datos.enfermedadDetalle)) return rechazar(mensajes.enfermedadDetalle, 'enfermedad-detalle');
    if (!validarSeleccion(datos.patron)) return rechazar(mensajes.patron, 'patron');
    if (!validarContrasena(datos.contrasenia)) return rechazar(mensajes.contrasena, 'contrasenia');
    // Todo es válido: se avisa con un cuadro de texto. No hay base de datos, así que no se guarda ningún usuario (ver data/usuarios.js).
    alert('¡Usuario registrado con éxito!');
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
        <CampoSeleccion id="sexo" name="sexo" etiqueta="Sexo Biológico:" className="form" opciones={sexoBiologico} required value={datos.sexo} onChange={cambiar} />
        <CampoSeleccion id="genero" name="genero" etiqueta="Identidad de Género:" className="form" opciones={identidadGenero} required value={datos.genero} onChange={cambiar} />
        <CampoFormulario id="peso" name="peso" tipo="number" etiqueta="Peso (kg):" className="form" min={rangos.peso.min} max={rangos.peso.max} step="0.1" placeholder="Ej: 68.5" required value={datos.peso} onChange={cambiar} />
        <CampoFormulario id="estatura" name="estatura" tipo="number" etiqueta="Estatura (cm):" className="form" min={rangos.estatura.min} max={rangos.estatura.max} placeholder="Ej: 165" required value={datos.estatura} onChange={cambiar} />
        <CampoFormulario id="cintura" name="cintura" tipo="number" etiqueta="Cintura (cm):" className="form" min={rangos.cintura.min} max={rangos.cintura.max} step="0.1" placeholder="Ej: 80" required value={datos.cintura} onChange={cambiar} />
        <CampoCondicional
          id="alergias"
          name="alergias"
          etiqueta="¿Tiene alergias o restricciones alimentarias?"
          etiquetaDetalle="¿Cuáles?"
          placeholderDetalle="Ej: Alergia a los frutos secos y a la lactosa (mínimo 10 caracteres)"
          className="form"
          respuesta={datos.alergias}
          detalle={datos.alergiasDetalle}
          onChange={cambiar}
        />
        <CampoCondicional
          id="enfermedad"
          name="enfermedad"
          etiqueta="¿Tiene alguna enfermedad?"
          etiquetaDetalle="¿Cuál?"
          placeholderDetalle="Ej: Diabetes tipo 2 diagnosticada (mínimo 10 caracteres)"
          className="form"
          respuesta={datos.enfermedad}
          detalle={datos.enfermedadDetalle}
          onChange={cambiar}
        />
        <CampoSeleccion id="patron" name="patron" etiqueta="Patrón Alimenticio:" className="form" opciones={patronAlimenticio} required value={datos.patron} onChange={cambiar} />
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
