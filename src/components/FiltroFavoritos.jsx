import Form from 'react-bootstrap/Form';

// Casilla "Solo favoritos" del catálogo, con React Bootstrap (Form.Check).
// valor: true si está marcada. onCambio(marcada): la define la view (Productos), que guarda el estado.
function FiltroFavoritos({ valor, onCambio }) {
  return (
    <Form.Check
      id="filtro-favoritos"
      type="checkbox"
      label="Solo favoritos"
      className="favoritos-check"
      checked={valor}
      onChange={(e) => onCambio(e.target.checked)}
    />
  );
}

export default FiltroFavoritos;
