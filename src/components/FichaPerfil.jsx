import { Link } from 'react-router-dom';
import DatoPerfil from './DatoPerfil';

// Texto que se muestra para cada rol guardado en la sesión.
const ROLES = { admin: 'Administrador', paciente: 'Paciente' };

// La fecha se guarda como "AAAA-MM-DD" (lo que entrega <input type="date">). Se da vuelta como texto
// ("1990-05-15" -> "15-05-1990") y no con new Date(), que puede mostrar un día menos por la zona horaria.
const formatoFecha = (fecha) => fecha.split('-').reverse().join('-');

// Tarjeta del perfil: ícono de usuario, nombre, rol, datos y botones.
// usuario: los datos de la sesión. onCerrarSesion: función que cierra la sesión (la define la view).
function FichaPerfil({ usuario, onCerrarSesion }) {
  return (
    <div className="perfil-ficha">
      <div className="perfil-avatar">
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
      <h3 className="perfil-nombre">{usuario.nombre}</h3>
      <span className="perfil-rol">{ROLES[usuario.rol] ?? usuario.rol}</span>

      <div className="perfil-datos">
        <DatoPerfil etiqueta="Nombre" valor={usuario.nombre} />
        <DatoPerfil etiqueta="RUT" valor={usuario.rut} />
        <DatoPerfil etiqueta="Correo electrónico" valor={usuario.correo} />
        <DatoPerfil etiqueta="Teléfono" valor={usuario.telefono} />
        <DatoPerfil etiqueta="Fecha de nacimiento" valor={formatoFecha(usuario.fenac)} />
      </div>

      <div className="perfil-botones">
        {/* Solo el administrador ve el acceso al Panel de Control; el paciente no lo ve.
            Aunque alguien escriba /admin a mano, la ruta está protegida con RutaPrivada. */}
        {usuario.rol === 'admin' && (
          <Link to="/admin" className="btn-perfil-panel">Ir al Panel de Control</Link>
        )}
        <button type="button" className="btn-perfil-cerrar" onClick={onCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default FichaPerfil;
