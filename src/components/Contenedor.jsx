// Contenedor de texto genérico: un elemento de lista (<li>) con un título (<h3>) y uno o más párrafos.
// titulo: texto del <h3>. parrafos: arreglo de textos, un <p> por cada uno. className: clase del <li> (la pone quien lo usa).
// Se usa dentro de un <ul>; hoy lo usa "Te ofrecemos" en Inicio, pero sirve para cualquier bloque de título y párrafos.
function Contenedor({ titulo, parrafos = [], className }) {
  return (
    <li className={className}>
      <h3>{titulo}</h3>
      {parrafos.map((texto) => (
        <p key={texto}>{texto}</p>
      ))}
    </li>
  );
}

export default Contenedor;
