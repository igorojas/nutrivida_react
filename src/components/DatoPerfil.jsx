// Una fila de la ficha de perfil: etiqueta a la izquierda y valor a la derecha (ej. "Correo" - "paciente@gmail.com").
function DatoPerfil({ etiqueta, valor }) {
  return (
    <div className="perfil-dato">
      <span className="perfil-etiqueta">{etiqueta}</span>
      <span className="perfil-valor">{valor}</span>
    </div>
  );
}

export default DatoPerfil;
