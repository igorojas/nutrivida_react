import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import ResumenReserva from './ResumenReserva';
import { validarNombre, validarRut, validarTelefono, validarCorreo, mensajes } from '../utils/validaciones';

// Formulario del paso 3 de Agendar: datos de la persona + resumen de la reserva.
// nutricionista, fecha y hora vienen del asistente (solo se muestran en el resumen).
// onConfirmar(nombre) se llama cuando todos los datos son válidos.
function FormularioCita({ nutricionista, fecha, hora, onConfirmar }) {
  const [datos, setDatos] = useState({ nombre: '', rut: '', telefono: '', correo: '', motivo: '' });

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como el original) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    e.preventDefault();

    if (!validarNombre(datos.nombre)) return rechazar(mensajes.nombre, 'campo-nombre');
    if (!validarRut(datos.rut)) return rechazar(mensajes.rut, 'campo-rut');
    if (!validarTelefono(datos.telefono)) return rechazar(mensajes.telefono, 'campo-telefono');
    if (!validarCorreo(datos.correo)) return rechazar(mensajes.correo, 'campo-correo');

    onConfirmar(datos.nombre);
  };

  return (
    <Form id="form-confirmacion" className="paso3-layout" onSubmit={enviar}>
      <div className="datos-columna">
        <CampoFormulario id="campo-nombre" name="nombre" claseGrupo="campo-form" etiqueta="Nombre completo" placeholder="Ej: Ana Pérez González" required value={datos.nombre} onChange={cambiar} />
        <CampoFormulario id="campo-rut" name="rut" claseGrupo="campo-form" etiqueta="Rut" placeholder="Ej: 12.345.678-9" required value={datos.rut} onChange={cambiar} />
        <CampoFormulario id="campo-telefono" name="telefono" tipo="tel" claseGrupo="campo-form" etiqueta="Teléfono" placeholder="Ej: +56912345678" required value={datos.telefono} onChange={cambiar} />
        <CampoFormulario id="campo-correo" name="correo" tipo="email" claseGrupo="campo-form" etiqueta="Correo electrónico" placeholder="Ej: ana.perez@gmail.com" required value={datos.correo} onChange={cambiar} />
        <CampoFormulario id="campo-motivo" name="motivo" as="textarea" rows={4} claseGrupo="campo-form" etiqueta="Motivo de consulta" placeholder="Cuéntanos brevemente qué te gustaría trabajar en tu cita" required value={datos.motivo} onChange={cambiar} />

        <button type="submit" className="btn-confirmar">Confirmar Cita</button>
      </div>

      <ResumenReserva nutricionista={nutricionista} fecha={fecha} hora={hora} />
    </Form>
  );
}

export default FormularioCita;
