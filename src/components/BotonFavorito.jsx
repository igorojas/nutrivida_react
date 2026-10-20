// Botón de corazón para marcar o desmarcar un producto como favorito (tarjeta del catálogo y detalle del producto).
// producto: el producto (su nombre se usa en la etiqueta para lectores de pantalla). activo: true si ya es favorito.
// onClick: la define quien lo usa (la view), que guarda el cambio.
function BotonFavorito({ producto, activo, onClick }) {
  return (
    <button
      className={activo ? 'btn-favorito activo' : 'btn-favorito'}
      onClick={onClick}
      aria-pressed={activo}
      aria-label={activo ? `Quitar ${producto.nombre} de favoritos` : `Agregar ${producto.nombre} a favoritos`}
    >
      <i className={activo ? 'fa fa-heart' : 'fa fa-heart-o'} aria-hidden="true"></i>
    </button>
  );
}

export default BotonFavorito;
