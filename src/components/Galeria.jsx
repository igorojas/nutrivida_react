import Tarjeta from './Tarjeta';
import TarjetaCatalogo from './TarjetaCatalogo';

// Galería genérica. 'tarjetaClassName' decide qué tarjeta se dibuja:
//  - 'tarjeta', 'tarjeta-bestseller' o 'relacionado-tarjeta' -> Tarjeta (categorías, Best Sellers y relacionados)
//  - 'producto-tarjeta' -> TarjetaCatalogo (catálogo; es más compleja, por eso es un componente aparte)
// 'onAnadir' solo se usa con las tarjetas del catálogo: es la función que suma el producto al carrito.
// 'favoritos' (lista de ids) y 'onFavorito' tampoco se usan fuera del catálogo: marcan y alternan los favoritos.
function Galeria({ datos, className, tarjetaClassName, onAnadir, favoritos = [], onFavorito }) {
  const esCatalogo = tarjetaClassName === 'producto-tarjeta';

  return (
    /** Mapeo de arreglos con 'datos.map(...)':
     * Iteramos sobre cada objeto del arreglo 'datos'. Por cada elemento retornamos una tarjeta
     * (TarjetaCatalogo si es el catálogo; si no, la <Tarjeta /> genérica).
     *
     * Requisito de React (propiedad 'key'):
     * Se asigna 'key={item.id}' de forma obligatoria para que React identifique cada elemento de la lista de manera única
     * en su DOM virtual y pueda realizar actualizaciones eficientes cuando los datos cambien.
     *
     * Pasaje de propiedades (props):
     * 'item={item}' transfiere todo el objeto (imagen, título, precio/descripción) a la tarjeta individual.
     * 'tarjetaClassName={tarjetaClassName}' transfiere el nombre de la clase CSS específica para definir el estilo del cuadro.
     */
    <div className={className}>
      {datos.map((item) =>
        esCatalogo ? (
          <TarjetaCatalogo
            key={item.id}
            producto={item}
            onAnadir={onAnadir}
            favorito={favoritos.includes(item.id)}
            onFavorito={onFavorito}
          />
        ) : (
          <Tarjeta key={item.id} item={item} tarjetaClassName={tarjetaClassName} />
        )
      )}
    </div>
  );
}

export default Galeria;
