import { useState } from 'react';

// Imagen principal con miniaturas (detalle de producto).
// Si hoverSwap es true, la imagen principal cambia al pasar el cursor por la miniatura; si no, al hacer clic.
// Nota: al cambiar de producto sin salir de la página, el padre debe pasarle key={producto.id} para reiniciar la imagen activa.
function VisorImagenes({ imagenes, nombre, hoverSwap = false }) {
  // Posición (en el arreglo) de la imagen que se muestra en grande.
  const [activa, setActiva] = useState(0);

  return (
    <div className="galeria-producto">
      <img id="imagen-principal" src={imagenes[activa]} alt={nombre} />
      <div className="miniaturas">
        {imagenes.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${nombre} vista ${index + 1}`}
            className={index === activa ? 'activa' : ''}
            onMouseOver={hoverSwap ? () => setActiva(index) : undefined}
            onClick={hoverSwap ? undefined : () => setActiva(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default VisorImagenes;
