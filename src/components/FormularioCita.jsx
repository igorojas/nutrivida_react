import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from './CampoFormulario';
import CampoSeleccion from './CampoSeleccion';
import CampoCondicional from './CampoCondicional';
import ResumenReserva from './ResumenReserva';
import { objetivoNutricional, categoriasImc, actividadFisica, nivelEstres } from '../data/opcionesSalud';
import {
  validarNombre,
  validarRut,
  validarTelefono,
  validarCorreo,
  validarSeleccion,
  validarRango,
  validarTextoMinimo,
  rangos,
  mensajes
} from '../utils/validaciones';

// Formulario del paso 3 de Agendar: datos de la persona + resumen de la reserva.
// nutricionista, fecha y hora vienen del asistente (solo se muestran en el resumen).
// usuario: la sesión (o null). Con sesión, nombre, RUT, teléfono y correo salen de ella y quedan en solo lectura;
// sin sesión todo el formulario queda bloqueado y se pide iniciar sesión.
// onConfirmar(nombre) se llama cuando todos los datos son válidos.
function FormularioCita({ nutricionista, fecha, hora, usuario, onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: usuario?.nombre ?? '',
    rut: usuario?.rut ?? '',
    telefono: usuario?.telefono ?? '',
    correo: usuario?.correo ?? '',
    motivo: '',
    objetivo: '',
    imc: '',
    historial: '',
    medicamentos: '',
    medicamentosDetalle: '',
    actividad: '',
    sueno: '',
    estres: ''
  });
  // Sin sesión no se puede agendar: todos los campos y el botón quedan bloqueados.
  const bloqueado = !usuario;

  // [name] entre corchetes usa el nombre del campo como clave: actualiza solo ese dato.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  // Muestra el mensaje con alert (como el original) y devuelve el foco al campo con error.
  const rechazar = (mensaje, id) => {
    alert(mensaje);
    document.getElementById(id).focus();
  };

  const enviar = (e) => {
    e.preventDefault();

    if (bloqueado) {
      alert(mensajes.sesionRequerida);
      return;
    }

    if (!validarNombre(datos.nombre)) return rechazar(mensajes.nombre, 'campo-nombre');
    if (!validarRut(datos.rut)) return rechazar(mensajes.rut, 'campo-rut');
    if (!validarTelefono(datos.telefono)) return rechazar(mensajes.telefono, 'campo-telefono');
    if (!validarCorreo(datos.correo)) return rechazar(mensajes.correo, 'campo-correo');
    if (!validarTextoMinimo(datos.motivo)) return rechazar(mensajes.motivo, 'campo-motivo');
    if (!validarSeleccion(datos.objetivo)) return rechazar(mensajes.objetivo, 'campo-objetivo');
    if (!validarSeleccion(datos.imc)) return rechazar(mensajes.imc, 'campo-imc');
    if (!validarTextoMinimo(datos.historial)) return rechazar(mensajes.historial, 'campo-historial');
    if (!validarSeleccion(datos.medicamentos)) return rechazar(mensajes.medicamentos, 'campo-medicamentos');
    if (datos.medicamentos === 'Sí' && !validarTextoMinimo(datos.medicamentosDetalle)) return rechazar(mensajes.medicamentosDetalle, 'campo-medicamentos-detalle');
    if (!validarSeleccion(datos.actividad)) return rechazar(mensajes.actividad, 'campo-actividad');
    if (!validarRango(datos.sueno, rangos.sueno.min, rangos.sueno.max)) return rechazar(mensajes.sueno, 'campo-sueno');
    if (!validarSeleccion(datos.estres)) return rechazar(mensajes.estres, 'campo-estres');

    onConfirmar(datos.nombre);
  };

  return (
    <Form id="form-confirmacion" className="paso3-layout" onSubmit={enviar}>
      <div className="datos-columna">
        {bloqueado && (
          <p className="paso-nota">
            Por favor inicie sesión para agendar su cita. <Link to="/login">Iniciar sesión</Link>
          </p>
        )}

        <CampoFormulario id="campo-nombre" name="nombre" claseGrupo="campo-form" etiqueta="Nombre completo" placeholder="Ej: Ana Pérez González" required disabled={bloqueado} readOnly={!bloqueado} value={datos.nombre} onChange={cambiar} />
        <CampoFormulario id="campo-rut" name="rut" claseGrupo="campo-form" etiqueta="Rut" placeholder="Ej: 12.345.678-9" required disabled={bloqueado} readOnly={!bloqueado} value={datos.rut} onChange={cambiar} />
        <CampoFormulario id="campo-telefono" name="telefono" tipo="tel" claseGrupo="campo-form" etiqueta="Teléfono" placeholder="Ej: +56912345678" required disabled={bloqueado} readOnly={!bloqueado} value={datos.telefono} onChange={cambiar} />
        <CampoFormulario id="campo-correo" name="correo" tipo="email" claseGrupo="campo-form" etiqueta="Correo electrónico" placeholder="Ej: ana.perez@gmail.com" required disabled={bloqueado} readOnly={!bloqueado} value={datos.correo} onChange={cambiar} />
        <CampoFormulario id="campo-motivo" name="motivo" as="textarea" rows={4} claseGrupo="campo-form" etiqueta="Motivo de consulta" placeholder="Cuéntanos brevemente qué te gustaría trabajar en tu cita (mínimo 10 caracteres)" required disabled={bloqueado} value={datos.motivo} onChange={cambiar} />

        {/* Datos de salud: la persona los escribe (todos obligatorios, los textos con mínimo 10 caracteres). */}
        <CampoSeleccion id="campo-objetivo" name="objetivo" claseGrupo="campo-form" etiqueta="Objetivo nutricional" opciones={objetivoNutricional} required disabled={bloqueado} value={datos.objetivo} onChange={cambiar} />
        <CampoSeleccion id="campo-imc" name="imc" claseGrupo="campo-form" etiqueta="Categoría de IMC (Índice de Masa Corporal)" opciones={categoriasImc} required disabled={bloqueado} value={datos.imc} onChange={cambiar} />
        <CampoFormulario id="campo-historial" name="historial" as="textarea" rows={3} claseGrupo="campo-form" etiqueta="Historial médico" placeholder="Ej: Cirugía de vesícula en 2019 (si no tiene, escriba: Sin antecedentes médicos)" required disabled={bloqueado} value={datos.historial} onChange={cambiar} />
        <CampoCondicional
          id="campo-medicamentos"
          name="medicamentos"
          etiqueta="¿Usa medicamentos actualmente?"
          etiquetaDetalle="¿Cuáles?"
          placeholderDetalle="Ej: Metformina 850 mg dos veces al día (mínimo 10 caracteres)"
          claseGrupo="campo-form"
          disabled={bloqueado}
          respuesta={datos.medicamentos}
          detalle={datos.medicamentosDetalle}
          onChange={cambiar}
        />
        <CampoSeleccion id="campo-actividad" name="actividad" claseGrupo="campo-form" etiqueta="Actividad física" opciones={actividadFisica} required disabled={bloqueado} value={datos.actividad} onChange={cambiar} />
        <CampoFormulario id="campo-sueno" name="sueno" tipo="number" min={rangos.sueno.min} max={rangos.sueno.max} step="0.5" claseGrupo="campo-form" etiqueta="Horas de sueño por día" placeholder="Ej: 7" required disabled={bloqueado} value={datos.sueno} onChange={cambiar} />
        <CampoSeleccion id="campo-estres" name="estres" claseGrupo="campo-form" etiqueta="Nivel de estrés" opciones={nivelEstres} required disabled={bloqueado} value={datos.estres} onChange={cambiar} />

        <button type="submit" className="btn-confirmar" disabled={bloqueado}>Confirmar Cita</button>
      </div>

      <ResumenReserva nutricionista={nutricionista} fecha={fecha} hora={hora} />
    </Form>
  );
}

export default FormularioCita;
