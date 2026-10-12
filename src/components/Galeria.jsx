import Tarjeta from './Tarjeta';

function Galeria({ datos, className, tarjetaClassName }) {
  return (
    /** Mapeo de arreglos con 'datos.map(...)':
     * Iteramos sobre cada objeto del arreglo 'datos'. Por cada elemento retornamos un componente <Tarjeta />.
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
      {datos.map((item) => (
        <Tarjeta key={item.id} item={item} tarjetaClassName={tarjetaClassName} />
      ))}
    </div>
  );
}

export default Galeria;